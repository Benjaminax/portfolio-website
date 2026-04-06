import nodemailer from 'nodemailer';

const requiredEnvVars = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'MAIL_TO',
];

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

let cachedTransport = globalThis.__contactMailTransport;
let cachedIssue = globalThis.__contactStartupIssue || '';

const buildIssue = () => {
  const missing = requiredEnvVars.filter((name) => !process.env[name]);
  if (missing.length > 0) {
    return `Missing required environment variables: ${missing.join(', ')}`;
  }

  return '';
};

const ensureServices = async () => {
  try {
    const envIssue = buildIssue();

    if (envIssue) {
      cachedIssue = envIssue;
      globalThis.__contactStartupIssue = cachedIssue;
      return { ready: false, issue: cachedIssue };
    }

    if (!cachedTransport) {
      cachedTransport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== 'false',
        },
      });

      await cachedTransport.verify();
      globalThis.__contactMailTransport = cachedTransport;
    }

    cachedIssue = '';
    globalThis.__contactStartupIssue = '';

    return { ready: true, issue: '' };
  } catch (error) {
    cachedIssue = `Service initialization failed: ${error?.message || 'Unknown error'}`;
    globalThis.__contactStartupIssue = cachedIssue;
    return { ready: false, issue: cachedIssue };
  }
};

const submitContact = async ({ name, email, message, userAgent }) => {
  const { ready, issue } = await ensureServices();

  if (!ready) {
    return {
      status: 503,
      body: { error: issue || 'Contact service is not configured yet.' },
    };
  }

  if (!name || !email || !message) {
    return { status: 400, body: { error: 'Name, email, and message are required.' } };
  }

  if (!isValidEmail(email)) {
    return { status: 400, body: { error: 'Please provide a valid email address.' } };
  }

  const doc = {
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    message: String(message).trim(),
    createdAt: new Date(),
    userAgent: userAgent || 'unknown',
  };

  if (!doc.name || !doc.email || !doc.message) {
    return { status: 400, body: { error: 'Please complete all fields.' } };
  }

  await cachedTransport.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: process.env.MAIL_TO,
    replyTo: doc.email,
    subject: `New portfolio message from ${doc.name}`,
    text: `You received a new message from your portfolio contact form.\n\nName: ${doc.name}\nEmail: ${doc.email}\n\nMessage:\n${doc.message}\n\nSent at: ${doc.createdAt.toISOString()}`,
    html: `
      <h2>New Portfolio Contact Message</h2>
      <p><strong>Name:</strong> ${doc.name}</p>
      <p><strong>Email:</strong> ${doc.email}</p>
      <p><strong>Message:</strong></p>
      <p>${doc.message.replace(/\n/g, '<br />')}</p>
      <hr />
      <p><strong>Sent at:</strong> ${doc.createdAt.toISOString()}</p>
    `,
  });

  return { status: 201, body: { message: 'Message sent successfully.' } };
};

export { ensureServices, submitContact };

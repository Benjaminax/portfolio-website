import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config({ path: 'server/.env' });
dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

const requiredEnvVars = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'MAIL_TO',
];

const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);

let mailTransport;
let startupIssue = '';

const initServices = async () => {
  if (missingEnvVars.length > 0) {
    startupIssue = `Missing required environment variables: ${missingEnvVars.join(', ')}`;
    return false;
  }

  try {
    mailTransport = nodemailer.createTransport({
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

    await mailTransport.verify();
    startupIssue = '';
    return true;
  } catch (error) {
    startupIssue = `Service initialization failed: ${error.message}`;
    return false;
  }
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

app.get('/api/health', (_req, res) => {
  const ready = Boolean(mailTransport);
  res.status(ready ? 200 : 503).json({
    ok: ready,
    service: 'contact',
    issue: startupIssue || null,
  });
});

app.post('/api/contact', async (req, res) => {
  try {
    if (!mailTransport) {
      return res.status(503).json({
        error: startupIssue || 'Contact service is not configured yet. Check server/.env.',
      });
    }

    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const doc = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      message: String(message).trim(),
      createdAt: new Date(),
      userAgent: req.headers['user-agent'] || 'unknown',
    };

    if (!doc.name || !doc.email || !doc.message) {
      return res.status(400).json({ error: 'Please complete all fields.' });
    }

    await mailTransport.sendMail({
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

    return res.status(201).json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Contact submission failed:', error);

    const detailedError = error?.message || 'Unknown server error.';
    const isAuthFailure = /invalid login|auth|535|username and password not accepted/i.test(detailedError);
    const isTlsFailure = /certificate|self-signed|tls/i.test(detailedError);

    if (isAuthFailure) {
      return res.status(502).json({
        error: 'Email provider rejected login. Check SMTP_USER and SMTP_PASS (Gmail requires an App Password).',
      });
    }

    if (isTlsFailure) {
      return res.status(502).json({
        error: 'TLS certificate validation failed for SMTP. For local testing, set SMTP_TLS_REJECT_UNAUTHORIZED=false in server/.env.',
      });
    }

    if (process.env.NODE_ENV !== 'production') {
      return res.status(500).json({ error: `Failed to send message: ${detailedError}` });
    }

    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

const startServer = async () => {
  try {
    const ready = await initServices();

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
      if (!ready) {
        console.warn(`Contact service not ready: ${startupIssue}`);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

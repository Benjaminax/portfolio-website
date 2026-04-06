import { submitContact } from './_lib/contactService.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const result = await submitContact({
      name: req.body?.name,
      email: req.body?.email,
      message: req.body?.message,
      userAgent: req.headers['user-agent'],
    });

    return res.status(result.status).json(result.body);
  } catch (error) {
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
        error: 'TLS certificate validation failed for SMTP. Set SMTP_TLS_REJECT_UNAUTHORIZED=false in Vercel env variables if needed.',
      });
    }

    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
}

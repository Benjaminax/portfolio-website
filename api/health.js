import { ensureServices } from './_lib/contactService.js';

export default async function handler(_req, res) {
  const { ready, issue } = await ensureServices();
  return res.status(ready ? 200 : 503).json({ ok: ready, service: 'contact', issue: issue || null });
}

# Portfolio Website Contact Form

This project now includes a full contact flow:

- React contact form in `src/components/Contact.jsx`
- Express API route at `POST /api/contact`
- Email notifications sent to your inbox whenever someone submits the form

## 1. Install Dependencies

```bash
npm install
```

## 2. Configure Environment Variables

Copy `server/.env.example` to `server/.env` and fill in real values.

```bash
cp server/.env.example server/.env
```

If you are on Windows PowerShell:

```powershell
Copy-Item server/.env.example server/.env
```

Required variables in `server/.env`:

```env
PORT=5000

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

MAIL_FROM=your-email@gmail.com
MAIL_TO=your-email@gmail.com
```

Notes:

- If you use Gmail, set up a Google App Password and use it in `SMTP_PASS`.

## 3. Start App + API Together

```bash
npm run dev
```

This runs:

- Vite client on `http://localhost:5173`
- Express server on `http://localhost:5000`

Vite proxies `/api/*` calls to the backend in development.

## 4. Test the Contact Flow

1. Open the site.
2. Fill the contact form.
3. Submit.
4. Confirm:
   - You receive an email at `MAIL_TO`.

## API

- `GET /api/health` -> health check
- `POST /api/contact` -> submit contact message

Request body:

```json
{
	"name": "Your Name",
	"email": "you@example.com",
	"message": "Hello from the portfolio form"
}
```

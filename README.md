
# Portfolio Website

A modern, responsive portfolio website built with React and Tailwind CSS. Features a clean design, smooth animations, a fully functional contact form with email notifications, and showcases your projects and skills.

## Features

- **Responsive design:** Seamlessly adapts to desktop, tablet, and mobile devices.
- **Contact form:** Fully functional form with email notifications via Nodemailer.
- **Express backend:** API route for handling form submissions securely.
- **Modern UI:** Built with React and styled using Tailwind CSS.
- **Smooth animations:** Subtle transitions and interactions for a polished experience.

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/Benjaminax/portfolio-website.git
cd portfolio-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

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

**Note:** If you use Gmail, set up a Google App Password and use it in `SMTP_PASS`.

### 4. Start the application

```bash
npm run dev
```

This runs:

- Vite client on `http://localhost:5173`
- Express server on `http://localhost:5000`

Vite proxies `/api/*` calls to the backend in development.

### 5. Build for production

```bash
npm run build
```

## API endpoints

- `GET /api/health` -> health check
- `POST /api/contact` -> submit contact message

**Request body:**

```json
{
	"name": "Your Name",
	"email": "you@example.com",
	"message": "Hello from the portfolio form"
}
```

## Testing the contact flow

1. Open the site at `http://localhost:5173`
2. Navigate to the contact section
3. Fill out the form with your details
4. Submit
5. Confirm you receive an email at `MAIL_TO`

## Dependencies

- **React:** Frontend UI library
- **Tailwind CSS:** Utility-first CSS framework
- **Express:** Backend API framework
- **Nodemailer:** Email sending functionality
- **Vite:** Development server and build tool
- **React Router DOM:** Navigation and routing

## Project structure

```
portfolio-website/
├── src/
│   ├── components/
│   │   ├── Contact.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   └── Navbar.jsx
│   ├── App.jsx
│   └── main.jsx
├── server/
│   ├── .env
│   ├── .env.example
│   └── server.js
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Screenshots

![Screenshot 1](src/screenshots/Screenshot%202026-05-12%20195131.png)
![Screenshot 2](src/screenshots/Screenshot%202026-05-12%20195150.png)
![Screenshot 3](src/screenshots/Screenshot%202026-05-12%20195159.png)
![Screenshot 4](src/screenshots/Screenshot%202026-05-12%20195213.png)

## Socials


If you have any questions, you can reach me here:

- **Instagram:** [@_.benjamin.a._](https://instagram.com/_benjamin.a._)
- **GitHub:** [Benjaminax](https://github.com/Benjaminax/)
- **Email:** kojoben29@gmail.com

In God we trust

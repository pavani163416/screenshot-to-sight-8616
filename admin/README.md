# Addepalli Pavani Portfolio — Admin Portal

This folder contains the complete, dedicated Admin Dashboard for managing client project inquiries submitted to the Addepalli Pavani developer portfolio.

## Accessing the Dashboard

### Live Production
- **Vercel Frontend:** [https://addepallipavani-portfolio.vercel.app/admin](https://addepallipavani-portfolio.vercel.app/admin)
- **Render Backend:** [https://screenshot-to-sight-8616.onrender.com/admin](https://screenshot-to-sight-8616.onrender.com/admin)

### Local Development
- Directly open `admin/index.html` in any web browser, OR
- Start backend (`npm start`) and visit `http://localhost:5000/admin`

---

## Default Admin Credentials
- **Username:** `admin` (or `addepallipavani4@gmail.com`)
- **Password:** `admin123`
*(Can also be configured via `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `backend/.env`)*

---

## Features
- **Real-Time MongoDB Atlas Sync:** View all client inquiries submitted through the portfolio contact form.
- **Search & Filters:** Search by client name, email, phone, or requirements; filter by `All`, `New`, `Contacted`, `In Discussion`, and `Archived`.
- **Status Updates:** Update inquiry status in real time.
- **Direct Communication:**
  - One-click **Reply via Email** with pre-filled subject and recipient.
  - One-click **Chat on WhatsApp** directly with the client.
- **Delete Management:** Remove test submissions with confirmation.

---

## Files in this Directory
- `index.html`: Standalone, production-ready Admin Web App (Tailwind CSS + Lucide Icons + Vanilla JS).
- `AdminDashboard.tsx`: React/TypeScript implementation of the dashboard.
- `AdminLogin.tsx`: React/TypeScript implementation of the login card.
- `AdminPage.tsx`: Auth state management component.
- `adminAuth.ts`: Token and session helper utilities.
- `types.ts`: TypeScript data models for inquiries and stats.

# Addepalli Pavani — Full-Stack Developer Portfolio

A modern, high-performance, dark futuristic glassmorphism developer portfolio with live MongoDB Atlas integration.

## Project Architecture

This repository is organized into two dedicated folders:

```text
screenshot-to-sight-8616/
├── frontend/             # Single-Page Application (React 19, TypeScript, Vite, Tailwind CSS v4, Three.js)
│   ├── src/              # Application routes, components, styles, and assets
│   ├── public/           # Static assets & official PDF resume
│   ├── package.json      # Frontend dependencies & scripts
│   └── vite.config.ts    # Vite & Nitro configuration
│
├── backend/              # Node.js + Express API service connected to MongoDB Atlas
│   ├── models/           # Mongoose schemas (Inquiry)
│   ├── routes/           # REST endpoints (/api/inquiries, /api/health)
│   ├── seed.js           # Database seeding script for portfolio details
│   ├── server.js         # Express server entry point
│   └── package.json      # Backend dependencies
│
└── package.json          # Root workspace scripts to manage both services
```

## Quick Start

### 1. Install Dependencies
```bash
# Install frontend dependencies
npm --prefix frontend install

# Install backend dependencies
npm --prefix backend install
```

### 2. Configure Environment
- Copy `frontend/.env.example` to `frontend/.env`:
  ```env
  VITE_API_URL=http://localhost:5000
  ```
- Copy `backend/.env.example` to `backend/.env` and add your MongoDB Atlas URI:
  ```env
  PORT=5000
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.hstff3y.mongodb.net/my_portfolio?retryWrites=true&w=majority
  FRONTEND_URL=http://localhost:8080
  ```

### 3. Run Locally
```bash
# Run frontend dev server (port 8080)
npm run dev

# Run backend API server (port 5000)
npm run start
```

### 4. Run Tests & Production Build
```bash
# Run Vitest test suite
npm test

# Build production bundle
npm run build
```

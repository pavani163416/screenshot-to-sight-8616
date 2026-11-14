# Portfolio Backend API

Backend API for Pavani's Portfolio with Express, MongoDB, and Mongoose.

## Tech Stack
- **Node.js** & **Express**
- **MongoDB** & **Mongoose**
- **Zod** for schema validation
- **CORS** & **dotenv**

## Setup & Run

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure `.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/portfolio
   FRONTEND_URL=http://localhost:8080
   ```
   > **Note on MongoDB Atlas**: If using MongoDB Atlas cloud, set `MONGODB_URI` to your connection string:
   > `mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority`

4. Start development server:
   ```bash
   npm run dev
   ```

## Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check and MongoDB connection status |
| `POST` | `/api/inquiries` | Submit new project inquiry (validated with Zod) |
| `GET` | `/api/inquiries` | Retrieve list of received inquiries |

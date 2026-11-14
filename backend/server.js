import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:8080";

// Allowed CORS origins
const allowedOrigins = [
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "https://addepallipavani-portfolio.vercel.app",
  ...(FRONTEND_URL ? FRONTEND_URL.split(",").map((url) => url.trim()) : []),
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      // Check against explicit list, wildcard, or any Vercel deployment
      if (
        allowedOrigins.includes(origin) ||
        allowedOrigins.includes("*") ||
        process.env.FRONTEND_URL === "*" ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy does not allow access from origin ${origin}`), false);
    },
    credentials: true,
  })
);

// JSON body parser with 10kb limit
app.use(express.json({ limit: "10kb" }));

// Health Check Endpoint
app.get("/api/health", (_req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.json({
    status: "ok",
    db: isDbConnected ? "connected" : "disconnected",
  });
});

// Inquiry Routes
app.use("/api/inquiries", inquiryRoutes);

// Admin Routes (Login, Dashboard, Inquiries Management)
app.use("/api/admin", adminRoutes);

// Global Error Handler
app.use((err, _req, res, _next) => {
  console.error("Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "An unexpected server error occurred.",
  });
});

// Connect to MongoDB & Start Server
async function startServer() {
  app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
    console.log(`Accepting requests from: ${allowedOrigins.join(", ")}`);
  });

  try {
    const maskedUri = MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, "//$1:****@");
    console.log(`Connecting to MongoDB at: ${maskedUri}`);
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.warn("MongoDB connection warning:", error.message);
    console.log("Tip: Provide a valid MongoDB Atlas connection string in backend/.env (MONGODB_URI).");
  }
}

startServer();

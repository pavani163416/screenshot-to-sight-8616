import { Router } from "express";
import crypto from "crypto";
import { Inquiry, INQUIRY_STATUSES } from "../models/Inquiry.js";

const router = Router();

// Configure admin credentials (from .env or secure defaults)
const ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "addepallipavani4@gmail.com";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "admin123";
const JWT_SECRET = process.env.ADMIN_SECRET || "pavani-portfolio-admin-secret-key-2026";

// Simple stateless token generator & verifier
function generateToken(username) {
  const payload = {
    username,
    role: "admin",
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(payloadStr)
    .digest("base64url");
  return `${payloadStr}.${signature}`;
}

function verifyToken(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadStr, signature] = parts;
  const expectedSig = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(payloadStr)
    .digest("base64url");
  if (signature !== expectedSig) return null;
  try {
    const payload = JSON.parse(Buffer.from(payloadStr, "base64url").toString());
    if (payload.exp && payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

// Authentication middleware
export function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Admin authorization required. Please log in.",
    });
  }

  const token = authHeader.split(" ")[1];
  const admin = verifyToken(token);

  if (!admin) {
    return res.status(401).json({
      success: false,
      message: "Session expired or invalid token. Please log in again.",
    });
  }

  req.admin = admin;
  next();
}

// POST /api/admin/login
router.post("/login", (req, res) => {
  const { username, password } = req.body || {};

  const cleanUser = String(username || "").trim().toLowerCase();
  const cleanPass = String(password || "");

  const isValidUser =
    cleanUser === ADMIN_USER.toLowerCase() ||
    cleanUser === ADMIN_EMAIL.toLowerCase();
  const isValidPass = cleanPass === ADMIN_PASS;

  if (!isValidUser || !isValidPass) {
    return res.status(401).json({
      success: false,
      message: "Invalid admin username or password.",
    });
  }

  const token = generateToken(cleanUser);
  return res.json({
    success: true,
    message: "Admin login successful",
    token,
    user: {
      username: ADMIN_USER,
      email: ADMIN_EMAIL,
    },
  });
});

// GET /api/admin/me
router.get("/me", requireAdminAuth, (req, res) => {
  res.json({
    success: true,
    admin: req.admin,
  });
});

// GET /api/admin/inquiries (all inquiries with counts)
router.get("/inquiries", requireAdminAuth, async (_req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();

    const stats = {
      total: inquiries.length,
      new: inquiries.filter((i) => i.status === "new").length,
      contacted: inquiries.filter((i) => i.status === "contacted").length,
      in_discussion: inquiries.filter((i) => i.status === "in_discussion").length,
      archived: inquiries.filter((i) => i.status === "archived").length,
    };

    return res.json({
      success: true,
      stats,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/admin/inquiries/:id/status
router.patch("/inquiries/:id/status", requireAdminAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body || {};

    if (!INQUIRY_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${INQUIRY_STATUSES.join(", ")}`,
      });
    }

    const updated = await Inquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    return res.json({
      success: true,
      message: `Inquiry status updated to ${status}`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/inquiries/:id
router.delete("/inquiries/:id", requireAdminAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Inquiry.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    return res.json({
      success: true,
      message: "Inquiry deleted successfully",
      id,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

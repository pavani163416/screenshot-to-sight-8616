import { Router } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { Inquiry, PROJECT_TYPES, BUDGET_RANGES } from "../models/Inquiry.js";

const router = Router();

const inquiryValidationSchema = z.object({
  name: z
    .string({ required_error: "Your name is required" })
    .trim()
    .min(1, "Your name is required")
    .max(100, "Name cannot exceed 100 characters"),
  email: z
    .string({ required_error: "Email address is required" })
    .trim()
    .email("Please provide a valid email address")
    .max(254, "Email cannot exceed 254 characters"),
  project_type: z.enum(PROJECT_TYPES, {
    errorMap: () => ({ message: "Please select a valid project type" }),
  }),
  budget_range: z
    .enum(BUDGET_RANGES, {
      errorMap: () => ({ message: "Please select a valid budget range" }),
    })
    .optional()
    .default(""),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number cannot exceed 30 characters")
    .optional()
    .default(""),
  message: z
    .string({ required_error: "Project message is required" })
    .trim()
    .min(1, "Project message is required")
    .max(3000, "Message cannot exceed 3000 characters"),
});

// POST /api/inquiries
router.post("/", async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database is not connected. Please configure your MONGODB_URI in backend/.env.",
      });
    }

    const parseResult = inquiryValidationSchema.safeParse(req.body);

    if (!parseResult.success) {
      const errorMessages = parseResult.error.errors.map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: errorMessages[0] || "Invalid submission data",
        errors: errorMessages,
      });
    }

    const { name, email, project_type, budget_range, phone, message } = parseResult.data;

    const newInquiry = new Inquiry({
      name,
      email,
      project_type,
      budget_range: budget_range || "",
      phone: phone || "",
      message,
    });

    const savedInquiry = await newInquiry.save();

    return res.status(201).json({
      success: true,
      message: "Thanks! Your project inquiry has been received. I'll get back to you soon.",
      id: savedInquiry._id,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/inquiries
router.get("/", async (_req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
    return res.json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

import mongoose from "mongoose";

export const PROJECT_TYPES = [
  "Business Website",
  "React Web Application",
  "Admin Dashboard",
  "Website Redesign",
  "Frontend Development",
  "Bug Fix / Improvements",
  "Other",
];

export const BUDGET_RANGES = [
  "Under ₹10,000",
  "₹10,000–₹25,000",
  "₹25,000–₹50,000",
  "₹50,000+",
  "Not sure yet",
  "",
];

export const INQUIRY_STATUSES = ["new", "contacted", "in_discussion", "archived"];

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
      maxlength: [254, "Email cannot exceed 254 characters"],
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    project_type: {
      type: String,
      required: [true, "Project type is required"],
      enum: {
        values: PROJECT_TYPES,
        message: "Invalid project type",
      },
    },
    budget_range: {
      type: String,
      default: "",
      enum: {
        values: BUDGET_RANGES,
        message: "Invalid budget range",
      },
    },
    phone: {
      type: String,
      default: "",
      trim: true,
      maxlength: [30, "Phone number cannot exceed 30 characters"],
    },
    message: {
      type: String,
      required: [true, "Project message is required"],
      trim: true,
      maxlength: [3000, "Message cannot exceed 3000 characters"],
    },
    status: {
      type: String,
      enum: {
        values: INQUIRY_STATUSES,
        message: "Invalid status",
      },
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

export const Inquiry = mongoose.model("Inquiry", inquirySchema);

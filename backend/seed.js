import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, ".env") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Error: MONGODB_URI is not defined in backend/.env");
  process.exit(1);
}

const portfolioData = {
  profile: {
    name: "Pavani",
    fullName: "A. Pavani",
    title: "React & TypeScript Developer",
    email: "addepallipavani4@gmail.com",
    phone: "+91 6281742588",
    whatsapp: "https://wa.me/916281742588",
    bio: "React and TypeScript interfaces for enterprise platforms, business operations, dashboards, and responsive web applications.",
    education: [
      {
        degree: "B.Tech · Artificial Intelligence & Data Science",
        institution: "Vasireddy Venkatadri Institute of Technology (VVIT), Nambur",
        year: "2026",
        score: "CGPA 8.51 / 10",
      },
      {
        degree: "Diploma · Computer Science & Engineering",
        duration: "3 years",
        score: "78.98%",
      },
    ],
    experience: [
      {
        role: "Frontend Developer / Software Developer",
        company: "Sentelligence Solutions Pvt. Ltd.",
        period: "Current",
        description:
          "React and TypeScript interfaces for an enterprise employee operations platform, including dashboards, forms and API-connected workflows.",
      },
      {
        role: "Software Developer",
        company: "Naprocs Technologies",
        period: "Previous",
        description: "Full-stack web development with React, Node.js, MongoDB and REST APIs.",
      },
    ],
  },
  services: [
    { number: "01", name: "Business websites", description: "Thoughtful, responsive websites for growing companies and local businesses." },
    { number: "02", name: "React web applications", description: "Custom digital products built around the way your team and customers work." },
    { number: "03", name: "Admin dashboards", description: "Clear, useful interfaces for customer, employee, order and operations data." },
    { number: "04", name: "Management portals", description: "Responsive, role-aware portals that bring business workflows together." },
    { number: "05", name: "Website redesigns", description: "A more current and usable experience for an existing website or product." },
    { number: "06", name: "Frontend development", description: "Reusable React and TypeScript interfaces built to work across screens." },
    { number: "07", name: "Fixes & improvements", description: "Practical help with UI bugs, layout issues and responsive polish." },
  ],
  projects: [
    {
      name: "Athithigriha",
      category: "Hotel management · Web application",
      description: "A hotel management application bringing day-to-day operations and workflows into one considered digital experience.",
      contribution: "Responsive interfaces, dashboards, management screens, forms and guest-to-team workflows.",
      technologies: ["React", "TypeScript", "MUI", "Responsive UI"],
    },
    {
      name: "NapLabs",
      category: "Business operations · Platform",
      description: "A centralized business operations platform designed to make everyday workflows easier to manage.",
      contribution: "Product interfaces, management workflows, authentication UI and API-connected responsive screens.",
      technologies: ["React", "TypeScript", "JavaScript", "API integration"],
    },
    {
      name: "PriceWise AI",
      category: "AI application · Product discovery",
      description: "A price-comparison concept that helps shoppers explore product options and make more informed decisions.",
      contribution: "Product search, side-by-side comparison and clear, approachable results experiences.",
      technologies: ["React", "JavaScript", "API integration", "AI"],
    },
    {
      name: "E-Khatha",
      category: "Property services · Web application",
      description: "A digital property and document platform focused on making information and processes simpler to navigate.",
      contribution: "Responsive screens, dashboards, forms and clear end-to-end user workflows.",
      technologies: ["React", "TypeScript", "MUI", "JavaScript"],
    },
  ],
  sampleInquiries: [
    {
      name: "A. Pavani",
      email: "addepallipavani4@gmail.com",
      project_type: "Business Website",
      budget_range: "₹25,000–₹50,000",
      phone: "6281742588",
      message: "Looking for a custom responsive business website built with React and TypeScript.",
      status: "new",
      createdAt: new Date(),
    },
    {
      name: "NapLabs Team",
      email: "contact@naplabs.example.com",
      project_type: "Admin Dashboard",
      budget_range: "₹50,000+",
      phone: "+91 9876543210",
      message: "Need an administrative dashboard for order tracking and employee operations workflows.",
      status: "in_discussion",
      createdAt: new Date(),
    },
  ],
};

async function seed() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
    console.log(`Connected successfully to database: "${mongoose.connection.name}"`);

    const db = mongoose.connection.db;

    // 1. Seed into the user's specific "my_details" collection
    const myDetailsCollection = db.collection("my_details");
    await myDetailsCollection.deleteMany({});
    const myDetailsResult = await myDetailsCollection.insertOne({
      type: "portfolio_details",
      ...portfolioData,
      seededAt: new Date(),
    });
    console.log(`Seeded portfolio document into collection "my_details" with ID: ${myDetailsResult.insertedId}`);

    // Also seed into "data" collection if needed
    const dataCollection = db.collection("data");
    await dataCollection.deleteMany({});
    await dataCollection.insertOne({
      type: "portfolio_content",
      ...portfolioData,
      seededAt: new Date(),
    });
    console.log(`Seeded into collection "data"`);

    // 2. Seed into "inquiries" collection
    const inquiriesCollection = db.collection("inquiries");
    await inquiriesCollection.deleteMany({});
    const inquiriesResult = await inquiriesCollection.insertMany(portfolioData.sampleInquiries);
    console.log(`Seeded ${inquiriesResult.insertedCount} inquiries into collection "inquiries"`);

    console.log("\nDatabase seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
}

seed();

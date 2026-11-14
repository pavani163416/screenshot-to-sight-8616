import { useState, useEffect, type FormEvent, type MouseEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import Lenis from "lenis";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Copy,
  FileDown,
  FolderKanban,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Loader2,
  Mail,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  Send,
  Sparkles,
  Terminal,
  X,
  Eye,
  Images,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ThreeHeroScene } from "@/components/ThreeHeroScene";
import { CursorGlow } from "@/components/CursorGlow";
import { TiltCard } from "@/components/TiltCard";
import { MagneticButton } from "@/components/MagneticButton";
import { ProjectModal, type ProjectData } from "@/components/ProjectModal";
import portraitPhoto from "@/assets/pavani-portrait.jpg";

const navigation = [
  { label: "Selected Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Tech Stack", href: "#stack" },
  { label: "Experience", href: "#about" },
  { label: "Process", href: "#process" },
];

const projects: ProjectData[] = [
  {
    name: "Athithigriha",
    category: "Hotel Management · Web Application",
    description:
      "A complete hotel operations platform uniting booking management, front-desk check-ins, room inventory, and guest-to-team pipelines in a responsive management experience.",
    contribution:
      "Engineered full responsive interfaces, operations dashboards, multi-step booking forms, and state-managed guest pipelines in React, TypeScript, and MUI.",
    technologies: ["React", "TypeScript", "MUI", "Responsive UI", "REST APIs"],
    badge: "Operations Platform",
    accent: "emerald",
  },
  {
    name: "NapLabs",
    category: "Business Operations · Platform",
    description:
      "A centralized business management platform designed to automate everyday team operations, order tracking, and cross-department collaboration with real-time updates.",
    contribution:
      "Built sleek product interfaces, authentication UI, role-based management screens, and API-connected responsive workflows.",
    technologies: ["React", "TypeScript", "JavaScript", "REST APIs", "Tailwind CSS"],
    badge: "SaaS Application",
    accent: "cyan",
  },
  {
    name: "PriceWise AI",
    category: "AI Application · Product Discovery",
    description:
      "An intelligent e-commerce price-comparison web application that helps shoppers evaluate options across stores, analyze pricing trends, and make smart buying choices.",
    contribution:
      "Developed dynamic product search interfaces, side-by-side comparison tables, filter controls, and clean responsive results layouts.",
    technologies: ["React", "JavaScript", "AI Workflows", "REST APIs"],
    badge: "AI Product",
    accent: "violet",
  },
  {
    name: "E-Khatha",
    category: "Property Services · Web Application",
    description:
      "A digital property and official documentation portal built to streamline real-estate records, application tracking, and verification procedures for public access.",
    contribution:
      "Designed responsive screens, document submission dashboards, multi-step verification forms, and end-to-end user workflows.",
    technologies: ["React", "TypeScript", "MUI", "JavaScript", "Responsive UI"],
    badge: "Civic Portal",
    accent: "emerald",
  },
];

const services = [
  {
    number: "01",
    name: "Business Websites",
    description:
      "High-performance, responsive websites built to clearly communicate your brand, load quickly, and convert prospective clients.",
  },
  {
    number: "02",
    name: "React Web Applications",
    description:
      "Custom digital products and single-page applications engineered with React 19, TypeScript, clean component architecture, and solid state management.",
  },
  {
    number: "03",
    name: "Admin Dashboards",
    description:
      "Information-dense, clean interfaces for managing customer data, internal orders, operations pipelines, and live business analytics.",
  },
  {
    number: "04",
    name: "Management Portals",
    description:
      "Role-aware, multi-tenant digital portals consolidating scattered spreadsheets, employee tasks, and disconnected software into one reliable system.",
  },
  {
    number: "05",
    name: "Website Redesigns",
    description:
      "Complete visual and architectural overhauls elevating legacy web apps into modern, fluid, accessible, and high-performance digital experiences.",
  },
  {
    number: "06",
    name: "Frontend Development",
    description:
      "Translating Figma or wireframe designs into clean, accessible, and maintainable React and TypeScript code built to scale over time.",
  },
  {
    number: "07",
    name: "Fixes & Code Polish",
    description:
      "Targeted troubleshooting for UI glitches, responsive breakpoint flaws, component state bugs, and client-side rendering bottlenecks.",
  },
];

const skillBento = [
  {
    category: "Frontend Core",
    icon: Code2,
    badge: "Core Focus",
    skills: ["React", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5 & CSS3", "MUI", "Radix UI", "Responsive Design"],
    highlight: "Type-safe interfaces, reusable patterns, accessibility & performance",
  },
  {
    category: "Backend & Data",
    icon: Terminal,
    badge: "Full-Stack Integration",
    skills: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs", "SQL", "Flask", "Python"],
    highlight: "REST API design, data modeling, schema validation & persistence",
  },
  {
    category: "AI & Data Analytics",
    icon: Sparkles,
    badge: "B.Tech Specialization",
    skills: ["YOLOv5", "EasyOCR", "FAISS", "RAG Concepts", "Power BI", "Tableau", "Data Pipelines"],
    highlight: "Computer vision, retrieval-augmented workflows & analytical dashboards",
  },
  {
    category: "Engineering Tools",
    icon: MonitorSmartphone,
    badge: "Workflow",
    skills: ["Git & GitHub", "Vite", "VS Code", "Postman", "Vitest", "Chrome DevTools", "C / C++", "Java"],
    highlight: "CI/CD familiarity, modern dev tools & unit testing",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Scope & Discovery",
    detail: "Clarify user requirements, business goals, feature requirements, and technical constraints.",
  },
  {
    number: "02",
    title: "Architect & Plan",
    detail: "Define the UI component hierarchy, API interfaces, data models, and interaction patterns.",
  },
  {
    number: "03",
    title: "Develop with Care",
    detail: "Build pixel-perfect, accessible, and type-safe interfaces with responsive polish on all devices.",
  },
  {
    number: "04",
    title: "Verify & Launch",
    detail: "Thorough testing, cross-browser verification, and seamless handoff for live production deployment.",
  },
];

const projectTypes = [
  "Business Website",
  "React Web Application",
  "Admin Dashboard",
  "Website Redesign",
  "Frontend Development",
  "Bug Fix / Improvements",
  "Other",
];

const budgets = ["Under ₹10,000", "₹10,000–₹25,000", "₹25,000–₹50,000", "₹50,000+", "Not sure yet"];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Addepalli Pavani — React & TypeScript Developer | Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Addepalli Pavani: React & TypeScript frontend engineer building high-performance web applications, business dashboards, and responsive digital products.",
      },
      {
        property: "og:title",
        content: "Addepalli Pavani — React & TypeScript Developer",
      },
      {
        property: "og:description",
        content:
          "Practical, high-motion digital products for businesses and growing teams. Explore Addepalli Pavani’s selected work, skills, and interactive experience.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Portfolio,
});

export function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  function handleCopyEmail(e?: MouseEvent) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("addepallipavani4@gmail.com");
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2500);
    }
  }

  // Initialize Lenis for smooth momentum scrolling
  useEffect(() => {
    if (typeof window === "undefined" || typeof ResizeObserver === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      lenis.destroy();
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormMessage("");
    setFormError("");

    setSubmitting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      project_type: String(formData.get("project_type") || ""),
      budget_range: String(formData.get("budget_range") || ""),
      phone: String(formData.get("phone") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    const apiBaseUrl = import.meta.env["VITE_API_URL"] || "http://localhost:5000";

    try {
      const response = await fetch(`${apiBaseUrl}/api/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "The inquiry couldn't be sent right now.");
      }

      setFormMessage(
        result.message || "Thanks! Your project inquiry has been received. I’ll get back to you soon.",
      );
      form.reset();
    } catch (err: unknown) {
      const message =
        err instanceof Error && err.message && err.message !== "Failed to fetch"
          ? err.message
          : "Your inquiry couldn't be sent right now. Please try again or reach out on WhatsApp/Email.";
      setFormError(message);
    } finally {
      setSubmitting(false);
    }
  }

  function navigateToSection(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("#")) return;
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    event.preventDefault();
    setMenuOpen(false);
    history.replaceState(null, "", href);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Portrait parallax
  const portraitParallaxY = Math.min(Math.max(-scrollY * 0.12, -75), 0);

  return (
    <div className="relative min-h-screen futuristic-obsidian-bg cyber-grid-overlay text-slate-100 selection:bg-emerald-500 selection:text-black antialiased">
      {/* Interactive Cursor Spotlight Glow */}
      <CursorGlow />

      {/* Floating Glassmorphic Navbar with updated name */}
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
        <nav className="glass-navbar flex items-center justify-between gap-6 rounded-full px-6 py-3 shadow-2xl max-w-4xl w-full">
          <a
            href="#home"
            onClick={(e) => navigateToSection(e, "#home")}
            className="flex items-center gap-2 font-display text-xl sm:text-2xl tracking-wider text-white hover:text-emerald-400 transition-colors"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Addepalli Pavani<span className="text-emerald-400">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => navigateToSection(e, item.href)}
                className="hover:text-emerald-400 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <a
              href="https://github.com/pavani163416"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all hover:scale-110 shadow-sm"
              aria-label="GitHub Profile"
              title="GitHub Profile (pavani163416)"
            >
              <Github className="h-5 w-5 text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/addepalli-pavani-671b1b23a"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center h-9 w-9 rounded-full bg-[#0a66c2]/25 hover:bg-[#0a66c2]/40 text-[#38bdf8] hover:text-white border border-[#0a66c2]/40 transition-all hover:scale-110 shadow-sm"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5 text-[#38bdf8]" />
            </a>
            <a
              href="/assets/Addepalli_Pavani_Resume.pdf"
              download="Addepalli_Pavani_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/35 text-emerald-300 transition-all hover:scale-105 shadow-sm font-semibold"
              title="Download Resume (PDF)"
            >
              <FileDown className="h-4 w-4 text-emerald-400" />
              <span>Resume</span>
            </a>
            <MagneticButton
              href="#contact"
              onClick={(e) => navigateToSection(e, "#contact")}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-black px-4 py-1.5 text-xs font-semibold tracking-wide shadow-lg shadow-emerald-500/25 transition-all hover:scale-105"
            >
              Start Project <ArrowUpRight className="h-3.5 w-3.5" />
            </MagneticButton>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-slate-300 hover:text-white p-1"
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-center items-center gap-6 text-xl md:hidden">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => navigateToSection(e, item.href)}
              className="text-slate-200 hover:text-emerald-400 font-medium tracking-wide"
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://github.com/pavani163416"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-white p-2 rounded-full bg-white/5 border border-white/10"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/addepalli-pavani-671b1b23a"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 p-2 rounded-full bg-emerald-500/10 border border-emerald-500/30"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="/assets/Addepalli_Pavani_Resume.pdf"
              download="Addepalli_Pavani_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 p-2 px-3 rounded-full bg-white/5 border border-white/10"
            >
              <FileDown className="h-4 w-4" /> Resume PDF
            </a>
          </div>
          <a
            href="#contact"
            onClick={(e) => navigateToSection(e, "#contact")}
            className="rounded-full bg-emerald-500 text-black px-7 py-3 font-semibold text-sm mt-2 shadow-xl"
          >
            Start a project
          </a>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main id="home" className="relative z-10 pt-28">
        {/* ASYMMETRIC HERO SECTION WITH FLUID 3D CYBER WAVE BACKGROUND */}
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-16">
          {/* New Fluid 3D Wave Canvas (undulating in background, zero text obstruction) */}
          <ThreeHeroScene />

          <div className="relative z-10 max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Headline, Value Proposition, Actions, Metrics */}
              <div className="lg:col-span-7 flex flex-col justify-center text-left">
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-md mb-6 shadow-lg shadow-emerald-500/10">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Available for Freelance &amp; Full-Stack Projects
                </div>

                {/* Hero Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                  Building <span className="text-gradient-emerald">High-Performance</span>
                  <br />
                  Web Applications.
                </h1>

                {/* Value Proposition */}
                <p className="max-w-xl text-base sm:text-lg text-slate-300 font-light mb-8 leading-relaxed">
                  I’m <strong className="text-white font-medium">Addepalli Pavani</strong>, a React &amp; TypeScript developer
                  building responsive web applications, enterprise operations platforms, and dependable full-stack systems
                  with Node.js and MongoDB.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 mb-6">
                  <MagneticButton
                    href="#contact"
                    onClick={(e) => navigateToSection(e, "#contact")}
                    className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-black px-7 py-3.5 text-sm font-semibold tracking-wide shadow-xl shadow-emerald-500/25 transition-all hover:scale-105"
                  >
                    Start a project
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </MagneticButton>

                  <MagneticButton
                    href="#work"
                    onClick={(e) => navigateToSection(e, "#work")}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-sm font-medium text-slate-200 backdrop-blur-md transition-all hover:border-emerald-500/40"
                  >
                    Explore Selected Work
                    <ArrowDown className="h-4 w-4 text-emerald-400" />
                  </MagneticButton>

                  <a
                    href="/assets/Addepalli_Pavani_Resume.pdf"
                    download="Addepalli_Pavani_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-5 py-3.5 text-sm font-mono text-emerald-300 backdrop-blur-md transition-all shadow-lg shadow-emerald-500/10 hover:scale-105"
                  >
                    <FileDown className="h-4 w-4" />
                    Download CV (PDF)
                  </a>
                </div>

                {/* Verified Social Profile Chips */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <a
                    href="https://github.com/pavani163416"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-xs font-mono text-white border border-white/20 hover:border-white/40 transition-all hover:scale-105 shadow-sm"
                  >
                    <Github className="h-4.5 w-4.5 text-white shrink-0" />
                    <span>github.com/pavani163416</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/addepalli-pavani-671b1b23a"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0a66c2]/20 hover:bg-[#0a66c2]/30 text-xs font-mono text-[#38bdf8] hover:text-white border border-[#0a66c2]/35 transition-all hover:scale-105 shadow-sm"
                  >
                    <Linkedin className="h-4.5 w-4.5 text-[#38bdf8] shrink-0" />
                    <span>in/addepalli-pavani</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#38bdf8]" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-200 hover:text-emerald-300 border border-white/15 transition-all cursor-pointer hover:scale-105 shadow-sm"
                    title="Click to copy email address"
                  >
                    {emailCopied ? (
                      <>
                        <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                        <span className="text-emerald-400 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Verified Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10 max-w-xl">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-gradient-emerald">8.63</div>
                    <div className="text-[0.7rem] font-mono text-slate-400 uppercase tracking-wider mt-1">VVIT CGPA (AI&amp;DS)</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-gradient-cyan">4+</div>
                    <div className="text-[0.7rem] font-mono text-slate-400 uppercase tracking-wider mt-1">Featured Apps</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">Full-Stack</div>
                    <div className="text-[0.7rem] font-mono text-slate-400 uppercase tracking-wider mt-1">React · Node · Mongo</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-emerald-400">100%</div>
                    <div className="text-[0.7rem] font-mono text-slate-400 uppercase tracking-wider mt-1">Responsive UI</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Holographic Framed Portrait with Parallax */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div
                  className="hologram-portrait-frame rounded-2xl p-3 max-w-sm w-full will-change-transform transition-transform duration-300 ease-out"
                  style={{
                    transform: `translate3d(0, ${portraitParallaxY}px, 0)`,
                  }}
                >
                  <div className="relative rounded-xl overflow-hidden border border-white/10 bg-slate-900/60">
                    <img
                      src={portraitPhoto}
                      alt="Addepalli Pavani — React & TypeScript Developer"
                      className="w-full h-[420px] sm:h-[460px] object-cover object-top"
                      loading="eager"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5">
                      <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                        [01] Addepalli Pavani // Software Developer
                      </div>
                      <div className="text-xs text-slate-300 mt-1">
                        React &amp; TypeScript · VVIT Graduate · Sentelligence Solutions
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 px-2 text-xs font-mono text-slate-400">
                    <span>Based in Andhra Pradesh, India</span>
                    <span className="text-emerald-400">● Global Clients</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SELECTED WORK SECTION WITH CLICKABLE 3D SLIDESHOW POPUPS */}
        <section id="work" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-28">
          <div className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="neon-chip-emerald inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono uppercase tracking-widest mb-3">
                <Sparkles className="h-3 w-3" /> Selected Work
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Featured Projects <span className="text-gradient-emerald">&amp; Case Studies.</span>
              </h2>
            </div>
            <p className="text-slate-400 text-sm sm:text-base max-w-md">
              Click on any project below to launch the interactive <strong className="text-emerald-400">4-picture slideshow gallery</strong> showing real screen mockups and architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => {
              const Icon = project.name === "Athithigriha" ? BriefcaseBusiness : project.name === "NapLabs" ? Layers3 : project.name === "PriceWise AI" ? Sparkles : FolderKanban;
              return (
                <div
                  key={project.name}
                  onClick={() => setSelectedProject(project)}
                  className="cursor-pointer group"
                >
                  <TiltCard className="h-full">
                    <article className="glass-morphic-card rounded-2xl p-7 flex flex-col justify-between h-full border border-white/10 hover:border-emerald-500/60 transition-all duration-300">
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-5">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                              <Icon className="h-6 w-6" />
                            </div>
                            <div>
                              <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono">
                                {project.badge}
                              </span>
                              <h3 className="text-2xl font-bold text-white mt-0.5 group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                                {project.name}
                                <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </h3>
                            </div>
                          </div>
                          <span className="text-xs text-slate-400 font-mono border border-white/10 rounded-full px-2.5 py-1">
                            {project.category}
                          </span>
                        </div>

                        <p className="text-slate-300 text-sm leading-relaxed mb-4">
                          {project.description}
                        </p>

                        <div className="text-xs text-slate-400 bg-white/5 rounded-lg p-3 border border-white/5 mb-6">
                          <strong className="text-emerald-300 font-medium block mb-1">Core Contribution:</strong>
                          {project.contribution}
                        </div>
                      </div>

                      {/* Interactive Slideshow Launcher Pill */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="text-[0.7rem] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-[0.7rem] font-mono px-1.5 py-0.5 text-slate-500">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 group-hover:text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30 group-hover:bg-emerald-500/20 transition-all"
                        >
                          <Images className="h-3.5 w-3.5" /> View 4 Slides
                        </button>
                      </div>
                    </article>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-black/40 scroll-mt-28">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="neon-chip-cyan inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono uppercase tracking-widest mb-3">
                Expertise
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
                Services built for <span className="text-gradient-cyan">speed, scale, and clarity.</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                Whether creating a new digital venture or elevating an existing software workflow, I bring tailored frontend excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.number}
                  className="glass-morphic-card rounded-2xl p-6 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group"
                >
                  <div className="text-cyan-400 font-mono text-xs font-bold tracking-widest mb-3">
                    // {service.number}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TOOLS & SKILLS BENTO GRID */}
        <section id="stack" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="neon-chip-violet inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono uppercase tracking-widest mb-3">
              Technical Stack
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Modern Tools for <span className="text-gradient-emerald">High-Performance Systems.</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Hands-on mastery from UI components to RESTful architecture and AI retrieval models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillBento.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.category}
                  className="glass-morphic-card rounded-2xl p-7 border border-white/10 hover:border-emerald-500/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-emerald-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{item.category}</h3>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 text-slate-400 border border-white/10">
                      {item.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-6 font-mono">{item.highlight}</p>

                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:border-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION TIMELINE */}
        <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-black/50 scroll-mt-28">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="neon-chip-emerald inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono uppercase tracking-widest mb-3">
                Background
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Work Experience &amp; <span className="text-gradient-emerald">Education.</span>
              </h2>
            </div>

            <div className="relative pl-8 sm:pl-10 space-y-12">
              {/* Vertical Glowing Tracer Line */}
              <div className="tracer-vertical-line" />

              {/* Sentelligence Solutions */}
              <div className="relative group">
                <div className="absolute -left-[2.1rem] sm:-left-[2.6rem] top-1.5 h-4 w-4 rounded-full bg-emerald-400 tracer-vertical-dot ring-4 ring-black" />
                <div className="glass-morphic-card rounded-2xl p-6 border border-white/10 hover:border-emerald-500/40 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">Frontend Developer / Software Developer</h3>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Current
                    </span>
                  </div>
                  <p className="text-sm text-emerald-400 font-medium mb-3">Sentelligence Solutions Pvt. Ltd.</p>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Developing modern React and TypeScript interfaces for enterprise employee operations platforms,
                    including dynamic dashboards, complex forms, and API-connected workflows.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(projects.find((p) => p.name === "NapLabs") || projects[1])}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/30 hover:bg-emerald-500/20 transition-all cursor-pointer"
                  >
                    <Images className="h-3.5 w-3.5" /> View NapLabs Platform 4-Slide Gallery
                  </button>
                </div>
              </div>

              {/* Naprocs Technologies */}
              <div className="relative group">
                <div className="absolute -left-[2.1rem] sm:-left-[2.6rem] top-1.5 h-4 w-4 rounded-full bg-cyan-400 tracer-vertical-dot ring-4 ring-black" />
                <div className="glass-morphic-card rounded-2xl p-6 border border-white/10 hover:border-cyan-500/40 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">Software Developer</h3>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      Previous
                    </span>
                  </div>
                  <p className="text-sm text-cyan-400 font-medium mb-3">Naprocs Technologies</p>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Contributed to full-stack web applications utilizing React, Node.js, MongoDB, and RESTful APIs,
                    focusing on modular UI and dependable backend communication.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(projects.find((p) => p.name === "Athithigriha") || projects[0])}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/30 hover:bg-cyan-500/20 transition-all cursor-pointer"
                    >
                      <Images className="h-3.5 w-3.5" /> Athithigriha Slides
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(projects.find((p) => p.name === "PriceWise AI") || projects[2])}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/30 hover:bg-cyan-500/20 transition-all cursor-pointer"
                    >
                      <Images className="h-3.5 w-3.5" /> PriceWise AI Slides
                    </button>
                  </div>
                </div>
              </div>

              {/* VVIT Degree */}
              <div className="relative group">
                <div className="absolute -left-[2.1rem] sm:-left-[2.6rem] top-1.5 h-4 w-4 rounded-full bg-violet-400 tracer-vertical-dot ring-4 ring-black" />
                <div className="glass-morphic-card rounded-2xl p-6 border border-white/10 hover:border-violet-500/40 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-violet-400" />
                      <h3 className="text-xl font-bold text-white">B.Tech · Artificial Intelligence &amp; Data Science</h3>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      Graduation 2026
                    </span>
                  </div>
                  <p className="text-sm text-violet-400 font-medium mb-1">
                    Vasireddy Venkatadri Institute of Technology (VVIT), Nambur
                  </p>
                  <p className="text-xs text-slate-300 font-mono mb-3">CGPA 8.63 / 10</p>
                  <div className="pt-3 border-t border-white/10 text-xs text-slate-400">
                    <strong className="text-slate-300">Prior:</strong> Diploma in Computer Science &amp; Engineering (Chalapathi Institute of Technology) · CGPA 8.31
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations / Peer Endorsements */}
            <div className="mt-16 pt-12 border-t border-white/10">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="neon-chip-emerald inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono uppercase tracking-widest mb-3">
                  <Sparkles className="h-3 w-3" /> Peer Endorsements
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Trusted by <span className="text-gradient-emerald">Teams &amp; Engineers.</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-morphic-card rounded-2xl p-6 border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic mb-5">
                    "Pavani has an innate focus on clean React architecture and type safety. When building our enterprise employee operations interfaces, her components were modular, accessible, and delivered with impressive attention to detail."
                  </p>
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">Engineering Colleague</div>
                      <div className="text-slate-400 font-mono text-[0.7rem]">Sentelligence Solutions Pvt. Ltd.</div>
                    </div>
                    <span className="text-emerald-400 font-mono text-[0.65rem] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Verified</span>
                  </div>
                </div>

                <div className="glass-morphic-card rounded-2xl p-6 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic mb-5">
                    "Disciplined, communicative, and fast at translating wireframes into high-performance full-stack workflows with Node and MongoDB. Working with Pavani is always a smooth, dependable experience."
                  </p>
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">Full-Stack Collaborator</div>
                      <div className="text-slate-400 font-mono text-[0.7rem]">Naprocs Technologies</div>
                    </div>
                    <span className="text-cyan-400 font-mono text-[0.65rem] bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section id="process" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="neon-chip-cyan inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono uppercase tracking-widest mb-3">
              Workflow
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Straightforward from <span className="text-gradient-cyan">Concept to Production.</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              A collaborative, predictable methodology that delivers clean code and on-time launches.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="glass-morphic-card rounded-2xl p-6 border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-mono font-bold text-gradient-emerald mb-4">{step.number}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT / INQUIRY SECTION (MONGODB ATLAS CONNECTED) */}
        <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-black/60 scroll-mt-28">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Direct Info */}
              <div className="lg:col-span-5">
                <div className="neon-chip-emerald inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono uppercase tracking-widest mb-4">
                  Let’s Connect
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-6">
                  Have a project in mind? <span className="text-gradient-emerald">Let’s build it.</span>
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-8">
                  Tell me what you’re building, what you need, and your target timeline. I’ll get back to you promptly to
                  discuss the next steps.
                </p>

                <div className="space-y-3 mb-8">
                  {/* Email with 1-click copy */}
                  <div className="flex items-center justify-between p-4 rounded-xl glass-morphic-card border border-white/10 text-slate-200 hover:border-emerald-500/40 transition-all group">
                    <a
                      href="mailto:addepallipavani4@gmail.com"
                      className="flex items-center gap-3.5 hover:text-emerald-400 transition-colors truncate"
                    >
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 border border-emerald-500/20">
                        <Mail className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium truncate">addepallipavani4@gmail.com</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 transition-colors ml-2 shrink-0 cursor-pointer border border-white/10"
                      title="Copy email to clipboard"
                    >
                      {emailCopied ? (
                        <Check className="h-4.5 w-4.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-4.5 w-4.5" />
                      )}
                    </button>
                  </div>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/916281742588"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3.5 p-4 rounded-xl glass-morphic-card border border-white/10 text-slate-200 hover:text-emerald-400 hover:border-emerald-500/40 transition-all group"
                  >
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 border border-emerald-500/20">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">+91 6281742588 on WhatsApp</span>
                    <ArrowUpRight className="h-4.5 w-4.5 ml-auto text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/addepalli-pavani-671b1b23a"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3.5 p-4 rounded-xl glass-morphic-card border border-[#0a66c2]/30 text-slate-200 hover:text-[#38bdf8] hover:border-[#0a66c2]/60 transition-all group"
                  >
                    <div className="p-2.5 rounded-xl bg-[#0a66c2]/20 text-[#38bdf8] shrink-0 border border-[#0a66c2]/35">
                      <Linkedin className="h-5 w-5 text-[#38bdf8]" />
                    </div>
                    <span className="text-sm font-medium truncate">linkedin.com/in/addepalli-pavani-671b1b23a</span>
                    <ArrowUpRight className="h-4.5 w-4.5 ml-auto text-slate-500 group-hover:text-[#38bdf8] transition-colors" />
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/pavani163416"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3.5 p-4 rounded-xl glass-morphic-card border border-white/15 text-slate-200 hover:text-white hover:border-white/35 transition-all group"
                  >
                    <div className="p-2.5 rounded-xl bg-white/10 text-white shrink-0 border border-white/20">
                      <Github className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium truncate">github.com/pavani163416</span>
                    <ArrowUpRight className="h-4.5 w-4.5 ml-auto text-slate-500 group-hover:text-white transition-colors" />
                  </a>

                  {/* Resume PDF Download */}
                  <a
                    href="/assets/Addepalli_Pavani_Resume.pdf"
                    download="Addepalli_Pavani_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3.5 p-4 rounded-xl glass-morphic-card border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/15 transition-all group shadow-lg shadow-emerald-500/5"
                  >
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 border border-emerald-500/30">
                      <FileDown className="h-5 w-5 text-emerald-400" />
                    </div>
                    <span className="text-sm font-medium">Download Official Resume (PDF)</span>
                    <ArrowDown className="h-4.5 w-4.5 ml-auto text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-400 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Prompt reply guaranteed within 24 hours · Open for new projects</span>
                </div>
              </div>

              {/* Right Column: 3D Holographic Form */}
              <div className="lg:col-span-7">
                <div className="glass-morphic-card rounded-3xl p-8 border border-white/15 shadow-2xl relative">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-mono uppercase text-slate-300 mb-2">
                          Your name <span className="text-emerald-400">*</span>
                        </label>
                        <Input
                          id="contact-name"
                          name="name"
                          required
                          maxLength={100}
                          placeholder="Your full name"
                          className="bg-black/40 border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-xl h-11"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-mono uppercase text-slate-300 mb-2">
                          Email address <span className="text-emerald-400">*</span>
                        </label>
                        <Input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          maxLength={254}
                          placeholder="you@company.com"
                          className="bg-black/40 border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-xl h-11"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Project Type */}
                      <div>
                        <label htmlFor="contact-type" className="block text-xs font-mono uppercase text-slate-300 mb-2">
                          Project type <span className="text-emerald-400">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="contact-type"
                            name="project_type"
                            required
                            defaultValue=""
                            className="w-full rounded-xl bg-black/40 border border-white/10 text-white px-3.5 h-11 appearance-none focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 text-sm"
                          >
                            <option value="" disabled className="bg-slate-900 text-slate-500">
                              Choose a project type
                            </option>
                            {projectTypes.map((type) => (
                              <option key={type} value={type} className="bg-slate-900 text-white">
                                {type}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        </div>
                      </div>

                      {/* Budget Range */}
                      <div>
                        <label htmlFor="contact-budget" className="block text-xs font-mono uppercase text-slate-300 mb-2">
                          Budget range <span className="text-slate-500">(Optional)</span>
                        </label>
                        <div className="relative">
                          <select
                            id="contact-budget"
                            name="budget_range"
                            defaultValue=""
                            className="w-full rounded-xl bg-black/40 border border-white/10 text-white px-3.5 h-11 appearance-none focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 text-sm"
                          >
                            <option value="" className="bg-slate-900 text-slate-400">
                              Not decided yet
                            </option>
                            {budgets.map((b) => (
                              <option key={b} value={b} className="bg-slate-900 text-white">
                                {b}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        </div>
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-mono uppercase text-slate-300 mb-2">
                        Phone or WhatsApp <span className="text-slate-500">(Optional)</span>
                      </label>
                      <Input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        maxLength={30}
                        placeholder="+91 or country code"
                        className="bg-black/40 border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-xl h-11"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-mono uppercase text-slate-300 mb-2">
                        A little about your project <span className="text-emerald-400">*</span>
                      </label>
                      <Textarea
                        id="contact-message"
                        name="message"
                        required
                        maxLength={3000}
                        rows={4}
                        placeholder="What are you hoping to build or improve?"
                        className="bg-black/40 border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-xl"
                      />
                    </div>

                    {/* Feedback states */}
                    {formMessage && (
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
                        <Check className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                        <span>{formMessage}</span>
                      </div>
                    )}

                    {formError && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                        {formError}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-semibold px-8 h-12 shadow-lg shadow-emerald-500/25 transition-all hover:scale-105"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Sending inquiry...
                          </>
                        ) : (
                          <>
                            Send project inquiry <Send className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative border-t border-white/10 bg-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2 font-display text-xl text-white">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Addepalli Pavani<span className="text-emerald-400">.</span>
            <span className="text-xs text-slate-500 font-sans ml-2">
              React &amp; TypeScript Developer
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-mono">
            <a href="#work" onClick={(e) => navigateToSection(e, "#work")} className="hover:text-emerald-400">
              Work
            </a>
            <a href="#services" onClick={(e) => navigateToSection(e, "#services")} className="hover:text-emerald-400">
              Services
            </a>
            <a href="#stack" onClick={(e) => navigateToSection(e, "#stack")} className="hover:text-emerald-400">
              Stack
            </a>
            <a href="#about" onClick={(e) => navigateToSection(e, "#about")} className="hover:text-emerald-400">
              About
            </a>
            <a href="#contact" onClick={(e) => navigateToSection(e, "#contact")} className="hover:text-emerald-400">
              Contact
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="https://github.com/pavani163416"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-400 flex items-center gap-1"
            >
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/addepalli-pavani-671b1b23a"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-400 flex items-center gap-1"
            >
              <Linkedin className="h-3.5 w-3.5" /> LinkedIn
            </a>
            <a
              href="/assets/Addepalli_Pavani_Resume.pdf"
              download="Addepalli_Pavani_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-400 flex items-center gap-1 text-emerald-400"
            >
              <FileDown className="h-3.5 w-3.5" /> Resume (PDF)
            </a>
          </div>

          <div className="text-xs text-slate-500">
            © 2026 Addepalli Pavani. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating Toast Notification for Click-to-Copy Email */}
      {emailCopied && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-black px-4 py-3 text-xs font-semibold shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Check className="h-4 w-4 shrink-0" />
          <span>Email copied to clipboard (addepallipavani4@gmail.com)</span>
        </div>
      )}

      {/* Interactive 4-Picture Slideshow Popup Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

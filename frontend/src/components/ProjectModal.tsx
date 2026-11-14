import { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Activity,
  Users,
  Layers,
  Database,
  Smartphone,
  ShieldCheck,
  Search,
  Bell,
  Calendar,
  Sliders,
  Maximize2,
} from "lucide-react";

export interface ProjectSlide {
  title: string;
  subtitle: string;
  accent: string;
  highlights: string[];
  mockupType: "dashboard" | "analytics" | "workflow" | "responsive";
}

export interface ProjectData {
  name: string;
  category: string;
  description: string;
  contribution: string;
  technologies: string[];
  badge: string;
  accent?: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

// Generate 4 tailored dummy project pictures / mockups for each project
const getProjectSlides = (projectName: string): ProjectSlide[] => {
  return [
    {
      title: `${projectName} — Main Operations Dashboard`,
      subtitle: "Consolidated real-time operational overview, key metrics, and activity timeline.",
      accent: "#10b981",
      mockupType: "dashboard",
      highlights: ["Role-aware metrics widgets", "Live event pipeline", "Instant action shortcuts"],
    },
    {
      title: `${projectName} — Analytics & Data Intelligence`,
      subtitle: "Multi-dimensional performance reporting, custom date ranges, and interactive data filters.",
      accent: "#06b6d4",
      mockupType: "analytics",
      highlights: ["Revenue & volume charts", "Dynamic sorting & pagination", "CSV/PDF export workflows"],
    },
    {
      title: `${projectName} — Management Forms & Workflows`,
      subtitle: "Multi-step validation forms, structured entry flows, and state-managed team processes.",
      accent: "#8b5cf6",
      mockupType: "workflow",
      highlights: ["Zod schema validation", "Optimistic state updates", "Draft auto-save capability"],
    },
    {
      title: `${projectName} — Mobile & Responsive Layouts`,
      subtitle: "Full touch-optimized experience with adaptive drawers, gesture controls, and clean typography.",
      accent: "#f59e0b",
      mockupType: "responsive",
      highlights: ["Adaptive navigation drawer", "Zero horizontal scroll", "Sub-second mobile FCP"],
    },
  ];
};

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Reset slide index when opening a new project
  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, project]);

  // Keyboard navigation: Left/Right arrows and Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 3));
      } else if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => (prev < 3 ? prev + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const slides = getProjectSlides(project.name);
  const activeSlide = slides[currentSlide];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[94vh] flex flex-col rounded-2xl bg-[#090c12] border border-white/15 shadow-2xl text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                {project.name}
                <span className="text-[0.7rem] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  {project.badge}
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">{project.category}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
              Slide {currentSlide + 1} of {slides.length}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Slideshow Container */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Main Slideshow Frame */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#06080d] shadow-2xl">
            {/* Browser Chrome Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-black/70 border-b border-white/10 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="flex items-center gap-2 rounded-md bg-white/5 px-4 py-1 text-[0.7rem] font-mono text-slate-300 border border-white/5 truncate max-w-xs sm:max-w-md">
                <ShieldCheck className="h-3 w-3 text-emerald-400 shrink-0" />
                <span>https://app.{project.name.toLowerCase().replace(/[\s-]+/g, "")}.io/overview/screen-0{currentSlide + 1}</span>
              </div>
              <div className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>LIVE UI MOCKUP</span>
              </div>
            </div>

            {/* Slide Visual Mockup Area with 4 Unique Screen Layouts */}
            <div className="relative min-h-[340px] sm:min-h-[420px] p-5 sm:p-7 flex flex-col justify-between bg-gradient-to-br from-[#0c1017] via-[#080b11] to-[#040608]">
              {/* Screen Title & Tag */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.7rem] font-mono mb-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-300">
                    <Sparkles className="h-3 w-3 text-emerald-400" />
                    Dummy Picture 0{currentSlide + 1} · {activeSlide.mockupType.toUpperCase()}
                  </div>
                  <h4 className="text-lg sm:text-2xl font-bold text-white">{activeSlide.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">{activeSlide.subtitle}</p>
                </div>
              </div>

              {/* Dynamic 4-Picture Mockup Graphics */}
              <div className="my-2 rounded-xl border border-white/10 bg-black/40 p-3 sm:p-4 backdrop-blur-sm">
                {currentSlide === 0 && (
                  /* Screen 1: High-Tech Operations Dashboard */
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                        <div className="text-[0.65rem] font-mono text-slate-400 flex items-center justify-between">
                          Total Operations <TrendingUp className="h-3 w-3 text-emerald-400" />
                        </div>
                        <div className="text-lg sm:text-xl font-bold text-white mt-1">1,482</div>
                        <div className="text-[0.65rem] text-emerald-400 font-mono mt-0.5">+14.2% this week</div>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                        <div className="text-[0.65rem] font-mono text-slate-400 flex items-center justify-between">
                          System Health <Activity className="h-3 w-3 text-cyan-400" />
                        </div>
                        <div className="text-lg sm:text-xl font-bold text-cyan-300 mt-1">99.98%</div>
                        <div className="text-[0.65rem] text-cyan-400 font-mono mt-0.5">Optimal latency</div>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                        <div className="text-[0.65rem] font-mono text-slate-400 flex items-center justify-between">
                          Active Sessions <Users className="h-3 w-3 text-violet-400" />
                        </div>
                        <div className="text-lg sm:text-xl font-bold text-violet-300 mt-1">324</div>
                        <div className="text-[0.65rem] text-violet-400 font-mono mt-0.5">Real-time sync</div>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                        <div className="text-[0.65rem] font-mono text-slate-400 flex items-center justify-between">
                          DB Connections <Database className="h-3 w-3 text-emerald-400" />
                        </div>
                        <div className="text-lg sm:text-xl font-bold text-emerald-300 mt-1">Atlas Cluster</div>
                        <div className="text-[0.65rem] text-emerald-400 font-mono mt-0.5">MongoDB Connected</div>
                      </div>
                    </div>

                    {/* Table Preview */}
                    <div className="rounded-lg border border-white/5 bg-white/[0.02] overflow-hidden text-xs">
                      <div className="grid grid-cols-4 px-3 py-2 bg-white/5 font-mono text-[0.65rem] text-slate-400 border-b border-white/5">
                        <div>RECORD ID</div>
                        <div>MODULE ENTITY</div>
                        <div>STATUS</div>
                        <div className="text-right">DISPATCH</div>
                      </div>
                      <div className="divide-y divide-white/5">
                        <div className="grid grid-cols-4 px-3 py-2 items-center text-slate-300">
                          <span className="font-mono text-emerald-400 text-[0.7rem]">#ATH-9021</span>
                          <span className="truncate">Guest Check-In Workflow</span>
                          <span><span className="px-2 py-0.5 rounded text-[0.65rem] font-mono bg-emerald-500/20 text-emerald-300">CONFIRMED</span></span>
                          <span className="text-right font-mono text-[0.7rem] text-slate-400">Just now</span>
                        </div>
                        <div className="grid grid-cols-4 px-3 py-2 items-center text-slate-300">
                          <span className="font-mono text-cyan-400 text-[0.7rem]">#ATH-9022</span>
                          <span className="truncate">Inventory Automated Reorder</span>
                          <span><span className="px-2 py-0.5 rounded text-[0.65rem] font-mono bg-cyan-500/20 text-cyan-300">PROCESSING</span></span>
                          <span className="text-right font-mono text-[0.7rem] text-slate-400">2m ago</span>
                        </div>
                        <div className="grid grid-cols-4 px-3 py-2 items-center text-slate-300">
                          <span className="font-mono text-violet-400 text-[0.7rem]">#ATH-9023</span>
                          <span className="truncate">Billing Pipeline Sync</span>
                          <span><span className="px-2 py-0.5 rounded text-[0.65rem] font-mono bg-violet-500/20 text-violet-300">SETTLED</span></span>
                          <span className="text-right font-mono text-[0.7rem] text-slate-400">5m ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide === 1 && (
                  /* Screen 2: Data Intelligence & Graphical Trend Charts */
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-white/5 text-xs">
                      <span className="font-mono text-slate-300 text-xs">Telemetry &amp; Conversion Analytics</span>
                      <div className="flex items-center gap-1.5 font-mono text-[0.65rem] text-slate-400">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">7D</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300">30D</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300">Quarter</span>
                      </div>
                    </div>

                    {/* SVG Analytics Chart */}
                    <div className="h-32 sm:h-40 w-full relative flex items-end px-2 pt-4">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        {/* Grid lines */}
                        <line x1="0" y1="30" x2="500" y2="30" stroke="#ffffff10" strokeDasharray="3 3" />
                        <line x1="0" y1="60" x2="500" y2="60" stroke="#ffffff10" strokeDasharray="3 3" />
                        <line x1="0" y1="90" x2="500" y2="90" stroke="#ffffff10" strokeDasharray="3 3" />
                        {/* Area fill */}
                        <path
                          d="M0,90 Q50,40 100,55 T200,30 T300,45 T400,20 T500,35 L500,120 L0,120 Z"
                          fill="url(#chartGrad)"
                        />
                        {/* Stroke line */}
                        <path
                          d="M0,90 Q50,40 100,55 T200,30 T300,45 T400,20 T500,35"
                          fill="none"
                          stroke="#06b6d4"
                          strokeWidth="3"
                        />
                        {/* Accent dots */}
                        <circle cx="200" cy="30" r="4" fill="#38bdf8" />
                        <circle cx="400" cy="20" r="4" fill="#10b981" />
                      </svg>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-center">
                      <div>
                        <div className="text-[0.65rem] font-mono text-slate-400">Peak Response</div>
                        <div className="text-sm sm:text-base font-bold text-white mt-0.5">82 ms</div>
                      </div>
                      <div>
                        <div className="text-[0.65rem] font-mono text-slate-400">Query Throughput</div>
                        <div className="text-sm sm:text-base font-bold text-cyan-400 mt-0.5">2,410 req/s</div>
                      </div>
                      <div>
                        <div className="text-[0.65rem] font-mono text-slate-400">Client Reliability</div>
                        <div className="text-sm sm:text-base font-bold text-emerald-400 mt-0.5">100% Validated</div>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide === 2 && (
                  /* Screen 3: Management Forms & Multi-Step Workflows */
                  <div className="space-y-3">
                    {/* Stepper Header */}
                    <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-[0.65rem]">✓</span>
                        <span className="text-slate-300">1. Setup</span>
                      </div>
                      <div className="h-0.5 w-8 bg-emerald-500/60" />
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-violet-500 text-white flex items-center justify-center font-bold text-[0.65rem]">2</span>
                        <span className="text-white font-bold">2. Fields &amp; Rules (Active)</span>
                      </div>
                      <div className="h-0.5 w-8 bg-white/10" />
                      <div className="flex items-center gap-2 text-slate-500">
                        <span className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-[0.65rem]">3</span>
                        <span>3. Deploy</span>
                      </div>
                    </div>

                    {/* Simulated Form Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="space-y-1">
                        <label className="text-[0.7rem] font-mono text-slate-300">Entity Title / Name *</label>
                        <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-emerald-500/40 text-xs text-white flex items-center justify-between">
                          <span>{project.name} Production Workspace</span>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[0.7rem] font-mono text-slate-300">Access Role Permission</label>
                        <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                          Role: Administrator · All privileges
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[0.7rem] font-mono text-slate-300">Schema Validation Policy</label>
                        <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-emerald-400 font-mono">
                          Strict Type-Checked (Zod v3)
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[0.7rem] font-mono text-slate-300">Auto-Save State</label>
                        <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-cyan-300 font-mono flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                          Cloud Synced (<span className="text-slate-400">every 15s</span>)
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide === 3 && (
                  /* Screen 4: Mobile & Multi-Device Responsive Architecture */
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-white/5 text-xs">
                      <span className="font-mono text-slate-300 flex items-center gap-1.5">
                        <Smartphone className="h-3.5 w-3.5 text-emerald-400" />
                        Mobile &amp; Responsive Layout Viewport
                      </span>
                      <span className="font-mono text-[0.65rem] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        100% Touch Responsive
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                      {/* Mobile mockup preview frame */}
                      <div className="sm:col-span-1 mx-auto w-44 rounded-2xl border-2 border-slate-700 bg-black p-2.5 shadow-xl">
                        {/* Notch */}
                        <div className="h-2 w-12 bg-slate-800 rounded-full mx-auto mb-2" />
                        <div className="space-y-1.5">
                          <div className="h-3 w-16 bg-emerald-500/30 rounded" />
                          <div className="h-10 rounded bg-white/10 p-1.5 text-[0.55rem] text-slate-300 leading-tight">
                            {project.name} Mobile App View
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <div className="h-6 rounded bg-emerald-500/20" />
                            <div className="h-6 rounded bg-cyan-500/20" />
                          </div>
                          <div className="h-12 rounded bg-white/5 p-1 text-[0.5rem] text-slate-400">
                            Smooth gesture drawer, zero horizontal overflow
                          </div>
                        </div>
                        {/* Home indicator */}
                        <div className="h-1 w-10 bg-slate-700 rounded-full mx-auto mt-2" />
                      </div>

                      {/* Device specs */}
                      <div className="sm:col-span-2 space-y-2 text-xs">
                        <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                          <div className="font-bold text-white text-xs mb-1">Fluid Breakpoint Engine</div>
                          <p className="text-[0.7rem] text-slate-400 leading-relaxed">
                            Engineered with Tailwind CSS fluid clamp units, ensuring clean typographic hierarchy and touch-friendly targets from iPhone SE up to 4K Ultrawide displays.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-center font-mono text-[0.7rem]">
                          <div className="p-2 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                            Mobile FCP &lt; 0.9s
                          </div>
                          <div className="p-2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                            Lighthouse Score: 98
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Slide Feature Highlights */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {activeSlide.highlights.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                      {item}
                    </span>
                  ))}
                </div>

                <div className="text-[0.7rem] font-mono text-slate-400">
                  Slide {currentSlide + 1} of 4
                </div>
              </div>

              {/* Left/Right Arrow Navigation Buttons */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 transition-all hover:scale-110 shadow-2xl cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={() => setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 transition-all hover:scale-110 shadow-2xl cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* 4 Picture Thumbnails Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {slides.map((s, index) => (
              <button
                key={s.title}
                onClick={() => setCurrentSlide(index)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  currentSlide === index
                    ? "border-emerald-400 bg-emerald-500/15 shadow-lg shadow-emerald-500/20 scale-[1.02]"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-between text-[0.65rem] font-mono text-emerald-400 font-bold mb-1">
                  <span>DUMMY_IMG_0{index + 1}</span>
                  {currentSlide === index && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                </div>
                <div className="text-xs font-semibold text-white truncate">{s.title.split("—")[1]?.trim() || s.title}</div>
                <div className="text-[0.65rem] text-slate-400 truncate mt-0.5 capitalize">{s.mockupType} Screen</div>
              </button>
            ))}
          </div>

          {/* Project Details & Tech Stack */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
            <div className="text-xs text-slate-300">
              <strong className="text-white">Project Scope:</strong> {project.description}
            </div>
            <div className="text-xs text-slate-300">
              <strong className="text-emerald-400">Engineering Contribution:</strong> {project.contribution}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[0.7rem] font-mono px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="text-[0.7rem] font-mono text-slate-400">
                Tip: Use ← → keys to switch slides or Esc to close
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

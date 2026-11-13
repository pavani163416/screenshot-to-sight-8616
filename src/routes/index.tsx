import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  FolderKanban,
  Layers3,
  Mail,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  Sparkles,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import editorialStillLife from "@/assets/pavani-editorial-still-life.jpg";

const navigation = [
  { label: "Services", href: "#services" },
  { label: "Selected work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
];

const projects = [
  {
    name: "Athithigriha",
    category: "Hotel management · Web application",
    description:
      "A hotel management application bringing day-to-day operations and workflows into one considered digital experience.",
    contribution:
      "Responsive interfaces, dashboards, management screens, forms and guest-to-team workflows.",
    technologies: ["React", "TypeScript", "MUI", "Responsive UI"],
    Icon: BriefcaseBusiness,
    tone: "olive",
  },
  {
    name: "NapLabs",
    category: "Business operations · Platform",
    description:
      "A centralized business operations platform designed to make everyday workflows easier to manage.",
    contribution:
      "Product interfaces, management workflows, authentication UI and API-connected responsive screens.",
    technologies: ["React", "TypeScript", "JavaScript", "API integration"],
    Icon: Layers3,
    tone: "stone",
  },
  {
    name: "PriceWise AI",
    category: "AI application · Product discovery",
    description:
      "A price-comparison concept that helps shoppers explore product options and make more informed decisions.",
    contribution:
      "Product search, side-by-side comparison and clear, approachable results experiences.",
    technologies: ["React", "JavaScript", "API integration", "AI"],
    Icon: Sparkles,
    tone: "coral",
  },
  {
    name: "E-Khatha",
    category: "Property services · Web application",
    description:
      "A digital property and document platform focused on making information and processes simpler to navigate.",
    contribution:
      "Responsive screens, dashboards, forms and clear end-to-end user workflows.",
    technologies: ["React", "TypeScript", "MUI", "JavaScript"],
    Icon: FolderKanban,
    tone: "blue",
  },
];

const services = [
  {
    number: "01",
    name: "Business websites",
    description: "Thoughtful, responsive websites for growing companies and local businesses.",
  },
  {
    number: "02",
    name: "React web applications",
    description: "Custom digital products built around the way your team and customers work.",
  },
  {
    number: "03",
    name: "Admin dashboards",
    description: "Clear, useful interfaces for customer, employee, order and operations data.",
  },
  {
    number: "04",
    name: "Management portals",
    description: "Responsive, role-aware portals that bring business workflows together.",
  },
  {
    number: "05",
    name: "Website redesigns",
    description: "A more current and usable experience for an existing website or product.",
  },
  {
    number: "06",
    name: "Frontend development",
    description: "Reusable React and TypeScript interfaces built to work across screens.",
  },
  {
    number: "07",
    name: "Fixes & improvements",
    description: "Practical help with UI bugs, layout issues and responsive polish.",
  },
];

const skillGroups = [
  {
    title: "Frontend",
    details: "React · TypeScript · JavaScript · HTML5 · CSS3 · MUI · Tailwind CSS",
  },
  { title: "Backend & data", details: "Node.js · Python · Flask · REST APIs · SQL · MongoDB" },
  { title: "AI & analytics", details: "YOLOv5 · EasyOCR · FAISS · RAG · Power BI · Tableau" },
  { title: "Tools & languages", details: "Git · GitHub · Vite · VS Code · Python · Java · C · C++" },
];

const processSteps = [
  { number: "01", title: "Discover", detail: "Understand your business, your people and what needs to change." },
  { number: "02", title: "Plan", detail: "Agree on the scope, structure and the right features to begin with." },
  { number: "03", title: "Build", detail: "Shape the experience and develop it with care, screen by screen." },
  { number: "04", title: "Launch", detail: "Test, deploy and hand over a product ready for real use." },
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
      { title: "Pavani — React & TypeScript Developer for Growing Businesses" },
      {
        name: "description",
        content:
          "Freelance React and TypeScript development for businesses: responsive websites, web applications, dashboards and management portals by Pavani.",
      },
      {
        property: "og:title",
        content: "Pavani — Websites & Web Applications for Growing Businesses",
      },
      {
        property: "og:description",
        content:
          "Practical, responsive digital products for businesses, startups and growing teams. Explore Pavani’s work and start a project.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

export function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormMessage("");
    setFormError("");

    const accessKey = import.meta.env["VITE_WEB3FORMS_ACCESS_KEY"];
    if (!accessKey) {
      setFormError(
        "The inquiry form isn’t connected yet. Please email Pavani or message her on WhatsApp instead.",
      );
      return;
    }

    setSubmitting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("access_key", accessKey);
    formData.set("subject", "New freelance project inquiry for Pavani");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) {
        throw new Error("The form could not be submitted.");
      }

      setFormMessage("Thanks! Your project inquiry has been received. I’ll get back to you soon.");
      form.reset();
    } catch {
      setFormError("Your inquiry couldn’t be sent right now. Please email Pavani or message her on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="portfolio-shell min-h-screen bg-background text-foreground">
      <header className="portfolio-header sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-sm">
        <div className="portfolio-container flex h-[4.75rem] items-center justify-between gap-5">
          <a className="portfolio-wordmark" href="#home" aria-label="Pavani, back to home">
            pavani<span>.</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {navigation.map((item) => (
              <a className="portfolio-nav-link" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <Button
            asChild
            className="hidden h-10 rounded-sm px-5 text-xs md:inline-flex"
            size="sm"
          >
            <a href="#contact">
              Start a project <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>

          <Button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            className="md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            size="icon"
            variant="ghost"
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
        {menuOpen && (
          <nav className="portfolio-mobile-nav border-t border-border md:hidden" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
                {item.label} <ArrowRight aria-hidden="true" />
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Start a project <ArrowUpRight aria-hidden="true" />
            </a>
          </nav>
        )}
      </header>

      <main>
        <section className="portfolio-container portfolio-hero" id="home">
          <div className="portfolio-hero-copy">
            <p className="portfolio-kicker">
              <span aria-hidden="true" /> Independent developer · Taking on select projects
            </p>
            <h1>
              Websites &amp; digital products, <em>built around your business.</em>
            </h1>
            <p className="portfolio-hero-lede">
              I help businesses turn ideas and everyday workflows into responsive websites,
              dashboards and web applications with React and TypeScript.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild className="h-12 rounded-sm px-6">
                <a href="#contact">
                  Start a project <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
              <Button asChild className="h-12 rounded-sm px-6" variant="outline">
                <a href="#work">
                  View selected work <ArrowDown aria-hidden="true" />
                </a>
              </Button>
            </div>
            <p className="portfolio-hero-caption">
              React &amp; TypeScript development <span>·</span> India, working worldwide
            </p>
          </div>
          <div className="portfolio-hero-image-wrap">
            <img
              alt="A laptop with a blank screen in a calm, sculptural studio setting"
              className="portfolio-hero-image"
              height={1152}
              src={editorialStillLife}
              width={960}
            />
            <div className="portfolio-image-caption">
              <span>Thoughtful by design.</span>
              <span>Useful by nature.</span>
            </div>
            <div className="portfolio-image-index" aria-hidden="true">
              P<span>·</span>01
            </div>
          </div>
        </section>

        <div className="portfolio-proof-band" aria-label="Areas of focus">
          <div className="portfolio-container portfolio-proof-inner">
            <span>Made for growing businesses</span>
            <span>Websites</span>
            <span>Dashboards</span>
            <span>Web applications</span>
            <span>Responsive by default</span>
          </div>
        </div>

        <section className="portfolio-section portfolio-container" id="services">
          <div className="portfolio-section-heading">
            <div>
              <p className="portfolio-eyebrow">How I can help</p>
              <h2>Digital work that <em>works harder.</em></h2>
            </div>
            <p>
              From your first website to the dashboard your team relies on, I build digital
              experiences around real needs—not features for their own sake.
            </p>
          </div>
          <div className="portfolio-services-grid">
            {services.map((service) => (
              <article className="portfolio-service" key={service.number}>
                <span className="portfolio-service-number">{service.number}</span>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio-work-band" id="work">
          <div className="portfolio-container portfolio-section">
            <div className="portfolio-section-heading portfolio-work-heading">
              <div>
                <p className="portfolio-eyebrow">A few things I’ve worked on</p>
                <h2>Selected <em>work.</em></h2>
              </div>
              <p>
                A mix of business platforms and product ideas—each shaped around clearer workflows
                and useful, responsive interfaces.
              </p>
            </div>

            <div className="portfolio-project-list">
              {projects.map((project, index) => (
                <article className="portfolio-project" key={project.name}>
                  <div
                    className={`portfolio-project-preview portfolio-project-preview--${project.tone}`}
                    aria-label={`${project.name} project screenshot coming soon`}
                  >
                    <div className="portfolio-preview-window">
                      <div className="portfolio-preview-chrome" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                        <div className="portfolio-preview-address" />
                      </div>
                      <div className="portfolio-preview-content">
                        <span className="portfolio-preview-number">0{index + 1}</span>
                        <project.Icon aria-hidden="true" className="portfolio-preview-icon" />
                      <span className="portfolio-preview-caption">Project preview area · Screenshot to come</span>
                      </div>
                    </div>
                  </div>
                  <div className="portfolio-project-copy">
                    <p className="portfolio-project-category">{project.category}</p>
                    <div className="portfolio-project-title-row">
                      <h3>{project.name}</h3>
                      <span className="portfolio-project-index">0{index + 1}</span>
                    </div>
                    <p className="portfolio-project-description">{project.description}</p>
                    <p className="portfolio-project-contribution">
                      <strong>My contribution</strong> {project.contribution}
                    </p>
                    <ul className="portfolio-tech-list" aria-label={`${project.name} technologies`}>
                      {project.technologies.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                    <span className="portfolio-project-note">Project links to be added when publicly available</span>
                  </div>
                </article>
              ))}
            </div>
            <p className="portfolio-confidential-note">
              Professional work is presented at a high level; confidential systems and company
              materials are not shared here.
            </p>
          </div>
        </section>

        <section className="portfolio-section portfolio-container" id="about">
          <div className="portfolio-about-layout">
            <div className="portfolio-about-intro">
              <p className="portfolio-eyebrow">A little about me</p>
              <h2>Good technology starts with <em>understanding people.</em></h2>
              <p>
                I’m Pavani, a developer who brings technical thinking and business context together
                to make software clear, responsive and genuinely useful. My focus is React and
                TypeScript, backed by full-stack experience and a curiosity for AI and data.
              </p>
              <p>
                I’ve built enterprise interfaces, employee dashboards, management workflows and
                data-informed product experiences—always with the people using them in mind.
              </p>
              <div className="portfolio-about-tags">
                <span><Code2 aria-hidden="true" /> React &amp; TypeScript</span>
                <span><MonitorSmartphone aria-hidden="true" /> Responsive UI</span>
                <span><Layers3 aria-hidden="true" /> Full-stack experience</span>
              </div>
            </div>
            <div className="portfolio-background">
              <div className="portfolio-background-block">
                <p className="portfolio-eyebrow">Experience</p>
                <article className="portfolio-timeline-item">
                  <div className="portfolio-timeline-marker" aria-hidden="true" />
                  <div>
                    <h3>Frontend Developer / Software Developer</h3>
                    <p className="portfolio-timeline-company">Sentelligence Solutions Pvt. Ltd. <span>· Current</span></p>
                    <p>React and TypeScript interfaces for an enterprise employee operations platform, including dashboards, forms and API-connected workflows.</p>
                  </div>
                </article>
                <article className="portfolio-timeline-item">
                  <div className="portfolio-timeline-marker" aria-hidden="true" />
                  <div>
                    <h3>Software Developer</h3>
                    <p className="portfolio-timeline-company">Naprocs Technologies <span>· Previous</span></p>
                    <p>Full-stack web development with React, Node.js, MongoDB and REST APIs.</p>
                  </div>
                </article>
              </div>
              <div className="portfolio-background-block portfolio-education">
                <p className="portfolio-eyebrow">Education</p>
                <div className="portfolio-education-item">
                  <span className="portfolio-education-year">2026</span>
                  <div>
                    <h3>B.Tech · Artificial Intelligence &amp; Data Science</h3>
                    <p>Vasireddy Venkatadri Institute of Technology (VVIT), Nambur</p>
                    <span className="portfolio-education-result">CGPA 8.51 / 10</span>
                  </div>
                </div>
                <div className="portfolio-education-item">
                  <span className="portfolio-education-year">3 years</span>
                  <div>
                    <h3>Diploma · Computer Science &amp; Engineering</h3>
                    <p>78.98%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="portfolio-skills">
            <div className="portfolio-skills-heading">
              <p className="portfolio-eyebrow">Tools I work with</p>
              <h2>The right tools for <em>the right job.</em></h2>
            </div>
            <div className="portfolio-skill-list">
              {skillGroups.map((group) => (
                <div className="portfolio-skill-row" key={group.title}>
                  <h3>{group.title}</h3>
                  <p>{group.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="portfolio-reasons-band">
          <div className="portfolio-container portfolio-section">
            <div className="portfolio-section-heading">
              <div>
                <p className="portfolio-eyebrow">A good working relationship</p>
                <h2>Built with you, <em>not just for you.</em></h2>
              </div>
              <p>
                Clear expectations and thoughtful details matter as much as the final interface.
              </p>
            </div>
            <div className="portfolio-reasons-grid">
              <article><span>01</span><h3>Business first</h3><p>Start with what your customers or team actually need to accomplish.</p></article>
              <article><span>02</span><h3>Responsive by default</h3><p>Considered layouts that work from desktop to the phone in your pocket.</p></article>
              <article><span>03</span><h3>Clean, maintainable UI</h3><p>Reusable patterns and carefully structured interfaces that can grow.</p></article>
              <article><span>04</span><h3>Modern, practical tools</h3><p>React, TypeScript and modern frontend practices used with purpose.</p></article>
              <article><span>05</span><h3>Clear communication</h3><p>Know what’s happening, what’s next and where decisions are needed.</p></article>
            </div>
          </div>
        </section>

        <section className="portfolio-section portfolio-container" id="process">
          <div className="portfolio-section-heading">
            <div>
              <p className="portfolio-eyebrow">From idea to launch</p>
              <h2>A straightforward way <em>to get there.</em></h2>
            </div>
            <p>A collaborative process, with the next step clear at every stage.</p>
          </div>
          <ol className="portfolio-process-list">
            {processSteps.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="portfolio-testimonial-band" aria-labelledby="testimonial-title">
          <div className="portfolio-container portfolio-testimonial">
            <p className="portfolio-eyebrow">Kind words, when they’re ready</p>
            <h2 id="testimonial-title">Client testimonials <em>will appear here.</em></h2>
            <p>Good work speaks for itself—and I’ll let clients share their experience in their own words.</p>
          </div>
        </section>

        <section className="portfolio-contact-band" id="contact">
          <div className="portfolio-container portfolio-section">
            <div className="portfolio-contact-heading">
              <div>
                <p className="portfolio-eyebrow">Let’s talk about what’s next</p>
                <h2>Have a project in mind? <em>Let’s build it.</em></h2>
                <p className="portfolio-contact-lede">
                  Tell me what you’re building, what you need, and where you’d like to go. I’ll get
                  back to you to discuss the project.
                </p>
                <div className="portfolio-contact-links">
                  <a href="mailto:addepallipavani4@gmail.com">
                    <Mail aria-hidden="true" /> addepallipavani4@gmail.com <ArrowUpRight aria-hidden="true" />
                  </a>
                  <a href="https://wa.me/916281742588" rel="noreferrer" target="_blank">
                    <MessageCircle aria-hidden="true" /> +91 6281742588 on WhatsApp <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
                <p className="portfolio-social-note">GitHub and LinkedIn profiles coming soon</p>
              </div>

              <form className="portfolio-contact-form" onSubmit={handleSubmit}>
                <div className="portfolio-form-grid">
                  <div className="portfolio-form-field">
                    <label htmlFor="contact-name">Your name <span aria-hidden="true">*</span></label>
                    <Input autoComplete="name" id="contact-name" maxLength={100} name="name" placeholder="Name" required />
                  </div>
                  <div className="portfolio-form-field">
                    <label htmlFor="contact-email">Email address <span aria-hidden="true">*</span></label>
                    <Input autoComplete="email" id="contact-email" maxLength={254} name="email" placeholder="you@company.com" required type="email" />
                  </div>
                  <div className="portfolio-form-field">
                    <label htmlFor="contact-type">Project type <span aria-hidden="true">*</span></label>
                    <div className="portfolio-select-wrap">
                      <select defaultValue="" id="contact-type" name="project_type" required>
                        <option disabled value="">Choose a project type</option>
                        {projectTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                      </select>
                      <ChevronDown aria-hidden="true" />
                    </div>
                  </div>
                  <div className="portfolio-form-field">
                    <label htmlFor="contact-budget">Budget range <span>(optional)</span></label>
                    <div className="portfolio-select-wrap">
                      <select defaultValue="" id="contact-budget" name="budget_range">
                        <option value="">Not decided yet</option>
                        {budgets.map((budget) => <option key={budget} value={budget}>{budget}</option>)}
                      </select>
                      <ChevronDown aria-hidden="true" />
                    </div>
                  </div>
                  <div className="portfolio-form-field portfolio-form-full">
                    <label htmlFor="contact-phone">Phone or WhatsApp <span>(optional)</span></label>
                    <Input autoComplete="tel" id="contact-phone" maxLength={30} name="phone" placeholder="Include country code if outside India" type="tel" />
                  </div>
                  <div className="portfolio-form-field portfolio-form-full">
                    <label htmlFor="contact-message">A little about your project <span aria-hidden="true">*</span></label>
                    <Textarea id="contact-message" maxLength={3000} name="message" placeholder="What are you hoping to build or improve?" required rows={4} />
                  </div>
                </div>
                {formMessage && <p className="portfolio-form-success" role="status"><Check aria-hidden="true" /> {formMessage}</p>}
                {formError && <p className="portfolio-form-error" role="alert">{formError}</p>}
                <div className="portfolio-form-submit">
                  <Button className="h-12 rounded-sm px-6" disabled={submitting} type="submit">
                    {submitting ? "Sending…" : "Send project inquiry"} <ArrowUpRight aria-hidden="true" />
                  </Button>
                  <span>Budget is optional. A first conversation is always a good start.</span>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="portfolio-footer">
        <div className="portfolio-container portfolio-footer-inner">
          <div>
            <a className="portfolio-wordmark" href="#home">pavani<span>.</span></a>
            <p>React &amp; TypeScript developer · Websites, dashboards &amp; web applications</p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <p className="portfolio-copyright">© 2026 Pavani. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

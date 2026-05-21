import type {
  Project,
  ProcessStep,
  AboutStat,
  HeroStat,
  HeroDiscipline,
  ContactMetaItem,
  NavLink,
  FooterLink,
  PinThumb,
  IgThumb,
} from "@/types";

export interface MediaItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  caption?: string;
  layoutHint?: "full" | "left" | "right" | "half";
}

export interface ProjectDetail {
  slug: string;
  title: string;
  category: string;
  description: string;
  location: string;
  year: string;
  media: MediaItem[];
}

// ─── SITE META ────────────────────────────────────────────
export const siteTitle =
  "Anastasiia Monzón — Architectural Visualisation Studio";
export const siteDescription =
  "Architectural visualisation studio specialising in interiors, exteriors, and landscape design. Available for projects worldwide.";

// ─── HEADER ───────────────────────────────────────────────
export const logoText = "A. Monzón";

export const navLinks: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact", cta: true },
];

// ─── HERO ─────────────────────────────────────────────────
export const heroEyebrow = "Architectural Visualisation Studio";
export const heroName = ["Anastasiia", "Monzón"] as const;
export const heroTagline =
  "Turning empty rooms into finished stories — before a single brick is laid.";
export const heroPrimaryBtn = "View work \u00a0→";
export const heroSecondaryBtn = "Start a project";

export const heroQuote =
  '"Architecture is the art of how to waste space thoughtfully — I make sure it photographs beautifully."';
export const heroAvailDot = "Currently accepting Q3 2026 projects";
export const heroAvailLabel = "Worldwide · Remote";
export const heroScrollLabel = "Scroll";

export const heroDisciplines: HeroDiscipline[] = [
  { label: "Interior visualisation", active: true },
  { label: "Exterior & architecture", active: true },
  { label: "Landscape design", active: false },
];

export const heroStats: HeroStat[] = [
  { num: "40+", label: "Projects" },
  { num: "12+", label: "Countries" },
  { num: "6", label: "Years" },
];

// ─── SCROLL ANIMATION ─────────────────────────────────────
export const animGhostTitle = "An empty room fills with life";
export const animGhostSub = "Scroll to reveal";
export const animCaptionText = "Interior visualisation";
export const animCounter = "001 / 120";

// ─── WORK SECTION (HOME) ──────────────────────────────────
export const workEyebrow = "Portfolio";
export const workTitle = "Selected work";
export const workAllLink = "All projects →";

export const projects: Project[] = [
  {
    id: "office-moscow",
    name: "Office Complex\nMoscow",
    sub: "Commercial · 4,200 m²",
    year: "2023",
    featured: true,
    tags: [{ label: "Interior", variant: "interior" }],
    imgLabel: "Interior · 3D render",
    imgStyle:
      "linear-gradient(135deg, rgba(43,42,39,0.35) 0%, rgba(43,42,39,0.05) 100%), repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 28px), #c2b2a5",
  },
  {
    id: "garden-spa",
    name: "Garden Spa",
    sub: "Landscape · Private residence",
    year: "2023",
    featured: false,
    tags: [{ label: "Exterior", variant: "exterior" }],
    imgLabel: "Exterior · 3D render",
    imgStyle:
      "linear-gradient(135deg, rgba(106,124,94,0.25) 0%, rgba(43,42,39,0.05) 100%), #b2c4a8",
  },
  {
    id: "luxury-flat",
    name: "Luxury Flat, Tverskaya",
    sub: "Residential · Central Moscow",
    year: "2024",
    featured: false,
    tags: [{ label: "Interior", variant: "interior" }],
    imgLabel: "Interior · 3D render",
    imgStyle:
      "linear-gradient(155deg, rgba(232,197,192,0.25) 0%, rgba(43,42,39,0.1) 100%), #c4b0ae",
  },
  {
    id: "law-firm-buffet",
    name: "Law Firm Buffet",
    sub: "Commercial · Premium F&B interior",
    year: "2025",
    featured: false,
    tags: [
      { label: "Interior", variant: "interior" },
      { label: "In production", variant: "neutral" },
    ],
    imgLabel: "In production",
    imgStyle:
      "linear-gradient(135deg, rgba(168,184,154,0.25) 0%, rgba(43,42,39,0.08) 100%), #b8c8b0",
  },
];

// ─── DYNAMIC PROJECTS (CASE STUDIES) ──────────────────────
export const detailedProjects: ProjectDetail[] = [
  {
    slug: "office-moscow",
    title: "Office Complex Moscow",
    category: "Commercial",
    location: "Moscow, Russia",
    year: "2023",
    description:
      "A 4,200 m² commercial headquarters designed to project authority through restraint — travertine floors, brushed-brass joinery, and cathedral-height atria rendered across twelve camera studies to guide the client's design approval process.",
    media: [
      // Add real project media here
    ],
  },
  {
    slug: "garden-spa",
    title: "Garden Spa",
    category: "Landscape",
    location: "Private residence",
    year: "2023",
    description:
      "A private spa garden conceived as a series of outdoor rooms: the pool terrace, the shade pavilion, and the kitchen garden. Every planting scheme, stone selection, and water feature was resolved in 3D before a single plant was ordered.",
    media: [
      // Add real project media here
    ],
  },
  {
    slug: "luxury-flat",
    title: "Luxury Flat, Tverskaya",
    category: "Residential",
    location: "Central Moscow",
    year: "2024",
    description:
      "A 180 m² apartment in Moscow's most sought-after address. The brief called for restrained luxury — Arabescato marble, bouclé upholstery, and floor-to-ceiling glazing — resolved across nine final renders and one cinematic walkthrough.",
    media: [
      {
        type: "image",
        src: "/projects/luxury-flat/placeholder.jpg",
        caption:
          "The pre-dawn render was the client's specific request — they wanted to see how the room felt at 5 a.m., when the city light is a thin grey ribbon on the horizon and the room belongs entirely to itself.",
        layoutHint: "full",
      },
    ],
  },
  {
    slug: "law-firm-buffet",
    title: "Law Firm Buffet",
    category: "Commercial",
    location: "Premium F&B interior",
    year: "2025",
    description:
      "An in-house dining and hospitality suite for a prominent law firm, currently in production. Material directions under review — two tile options and three lighting scenarios are being evaluated ahead of the final client presentation.",
    media: [
      // Add real project media here
    ],
  },
];

export function getProject(slug: string): ProjectDetail | null {
  return detailedProjects.find((project) => project.slug === slug) || null;
}

// ─── PROCESS SECTION ──────────────────────────────────────
export const processEyebrow = "How it works";
export const processTitle = "From brief to delivery";

export const processSteps: ProcessStep[] = [
  {
    num: "01 — Brief",
    phase: "Brief",
    name: "Discovery & scope",
    desc: "We discuss your project, references, materials, and timeline. I'll ask about mood, function, and who the space is for.",
  },
  {
    num: "02 — Concept",
    phase: "Concept",
    name: "Draft renders",
    desc: "Low-resolution drafts to validate camera angles, proportions, and lighting direction before committing to full quality.",
  },
  {
    num: "03 — Refinement",
    phase: "Refinement",
    name: "Full renders",
    desc: "High-resolution production renders with two rounds of revision included. Additional rounds available on request.",
  },
  {
    num: "04 — Delivery",
    phase: "Delivery",
    name: "Final files",
    desc: "Print-ready TIFFs and web-optimised JPEGs. Full commercial licence included. Turnaround typically 5–10 business days.",
  },
];

// ─── ABOUT SECTION ────────────────────────────────────────
export const aboutEyebrow = "Background";
export const aboutHeadline =
  "Trained in landscape architecture.\nFluent in light and space.";
export const aboutBody1 =
  "I'm Anastasiia — a 3D visualisation artist with a Bachelor's degree in Landscape Architecture. My academic background means I understand how spaces relate to their environment: how light behaves at different hours, how materials age, how a garden and a building can speak the same visual language.";
export const aboutBody2 =
  "Based in Mexico, I work remotely with clients across the United States, Canada, Australia, New Zealand, and beyond. My recent projects include an office complex and luxury residential flat in central Moscow, and an ongoing law firm interior currently in production.";
export const aboutBadgeNum = "6+";
export const aboutBadgeLabel = "Years of practice";
export const aboutPortraitLabel = "Portrait of Anastasiia Monzón";
export const aboutPortraitPlaceholder = "portrait photo";

export const aboutCredentials: string[] = [
  "B.A. Landscape Architecture",
  "Remote-first · English & Spanish",
  "Based in Mexico · UTC−7",
  "Replies within 24 hours",
];

export const aboutStats: AboutStat[] = [
  { num: "40+", label: "Projects delivered" },
  { num: "12+", label: "Countries served" },
  { num: "3", label: "Disciplines" },
];

// ─── SOCIAL SECTION ───────────────────────────────────────
export const socialEyebrow = "Find me online";
export const socialTitle = "Work in progress";
export const socialIntro =
  "I post renders, material studies, and finished projects on Pinterest and Instagram. Both are good places to see what's coming before it lands here.";
export const pinterestLabel = "📌\u00a0 Pinterest";
export const instagramLabel = "📷\u00a0 Instagram";

export const pinThumbs: PinThumb[] = [
  { label: "Interior", bgClass: "pin-1", tall: true },
  { label: "Garden", bgClass: "pin-2" },
  { label: "Facade", bgClass: "pin-3" },
];

export const igThumbs: IgThumb[] = [
  { bgColor: "#c9bfb5" },
  { bgColor: "#b8c9b0" },
  { bgColor: "#d4a0a4" },
  { bgColor: "#a8b89a" },
  { bgColor: "#d9cbbe" },
  { bgColor: "#c2b8d0" },
  { bgColor: "#bec8b5" },
  { bgColor: "#d4b8b5" },
  { bgColor: "#c8c4ba" },
];

// ─── CONTACT SECTION ──────────────────────────────────────
export const contactEyebrow = "Get in touch";
export const contactHeadline = "Tell me about\nyour project";
export const contactNote =
  "I read every message personally and reply within one business day.";
export const contactSubmitBtn = "Send message \u00a0→";
export const contactPricingAnchor = "Starting from $800 per render";

export const contactMeta: ContactMetaItem[] = [
  {
    label: "Email",
    value: "hello@anastasiamonzon.com",
    href: "mailto:hello@anastasiamonzon.com",
  },
  { label: "Timezone", value: "UTC−7 · Mexico" },
  { label: "Response", value: "Within 24 hours" },
  { label: "Languages", value: "English · Spanish · Russian" },
];

export const contactSocials = [
  { label: "Pinterest", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export const formProjectTypes = [
  { value: "interior", label: "Interior visualisation" },
  { value: "exterior", label: "Exterior / architecture" },
  { value: "landscape", label: "Landscape / garden" },
  { value: "other", label: "Other" },
];

export const formBudgets = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-3k", label: "$1,000 – $3,000" },
  { value: "3k-8k", label: "$3,000 – $8,000" },
  { value: "8k-plus", label: "$8,000+" },
];

// ─── FOOTER ───────────────────────────────────────────────
export const footerCopy = "© 2026 Anastasiia Monzon · All rights reserved";

export const footerLinks: FooterLink[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy", href: "#" },
];

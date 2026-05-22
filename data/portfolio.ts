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
    id: "slavic-sauna",
    name: "Slavic Sauna",
    sub: "Residential · Private wellness",
    year: "2023",
    featured: false,
    tags: [{ label: "Interior", variant: "interior" }],
    imgLabel: "Interior · 3D render",
    imgStyle:
      "linear-gradient(135deg, rgba(160,100,70,0.3) 0%, rgba(43,42,39,0.08) 100%), #c4a882",
  },
  {
    id: "lake-house",
    name: "Lake House",
    sub: "Residential · Exterior",
    year: "2024",
    featured: false,
    tags: [{ label: "Exterior", variant: "exterior" }],
    imgLabel: "Exterior · 3D render",
    imgStyle:
      "linear-gradient(135deg, rgba(80,110,140,0.3) 0%, rgba(43,42,39,0.05) 100%), #a0b8c8",
  },
  {
    id: "linear-park",
    name: "Linear Park",
    sub: "Landscape · Public space",
    year: "2023",
    featured: false,
    tags: [{ label: "Exterior", variant: "exterior" }],
    imgLabel: "Exterior · 3D render",
    imgStyle:
      "linear-gradient(135deg, rgba(100,130,80,0.3) 0%, rgba(43,42,39,0.05) 100%), #a8c090",
  },
  {
    id: "city-park-chekhov",
    name: "City Park\nChekhov",
    sub: "Landscape · Public space",
    year: "2024",
    featured: false,
    tags: [{ label: "Exterior", variant: "exterior" }],
    imgLabel: "Exterior · 3D render",
    imgStyle:
      "linear-gradient(135deg, rgba(120,150,90,0.25) 0%, rgba(43,42,39,0.05) 100%), #b0c4a0",
  },
  {
    id: "modern-chalet",
    name: "Modern Chalet",
    sub: "Residential · Exterior",
    year: "2024",
    featured: false,
    tags: [{ label: "Exterior", variant: "exterior" }],
    imgLabel: "Exterior · 3D render",
    imgStyle:
      "linear-gradient(135deg, rgba(180,150,110,0.3) 0%, rgba(43,42,39,0.08) 100%), #c8b090",
  },
  {
    id: "warsaw-house",
    name: "Warsaw House",
    sub: "Residential · Exterior",
    year: "2023",
    featured: false,
    tags: [{ label: "Exterior", variant: "exterior" }],
    imgLabel: "Exterior · 3D render",
    imgStyle:
      "linear-gradient(135deg, rgba(100,95,85,0.25) 0%, rgba(43,42,39,0.05) 100%), #b8b4ac",
  },
  {
    id: "mexican-house",
    name: "Mexican House",
    sub: "Residential · Exterior",
    year: "2023",
    featured: false,
    tags: [{ label: "Exterior", variant: "exterior" }],
    imgLabel: "Exterior · 3D render",
    imgStyle:
      "linear-gradient(135deg, rgba(180,130,80,0.3) 0%, rgba(43,42,39,0.08) 100%), #c8a888",
  },
  {
    id: "apartment-tower-mexico",
    name: "Apartment Tower\nMexico",
    sub: "Commercial · Exterior",
    year: "2024",
    featured: false,
    tags: [{ label: "Exterior", variant: "exterior" }],
    imgLabel: "Exterior · 3D render",
    imgStyle:
      "linear-gradient(135deg, rgba(80,100,130,0.3) 0%, rgba(43,42,39,0.05) 100%), #a8b0c0",
  },
  {
    id: "apt1",
    name: "Apartment Interior\nStudy",
    sub: "Residential · Interior",
    year: "2024",
    featured: false,
    tags: [{ label: "Interior", variant: "interior" }],
    imgLabel: "Interior · 3D render",
    imgStyle:
      "linear-gradient(155deg, rgba(160,130,110,0.25) 0%, rgba(43,42,39,0.08) 100%), #c0b0a8",
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
  // ── Office Complex Moscow ─────────────────────────────
  {
    slug: "office-moscow",
    title: "Office Complex Moscow",
    category: "Commercial Interior",
    location: "Moscow, Russia",
    year: "2023",
    description:
      "A 4,200 m² commercial headquarters designed to project authority through restraint — travertine floors, brushed-brass joinery, and cathedral-height atria rendered across twelve camera studies to guide the client's design approval process.",
    media: [
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_1.webp",
        alt: "Main reception — primary camera study",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_1_1.webp",
        alt: "Reception — wide establishing shot",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_2.webp",
        alt: "Office floor — workstation layout",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_3.webp",
        alt: "Office floor — alternative angle",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_4.webp",
        alt: "Corridor — ambient light study",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_5.webp",
        alt: "Corridor — natural light study",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_6.webp",
        alt: "Meeting room — north elevation",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_7.webp",
        alt: "Meeting room — south elevation",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_8.webp",
        alt: "Executive suite — overview",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_9.webp",
        alt: "Executive suite — detail",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_10.webp",
        alt: "Lounge area — dusk render",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_11.webp",
        alt: "Lounge area — daytime render",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_12.webp",
        alt: "Breakout space",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_13.webp",
        alt: "Entrance lobby",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_14.webp",
        alt: "Atrium — full-height view",
        layoutHint: "full",
      },
    ],
  },

  // ── Luxury Flat, Tverskaya ────────────────────────────
  {
    slug: "luxury-flat",
    title: "Luxury Flat, Tverskaya",
    category: "Residential Interior",
    location: "Tverskaya, Moscow",
    year: "2024",
    description:
      "A 180 m² apartment in Moscow's most sought-after address. The brief called for restrained luxury — Arabescato marble, bouclé upholstery, and floor-to-ceiling glazing — resolved across nine final renders and one cinematic walkthrough.",
    media: [
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_1.webp",
        alt: "Living room — primary camera study",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_2.webp",
        alt: "Open-plan overview — horizontal",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_3.webp",
        alt: "Hallway — entry sequence",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_4.webp",
        alt: "Living room — afternoon light",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_5.webp",
        alt: "Bedroom — narrow format study",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_6.webp",
        alt: "Kitchen — horizontal overview",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_7.webp",
        alt: "Living room — wide establishing shot",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_8.webp",
        alt: "Dining area — overhead angle",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_9.webp",
        alt: "Living room — square format",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_10.webp",
        alt: "Bedroom — square format",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_11.webp",
        alt: "Study nook",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_12.webp",
        alt: "Wardrobe — detail study",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_13.webp",
        alt: "Ceiling detail — wide crop",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_14.webp",
        alt: "Bathroom — primary view",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_15.webp",
        alt: "Bathroom — vanity detail",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_16.webp",
        alt: "Bathroom — minimal crop",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_17.webp",
        alt: "Bedroom — evening render",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_18.webp",
        alt: "Bedroom — minimal crop",
        layoutHint: "half",
      },
    ],
  },

  // ── Slavic Sauna ──────────────────────────────────────
  // Portrait pairs: _1+_2, _3+_4, _5+_6, _7+_8, _9+_10, _12+_13
  // Landscape fulls: _11, _14
  // _10_2 is an alternate take of _10 — rendered full-width as the odd one out
  {
    slug: "slavic-sauna",
    title: "Slavic Sauna",
    category: "Residential Interior",
    location: "Private residence",
    year: "2023",
    description:
      "A private wellness retreat designed around the ritual of the banya — raw timber, steam, and stone resolved across fourteen camera studies before construction began.",
    media: [
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_1.webp",
        alt: "Main hall — wide establishing shot",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_2.webp",
        alt: "Main hall — frontal view",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_3.webp",
        alt: "Steam room — primary angle",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_4.webp",
        alt: "Steam room — narrow format",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_5.webp",
        alt: "Changing room",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_6.webp",
        alt: "Lounge area",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_7.webp",
        alt: "Rest area",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_8.webp",
        alt: "Hot room — timber detail",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_9.webp",
        alt: "Hot room — bench level",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_10.webp",
        alt: "Hot room — elevated angle",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_10_2.webp",
        alt: "Hot room — alternate take",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_11.webp",
        alt: "Exterior terrace — overview",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_12.webp",
        alt: "Corridor — detail",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_13.webp",
        alt: "Corridor — ambient light",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_14.webp",
        alt: "Exterior — full view",
        layoutHint: "full",
      },
    ],
  },

  // ── Lake House Exterior ───────────────────────────────
  // All images are 3840x2040 landscape — all full-width
  // Note: Cyrillic filenames (видовая точка = viewpoint); _3 is missing from the export
  {
    slug: "lake-house",
    title: "Lake House",
    category: "Residential Exterior",
    location: "Private residence",
    year: "2024",
    description:
      "A lakeside residence captured across eight viewpoints — dawn to dusk — to demonstrate how the building settles into its waterfront site at every hour of the day.",
    media: [
      {
        type: "image",
        src: "/projects/Lake-House_Exterior/Lake-House_Exterior_1.webp",
        alt: "Viewpoint 1 — primary approach",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Lake-House_Exterior/Lake-House_Exterior_2.webp",
        alt: "Viewpoint 2 — lakeside elevation",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Lake-House_Exterior/Lake-House_Exterior_4.webp",
        alt: "Viewpoint 4 — garden terrace",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Lake-House_Exterior/Lake-House_Exterior_5.webp",
        alt: "Viewpoint 5 — water's edge",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Lake-House_Exterior/Lake-House_Exterior_6.webp",
        alt: "Viewpoint 6 — entry sequence",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Lake-House_Exterior/Lake-House_Exterior_7.webp",
        alt: "Viewpoint 7 — dusk render",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Lake-House_Exterior/Lake-House_Exterior_8.webp",
        alt: "Viewpoint 8 — evening render",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Lake-House_Exterior/Lake-House_Exterior_9.webp",
        alt: "Viewpoint 9 — night render",
        layoutHint: "full",
      },
    ],
  },

  // ── Linear Park ──────────────────────────────────────
  // _1 and _4 are portrait (1915x2500) — pair them
  // All others are wide landscape — full-width
  {
    slug: "linear-park",
    title: "Linear Park",
    category: "Landscape & Exterior",
    location: "Public space",
    year: "2023",
    description:
      "A linear public park resolved across eight viewpoints — from the entry pavilion to the far promenade — testing material palettes, planting density, and seasonal light before groundwork began.",
    media: [
      {
        type: "image",
        src: "/projects/Linear-Park/Linear-Park_1.webp",
        alt: "Entry pavilion — portrait view",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Linear-Park/Linear-Park_4.webp",
        alt: "Pavilion — alternate angle",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Linear-Park/Linear-Park_2.webp",
        alt: "Promenade — wide establishing shot",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Linear-Park/Linear-Park_3.webp",
        alt: "Central zone — planting study",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Linear-Park/Linear-Park_5.webp",
        alt: "Seating area — afternoon light",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Linear-Park/Linear-Park_6.webp",
        alt: "Promenade — dusk render",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Linear-Park/Linear-Park_7.webp",
        alt: "Far end — panoramic view",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Linear-Park/Linear-Park_8.webp",
        alt: "Boundary — panoramic view",
        layoutHint: "full",
      },
    ],
  },

  // ── City Park Chekhov ─────────────────────────────────
  // All wide landscape except _5 which is portrait (2404x2984) — rendered full since no pair
  {
    slug: "city-park-chekhov",
    title: "City Park Chekhov",
    category: "Landscape & Exterior",
    location: "Chekhov, Russia",
    year: "2024",
    description:
      "A municipal park in Chekhov rendered across six camera angles to demonstrate the spatial progression from the main entrance to the central amphitheatre.",
    media: [
      {
        type: "image",
        src: "/projects/City-Park_Chekhov/City-Park_Chekhov_1.webp",
        alt: "Main entrance — panoramic",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/City-Park_Chekhov/City-Park_Chekhov_2.webp",
        alt: "Central promenade",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/City-Park_Chekhov/City-Park_Chekhov_3.webp",
        alt: "Path network — wide view",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/City-Park_Chekhov/City-Park_Chekhov_4.webp",
        alt: "Path network — alternate angle",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/City-Park_Chekhov/City-Park_Chekhov_5.webp",
        alt: "Amphitheatre — portrait view",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/City-Park_Chekhov/City-Park_Chekhov_6.webp",
        alt: "Far boundary — panoramic",
        layoutHint: "full",
      },
    ],
  },

  // ── Modern Chalet ─────────────────────────────────────
  // All 3733×2100 landscape — full-width
  {
    slug: "modern-chalet",
    title: "Modern Chalet",
    category: "Residential Exterior",
    location: "Private residence",
    year: "2024",
    description:
      "A contemporary alpine chalet rendered at three times of day — daytime overcast, golden-hour sunset, and poolside dusk — to demonstrate how the facade and landscape read across the full arc of natural light.",
    media: [
      {
        type: "image",
        src: "/projects/Various/Modern-Chalet_Daytime.webp",
        alt: "Daytime — overcast light",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Various/Modern-Chalet_Sunset.webp",
        alt: "Sunset — golden hour",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Various/Modern-Chalet_Pool.webp",
        alt: "Pool terrace — dusk render",
        layoutHint: "full",
      },
    ],
  },

  // ── Warsaw House ──────────────────────────────────────
  {
    slug: "warsaw-house",
    title: "Warsaw House",
    category: "Residential Exterior",
    location: "Warsaw, Poland",
    year: "2023",
    description:
      "A single exterior render of a private residence in Warsaw — a controlled study in how brick, glazing, and winter light combine on a tight urban plot.",
    media: [
      {
        type: "image",
        src: "/projects/Various/warsaw-house.webp",
        alt: "Exterior — primary view",
        layoutHint: "full",
      },
    ],
  },

  // ── Mexican House ─────────────────────────────────────
  // Note: exported at 72 dpi — may appear softer than other renders
  {
    slug: "mexican-house",
    title: "Mexican House",
    category: "Residential Exterior",
    location: "Mexico",
    year: "2023",
    description:
      "An exterior study of a Mexican residence exploring the interplay of rendered concrete, timber screens, and intense midday sunlight.",
    media: [
      {
        type: "image",
        src: "/projects/Various/Mexican-House.webp",
        alt: "Exterior — primary view",
        layoutHint: "full",
      },
    ],
  },

  // ── Apartment Tower Mexico ────────────────────────────
  {
    slug: "apartment-tower-mexico",
    title: "Apartment Tower Mexico",
    category: "Commercial Exterior",
    location: "Mexico",
    year: "2024",
    description:
      "A high-rise residential tower rendered from street level — studying how the podium, balcony rhythm, and rooftop garden read against the city skyline.",
    media: [
      {
        type: "image",
        src: "/projects/Various/Apartment-Tower_Mexico.webp",
        alt: "Tower — street-level view",
        layoutHint: "full",
      },
    ],
  },

  // ── Apartment Study (apt1) ────────────────────────────
  // Two very tall portrait images (2419x4300) — paired as half
  {
    slug: "apt1",
    title: "Apartment Interior Study",
    category: "Residential Interior",
    location: "Private residence",
    year: "2024",
    description:
      "Two key camera studies for a residential interior — living room and coffee-table detail — rendered in tall portrait format for print and social use.",
    media: [
      {
        type: "image",
        src: "/projects/Various/apt1_living-room.webp",
        alt: "Living room — portrait format",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Various/apt1_coffee-table.webp",
        alt: "Coffee table — detail study",
        layoutHint: "half",
      },
    ],
  },

  // ── Garden Spa ───────────────────────────────────────
  {
    slug: "garden-spa",
    title: "Garden Spa",
    category: "Landscape & Exterior",
    location: "Private residence",
    year: "2023",
    description:
      "A private spa garden conceived as a series of outdoor rooms: the pool terrace, the shade pavilion, and the kitchen garden. Every planting scheme, stone selection, and water feature was resolved in 3D before a single plant was ordered.",
    media: [],
  },

  // ── Law Firm Buffet ───────────────────────────────────
  {
    slug: "law-firm-buffet",
    title: "Law Firm Buffet",
    category: "F&B Interior",
    location: "Central Moscow",
    year: "2025",
    description:
      "An in-house dining and hospitality suite for a prominent law firm, currently in production. Material directions under review — two tile options and three lighting scenarios are being evaluated ahead of the final client presentation.",
    media: [],
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
  "I post renders, material studies, and finished projects on Behance and Instagram. Both are good places to see what's coming before it lands here.";
export const behanceLabel = "Bē\u00a0 Behance";
export const instagramLabel = "📷\u00a0 Instagram";

export const behanceThumbs: PinThumb[] = [
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
  { label: "Behance", href: "#" },
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

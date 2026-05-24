import type {
  Project,
  ProcessStep,
  HeroStat,
  HeroDiscipline,
  ContactMetaItem,
  NavLink,
  FooterLink,
  SocialLink,
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
  "Anastasia Monzon — 3D Architectural Visualisation & Rendering Artist";
export const siteDescription =
  "Freelance 3D architectural visualisation artist based in Mexico. Partnering with architects, interior designers, and developers worldwide to translate CAD files, master plans, and material boards into photorealistic 3D renders.";

// ─── HEADER ───────────────────────────────────────────────
export const logoText = "Anastasia. Monzon";

export const navLinks: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact", cta: true },
];

// ─── HERO ─────────────────────────────────────────────────
export const heroEyebrow = "3D Architectural Visualisation Studio";
export const heroName = ["Anastasia", "Monzon"] as const;
export const heroTagline =
  "You design the space. I bring it to life. Transforming architectural plans and CAD files into photorealistic 3D renders.";
export const heroPrimaryBtn = "View work \u00a0→";
export const heroSecondaryBtn = "Start a project";

export const heroQuote =
  '"I partner with visionary architects and interior designers to turn blueprints and material lists into high-end visual stories."';
export const heroAvailDot = "Currently accepting Q3 2026 projects";
export const heroAvailLabel = "Worldwide · Remote";

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

// ─── WORK SECTION (HOME) ──────────────────────────────────
export const workEyebrow = "Portfolio";
export const workTitle = "Selected work";

export const projects: Project[] = [
  {
    id: "biophilic-office-campus",
    name: "Biophilic Office Campus",
    sub: "Commercial · 4,200 m²",
    year: "2023",
    featured: true,
    tags: [{ label: "Interior", variant: "interior" }],
    imgLabel: "Interior · 3D render",
    imgStyle: "/projects/Office-Complex/Office-Complex_1.webp",
  },
  {
    id: "boutique-urban-apartment",
    name: "Boutique Urban Apartment",
    sub: "Residential",
    year: "2024",
    featured: false,
    tags: [{ label: "Interior", variant: "interior" }],
    imgLabel: "Interior · 3D render",
    imgStyle: "/projects/Apartment-Interior/Apartment-Interior_1.webp",
  },
  {
    id: "slavic-sauna",
    name: "Slavic Sauna",
    sub: "Residential · Private wellness",
    year: "2025",
    featured: false,
    tags: [{ label: "Interior", variant: "interior" }],
    imgLabel: "Interior · 3D render",
    imgStyle: "/projects/Slavic-Sauna/Slavic-Sauna_1.webp",
  },
  {
    id: "lake-house",
    name: "Lake House",
    sub: "Residential · Exterior",
    year: "2025",
    featured: false,
    tags: [{ label: "Exterior", variant: "exterior" }],
    imgLabel: "Exterior · 3D render",
    imgStyle: "/projects/Lake-House_Exterior/Lake-House_Exterior_1.webp",
  },
  {
    id: "linear-public-park",
    name: "Linear Public Park",
    sub: "Landscape Architecture · Public Space",
    year: "2023",
    featured: false,
    tags: [{ label: "Exterior", variant: "exterior" }],
    imgLabel: "Exterior · 3D render",
    imgStyle: "/projects/Linear-Park/Linear-Park_1.webp",
  },
  {
    id: "civic-heritage-park",
    name: "Civic Heritage Park",
    sub: "Landscape Architecture · Public Space",
    year: "2024",
    featured: false,
    tags: [{ label: "Exterior", variant: "exterior" }],
    imgLabel: "Exterior · 3D render",
    imgStyle: "/projects/Civic-Heritage-Park/Civic-Heritage-Park_1.webp",
  },
  {
    id: "modern-chalet",
    name: "Modern Chalet",
    sub: "Residential · Exterior",
    year: "2024",
    featured: false,
    tags: [{ label: "Exterior", variant: "exterior" }],
    imgLabel: "Exterior · 3D render",
    imgStyle: "/projects/Various/Modern-Chalet_Daytime.webp",
  },
  {
    id: "warsaw-house",
    name: "Warsaw House",
    sub: "Residential · Exterior",
    year: "2023",
    featured: false,
    tags: [{ label: "Exterior", variant: "exterior" }],
    imgLabel: "Exterior · 3D render",
    imgStyle: "/projects/Various/warsaw-house.webp",
  },
  {
    id: "mexican-house",
    name: "Mexican House",
    sub: "Residential · Exterior",
    year: "2023",
    featured: false,
    tags: [{ label: "Exterior", variant: "exterior" }],
    imgLabel: "Exterior · 3D render",
    imgStyle: "/projects/Various/Mexican-House.webp",
  },
  {
    id: "apartment-tower-mexico",
    name: "Apartment Tower\nMexico",
    sub: "Commercial · Exterior",
    year: "2024",
    featured: false,
    tags: [{ label: "Exterior", variant: "exterior" }],
    imgLabel: "Exterior · 3D render",
    imgStyle: "/projects/Various/Apartment-Tower_Mexico.webp",
  },
  {
    id: "apt1",
    name: "Apartment Interior\nStudy",
    sub: "Residential · Interior",
    year: "2024",
    featured: false,
    tags: [{ label: "Interior", variant: "interior" }],
    imgLabel: "Interior · 3D render",
    imgStyle: "/projects/Various/apt1_living-room.webp",
  },
];

// ─── DYNAMIC PROJECTS (CASE STUDIES) ──────────────────────
export const detailedProjects: ProjectDetail[] = [
  // ── Office Complex ─────────────────────────────
  {
    slug: "biophilic-office-campus",
    title: "Biophilic Office Campus",
    category: "Commercial Interior",
    location: "Corporate Headquarters",
    year: "2023",
    description:
      "A 4,200 m² commercial headquarters designed around the principles of biophilic design. This expansive glass-roofed atrium functions as a thriving indoor ecosystem, seamlessly integrating collaborative workspaces, a central cafe, and leisure zones among lush tropical landscaping. The space was meticulously resolved across fourteen architectural visualizations.",
    media: [
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_1.webp",
        alt: "Wide 3D interior rendering of a biophilic commercial atrium under a glass pyramid skylight, featuring lush tropical plants and a central fountain",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_2.webp",
        alt: "Architectural visualization of a green office collaborative workspace, showing light wood tables, curved chairs, and integrated planters",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_3.webp",
        alt: "3D rendering of a modern office atrium cafe featuring a concrete counter with copper accents, surrounded by indoor trees and foliage",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_4.webp",
        alt: "Interior 3D visualization of a corporate wellness area with wooden lounge chairs and concrete planters in a bright, nature-inspired office",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_5.webp",
        alt: "Elevated 3D architectural rendering of a winding LED-lit pathway cutting through indoor grass lawns and tropical landscaping in a commercial atrium",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_6.webp",
        alt: "Close-up 3D visualization of lush indoor tropical plants and modern pathway lighting bordering a concrete walkway in an office campus",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_7.webp",
        alt: "Architectural rendering of an informal breakout space with terracotta bean bags arranged on wooden decking surrounded by greenery",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_8.webp",
        alt: "3D interior rendering of a corporate recreation zone featuring table tennis setups on artificial turf within a glass-walled green atrium",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_9.webp",
        alt: "Wide 3D visualization showing a bustling indoor office campus, highlighting a towering copper fountain and a rounded cafe bar",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_10.webp",
        alt: "Top-down 3D architectural rendering of a symmetrical biophilic office atrium, detailing the layout of pathways, seating zones, and central water feature",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_11.webp",
        alt: "Low-angle 3D visualization of a glowing LED floor path winding past tropical palms and a relaxing breakout zone with terracotta seating",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_12.webp",
        alt: "Close-up 3D interior rendering of a corporate coffee bar, showing an espresso machine, dark marble tables, and upholstered bar stools",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_13.webp",
        alt: "High-angle 3D architectural rendering of a central bronze fountain structure anchoring a sprawling, light-filled green office atrium",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Office-Complex/Office-Complex_14.webp",
        alt: "Eye-level 3D visualization looking up at a monumental geometric water feature and the expansive glass pyramid roof of a modern office complex",
        layoutHint: "full",
      },
    ],
  },

  // ── Boutique Urban Apartment ────────────────────────────
  {
    slug: "boutique-urban-apartment",
    title: "Boutique Urban Apartment",
    category: "Residential Interior",
    location: "Private Residence",
    year: "2024",
    description:
      "A thoughtfully crafted urban apartment characterized by its tailored contemporary design. The interior features bespoke light oak joinery, cozy modern upholstery, and vibrant geometric tiling, seamlessly resolved across eighteen detailed 3D architectural visualizations.",
    media: [
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_1.webp",
        alt: "3D interior rendering of a modern kitchen featuring light oak cabinetry, geometric floor tiles, and a white tile backsplash",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_2.webp",
        alt: "Architectural visualization of a contemporary open-plan kitchen with built-in appliances, a breakfast bar, and ample natural light",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_3.webp",
        alt: "Close-up 3D render of a kitchen breakfast bar by the window, styled with a laptop, notebook, and a gray velvet bar stool",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_4.webp",
        alt: "3D visualization of a cozy reading nook in a residential apartment, featuring a curved blue armchair, a black side table, and vibrant textile art",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_5.webp",
        alt: "Interior rendering of a shared children's bedroom with twin beds, a custom wooden double desk under a large window, and a modern sputnik chandelier",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_6.webp",
        alt: "3D architectural visualization of a kids' bedroom showing a fluted dresser, a round brass mirror, and built-in floor-to-ceiling bookshelves",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_7.webp",
        alt: "High-end 3D rendering of a serene master bedroom featuring a wooden platform bed, a slatted wood headboard, and a delicate leaf-motif chandelier",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_8.webp",
        alt: "Interior visualization of a bedroom corner showing a draped beige curtain room divider, a teal accent chair, and dark oak flooring",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_9.webp",
        alt: "3D rendering of a bespoke walk-in wardrobe within a master bedroom, featuring open shelving, hanging rails, and custom white drawers",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_10.webp",
        alt: "Architectural visualization of an open-plan living room featuring a grey sofa, dark oak floors, a slatted wood divider, and a modern globe chandelier",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_11.webp",
        alt: "3D interior rendering of a cozy dining area with a round wooden table, four mid-century modern chairs, and a bright window with roman shades",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_12.webp",
        alt: "Wide 3D visualization of a luxury living and dining space showing a grey sofa, floral framed artwork, and white louvered closet doors",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_13.webp",
        alt: "Interior 3D rendering of an entryway hall featuring a two-toned white and sage green wall, a rustic wooden console table, and a family photo gallery",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_14.webp",
        alt: "Architectural visualization of an apartment corridor showing a mirrored sliding wardrobe, a white fluted shoe cabinet, and transition flooring",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_15.webp",
        alt: "3D rendering of a residential hallway highlighting built-in louvered closets, a classic white paneled door, and patterned floor tiles",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_16.webp",
        alt: "High-end 3D interior visualization of a modern bathroom featuring a curved glass shower, a white floating vanity, and a round LED-backlit mirror",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_17.webp",
        alt: "Bathroom interior rendering showcasing custom light wood paneling, a wall-hung toilet, an open shelving unit with a curtain, and geometric terracotta tiles",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Apartment-Interior/Apartment-Interior_18.webp",
        alt: "3D architectural rendering of a modern bathroom wall featuring a sleek black heated towel rail, a white bathrobe, and a wall-mounted toilet",
        layoutHint: "half",
      },
    ],
  },

  // ── Slavic Sauna ──────────────────────────────────────
  {
    slug: "slavic-sauna",
    title: "Slavic Sauna Interior",
    category: "Residential Interior",
    location: "Private residence",
    year: "2025",
    description:
      "High-end 3D interior rendering of a traditional Slavic banya. This architectural visualization showcases a luxury wellness retreat, beautifully harmonizing rustic raw timber with sophisticated modern finishes like green marble. Meticulously resolved across fourteen camera studies to capture an exclusive lakeside sanctuary.",
    media: [
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_1.webp",
        alt: "3D interior rendering of a luxury traditional Slavic banya, featuring illuminated tiered wooden seating and a bespoke log cross-section ceiling art piece",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_2.webp",
        alt: "Architectural visualization of a luxury sauna room highlighting a modern cylindrical stone heater, rugged accent wall, and integrated warm LED lighting",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_3.webp",
        alt: "High-end 3D rendering of a luxury banya bathroom, contrasting raw timber log walls with elegant green-veined marble and brushed brass fixtures",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_4.webp",
        alt: "Interior 3D visualization of a spa-like shower room featuring glossy green subway tiles, a traditional wooden plunge bucket, and brass hardware",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_5.webp",
        alt: "Architectural rendering of a wellness retreat corridor showcasing raw timber log walls, a frosted glass sauna door, and a rich green velvet curtain",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_6.webp",
        alt: "3D interior visualization of a rustic modern banya space, featuring a decorative slatted wood wall panel adorned with hanging greenery",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_7.webp",
        alt: "Entrance mudroom of a private lakeside banya, showcasing a modern upholstered bench, organic-shaped mirror, and heavy timber log architecture",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_8.webp",
        alt: "High-end 3D rendering of a serene banya relaxation lounge, featuring a plush sofa, abstract artwork, and contemporary wavy glass pendant lighting",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_9.webp",
        alt: "Architectural visualization of a cozy wellness retreat lounge area, highlighting bespoke rattan wardrobes, comfortable seating, and rustic log walls",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_10.webp",
        alt: "Detail shot of a 3D interior rendering showing custom woven rattan cabinetry and a modern green accent chair in a luxury wellness lounge",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_10_2.webp",
        alt: "Alternate 3D visualization angle of a traditional banya lounge area, focusing on the intricate rattan joinery and detailed geometric parquet flooring",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_11.webp",
        alt: "3D rendering of a banya relaxation room looking out through large glass sliding doors towards an outdoor courtyard, featuring a traditional green tiled stove",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_12.webp",
        alt: "Close-up 3D architectural visualization of a polished metal sauna bucket and wooden ladles sitting on illuminated timber benches",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_13.webp",
        alt: "Detailed 3D rendering of an asymmetrical wooden coffee table in a banya lounge, styled with magazines, refreshments, and a traditional stove in the background",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Slavic-Sauna/Slavic-Sauna_14.webp",
        alt: "Top-down 3D floor plan rendering of a luxury private banya retreat, illustrating the cohesive spatial layout of the sauna, shower, lounge, and bathroom zones",
        layoutHint: "full",
      },
    ],
  },

  // ── Lake House Exterior ───────────────────────────────
  // All images are 3840x2040 landscape — all full-width
  {
    slug: "lake-house",
    title: "Lakeside Estate",
    category: "Residential Exterior",
    location: "Private residence",
    year: "2025",
    description:
      "High-end 3D exterior visualization of a classical luxury lakeside estate in Poland. This architectural rendering showcases a comprehensive residential master plan, featuring a grand main house, a detached garage, and waterfront pavilions. Set against lush woodland, the design seamlessly bridges formal elegance with expansive outdoor spaces, perfectly resolving intricate rooflines and landscape zoning.",
    media: [
      {
        type: "image",
        src: "/projects/Lake-House_Exterior/Lake-House_Exterior_1.webp",
        alt: "3D exterior rendering of a luxury lakeside estate in Poland, featuring a classical white stucco facade and domed roof",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Lake-House_Exterior/Lake-House_Exterior_2.webp",
        alt: "3D visualization of a private courtyard pool and lounge area at a luxury lakeside mansion, surrounded by manicured gardens",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Lake-House_Exterior/Lake-House_Exterior_3.webp",
        alt: "Architectural rendering of a classical detached guest house and carport nestled in the lush landscaping of a lakeside estate",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Lake-House_Exterior/Lake-House_Exterior_4.webp",
        alt: "Wrought-iron driveway gate and classical front entrance of a high-end waterfront property, showcasing detailed 3D landscaping",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Lake-House_Exterior/Lake-House_Exterior_5.webp",
        alt: "Front facade 3D visualization of a classical residential estate, featuring elegant arched windows, balconies, and white stucco",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Lake-House_Exterior/Lake-House_Exterior_6.webp",
        alt: "Angled aerial 3D rendering of a sprawling lakeside master plan, detailing the residential architecture and waterfront pavilions",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Lake-House_Exterior/Lake-House_Exterior_7.webp",
        alt: "Waterfront 3D architectural visualization of a luxury estate, highlighting a private sandy beach, boat dock, and fire pit area",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Lake-House_Exterior/Lake-House_Exterior_8.webp",
        alt: "Top-down overhead rendering of a cohesive residential master plan, showing the spatial layout of the house, pool, and lake access",
        layoutHint: "full",
      },
    ],
  },

  // ── Linear Park ──────────────────────────────────────
  {
    slug: "linear-public-park",
    title: "Linear Public Park",
    category: "Landscape Architecture & Urban Design",
    location: "Urban Public Space",
    year: "2023",
    description:
      "A comprehensive 3D architectural visualization of a modern linear public park. This urban landscape design features vibrant pedestrian promenades, bespoke seating structures, interactive art installations, and lush seasonal planting. The project was rigorously resolved across eight renders to evaluate lighting, material palettes, and spatial flow before groundwork began.",
    media: [
      {
        type: "image",
        src: "/projects/Linear-Park/Linear-Park_1.webp",
        alt: "3D rendering of a modern urban park promenade featuring a wooden pergola with illuminated hanging egg chairs and lush landscaping",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Linear-Park/Linear-Park_2.webp",
        alt: "Top-down 3D architectural visualization of a linear park master plan, showcasing geometric pedestrian pathways and dense urban tree canopies",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Linear-Park/Linear-Park_3.webp",
        alt: "Angled aerial 3D render of a linear landscape design, illustrating the integration of public green spaces, seating zones, and walkways along an urban road",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Linear-Park/Linear-Park_4.webp",
        alt: "3D visualization of bespoke heart-shaped seating structures with integrated LED lighting along a paved public park walkway",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Linear-Park/Linear-Park_5.webp",
        alt: "Architectural exterior rendering of an urban park pathway framed by striking illuminated contemporary archways and autumnal trees",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Linear-Park/Linear-Park_6.webp",
        alt: "3D landscape rendering of a pedestrian promenade highlighting a modern metallic heart sculpture set against vibrant green public lawns",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Linear-Park/Linear-Park_7.webp",
        alt: "Exterior 3D visualization of a modern refreshment kiosk at a park entrance, featuring native planting, bicycle access, and elegant metal fencing",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Linear-Park/Linear-Park_8.webp",
        alt: "Ground-level 3D rendering of a wide, accessible linear park promenade with sophisticated street lighting and dense, layered shrubbery",
        layoutHint: "half",
      },
    ],
  },

  // ── Civic Heritage Park ─────────────────────────────────
  {
    slug: "civic-heritage-park",
    title: "Civic Heritage Park",
    category: "Landscape Architecture & Urban Design",
    location: "Municipal Public Space",
    year: "2024",
    description:
      "A comprehensive 3D landscape visualization of a municipal heritage park. The master plan thoughtfully integrates a classical civic building with formal geometric gardens, meandering wildflower promenades, and modern amenities like bespoke swing pavilions. The project was meticulously rendered across six panoramic angles to demonstrate spatial progression and seasonal planting strategies.",
    media: [
      {
        type: "image",
        src: "/projects/Civic-Heritage-Park/Civic-Heritage-Park_1.webp",
        alt: "3D architectural visualization of a classic municipal park plaza, featuring curved seating, a vintage black lamppost, and vibrant seasonal landscaping",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Civic-Heritage-Park/Civic-Heritage-Park_2.webp",
        alt: "Exterior landscape rendering of a wide pedestrian park promenade bordered by fields of purple flowers, birch trees, and modern wooden benches",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Civic-Heritage-Park/Civic-Heritage-Park_3.webp",
        alt: "Ground-level 3D visualization of a formal central promenade leading to a classical civic building, lined with manicured hedges and tall evergreen trees",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Civic-Heritage-Park/Civic-Heritage-Park_4.webp",
        alt: "Angled aerial 3D landscape rendering showcasing a geometric park master plan, with radiating pathways converging at a historic municipal building",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Civic-Heritage-Park/Civic-Heritage-Park_5.webp",
        alt: "Top-down orthographic 3D visualization of an urban park layout, detailing the structured landscaping, civic architecture, and a circular seating plaza",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Civic-Heritage-Park/Civic-Heritage-Park_6.webp",
        alt: "3D exterior rendering of modern white perforated swing pavilions situated along a bright, tree-lined pedestrian walkway in a public park",
        layoutHint: "full",
      },
    ],
  },

  // ── Modern Chalet ─────────────────────────────────────
  {
    slug: "modern-chalet",
    title: "Modern Chalet",
    category: "Residential Exterior",
    location: "Private Residence",
    year: "2024",
    description:
      "A comprehensive 3D exterior visualization of a contemporary A-frame alpine chalet. The architectural rendering highlights a sophisticated material palette of horizontal timber siding, clean white stucco, and a rustic stone base. The project serves as an advanced lighting study, beautifully demonstrating how the facade, extensive glass windows, and poolside landscape transform across bright daytime, golden hour, and dusk.",
    media: [
      {
        type: "image",
        src: "/projects/Various/Modern-Chalet_Daytime.webp",
        alt: "3D architectural visualization of a modern A-frame chalet exterior in bright daylight, showcasing timber siding, large windows, and a stone base",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Various/Modern-Chalet_Sunset.webp",
        alt: "Golden hour exterior rendering of a contemporary alpine chalet, featuring warm exterior lighting and glowing interior windows against a dusk sky",
        layoutHint: "full",
      },
      {
        type: "image",
        src: "/projects/Various/Modern-Chalet_Pool.webp",
        alt: "3D residential rendering of a modern chalet backyard featuring a private swimming pool, wooden deck with lounge chairs, and vertical timber louvers",
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
      "3D residential rendering of a modern two-story house featuring steep metal roofing with snow guards, an attached garage with a grey sectional door, and a landscaped front yard with blooming dandelions, outdoor patio seating, and vibrant shrubbery",
    media: [
      {
        type: "image",
        src: "/projects/Various/warsaw-house.webp",
        alt: "3D rendering of a modern two-story house with dark metal roof, grey brick, attached garage, and a garden with dandelions",
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
      "3D architectural rendering of a modern Mexican-style house featuring stark white stucco walls, a flat roof, and a minimalist front facade. The design highlights a large wooden garage door with warm, recessed under-lighting and an adjacent entryway with vertical timber slats. The front landscaping showcases native desert flora, including a prominent saguaro cactus and agave plants, illuminated by targeted landscape lighting against the white exterior, set above a dark paved driveway",
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
      "3D architectural rendering of a contemporary high-rise in Mexico, featuring a striking dark grey façade with continuous white LED contour lighting that traces the zigzag horizontal lines of each floor. The design includes large white-framed windows throughout and a distinctive base level adorned with a pixelated mosaic tile pattern. Set against a dramatic purple and pink sunset sky, the scene is grounded by tropical palm trees at street level and a motion-blurred car with red light trails in the foreground, emphasizing an urban atmosphere.",
    media: [
      {
        type: "image",
        src: "/projects/Various/Apartment-Tower_Mexico.webp",
        alt: "3D rendering of a modern Mexican high-rise building with wavy dark façade, white contour lighting, mosaic base, and purple sunset sky",
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
      "Interior 3D rendering of a modern living space featuring a textured boucle sofa and armchair set, a round marble coffee table with wooden legs, and a black floor lamp. The background consists of a feature wall combining vertical natural wood paneling and cream fluted ribbed panels, accented by circular gold wire wall art and subtle cov lighting. The flooring is light marble tile.",
    media: [
      {
        type: "image",
        src: "/projects/Various/apt1_living-room.webp",
        alt: "Close-up of a modern lounge area featuring a curved boucle armchair with a throw, a black arched floor lamp, and a wall with large natural wood panels and vertical cream ribbed slats.",
        layoutHint: "half",
      },
      {
        type: "image",
        src: "/projects/Various/apt1_coffee-table.webp",
        alt: "Modern living room with a textured boucle sofa, spherical pillows, an oval marble coffee table holding a book and cup, and a feature wall combining wood panels, cream fluted panels, and gold wire art",
        layoutHint: "half",
      },
    ],
  },
];

export function getProject(slug: string): ProjectDetail | null {
  return detailedProjects.find((project) => project.slug === slug) || null;
}

// ─── PROCESS SECTION ──────────────────────────────────────
export const processEyebrow = "How it works";
export const processTitle = "From blueprint to final render";

export const processSteps: ProcessStep[] = [
  {
    num: "01 — Handover",
    phase: "Brief",
    name: "Files & scope",
    desc: "You send over your master plans, CAD files, material boards, and measurements. We discuss your vision, the intended mood, and the target audience for the space.",
  },
  {
    num: "02 — Concept",
    phase: "Concept",
    name: "Clay models & lighting",
    desc: "I build the 3D geometry from your plans and provide low-resolution drafts to validate camera angles, architectural proportions, and lighting direction.",
  },
  {
    num: "03 — Refinement",
    phase: "Refinement",
    name: "Materials & texturing",
    desc: "Once the geometry is approved, I apply your specific material list and generate high-resolution production renders. Two rounds of revision are included.",
  },
  {
    num: "04 — Delivery",
    phase: "Delivery",
    name: "Final files",
    desc: "Print-ready TIFFs and web-optimised JPEGs. Full commercial licence included. Turnaround typically 5–10 business days.",
  },
];

// ─── ABOUT SECTION ────────────────────────────────────────

export const aboutEyebrow = "About";
export const aboutHeadline =
  "A dedicated rendering partner for architects and designers.";

export const aboutOpener =
  "I'm Anastasia — a freelance 3D visualisation artist with a background in Landscape Architecture. I specialise in collaborating directly with architects, interior designers, and real estate developers to translate their technical drawings into photorealistic imagery.";

export const aboutBody =
  "Operating through anastasiamonzon.com from Mexico, I work remotely with design teams across the United States, Canada, Australia, and worldwide. My role isn't to design the space, but to deeply understand your blueprints and material schedules, applying precise lighting and texturing to showcase your architectural vision exactly as you intended.";

export const aboutQuote =
  "I don't just illustrate spaces. I take your hard work and find the perfect hour of day, quality of light, and mood of the material to ensure it photographs beautifully.";

export const aboutDisciplines: string[] = [
  "Interior visualisation",
  "Exterior & architecture",
  "Landscape design",
];

export const aboutPortraitLabel = "Portrait of Anastasia Monzon";
export const aboutPortraitSrc = ""; //

// ─── SOCIAL SECTION ───────────────────────────────────────
export const socialEyebrow = "Find me online";
export const socialTitle = "The work,\nbeyond this page.";
export const socialStatement = "Find Anastasiia on Behance and LinkedIn.";
export const socialLinks: SocialLink[] = [
  {
    platform: "Behance",
    label: "Portfolio",
    handle: "behance.net/anastasia_monzon",
    href: "https://www.behance.net/anastasia_monzon",
  },
  {
    platform: "LinkedIn",
    label: "Professional",
    handle: "linkedin.com/in/anastasiia-monzon-042172234/",
    href: "https://www.linkedin.com/in/anastasiia-monzon-042172234/",
  },
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
export const footerCopy = "© 2026 Anastasia Monzon · All rights reserved";

export const footerLinks: FooterLink[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy", href: "#" },
];

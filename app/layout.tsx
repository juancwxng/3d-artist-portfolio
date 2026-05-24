import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";
import { siteTitle, siteDescription } from "@/data/portfolio";
import PremiumEffects from "@/components/ui/PremiumEffects";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  variable: "--font-playfair",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-jost",
  display: "swap",
});

const BASE_URL = "https://www.anastasiamonzon.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: siteTitle,
    template: "%s | Anastasia Monzon · 3D Architectural Visualisation",
  },
  description: siteDescription,
  keywords: [
    "3D architectural visualisation",
    "3D rendering artist",
    "architectural visualisation freelancer",
    "photorealistic renders",
    "interior visualisation",
    "exterior architectural rendering",
    "3D rendering for architects",
    "3D rendering for interior designers",
    "3D rendering for real estate developers",
    "CGI architectural visualisation",
    "freelance 3D artist",
    "3ds Max Corona Renderer",
    "3D visualisation Mexico",
    "residential 3D renders",
    "commercial 3D renders",
    "landscape architecture visualisation",
    "Anastasia Monzon",
    "3D artist portfolio",
  ],
  authors: [{ name: "Anastasia Monzon", url: BASE_URL }],
  creator: "Anastasia Monzon",
  publisher: "Anastasia Monzon",
  category: "Architecture & Design",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Anastasia Monzon · 3D Architectural Visualisation",
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Anastasia Monzon — 3D Architectural Visualisation & Rendering Artist. Photorealistic interior and exterior renders for architects and designers.",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.jpg"],
    creator: "@anastasiamonzon",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification token here when available
    // google: "your-verification-token",
  },
};

/*
 * JSON-LD structured data:
 *   – Person  (identifies the artist with sameAs social links)
 *   – ProfessionalService  (identifies the business offering)
 * Both are injected into <head> so AI crawlers and search engines can
 * parse them without executing JavaScript.
 */
const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  name: "Anastasia Monzon",
  jobTitle: "Freelance 3D Architectural Visualisation Artist",
  description:
    "Freelance 3D architectural visualisation artist with 6+ years of experience, specialising in photorealistic interior renders, exterior architectural CGI, and landscape visualisation for architects, interior designers, and real estate developers worldwide.",
  url: BASE_URL,
  email: "hello@anastasiamonzon.com",
  image: `${BASE_URL}/og-image.jpg`,
  knowsLanguage: ["English", "Spanish", "Russian"],
  workLocation: {
    "@type": "Place",
    name: "Mexico",
    description: "UTC−7 · Remote worldwide",
  },
  sameAs: [
    "https://www.behance.net/anastasia_monzon",
    "https://www.linkedin.com/in/anastasiia-monzon-042172234/",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "3D Architectural Visualisation Artist",
    occupationLocation: {
      "@type": "Country",
      name: "Mexico",
    },
    skills:
      "3D architectural visualisation, photorealistic rendering, interior CGI, exterior CGI, landscape visualisation, 3ds Max, Corona Renderer",
  },
};

const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${BASE_URL}/#service`,
  name: "Anastasia Monzon · 3D Architectural Visualisation",
  description:
    "Freelance 3D architectural visualisation and rendering services for architects, interior designers, and real estate developers. Specialities include photorealistic interior renders, exterior and facade CGI, and landscape architecture visualisation. Accepting commissions from Q3 2026. Starting from $800 per render.",
  url: BASE_URL,
  email: "hello@anastasiamonzon.com",
  image: `${BASE_URL}/og-image.jpg`,
  priceRange: "$$",
  currenciesAccepted: "USD",
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
  provider: { "@id": `${BASE_URL}/#person` },
  serviceType: [
    "3D Architectural Visualisation",
    "Interior 3D Rendering",
    "Exterior Architectural CGI",
    "Landscape Architecture Visualisation",
    "Commercial Interior Rendering",
    "Residential Exterior Rendering",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "3D Visualisation Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Interior Visualisation",
          description:
            "Photorealistic 3D renders of residential and commercial interiors from CAD files, floor plans, and material schedules.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Exterior & Architectural Rendering",
          description:
            "Photorealistic exterior CGI for houses, apartment towers, commercial buildings, and residential estates.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Landscape Architecture Visualisation",
          description:
            "3D visualisation of public parks, private gardens, and urban landscape design projects.",
        },
      },
    ],
  },
  sameAs: [
    "https://www.behance.net/anastasia_monzon",
    "https://www.linkedin.com/in/anastasiia-monzon-042172234/",
  ],
};

/*
 * FAQ JSON-LD — answers the top questions potential clients ask
 * AI assistants and search engines about hiring a 3D visualisation artist.
 * See delivery item 7 for the standalone block; it is also included here
 * so the homepage gets full FAQ rich-result coverage.
 */
const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a 3D architectural visualisation render cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anastasia Monzon's 3D architectural visualisation services start from $800 per render. The final price depends on the complexity of the space, the number of camera angles required, the level of material detail, and the turnaround time. Interior renders for a single room, exterior facade studies, and landscape master plans are all quoted individually. Contact hello@anastasiamonzon.com with your CAD files and project brief for a tailored quote.",
      },
    },
    {
      "@type": "Question",
      name: "What files do I need to provide to get a 3D render made?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To start a 3D architectural visualisation project you typically need to provide floor plans or CAD files (DWG, DXF, or PDF), a material and finish schedule or mood board, furniture references or a specification list, and any notes on preferred camera angles and lighting mood. Anastasia works directly from your technical drawings and translates them into photorealistic renders without requiring you to provide a 3D model.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to produce a 3D architectural render?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard turnaround for a 3D architectural visualisation project is 5–10 business days from receipt of approved files. This includes a clay-model draft for camera and composition approval, a textured mid-resolution review, and the final high-resolution delivery. Rush projects can be accommodated depending on availability. Two rounds of revision are included in every project.",
      },
    },
    {
      "@type": "Question",
      name: "Can Anastasia Monzon work with architects and designers based outside Mexico?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Anastasia Monzon is a fully remote freelance 3D visualisation artist based in Mexico (UTC−7) and works with architects, interior designers, and real estate developers across the United States, Canada, Australia, Europe, and worldwide. All project communication, file transfer, and delivery happens remotely. She is fluent in English, Spanish, and Russian.",
      },
    },
    {
      "@type": "Question",
      name: "What types of architectural visualisation projects does Anastasia specialise in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anastasia Monzon specialises in three areas: interior visualisation (residential apartments, boutique interiors, wellness spaces, commercial offices), exterior and architectural rendering (private houses, apartment towers, chalets, lakeside estates), and landscape architecture visualisation (public parks, urban design, private gardens). Her portfolio includes 40+ projects across 12+ countries, covering residential, commercial, and public-space typologies.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jost.variable}`}
      style={
        {
          "--font-cormorant": "var(--font-playfair)",
          "--font-dm-sans": "var(--font-jost)",
        } as React.CSSProperties
      }
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body>
        <PremiumEffects />
        {children}
      </body>
    </html>
  );
}

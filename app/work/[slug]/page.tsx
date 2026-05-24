import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPageClient from "./ProjectPageClient";
import { getProject, detailedProjects } from "@/data/portfolio";

const BASE_URL = "https://www.anastasiamonzon.com";

/* ── Static path generation ──────────────────────────────── */
export function generateStaticParams() {
  return detailedProjects.map((project) => ({ slug: project.slug }));
}

/* ── Per-project metadata ────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  // Derive the OG image: prefer first image media item, else fall back to
  // the site-wide og-image.jpg
  const firstImage = project.media.find((m) => m.type === "image");
  const ogImageUrl = firstImage
    ? `${BASE_URL}${firstImage.src}`
    : `${BASE_URL}/og-image.jpg`;

  const ogImageAlt =
    firstImage?.alt ??
    `${project.title} — 3D architectural visualisation by Anastasia Monzon`;

  const pageTitle = `${project.title} · ${project.category}`;
  const pageDescription = `${project.description.slice(0, 155).trimEnd()}…`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `${BASE_URL}/work/${project.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${BASE_URL}/work/${project.slug}`,
      siteName: "Anastasia Monzon · 3D Architectural Visualisation",
      title: `${project.title} — Anastasia Monzon`,
      description: pageDescription,
      locale: "en_US",
      publishedTime: `${project.year}-01-01T00:00:00.000Z`,
      authors: ["Anastasia Monzon"],
      images: [
        {
          url: ogImageUrl,
          width: 3840,
          height: 2040,
          alt: ogImageAlt,
          type: "image/webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Anastasia Monzon`,
      description: pageDescription,
      images: [ogImageUrl],
    },
  };
}

/* ── Server shell — renders the client page component ───── */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  // JSON-LD for the individual project (ImageGallery + CreativeWork)
  const jsonLdProject = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${BASE_URL}/work/${project.slug}`,
    name: project.title,
    description: project.description,
    dateCreated: project.year,
    creator: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Anastasia Monzon",
      url: BASE_URL,
    },
    url: `${BASE_URL}/work/${project.slug}`,
    genre: project.category,
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
    image: project.media
      .filter((m) => m.type === "image")
      .map((m) => ({
        "@type": "ImageObject",
        url: `${BASE_URL}${m.src}`,
        description: m.alt ?? project.title,
        encodingFormat: "image/webp",
      })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProject) }}
      />
      <ProjectPageClient slug={slug} />
    </>
  );
}

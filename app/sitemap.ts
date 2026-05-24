import type { MetadataRoute } from "next";
import { detailedProjects } from "@/data/portfolio";

const BASE_URL = "https://www.anastasiamonzon.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Home page
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];

  // One entry per detailed project case study
  const projectRoutes: MetadataRoute.Sitemap = detailedProjects.map(
    (project) => ({
      url: `${BASE_URL}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    }),
  );

  return [...staticRoutes, ...projectRoutes];
}

import type { MetadataRoute } from "next";

const BASE_URL = "https://www.anastasiamonzon.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Standard search engine crawlers ───────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // ── Google (web + AI training via Google-Extended) ────
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      // ── OpenAI / ChatGPT ──────────────────────────────────
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
      // ── Anthropic / Claude ────────────────────────────────
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
      },
      // ── Perplexity ────────────────────────────────────────
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      // ── Microsoft Bing / Copilot ──────────────────────────
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/"],
      },
      // ── Meta AI ───────────────────────────────────────────
      {
        userAgent: "meta-externalagent",
        allow: "/",
      },
      // ── Apple / Applebot-Extended ─────────────────────────
      {
        userAgent: "Applebot",
        allow: "/",
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
      },
      // ── Common AI training crawlers ───────────────────────
      {
        userAgent: "cohere-ai",
        allow: "/",
      },
      {
        userAgent: "FacebookBot",
        allow: "/",
      },
      {
        userAgent: "Diffbot",
        allow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}

import type { SeoRoute } from "../types";

export type { SeoRoute } from "../types";

export function generateSitemapXml(
  routes: SeoRoute[],
  baseUrl: string,
): string {
  const lastmod = new Date().toISOString().split("T")[0];
  const urlset = routes
    .map((route) => {
      const absoluteUrl = `${baseUrl.replace(/\/$/, "")}${route.path === "/" ? "/" : route.path}`;
      return [
        "  <url>",
        `    <loc>${absoluteUrl}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority.toFixed(1)}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlset,
    "</urlset>",
    "",
  ].join("\n");
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export function filterIndexableRoutes(routes: SeoRoute[]): SeoRoute[] {
  return routes.filter((route) => !route.noindex);
}

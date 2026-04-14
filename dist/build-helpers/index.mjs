// src/build-helpers/index.ts
function generateSitemapXml(routes, baseUrl) {
  const lastmod = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const urlset = routes.map((route) => {
    const absoluteUrl = `${baseUrl.replace(/\/$/, "")}${route.path === "/" ? "/" : route.path}`;
    return [
      "  <url>",
      `    <loc>${absoluteUrl}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${route.changefreq}</changefreq>`,
      `    <priority>${route.priority.toFixed(1)}</priority>`,
      "  </url>"
    ].join("\n");
  }).join("\n");
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlset,
    "</urlset>",
    ""
  ].join("\n");
}
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}
function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
function filterIndexableRoutes(routes) {
  return routes.filter((route) => !route.noindex);
}

export { assert, escapeHtml, escapeRegex, filterIndexableRoutes, generateSitemapXml };

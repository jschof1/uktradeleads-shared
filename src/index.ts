export type {
  SiteSettings,
  Service,
  ServiceFeature,
  ServicePricing,
  ProcessStep,
  FAQ,
  Area,
  SeoRoute,
  Testimonial,
  BreadcrumbItem,
  JsonLdServiceData,
  JsonLdArticleData,
  SEOHeadProps,
  JsonLdProps,
  LayoutProps,
  TopBarProps,
} from "./types";

export { cn, formatPhoneNumber, absoluteUrlForRoute } from "./lib";

export { createSEOHead, createJsonLd, Layout, TopBar } from "./components";

export { ScrollToTop } from "./hooks";

export {
  generateSitemapXml,
  escapeHtml,
  escapeRegex,
  assert,
  filterIndexableRoutes,
} from "./build-helpers";

export type { SeoRoute as SeoRouteType } from "./build-helpers";

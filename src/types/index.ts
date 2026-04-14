export interface SiteSettings {
  businessName: string;
  phone: string;
  phoneFormatted: string;
  email: string;
  address: string;
  baseUrl: string;
  serviceArea: string;
  feedbackWebhook: string;
  feedbackGoogleReviewUrl?: string;
  quickFormWebhook: string;
  quoteFormWebhook: string;
  discountFormWebhook?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  hours?: string;
  tagline?: string;
}

export interface Service {
  title: string;
  slug: string;
  description: string;
  heroText?: string;
  metaTitle?: string;
  metaDescription?: string;
  benefits: string[];
  features?: ServiceFeature[];
  process?: ProcessStep[];
  faqs?: FAQ[];
  galleryCount?: number;
  ctaText?: string;
  ctaSubtext?: string;
  shortDesc?: string;
  fullDescription?: string[];
  pricing?: ServicePricing[];
  areas?: string[];
  relatedServices?: string[];
}

export interface ServiceFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ServicePricing {
  service: string;
  price: string;
  note?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Area {
  name: string;
  slug: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  emergencyTime?: string;
}

export interface SeoRoute {
  path: string;
  outputPath: string;
  title: string;
  description: string;
  noindex?: boolean;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
  source: "static" | "service" | "area";
}

export interface Testimonial {
  name: string;
  location?: string;
  rating: number;
  text: string;
  date?: string;
  verified?: boolean;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface JsonLdServiceData {
  name: string;
  description: string;
  slug: string;
}

export interface JsonLdArticleData {
  title: string;
  description: string;
  slug: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}

export interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  type?: "website" | "article" | "product";
  noindex?: boolean;
}

export interface JsonLdProps {
  type:
    | "LocalBusiness"
    | "Organization"
    | "Service"
    | "FAQPage"
    | "BreadcrumbList"
    | "WebSite"
    | "Article";
  data?: JsonLdServiceData | JsonLdArticleData;
  faqs?: FAQ[];
  breadcrumbs?: BreadcrumbItem[];
}

export interface LayoutProps {
  children: React.ReactNode;
  TopBar?: React.ComponentType;
  Header: React.ComponentType;
  Footer: React.ComponentType;
  showSkipLink?: boolean;
}

export interface TopBarProps {
  phone: string;
  phoneFormatted: string;
  hours?: string;
  tagline?: string;
}

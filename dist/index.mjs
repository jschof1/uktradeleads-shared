import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useEffect } from 'react';
import { jsxs, jsx } from 'react/jsx-runtime';
import { Clock, Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// src/lib/utils.ts
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function formatPhoneNumber(phone) {
  let cleaned = phone.replace(/[^\d+]/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "+44" + cleaned.substring(1);
  } else if (cleaned.startsWith("44")) {
    cleaned = "+" + cleaned;
  } else if (!cleaned.startsWith("+")) {
    cleaned = "+44" + cleaned;
  }
  if (cleaned.startsWith("+440")) {
    cleaned = "+44" + cleaned.substring(4);
  }
  return cleaned;
}
function absoluteUrlForRoute(baseUrl, path) {
  const base = baseUrl.replace(/\/$/, "");
  return `${base}${path === "/" ? "/" : path}`;
}
var createSEOHead = (baseUrl, siteName, defaultImage = "/images/logo.png") => {
  const SEOHead = ({
    title,
    description,
    canonicalPath = "",
    image = defaultImage,
    type = "website",
    noindex = false
  }) => {
    useEffect(() => {
      document.title = title;
      const setMetaTag = (name, content, isProperty = false) => {
        const attribute = isProperty ? "property" : "name";
        let element = document.querySelector(
          `meta[${attribute}="${name}"]`
        );
        if (!element) {
          element = document.createElement("meta");
          element.setAttribute(attribute, name);
          document.head.appendChild(element);
        }
        element.content = content;
      };
      const setLinkTag = (rel, href) => {
        let element = document.querySelector(
          `link[rel="${rel}"]`
        );
        if (!element) {
          element = document.createElement("link");
          element.rel = rel;
          document.head.appendChild(element);
        }
        element.href = href;
      };
      const fullUrl = `${baseUrl}${canonicalPath}`;
      const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;
      setMetaTag("description", description);
      if (noindex) {
        setMetaTag("robots", "noindex, nofollow");
        setMetaTag("googlebot", "noindex, nofollow");
      } else {
        setMetaTag("robots", "index, follow");
        setMetaTag("googlebot", "index, follow");
      }
      setLinkTag("canonical", fullUrl);
      setMetaTag("og:title", title, true);
      setMetaTag("og:description", description, true);
      setMetaTag("og:url", fullUrl, true);
      setMetaTag("og:image", fullImageUrl, true);
      setMetaTag("og:image:alt", `${siteName} preview image`, true);
      setMetaTag("og:type", type, true);
      setMetaTag("og:site_name", siteName, true);
      setMetaTag("og:locale", "en_GB", true);
      setMetaTag("twitter:card", "summary_large_image");
      setMetaTag("twitter:title", title);
      setMetaTag("twitter:description", description);
      setMetaTag("twitter:image", fullImageUrl);
      setMetaTag("twitter:image:alt", `${siteName} preview image`);
    }, [title, description, canonicalPath, image, type, noindex]);
    return null;
  };
  return SEOHead;
};
var createJsonLd = (siteSettings, services, areas, businessTypes = ["LocalBusiness"], businessDescription, geo, address, rating, defaultImage = "/images/logo.png") => {
  const baseUrl = siteSettings.baseUrl.replace(/\/$/, "");
  const JsonLd = ({ type, data, faqs, breadcrumbs }) => {
    useEffect(() => {
      const scriptId = `jsonld-${type}-${data?.slug || "main"}`;
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
      let schema = null;
      switch (type) {
        case "LocalBusiness":
          schema = {
            "@context": "https://schema.org",
            "@type": businessTypes,
            "@id": `${baseUrl}/#business`,
            name: siteSettings.businessName,
            description: businessDescription || `Professional services across ${siteSettings.serviceArea}.`,
            url: baseUrl,
            telephone: siteSettings.phone,
            email: siteSettings.email,
            ...address && {
              address: {
                "@type": "PostalAddress",
                ...address,
                addressCountry: "GB"
              }
            },
            ...geo && {
              geo: {
                "@type": "GeoCoordinates",
                ...geo
              }
            },
            areaServed: areas.map((area) => ({
              "@type": "City",
              name: area.name
            })),
            serviceType: services.map((s) => s.title),
            priceRange: "\xA3\xA3",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                opens: "07:00",
                closes: "19:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "07:00",
                closes: "19:00"
              }
            ],
            ...rating && {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: rating.value,
                reviewCount: rating.count,
                bestRating: "5",
                worstRating: "1"
              }
            },
            image: `${baseUrl}${defaultImage}`,
            logo: `${baseUrl}${defaultImage}`,
            sameAs: [
              siteSettings.facebookUrl,
              siteSettings.instagramUrl,
              siteSettings.linkedinUrl
            ].filter(Boolean)
          };
          break;
        case "Organization":
          schema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${baseUrl}/#organization`,
            name: siteSettings.businessName,
            url: baseUrl,
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}${defaultImage}`,
              width: "512",
              height: "512"
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: siteSettings.phone,
              contactType: "customer service",
              areaServed: "GB",
              availableLanguage: "English"
            },
            sameAs: [
              siteSettings.facebookUrl,
              siteSettings.instagramUrl,
              siteSettings.linkedinUrl
            ].filter(Boolean)
          };
          break;
        case "Service":
          if (data && "name" in data) {
            schema = {
              "@context": "https://schema.org",
              "@type": "Service",
              name: `${data.name} - ${siteSettings.serviceArea}`,
              description: data.description,
              url: `${baseUrl}/services/${data.slug}`,
              provider: {
                "@type": "LocalBusiness",
                "@id": `${baseUrl}/#business`,
                name: siteSettings.businessName
              },
              areaServed: areas.map((area) => ({
                "@type": "City",
                name: area.name
              })),
              serviceType: data.name
            };
          }
          break;
        case "FAQPage":
          if (faqs && faqs.length > 0) {
            schema = {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer
                }
              }))
            };
          }
          break;
        case "BreadcrumbList":
          if (breadcrumbs && breadcrumbs.length > 0) {
            schema = {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                item: `${baseUrl}${item.path}`
              }))
            };
          }
          break;
        case "WebSite":
          schema = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${baseUrl}/#website`,
            url: baseUrl,
            name: siteSettings.businessName,
            inLanguage: "en-GB",
            publisher: {
              "@id": `${baseUrl}/#organization`
            }
          };
          break;
        case "Article":
          if (data && "title" in data) {
            const articleImage = data.image?.startsWith("http") ? data.image : data.image ? `${baseUrl}${data.image}` : `${baseUrl}${defaultImage}`;
            schema = {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: data.title,
              description: data.description,
              image: articleImage,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${baseUrl}${data.slug.startsWith("/") ? data.slug : `/${data.slug}`}`
              },
              author: {
                "@type": "Organization",
                "@id": `${baseUrl}/#organization`
              },
              publisher: {
                "@type": "Organization",
                "@id": `${baseUrl}/#organization`,
                logo: {
                  "@type": "ImageObject",
                  url: `${baseUrl}${defaultImage}`
                }
              },
              datePublished: data.datePublished,
              dateModified: data.dateModified || data.datePublished
            };
          }
          break;
      }
      if (schema) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      }
      return () => {
        const script = document.getElementById(scriptId);
        if (script) {
          script.remove();
        }
      };
    }, [type, data, faqs, breadcrumbs]);
    return null;
  };
  return JsonLd;
};
var Layout = ({
  children,
  TopBar: TopBarComponent,
  Header,
  Footer,
  showSkipLink = true
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    showSkipLink && /* @__PURE__ */ jsx(
      "a",
      {
        href: "#main-content",
        className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-accent",
        children: "Skip to main content"
      }
    ),
    TopBarComponent && /* @__PURE__ */ jsx(TopBarComponent, {}),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { id: "main-content", className: "flex-1", children }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
var TopBar = ({
  phone,
  phoneFormatted,
  hours = "Mon - Sat: 7:00 AM - 7:00 PM",
  tagline = "Same-Day Quotes Available"
}) => {
  return /* @__PURE__ */ jsx("div", { className: "bg-primary text-primary-foreground py-2 text-xs sm:text-sm border-b-2 border-accent", children: /* @__PURE__ */ jsxs("div", { className: "container-custom flex flex-row justify-between items-center gap-2 px-2 sm:px-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-accent" }),
      /* @__PURE__ */ jsx("span", { children: hours })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("span", { className: "hidden md:inline text-accent font-medium", children: tagline }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: `tel:${phoneFormatted}`,
          className: "flex items-center gap-1 sm:gap-2 font-semibold hover:text-accent transition-colors px-2 sm:px-3 py-1 border-2 border-primary-foreground/20 hover:border-accent",
          children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 text-accent" }),
            /* @__PURE__ */ jsx("span", { children: phone })
          ]
        }
      )
    ] })
  ] }) });
};
var ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

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

export { Layout, ScrollToTop, TopBar, absoluteUrlForRoute, assert, cn, createJsonLd, createSEOHead, escapeHtml, escapeRegex, filterIndexableRoutes, formatPhoneNumber, generateSitemapXml };

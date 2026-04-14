import { useEffect } from "react";
import type { JsonLdProps, SiteSettings, Service, Area } from "../types";

export const createJsonLd = (
  siteSettings: SiteSettings,
  services: Service[],
  areas: Area[],
  businessTypes: string[] = ["LocalBusiness"],
  businessDescription?: string,
  geo?: { latitude: number; longitude: number },
  address?: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
  },
  rating?: { value: string; count: string },
  defaultImage: string = "/images/logo.png",
) => {
  const baseUrl = siteSettings.baseUrl.replace(/\/$/, "");

  const JsonLd = ({ type, data, faqs, breadcrumbs }: JsonLdProps) => {
    useEffect(() => {
      const scriptId = `jsonld-${type}-${data?.slug || "main"}`;

      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }

      let schema: object | null = null;

      switch (type) {
        case "LocalBusiness":
          schema = {
            "@context": "https://schema.org",
            "@type": businessTypes,
            "@id": `${baseUrl}/#business`,
            name: siteSettings.businessName,
            description:
              businessDescription ||
              `Professional services across ${siteSettings.serviceArea}.`,
            url: baseUrl,
            telephone: siteSettings.phone,
            email: siteSettings.email,
            ...(address && {
              address: {
                "@type": "PostalAddress",
                ...address,
                addressCountry: "GB",
              },
            }),
            ...(geo && {
              geo: {
                "@type": "GeoCoordinates",
                ...geo,
              },
            }),
            areaServed: areas.map((area) => ({
              "@type": "City",
              name: area.name,
            })),
            serviceType: services.map((s) => s.title),
            priceRange: "££",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "07:00",
                closes: "19:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "07:00",
                closes: "19:00",
              },
            ],
            ...(rating && {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: rating.value,
                reviewCount: rating.count,
                bestRating: "5",
                worstRating: "1",
              },
            }),
            image: `${baseUrl}${defaultImage}`,
            logo: `${baseUrl}${defaultImage}`,
            sameAs: [
              siteSettings.facebookUrl,
              siteSettings.instagramUrl,
              siteSettings.linkedinUrl,
            ].filter(Boolean),
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
              height: "512",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: siteSettings.phone,
              contactType: "customer service",
              areaServed: "GB",
              availableLanguage: "English",
            },
            sameAs: [
              siteSettings.facebookUrl,
              siteSettings.instagramUrl,
              siteSettings.linkedinUrl,
            ].filter(Boolean),
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
                name: siteSettings.businessName,
              },
              areaServed: areas.map((area) => ({
                "@type": "City",
                name: area.name,
              })),
              serviceType: data.name,
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
                  text: faq.answer,
                },
              })),
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
                item: `${baseUrl}${item.path}`,
              })),
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
              "@id": `${baseUrl}/#organization`,
            },
          };
          break;

        case "Article":
          if (data && "title" in data) {
            const articleImage = data.image?.startsWith("http")
              ? data.image
              : data.image
                ? `${baseUrl}${data.image}`
                : `${baseUrl}${defaultImage}`;
            schema = {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: data.title,
              description: data.description,
              image: articleImage,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${baseUrl}${data.slug.startsWith("/") ? data.slug : `/${data.slug}`}`,
              },
              author: {
                "@type": "Organization",
                "@id": `${baseUrl}/#organization`,
              },
              publisher: {
                "@type": "Organization",
                "@id": `${baseUrl}/#organization`,
                logo: {
                  "@type": "ImageObject",
                  url: `${baseUrl}${defaultImage}`,
                },
              },
              datePublished: data.datePublished,
              dateModified: data.dateModified || data.datePublished,
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

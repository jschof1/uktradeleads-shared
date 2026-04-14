import { useEffect } from "react";
import type { SEOHeadProps } from "../types";

export const createSEOHead = (
  baseUrl: string,
  siteName: string,
  defaultImage: string = "/images/logo.png",
) => {
  const SEOHead = ({
    title,
    description,
    canonicalPath = "",
    image = defaultImage,
    type = "website",
    noindex = false,
  }: SEOHeadProps) => {
    useEffect(() => {
      document.title = title;

      const setMetaTag = (
        name: string,
        content: string,
        isProperty = false,
      ) => {
        const attribute = isProperty ? "property" : "name";
        let element = document.querySelector(
          `meta[${attribute}="${name}"]`,
        ) as HTMLMetaElement;

        if (!element) {
          element = document.createElement("meta");
          element.setAttribute(attribute, name);
          document.head.appendChild(element);
        }
        element.content = content;
      };

      const setLinkTag = (rel: string, href: string) => {
        let element = document.querySelector(
          `link[rel="${rel}"]`,
        ) as HTMLLinkElement;

        if (!element) {
          element = document.createElement("link");
          element.rel = rel;
          document.head.appendChild(element);
        }
        element.href = href;
      };

      const fullUrl = `${baseUrl}${canonicalPath}`;
      const fullImageUrl = image.startsWith("http")
        ? image
        : `${baseUrl}${image}`;

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

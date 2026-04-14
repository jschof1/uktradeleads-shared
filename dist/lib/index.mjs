import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

export { absoluteUrlForRoute, cn, formatPhoneNumber };

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phone: string): string {
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

export function absoluteUrlForRoute(baseUrl: string, path: string): string {
  const base = baseUrl.replace(/\/$/, "");
  return `${base}${path === "/" ? "/" : path}`;
}

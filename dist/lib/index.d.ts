import { ClassValue } from 'clsx';

declare function cn(...inputs: ClassValue[]): string;
declare function formatPhoneNumber(phone: string): string;
declare function absoluteUrlForRoute(baseUrl: string, path: string): string;

export { absoluteUrlForRoute, cn, formatPhoneNumber };

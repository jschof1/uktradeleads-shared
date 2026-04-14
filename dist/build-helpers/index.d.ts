import { SeoRoute } from '../types/index.js';

declare function generateSitemapXml(routes: SeoRoute[], baseUrl: string): string;
declare function escapeHtml(value: string): string;
declare function escapeRegex(value: string): string;
declare function assert(condition: unknown, message: string): asserts condition;
declare function filterIndexableRoutes(routes: SeoRoute[]): SeoRoute[];

export { SeoRoute, assert, escapeHtml, escapeRegex, filterIndexableRoutes, generateSitemapXml };

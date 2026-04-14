import { SEOHeadProps, SiteSettings, Service, Area, JsonLdProps, LayoutProps, TopBarProps } from '../types/index.mjs';
import * as react_jsx_runtime from 'react/jsx-runtime';

declare const createSEOHead: (baseUrl: string, siteName: string, defaultImage?: string) => ({ title, description, canonicalPath, image, type, noindex, }: SEOHeadProps) => null;

declare const createJsonLd: (siteSettings: SiteSettings, services: Service[], areas: Area[], businessTypes?: string[], businessDescription?: string, geo?: {
    latitude: number;
    longitude: number;
}, address?: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
}, rating?: {
    value: string;
    count: string;
}, defaultImage?: string) => ({ type, data, faqs, breadcrumbs }: JsonLdProps) => null;

declare const Layout: ({ children, TopBar: TopBarComponent, Header, Footer, showSkipLink, }: LayoutProps) => react_jsx_runtime.JSX.Element;

declare const TopBar: ({ phone, phoneFormatted, hours, tagline, }: TopBarProps) => react_jsx_runtime.JSX.Element;

export { Layout, TopBar, createJsonLd, createSEOHead };

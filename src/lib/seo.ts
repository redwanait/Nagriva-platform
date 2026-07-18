import { useEffect, useRef } from 'react';

const SITE_NAME = 'Nagriva';
const SITE_URL = 'https://nagriva.com';
const DEFAULT_OG_IMAGE = 'https://nagriva.com/og-default.png';

export interface SEOConfig {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  robots?: string;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string, attrs?: Record<string, string>) {
  const selector = attrs
    ? `link[rel="${rel}"][${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join('][')}]`
    : `link[rel="${rel}"]`;
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (attrs) {
      Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
    }
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function removeJsonLd(id: string) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

export function normalizeKeywords(raw: unknown): string[] | undefined {
  if (!raw) return undefined;
  if (Array.isArray(raw)) return raw.filter(Boolean);
  if (typeof raw === 'string') {
    const parsed = raw.split(',').map((s) => s.trim()).filter(Boolean);
    return parsed.length ? parsed : undefined;
  }
  return undefined;
}

export function useSEO(config: SEOConfig) {
  const configRef = useRef(config);
  configRef.current = config;

  useEffect(() => {
    const c = configRef.current;
    const fullTitle = c.title ? `${c.title} | ${SITE_NAME}` : SITE_NAME;

    document.title = fullTitle;

    if (c.description) {
      setMeta('description', c.description);
    }

    if (c.robots) {
      setMeta('robots', c.robots);
    }

    const kw = normalizeKeywords(c.keywords);
    if (kw?.length) {
      setMeta('keywords', kw.join(', '));
    }

    const canonical = c.canonical || `${SITE_URL}${window.location.hash.slice(1) || '/'}`;
    setLink('canonical', canonical);

    setProperty('og:title', c.title || SITE_NAME);
    setProperty('og:description', c.description || '');
    setProperty('og:url', canonical);
    setProperty('og:type', c.ogType || 'website');
    setProperty('og:site_name', SITE_NAME);
    setProperty('og:image', c.ogImage || DEFAULT_OG_IMAGE);
    setProperty('og:image:width', '1200');
    setProperty('og:image:height', '630');

    setMeta('twitter:card', c.twitterCard || 'summary_large_image');
    setMeta('twitter:title', c.title || SITE_NAME);
    setMeta('twitter:description', c.description || '');
    setMeta('twitter:image', c.ogImage || DEFAULT_OG_IMAGE);

    if (c.author) {
      setMeta('author', c.author);
    }

    if (c.publishedTime) {
      setProperty('article:published_time', c.publishedTime);
    }
    if (c.modifiedTime) {
      setProperty('article:modified_time', c.modifiedTime);
    }
    if (c.section) {
      setProperty('article:section', c.section);
    }
    if (c.author) {
      setProperty('article:author', c.author);
    }
  }, [config.title, config.description, config.canonical, config.ogImage,
      config.ogType, config.twitterCard, config.robots, config.publishedTime,
      config.modifiedTime, config.author, config.section]);
}

export function insertJsonLd(id: string, data: Record<string, unknown>) {
  removeJsonLd(id);
  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export function removeJsonLdById(id: string) {
  removeJsonLd(id);
}

export { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE };

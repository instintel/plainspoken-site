import { SITE, absoluteUrl } from '../site.config';

// Structured data (schema.org JSON-LD). URLs are only included once SITE.siteUrl is set.

const publisher = () => ({
  '@type': 'Organization',
  name: SITE.name,
  ...(SITE.siteUrl ? { url: SITE.siteUrl } : {}),
});

const clean = (obj: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));

export function articleLd(opts: {
  kind: 'Article' | 'NewsArticle';
  path: string;
  title: string;
  description?: string;
  published: Date;
  modified?: Date;
  image?: string;
  author?: string;
  keywords?: string[];
}) {
  const url = absoluteUrl(opts.path);
  const img = opts.image && opts.image.startsWith('/') ? absoluteUrl(opts.image) : opts.image?.startsWith('http') ? opts.image : undefined;
  return clean({
    '@context': 'https://schema.org',
    '@type': opts.kind,
    headline: opts.title,
    description: opts.description,
    datePublished: opts.published.toISOString(),
    dateModified: (opts.modified ?? opts.published).toISOString(),
    inLanguage: 'en-MY',
    author: opts.author && opts.author !== SITE.name.toLowerCase() && opts.author !== SITE.name
      ? { '@type': 'Person', name: opts.author }
      : publisher(),
    publisher: publisher(),
    mainEntityOfPage: url,
    image: img,
    keywords: opts.keywords && opts.keywords.length ? opts.keywords.join(', ') : undefined,
  });
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  if (!SITE.siteUrl) return undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const ldList = (...blocks: (Record<string, unknown> | undefined)[]) =>
  blocks.filter((b): b is Record<string, unknown> => !!b);

export const longDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

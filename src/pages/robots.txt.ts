import type { APIRoute } from 'astro';
import { SITE, absoluteUrl } from '../site.config';

// Crawling stays allowed either way: while the site is private, each page's
// noindex tag is what keeps it out of search, and crawlers must be able to read it.

export const GET: APIRoute = () => {
  const lines = ['User-agent: *', 'Allow: /'];
  if (SITE.indexable && SITE.siteUrl) lines.push('', `Sitemap: ${absoluteUrl('/sitemap.xml')}`);
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

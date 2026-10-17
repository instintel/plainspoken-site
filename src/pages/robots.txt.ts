import type { APIRoute } from 'astro';
import { SITE, absoluteUrl } from '../site.config';

// Crawling stays allowed for search engines either way: while the site is private,
// each page's noindex tag is what keeps it out of search, and crawlers must be able to read it.

// AI training / scraping crawlers: blocked site-wide. Polite bots obey this;
// Cloudflare's "Block AI bots" setting handles the ones that don't.
const BLOCKED_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'CCBot',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  'Applebot-Extended',
  'PerplexityBot',
  'Bytespider',
  'Meta-ExternalAgent',
  'Amazonbot',
  'Diffbot',
  'omgili',
];

export const GET: APIRoute = () => {
  const lines: string[] = [];
  for (const bot of BLOCKED_BOTS) lines.push(`User-agent: ${bot}`, 'Disallow: /', '');
  lines.push('User-agent: *', 'Allow: /');
  if (SITE.indexable && SITE.siteUrl) lines.push('', `Sitemap: ${absoluteUrl('/sitemap.xml')}`);
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

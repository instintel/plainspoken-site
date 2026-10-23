import type { APIRoute } from 'astro';
import { SITE, absoluteUrl } from '../site.config';

// Crawling stays allowed for search engines either way: while the site is private,
// each page's noindex tag is what keeps it out of search, and crawlers must be able to read it.

// AI training / scraping crawlers: blocked site-wide. AI search and link-reading bots
// (PerplexityBot, ChatGPT-User, OAI-SearchBot, Google-Extended, Claude's search bots) are
// allowed on purpose, so AI answers can cite and link the site (operator ruling, Oct 23, 2026). Polite bots obey this;
// Cloudflare's "Block AI bots" setting handles the ones that don't.
const BLOCKED_BOTS = [
  'GPTBot',
  'CCBot',
  'ClaudeBot',
  'anthropic-ai',
  'Applebot-Extended',
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

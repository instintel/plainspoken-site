import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, absoluteUrl } from '../site.config';

// sitemap.xml with a true <lastmod> per page, so search engines re-read an explainer
// when it is updated. Empty until SITE.siteUrl is set (sitemaps need full URLs) and
// until the site is indexable.

const day = (d: Date) => d.toISOString().slice(0, 10);

export const GET: APIRoute = async () => {
  const urls: { loc: string; lastmod?: string }[] = [];

  if (SITE.siteUrl && SITE.indexable) {
    const briefs = (await getCollection('daily-briefs')).filter((b) => !b.data.draft);
    const explainers = (await getCollection('explainers')).filter((e) => !e.data.draft);
    const latest = (dates: Date[]) => (dates.length ? day(new Date(Math.max(...dates.map((d) => d.valueOf())))) : undefined);

    urls.push({ loc: absoluteUrl('/')!, lastmod: latest(briefs.map((b) => b.data.date)) });
    urls.push({ loc: absoluteUrl('/daily-briefs/')!, lastmod: latest(briefs.map((b) => b.data.date)) });
    urls.push({ loc: absoluteUrl('/explainers/')!, lastmod: latest(explainers.map((e) => e.data.lastmod ?? e.data.date)) });
    for (const e of explainers) {
      urls.push({ loc: absoluteUrl(`/explainers/${e.slug}/`)!, lastmod: day(e.data.lastmod ?? e.data.date) });
    }
    for (const b of briefs) {
      urls.push({ loc: absoluteUrl(`/daily-briefs/${b.slug}/`)!, lastmod: day(b.data.date) });
    }
  }

  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n') +
    (urls.length ? '\n' : '') +
    '</urlset>\n';

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

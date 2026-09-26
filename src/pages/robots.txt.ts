import type { APIRoute } from 'astro';

// Until SITE_INDEXING=on, ask every crawler (search engines and AI bots) to stay away.
export const GET: APIRoute = ({ site }) => {
  const allowIndexing = import.meta.env.SITE_INDEXING === 'on';
  const sitemap = new URL(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/sitemap-index.xml`, site);
  const body = allowIndexing
    ? `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${sitemap.href}\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

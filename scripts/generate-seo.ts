import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://nbsvogvmhuyxrggxncoa.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || '';
const SITE_URL = 'https://nagriva.com';

interface Article {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  cover_image: string;
  image_url: string;
  og_image: string | null;
  author_name: string;
  author: string;
  published_at: string;
  updated_at: string;
  reading_time: string;
  seo_title: string | null;
  seo_description: string | null;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDateRfc822(dateStr: string): string {
  return new Date(dateStr).toUTCString();
}

function generateSitemap(articles: Article[]): string {
  const now = new Date().toISOString().split('T')[0];

  const articleUrls = articles.map((a) => `  <url>
    <loc>${SITE_URL}/#/blog/${a.slug}</loc>
    <lastmod>${a.updated_at ? a.updated_at.split('T')[0] : now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/#/blog</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/#/features</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/#/pricing</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/#/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${SITE_URL}/#/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
${articleUrls}
</urlset>`;
}

function generateRss(articles: Article[]): string {
  const now = formatDateRfc822(new Date().toISOString());

  const items = articles.map((a) => {
    const image = a.og_image || a.cover_image || a.image_url || '';
    const description = escapeXml(a.seo_description || a.excerpt || '');
    return `    <item>
      <title>${escapeXml(a.seo_title || a.title)}</title>
      <link>${SITE_URL}/#/blog/${a.slug}</link>
      <guid isPermaLink="false">${a.slug}</guid>
      <pubDate>${formatDateRfc822(a.published_at)}</pubDate>
      <category>${escapeXml(a.category)}</category>
      <description>${description}</description>
      ${image ? `<enclosure url="${escapeXml(image)}" type="image/jpeg" length="0"/>` : ''}
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Nagriva Blog</title>
    <link>${SITE_URL}/#/blog</link>
    <description>Insights, tutorials and resources about AI Employees, automation, productivity and business growth.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

async function main() {
  console.log('Generating SEO files from Supabase...\n');

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch articles:', error.message);
    process.exit(1);
  }

  const list = (articles ?? []) as Article[];
  console.log(`Found ${list.length} published articles`);

  const publicDir = resolve(import.meta.dirname, '..', 'public');

  const sitemap = generateSitemap(list);
  writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemap);
  console.log(`  -> sitemap.xml (${list.length + 5} URLs)`);

  const rss = generateRss(list);
  writeFileSync(resolve(publicDir, 'rss.xml'), rss);
  console.log(`  -> rss.xml (${list.length} items)`);

  console.log('\nDone!');
}

main();

import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const template = readFileSync(join(dist, 'index.html'), 'utf8');
const server = await createServer({ optimizeDeps: { noDiscovery: true, include: [] }, server: { middlewareMode: true }, appType: 'custom' });

function escape(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

try {
  const { App, pages } = await server.ssrLoadModule('/src/App.jsx');
  for (const [path, page] of Object.entries(pages)) {
    const canonical = `https://rkpurilaw.com${path}`;
    const title = escape(page.title);
    const description = escape(page.description.replaceAll('&amp;', '&'));
    const structured = page.structuredData.map((data) => `<script type="application/ld+json">${JSON.stringify(data).replaceAll('<', '\\u003c')}</script>`).join('');
    const metadata = `<meta name="description" content="${description}"><link rel="canonical" href="${canonical}">` +
      `<meta property="og:type" content="website"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${canonical}">` +
      `<meta name="twitter:card" content="summary_large_image"><meta property="og:image" content="https://rkpurilaw.com/social-card.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Rakesh Puri & Associates — Law, Investigation, Experience"><meta name="twitter:image" content="https://rkpurilaw.com/social-card.png">` +
      (page.noindex ? '<meta name="robots" content="noindex,follow">' : '') + structured;
    const markup = renderToString(React.createElement(App, { path }));
    const html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>${metadata}`)
      .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
    const file = join(dist, path === '/' ? '' : path.slice(1), 'index.html');
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    if (path === '/404/') writeFileSync(join(dist, '404.html'), html);
  }
  const sitemapPaths = Object.entries(pages).filter(([path, page]) => path !== '/404/' && !page.noindex).map(([path]) => `<url><loc>https://rkpurilaw.com${path}</loc></url>`).join('');
  writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapPaths}</urlset>`);
  writeFileSync(join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://rkpurilaw.com/sitemap.xml\n');
  console.log(`Pre-rendered ${Object.keys(pages).length} React pages.`);
} finally {
  await server.close();
}

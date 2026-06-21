import http from 'node:http';
import fs from 'node:fs/promises';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5172;
const base = process.env.BASE || '/';

// CMS API base URL for SSR data fetching
const CMS_API_BASE = isProduction
  ? 'https://cms.wondergate.io/api'
  : 'https://cms.wondergate.io/api';

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : '';

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: {
      middlewareMode: 'ssr',
      host: '0.0.0.0',
      hmr: {
        // Avoid clash with leftover Vite processes (was causing WebSocket port errors)
        port: Number(process.env.HMR_PORT) || 24679,
        timeout: 30000,
        overlay: false,
      },
    },
    appType: 'custom',
    base,
  });
}

/**
 * Fetch data from CMS API for SSR
 */
async function fetchFromCMS(path) {
  try {
    const url = `${CMS_API_BASE}${path}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Wondergate-SSR/1.0 (compatible; Googlebot)',
      },
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`CMS API ${res.status}`);
    const json = await res.json();
    return json?.data ?? json;
  } catch (e) {
    console.error(`[SSR] CMS fetch failed: ${path}`, e.message);
    return null;
  }
}

/**
 * Fetch blog post by slug for SSR
 */
async function fetchBlogPost(slug) {
  const data = await fetchFromCMS(`/client/posts/show?slug=${encodeURIComponent(slug)}`);
  return data;
}

/**
 * Fetch blog categories for SSR
 */
async function fetchBlogCategories() {
  const data = await fetchFromCMS('/client/posts/getCategories');
  return Array.isArray(data) ? data : [];
}

/**
 * Fetch blog post list by category for SSR
 */
async function fetchBlogList(categoryId) {
  const data = await fetchFromCMS(`/client/posts/list?categoryId=${encodeURIComponent(categoryId)}`);
  return Array.isArray(data) ? data : [];
}

/**
 * Fetch all blog posts across all categories for sitemap
 */
async function fetchAllBlogPosts() {
  const posts = [];
  const seen = new Set();
  try {
    const categories = await fetchBlogCategories();
    for (const cat of categories) {
      const list = await fetchBlogList(cat.id);
      if (Array.isArray(list)) {
        for (const post of list) {
          if (post.slug && !seen.has(post.slug)) {
            seen.add(post.slug);
            posts.push(post);
          }
        }
      }
    }
  } catch (e) {
    console.error('[SSR] fetchAllBlogPosts failed:', e.message);
  }
  return posts;
}

/**
 * Generate sitemap XML dynamically from ROUTE_MAP + CMS blog posts
 */
async function generateSitemap() {
  const BASE_URL = 'https://www.wondergate.io';
  const urls = [];
  const seen = new Set();

  // Static pages
  const staticPaths = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/about-us', priority: '0.7', changefreq: 'monthly' },
    { loc: '/contact-us', priority: '0.6', changefreq: 'monthly' },
    { loc: '/blog', priority: '0.9', changefreq: 'weekly' },
    { loc: '/product-center/global-payments', priority: '0.9', changefreq: 'monthly' },
    { loc: '/product-center/global-collection-account', priority: '0.9', changefreq: 'monthly' },
    { loc: '/product-center/issuing-virtual-cards', priority: '0.9', changefreq: 'monthly' },
    { loc: '/product-center/payment-solutions', priority: '0.9', changefreq: 'monthly' },
    { loc: '/security-center', priority: '0.6', changefreq: 'monthly' },
  ];

  for (const page of staticPaths) {
    urls.push({ loc: `${BASE_URL}${page.loc}`, lastmod: '2026-06-10', changefreq: page.changefreq, priority: page.priority });
    seen.add(page.loc);
  }

  // Blog posts from CMS
  const posts = await fetchAllBlogPosts();
  for (const post of posts) {
    const slug = post.slug;
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    urls.push({
      loc: `${BASE_URL}/blog/detail/${slug}`,
      lastmod: (post.updatedAt || post.publishedAt || '2026-06-10').slice(0, 10),
      changefreq: 'monthly',
      priority: '0.7',
    });
  }

  // Build XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const u of urls) {
    xml += '  <url>\n';
    xml += `    <loc>${escapeXml(u.loc)}</loc>\n`;
    xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
    xml += `    <priority>${u.priority}</priority>\n`;
    xml += '  </url>\n';
  }
  xml += '</urlset>';
  return xml;
}

function escapeXml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Match route and determine page type + pre-fetch data
 */
const ROUTE_MAP = [
  { pattern: /^\/$/, type: 'home', title: 'Global Cross-Border Payment Gateway & API | Wondergate', description: 'Wondergate provides global cross-border payment gateway and API solutions for businesses. Connect to any payment service worldwide.' },
  { pattern: /^\/blog\/detail\/(.+)$/, type: 'blog-detail', slugIdx: 0 },
  { pattern: /^\/blog$/, type: 'blog', title: 'Cross-Border Payment Blog — Insights & Guides | Wondergate', description: 'Expert insights and guides on cross-border payments, payment orchestration, virtual card issuing, and global payment solutions.' },
  { pattern: /^\/product-center\/global-payments$/, type: 'page', title: 'Global Payment Solution & Cross-Border Acquiring | Wondergate', description: 'Power your global business with Wondergate\'s cross-border payment acquiring solutions. Accept payments worldwide with a single integration.' },
  { pattern: /^\/product-center\/issuing-virtual-cards$/, type: 'page', title: 'Virtual Card Issuing API for B2B Payments | Wondergate', description: 'Issue virtual cards at scale with Wondergate\'s API. Perfect for B2B payments, expense management, and global payouts.' },
  { pattern: /^\/product-center\/global-collection-account$/, type: 'page', title: 'Global Collection Account — Multi-Currency Receiving | Wondergate', description: 'Open global collection accounts to receive payments in multiple currencies. Simplify your cross-border receivables with Wondergate.' },
  { pattern: /^\/product-center\/payment-solutions$/, type: 'page', title: 'Payment Solutions — Tailored for Your Business | Wondergate', description: 'Custom payment solutions for e-commerce, marketplaces, SaaS, and more. Scale your payment infrastructure with Wondergate.' },
  { pattern: /^\/about-us$/, type: 'page', title: 'About Wondergate — Global Payment Infrastructure | Wondergate', description: 'Learn about Wondergate\'s mission to build the global payment infrastructure that powers cross-border commerce.' },
  { pattern: /^\/contact-us$/, type: 'page', title: 'Contact Wondergate — Get Started Today | Wondergate', description: 'Get in touch with Wondergate. Start integrating global payments, virtual card issuing, and collection accounts for your business.' },
  { pattern: /^\/security-center$/, type: 'page', title: 'Security Center — Your Trust, Our Priority | Wondergate', description: 'Wondergate\'s security center. Learn about our compliance, data protection, and security practices for global payment processing.' },
];

async function matchRoute(url) {
  const cleanUrl = (url || '/').split('?')[0].split('#')[0];
  for (const route of ROUTE_MAP) {
    const match = cleanUrl.match(route.pattern);
    if (match) {
      return { ...route, match };
    }
  }
  return { type: 'page', title: 'Wondergate', description: 'Payment service solutions, Connect To Any Payment Service.' };
}

async function getPageMeta(url) {
  const route = await matchRoute(url);

  if (route.type === 'blog-detail' && route.match) {
    const slug = route.match[1];
    const post = await fetchBlogPost(slug);

    if (!post || !post.title) {
      return { is404: true, title: 'Blog Post Not Found | Wondergate', description: 'The blog post you are looking for does not exist or has been removed.' };
    }

    const categories = await fetchBlogCategories();
    const enriched = await enrichPostFromList(post, post.categoryId);
    const categoryName = categories.find(
      (c) => c.id?.toString() === enriched.categoryId?.toString()
    )?.name || 'Blog';
    const description = getPostDescription(enriched);

    return {
      title: `${enriched.title || 'Blog Post'} | Wondergate`,
      description,
      canonical: `https://www.wondergate.io/blog/detail/${slug}`,
      ogImage: getPostOgImage(enriched),
      publishedAt: post.publishedAt || '',
      category: categoryName,
      ssrData: { post: enriched, categories, slug, categoryName },
    };
  }

  if (route.type === 'blog') {
    const categories = await fetchBlogCategories();
    const firstCategoryId = categories[0]?.id;
    let posts = [];
    if (firstCategoryId) {
      posts = await fetchBlogList(firstCategoryId);
    }
    return {
      title: route.title,
      description: route.description,
      canonical: 'https://www.wondergate.io/blog',
      ssrData: { categories, posts, activeCategoryId: firstCategoryId?.toString() },
      blogList: true,
    };
  }

  // Unknown route → 404
  if (!route.match) {
    return { is404: true, title: 'Page Not Found | Wondergate', description: 'The page you are looking for does not exist.' };
  }

  return {
    title: route.title || 'Wondergate',
    description: route.description || 'Payment service solutions, Connect To Any Payment Service.',
    canonical: `https://www.wondergate.io${url === '/' ? '' : url}`,
  };
}

// Create http server
const server = http.createServer(async (req, res) => {
  const url = (req.url || '/').split('?')[0];

  // Proxy /api requests directly to CMS (before Vite/SSR handling)
  if (url.startsWith('/api') && req.method === 'GET') {
    try {
      const proxyTarget = `https://cms.wondergate.io${url}`;
      const proxyRes = await fetch(proxyTarget, { headers: { 'User-Agent': 'Wondergate-SSR/1.0' } });
      const body = await proxyRes.text();
      res.writeHead(proxyRes.status, { 'Content-Type': proxyRes.headers.get('content-type') || 'application/json' });
      res.end(body);
      return;
    } catch (e) { console.error('[API Proxy] Error:', e.message); }
  }

  // --- Top-level routes: redirects, robots.txt, sitemap.xml (before Vite/prod branching) ---
  if (req.method === 'GET' || req.method === 'HEAD') {
    // 301 redirects
    const qs = req.url?.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    const redirects = { '/home': '/', '/index': '/' };
    if (redirects[url]) {
      res.writeHead(301, { 'Location': redirects[url] + qs });
      res.end();
      return;
    }

    // robots.txt
    if (url === '/robots.txt') {
      const robots = [
        'User-agent: *',
        'Allow: /',
        'Disallow: /api/',
        'Disallow: /admin/',
        '',
        'Sitemap: https://www.wondergate.io/sitemap.xml',
      ].join('\n');
      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
      });
      res.end(robots);
      return;
    }

    // sitemap.xml
    if (url === '/sitemap.xml') {
      try {
        const sitemapXml = await generateSitemap();
        res.writeHead(200, {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
        });
        res.end(sitemapXml);
      } catch (e) {
        res.writeHead(500);
        res.end('Sitemap generation failed');
      }
      return;
    }
  }
  // --- end top-level routes ---

  const isAsset = /\.(js|css|ts|less|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|otf|map|json|xml)$/i.test(url);
  const accept = req.headers.accept || '';
  const wantsHtml = req.method === 'GET' && accept.includes('text/html');
  const isViteInternal =
    url.startsWith('/@vite/') ||
    url.startsWith('/@id/') ||
    url === '/@vite/client' ||
    url.startsWith('/__vite_ping') ||
    url.startsWith('/@fs/') ||
    url.startsWith('/node_modules/') ||
    url.startsWith('/src/');
  
  if (!isProduction && vite) {
    if (wantsHtml && !isAsset && !isViteInternal) {
      // HTML/page routes: handle ourselves (SSR)
      serveHtml(req, res);
    } else {
      // Non-HTML/module/static requests: always let Vite handle in dev
      vite.middlewares(req, res, () => {
        handleRequest(req, res);
      });
    }
  } else {
    handleRequest(req, res);
  }
});

// Handle request
async function handleRequest(req, res) {
  try {
    if (req.method !== 'GET') {
      res.statusCode = 405;
      res.end('Method Not Allowed');
      return;
    }

    if (isProduction) {
      const sirv = (await import('sirv')).default;
      const staticHandler = sirv('./dist/client', {
        extensions: [],
        setHeaders: (res, pathname) => {
          if (pathname.includes('assets/')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000');
          }
        },
      });

      const next = () => {
        serveHtml(req, res);
      };

      staticHandler(req, res, next);
    } else {
      const url = (req.url || '/').split('?')[0];
      if (url.startsWith('/api')) {
        const proxyTarget = `https://cms.wondergate.io${url}`;
        const proxyRes = await fetch(proxyTarget, { headers: { 'User-Agent': 'Wondergate-SSR/1.0' } });
        const body = await proxyRes.text();
        res.writeHead(proxyRes.status, { 'Content-Type': proxyRes.headers.get('content-type') || 'application/json' });
        res.end(body);
        return;
      }
      serveHtml(req, res);
    }
  } catch (e) {
    res.statusCode = 500;
    res.end(e.stack);
  }
}

// Serve HTML with SSR data
async function serveHtml(req, res) {
  try {
    let url = req.url?.replace(base, '') || '';
    if (!url.startsWith('/')) url = '/' + url;
    console.log(`[SSR] serveHtml called, url=${url}`);

    // Pre-fetch page meta & SSR data (before heavy Vite compilation)
    const meta = await getPageMeta(url);
    console.log(`[SSR] meta.title="${meta.title}" is404=${!!meta.is404} hasSSRData=${!!meta.ssrData}`);

    // 404: return lightweight HTML immediately, skip Vite SSR
    if (meta.is404) {
      const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(meta.description)}">
  <meta name="robots" content="noindex, follow">
</head>
<body style="font-family:sans-serif;text-align:center;padding:80px 20px;background:#022233;color:#fff;">
  <h1 style="font-size:48px;margin-bottom:16px;">404</h1>
  <p style="font-size:18px;color:#aaa;">Page Not Found</p>
  <a href="/" style="color:#7c5cbf;font-size:16px;">Return to Homepage</a>
</body>
</html>`;
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end(notFoundHtml);
      return;
    }

    /** @type {import('./src/entry-server.ts').render} */
    let render;
    /** @type {string} */
    let template;

    if (!isProduction) {
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.ts')).render;
    } else {
      template = templateHtml;
      render = (await import('./dist/server/entry-server.js')).render;
    }

    // Build head HTML dynamically
    const headParts = [];
    headParts.push(`<title>${meta.title}</title>`);
    headParts.push(`<meta name="description" content="${escapeHtml(meta.description)}">`);
    headParts.push(`<meta name="keywords" content="cross-border, Global payments, Global collection account, Issuing virtual cards, Payment solutions, Security Center">`);
    headParts.push(`<meta name="robots" content="index, follow">`);
    if (meta.canonical) {
      headParts.push(`<link rel="canonical" href="${meta.canonical}">`);
    }

    // Open Graph
    headParts.push(`<meta property="og:title" content="${escapeHtml(meta.title)}">`);
    headParts.push(`<meta property="og:description" content="${escapeHtml(meta.description)}">`);
    headParts.push(`<meta property="og:type" content="${meta.ssrData?.post ? 'article' : 'website'}">`);
    headParts.push(`<meta property="og:url" content="${meta.canonical || 'https://www.wondergate.io'}">`);
    headParts.push(`<meta property="og:site_name" content="Wondergate">`);
    if (meta.ogImage) {
      headParts.push(`<meta property="og:image" content="${meta.ogImage}">`);
      headParts.push(`<meta property="og:image:width" content="1200">`);
      headParts.push(`<meta property="og:image:height" content="630">`);
    } else {
      const defaultOgImage = 'https://www.wondergate.io/images/wondergate-og-default.png';
      headParts.push(`<meta property="og:image" content="${defaultOgImage}">`);
      headParts.push(`<meta property="og:image:width" content="1200">`);
      headParts.push(`<meta property="og:image:height" content="630">`);
    }

    // Twitter Card
    headParts.push(`<meta name="twitter:card" content="summary_large_image">`);
    headParts.push(`<meta name="twitter:title" content="${escapeHtml(meta.title)}">`);
    headParts.push(`<meta name="twitter:description" content="${escapeHtml(meta.description)}">`);
    if (meta.ogImage) {
      headParts.push(`<meta name="twitter:image" content="${meta.ogImage}">`);
    } else {
      headParts.push(`<meta name="twitter:image" content="https://www.wondergate.io/images/wondergate-og-default.png">`);
    }

    // Article-specific OG tags
    if (meta.publishedAt) {
      headParts.push(`<meta property="article:published_time" content="${meta.publishedAt}">`);
    }
    if (meta.category) {
      headParts.push(`<meta property="article:section" content="${meta.category}">`);
    }

    // JSON-LD structured data
    if (meta.ssrData?.post) {
      const post = meta.ssrData.post;
      const ldJson = buildArticleLdJson(post, meta.ssrData.categoryName, meta.canonical);
      headParts.push(`<script type="application/ld+json">${ldJson}</script>`);

      // FAQ Schema (auto-detect FAQ sections in content)
      if (post.content) {
        const faqJson = buildFaqLdJson(post.content);
        if (faqJson) {
          headParts.push(`<script type="application/ld+json">${faqJson}</script>`);
        }
      }
    } else if (url === '/' || url === '') {
      headParts.push(`<script type="application/ld+json">${buildOrgLdJson()}</script>`);
      headParts.push(`<script type="application/ld+json">${buildWebPageLdJson(meta.title, meta.description, meta.canonical || 'https://www.wondergate.io')}</script>`);
    } else if (meta.blogList) {
      headParts.push(`<script type="application/ld+json">${buildBlogListingLdJson(meta.ssrData?.posts || [])}</script>`);
    } else if (url === '/contact-us') {
      headParts.push(`<script type="application/ld+json">${buildContactPageLdJson(meta.canonical || 'https://www.wondergate.io/contact-us')}</script>`);
    } else if (url === '/about-us') {
      headParts.push(`<script type="application/ld+json">${buildOrgLdJson()}</script>`);
      headParts.push(`<script type="application/ld+json">${buildWebPageLdJson(meta.title, meta.description, meta.canonical || 'https://www.wondergate.io/about-us')}</script>`);
    } else {
      headParts.push(`<script type="application/ld+json">${buildWebPageLdJson(meta.title, meta.description, meta.canonical || `https://www.wondergate.io${url}`)}</script>`);
    }

    // Inject SSR data as JSON
    if (meta.ssrData) {
      headParts.push(`<script id="ssr-data" type="application/json">${JSON.stringify(meta.ssrData)}</script>`);
    }

    const rendered = await render(url, meta.ssrData || {});

    const html = template
      .replace(`<!--app-head-->`, headParts.join('\n') + '\n' + (rendered.head ?? ''))
      .replace(`<!--app-html-->`, rendered.html ?? '');

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    
    // Debug: check if replacement worked
    const hasTitle = html.includes(`<title>${meta.title}</title>`);
    console.log(`[SSR] HTML contains dynamic title: ${hasTitle} | HTML length: ${html.length}`);
    res.end(html);
  } catch (e) {
    res.statusCode = 500;
    res.end(e.stack);
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** CMS /show often omits summary & coverImage; derive from content when needed */
function stripHtml(html) {
  return (html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function getPostDescription(post) {
  const fromField = post?.summary || post?.description || '';
  if (fromField) return fromField.slice(0, 160);
  return stripHtml(post?.content).slice(0, 160);
}

function getPostOgImage(post) {
  if (post?.coverImage) return post.coverImage;
  const match = (post?.content || '').match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : '';
}

async function enrichPostFromList(post, categoryId) {
  if (!post?.slug) return post;
  const needsSummary = !post.summary && !post.description;
  const needsImage = !post.coverImage;
  if (!needsSummary && !needsImage) return post;

  const list = await fetchBlogList(categoryId || post.categoryId);
  const fromList = list.find((p) => p.slug === post.slug);
  if (!fromList) return post;

  return {
    ...post,
    summary: post.summary || fromList.summary,
    coverImage: post.coverImage || fromList.coverImage,
  };
}

function buildArticleLdJson(post, categoryName, url) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': post.title || '',
    'description': getPostDescription(post),
    'image': getPostOgImage(post),
    'datePublished': post.publishedAt || '',
    'dateModified': post.updatedAt || post.publishedAt || '',
    'author': { '@type': 'Organization', 'name': 'Wondergate' },
    'publisher': { '@type': 'Organization', 'name': 'Wondergate', 'logo': { '@type': 'ImageObject', 'url': 'https://www.wondergate.io/src/assets/images/logo_light.png' } },
    'mainEntityOfPage': { '@type': 'WebPage', '@id': url || '' },
  };
  return JSON.stringify(data);
}

/** Detect FAQ sections in blog content and build FAQPage JSON-LD */
function buildFaqLdJson(postContent) {
  if (!postContent) return null;

  // Match FAQ patterns: <h3> with question-like text, followed by <p> answer
  const faqRegex = /<h3\b[^>]*>([^<]*(?:Q:|Question|FAQ|[?]|What|How|Why|Can|Does|Is |Should|Do |Are |Will )[^<]*)<\/h3>\s*<p\b[^>]*>([^<]+)<\/p>/gi;

  const faqs = [];
  let match;
  while ((match = faqRegex.exec(postContent)) !== null && faqs.length < 10) {
    const question = stripHtml(match[1]).trim();
    const answer = stripHtml(match[2]).trim();
    if (question.length > 5 && answer.length > 10) {
      faqs.push({
        '@type': 'Question',
        'name': question,
        'acceptedAnswer': { '@type': 'Answer', 'text': answer },
      });
    }
  }

  if (faqs.length === 0) return null;

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs,
  });
}

/** Build BlogListing JSON-LD for /blog page */
function buildBlogListingLdJson(posts) {
  const items = (posts || []).slice(0, 20).map(post => ({
    '@type': 'BlogPosting',
    'headline': post.title || '',
    'description': getPostDescription(post),
    'url': `https://www.wondergate.io/blog/detail/${post.slug || ''}`,
    'datePublished': post.publishedAt || '',
    'dateModified': post.updatedAt || post.publishedAt || '',
    'author': { '@type': 'Organization', 'name': 'Wondergate' },
    'publisher': { '@type': 'Organization', 'name': 'Wondergate', 'logo': { '@type': 'ImageObject', 'url': 'https://www.wondergate.io/src/assets/images/logo_light.png' } },
  }));

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': items.map((item, i) => ({ '@type': 'ListItem', 'position': i + 1, 'item': item })),
  });
}

function buildOrgLdJson() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Wondergate',
    'url': 'https://www.wondergate.io',
    'logo': 'https://www.wondergate.io/src/assets/images/logo_light.png',
    'sameAs': [],
  });
}

function buildWebPageLdJson(title, description, url) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': title,
    'description': description,
    'url': url,
    'publisher': {
      '@type': 'Organization',
      'name': 'Wondergate',
      'url': 'https://www.wondergate.io',
    },
  });
}

function buildContactPageLdJson(url) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'Contact Wondergate — Get Started Today',
    'description': 'Get in touch with Wondergate. Start integrating global payments, virtual card issuing, and collection accounts for your business.',
    'url': url,
    'publisher': {
      '@type': 'Organization',
      'name': 'Wondergate',
      'url': 'https://www.wondergate.io',
    },
  });
}

// Start http server (0.0.0.0 so localhost / 127.0.0.1 both work)
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n[ERROR] Port ${port} is already in use.`);
    console.error(`Run: lsof -ti :${port} | xargs kill -9`);
  } else {
    console.error('[ERROR] HTTP server failed:', err);
  }
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('[FATAL] Uncaught exception — server will exit:', err);
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  console.error('[FATAL] Unhandled rejection — server will exit:', reason);
  process.exit(1);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`\n✓ Server running — DO NOT close this terminal`);
  console.log(`  http://localhost:${port}`);
  console.log(`  http://127.0.0.1:${port}`);
  console.log(`SSR data fetching: ${CMS_API_BASE}`);
  console.log('First page load may take 30-60s (Vite compile).\n');
});

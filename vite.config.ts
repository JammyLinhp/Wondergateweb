import { fileURLToPath, URL } from 'node:url';
import { SitemapStream } from 'sitemap';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { createWriteStream, existsSync, mkdirSync, writeFileSync } from 'node:fs';

const routes = [
  '/',
  '/home',
  '/security-center',
  '/about-us',
  '/contact-us',
  '/product-center/global-payments',
  '/product-center/global-collection-account',
  '/product-center/payment-solutions',
  '/product-center/issuing-virtual-cards',
  '/policy/cookies',
  '/policy/disclaimer',
  '/policy/privacy',
  '/security-center/terms-and-policies/agreement'
];

const timestamp = new Date().getTime();

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'css',
        }),
      ],
    }),
{
      name: 'preload-assets',
      transformIndexHtml(html, ctx) {
        const cssFiles = Object.keys(ctx.bundle || {}).filter(k => k.endsWith('.css'));
        const preloads = cssFiles
          .map(f => `    <link rel="preload" as="style" href="/${f}">`)
          .join('\n');
        return html.replace('</head>', `${preloads}\n  </head>`);
      },
      writeBundle(options, bundle) {
        const heroKey = Object.keys(bundle).find(k => k.startsWith('assets/img_title_payment_detail'));
        const outDir = options.dir || 'dist/client';
        import('node:fs').then(fs => {
          const indexPath = outDir + '/index.html';
          if (!fs.existsSync(indexPath)) return;
          let html = fs.readFileSync(indexPath, 'utf-8');
          
          // Preload critical chunks so they download in parallel with main JS
          const preloads = [];
          if (heroKey) {
            preloads.push('<link rel="preload" as="image" href="/' + heroKey + '" fetchpriority="high">');
          }
          // Preload language bundle (en-*.js)
          const langChunk = Object.keys(bundle).find(k => k.startsWith('assets/en-') && k.endsWith('.js'));
          if (langChunk) {
            preloads.push('<link rel="preload" as="script" href="/' + langChunk + '">');
          }
          // Preload home page chunk (largest non-main index-*.js)
          const homeChunks = Object.keys(bundle).filter(k => /^assets\/index-[A-Za-z0-9_-]+\.js$/.test(k));
          homeChunks.sort((a, b) => (bundle[b].code?.length || 0) - (bundle[a].code?.length || 0));
          const homeChunk = homeChunks.find(k => !k.includes('BclhQ') && !k.includes('BPZP'));
          if (homeChunk) {
            preloads.push('<link rel="preload" as="script" href="/' + homeChunk + '">');
          }
          // Inline tiny CSS files (< 1KB gzip) to eliminate round trips
          const tinyCss = Object.keys(bundle).filter(k => k.endsWith('.css'));
          let inlineStyles = '';
          for (const cssKey of tinyCss) {
            const chunk = bundle[cssKey];
            const source = chunk.source || (chunk.code || '').toString();
            if (source.length < 1500) {
              inlineStyles += source;
              html = html.replace('<link rel="preload" as="style" href="/' + cssKey + '">', '');
            }
          }
          if (inlineStyles) {
            html = html.replace('</head>', '<style>' + inlineStyles + '</style>\n  </head>');
          }
          html = html.replace('</head>', preloads.join('\n    ') + '\n  </head>');
          fs.writeFileSync(indexPath, html);
        });
      },

    },
    {
      name: 'generate-sitemap',
      // 在构建结束时执行
      buildEnd: async () => {
        const sitemap = new SitemapStream({
          hostname: 'https://www.wondergate.io',
        });
        // 确保 dist 目录存在
        const outDir = resolve(__dirname, 'dist');
        if (!existsSync(outDir)) {
          mkdirSync(outDir, { recursive: true });
        }
        const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'));
        sitemap.pipe(writeStream);
        // 写入路由
        routes.forEach((route) => {
          sitemap.write({
            url: route,
            changefreq: 'daily',
            priority: 0.8,
          });
        });
        sitemap.end();
        // 等待写入完成
        await new Promise((r: any) => writeStream.on('finish', r));
        
        // 生成 sitemap_index.xml
        const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.wondergate.io/sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`;
        writeFileSync(resolve(outDir, 'sitemap_index.xml'), sitemapIndexContent);
      },
    }
  ],
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: true,
    __INTLIFY_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 3500,
    emptyOutDir: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  ssr: {
    noExternal: ['pinia-plugin-persist', 'ant-design-vue', /@ant-design/, 'scroll-into-view-if-needed'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://dev-cms.wondergate.io',
        changeOrigin: true,
        // rewrite: (path) => {
        //   return path.replace(/^\/api/, '');
        // },
      },
    },
    port: 12017,
    host: '0.0.0.0', // 允许外部访问
    allowedHosts: ['wondergate.io', 'www.wondergate.io', 'localhost', '127.0.0.1'],
  },
});

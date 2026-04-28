import http from 'node:http';
import fs from 'node:fs/promises';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5172;
const base = process.env.BASE || '/';

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
        // 调整超时阈值
        timeout: 30000,
        overlay: false,
      },
    },
    appType: 'custom',
    base,
  });
}

// Create http server
const server = http.createServer(async (req, res) => {
  // 处理 Vite 开发服务器的请求
  if (!isProduction && vite) {
    const viteMiddleware = vite.middlewares;
    const next = () => {
      handleRequest(req, res);
    };
    viteMiddleware(req, res, next);
  } else {
    handleRequest(req, res);
  }
});

// 处理请求
async function handleRequest(req, res) {
  try {
    // 只处理 GET 请求
    if (req.method !== 'GET') {
      res.statusCode = 405;
      res.end('Method Not Allowed');
      return;
    }
    
    // 处理静态文件请求
    if (isProduction) {
      const sirv = (await import('sirv')).default;
      const staticHandler = sirv('./dist/client', { 
        extensions: [],
        setHeaders: (res, pathname) => {
          // 设置缓存头
          if (pathname.includes('assets/')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000');
          }
        }
      });
      
      const next = () => {
        serveHtml(req, res);
      };
      
      staticHandler(req, res, next);
    } else {
      // 开发环境，直接处理 HTML 请求
      serveHtml(req, res);
    }
  } catch (e) {
    res.statusCode = 500;
    res.end(e.stack);
  }
}

// 提供 HTML
async function serveHtml(req, res) {
  try {
    const url = req.url?.replace(base, '') || '';
    
    /** @type {string} */
    let template;
    /** @type {import('./src/entry-server.ts').render} */
    let render;
    
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.ts')).render;
    } else {
      template = templateHtml;
      render = (await import('./dist/server/entry-server.js')).render;
    }

    const rendered = await render(url);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '');

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
  } catch (e) {
    res.statusCode = 500;
    res.end(e.stack);
  }
}

// Start http server
server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

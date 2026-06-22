// Cloudflare Worker: SPA fallback + API proxy
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Proxy /api requests to CMS
    if (url.pathname.startsWith('/api')) {
      const cmsUrl = 'https://cms.wondergate.io' + url.pathname + url.search;
      return fetch(cmsUrl, {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Try static assets first, fallback to index.html for SPA
    try {
      return await env.ASSETS.fetch(request);
    } catch (e) {
      return env.ASSETS.fetch(new Request(url.origin + '/index.html', request));
    }
  }
}

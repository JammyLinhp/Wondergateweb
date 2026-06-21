// Cloudflare Worker: SPA fallback — serve index.html for all routes
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // Try to serve static assets first
    try {
      return await env.ASSETS.fetch(request);
    } catch (e) {
      // Asset not found — serve index.html for SPA routing
      return env.ASSETS.fetch(new Request(`${url.origin}/index.html`, request));
    }
  }
}

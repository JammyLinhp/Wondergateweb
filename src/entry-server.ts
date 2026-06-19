import { renderToString } from 'vue/server-renderer';
import { createApp } from './main';
import type { Router } from 'vue-router';

interface SSRData {
  post?: any;
  categories?: any[];
  posts?: any[];
  activeCategoryId?: string;
  slug?: string;
  categoryName?: string;
}

export async function render(_url: string, ssrContextData: SSRData = {}) {
  const { app, router } = createApp();

  // Inject SSR data into app for components to access
  app.provide('ssrData', ssrContextData);
  app.provide('isSSR', true);

  // Remove hash from URL, use path only
  let pathWithoutHash = _url.split('#')[0];

  // Handle root path normalization
  if (pathWithoutHash === '') {
    pathWithoutHash = '/';
  }

  // Set router location
  router.push(pathWithoutHash);
  await router.isReady();

  // SSR context for renderToString
  const ctx = {};

  const html = await renderToString(app, ctx);
  return { html, head: '' };
}

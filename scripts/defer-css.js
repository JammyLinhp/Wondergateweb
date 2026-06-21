// Post-build: defer render-blocking CSS + preload critical CSS
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

const distDir = 'dist/client';
const htmlPath = join(distDir, 'index.html');
const assetsDir = join(distDir, 'assets');

if (!existsSync(htmlPath)) {
  console.log('[defer-css] index.html not found, skipping');
  process.exit(0);
}

let html = readFileSync(htmlPath, 'utf-8');

// 1. Preload all CSS files to break the critical chain
if (existsSync(assetsDir)) {
  const cssFiles = readdirSync(assetsDir).filter(f => f.endsWith('.css'));
  const preloads = cssFiles
    .map(f => `<link rel="preload" as="style" href="/assets/${f}">`)
    .join('\n    ');
  
  // Insert before the first <link> or <script>
  html = html.replace('  <script type="module"', `  ${preloads}\n    <script type="module"`);
  console.log(`[defer-css] Preloaded ${cssFiles.length} CSS files`);
}

// 2. Defer non-critical CSS (keep preloaded CSS loading normally)
// Replace <link rel="stylesheet"> with media="print" deferred loading
html = html.replace(
  /<link rel="stylesheet"([^>]*)>/g,
  '<link rel="stylesheet"$1 media="print" onload="this.media=\'all\'">'
);

// Add noscript fallback
html = html.replace(
  /(<link rel="stylesheet"[^>]*media="print" onload="this\.media='all'">)/,
  '$1\n    <noscript>$&</noscript>'.replace('media="print" onload="this.media=\'all\'"', '')
);

writeFileSync(htmlPath, html);
console.log('[defer-css] CSS deferred + preloaded');

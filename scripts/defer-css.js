// Post-build: defer render-blocking CSS
import { readFileSync, writeFileSync, existsSync } from 'fs';

const htmlPath = 'dist/client/index.html';
if (!existsSync(htmlPath)) {
  console.log('[defer-css] dist/client/index.html not found, skipping');
  process.exit(0);
}

let html = readFileSync(htmlPath, 'utf-8');

// Replace <link rel="stylesheet"> with media="print" deferred loading
html = html.replace(
  /<link rel="stylesheet"([^>]*)>/g,
  '<link rel="stylesheet"$1 media="print" onload="this.media=\'all\'">'
);

// Add noscript fallback for the first stylesheet
html = html.replace(
  /(<link rel="stylesheet"[^>]*media="print" onload="this.media='all'">)/,
  '$1\n    <noscript>$&</noscript>'.replace('media="print" onload="this.media=\'all\'"', '')
);

writeFileSync(htmlPath, html);
console.log('[defer-css] CSS deferred successfully');

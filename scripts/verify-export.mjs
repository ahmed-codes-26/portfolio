import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

// Catch missing tracked route sources before publishing a broken static export.
const root = resolve('out');
const home = await readFile(resolve(root, 'index.html'), 'utf8');
const routes = [...new Set([...home.matchAll(/href="(\/work\/[^"?#]+)"/g)].map(match => match[1]))];
assert(routes.length > 0, 'The home page must link to exported project pages.');
for (const route of routes) {
  const file = resolve(root, `.${route}`, 'index.html');
  const html = await readFile(file, 'utf8');
  assert(html.includes('class="case-page"'), `Missing project content at ${route}`);
}
const cv = resolve(root, 'CV', 'Ahmed Ali.pdf');
assert((await stat(cv)).size > 0, 'The downloadable CV must be included in the export.');
assert(home.includes('href="/CV/Ahmed%20Ali.pdf"'), 'The hero must link to the exported CV.');
console.log(`Static export verified: ${routes.length} project pages and downloadable CV.`);

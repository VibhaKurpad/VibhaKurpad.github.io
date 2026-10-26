import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';
import { CRAFTS, LEVELS } from '../src/planner.js';
const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const allowed = new Set(['/index.html', '/src/app.js', '/src/planner.js', '/src/project-visuals.js', '/src/styles.css', '/src/fonts.css', '/assets/favicon.svg', '/assets/craft-table.svg']);
for (const craft of Object.keys(CRAFTS)) for (const level of Object.keys(LEVELS)) allowed.add(`/assets/progress/${craft}-${level}.webp`);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const port = Number(process.env.PORT || 4173);
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    const path = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
    const target = resolve(root, `.${path}`);
    if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return; }
    if (!allowed.has(path) || !target.startsWith(root + sep)) { response.writeHead(404); response.end('Not found'); return; }
    const body = await readFile(target);
    response.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'" });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch { response.writeHead(404); response.end('Not found'); }
});
server.on('error', error => { console.error(`Could not start preview: ${error.message}`); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`Craft Happens is ready at http://localhost:${port}`));

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { brotliCompress, gzip } from 'node:zlib';
import { promisify } from 'node:util';

const compressBrotli = promisify(brotliCompress);
const compressGzip = promisify(gzip);

const root = resolve('out');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

const compressible = new Set(['.html', '.css', '.js', '.json', '.svg', '.xml', '.txt', '.md']);

const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let path = resolve(root, '.' + pathname);
    if (path !== root && !path.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    let info;
    try {
      info = await stat(path);
      if (info.isDirectory()) path = resolve(path, 'index.html');
    } catch {
      if (!extname(path)) {
        path = resolve(path + '.html');
      }
    }
    const ext = extname(path);
    let data = await readFile(path);
    const headers = {
      'Content-Type': types[ext] || 'application/octet-stream',
      'Cache-Control': pathname.startsWith('/_next/static/') ? 'public, max-age=31536000, immutable' : 'no-cache'
    };

    const acceptEncoding = req.headers['accept-encoding'] || '';
    if (compressible.has(ext)) {
      if (acceptEncoding.includes('br')) {
        headers['Content-Encoding'] = 'br';
        data = await compressBrotli(data);
      } else if (acceptEncoding.includes('gzip')) {
        headers['Content-Encoding'] = 'gzip';
        data = await compressGzip(data);
      }
    }

    headers['Content-Length'] = data.length;
    res.writeHead(200, headers);
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    try { res.end(await readFile(resolve(root, '404.html'))); } catch { res.end('Not found'); }
  }
});

const port = Number(process.env.PORT || 3000);
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));

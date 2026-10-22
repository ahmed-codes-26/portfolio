import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
const source = resolve(process.argv[2] || '../../work/photo-review');
await mkdir('public/images', { recursive: true });
const mapping = { hero: 'IMG_1410.jpg', about: '20260909_181530.jpg', creative: 'IMG_1417.jpg', pause: 'IMG_1446.jpg' };
for (const [name, file] of Object.entries(mapping)) {
  for (const width of [480, 768, 1200, 1600]) {
    await sharp(resolve(source, file)).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 83 }).toFile(`public/images/${name}-${width}.webp`);
  }
}
const portrait = await sharp(resolve(source, mapping.hero)).resize(440, 630, { fit: 'cover', position: 'north' }).toBuffer();
const text = Buffer.from(`<svg width="1200" height="630"><style>.small{font:18px sans-serif;letter-spacing:3px;fill:#a4a6ae}.big{font:bold 76px sans-serif;fill:#f3f0e9}.accent{font:italic 54px Georgia,serif;fill:#f4a261}</style><text x="65" y="100" class="small">AHMED ALI / OWN ORBIT</text><text x="60" y="235" class="big">Built</text><text x="60" y="320" class="big">off-script.</text><text x="65" y="400" class="accent">At my own pace.</text><text x="65" y="530" class="small">FULL-STACK DEVELOPER</text><text x="65" y="563" class="small">&amp; EDUCATOR</text><ellipse cx="880" cy="340" rx="390" ry="180" transform="rotate(-30 880 340)" stroke="#f4a261" fill="none" opacity=".65"/></svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#0b0d12' } }).composite([{ input: portrait, left: 760, top: 0 }, { input: text, left: 0, top: 0 }]).jpeg({ quality: 88 }).toFile('public/images/social.jpg');
console.log(`Prepared ${(await readdir('public/images')).length} optimized image assets.`);

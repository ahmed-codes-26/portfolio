'use client';
import type { ImageLoaderProps } from 'next/image';
// Generated locally by scripts/prepare-assets.mjs; no image server required.
export default function imageLoader({ src, width }: ImageLoaderProps) {
  const widths = [480, 768, 1200, 1600];
  const size = widths.find(w => w >= width) ?? 1600;
  return `${src.replace(/\.[^.]+$/, '')}-${size}.webp`;
}

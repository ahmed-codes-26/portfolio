import type { NextConfig } from 'next';
const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { loader: 'custom', loaderFile: './src/lib/image-loader.ts' },
  poweredByHeader: false,
};
export default config;

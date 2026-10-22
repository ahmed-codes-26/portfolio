import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { profile, siteUrl } from '@/lib/content';
import ScrollExperience from '@/components/ScrollExperience';
import 'lenis/dist/lenis.css';
import '@/styles/globals.scss';

const syne = localFont({ src: '../../node_modules/@fontsource-variable/syne/files/syne-latin-wght-normal.woff2', variable: '--font-syne', display: 'swap' });
const manrope = localFont({ src: '../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2', variable: '--font-manrope', display: 'swap' });
const mono = localFont({ src: '../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2', variable: '--font-mono', display: 'swap', preload: false });
const serif = localFont({ src: '../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2', variable: '--font-serif', display: 'swap', preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Ahmed Ali — Own Orbit', template: '%s — Ahmed Ali' },
  description: profile.description,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: 'Ahmed Ali — Own Orbit', title: 'Built off-script. At my own pace.', description: profile.description, url: siteUrl, images: [{ url: '/images/social.jpg', width: 1200, height: 630, alt: 'Ahmed Ali — Full-Stack Developer & Educator' }] },
  twitter: { card: 'summary_large_image', title: 'Ahmed Ali — Own Orbit', description: profile.description, images: ['/images/social.jpg'] },
};
export const viewport: Viewport = { themeColor: '#0B0D12', colorScheme: 'dark light' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning className={`${syne.variable} ${manrope.variable} ${mono.variable} ${serif.variable}`}><body suppressHydrationWarning><ScrollExperience />{children}</body></html>;
}

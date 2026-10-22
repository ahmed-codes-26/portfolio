# Own Orbit — Ahmed Ali

A personal portfolio built with Next.js App Router, TypeScript, SCSS, GSAP, Lenis, and an on-demand Three.js orbital scene. Real supplied photography anchors an editorial story about software, education, creativity, and life beyond work.

## Run

Requires Node.js 20.9 or later (Node 24 used during development).

```sh
npm ci
npm run dev
```

Production static export:

```sh
npm run typecheck
npm run lint
npm run build
npm start
```

`npm start` serves the exported `out/` directory on http://127.0.0.1:3000. `PORT` changes the local port. Deploy `out/` to a static host, or use the included Sites manifest. No runtime server, database, or account is required by the portfolio.

## Update content

### Render static hosting

Use `npm ci && npm run build` as the Build Command and `out` as the Publish Directory. Deploy the latest commit, including `src/app/work/[slug]/page.tsx` and `public/CV/Ahmed Ali.pdf`. The build now verifies that all project pages linked from the home page and the downloadable CV exist in the export.

An earlier Git ignore rule (`work/`) excluded the project route source. That rule has been removed and the route is tracked. A deployment made before that correction can show the home page while returning 404 for both projects. Redeploy the latest commit (use Render's clear-build-cache option if needed).

Keep the generated directory routes: `/work/myacademy-portal/` and `/work/konekt/` each have their own `index.html`. Do not add a catch-all rewrite to the home page. Verify both URLs directly and after a refresh once deployed.

The hero's Download CV button serves `public/CV/Ahmed Ali.pdf`. Replace that file to update the download.

- `src/lib/content.ts`: profile links, projects, skills, canonical origin.
- `src/app/page.tsx`: narrative chapters and personal copy.
- `src/styles/_tokens.scss`: palette and responsive mixins.
- `src/styles/globals.scss`: layouts, typography, interaction states, responsive adaptations.
- `src/components/Experience.tsx`: opening choreography, scroll reveals, photo parallax, and lifecycle cleanup.
- `src/components/ScrollExperience.tsx`: synchronized smooth scrolling, exact anchor alignment, history handling, and the top progress line.
- `src/components/OrbitStage.tsx` and `src/lib/orbit-scene.ts`: lazy 3D scene with SVG fallback, perspective slider, capped pixel ratio, and visibility-aware rendering.
- `public/profile.md`, `public/projects/`, and `public/llms.txt`: crawlable Markdown representations.

Set `NEXT_PUBLIC_SITE_URL` at build time for a different canonical origin. Also update absolute links in the public Markdown resources before deploying to a new domain. New Sites are private by default; private hosting prevents public search indexing regardless of SEO markup.

## Images and fonts

The supplied HEIC photos were decoded locally without changing faces. The chosen photographs are IMG_1410 (introduction), 20260909_181530 (about), IMG_1417 (creative), and IMG_1446 (quiet personal chapter). The original supplied files remain untouched. Photography retains its original presentation, including the introduction's initial saturation treatment. Only IMG_1417 receives a light CSS correction: slightly reduced saturation and a subtle cool overlay to soften its yellow cast. No shared warm grade or darkening is applied.

Each selected photo is provided as 480, 768, 1200, and 1600-pixel WebP assets. Next Image uses a custom loader for these precomputed sizes, enabling responsive optimization on static hosting. To regenerate, pass a directory containing the corresponding JPEG conversions to `node scripts/prepare-assets.mjs /absolute/path/to/photos`. The optimized assets are committed, so regeneration is unnecessary for normal builds.

Syne, Manrope, IBM Plex Mono, and Instrument Serif are self-hosted through next/font/local and installed font packages. No third-party font requests are required at runtime.

## Content boundaries

Source of truth: the four briefs and personal profile supplied by Ahmed, last updated October 21, 2026. The name Ahmed Ali is verified in the personal profile. Time-sensitive semester/CGPA details are omitted from the public page to avoid silently aging claims. Approximate teaching figures remain approximate.

Project illustrations are explicitly labeled system/concept diagrams, never represented as actual screenshots. No video samples were supplied, so the creative chapter contains honest descriptions and a personal photo with no fake play controls. The MyAcademy demo URL could not be reached during verification; repository links provide the reliable project destination. Contact links lead to the exact social profiles provided, with no simulated contact form.

## Accessibility and performance

Lenis wheel smoothing synchronized with GSAP, native touch scrolling, semantic sections, meaningful headings, visible keyboard focus, a skip-introduction link, and keyboard-operable navigation. Motion responds to system preferences and a session-level toggle. Content is statically rendered and readable without JavaScript. WebGL loads separately when its section approaches the viewport on desktop; mobile and unsupported devices keep an interactive SVG. Rendering pauses offscreen and in hidden tabs.

No Lighthouse or field Core Web Vitals score is claimed without measurement. Cross-browser testing beyond the available browser requires additional devices.

## Dependency note

The image processing dependency was upgraded to sharp 0.35.5 after auditing. The remaining npm advisory chain is confined to development lint tooling (`eslint-config-next` → `fast-glob` → `micromatch` → `braces`); the audit offers a downgrade to an older Next lint major rather than a compatible fix. These packages are not shipped in the static website. Recheck upstream updates before future development.


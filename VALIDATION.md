# Validation — October 22, 2026

- Production build: passed with Next.js 16.4.2, using `next build --webpack`. Home, both project pages, 404, robots, and sitemap exported successfully.
- TypeScript: `tsc --noEmit` passed; the final production build also passed its TypeScript check.
- ESLint: passed with no warnings or errors.
- Static export inspection: three content pages checked for local resource paths, in-page anchors, one H1 per page, canonical links, and image alternative text. No missing references found. All 16 WebP variants and discovery resources are present.
- Browser: inspected in the available Chromium-based in-app browser. Verified the hero, orbital scene, teaching composition, and MyAcademy case-study route. No console errors or warnings were reported during these interactions.
- Interaction checks: mobile chapter menu opens and closes after navigation; motion toggle updates its pressed state; the orbit slider responds to the keyboard; the project link opens its case study.
- Responsive overflow: at viewport widths 1280, 390, and 320, document scroll width matched client width after fixes. Tested the orbit slider at its maximum 90-degree value on desktop.
- Tablet refinement: verified at 768 pixels after reducing the intermediate-width headline size. The headline stayed on its intended two lines and document/client widths matched.
- Photography: supplied images were inspected; real photos are used with responsive WebP assets. Below-fold photos are lazy loaded.

## Limits

Lighthouse, field Core Web Vitals, Safari/Firefox, and physical mobile devices were not measured or tested. No numerical performance score or universal browser-compatibility claim is made. OS-level reduced-motion behavior was implemented and code-reviewed; the explicit in-site motion control was exercised in the browser.

The reference websites were inspected through text retrieval; their full interactive motion was not reproduced or audited. Project information is grounded in the supplied profile and repository references. No authentic project screenshots or video clips were supplied.

The npm audit retains a development-only lint-tool dependency advisory chain. See README for details. The affected lint packages are absent from the static deployment.

## Motion and navigation revision

- Added Lenis 1.3.27, synchronized with GSAP's animation ticker. Native touch scroll remains enabled; the motion toggle and system preference disable smoothing and expressive animations.
- Added a larger opening timeline, orbit-path drawing, chapter/title masks, image reveals and parallax, staggered content, and scroll-linked decorative rotation. All GSAP state is reverted when motion is disabled or the component unmounts.
- Applied one shared CSS photo grade and warm/violet overlays to all four portrait containers.
- Added a themed scrollbar and a fixed top progress line. The header hides during scroll and returns after 190 ms of inactivity; keyboard focus keeps controls accessible.
- Removed 95 px desktop / 25 px mobile anchor offsets. Same-page links now land flush at the section boundary, update the URL, and transfer keyboard focus. The final chapter has a viewport minimum height to support tall displays.
- Browser checks: About and Teaching desktop anchor error below 0.3 px; Creative mobile below 0.2 px. Header observed hidden in transit and visible after settling. Mobile menu closed correctly after chapter selection. Motion off removed Lenis and left all headings visible, with instant top navigation and zero progress at page start.
- No horizontal overflow at 1280, 390, and 320 px. Direct /#connect loading aligned at mobile and desktop sizes. No browser console warnings or errors observed during the checks.
- Production build, TypeScript and ESLint passed after the implementation changes. Physical touch devices and field frame-rate measurements remain outside this browser check.

## Photo refinement

At the user's request, removed the shared warm/violet grade and brightness/contrast adjustment. Restored the original hero saturation treatment and unfiltered About and quiet-moment photos. The looking-down portrait alone uses saturation 0.92 and a 7% cool color overlay to lightly soften yellow. Image files, layout, cropping, and animations were preserved. Production build passed; browser computed styles confirmed the correction is scoped to the intended portrait.

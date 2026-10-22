'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollExperience() {
  const progress = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | undefined;
    const tick = (time: number) => lenis?.raf(time * 1000);
    const update = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      if (progress.current) progress.current.style.transform = `scaleX(${ratio})`;
    };
    const sync = () => {
      lenis?.destroy();
      lenis = undefined;
      const enabled = !media.matches && sessionStorage.getItem('orbit-motion') !== 'off';
      document.documentElement.dataset.motion = enabled ? 'on' : 'off';
      if (enabled) {
        lenis = new Lenis({ lerp: 0.11, smoothWheel: true, syncTouch: false });
        lenis.on('scroll', ScrollTrigger.update);
      }
      update();
    };
    const targetFromHash = (hash: string) => {
      try { return document.getElementById(decodeURIComponent(hash.slice(1))); } catch { return null; }
    };
    const align = (target: HTMLElement, animate: boolean, focus = false) => {
      const complete = () => {
        if (!focus) return;
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      };
      if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.2, immediate: !animate, onComplete: complete });
      else { window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY, behavior: 'instant' }); complete(); }
    };
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.target || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
      const target = targetFromHash(url.hash);
      if (!target) return;
      event.preventDefault();
      history.pushState(null, '', url.hash);
      align(target, true, true);
    };
    const onHistory = () => { const target = targetFromHash(location.hash); if (target) align(target, false); };
    sync();
    gsap.ticker.add(tick);
    let resizeRaf: number | undefined;
    const resize = new ResizeObserver(() => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        lenis?.resize();
        update();
      });
    });
    resize.observe(document.body);
    document.addEventListener('click', onClick);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('hashchange', onHistory);
    window.addEventListener('popstate', onHistory);
    window.addEventListener('orbit-motion-change', sync);
    media.addEventListener('change', sync);
    const frame = requestAnimationFrame(onHistory);
    return () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      cancelAnimationFrame(frame); resize.disconnect(); gsap.ticker.remove(tick); lenis?.destroy();
      document.removeEventListener('click', onClick);
      window.removeEventListener('scroll', update);
      window.removeEventListener('hashchange', onHistory);
      window.removeEventListener('popstate', onHistory);
      window.removeEventListener('orbit-motion-change', sync);
      media.removeEventListener('change', sync);
    };
  }, [pathname]);
  return <div className="reading-progress" aria-hidden="true"><div ref={progress} /></div>;
}

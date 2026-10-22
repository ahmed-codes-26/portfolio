'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Experience() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let context: gsap.Context | undefined;
    let idleId: number | undefined;
    const setup = () => {
      context?.revert();
      if (media.matches || sessionStorage.getItem('orbit-motion') === 'off') return;
      context = gsap.context(() => {
        const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
        intro.from('.hero-line', { yPercent: 110, rotation: 5, opacity: 0, clipPath: 'inset(0 0 100% 0)', duration: 1.45, stagger: 0.16, clearProps: 'all' }, 0)
          .from('.hero-portrait', { y: 110, rotation: -9, scale: 0.82, opacity: 0, duration: 1.7, clearProps: 'all' }, 0.15)
          .from('.portrait-frame', { clipPath: 'inset(100% 0 0 0)', duration: 1.5, clearProps: 'clipPath' }, 0.2)
          .from('.hero-serif', { x: -55, opacity: 0, duration: 1.15, clearProps: 'all' }, 0.55)
          .from('.hero-topline, .hero-kicker, .hero-intro, .hero-copy .pill-link, .hero-bottom', { y: 25, opacity: 0, stagger: 0.1, duration: 0.9, clearProps: 'all' }, 0.65);
        const orbit = document.querySelector<SVGPathElement>('.hero-orbit path');
        if (orbit) {
          const length = orbit.getTotalLength();
          intro.fromTo(orbit, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut', clearProps: 'all' }, 0.25);
        }
        gsap.to('.hero-orbit', { y: 140, rotation: -12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

        const setupScrollTriggers = () => {
          context?.add(() => {
            document.querySelectorAll<HTMLElement>('h2[data-reveal]').forEach(el => {
              gsap.from(el, { y: 80, clipPath: 'inset(0 0 100% 0)', opacity: 0, duration: 1.25, ease: 'power4.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
            });
            document.querySelectorAll<HTMLElement>('.about-photo, .creative-still, .between-photo').forEach(el => {
              gsap.from(el, { y: 90, rotation: -5, opacity: 0, clipPath: 'inset(15% 0 85% 0)', duration: 1.4, ease: 'power3.inOut', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
            });
            document.querySelectorAll<HTMLElement>('.portrait-frame, .about-photo, .creative-still, .between-media').forEach(el => {
              gsap.fromTo(el.querySelector('img'), { scale: 1.14, yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
            });
            document.querySelectorAll<HTMLElement>('.project').forEach(el => {
              gsap.from(el.querySelector('.project-art-link'), { clipPath: 'inset(0 100% 0 0)', y: 45, duration: 1.3, ease: 'power3.inOut', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
              gsap.from(el.querySelectorAll('.project-copy > *'), { y: 40, opacity: 0, stagger: 0.09, duration: 0.85, clearProps: 'all', scrollTrigger: { trigger: el.querySelector('.project-copy'), start: 'top 92%', once: true } });
            });
            document.querySelectorAll<HTMLElement>('.chapter-label, .teaching-stats, .creative-notes, .archive, .capabilities, .socials').forEach(el => {
              gsap.from(el.children, { y: 35, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
            });
            gsap.fromTo('.teaching-asterisk', { rotation: -50, scale: 0.6 }, { rotation: 90, scale: 1.1, ease: 'none', scrollTrigger: { trigger: '.teaching', start: 'top bottom', end: 'bottom top', scrub: true } });
            gsap.to('.closing-orbit', { xPercent: -15, rotation: 15, ease: 'none', scrollTrigger: { trigger: '.connect', start: 'top bottom', end: 'bottom bottom', scrub: true } });
            ScrollTrigger.refresh();
          });
        };

        const win = window as unknown as {
          requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
          cancelIdleCallback?: (id: number) => void;
        };
        if (typeof win.requestIdleCallback === 'function') {
          idleId = win.requestIdleCallback(setupScrollTriggers, { timeout: 1200 });
        } else {
          idleId = setTimeout(setupScrollTriggers, 80) as unknown as number;
        }
      });
    };
    setup();
    window.addEventListener('orbit-motion-change', setup);
    media.addEventListener('change', setup);
    return () => {
      if (idleId) {
        const win = window as unknown as { cancelIdleCallback?: (id: number) => void };
        if (typeof win.cancelIdleCallback === 'function') {
          win.cancelIdleCallback(idleId);
        } else {
          clearTimeout(idleId);
        }
      }
      context?.revert();
      window.removeEventListener('orbit-motion-change', setup);
      media.removeEventListener('change', setup);
    };
  }, []);
  return null;
}

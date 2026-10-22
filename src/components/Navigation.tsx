'use client';
import { useEffect, useState } from 'react';
import { chapters } from '@/lib/content';
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('beginning');
  const [motion, setMotion] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let idle: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setHidden(window.scrollY > 40 && !open);
      clearTimeout(idle);
      idle = setTimeout(() => setHidden(false), 190);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { clearTimeout(idle); window.removeEventListener('scroll', onScroll); };
  }, [open]);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => { const value = !media.matches && sessionStorage.getItem('orbit-motion') !== 'off'; setMotion(value); document.documentElement.dataset.motion = value ? 'on' : 'off'; };
    sync(); media.addEventListener('change', sync);
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: '-15% 0px -60% 0px' });
    chapters.forEach(c => { const el = document.getElementById(c.id); if (el) observer.observe(el); });
    return () => { observer.disconnect(); media.removeEventListener('change', sync); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); document.getElementById('menu-toggle')?.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  function toggleMotion() {
    const next = !motion; setMotion(next);
    sessionStorage.setItem('orbit-motion', next ? 'on' : 'off');
    document.documentElement.dataset.motion = next ? 'on' : 'off';
    window.dispatchEvent(new Event('orbit-motion-change'));
  }
  return <>
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${hidden && !open ? 'is-hidden' : ''}`} onFocus={() => setHidden(false)}><a className="header-index" href="#beginning" aria-label="Back to the beginning"><span className="status-dot"/> PERSONAL PORTFOLIO <span className="header-year">/ 2026</span></a><nav className="desktop-nav" aria-label="Primary"><a href="#about">About</a><a href="#work">Selected work</a><a href="#teaching">Teaching</a><a href="#connect">Let’s connect <span aria-hidden="true">↗</span></a></nav><button id="menu-toggle" className="menu-toggle" aria-expanded={open} aria-controls="chapter-menu" onClick={() => setOpen(!open)}>{open ? 'Close −' : 'Menu +'}</button></header>
    <nav className={`chapter-menu ${open ? 'is-open' : ''}`} id="chapter-menu" aria-label="Chapters" inert={!open}>{chapters.map(c => <a key={c.id} href={`#${c.id}`} onClick={() => setOpen(false)}><span>{c.index}</span>{c.label}<span aria-hidden="true">↗</span></a>)}</nav>
    <nav className="chapter-rail" aria-label="Story progress">{chapters.map(c => <a key={c.id} href={`#${c.id}`} aria-label={c.label} aria-current={active === c.id ? 'location' : undefined}><span>{c.label}</span></a>)}</nav>
    <button className="motion-toggle" onClick={toggleMotion} aria-pressed={motion} aria-label={`Animations ${motion ? 'on' : 'off'}. Toggle animations.`}><span aria-hidden="true">{motion ? 'Ⅱ' : '▷'}</span> MOTION {motion ? 'ON' : 'OFF'}</button>
  </>;
}

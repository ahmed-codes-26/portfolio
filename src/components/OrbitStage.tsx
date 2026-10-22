'use client';
import { useEffect, useRef, useState } from 'react';
export default function OrbitStage() {
  const host = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState(35);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let cleanup: (() => void) | undefined;
    let disposed = false;
    let loading = false;
    const observer = new IntersectionObserver(async entries => {
      if (!entries[0].isIntersecting || loading || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 700 || document.documentElement.dataset.motion === 'off') return;
      loading = true;
      try {
        const { mountOrbit } = await import('@/lib/orbit-scene');
        if (disposed) return;
        cleanup = mountOrbit(el);
        setReady(true);
      } catch { /* Static, interactive SVG remains available without WebGL. */ }
    }, { rootMargin: '150px' });
    observer.observe(el);
    return () => { disposed = true; observer.disconnect(); cleanup?.(); };
  }, []);
  return <div className="orbit-experiment">
    <div className="orbit-stage" ref={host} data-tilt={tilt}>
      <svg className={`orbit-fallback ${ready ? 'enhanced' : ''}`} style={{ transform: `rotate(${(tilt - 35) / 2}deg)` }} viewBox="0 0 600 500" fill="none" aria-hidden="true">
        <defs><radialGradient id="orbit-aura"><stop stopColor="#F4A261" stopOpacity=".13"/><stop offset="1" stopColor="#F4A261" stopOpacity="0"/></radialGradient><linearGradient id="orbit-color"><stop stopColor="#8B79E6"/><stop offset=".5" stopColor="#F4A261"/><stop offset="1" stopColor="#F3F0E9"/></linearGradient></defs>
        <circle cx="300" cy="250" r="240" fill="url(#orbit-aura)"/>
        {Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx="300" cy="250" rx={210 - i * 3} ry={75 + i * 5} transform={`rotate(${-28 + i * 4} 300 250)`} stroke="url(#orbit-color)" strokeWidth={i === 4 ? 2 : .7} opacity={1 - i * .07}/>) }
        <circle cx="300" cy="250" r="4" fill="#F3F0E9"/><path d="M280 250H320M300 230V270" stroke="#F3F0E9" opacity=".3"/>
      </svg>
    </div>
    <div className="orbit-controls"><label htmlFor="orbit-tilt"><span className="eyebrow">CHANGE YOUR PERSPECTIVE</span><span>{String(tilt).padStart(2, '0')}°</span></label><input id="orbit-tilt" type="range" min="0" max="90" value={tilt} onChange={e => setTilt(Number(e.target.value))} aria-label="Orbit perspective" /><span className="orbit-help">SAME SYSTEM. YOUR OWN ANGLE.</span></div>
  </div>;
}

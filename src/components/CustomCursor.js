'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PREMIUM_EASE = '0.23, 1, 0.32, 1';
const HOVER_SELECTOR = 'a, button, .service-item, .project-card';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (prefersReducedMotion || isTouchDevice) return;

    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor) return;

    const position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: position.x, y: position.y };
    const state = { scale: 1 };

    // ✅ pointerEvents none add kiya — cursor apne events intercept na kare
    gsap.set(cursor, { xPercent: -50, yPercent: -50, pointerEvents: 'none' });
    gsap.to(cursor, { opacity: 1, duration: 0.45, delay: 0.25 });

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    const tick = () => {
      position.x += (target.x - position.x) * 0.18;
      position.y += (target.y - position.y) * 0.18;
      gsap.set(cursor, { x: position.x, y: position.y, scale: state.scale });
    };
    gsap.ticker.add(tick);

    const setScale = (scale) =>
      gsap.to(state, { scale, duration: 0.48, ease: `cubic-bezier(${PREMIUM_EASE})` });

    // ✅ Event delegation — document pe ek listener
    // Pehle wala querySelectorAll sirf mount pe chalta tha,
    // work page ke dynamically rendered cards miss ho jaate the
    const onMouseOver = (e) => {
      if (cursor.contains(e.target)) return; // cursor ke apne events ignore karo

      const cardEl = e.target.closest('[data-cursor-label]');
      if (cardEl) {
        if (label) label.textContent = cardEl.dataset.cursorLabel || 'View';
        gsap.to(state, { scale: 5.1, duration: 0.5 });
        gsap.to(label, { autoAlpha: 1, scale: 1, duration: 0.35 });
        return;
      }

      if (e.target.closest(HOVER_SELECTOR)) setScale(3.8);
    };

    const onMouseOut = (e) => {
      if (cursor.contains(e.target)) return;

      const cardEl = e.target.closest('[data-cursor-label]');
      if (cardEl && !cardEl.contains(e.relatedTarget)) {
        gsap.to(state, { scale: 1, duration: 0.5 });
        gsap.to(label, { autoAlpha: 0, scale: 0.85, duration: 0.25 });
        return;
      }

      const hoverEl = e.target.closest(HOVER_SELECTOR);
      if (hoverEl && !hoverEl.contains(e.relatedTarget)) setScale(1);
    };

    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      gsap.ticker.remove(tick);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <div id="custom-cursor" ref={cursorRef}>
      <span className="cursor-label" ref={labelRef} />
    </div>
  );
}
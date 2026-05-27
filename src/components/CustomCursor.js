'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PREMIUM_EASE = '0.23, 1, 0.32, 1';

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

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
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

    const setScale = (scale) => gsap.to(state, { scale, duration: 0.48, ease: `cubic-bezier(${PREMIUM_EASE})` });

    const hoverEls = document.querySelectorAll('a, button, .service-item, .project-card');
    const hoverHandlers = [];
    hoverEls.forEach((el) => {
      const enter = () => setScale(3.8);
      const leave = () => setScale(1);
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
      hoverHandlers.push({ el, enter, leave });
    });

    const cards = document.querySelectorAll('[data-cursor-label]');
    const cardHandlers = [];
    cards.forEach((card) => {
      const enter = () => {
        if (label) label.textContent = card.dataset.cursorLabel || 'View';
        gsap.to(state, { scale: 5.1, duration: 0.5 });
        gsap.to(label, { autoAlpha: 1, scale: 1, duration: 0.35 });
      };
      const leave = () => {
        gsap.to(state, { scale: 1, duration: 0.5 });
        gsap.to(label, { autoAlpha: 0, scale: 0.85, duration: 0.25 });
      };
      card.addEventListener('mouseenter', enter);
      card.addEventListener('mouseleave', leave);
      cardHandlers.push({ card, enter, leave });
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      gsap.ticker.remove(tick);
      hoverHandlers.forEach(({ el, enter, leave }) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
      cardHandlers.forEach(({ card, enter, leave }) => {
        card.removeEventListener('mouseenter', enter);
        card.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return (
    <div id="custom-cursor" ref={cursorRef}>
      <span className="cursor-label" ref={labelRef} />
    </div>
  );
}

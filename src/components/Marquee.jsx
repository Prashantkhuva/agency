"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Marquee({ items, duration = 30 }) {
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const anim = gsap.to(el, {
      xPercent: -50,
      repeat: -1,
      duration,
      ease: "none",
    });

    return () => {
      anim.kill();
    };
  }, [duration]);

  const doubled = [...items, ...items];

  return (
    <section className="py-[var(--stack-lg)] overflow-hidden">
      <div className="marquee">
        <div
          className="flex items-center gap-24 whitespace-nowrap marquee-content"
          ref={contentRef}
        >
          {doubled.map((item, i) =>
            item.type === "mark" ? (
              <span key={i} className="marquee-mark">/</span>
            ) : (
              <span key={i} className="marquee-word">{item.text}</span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
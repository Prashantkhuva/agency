'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

const EASE = 'premiumEase';

export default function GSAPAnimations({ heroSelector = 'main section:first-child' }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    gsap.registerPlugin(ScrollTrigger, CustomEase);
    CustomEase.create(EASE, '0.23, 1, 0.32, 1');
    gsap.defaults({ ease: EASE, duration: 1.15 });

    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-up').forEach((el) => {
        el.style.opacity = 1;
      });
      return;
    }

    // ─── Hero Intro ────────────────────────────────────────
    const hero = document.querySelector(heroSelector);
    if (hero) {
      const heroTitle = hero.querySelector('.hero-title');
      if (heroTitle) {
        gsap.fromTo(heroTitle, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 1.15, delay: 0.08 });
      }
      gsap.fromTo(
        hero.querySelectorAll('p, .group, .service-tag-group'),
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08, delay: 0.55 }
      );

      const revealTrigger = hero.querySelector('.reveal-trigger');
      if (revealTrigger) {
        gsap.to(revealTrigger, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.1,
          },
        });
      }
    }

    // ─── Scroll Reveals ────────────────────────────────────
    document.querySelectorAll('.reveal-up').forEach((element, index) => {
      const firstSection = element.closest('main section:first-child');
      if (firstSection) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 84%',
          once: true,
        },
        defaults: { ease: EASE },
      });

      tl.fromTo(element, { autoAlpha: 0, y: 54 }, {
        autoAlpha: 1, y: 0, duration: 1.05,
        delay: Math.min(index * 0.025, 0.14),
      });

      const media = element.querySelectorAll('img');
      if (media.length) {
        tl.fromTo(media,
          { scale: 1.08, y: 36, autoAlpha: 0.88 },
          { scale: 1, y: 0, autoAlpha: 1, duration: 1.25, stagger: 0.07 },
          '-=0.95'
        );
      }

      const texts = [...element.querySelectorAll('span, p, a, button, h2, h3')];
      if (texts.length) {
        tl.fromTo(texts,
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.035 },
          '-=0.85'
        );
      }
    });

    // ─── Parallax ──────────────────────────────────────────
    const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (!isTouchDevice) {
      document.querySelectorAll('.project-card img, .work-card img').forEach((img) => {
        img.classList.add('motion-media');
        gsap.to(img, {
          yPercent: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8,
          },
        });
      });
    }

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [heroSelector]);

  return null;
}

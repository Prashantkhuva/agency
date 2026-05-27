'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import GSAPAnimations from '@/components/GSAPAnimations';

const EASE = 'premiumEase';

const projects = [
  {
    id: 1,
    category: 'campaign',
    title: 'Chai, Camera, Conversion',
    meta: 'Campaign System / D2C Food',
    desc: 'A scroll-native campaign system built around rituals, product truth, and creator-led repetition.',
    img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=85&w=1600',
    alt: 'Campaign planning table with creative team',
    label: '01 / Campaign',
    size: 'large',
  },
  {
    id: 2,
    category: 'founder',
    title: 'Face First Brand Building',
    meta: 'Founder Content / Personal Brand',
    desc: 'A content language for a founder who needed presence without performance-theatre.',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=85&w=1400',
    alt: 'Founder content planning with laptops',
    label: '02 / Founder',
    size: 'normal',
  },
  {
    id: 3,
    category: 'identity',
    title: 'The Everyday Drop',
    meta: 'Identity / Street Retail',
    desc: 'A retail identity system designed to feel local, repeatable, and instantly recognizable.',
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=85&w=1400',
    alt: 'Fashion campaign street portrait',
    label: '03 / Identity',
    size: 'normal',
  },
  {
    id: 4,
    category: 'content',
    title: 'Reels With a Spine',
    meta: 'Content Engine / Creator Studio',
    desc: 'A repeatable reel format system that protected taste while increasing output.',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=85&w=1600',
    alt: 'Creators collaborating around laptops',
    label: '04 / Content',
    size: 'wide',
  },
];

const filters = [
  { value: 'all', label: 'All' },
  { value: 'campaign', label: 'Campaigns' },
  { value: 'identity', label: 'Identity' },
  { value: 'founder', label: 'Founder' },
  { value: 'content', label: 'Content' },
];

function sizeClass(size) {
  if (size === 'large') return 'project-card work-card work-card-large reveal-up';
  if (size === 'wide') return 'project-card work-card work-card-wide reveal-up';
  return 'project-card work-card reveal-up';
}

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [modal, setModal] = useState(null);
  const modalRef = useRef(null);
  const cardRefs = useRef({});

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, CustomEase);
    CustomEase.create(EASE, '0.23, 1, 0.32, 1');
  }, []);

  // Filter animation
  useEffect(() => {
    projects.forEach((project) => {
      const card = cardRefs.current[project.id];
      if (!card) return;
      const visible = activeFilter === 'all' || project.category === activeFilter;
      gsap.to(card, {
        autoAlpha: visible ? 1 : 0.18,
        scale: visible ? 1 : 0.985,
        duration: 0.45,
        ease: EASE,
      });
      card.style.pointerEvents = visible ? 'auto' : 'none';
    });
  }, [activeFilter]);

  const openModal = (project) => {
    setModal(project);
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const el = modalRef.current;
      if (el) {
        el.classList.add('is-open');
        gsap.fromTo(
          [
            el.querySelector('.project-modal-img'),
            el.querySelector('.project-modal-meta'),
            el.querySelector('.project-modal-title'),
            el.querySelector('.project-modal-desc'),
          ],
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.06 }
        );
      }
    }, 10);
  };

  const closeModal = () => {
    const el = modalRef.current;
    if (el) {
      gsap.to(el, {
        autoAlpha: 0,
        y: 18,
        duration: 0.35,
        onComplete: () => {
          el.classList.remove('is-open');
          el.removeAttribute('style');
          setModal(null);
          document.body.style.overflow = '';
        },
      });
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && modal) closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal]);

  return (
    <>
      <GSAPAnimations />
      <main>
        {/* ── Page Hero ─────────────────────────────────────────── */}
        <section className="page-hero px-4 sm:px-6 md:px-[var(--margin-edge)] pt-24 md:pt-40 pb-16 md:pb-[var(--section-gap)]">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent-bronze mb-6 md:mb-[var(--stack-lg)] block reveal-up">
            Selected Work
          </span>
          <h1 className="font-grotesk tracking-tighter leading-[0.9] max-w-6xl reveal-up font-extrabold
                         text-[clamp(2.75rem,9vw,7.5rem)]">
            Campaigns with memory.
          </h1>

          {/* Filter buttons */}
          <div className="mt-6 md:mt-[var(--stack-lg)] flex flex-wrap gap-2 md:gap-[var(--stack-sm)] reveal-up">
            {filters.map((f) => (
              <button
                key={f.value}
                className={`filter-button${activeFilter === f.value ? ' is-active' : ''}`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </section>

        {/* ── Work Grid ─────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 md:px-[var(--margin-edge)] pb-16 md:pb-[var(--section-gap)]">
          <div className="work-grid">
            {projects.map((project) => (
              <article
                key={project.id}
                className={sizeClass(project.size)}
                data-category={project.category}
                ref={(el) => (cardRefs.current[project.id] = el)}
              >
                <button
                  className="project-preview-trigger"
                  type="button"
                  onClick={() => openModal(project)}
                >
                  <Image
                    alt={project.alt}
                    src={project.img}
                    width={1600}
                    height={project.size === 'wide' ? 900 : 2000}
                    unoptimized
                  />
                  <span>{project.label}</span>
                  <h2>{project.title}</h2>
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* ── Project Modal ─────────────────────────────────────────── */}
      {modal && (
        <div
          className="project-modal"
          ref={modalRef}
          aria-hidden={!modal}
          onClick={(e) => {
            if (e.target === modalRef.current) closeModal();
          }}
        >
          <button
            className="project-modal-close"
            type="button"
            onClick={closeModal}
          >
            Close
          </button>
          <Image
            src={modal.img}
            alt={modal.title}
            className="project-modal-img"
            width={1600}
            height={2000}
            unoptimized
          />
          <div className="project-modal-copy">
            <span className="project-modal-meta font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent-bronze">
              {modal.meta}
            </span>
            <h2 className="project-modal-title">{modal.title}</h2>
            <p className="project-modal-desc">{modal.desc}</p>
          </div>
        </div>
      )}
    </>
  );
}
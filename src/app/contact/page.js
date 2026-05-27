'use client';

import { useState, useRef } from 'react';
import Script from 'next/script';
import { gsap } from 'gsap';
import GSAPAnimations from '@/components/GSAPAnimations';

const facts = [
  { label: 'Availability', value: 'Selective projects / 2026' },
  { label: 'Location', value: 'Gurgaon, India / Worldwide' },
  { label: 'Best for', value: 'Brand systems, campaigns, founder content.' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', brief: '' });
  const [btnText, setBtnText] = useState('Send Inquiry');
  const btnRef = useRef(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, brief } = formData;
    if (!name || !email || !brief) {
      alert('Please fill in all fields before sending your inquiry.');
      return;
    }

    const body = `Hi Let'em Know,\n\nMy name is ${name} (${email}).\n\nHere is what we are building:\n${brief}\n\nWarm regards,\n${name}`;
    const mailtoUrl = `mailto:hello@letemknow.agency?subject=${encodeURIComponent('Inquiry from ' + name)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    const btn = btnRef.current;
    setBtnText('Drafting Email...');
    gsap.to(btn, {
      backgroundColor: '#a66a3f',
      duration: 0.35,
      onComplete: () => {
        setTimeout(() => {
          setBtnText('Sent!');
          gsap.to(btn, {
            backgroundColor: '#2e7d32',
            duration: 0.35,
            onComplete: () => {
              setTimeout(() => {
                setBtnText('Send Inquiry');
                gsap.to(btn, { backgroundColor: '#111111', duration: 0.35 });
                setFormData({ name: '', email: '', brief: '' });
              }, 3000);
            },
          });
        }, 1200);
      },
    });
  };

  const openCalendly = () => {
    if (typeof window !== 'undefined' && window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/work-prashantkhuva/30min',
      });
    }
  };

  return (
    <>
      {/* ── Calendly assets — load once, lazily ───────────────── */}
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />

      <GSAPAnimations />
      <main>
        {/* ── Contact Hero ──────────────────────────────────────── */}
        <section className="contact-hero min-h-screen px-4 sm:px-6 md:px-[var(--margin-edge)] pt-24 md:pt-40 pb-16 md:pb-[var(--section-gap)] grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-[var(--gutter-grid)] items-center">

          {/* Left — heading + email + calendly */}
          <div className="md:col-span-7 reveal-up">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent-bronze mb-6 md:mb-[var(--stack-lg)] block">
              Contact
            </span>
            <h1 className="font-grotesk tracking-tighter leading-[0.9] font-extrabold
                           text-[clamp(2.75rem,9vw,7.5rem)]">
              Bring the brief.
            </h1>

            {/* Email */}
            <a
              href="mailto:hello@letemknow.agency"
              className="mt-6 md:mt-[var(--stack-lg)] inline-block font-garamond italic text-text-ink hover:text-accent-bronze transition-all break-all
                         text-[clamp(1.25rem,3vw,2.25rem)]"
            >
              hello@letemknow.agency
            </a>

            {/* Calendly CTA */}
            <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={openCalendly}
                className="nav-cta inline-flex items-center gap-2 w-fit"
              >
                <span className="material-symbols-outlined text-base leading-none">
                  calendar_month
                </span>
                Book a 30-min Call
              </button>
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                Free · No commitment
              </span>
            </div>
          </div>

          {/* Right — facts */}
          <div className="md:col-span-4 md:col-start-9 reveal-up">
            <div className="contact-facts">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <span>{fact.label}</span>
                  <p>{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Inquiry Form ──────────────────────────────────────── */}
        <section className="px-4 sm:px-6 md:px-[var(--margin-edge)] pb-16 md:pb-[var(--section-gap)]">
          <form className="inquiry-form reveal-up" onSubmit={handleSubmit}>
            <label>
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
            </label>
            <label>
              <span>What are we building?</span>
              <textarea
                name="brief"
                rows={4}
                value={formData.brief}
                onChange={handleChange}
                placeholder="Tell us about your project…"
              />
            </label>
            <div className="flex flex-wrap items-center gap-4">
              <button
                ref={btnRef}
                type="submit"
                className="nav-cta inline-flex w-fit"
              >
                {btnText}
              </button>
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                or{' '}
                <button
                  type="button"
                  onClick={openCalendly}
                  className="underline underline-offset-2 hover:text-accent-bronze transition-colors"
                >
                  schedule a call instead
                </button>
              </span>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
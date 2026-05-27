import Link from 'next/link';
import GSAPAnimations from '@/components/GSAPAnimations';

export const metadata = {
  title: "About | Let'em Know®",
  description:
    "Founder-led. Taste-led. System-led. We work where strategy meets taste — positioning, identity, campaigns, content systems, and founder presence.",
};

const processSteps = [
  { number: '01', label: 'Find the truth' },
  { number: '02', label: 'Build the system' },
  { number: '03', label: 'Make it travel' },
];

const pillars = [
  { title: 'Philosophy', body: 'Taste before templates. Clarity before volume.' },
  { title: 'Systems', body: 'Brand language, formats, launch rhythm, content structure.' },
  { title: 'Culture', body: 'Internet-native, India-aware, globally legible.' },
];

const clients = [
  'D2C Brands',
  'Founder-led Companies',
  'Creator Studios',
  'Hospitality Concepts',
  'Cultural Products',
];

export default function AboutPage() {
  return (
    <>
      <GSAPAnimations />
      <main>
        {/* ── Page Hero ─────────────────────────────────────────── */}
        <section className="page-hero px-4 sm:px-6 md:px-[var(--margin-edge)] pt-24 md:pt-40 pb-16 md:pb-[var(--section-gap)]">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent-bronze mb-6 md:mb-[var(--stack-lg)] block reveal-up">
            About
          </span>
          <h1 className="font-grotesk tracking-tighter leading-[0.9] max-w-6xl reveal-up font-extrabold
                         text-[clamp(2.75rem,9vw,7.5rem)]">
            Founder-led. Taste-led. System-led.
          </h1>
        </section>

        {/* ── Culture is the Brief ──────────────────────────────── */}
        <section className="px-4 sm:px-6 md:px-[var(--margin-edge)] pb-16 md:pb-[var(--section-gap)] grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-[var(--gutter-grid)]">
          <div className="md:col-span-5 reveal-up">
            <h2 className="font-grotesk leading-[0.9] font-bold tracking-tighter
                           text-[clamp(2rem,5vw,3.5rem)]">
              Culture is the brief.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 reveal-up font-grotesk text-base md:text-lg text-text-muted">
            <p>
              We work where strategy meets taste: positioning, identity, campaigns, content systems,
              and founder presence. No borrowed language. No decorative thinking.
            </p>
          </div>
        </section>

        {/* ── Process ───────────────────────────────────────────── */}
        <section className="our-code px-4 sm:px-6 md:px-[var(--margin-edge)] pb-16 md:pb-[var(--section-gap)]">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent-bronze mb-6 md:mb-[var(--stack-lg)] block">
            Process
          </span>
          {processSteps.map((step) => (
            <div key={step.number} className="code-line reveal-up">
              <span>{step.label}</span>
              <small>{step.number}</small>
            </div>
          ))}
        </section>

        {/* ── Pillars ───────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 md:px-[var(--margin-edge)] pb-16 md:pb-[var(--section-gap)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-[var(--gutter-grid)]">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="quiet-column reveal-up">
              <span>{pillar.title}</span>
              <p>{pillar.body}</p>
            </div>
          ))}
        </section>

        {/* ── Selected Clients ──────────────────────────────────── */}
        <section className="px-4 sm:px-6 md:px-[var(--margin-edge)] pb-16 md:pb-[var(--section-gap)]">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent-bronze mb-6 md:mb-[var(--stack-lg)] block reveal-up">
            Selected Clients
          </span>
          <div className="client-list reveal-up">
            {clients.map((client) => (
              <span key={client}>{client}</span>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
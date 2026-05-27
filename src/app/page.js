import Link from 'next/link';
import Image from 'next/image';
import Marquee from '@/components/Marquee';
import GSAPAnimations from '@/components/GSAPAnimations';

export const metadata = {
  title: "Let'em Know® | Founder-led Creative Agency",
  description:
    'Strategy, identity, campaigns, and founder-led content from a creative studio that understands the feed and the room.',
};

const marqueeItems = [
  { type: 'word', text: "Let'em Know" },
  { type: 'mark' },
  { type: 'word', text: 'Strategy With Taste' },
  { type: 'mark' },
  { type: 'word', text: 'Media That Converts' },
  { type: 'mark' },
  { type: 'word', text: "Let'em Know" },
  { type: 'mark' },
  { type: 'word', text: 'Strategy With Taste' },
];

const projects = [
  {
    tag: 'Campaign System',
    title: 'Chai, Camera, Conversion',
    img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=85&w=1400',
    alt: 'Campaign team reviewing creator content and brand visuals',
    span: 'md:col-span-7',
    offset: '',
  },
  {
    tag: 'Founder Content',
    title: 'Face First Brand Building',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=85&w=1200',
    alt: 'Founder content studio with laptops and campaign notes',
    span: 'md:col-span-5',
    offset: 'md:mt-32',
  },
  {
    tag: 'Brand Identity',
    title: 'Positioning That Sticks',
    img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=85&w=1200',
    alt: 'Brand identity design and strategy session',
    span: 'md:col-span-5',
    offset: '',
  },
  {
    tag: 'Social Strategy',
    title: 'The Algorithm Doesn\'t Lie',
    img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=85&w=1400',
    alt: 'Social media strategy and content planning',
    span: 'md:col-span-7',
    offset: 'md:mt-24',
  },
];

const services = [
  { num: '01', title: 'Brand Strategy', desc: 'Positioning, messaging, and the story only your brand can tell.' },
  { num: '02', title: 'Founder Content', desc: 'Face-first content that builds trust before the sales call happens.' },
  { num: '03', title: 'Campaign Systems', desc: 'Repeatable content machines — not one-off posts.' },
  { num: '04', title: 'Identity Design', desc: 'Visual language that makes you impossible to ignore or forget.' },
];

const stats = [
  { num: '50+', label: 'Clients Served' },
  { num: '3+', label: 'Years Running' },
  { num: '100%', label: 'Founder-Led' },
];

export default function HomePage() {
  return (
    <>
      <GSAPAnimations />
      <main>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="home-hero min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-[var(--margin-edge)] pt-24 md:pt-32 pb-16">
          <div
            className="mb-6 md:mb-[var(--stack-lg)] flex flex-wrap gap-2 md:gap-[var(--stack-md)] reveal-up service-tag-group"
            aria-label="Agency location and availability"
          >
            <span className="service-tag">Gurgaon / India</span>
            <span className="service-tag">Available Worldwide</span>
            <span className="service-tag">Founder-led</span>
          </div>

          <div className="max-w-[1280px] reveal-trigger">
            <h1 className="hero-title font-grotesk tracking-tighter text-text-ink font-extrabold leading-[0.9]
                           text-[clamp(2.75rem,9vw,7.5rem)]">
              Built for brands people{' '}
              <em className="font-garamond italic font-normal">remember.</em>
            </h1>
          </div>

          <div className="mt-6 md:mt-[var(--stack-lg)] flex flex-col md:flex-row justify-between items-start gap-6 md:gap-0 reveal-up">
            <p className="font-grotesk text-base md:text-lg max-w-lg text-text-ink leading-relaxed">
              Strategy, identity, campaigns, and founder-led content from a creative studio that
              understands the feed and the room.
            </p>
            <Link href="/work" className="flex gap-3 items-center group">
              <span className="font-mono text-xs md:text-sm uppercase tracking-widest border-b border-text-ink group-hover:text-accent-bronze group-hover:border-accent-bronze transition-all">
                See the Work
              </span>
              <span className="material-symbols-outlined text-ink group-hover:translate-x-2 transition-transform text-xl">
                arrow_forward
              </span>
            </Link>
          </div>
        </section>

        {/* ── Brand Marquee ─────────────────────────────────────── */}
        <Marquee items={marqueeItems} duration={30} />

        {/* ── Selected Work ─────────────────────────────────────── */}
        <section className="py-16 md:py-[var(--section-gap)] px-4 sm:px-6 md:px-[var(--margin-edge)]">
          <div className="flex justify-between items-end mb-8 md:mb-[var(--stack-lg)] reveal-up">
            <h2 className="font-grotesk text-2xl md:text-4xl tracking-tighter font-bold">
              Selected Work
            </h2>
            <Link href="/work" className="nav-link text-sm md:text-base">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-[var(--gutter-grid)]">
            {projects.map((p, i) => (
              <Link
                key={i}
                href="/work"
                className={`${p.span} ${p.offset} reveal-up project-card`}
                data-cursor-label="View"
              >
                <div className="relative overflow-hidden mb-4 md:mb-[var(--stack-md)]">
                  <Image
                    alt={p.alt}
                    className="w-full aspect-[4/5] sm:aspect-[3/2] md:aspect-[4/5] object-cover brightness-90 transition-all duration-700"
                    src={p.img}
                    width={1400}
                    height={1750}
                    unoptimized
                  />
                </div>
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-text-muted">
                  {p.tag}
                </span>
                <h3 className="font-grotesk font-bold tracking-tighter leading-[0.92]
                               text-[clamp(1.75rem,4.5vw,3.25rem)]">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Stats ─────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 md:px-[var(--margin-edge)] py-16 md:py-24 border-t border-b border-[rgba(17,17,17,0.08)]">
          <div className="grid grid-cols-3 gap-0 reveal-up">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`text-center py-4 ${i < stats.length - 1 ? 'border-r border-[rgba(17,17,17,0.1)]' : ''}`}
              >
                <p className="font-garamond italic text-[clamp(2.5rem,7vw,6rem)] font-normal leading-none text-text-ink mb-2">
                  {s.num}
                </p>
                <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Services ──────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 md:px-[var(--margin-edge)] py-16 md:py-[var(--section-gap)]">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent-bronze mb-8 md:mb-12 block reveal-up">
            What We Do
          </span>
          <div className="reveal-up">
            {services.map((s, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row md:items-center md:justify-between
                           border-t border-[rgba(17,17,17,0.1)] py-6 md:py-8
                           last:border-b group hover:pl-4 transition-all duration-500"
              >
                <div className="flex items-baseline gap-4 mb-2 md:mb-0">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">{s.num}</span>
                  <h3 className="font-grotesk font-bold tracking-tighter text-[clamp(1.5rem,4vw,3rem)] leading-none group-hover:text-accent-bronze transition-colors duration-500">
                    {s.title}
                  </h3>
                </div>
                <p className="font-grotesk text-sm md:text-base text-text-muted md:max-w-xs leading-relaxed pl-8 md:pl-0">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Taste Before Volume ───────────────────────────────── */}
        <section className="px-4 sm:px-6 md:px-[var(--margin-edge)] pb-16 md:pb-[var(--section-gap)] grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-[var(--gutter-grid)]">
          <div className="md:col-span-5 reveal-up">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent-bronze mb-3 md:mb-[var(--stack-md)] block">
              Founder-led
            </span>
            <h2 className="font-grotesk font-bold tracking-tighter leading-[0.9]
                           text-[clamp(2rem,5vw,3.5rem)]">
              Taste before volume.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 reveal-up font-grotesk text-base md:text-lg text-text-muted space-y-4 md:space-y-[var(--stack-md)]">
            <p>
              Let&apos;em Know® works with brands, founders, and creators who need sharper positioning,
              stronger systems, and content that does not feel borrowed.
            </p>
            <p>
              We don&apos;t produce volume. We build presence — the kind that compounds over time and
              makes the right people stop scrolling.
            </p>
            <Link href="/about" className="nav-link inline-flex text-sm md:text-base">
              Read About
            </Link>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="min-h-[76vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-[var(--margin-edge)]">
          <div className="reveal-up w-full max-w-4xl mx-auto">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent-bronze mb-4 md:mb-[var(--stack-md)] block">
              Start a Conversation
            </span>
            <h2 className="font-grotesk tracking-tighter mb-8 md:mb-[var(--stack-lg)] font-extrabold
                           text-[clamp(3rem,10vw,8rem)]">
              Let&apos;s talk.
            </h2>
            <a
              href="mailto:hello@letemknow.agency"
              className="font-garamond italic text-text-ink hover:text-accent-bronze transition-all break-all
                         text-[clamp(1.25rem,3.5vw,2.5rem)]"
            >
              hello@letemknow.agency
            </a>
          </div>
        </section>

      </main>
    </>
  );
}

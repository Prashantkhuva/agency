import Link from 'next/link';

export default function Footer({ page = '' }) {
  const year = 2026;
  const label = page ? `${year} Let'em Know® / ${page}` : `${year} Let'em Know® / Gurgaon`;

  return (
    <footer className="bg-background-paper w-full py-[var(--stack-lg)] flex flex-col md:flex-row justify-between items-start md:items-end px-[var(--margin-edge)] gap-[var(--gutter-grid)]">
      <p className="font-mono text-label-mono uppercase text-text-muted">
        © {label}
      </p>
      <div className="flex flex-wrap gap-[var(--stack-lg)]">
        <Link href="/work" className="nav-link">Work</Link>
        <Link href="/about" className="nav-link">About</Link>
        <Link href="/contact" className="nav-link">Contact</Link>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const footerRef = useRef(null);
  const timelineRef = useRef(null);
  const btnRef = useRef(null);
  const ctaRef = useRef(null);

  const navLinks = [
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const links = linksRef.current.filter(Boolean);
    const footer = footerRef.current;

    // ✅ GSAP se initial state set karo — Tailwind classes nahi
    gsap.set(overlay, { autoAlpha: 0 });
    gsap.set(links, { yPercent: 100, autoAlpha: 0 });
    gsap.set(footer, { y: 15, autoAlpha: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(overlay, { autoAlpha: 1, duration: 0.45, ease: "power3.inOut" })
      .to(
        links,
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.18"
      )
      .to(
        footer,
        { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" },
        "-=0.35"
      );

    // ✅ Reverse complete hone pe body overflow clear karo
    tl.eventCallback("onReverseComplete", () => {
      document.body.style.overflow = "";
    });

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  const toggleMenu = () => {
    const next = !isOpen;
    setIsOpen(next);

    btnRef.current?.classList.toggle("is-active", next);

    if (next) {
      document.body.style.overflow = "hidden";
      timelineRef.current?.play();
      // ✅ CTA hide
      gsap.to(ctaRef.current, { autoAlpha: 0, duration: 0.2 });
    } else {
      timelineRef.current?.reverse();
      // ✅ CTA show — reverse complete ke baad (delay match karo)
      gsap.to(ctaRef.current, { autoAlpha: 1, duration: 0.3, delay: 0.35 });
      // body overflow — onReverseComplete callback handle karega
    }
  };

  const closeMenu = () => {
    if (isOpen) toggleMenu();
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-md flex justify-between items-center px-4 sm:px-6 md:px-[var(--margin-edge)] py-[var(--stack-md)]">
        <Link
          href="/"
          className="font-grotesk text-[clamp(22px,4vw,40px)] tracking-tighter text-text-ink leading-none font-bold"
        >
          Let&apos;em Know®
        </Link>

        <nav className="hidden lg:flex gap-[var(--stack-lg)] items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link${isActive(link.href) ? " is-active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/contact" className="nav-cta hidden sm:inline-flex" ref={ctaRef}>
            Inquire
          </Link>
          <button
            ref={btnRef}
            className="hamburger-btn flex lg:hidden flex-col justify-between w-6 h-3.5 z-[100] focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
            onClick={toggleMenu}
          >
            <span className="hamburger-line w-full h-[1.5px] bg-text-ink origin-center transition-all duration-300" />
            <span className="hamburger-line w-full h-[1.5px] bg-text-ink origin-center transition-all duration-300" />
            <span className="hamburger-line w-full h-[1.5px] bg-text-ink origin-center transition-all duration-300" />
          </button>
        </div>
      </header>

      {/* ── Mobile Fullscreen Overlay ─────────────────────────── */}
      {/* ✅ pointer-events-none hata diya — GSAP autoAlpha visibility handle karta hai */}
      <div
        ref={overlayRef}
        className="mobile-menu-overlay fixed inset-0 z-40 bg-surface/98 backdrop-blur-xl flex flex-col justify-center px-6 sm:px-[var(--margin-edge)]"
      >
        <nav className="flex flex-col gap-4 sm:gap-6">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              // ✅ opacity-0 translate-y-8 hata diye — GSAP gsap.set() se handle hoga
              ref={(el) => (linksRef.current[i] = el)}
              className={`mobile-nav-link font-grotesk text-4xl sm:text-5xl tracking-tighter text-text-ink hover:text-accent-bronze transition-colors font-bold${
                isActive(link.href) ? " text-accent-bronze" : ""
              }`}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div
          ref={footerRef}
          // ✅ opacity-0 translate-y-8 hata diye
          className="mt-12 border-t border-text-ink/10 pt-6 flex flex-col gap-2.5"
        >
          <span className="font-mono text-[11px] uppercase tracking-widest text-accent-bronze">
            Say Hello
          </span>
          <a
            href="mailto:hello@letemknow.agency"
            className="font-garamond italic text-2xl text-text-ink hover:text-accent-bronze transition-all"
          >
            hello@letemknow.agency
          </a>
        </div>
      </div>
    </>
  );
}
(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isTouchDevice = window.matchMedia(
    "(hover: none), (pointer: coarse)",
  ).matches;
  const premiumEase = "premiumEase";

  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create(premiumEase, "0.23, 1, 0.32, 1");
  gsap.defaults({ ease: premiumEase, duration: 1.15 });

  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) =>
    gsap.utils.toArray(selector, scope);

  function setupSmoothScroll() {
    if (prefersReducedMotion || isTouchDevice || !window.Lenis) {
      return null;
    }

    const lenis = new Lenis({
      duration: 0.95,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return lenis;
  }

  function setupCursor() {
    const cursor = qs("#custom-cursor");
    const label = qs(".cursor-label", cursor);
    if (!cursor || prefersReducedMotion || isTouchDevice) return;

    const position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: position.x, y: position.y };
    const state = { scale: 1 };

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.to(cursor, { opacity: 1, duration: 0.45, delay: 0.25 });

    window.addEventListener("mousemove", (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
    });

    gsap.ticker.add(() => {
      position.x += (target.x - position.x) * 0.18;
      position.y += (target.y - position.y) * 0.18;
      gsap.set(cursor, {
        x: position.x,
        y: position.y,
        scale: state.scale,
      });
    });

    const setScale = (scale) =>
      gsap.to(state, { scale, duration: 0.48, ease: premiumEase });

    qsa("a, button, .service-item, .project-card").forEach((element) => {
      element.addEventListener("mouseenter", () => setScale(3.8));
      element.addEventListener("mouseleave", () => setScale(1));
    });

    qsa(".project-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        label.textContent = card.dataset.cursorLabel || "View";
        gsap.to(state, { scale: 5.1, duration: 0.5, ease: premiumEase });
        gsap.to(label, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.35,
          ease: premiumEase,
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(state, { scale: 1, duration: 0.5, ease: premiumEase });
        gsap.to(label, {
          autoAlpha: 0,
          scale: 0.85,
          duration: 0.25,
          ease: premiumEase,
        });
      });
    });
  }

  function splitMajorHeadings() {
    if (!window.SplitType) return [];

    const headings = qsa("main h2, main h3");
    return headings.map((heading) => {
      const split = new SplitType(heading, {
        types: "lines",
        lineClass: "split-line",
      });

      split.lines.forEach((line) => {
        const inner = document.createElement("span");
        inner.className = "split-line-inner";
        while (line.firstChild) inner.appendChild(line.firstChild);
        line.appendChild(inner);
      });

      return { heading, lines: qsa(".split-line-inner", heading) };
    });
  }

  function animateSplitHeadings(splits) {
    splits.forEach(({ heading, lines }, index) => {
      gsap.fromTo(
        lines,
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: index === 0 ? 1.25 : 1.05,
          stagger: 0.075,
          scrollTrigger: {
            trigger: heading,
            start: "top 88%",
            once: true,
          },
        },
      );
    });
  }

  function setupReveals() {
    qsa(".reveal-up").forEach((element, index) => {
      const firstSection = element.closest("main section:first-child");
      if (firstSection && qs(".split-child", firstSection)) return;

      const media = qsa("img", element);
      const text = qsa(
        "span, p, a, button, h2, h3, .font-label-mono",
        element,
      ).filter((child) => !child.closest(".split-line"));

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 84%",
          once: true,
        },
        defaults: { ease: premiumEase },
      });

      timeline.fromTo(
        element,
        { autoAlpha: 0, y: 54 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.05,
          delay: Math.min(index * 0.025, 0.14),
        },
      );

      if (media.length) {
        timeline.fromTo(
          media,
          { scale: 1.08, y: 36, autoAlpha: 0.88 },
          { scale: 1, y: 0, autoAlpha: 1, duration: 1.25, stagger: 0.07 },
          "-=0.95",
        );
      }

      if (text.length) {
        timeline.fromTo(
          text,
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.035 },
          "-=0.85",
        );
      }
    });

    qsa(".service-item").forEach((item, index) => {
      gsap.fromTo(
        item,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          delay: index * 0.08,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            once: true,
          },
        },
      );
    });
  }

  function setupHeroIntro() {
    const hero = qs("main section:first-child");
    if (!hero) return;

    const heroSupport = qs(".reveal-up", hero);
    const title = qs(".hero-title", hero);
    
    if (heroSupport) gsap.set(heroSupport, { autoAlpha: 1 });

    let heroLines = [];
    if (title && window.SplitType) {
      const split = new SplitType(title, {
        types: "lines",
        lineClass: "split-line",
      });

      split.lines.forEach((line) => {
        const inner = document.createElement("span");
        inner.className = "split-line-inner";
        while (line.firstChild) inner.appendChild(line.firstChild);
        line.appendChild(inner);
      });
      
      heroLines = qsa(".split-line-inner", title);
    } else {
      heroLines = qsa(".split-child", hero);
    }

    if (heroLines.length) {
      gsap.set(heroLines, { yPercent: 112 });
      gsap.fromTo(
        heroLines,
        { yPercent: 112 },
        { yPercent: 0, duration: 1.12, stagger: 0.085, delay: 0.08 },
      );
    }

    gsap.fromTo(
      qsa("p, .group", hero),
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08, delay: 0.7 },
    );

    const heroTitle = qs(".reveal-trigger", hero);
    if (heroTitle) {
      gsap.to(heroTitle, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });
    }
  }

  function setupParallax() {
    if (isTouchDevice) return;

    qsa(".project-card img, .work-card img, .md\\:col-start-7 img").forEach(
      (image) => {
        image.classList.add("motion-media");
        gsap.to(image, {
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8,
          },
        });
      },
    );
  }

  function setupMarquee() {
    qsa(".marquee-content").forEach((content, index) => {
      gsap.to(content, {
        xPercent: -50,
        repeat: -1,
        duration: index === 0 ? 30 : 24,
        ease: "none",
      });
    });
  }

  function setupHoverFollowImages() {
    if (isTouchDevice) return;

    qsa(".service-item").forEach((item) => {
      const reveal = qs(".hover-reveal-img", item);
      if (!reveal) return;

      const quickX = gsap.quickTo(reveal, "x", {
        duration: 0.58,
        ease: premiumEase,
      });
      const quickY = gsap.quickTo(reveal, "y", {
        duration: 0.58,
        ease: premiumEase,
      });
      const quickRotation = gsap.quickTo(reveal, "rotation", {
        duration: 0.62,
        ease: premiumEase,
      });

      gsap.set(reveal, { scale: 0.84, autoAlpha: 0 });

      item.addEventListener("mouseenter", () => {
        gsap.to(reveal, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.65,
          ease: premiumEase,
        });
      });

      item.addEventListener("mousemove", (event) => {
        const rect = item.getBoundingClientRect();
        const x = event.clientX - rect.left - 140;
        const y = event.clientY - rect.top - 190;
        const centerOffset = event.clientX - rect.left - rect.width / 2;
        const rotation = gsap.utils.clamp(-5, 5, centerOffset * 0.012);
        quickX(x);
        quickY(y);
        quickRotation(rotation);
      });

      item.addEventListener("mouseleave", () => {
        quickRotation(0);
        gsap.to(reveal, {
          autoAlpha: 0,
          scale: 0.86,
          duration: 0.48,
          ease: premiumEase,
        });
      });
    });
  }

  function setupImageHovers() {
    if (isTouchDevice) return;

    qsa(".project-card img, .work-card img").forEach((image) => {
      image.addEventListener("mouseenter", () => {
        gsap.to(image, {
          scale: 1.035,
          filter: "brightness(1)",
          duration: 0.95,
          ease: premiumEase,
        });
      });

      image.addEventListener("mouseleave", () => {
        gsap.to(image, {
          scale: 1,
          filter: "",
          duration: 0.95,
          ease: premiumEase,
        });
      });
    });
  }

  function setupProjectFilters() {
    const buttons = qsa(".filter-button");
    const cards = qsa(".work-card");
    if (!buttons.length || !cards.length) return;

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        buttons.forEach((item) =>
          item.classList.toggle("is-active", item === button),
        );

        cards.forEach((card) => {
          const visible = filter === "all" || card.dataset.category === filter;
          gsap.to(card, {
            autoAlpha: visible ? 1 : 0.18,
            scale: visible ? 1 : 0.985,
            duration: 0.45,
            ease: premiumEase,
          });
          card.style.pointerEvents = visible ? "auto" : "none";
        });
      });
    });
  }

  function setupProjectPreview() {
    const modal = qs(".project-modal");
    const triggers = qsa(".project-preview-trigger");
    if (!modal || !triggers.length) return;

    const close = qs(".project-modal-close", modal);
    const image = qs(".project-modal-img", modal);
    const meta = qs(".project-modal-meta", modal);
    const title = qs(".project-modal-title", modal);
    const desc = qs(".project-modal-desc", modal);

    const openModal = (card) => {
      image.src = card.dataset.img;
      image.alt = card.dataset.title;
      meta.textContent = card.dataset.meta;
      title.textContent = card.dataset.title;
      desc.textContent = card.dataset.desc;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      gsap.fromTo(
        [image, meta, title, desc],
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.06 },
      );
    };

    const closeModal = () => {
      gsap.to(modal, {
        autoAlpha: 0,
        y: 18,
        duration: 0.35,
        onComplete: () => {
          modal.classList.remove("is-open");
          modal.removeAttribute("style");
          modal.setAttribute("aria-hidden", "true");
        },
      });
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => openModal(trigger.closest(".work-card")));
    });

    close?.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

  function setupMobileMenu() {
    const btn = qs(".hamburger-btn");
    const overlay = qs(".mobile-menu-overlay");
    if (!btn || !overlay) return;

    const links = qsa(".mobile-nav-link", overlay);
    const footer = qs(".mobile-menu-footer", overlay);

    // Highlight the active link dynamically in mobile overlay
    const currentPath = window.location.pathname;
    links.forEach(link => {
      const href = link.getAttribute("href");
      if (
        (href.includes("work") && currentPath.includes("/work/")) ||
        (href.includes("about") && currentPath.includes("/about/")) ||
        (href.includes("contact") && currentPath.includes("/contact/")) ||
        ((href === "./" || href === "../") && currentPath.endsWith("/") && !currentPath.includes("/work") && !currentPath.includes("/about") && !currentPath.includes("/contact"))
      ) {
        link.classList.add("text-accent-bronze");
      }
    });

    let isOpen = false;
    let menuTimeline = gsap.timeline({ paused: true });

    menuTimeline.to(overlay, {
      autoAlpha: 1,
      duration: 0.45,
      ease: "power3.inOut"
    })
    .fromTo(links, 
      { yPercent: 100, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 0.65, stagger: 0.08, ease: premiumEase },
      "-=0.18"
    )
    .fromTo(footer,
      { y: 15, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.55, ease: premiumEase },
      "-=0.35"
    );

    const toggleMenu = () => {
      isOpen = !isOpen;
      btn.classList.toggle("is-active", isOpen);
      overlay.classList.toggle("is-active", isOpen);

      // Fade out the main inquire/email button in the header for cleanliness
      const headerCta = qs("header .nav-cta");
      if (headerCta) {
        gsap.to(headerCta, {
          autoAlpha: isOpen ? 0 : 1,
          duration: 0.35,
          ease: premiumEase
        });
      }

      if (isOpen) {
        document.body.style.overflow = "hidden";
        menuTimeline.play(0);
      } else {
        document.body.style.overflow = "";
        menuTimeline.reverse();
      }
    };

    btn.addEventListener("click", toggleMenu);

    links.forEach(link => {
      link.addEventListener("click", () => {
        if (isOpen) toggleMenu();
      });
    });
  }

  function setupInquiryForm() {
    const form = qs(".inquiry-form");
    if (!form) return;

    const btn = qs(".nav-cta.inline-flex", form);
    if (!btn) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      
      const name = form.elements["name"]?.value.trim() || "";
      const email = form.elements["email"]?.value.trim() || "";
      const brief = form.elements["brief"]?.value.trim() || "";

      if (!name || !email || !brief) {
        alert("Please fill in all the fields before sending your inquiry.");
        return;
      }

      const mailtoUrl = `mailto:hello@letemknow.agency?subject=${encodeURIComponent("Inquiry from " + name)}&body=${encodeURIComponent("Hi Let’em Know,\n\nMy name is " + name + " (" + email + ").\n\nHere is what we are building:\n" + brief + "\n\nWarm regards,\n" + name)}`;
      
      window.location.href = mailtoUrl;

      const oldText = btn.textContent;
      btn.textContent = "Drafting Email...";
      gsap.to(btn, {
        backgroundColor: "#a66a3f",
        duration: 0.35,
        onComplete: () => {
          setTimeout(() => {
            btn.textContent = "Sent!";
            gsap.to(btn, {
              backgroundColor: "#2e7d32",
              duration: 0.35,
              onComplete: () => {
                setTimeout(() => {
                  btn.textContent = oldText;
                  btn.removeAttribute("style");
                  form.reset();
                }, 3000);
              }
            });
          }, 1200);
        }
      });
    });
  }

  function initMotion() {
    setupMobileMenu();
    setupInquiryForm();

    if (prefersReducedMotion) {
      qsa(".reveal-up").forEach((element) => {
        element.style.opacity = 1;
      });
      return;
    }

    setupSmoothScroll();
    setupCursor();
    const headingSplits = splitMajorHeadings();
    setupHeroIntro();
    animateSplitHeadings(headingSplits);
    setupReveals();
    setupParallax();
    setupMarquee();
    setupHoverFollowImages();
    setupImageHovers();
    setupProjectFilters();
    setupProjectPreview();
    ScrollTrigger.refresh();
  }

  window.addEventListener("load", initMotion);
})();

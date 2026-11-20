"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocale } from "../contexts/LocaleContext.jsx";
import { Brand } from "./Shared.jsx";

gsap.registerPlugin(useGSAP);

function LanguageSwitch() {
  const { t, locale, setLocale } = useLocale();
  return (
    <div className="language-switch" role="group" aria-label={t.nav.language}>
      {[["fr", "FR"], ["ar", "ع"]].map(([id, text]) => (
        <button key={id} type="button" onClick={() => setLocale(id)}
          aria-pressed={locale === id} lang={id}
          className={locale === id ? "active" : ""}>
          {text}
          <span className="sr-only">{id === "fr" ? "Français" : "العربية"}</span>
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const { t } = useLocale();
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onOutside = (event) => {
      if (!menuRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1021px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);

  useGSAP(() => {
    const header = menuRef.current;
    if (!header || menuOpen) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const hide = gsap.to(header, {
        yPercent: -100, y: -32, duration: 0.3, ease: "power2.inOut", paused: true,
      });
      let previousY = window.scrollY;
      let direction = 0;
      let distance = 0;
      let frame = 0;
      let hidden = false;
      const show = () => {
        hidden = false;
        distance = 0;
        hide.pause().progress(0);
      };
      const update = () => {
        frame = 0;
        const y = Math.max(0, window.scrollY);
        const delta = y - previousY;
        previousY = y;
        if (y < 120 || header.contains(document.activeElement)) {
          if (hidden) { hidden = false; hide.reverse(); }
          distance = 0;
          return;
        }
        if (!delta) return;
        const nextDirection = Math.sign(delta);
        distance = nextDirection === direction ? distance + Math.abs(delta) : Math.abs(delta);
        direction = nextDirection;
        // Ignore small wheel/touch fluctuations, so the bar does not flicker.
        if (distance < 16) return;
        const shouldHide = direction > 0;
        if (shouldHide !== hidden) {
          hidden = shouldHide;
          if (hidden) hide.play();
          else hide.reverse();
        }
        distance = 0;
      };
      const onScroll = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      header.addEventListener("focusin", show);
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", onScroll);
        header.removeEventListener("focusin", show);
      };
    });
    return () => media.revert();
  }, { scope: menuRef, dependencies: [menuOpen], revertOnUpdate: true });

  const nav = [
    ["univers", t.nav.univers],
    ["collaboration", t.nav.collaboration],
    ["etapes", t.nav.steps],
    ["contact", t.nav.contact],
  ];
  const isCurrent = (id) => pathname === "/" && activeHash === `#${id}`;

  return (
    <>
      <a href="#main-content" className="skip-link">{t.nav.skip}</a>
      <header className="site-header" ref={menuRef}>
        <div className="header-inner">
          <Link href="/" className="brand-home"
            aria-label={`Massar × LODENE — ${t.nav.home}`}
            onClick={() => setMenuOpen(false)}>
            <Brand compact />
          </Link>
          <nav className="desktop-nav" aria-label={t.nav.univers}>
            {nav.slice(0, -1).map(([id, label]) => (
              <Link className={isCurrent(id) ? "current" : ""}
                aria-current={isCurrent(id) ? "location" : undefined}
                href={`/#${id}`} key={id}>{label}</Link>
            ))}
          </nav>
          <div className="header-actions">
            <LanguageSwitch />
            <Link className="header-contact" href="/#contact"
              aria-current={isCurrent("contact") ? "location" : undefined}>
              {t.nav.contact}
            </Link>
            <button type="button" className="mobile-toggle" ref={toggleRef}
              aria-label={menuOpen ? t.nav.close : t.nav.menu}
              aria-expanded={menuOpen} aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label={t.nav.univers}>
            {nav.map(([id, label]) => (
              <Link href={`/#${id}`} key={id}
                className={isCurrent(id) ? "current" : ""}
                aria-current={isCurrent(id) ? "location" : undefined}
                onClick={() => setMenuOpen(false)}>{label}</Link>
            ))}
            <div className="mobile-language"><LanguageSwitch /></div>
          </nav>
        )}
      </header>
    </>
  );
}

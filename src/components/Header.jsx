import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  GraduationCap,
  Building2,
  BookOpen,
} from "lucide-react";
import { useLocale } from "../contexts/LocaleContext.jsx";
import { Brand, ExternalLink } from "./Shared.jsx";
import { candidateUrl, schoolUrl } from "../data/links.js";
import { lodene } from "../data/catalog.js";

export default function Header() {
  const { t, locale, setLocale } = useLocale();
  const { hash } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef(null);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const accessTriggerRef = useRef(null);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onOutside = (e) => {
      if (!menuRef.current?.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, [menuOpen]);
  const openAccess = (event) => {
    accessTriggerRef.current = event.currentTarget;
    setMenuOpen(false);
    dialogRef.current?.showModal();
  };
  const nav = [
    ["univers", t.nav.univers],
    ["collaboration", t.nav.collaboration],
    ["etapes", t.nav.steps],
    ["contact", t.nav.contact],
  ];
  const accounts = [
    [
      candidateUrl,
      GraduationCap,
      t.access.candidate,
      t.access.candidateText,
      "massar",
    ],
    [schoolUrl, Building2, t.access.school, t.access.schoolText, "massar"],
    [lodene.portal, BookOpen, t.access.lodene, t.access.lodeneText, "lodene"],
  ];
  return (
    <>
      <a href="#main-content" className="skip-link">
        {t.nav.skip}
      </a>
      <header className="site-header" ref={menuRef}>
        <div className="container header-inner">
          <Link
            to="/"
            className="brand-home"
            aria-label={`Massar × LODENE — ${t.nav.home}`}
            onClick={() => setMenuOpen(false)}
          >
            <Brand compact />
          </Link>
          <nav className="desktop-nav" aria-label={t.nav.univers}>
            {nav.map(([id, label]) => (
              <Link
                className={hash === `#${id}` ? "current" : ""}
                to={`/#${id}`}
                key={id}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <div className="language-switch" aria-label={t.nav.language}>
              {[
                ["fr", "FR"],
                ["ar", "ع"],
              ].map(([id, text]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setLocale(id)}
                  aria-pressed={locale === id}
                  lang={id}
                  className={locale === id ? "active" : ""}
                >
                  {text}
                  <span className="sr-only">
                    {id === "fr" ? "Français" : "العربية"}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="access-button"
              onClick={openAccess}
              aria-haspopup="dialog"
            >
              {t.nav.access}
              <ChevronDown size={15} />
            </button>
            <button
              type="button"
              className="mobile-toggle"
              ref={toggleRef}
              aria-label={menuOpen ? t.nav.close : t.nav.menu}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label={t.nav.univers}
          >
            {nav.map(([id, label]) => (
              <Link to={`/#${id}`} key={id} onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <button className="button button-navy" onClick={openAccess}>
              {t.nav.access}
              <ArrowUpRight size={18} />
            </button>
          </nav>
        )}
      </header>
      <dialog
        className="access-dialog"
        ref={dialogRef}
        aria-labelledby="access-title"
        onClose={() => {
          const trigger = accessTriggerRef.current;
          (trigger?.isConnected ? trigger : toggleRef.current)?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current.close();
        }}
      >
        <div className="dialog-inner">
          <button
            className="dialog-close icon-button"
            type="button"
            aria-label={t.common.close}
            onClick={() => dialogRef.current.close()}
          >
            <X size={22} />
          </button>
          <p className="eyebrow">Massar × LODENE</p>
          <h2 id="access-title">{t.access.title}</h2>
          <p>{t.access.description}</p>
          <div className="account-options">
            {accounts.map(([href, Icon, title, text, brand]) => (
              <ExternalLink
                key={href}
                href={href}
                className={`account-option ${brand}`}
                onClick={() => dialogRef.current.close()}
              >
                <span className="account-icon">
                  <Icon size={23} />
                </span>
                <span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </span>
                <ArrowUpRight size={20} />
              </ExternalLink>
            ))}
          </div>
          <p className="dialog-note">{t.access.note}</p>
        </div>
      </dialog>
    </>
  );
}

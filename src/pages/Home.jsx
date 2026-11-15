import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  MoveUpRight,
  Compass,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import { useLocale } from "../contexts/LocaleContext.jsx";
import { services } from "../data/catalog.js";
import {
  Brand,
  SectionHeading,
  ServiceCard,
  ContactSection,
} from "../components/Shared.jsx";

export default function Home() {
  const { t } = useLocale();
  const [category, setCategory] = useState("all");
  const filtered = services.filter(
    (s) => category === "all" || s.category === category,
  );
  const stepIcons = [Compass, BookOpen, MessageCircle];
  return (
    <>
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              {t.hero.eyebrow}
            </p>
            <h1>
              {t.hero.title}{" "}
              <span>
                {t.hero.accent}
                <svg
                  className="hero-underline"
                  viewBox="0 0 360 14"
                  aria-hidden="true"
                >
                  <path d="M4 10C90 2 245 1 356 7" />
                </svg>
              </span>
            </h1>
            <p className="hero-description">{t.hero.description}</p>
            <div className="hero-actions">
              <a href="#univers" className="button button-navy">
                {t.common.explore}
                <ArrowRight size={19} className="directional" />
              </a>
              <a href="#collaboration" className="hero-secondary">
                {t.hero.secondary}
                <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="hero-bottom">
              <span className="hero-bottom-icon">
                <MoveUpRight size={18} />
              </span>
              <p>{t.hero.bottom}</p>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo-main">
              <img
                src="/images/driving.jpg"
                alt={t.hero.imageAlt}
                width="900"
                height="650"
                fetchPriority="high"
              />
              <span className="photo-location">
                <MapPin size={14} />
                <bdi>LODENE · France</bdi>
              </span>
            </div>
            <div className="hero-photo-small">
              <img
                src="/images/language-workshop.png"
                alt={t.hero.smallImageAlt}
                width="480"
                height="360"
              />
              <span>{t.hero.imageTag}</span>
            </div>
            <div className="hero-floating">
              <span className="floating-symbol">
                <Compass size={24} />
              </span>
              <div>
                <strong>{t.hero.floatTitle}</strong>
                <span>{t.hero.floatText}</span>
              </div>
            </div>
            <span className="hero-dot-grid" aria-hidden="true" />
          </div>
        </div>
      </section>
      <div className="brand-ribbon">
        <div className="container">
          <span>
            <span className="ribbon-dot blue" />
            <bdi>Massar</bdi>
            <span className="ribbon-description">{t.common.code}</span>
            <span className="ribbon-country">{t.common.tunisia}</span>
          </span>
          <span className="ribbon-plus">+</span>
          <span>
            <span className="ribbon-dot green" />
            <bdi>LODENE</bdi>
            <span className="ribbon-description">{t.common.training}</span>
            <span className="ribbon-country">{t.common.france}</span>
          </span>
        </div>
      </div>
      <section id="univers" className="section container univers-section">
        <SectionHeading
          eyebrow={t.univers.eyebrow}
          title={t.univers.title}
          description={t.univers.description}
        />
        <div className="universe-toolbar">
          <div
            className="filter-tabs"
            role="group"
            aria-label={t.univers.filter}
          >
            {["all", "driving", "professional", "languages"].map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={category === id}
                className={category === id ? "selected" : ""}
                onClick={() => setCategory(id)}
              >
                {t.univers[id]}
              </button>
            ))}
          </div>
          <span className="result-count" aria-live="polite">
            {filtered.length} {t.univers.results}
          </span>
        </div>
        <div className="service-grid">
          {filtered.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>
      <section id="collaboration" className="collaboration-section section">
        <div className="container collaboration-grid">
          <div className="collaboration-copy">
            <p className="eyebrow">{t.collaboration.eyebrow}</p>
            <h2>{t.collaboration.title}</h2>
            <p>{t.collaboration.description}</p>
            <a className="text-link" href="#univers">
              {t.collaboration.link}
              <ArrowRight size={18} className="directional" />
            </a>
          </div>
          <div className="collaboration-partners">
            <article className="partner-card massar">
              <Brand single="massar" />
              <h3>{t.collaboration.massarTitle}</h3>
              <p>{t.collaboration.massarText}</p>
              <span className="partner-place">
                <MapPin size={14} />
                {t.common.tunisia}
              </span>
            </article>
            <span className="partner-join" aria-hidden="true">
              ×
            </span>
            <article className="partner-card lodene">
              <Brand single="lodene" />
              <h3>{t.collaboration.lodeneTitle}</h3>
              <p>{t.collaboration.lodeneText}</p>
              <span className="partner-place">
                <MapPin size={14} />
                {t.common.france}
              </span>
            </article>
            <p className="partner-note">{t.collaboration.note}</p>
          </div>
        </div>
      </section>
      <section id="etapes" className="section container steps-section">
        <SectionHeading
          eyebrow={t.steps.eyebrow}
          title={t.steps.title}
          centered
        />
        <div className="steps-grid">
          {t.steps.items.map(([title, text], i) => {
            const StepIcon = stepIcons[i];
            return (
              <article className="step" key={title}>
                <div className="step-top">
                  <span className="step-number">0{i + 1}</span>
                  <StepIcon size={24} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                {i < 2 && (
                  <ArrowRight className="step-arrow directional" size={22} />
                )}
              </article>
            );
          })}
        </div>
        <Link to="/#univers" className="text-link steps-link">
          {t.common.explore}
          <ArrowUpRight size={18} />
        </Link>
      </section>
      <ContactSection />
    </>
  );
}

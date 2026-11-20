"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import { useLocale } from "../contexts/LocaleContext.jsx";
import { lodene, services } from "../data/catalog.js";
import {
  Brand,
  SectionHeading,
  ContactSection,
} from "../components/Shared.jsx";
import StepsTimeline from "../components/StepsTimeline.jsx";
import HomeMotion from "../components/HomeMotion.jsx";
import ServiceCarousel from "../components/ServiceCarousel.jsx";
import ScrollWorldExperience from "../components/ScrollWorldExperience.jsx";

export default function Home() {
  const { t, locale } = useLocale();
  const [category, setCategory] = useState("all");
  const universRef = useRef(null);
  const collaborationRef = useRef(null);
  const contactRef = useRef(null);
  const filtered = services.filter(
    (s) => category === "all" || s.category === category,
  );
  return (
    <>
      <HomeMotion
        collaborationRef={collaborationRef}
        locale={locale}
      />
      <ScrollWorldExperience
        key={locale}
        content={t.scrollWorld}
        locale={locale}
      />
      <aside
        id="training-band"
        className="training-band"
        aria-label={t.scrollWorld.band.ariaLabel}
      >
        <div className="container training-band-inner">
          <p className="training-band-summary">
            <strong>{t.scrollWorld.band.count}</strong>
            <span>{t.scrollWorld.band.description}</span>
          </p>
          <nav aria-label={t.scrollWorld.band.ariaLabel}>
            <ul className="training-band-list">
              {t.scrollWorld.band.items.map((item) => (
                <li key={item.href}>
                  <span className="training-band-dot" aria-hidden="true" />
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
      <section
        id="univers"
        className="section container univers-section"
        ref={universRef}
        data-section-transition
      >
        <SectionHeading
          eyebrow={t.univers.eyebrow}
          title={t.univers.title}
          description={t.univers.description}
          motion
        />
        <div className="universe-toolbar" data-section-piece="body">
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
        <ServiceCarousel
          key={category}
          services={filtered}
          ariaLabel={t.univers.carouselLabel}
        />
      </section>
      <section
        id="collaboration"
        className="collaboration-section section"
        ref={collaborationRef}
        data-own-section-motion
        aria-labelledby="collaboration-title"
      >
        <div className="container collaboration-grid">
          <div className="collaboration-copy">
            <p className="eyebrow" data-collaboration-motion="eyebrow">{t.collaboration.eyebrow}</p>
            <h2 id="collaboration-title" data-collaboration-motion="title">{t.collaboration.title}</h2>
            <p data-collaboration-motion="description">{t.collaboration.description}</p>
          </div>
          <div className="collaboration-partners">
            <article
              className="partner-card massar"
              data-collaboration-card="massar"
              data-collaboration-motion="card"
            >
              <Brand single="massar" />
              <h3>{t.collaboration.massarTitle}</h3>
              <p>{t.collaboration.massarText}</p>
              <span className="partner-place">
                <MapPin size={14} />
                {t.common.tunisia}
              </span>
              <Link className="partner-link" href="/massar">
                {t.collaboration.massarLink}
                <ArrowRight size={17} className="directional" aria-hidden="true" />
              </Link>
            </article>
            <span
              className="partner-connection"
              aria-hidden="true"
            >
              <span className="partner-bridge massar" data-collaboration-motion="bridge" />
              <span className="partner-join" data-collaboration-motion="join" />
              <span className="partner-bridge lodene" data-collaboration-motion="bridge" />
            </span>
            <article
              className="partner-card lodene"
              data-collaboration-card="lodene"
              data-collaboration-motion="card"
            >
              <Brand single="lodene" />
              <h3>{t.collaboration.lodeneTitle}</h3>
              <p>{t.collaboration.lodeneText}</p>
              <span className="partner-place">
                <MapPin size={14} />
                {t.common.france}
              </span>
              <a className="partner-link" href={lodene.website}>
                {t.collaboration.lodeneLink}
                <ArrowUpRight size={17} className="directional" aria-hidden="true" />
              </a>
            </article>
            <p
              className="partner-note"
              data-collaboration-motion="note"
            >
              {t.collaboration.note}
            </p>
          </div>
        </div>
      </section>
      <StepsTimeline content={t.steps} locale={locale} exploreLabel={t.common.explore} />
      <ContactSection sectionRef={contactRef} motion />
    </>
  );
}

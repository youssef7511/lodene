"use client";

import { ArrowUpRight, ArrowRight, Check, MapPin, Tractor } from "lucide-react";
import Link from "next/link";
import { useLocale } from "../contexts/LocaleContext.jsx";
import { lodene } from "../data/catalog.js";
import {
  Breadcrumb,
  BrandPill,
  ExternalLink,
  SectionHeading,
  Icon,
  LodeneContact,
  RelatedServices,
} from "../components/Shared.jsx";

export default function Service({ service }) {
  const { t } = useLocale();
  const copy = t.services[service.id];
  return (
    <>
      <div className="container">
        <Breadcrumb title={copy.title} />
      </div>
      <section className={`service-hero ${service.id}-hero`}>
        <div className="container service-hero-grid">
          <div className="service-hero-copy">
            <BrandPill brand="lodene" />
            <p className="eyebrow">{copy.tag}</p>
            <h1>{copy.hero}</h1>
            <p className="hero-description">{copy.intro}</p>
            <div className="hero-actions">
              <a className="button button-green" href="#projet">
                {t.common.contact}
                <ArrowRight className="directional" size={18} />
              </a>
              <ExternalLink href={service.official} className="text-link">
                {copy.action}
                <ArrowUpRight size={17} />
              </ExternalLink>
            </div>
          </div>
          <div className="service-hero-image">
            <img
              src={service.image}
              alt={copy.alt}
              width="900"
              height="650"
              fetchPriority="high"
            />
            {service.id === "langues" && (
              <span className="image-caption">{t.common.illustrative}</span>
            )}
            <span className="service-image-badge">
              <Icon name={service.icon} size={22} />
              {copy.title}
            </span>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading eyebrow={copy.title} title={t.common.learn} />
        <div className="feature-grid">
          {copy.features.map(([title, text], i) => (
            <article className="feature-card" key={title}>
              <span
                className={`feature-icon ${service.id === "langues" ? "language-code" : ""}`}
              >
                {service.id === "langues" ? (
                  <bdi>{t.service.languageCodes[i]}</bdi>
                ) : (
                  <Check size={22} />
                )}
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="availability-note">{t.common.availability}</p>
      </section>
      {service.id === "logistique" && (
        <section className="container equipment-prompt">
          <span className="feature-icon">
            <Tractor size={30} />
          </span>
          <div>
            <h2>{t.service.relatedEquipment}</h2>
            <p>{t.service.relatedEquipmentText}</p>
          </div>
          <Link className="button button-green" href="/lodene/conduite#engins">
            {t.service.equipmentAction}
            <ArrowRight size={18} className="directional" />
          </Link>
        </section>
      )}
      <section className="project-section section" id="projet">
        <div className="container project-grid">
          <div>
            <p className="eyebrow">{t.service.question}</p>
            <h2>{t.service.yourProject}</h2>
            <p className="section-description">{t.service.projectText}</p>
            <LodeneContact subject={`Mon projet : ${copy.title}`} />
          </div>
          <div className="centre-card">
            <BrandPill brand="lodene" />
            <h3>{t.common.address}</h3>
            <p>
              <MapPin size={20} />
              <bdi>{lodene.address}</bdi>
            </p>
            <ExternalLink href={service.official} className="text-link">
              {copy.action}
              <ArrowUpRight size={17} />
            </ExternalLink>
          </div>
        </div>
      </section>
      <RelatedServices exclude={[service.id]} />
    </>
  );
}

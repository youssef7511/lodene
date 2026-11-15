import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Tractor,
  CarFront,
  Mail,
} from "lucide-react";
import { useLocale } from "../contexts/LocaleContext.jsx";
import { equipment, lodene } from "../data/catalog.js";
import {
  Breadcrumb,
  BrandPill,
  ExternalLink,
  SectionHeading,
  CheckList,
  LodeneContact,
  RelatedServices,
} from "../components/Shared.jsx";

export default function Conduite() {
  const { t } = useLocale();
  const copy = t.services.conduite;
  return (
    <>
      <div className="container">
        <Breadcrumb title={copy.title} />
      </div>
      <section className="service-hero conduite-hero">
        <div className="container service-hero-grid">
          <div className="service-hero-copy">
            <BrandPill brand="lodene" />
            <p className="eyebrow">{copy.tag}</p>
            <h1>{copy.hero}</h1>
            <p className="hero-description">{copy.intro}</p>
            <div className="hero-actions">
              <a className="button button-green" href="#engins">
                <Tractor size={19} />
                {t.conduite.equipment}
                <ArrowDown size={18} />
              </a>
              <a className="text-link" href="#automobile">
                <CarFront size={19} />
                {t.conduite.auto}
                <ArrowDown size={17} />
              </a>
            </div>
          </div>
          <div className="service-hero-image">
            <img
              src="/images/backhoe.png"
              alt={copy.alt}
              width="900"
              height="600"
              fetchPriority="high"
            />
            <span className="image-caption">{t.common.illustrative}</span>
          </div>
        </div>
      </section>
      <nav className="category-strip" aria-label={copy.title}>
        <div className="container">
          <a href="#engins">
            <Tractor size={20} />
            {t.conduite.equipment}
            <ArrowDown size={16} />
          </a>
          <a href="#automobile">
            <CarFront size={20} />
            {t.conduite.auto}
            <ArrowDown size={16} />
          </a>
        </div>
      </nav>
      <section className="section container" id="engins">
        <SectionHeading
          eyebrow={t.conduite.equipmentEyebrow}
          title={t.conduite.equipmentTitle}
          description={t.conduite.equipmentText}
        />
        <div className="equipment-grid">
          {equipment.map((machine, i) => {
            const m = t.conduite.machines[machine.id];
            return (
              <article
                key={machine.id}
                className="equipment-card"
                id={machine.id}
              >
                <div className="equipment-image">
                  <img
                    src={machine.image}
                    alt={m.title}
                    width="600"
                    height="400"
                    loading="lazy"
                  />
                  <span className="equipment-number">0{i + 1}</span>
                </div>
                <div className="equipment-body">
                  <p className="card-tag">{m.label}</p>
                  <h3>{m.title}</h3>
                  <p>{m.description}</p>
                  <details>
                    <summary>
                      {t.common.details}
                      <ChevronDown size={18} />
                    </summary>
                    <div className="equipment-details">
                      <h4>{t.conduite.topicLabel}</h4>
                      <CheckList items={m.topics} />
                      <a
                        className="text-link"
                        href={`mailto:${lodene.email}?subject=${encodeURIComponent(`Formation : ${m.title}`)}`}
                      >
                        <Mail size={16} />
                        {t.conduite.machineContact}
                        <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </details>
                </div>
              </article>
            );
          })}
        </div>
        <p className="availability-note">{t.conduite.disclaimer}</p>
      </section>
      <section id="automobile" className="auto-section section">
        <div className="container auto-grid">
          <div className="auto-image">
            <img
              src="/images/driving.jpg"
              alt={t.conduite.autoAlt}
              width="900"
              height="650"
              loading="lazy"
            />
            <span className="auto-image-label">
              <CarFront size={20} />
              {t.conduite.auto}
            </span>
          </div>
          <div>
            <p className="eyebrow">{t.conduite.autoEyebrow}</p>
            <h2>{t.conduite.autoTitle}</h2>
            <p className="section-description">{t.conduite.autoText}</p>
            <CheckList items={t.conduite.autoItems} />
            <ExternalLink href={lodene.catalog} className="button button-green">
              {t.conduite.autoAction}
              <ArrowUpRight size={18} />
            </ExternalLink>
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="project-band">
          <div>
            <p className="eyebrow">LODENE · {t.common.france}</p>
            <h2>{t.conduite.project}</h2>
            <p>{t.conduite.projectText}</p>
          </div>
          <div>
            <LodeneContact subject="Mon projet de formation conduite et engins" />
            <Link className="text-link" to="/lodene/logistique">
              {t.conduite.logisticsLink}
              <ArrowRight size={17} className="directional" />
            </Link>
          </div>
        </div>
      </section>
      <RelatedServices exclude={["conduite", "massar"]} />
    </>
  );
}

import {
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  ListChecks,
  ChartNoAxesCombined,
  Languages,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLocale } from "../contexts/LocaleContext.jsx";
import {
  Breadcrumb,
  BrandPill,
  ExternalLink,
  SectionHeading,
  RelatedServices,
} from "../components/Shared.jsx";
import { candidateUrl, schoolUrl } from "../data/links.js";

export default function Massar() {
  const { t } = useLocale();
  const copy = t.services.massar;
  const icons = [BookOpen, ListChecks, ChartNoAxesCombined];
  return (
    <>
      <div className="container">
        <Breadcrumb title={copy.title} />
      </div>
      <section className="service-hero massar-hero">
        <div className="container service-hero-grid">
          <div className="service-hero-copy">
            <BrandPill brand="massar" />
            <p className="eyebrow">{copy.tag}</p>
            <h1>{copy.hero}</h1>
            <p className="hero-description">{copy.intro}</p>
            <div className="hero-actions">
              <ExternalLink href={candidateUrl} className="button button-blue">
                {t.massar.candidate}
                <ArrowUpRight size={18} />
              </ExternalLink>
              <ExternalLink href={schoolUrl} className="text-link">
                {t.massar.school}
                <ArrowUpRight size={17} />
              </ExternalLink>
            </div>
            <span className="bilingual-label">
              <Languages size={16} />
              {t.massar.bilingual}
            </span>
          </div>
          <div className="massar-preview">
            <div className="preview-top">
              <span className="preview-dots">
                <i />
                <i />
                <i />
              </span>
              <bdi>massar · auto-école</bdi>
            </div>
            <img
              src="/images/massar-quiz.webp"
              alt={copy.alt}
              width="760"
              height="560"
              fetchPriority="high"
            />
            <div className="preview-bottom">
              <BookOpen size={17} />
              {t.massar.space}
            </div>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow={t.massar.space}
          title={t.massar.previewTitle}
          description={t.massar.previewText}
        />
        <div className="feature-grid massar-features">
          {copy.features.map(([title, text], i) => {
            const FeatureIcon = icons[i];
            return (
              <article className="feature-card" key={title}>
                <span className="feature-icon">
                  <FeatureIcon size={23} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            );
          })}
        </div>
      </section>
      <section className="section school-section">
        <div className="container project-grid">
          <div>
            <p className="eyebrow">Massar · {t.common.tunisia}</p>
            <h2>{t.massar.forSchools}</h2>
            <p className="section-description">{t.massar.schoolText}</p>
            <ExternalLink href={schoolUrl} className="button button-blue">
              {t.massar.schoolAction}
              <ArrowUpRight size={18} />
            </ExternalLink>
          </div>
          <div className="massar-france-card">
            <BrandPill brand="lodene" />
            <h3>{t.massar.france}</h3>
            <p>{t.massar.franceText}</p>
            <Link className="text-link" to="/lodene/conduite">
              {t.massar.franceAction}
              <ArrowRight size={17} className="directional" />
            </Link>
          </div>
        </div>
      </section>
      <RelatedServices exclude={["massar"]} />
    </>
  );
}

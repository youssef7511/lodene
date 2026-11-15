import {
  ArrowRight,
  ArrowUpRight,
  CarFront,
  Tractor,
  HeartPulse,
  Package,
  Languages,
  MapPin,
  Mail,
  Phone,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLocale } from "../contexts/LocaleContext.jsx";
import { lodene, services } from "../data/catalog.js";
import { candidateUrl, schoolUrl } from "../data/links.js";

export function Brand({ compact = false, single }) {
  return (
    <span
      className={`brand-lockup ${compact ? "brand-compact" : ""}`}
      dir="ltr"
    >
      {single !== "lodene" && (
        <span className="brand-unit">
          <span className="massar-mark">
            <CarFront size={22} />
          </span>
          <span className="brand-word">
            Massar<small>AUTO-ÉCOLE</small>
          </span>
        </span>
      )}
      {!single && <span className="brand-cross">×</span>}
      {single !== "massar" && (
        <span className="brand-unit">
          <img
            className="lodene-mark"
            src="/images/lodene-logo.jpg"
            width="40"
            height="40"
            alt=""
          />
          <span className="brand-word lodene-word">
            LODENE<small>FORMATION</small>
          </span>
        </span>
      )}
    </span>
  );
}

export function ExternalLink({ href, children, className = "", ...props }) {
  const { t } = useLocale();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
      <span className="sr-only"> — {t.common.external}</span>
    </a>
  );
}

export function Icon({ name, ...props }) {
  const Component =
    {
      car: CarFront,
      tractor: Tractor,
      heart: HeartPulse,
      package: Package,
      languages: Languages,
    }[name] || CarFront;
  return <Component {...props} />;
}

export function BrandPill({ brand, location = true }) {
  const { t } = useLocale();
  return (
    <span className={`brand-pill ${brand}`}>
      <span className="status-dot" />
      <bdi>{brand === "massar" ? "Massar" : "LODENE"}</bdi>
      {location && (
        <>
          <span className="pill-divider" />
          <span>{brand === "massar" ? t.common.tunisia : t.common.france}</span>
        </>
      )}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  children,
  centered = false,
}) {
  return (
    <div className={`section-heading ${centered ? "centered" : ""}`}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export function ServiceCard({ service }) {
  const { t } = useLocale();
  const copy = t.services[service.id];
  return (
    <Link to={service.path} className={`service-card ${service.brand}`}>
      <div className={`service-card-image image-${service.id}`}>
        <img
          src={service.image}
          alt={copy.alt}
          loading="lazy"
          width="600"
          height="380"
        />
        <BrandPill brand={service.brand} />
        <span className="card-open">
          <ArrowUpRight size={21} />
        </span>
      </div>
      <div className="service-card-body">
        <p className="card-tag">{copy.tag}</p>
        <h3>{copy.title}</h3>
        <p>{copy.description}</p>
        <span className="card-link">
          {t.common.discover}
          <ArrowRight size={18} className="directional" />
        </span>
      </div>
    </Link>
  );
}

export function RelatedServices({ exclude = [] }) {
  const { t } = useLocale();
  const related = services.filter((s) => !exclude.includes(s.id)).slice(0, 3);
  return (
    <section className="section container">
      <SectionHeading eyebrow={t.common.next} title={t.common.related} />
      <div className="service-grid related-grid">
        {related.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </section>
  );
}

export function LodeneContact({ subject, compact = false }) {
  const { t } = useLocale();
  const mail = `mailto:${lodene.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
  return (
    <div className={`contact-actions ${compact ? "compact" : ""}`}>
      <a className="button button-green" href={mail}>
        <Mail size={18} />
        {t.common.email}
        <ArrowUpRight size={18} />
      </a>
      <a className="phone-link" href={`tel:${lodene.phone}`}>
        <Phone size={17} />
        <bdi>{lodene.phoneLabel}</bdi>
      </a>
    </div>
  );
}

export function ContactSection() {
  const { t } = useLocale();
  return (
    <section className="contact-section section" id="contact">
      <div className="container">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          description={t.contact.description}
        />
        <div className="contact-grid">
          <article className="contact-card massar">
            <Brand single="massar" />
            <h3>{t.contact.massarTitle}</h3>
            <p>{t.contact.massarText}</p>
            <div className="contact-actions">
              <ExternalLink href={candidateUrl} className="button button-blue">
                {t.contact.candidate}
                <ArrowUpRight size={18} />
              </ExternalLink>
              <ExternalLink href={schoolUrl} className="text-link">
                {t.contact.school}
                <ArrowUpRight size={16} />
              </ExternalLink>
            </div>
          </article>
          <article className="contact-card lodene">
            <Brand single="lodene" />
            <h3>{t.contact.lodeneTitle}</h3>
            <p>{t.contact.lodeneText}</p>
            <LodeneContact />
            <div className="location-line">
              <MapPin size={15} />
              {t.contact.location}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function CheckList({ items }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <span>
            <Check size={15} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Breadcrumb({ title }) {
  const { t } = useLocale();
  return (
    <nav className="breadcrumb" aria-label={t.nav.home}>
      <Link to="/">{t.nav.home}</Link>
      <span>/</span>
      <Link to="/#univers">{t.nav.univers}</Link>
      <span>/</span>
      <span aria-current="page">{title}</span>
    </nav>
  );
}

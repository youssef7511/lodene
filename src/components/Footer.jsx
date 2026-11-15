import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocale } from "../contexts/LocaleContext.jsx";
import { services, lodene } from "../data/catalog.js";
import { Brand, ExternalLink } from "./Shared.jsx";

export default function Footer() {
  const { t } = useLocale();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-intro">
            <Link to="/" aria-label={t.nav.home}>
              <Brand compact />
            </Link>
            <h3>{t.footer.tagline}</h3>
            <p>{t.footer.description}</p>
          </div>
          <div>
            <h4>{t.footer.univers}</h4>
            <ul>
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={s.path}>{t.services[s.id].title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{t.footer.links}</h4>
            <ul>
              <li>
                <Link to="/#collaboration">{t.nav.collaboration}</Link>
              </li>
              <li>
                <ExternalLink href={lodene.portal}>
                  {t.footer.portal}
                  <ArrowUpRight size={14} />
                </ExternalLink>
              </li>
              <li>
                <a href={`mailto:${lodene.email}`}>{t.footer.contact}</a>
              </li>
              <li>
                <Link to="/confidentialite">{t.footer.privacy}</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {t.footer.notice}
          </span>
          <a
            href="#main-content"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
              });
              document
                .getElementById("main-content")
                ?.focus({ preventScroll: true });
            }}
          >
            {t.footer.top}
            <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}

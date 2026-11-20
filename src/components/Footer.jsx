import { ArrowUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";
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
            <Link href="/" aria-label={t.nav.home}>
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
                  <Link href={s.path}>{t.services[s.id].title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{t.footer.links}</h4>
            <ul>
              <li>
                <Link href="/#collaboration">{t.nav.collaboration}</Link>
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
                <Link href="/confidentialite">{t.footer.privacy}</Link>
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
          >
            {t.footer.top}
            <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}

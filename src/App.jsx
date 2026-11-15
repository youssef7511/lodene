import { useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { LocaleProvider, useLocale } from "./contexts/LocaleContext.jsx";
import { services } from "./data/catalog.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Conduite from "./pages/Conduite.jsx";
import Massar from "./pages/Massar.jsx";
import Service from "./pages/Service.jsx";

function RouteEffects() {
  const { pathname, hash } = useLocation();
  const { t } = useLocale();
  useEffect(() => {
    const service = services.find((s) => s.path === pathname);
    document.title = service
      ? `${t.services[service.id].title} — Massar × LODENE`
      : t.pageTitle;
  }, [pathname, t]);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash)
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({ behavior: "instant" });
      else {
        window.scrollTo({ top: 0, behavior: "instant" });
        document.getElementById("main-content")?.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}

function Privacy() {
  const { t } = useLocale();
  return (
    <section className="container section prose-page">
      <p className="eyebrow">Massar × LODENE</p>
      <h1>{t.privacy.title}</h1>
      {t.privacy.paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
      <Link className="text-link" to="/">
        {t.nav.home}
        <ArrowRight className="directional" size={18} />
      </Link>
    </section>
  );
}

function NotFound() {
  const { t } = useLocale();
  return (
    <section className="container section not-found">
      <span className="error-number">404</span>
      <h1>{t.notFound.title}</h1>
      <p>{t.notFound.text}</p>
      <Link to="/" className="button button-navy">
        {t.notFound.action}
        <ArrowRight size={18} className="directional" />
      </Link>
    </section>
  );
}

function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <RouteEffects />
      <Header key={pathname} />
      <main id="main-content" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/massar" element={<Massar />} />
          <Route path="/lodene/conduite" element={<Conduite />} />
          {services
            .filter((s) => !["massar", "conduite"].includes(s.id))
            .map((s) => (
              <Route
                path={s.path}
                key={s.id}
                element={<Service service={s} />}
              />
            ))}
          <Route path="/confidentialite" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </LocaleProvider>
  );
}

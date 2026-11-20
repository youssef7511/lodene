"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLocale } from "../contexts/LocaleContext.jsx";

export default function Privacy() {
  const { t } = useLocale();

  return (
    <section className="container section prose-page">
      <p className="eyebrow">Massar × LODENE</p>
      <h1>{t.privacy.title}</h1>
      {t.privacy.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <Link className="text-link" href="/">
        {t.nav.home}
        <ArrowRight className="directional" size={18} />
      </Link>
    </section>
  );
}

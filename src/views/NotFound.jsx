"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLocale } from "../contexts/LocaleContext.jsx";

export default function NotFoundPage() {
  const { t } = useLocale();

  return (
    <section className="container section not-found">
      <span className="error-number">404</span>
      <h1>{t.notFound.title}</h1>
      <p>{t.notFound.text}</p>
      <Link href="/" className="button button-navy">
        {t.notFound.action}
        <ArrowRight size={18} className="directional" />
      </Link>
    </section>
  );
}

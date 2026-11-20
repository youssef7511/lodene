"use client";

import { createContext, useContext, useEffect, useState } from "react";
import fr from "../i18n/fr.js";
import ar from "../i18n/ar.js";

const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState("fr");
  useEffect(() => {
    try {
      if (localStorage.getItem("massar-lodene-language") === "ar") {
        queueMicrotask(() => setLocale("ar"));
      }
    } catch {
      /* Private browsing may disable storage. */
    }
  }, []);
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem("massar-lodene-language", locale);
    } catch {
      /* Private browsing may disable storage. */
    }
  }, [locale]);
  return (
    <LocaleContext.Provider
      value={{ locale, setLocale, t: locale === "ar" ? ar : fr }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

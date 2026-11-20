"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { LocaleProvider } from "../contexts/LocaleContext.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import NavigationEffects from "./NavigationEffects.jsx";
import { useSmoothScroll } from "./SmoothScroll.jsx";
import { useSectionLaunchMotion } from "./SectionLaunchMotion.jsx";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const mainRef = useRef(null);
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  useSmoothScroll(wrapperRef, contentRef, pathname);
  useSectionLaunchMotion(mainRef, pathname);

  return (
    <LocaleProvider>
      <NavigationEffects />
      <Header key={pathname} />
      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content" ref={contentRef}>
          <main id="main-content" tabIndex="-1" ref={mainRef}>
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </LocaleProvider>
  );
}

"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

// Run in the shell after its DOM refs are attached, before its section reveals.
export function useSmoothScroll(wrapperRef, contentRef, pathname) {
  useGSAP(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const header = document.querySelector(".site-header");
    if (!wrapper || !content || !header) return;

    const media = gsap.matchMedia();
    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      const { reduceMotion } = context.conditions;
      const html = document.documentElement;
      const updateHeaderHeight = () => {
        html.style.setProperty("--smooth-header-height", `${header.getBoundingClientRect().height}px`);
      };
      updateHeaderHeight();
      html.setAttribute("data-scroll-smoothing", "true");
      const observer = new ResizeObserver(updateHeaderHeight);
      observer.observe(header);

      ScrollSmoother.create({
        wrapper,
        content,
        // Zero keeps native scrolling while retaining one shared scroller.
        smooth: reduceMotion ? 0 : 0.85,
        smoothTouch: reduceMotion ? 0 : 0.1,
        effects: false,
        // The floating header and deliberate focus of the main landmark stay put.
        onFocusIn: (_self, event) => {
          if (!content.contains(event.target) || event.target.id === "main-content" ||
              event.target.hasAttribute("data-anchor-focus")) return false;
        },
      });

      const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        html.removeAttribute("data-scroll-smoothing");
        html.style.removeProperty("--smooth-header-height");
      };
    });
    // useGSAP/matchMedia revert the owned smoother, styles and listeners.
    return () => media.revert();
  }, { scope: wrapperRef, dependencies: [pathname], revertOnUpdate: true });
}

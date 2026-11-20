"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function sectionPieces(section) {
  const declaredPieces = Array.from(
    section.querySelectorAll("[data-section-piece]"),
  ).filter((piece) => piece.closest("section") === section);

  if (declaredPieces.length > 0) return declaredPieces;

  const contentRoot = section.matches(".container")
    ? section
    : section.querySelector(":scope > .container");

  return Array.from((contentRoot || section).children).filter(
    (piece) => !piece.matches("script, style"),
  );
}

export function useSectionLaunchMotion(scopeRef, routeKey) {
  useGSAP(
    () => {
      const root = scopeRef.current;
      if (!root) return;

      const sections = gsap.utils.toArray(
        ":scope > section:not([data-scroll-world]):not([data-own-section-motion])",
        root,
      );
      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 861px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, reduceMotion } = context.conditions;

          sections.forEach((section) => {
            const pieces = sectionPieces(section);
            if (pieces.length === 0) return;

            if (reduceMotion) {
              gsap.set(pieces, {
                autoAlpha: 1,
                clearProps: "transform,opacity,visibility",
              });
              return;
            }

            gsap.fromTo(
              pieces,
              {
                y: desktop ? 44 : 24,
                autoAlpha: 0,
              },
              {
                y: 0,
                autoAlpha: 1,
                duration: desktop ? 0.9 : 0.68,
                stagger: desktop ? 0.14 : 0.08,
                ease: "power3.out",
                clearProps: "transform,opacity,visibility",
                scrollTrigger: {
                  trigger: pieces[0],
                  start: desktop ? "top 84%" : "top 90%",
                  once: true,
                },
              },
            );
          });
        },
      );

      return () => media.revert();
    },
    {
      scope: scopeRef,
      dependencies: [routeKey],
      revertOnUpdate: true,
    },
  );
}

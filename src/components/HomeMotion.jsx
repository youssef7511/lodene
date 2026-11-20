"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HomeMotion({ collaborationRef, locale }) {
  useGSAP(
    () => {
      const section = collaborationRef.current;
      if (!section) return;

      const media = gsap.matchMedia();
      media.add(
        {
          stacked: "(max-width: 580px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
          wide: "(min-width: 581px)",
        },
        (context) => {
          const { stacked, reduceMotion } = context.conditions;
          // CSS and server markup always expose the complete, readable section.
          if (reduceMotion) return;

          const select = gsap.utils.selector(section);
          const cards = select("[data-collaboration-card]");
          const bridges = select("[data-collaboration-motion='bridge']");
          const join = select("[data-collaboration-motion='join']");
          const entrances = [];
          const reveal = {
            autoAlpha: 0,
            y: stacked ? 12 : 20,
            duration: 0.6,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
          };
          const timeline = gsap.timeline({
            scrollTrigger: { trigger: section, start: "top 80%", once: true },
          });
          entrances.push(timeline);
          timeline
            .from(select("[data-collaboration-motion='eyebrow']"), reveal, 0)
            .from(select("[data-collaboration-motion='title']"), reveal, 0.08)
            .from(select("[data-collaboration-motion='description']"), reveal, 0.15);

          if (stacked) {
            // Each card enters when it can actually be seen on a small screen.
            cards.forEach((card) => {
              entrances.push(gsap.from(card, {
                ...reveal,
                duration: 0.5,
                scrollTrigger: { trigger: card, start: "top 92%", once: true },
              }));
            });
          } else {
            const direction = locale === "ar" ? -1 : 1;
            timeline
              .from(cards, {
                ...reveal,
                x: (index) => (index === 0 ? -24 : 24) * direction,
                y: 0,
                duration: 0.7,
              }, 0.25)
              .from(bridges, {
                scaleX: 0,
                duration: 0.45,
                ease: "power2.inOut",
                clearProps: "transform",
              }, 0.55)
              .from(join, {
                scale: 0.6,
                opacity: 0,
                duration: 0.35,
                ease: "power2.out",
                clearProps: "transform,opacity",
              }, 0.85)
              .from(select("[data-collaboration-motion='note']"), {
                ...reveal,
                y: 6,
                duration: 0.35,
              }, 0.85);
          }

          // Keyboard navigation must never wait for, or chase, an entrance.
          const finishEntrance = () => entrances.forEach((animation) => animation.progress(1));
          section.addEventListener("focusin", finishEntrance);
          return () => section.removeEventListener("focusin", finishEntrance);
        },
      );

      const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        cancelAnimationFrame(frame);
        media.revert();
      };
    },
    { scope: collaborationRef, dependencies: [locale], revertOnUpdate: true },
  );

  return null;
}

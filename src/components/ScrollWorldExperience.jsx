"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { scrollPageTo } from "../utils/pageScroll.js";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STILLS = {
  cap: "/images/scroll-world/cap.webp",
  massar: "/images/scroll-world/massar.webp",
  conduite: "/images/scroll-world/conduite.webp",
  mobilite: "/images/scroll-world/mobilite.webp",
  competences: "/images/scroll-world/competences.webp",
  lodene: "/images/scroll-world/lodene.webp",
};

export default function ScrollWorldExperience({ content, locale }) {
  const rootRef = useRef(null);
  const sceneRefs = useRef([]);
  const jumpToRef = useRef(() => {});
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const root = rootRef.current;
      const scenes = sceneRefs.current.filter(Boolean);
      if (!root || scenes.length !== content.sections.length) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = scenes[0].querySelectorAll(".scroll-world-copy > *");

        gsap.fromTo(
          intro,
          { y: 36, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.1,
            delay: 0.15,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
          },
        );
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(scenes[0].querySelectorAll(".scroll-world-copy > *"), {
          autoAlpha: 1,
          clearProps: "transform,opacity,visibility",
        });
      });

      media.add(
        {
          cinematic: "(min-width: 861px) and (prefers-reduced-motion: no-preference)",
          staticMode: "(max-width: 860px), (prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { cinematic } = context.conditions;

          if (!cinematic) {
            gsap.set(scenes, { clearProps: "opacity,visibility,zIndex" });
            gsap.set(
              scenes.map((scene) => scene.querySelector("[data-world-media]")),
              { clearProps: "transform" },
            );
            scenes.forEach((scene) => {
              scene.inert = false;
            });
            let lastActive = 0;
            ScrollTrigger.create({
              trigger: root,
              start: "top top",
              end: "bottom bottom",
              onUpdate: (self) => {
                const nextActive = Math.min(
                  scenes.length - 1,
                  Math.round(self.progress * (scenes.length - 1)),
                );
                if (nextActive !== lastActive) {
                  lastActive = nextActive;
                  setActiveIndex(nextActive);
                }
              },
            });
            jumpToRef.current = (index) => {
              if (scenes[index]) scrollPageTo(scenes[index]);
            };
            return;
          }

          gsap.set(scenes, { autoAlpha: 0, zIndex: 1 });
          gsap.set(scenes[0], { autoAlpha: 1, zIndex: 2 });
          scenes.forEach((scene, index) => {
            scene.inert = index !== 0;
          });
          let lastActive = 0;

          // A native sticky element cannot follow the transformed smooth content.
          // The section already reserves the full journey's scroll distance.
          const stage = root.querySelector(".scroll-world-stage");
          gsap.set(stage, { position: "relative" });

          const trigger = ScrollTrigger.create({
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            pin: stage,
            pinSpacing: false,
            scrub: 0.55,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const raw = self.progress * (scenes.length - 1);
              const from = Math.min(scenes.length - 1, Math.floor(raw));
              const to = Math.min(scenes.length - 1, from + 1);
              const mix = raw - from;
              const nextActive = Math.min(
                scenes.length - 1,
                Math.round(raw),
              );

              scenes.forEach((scene, index) => {
                const opacity =
                  index === from ? 1 - mix : index === to ? mix : 0;
                const local = Math.min(1, Math.max(0, raw - index + 0.2));
                const mediaNode = scene.querySelector("[data-world-media]");

                gsap.set(scene, {
                  autoAlpha: opacity,
                  zIndex: index === to && mix > 0.5 ? 2 : 1,
                });
                gsap.set(mediaNode, {
                  scale: 1.025 + local * 0.09,
                  yPercent: -local * 1.5,
                });
              });

              if (nextActive !== lastActive) {
                lastActive = nextActive;
                scenes.forEach((scene, index) => {
                  scene.inert = index !== nextActive;
                });
                setActiveIndex(nextActive);
              }
            },
          });

          jumpToRef.current = (index) => {
            const distance = trigger.end - trigger.start;
            const ratio = index / Math.max(1, scenes.length - 1);
            scrollPageTo(trigger.start + distance * ratio);
          };
        },
      );

      let mounted = true;
      document.fonts?.ready.then(() => {
        if (mounted) ScrollTrigger.refresh();
      });
      return () => {
        mounted = false;
        media.revert();
      };
    },
    { scope: rootRef, dependencies: [locale], revertOnUpdate: true },
  );

  const jumpTo = (index) => jumpToRef.current(index);

  return (
    <section
      className="scroll-world"
      ref={rootRef}
      aria-label={content.ariaLabel}
      data-scroll-world
    >
      <div className="scroll-world-stage">
        <div className="scroll-world-scenes">
          {content.sections.map((section, index) => (
            <article
              className={`scroll-world-scene ${index === activeIndex ? "is-active" : ""}`}
              key={section.id}
              ref={(node) => {
                sceneRefs.current[index] = node;
              }}
            >
              <div className="scroll-world-media" data-world-media>
                <img
                  src={STILLS[section.id]}
                  alt={section.alt}
                  width="1800"
                  height="1200"
                  fetchPriority={index === 0 ? "high" : undefined}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
              <div className="scroll-world-scrim" aria-hidden="true" />
              <div className="scroll-world-copy container">
                <p className="scroll-world-count">
                  {String(index + 1).padStart(2, "0")} / {String(content.sections.length).padStart(2, "0")}
                </p>
                <p className="scroll-world-eyebrow">{section.eyebrow}</p>
                {index === 0 ? <h1>{section.title}</h1> : <h2>{section.title}</h2>}
                <p className="scroll-world-body">{section.body}</p>
                <ul className="scroll-world-tags" aria-label={section.tagsLabel}>
                  {section.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                {section.cta && (
                  <div className="scroll-world-actions">
                    <a className="button button-green" href={section.cta.href}>
                      {section.cta.label}
                      <ArrowRight size={18} className="directional" />
                    </a>
                    <Link className="hero-secondary" href={section.secondary.href}>
                      {section.secondary.label}
                    </Link>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <button
          className="scroll-world-hint"
          type="button"
          aria-label={content.scrollHint}
          onClick={() => jumpTo(Math.min(activeIndex + 1, content.sections.length - 1))}
        >
          <span className="sr-only">{content.scrollHint}</span>
          <ArrowDown size={18} aria-hidden="true" />
        </button>

        <div className="journey-chapter-nav" aria-label={content.chaptersLabel}>
          {content.sections.map((section, index) => (
            <button
              type="button"
              key={section.id}
              className={index === activeIndex ? "is-active" : ""}
              aria-current={index === activeIndex ? "step" : undefined}
              aria-label={`${index + 1}. ${section.label}`}
              onClick={() => jumpTo(index)}
            >
              <span>{section.label}</span>
              <i aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import { Compass, BookOpen, MessageCircle, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const icons = [Compass, BookOpen, MessageCircle];

export default function StepsTimeline({ content, locale, exploreLabel }) {
  const rootRef = useRef(null);

  useGSAP(() => {
    const section = rootRef.current;
    if (!section) return;
    const select = gsap.utils.selector(section);
    const media = gsap.matchMedia();
    media.add({
      mobile: "(max-width: 700px)",
      desktop: "(min-width: 701px)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      const { mobile, reduceMotion } = context.conditions;
      // The server and reduced-motion version show all three steps immediately.
      if (reduceMotion) return;
      const list = select(".steps-timeline")[0];
      gsap.fromTo(select(".timeline-progress"), { scaleY: 0 }, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: list,
          start: "top 72%",
          end: "bottom 72%",
          scrub: 0.3,
        },
      });

      const reveals = select(".timeline-step").map((row, index) => {
        const card = row.querySelector(".timeline-card");
        const node = row.querySelector(".timeline-node");
        const direction = (index % 2 === 0 ? -1 : 1) * (locale === "ar" ? -1 : 1);
        gsap.fromTo(node, { scale: 0.72, opacity: 0.35 }, {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "center 80%",
            end: "center 72%",
            scrub: 0.3,
          },
        });
        return gsap.from(card, {
          x: mobile ? 0 : direction * 24,
          y: mobile ? 16 : 24,
          opacity: 0.25,
          filter: mobile ? "none" : "blur(3px)",
          duration: 0.7,
          ease: "power3.out",
          clearProps: "transform,opacity,filter",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            once: true,
          },
        });
      });
      const showContent = () => reveals.forEach((reveal) => reveal.progress(1));
      section.addEventListener("focusin", showContent);
      return () => section.removeEventListener("focusin", showContent);
    });
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(frame);
      media.revert();
    };
  }, { scope: rootRef, dependencies: [locale], revertOnUpdate: true });

  return (
    <section id="etapes" className="section container steps-section"
      ref={rootRef} data-own-section-motion aria-labelledby="steps-title">
      <div className="section-heading centered">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="steps-title">{content.title}</h2>
        </div>
      </div>
      <div className="steps-timeline">
        <span className="timeline-track" aria-hidden="true">
          <span className="timeline-progress" />
        </span>
        <ol className="steps-timeline-list" role="list">
        {content.items.map(([title, text], index) => {
          const Icon = icons[index];
          return (
            <li className={`timeline-step timeline-step-${index + 1}`} key={index}>
              <span className="timeline-node" aria-hidden="true"><span /></span>
              <article className="timeline-card" aria-labelledby={`step-title-${index + 1}`}>
                <div className="timeline-card-meta">
                  <span className="timeline-icon" aria-hidden="true"><Icon size={23} /></span>
                  <span className="timeline-badge">{content.stepLabel} {String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 id={`step-title-${index + 1}`}>{title}</h3>
                <p>{text}</p>
              </article>
            </li>
          );
        })}
        </ol>
      </div>
      <Link href="/#univers" className="text-link steps-link">
        {exploreLabel}<ArrowUpRight size={18} className="directional" aria-hidden="true" />
      </Link>
    </section>
  );
}

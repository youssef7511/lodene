"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "../contexts/LocaleContext.jsx";
import { ServiceCard } from "./Shared.jsx";

export default function ServiceCarousel({ services, ariaLabel }) {
  const { t, locale } = useLocale();
  const viewportRef = useRef(null);
  const trackId = useId();
  const [position, setPosition] = useState({ current: 0, max: 0 });

  const measurePosition = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const items = Array.from(
      viewport.querySelectorAll("[data-carousel-item]"),
    );
    if (items.length === 0) {
      setPosition({ current: 0, max: 0 });
      return;
    }

    const track = viewport.querySelector(".service-carousel-track");
    const gap = track
      ? Number.parseFloat(window.getComputedStyle(track).columnGap) || 0
      : 0;
    const itemWidth = items[0].getBoundingClientRect().width;
    const visibleItems = Math.max(
      1,
      Math.round((viewport.clientWidth + gap) / (itemWidth + gap)),
    );
    const max = Math.max(0, items.length - visibleItems);
    const viewportBox = viewport.getBoundingClientRect();
    const isRtl = window.getComputedStyle(viewport).direction === "rtl";
    const viewportStart = isRtl ? viewportBox.right : viewportBox.left;

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    items.forEach((item, index) => {
      const itemBox = item.getBoundingClientRect();
      const itemStart = isRtl ? itemBox.right : itemBox.left;
      const distance = Math.abs(itemStart - viewportStart);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    const current = Math.min(max, nearestIndex);
    setPosition((previous) =>
      previous.current === current && previous.max === max
        ? previous
        : { current, max },
    );
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    let animationFrame = 0;
    const handleScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(measurePosition);
    };
    const resizeObserver = new ResizeObserver(measurePosition);

    viewport.addEventListener("scroll", handleScroll, { passive: true });
    resizeObserver.observe(viewport);
    animationFrame = requestAnimationFrame(measurePosition);

    return () => {
      cancelAnimationFrame(animationFrame);
      viewport.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, [locale, measurePosition, services.length]);

  const scrollToItem = (index) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const items = viewport.querySelectorAll("[data-carousel-item]");
    const targetIndex = Math.max(0, Math.min(position.max, index));
    const target = items[targetIndex];
    if (!target) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const viewportBox = viewport.getBoundingClientRect();
    const targetBox = target.getBoundingClientRect();
    const delta = locale === "ar"
      ? targetBox.right - viewportBox.right
      : targetBox.left - viewportBox.left;
    // Move only the carousel; scrollIntoView would also move the smooth page.
    viewport.scrollBy({
      left: delta,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setPosition((previous) => ({ ...previous, current: targetIndex }));
  };

  return (
    <div className="service-carousel" data-section-piece="body">
      <div
        ref={viewportRef}
        className="service-carousel-viewport"
        role="region"
        aria-label={ariaLabel}
      >
        <ul className="service-carousel-track" id={trackId}>
          {services.map((service) => (
            <li
              className="service-carousel-item"
              data-carousel-item
              key={service.id}
            >
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </div>

      {position.max > 0 && (
        <div className="service-carousel-controls">
          <button
            type="button"
            className="service-carousel-control previous"
            aria-label={t.univers.previous}
            aria-controls={trackId}
            disabled={position.current === 0}
            onClick={() => scrollToItem(position.current - 1)}
          >
            <ChevronLeft size={21} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="service-carousel-control next"
            aria-label={t.univers.next}
            aria-controls={trackId}
            disabled={position.current === position.max}
            onClick={() => scrollToItem(position.current + 1)}
          >
            <ChevronRight size={21} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}

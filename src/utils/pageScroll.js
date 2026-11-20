import { ScrollSmoother } from "gsap/ScrollSmoother";

export function scrollPageTo(target, smooth = true) {
  const animate = smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const smoother = ScrollSmoother.get();
  if (smoother) {
    const header = document.querySelector(".site-header");
    const inset = header ? parseFloat(window.getComputedStyle(header).top) || 0 : 0;
    const offset = (header?.getBoundingClientRect().height || 0) + inset + 20;
    smoother.scrollTo(target, animate, `top ${offset}px`);
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: animate ? "smooth" : "instant" });
  } else {
    target.scrollIntoView({ behavior: animate ? "smooth" : "instant", block: "start" });
  }
}

export function hashTarget(hash) {
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

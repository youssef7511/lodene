"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollPageTo, hashTarget } from "../utils/pageScroll.js";

function focusAnchor(target) {
  const hadTabIndex = target.hasAttribute("tabindex");
  if (!hadTabIndex) target.setAttribute("tabindex", "-1");
  target.setAttribute("data-anchor-focus", "");
  target.focus({ preventScroll: true });
  target.removeAttribute("data-anchor-focus");
  if (!hadTabIndex) target.removeAttribute("tabindex");
}

export default function NavigationEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const goToHash = (smooth = true) => {
      const target = hashTarget(window.location.hash);
      if (!target) return;
      focusAnchor(target);
      scrollPageTo(target.id === "main-content" ? 0 : target, smooth);
    };
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (window.location.hash) {
        goToHash(false);
      } else {
        scrollPageTo(0, false);
        document.getElementById("main-content")?.focus({ preventScroll: true });
      }
    });

    const onHashChange = () => goToHash();
    const onAnchorClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
          event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest?.("a[href]");
      if (!anchor || anchor.hasAttribute("download") ||
          (anchor.target && anchor.target !== "_self")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname ||
          url.search !== window.location.search || !url.hash || !hashTarget(url.hash)) return;

      event.preventDefault();
      const oldURL = window.location.href;
      if (url.href !== oldURL) window.history.pushState(window.history.state, "", url.href);
      // Keep the header's current-anchor indicator in sync with pushState.
      window.dispatchEvent(new HashChangeEvent("hashchange", { oldURL, newURL: url.href }));
    };
    document.addEventListener("click", onAnchorClick, true);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onAnchorClick, true);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [pathname]);

  return null;
}

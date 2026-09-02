"use client";

import { useEffect } from "react";

/**
 * Restores the homepage to the section the user came from after returning from
 * a dedicated page via the GrowthYard logo.
 *
 * The logo navigates to "/?section=<id>". On arrival we instantly jump to that
 * element (overriding the global smooth-scroll, so the scroll-linked intro is
 * never replayed) and then strip the query from the URL so normal Back/Forward
 * and future visits are unaffected.
 */
export default function HomeSectionRestore() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get("section");
    if (!section) return;

    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "instant", block: "start" });
    }
    // Clean the URL — remove the one-shot query signal (keeps history tidy).
    if (window.location.search) {
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return null;
}

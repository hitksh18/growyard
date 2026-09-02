/**
 * Return-navigation helpers.
 *
 * When a user opens a dedicated section page (e.g. /work) from a specific
 * homepage section, we remember that section so the GrowthYard logo can take
 * them straight back to the same homepage section without replaying the intro.
 *
 * The stored value is one-shot: it is cleared the moment it is consumed by the
 * logo, so a later direct visit to a dedicated page falls back to the normal
 * homepage entry point.
 */
const KEY = "gy:return-section";

const VALID_SECTIONS = new Set([
  "about",
  "services",
  "work",
  "process",
  "team",
  "faq",
  "contact",
]);

/** Record the homepage section a user is leaving from. */
export function rememberReturnSection(section: string): void {
  if (!VALID_SECTIONS.has(section)) return;
  try {
    sessionStorage.setItem(KEY, section);
  } catch {
    /* sessionStorage unavailable — return nav degrades to normal entry */
  }
}

/** Read and clear the remembered section (returns null when none/invalid). */
export function consumeReturnSection(): string | null {
  try {
    const value = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    if (value && VALID_SECTIONS.has(value)) return value;
  } catch {
    /* ignore */
  }
  return null;
}

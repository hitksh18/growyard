"use client";

import Link from "next/link";
import { footerNavigation } from "@/data/navigation";
import { BRAND } from "@/lib/constants";
import Container from "@/components/ui/Container";

function handleHashScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (href.startsWith("/#") || href.startsWith("#")) {
    e.preventDefault();
    const id = href.includes("#") ? href.split("#")[1] : "";
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id) {
      const el = document.getElementById(id);
      if (el) {
        const headerOffset = 72;
        const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
    if (window.location.hash) history.replaceState(null, "", window.location.pathname);
  }
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-paper/10 bg-ink text-paper">
      <Container className="pt-20 lg:pt-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Brand */}
          <div className="flex flex-col lg:col-span-6">
            <Link href="/" className="flex items-center gap-2.5 text-paper">
              <span className="text-sm font-semibold uppercase tracking-[0.08em]">
                GROWYARD
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 hover:scale-125"
                aria-hidden="true"
              />
            </Link>
            <p className="mt-6 max-w-xs text-base leading-relaxed text-paper/50">
              {BRAND.footerTagline}
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="group mt-8 inline-flex items-center gap-3 text-lg font-medium text-paper transition-colors duration-300 hover:text-accent sm:text-xl"
            >
              <span className="link-underline">{BRAND.email}</span>
              <span
                aria-hidden="true"
                className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </a>
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-paper/30">
              {BRAND.location}
            </p>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6">
            {footerNavigation.map((col) => (
              <div key={col.title}>
                <h3 className="label-uppercase text-paper/30">
                  {col.title}
                </h3>
                <ul className="mt-6 flex flex-col gap-4">
                  {col.links.map((link, i) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={(e) => handleHashScroll(e, link.href)}
                        className="group inline-flex items-baseline gap-2.5 text-sm text-paper/70 transition-colors duration-300 hover:text-accent"
                      >
                        <span
                          className="text-[0.55rem] font-medium tracking-[0.2em] text-paper/25 transition-colors duration-300 group-hover:text-accent/70"
                          aria-hidden="true"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="link-underline">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Giant editorial wordmark */}
      <div className="mt-20 select-none overflow-hidden px-6 sm:px-8" aria-hidden="true">
        <p className="whitespace-nowrap text-center font-medium leading-none tracking-tight text-paper/[0.04]">
          <span style={{ fontSize: "clamp(4rem, 13vw, 13rem)" }}>GROWYARD</span>
        </p>
      </div>

      <div className="border-t border-paper/10">
        <Container className="flex flex-col items-start justify-between gap-5 py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-paper/30">
            © {year} {BRAND.name}. All rights reserved.
          </p>
          <Link
            href="#top"
            onClick={(e) => handleHashScroll(e, "#top")}
            aria-label="Back to top"
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-paper/30 transition-colors duration-300 hover:text-paper"
          >
            Back to top
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-paper/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent group-hover:bg-accent group-hover:text-ink"
            >
              ↑
            </span>
          </Link>
        </Container>
      </div>
    </footer>
  );
}
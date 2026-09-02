"use client";

import Link from "next/link";
import Image from "next/image";
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

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v15H0V8zm8 0h4.8v2.05h.07c.67-1.27 2.3-2.6 4.73-2.6 5.06 0 6 3.33 6 7.67V23h-5v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V23H8V8z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-paper/10 bg-ink text-paper">
      <Container className="pt-12 sm:pt-16 lg:pt-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
          {/* Brand */}
          <div className="flex flex-col md:col-span-5 lg:col-span-6 xl:col-span-5">
            <Link href="/" className="flex items-center gap-2.5 text-paper">
              <span className="text-sm font-semibold uppercase tracking-[0.08em]">
                {BRAND.name}
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 hover:scale-125"
                aria-hidden="true"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/50">
              {BRAND.footerTagline}
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="group mt-5 inline-flex items-center gap-3 text-base font-medium text-paper transition-colors duration-300 hover:text-accent sm:text-lg"
            >
              <span className="link-underline">{BRAND.email}</span>
              <Image
                src="/favicon.png"
                alt=""
                width={22}
                height={22}
                className="h-[22px] w-[22px] shrink-0 rounded-md opacity-90"
              />
              <span
                aria-hidden="true"
                className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </a>
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-[0.6rem] uppercase tracking-[0.18em] text-paper/30">
                {BRAND.location}
              </p>
              <div className="flex items-center gap-3 sm:gap-4">
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="text-paper/40 transition-colors duration-300 hover:text-accent"
                >
                  <InstagramIcon />
                </a>
                <a
                  href={BRAND.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="text-paper/40 transition-colors duration-300 hover:text-accent"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7 lg:col-span-6 xl:col-span-7">
            {footerNavigation.map((col) => (
              <div key={col.title}>
                <h3 className="label-uppercase text-paper/30">
                  {col.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={(e) => handleHashScroll(e, link.href)}
                        className="group inline-flex items-baseline gap-2.5 text-sm text-paper/70 transition-colors duration-300 hover:text-accent"
                      >
                        <span
                          className="text-[0.85rem] leading-none text-paper/25 transition-colors duration-300 group-hover:text-accent/70"
                          aria-hidden="true"
                        >
                          •
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

      {/* Giant editorial wordmark — smaller, sitting closer to the bottom edge */}
      <div className="mt-8 select-none overflow-hidden px-6 pb-1 sm:mt-10 sm:px-8" aria-hidden="true">
        <p className="whitespace-nowrap text-center font-medium leading-none tracking-tight text-paper/[0.06]">
          <span style={{ fontSize: "clamp(2.6rem, 8vw, 7rem)" }}>{BRAND.name}</span>
        </p>
      </div>

      <div className="border-t border-paper/10">
        <Container className="flex flex-col items-start justify-between gap-4 py-4 sm:flex-row sm:items-center">
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
              className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/15 text-paper/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent group-hover:bg-accent group-hover:text-ink"
            >
              ↑
            </span>
          </Link>
        </Container>
      </div>
    </footer>
  );
}

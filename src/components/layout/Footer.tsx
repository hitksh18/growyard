import Link from "next/link";
import { footerNavigation } from "@/data/navigation";
import { BRAND } from "@/lib/constants";
import Container from "@/components/ui/Container";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-paper/10 bg-ink text-paper">
      <Container className="pt-16 lg:pt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-2 text-paper">
              <span className="text-sm font-semibold uppercase tracking-[0.08em]">
                GrowthYard
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent"
                aria-hidden="true"
              />
            </Link>
            <p className="mt-5 max-w-xs text-base leading-relaxed text-paper/50">
              {BRAND.footerTagline}
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="mt-6 inline-flex items-center gap-2 text-sm text-paper/70 transition-colors hover:text-accent"
            >
              {BRAND.email}
              <span aria-hidden="true">↗</span>
            </a>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-paper/30">
              {BRAND.location}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-7">
            {footerNavigation.map((col) => (
              <div key={col.title}>
                <h3 className="label-uppercase text-paper/35">
                  {col.title}
                </h3>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-2 text-sm text-paper/70 transition-colors hover:text-accent"
                      >
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                          {link.label}
                        </span>
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
      <div className="mt-16 select-none px-6 sm:px-8" aria-hidden="true">
        <p className="whitespace-nowrap text-center font-medium leading-none tracking-tight text-paper/[0.04]">
          <span style={{ fontSize: "clamp(4rem, 13vw, 13rem)" }}>GrowthYard</span>
        </p>
      </div>

      <div className="border-t border-paper/10">
        <Container className="flex flex-col items-start justify-between gap-3 py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-paper/35">
            © {year} {BRAND.name}. All rights reserved.
          </p>
          <Link
            href="#top"
            className="text-xs uppercase tracking-[0.18em] text-paper/35 transition-colors hover:text-accent"
          >
            Back to top ↑
          </Link>
        </Container>
      </div>
    </footer>
  );
}
"use client";

import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import Reveal from "@/components/animations/Reveal";
import { rememberReturnSection } from "@/lib/returnNav";
import { services } from "@/data/services";

export default function ServicesPreview() {
  return (
    <section id="services" className="scroll-mt-24 pt-10 pb-16 sm:pt-12 sm:pb-16 lg:pt-12 lg:pb-20">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading label="What we do" number="02">
            Everything your brand needs
            <br className="hidden md:block" /> to move forward.
          </SectionHeading>
          <Reveal delay={0.1}>
            <Link
              href="/services"
              onClick={() => rememberReturnSection("services")}
              className="group inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-paper/70 transition-colors hover:text-accent"
            >
              <span className="link-underline">All services</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 lg:mt-20">
          <ul className="flex flex-col">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.slug} distance={16} delay={i * 0.03}>
                  <li className="group relative border-t border-paper/10 transition-colors duration-500 last:border-b hover:bg-paper/[0.025]">
                    {/* Left accent rail */}
                    <span
                      className="absolute inset-y-0 left-0 w-px scale-y-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-y-100"
                      aria-hidden="true"
                    />

                    <Link
                      href={`/services#${service.slug}`}
                      onClick={() => rememberReturnSection("services")}
                      className="grid grid-cols-12 items-center gap-4 py-7 pl-4 sm:py-8"
                    >
                      <span
                        className="col-span-2 text-[0.65rem] font-medium tracking-[0.2em] text-paper/35 transition-colors duration-300 group-hover:text-accent sm:col-span-1"
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span className="col-span-10 flex items-center gap-4 sm:col-span-6">
                        <Icon
                          className="h-5 w-5 shrink-0 text-paper/30 transition-all duration-300 group-hover:-rotate-6 group-hover:text-accent"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                        <span className="text-xl font-medium tracking-tight text-paper transition-all duration-300 group-hover:translate-x-2 group-hover:text-accent sm:text-3xl">
                          {service.title}
                        </span>
                      </span>

                      <span className="col-span-10 col-start-3 hidden overflow-hidden sm:col-span-4 sm:col-start-8 sm:block">
                        <span className="block max-h-0 translate-y-1 text-sm leading-relaxed text-paper/50 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:translate-y-0 group-hover:opacity-100">
                          {service.description}
                        </span>
                      </span>

                      <span
                        className="hidden items-center justify-center text-paper/40 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-accent sm:flex"
                        aria-hidden="true"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 transition-colors duration-300 group-hover:border-accent/50 group-hover:bg-accent/10">
                          →
                        </span>
                      </span>
                    </Link>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
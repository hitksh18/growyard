import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import Reveal from "@/components/animations/Reveal";
import { featuredProjects } from "@/data/projects";
import { cn } from "@/lib/utils";

const aspectVariants = ["aspect-[16/10]", "aspect-[4/3]", "aspect-[16/9]"];

export default function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-24 py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading label="Selected work" number="03">
            Work that speaks for itself.
          </SectionHeading>
          <Reveal delay={0.1}>
            <Button href="/work" variant="ghost" iconDirection="up">
              View all work
            </Button>
          </Reveal>
        </div>

        {/* Editorial preview — 3 curated projects, intentional rhythm */}
        <div className="mt-10 flex flex-col gap-10 sm:mt-12 sm:gap-12 lg:mt-14 lg:gap-16">
          {featuredProjects.map((project, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={project.slug}
                className="group grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-10"
              >
                {/* Media — with small index + blue indicator */}
                <div
                  className={cn(
                    "relative lg:col-span-7",
                    flip && "lg:order-2 lg:col-start-6"
                  )}
                >
                  {/* Small project index — subtle blue active indicator */}
                  <div className="mb-3 hidden items-center gap-3 lg:mb-4 lg:flex" aria-hidden="true">
                    <span className="text-[0.60rem] font-medium tracking-[0.20em] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-8 bg-accent/60 transition-all duration-500 group-hover:w-12 group-hover:bg-accent" />
                    <span className="text-[0.60rem] tracking-[0.16em] text-paper/30">/ 03</span>
                  </div>

                  {/* Ghost depth layer — subtle */}
                  <div
                    className="pointer-events-none absolute -bottom-4 -left-4 hidden h-full w-full opacity-[0.07] lg:block"
                    aria-hidden="true"
                  >
                    <Image
                      src={project.image}
                      alt=""
                      aria-hidden="true"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <Reveal distance={24}>
                    <Link href="/work" className="group block">
                      <div
                        className={cn(
                          "relative overflow-hidden border border-paper/10 bg-charcoal",
                          aspectVariants[i % aspectVariants.length]
                        )}
                      >
                        <Image
                          src={project.image}
                          alt={project.alt}
                          fill
                          sizes="(min-width: 1024px) 55vw, 100vw"
                          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        {/* Oversized project number — subtle watermark */}
                        <span
                          className="serif-em pointer-events-none absolute -bottom-4 right-3 select-none text-[5rem] leading-none text-paper/[0.07] transition-colors duration-500 group-hover:text-paper/[0.10] sm:text-[6rem] lg:text-[7rem]"
                          aria-hidden="true"
                        >
                          {project.index}
                        </span>

                        {/* Hover CTA */}
                        <span className="absolute bottom-5 left-5 flex h-10 w-10 items-center justify-center -translate-x-1 rounded-full bg-accent text-ink opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:bottom-6 sm:left-6 sm:h-11 sm:w-11">
                          <span aria-hidden="true" className="text-sm">
                            →
                          </span>
                        </span>

                        {/* Folio caption */}
                        <span className="absolute left-5 top-5 text-[0.60rem] uppercase tracking-[0.22em] text-paper/70 sm:left-6 sm:top-6">
                          {project.client}
                        </span>
                        <span className="absolute right-5 top-5 text-[0.60rem] uppercase tracking-[0.22em] text-paper/50 sm:right-6 sm:top-6">
                          {project.year}
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                </div>

                {/* Editorial text column — vertically aligned */}
                <div
                  className={cn(
                    "flex flex-col justify-center lg:col-span-4",
                    flip ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-9"
                  )}
                >
                  <Reveal delay={0.1}>
                    {/* Mobile index */}
                    <span className="mb-3 flex items-center gap-2 text-[0.60rem] tracking-[0.18em] text-paper/40 lg:hidden" aria-hidden="true">
                      <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span className="h-px w-6 bg-accent/50" />
                      <span>0{featuredProjects.length}</span>
                    </span>

                    {/* Accent line — extends on hover */}
                    <span
                      className="block h-px w-10 bg-accent transition-all duration-500 group-hover:w-16"
                      aria-hidden="true"
                    />

                    <h3
                      className="mt-5 text-balance font-medium uppercase tracking-tight text-paper"
                      style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)", lineHeight: 1.05 }}
                    >
                      {project.title}
                    </h3>

                    <p className="mt-2 text-[0.62rem] uppercase tracking-[0.20em] text-paper/40">
                      {project.category}
                    </p>

                    <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-paper/55 sm:text-base">
                      {project.summary}
                    </p>

                    <p className="mt-5 text-[0.68rem] uppercase tracking-[0.16em] text-paper/30">
                      {project.services.join(" · ")}
                    </p>

                    <Link
                      href="/work"
                      className="group/link mt-7 inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-paper/70 transition-colors hover:text-accent"
                    >
                      <span className="link-underline">View case study</span>
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover/link:translate-x-1"
                      >
                        ↗
                      </span>
                    </Link>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA — premium conclusion, not detached button */}
        <div className="mt-14 sm:mt-16 lg:mt-20">
          <div className="border-t border-paper/10" aria-hidden="true" />
          <Reveal delay={0.06} className="flex flex-col items-center">
            <Link
              href="/work"
              className="group flex w-full items-center justify-between gap-6 py-7 sm:py-8"
            >
              <span className="flex items-center gap-4">
                <span className="hidden h-px w-12 bg-paper/15 transition-all duration-500 group-hover:w-16 group-hover:bg-accent/50 sm:block" aria-hidden="true" />
                <span className="text-[0.70rem] font-medium uppercase tracking-[0.22em] text-paper/60 transition-colors duration-300 group-hover:text-paper">
                  View all work
                </span>
              </span>
              <span className="flex items-center gap-3">
                <span className="hidden text-[0.70rem] tracking-[0.14em] text-paper/30 sm:block">Explore the complete portfolio</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 bg-transparent text-paper/70 transition-all duration-300 group-hover:translate-x-1 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
          <div className="border-b border-paper/10" aria-hidden="true" />
        </div>
      </Container>
    </section>
  );
}

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
    <section id="work" className="scroll-mt-24 py-24 lg:py-36">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading label="Selected work" number="01">
            Work that speaks for itself.
          </SectionHeading>
          <Reveal delay={0.1}>
            <Button href="/work" variant="ghost" iconDirection="up">
              View all work
            </Button>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-28 lg:gap-40">
          {featuredProjects.map((project, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={project.slug}
                className="group grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:items-center lg:gap-8"
              >
                {/* Media */}
                <div
                  className={cn(
                    "relative lg:col-span-7",
                    flip && "lg:order-2 lg:col-start-6"
                  )}
                >
                  {/* Ghost depth layer */}
                  <div
                    className="pointer-events-none absolute -bottom-5 -left-5 hidden h-full w-full opacity-20 lg:block"
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

                  <Reveal distance={40}>
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
                          className="object-cover transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-hover:translate-x-1"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                        {/* Large index etching */}
                        <span
                          className="serif-em pointer-events-none absolute -bottom-6 right-3 select-none text-[6rem] leading-none text-paper/10 transition-colors duration-500 group-hover:text-paper/15 lg:text-[7.5rem]"
                          aria-hidden="true"
                        >
                          {project.index}
                        </span>

                        {/* Hover CTA */}
                        <span className="absolute bottom-6 left-6 flex h-11 w-11 items-center justify-center -translate-x-2 rounded-full bg-accent text-ink opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                          <span aria-hidden="true">→</span>
                        </span>

                        {/* Folio caption */}
                        <span className="absolute left-6 top-6 text-[0.6rem] uppercase tracking-[0.22em] text-paper/70">
                          {project.client}
                        </span>
                        <span className="absolute right-6 top-6 text-[0.6rem] uppercase tracking-[0.22em] text-paper/50">
                          {project.year}
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                </div>

                {/* Editorial text column */}
                <div
                  className={cn(
                    "lg:col-span-4",
                    flip ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-9"
                  )}
                >
                  <Reveal delay={0.12}>
                    {/* Accent grow line */}
                    <span
                      className="block h-px w-12 bg-accent transition-all duration-700 group-hover:w-20"
                      aria-hidden="true"
                    />

                    <h3
                      className="mt-6 text-balance font-medium tracking-tight text-paper"
                      style={{ fontSize: "clamp(1.9rem, 3.4vw, 3.2rem)", lineHeight: 1.04 }}
                    >
                      {project.title}
                    </h3>

                    <p className="mt-2 text-[0.62rem] uppercase tracking-[0.2em] text-paper/40">
                      {project.category}
                    </p>

                    <p className="mt-6 max-w-md text-base leading-relaxed text-paper/55">
                      {project.summary}
                    </p>

                    <p className="mt-6 text-xs uppercase tracking-[0.16em] text-paper/30">
                      {project.services.join(" · ")}
                    </p>

                    <Link
                      href="/work"
                      className="group mt-8 inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-paper/70 transition-colors hover:text-accent"
                    >
                      <span className="link-underline">View case study</span>
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
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
      </Container>
    </section>
  );
}
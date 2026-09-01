import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import Reveal from "@/components/animations/Reveal";
import { featuredProjects } from "@/data/projects";
import { cn } from "@/lib/utils";

export default function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-24 py-24 lg:py-32">
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

        <div className="mt-20 flex flex-col gap-24 lg:gap-32">
          {featuredProjects.map((project, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={project.slug}
                className={cn(
                  "grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8",
                  flip && "lg:[direction:rtl]"
                )}
              >
                <div className="lg:col-span-7 lg:[direction:ltr]">
                  <Reveal distance={36}>
                    <Link href="/work" className="group block">
                      <div className="relative aspect-[16/11] overflow-hidden border border-paper/10 bg-charcoal">
                        <Image
                          src={project.image}
                          alt={project.alt}
                          fill
                          sizes="(min-width: 1024px) 55vw, 100vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <span className="absolute bottom-5 left-5 flex h-10 w-10 -translate-x-2 items-center justify-center rounded-full bg-accent text-ink opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                          <span aria-hidden="true">→</span>
                        </span>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-[0.62rem] uppercase tracking-[0.2em] text-paper/40">
                        <span>
                          {project.index} — {project.category}
                        </span>
                        <span>{project.year}</span>
                      </div>
                    </Link>
                  </Reveal>
                </div>

                <div className="lg:col-span-4 lg:col-start-9 lg:[direction:ltr]">
                  <Reveal delay={0.12}>
                    <h3 className="text-3xl font-medium tracking-tight text-paper sm:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-paper/55">
                      {project.summary}
                    </p>
                    <p className="mt-6 text-xs uppercase tracking-[0.16em] text-paper/30">
                      {project.services.join(" · ")}
                    </p>
                    <Link
                      href="/work"
                      className="group mt-6 inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-paper/70 transition-colors hover:text-accent"
                    >
                      <span className="link-underline">View case study</span>
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
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
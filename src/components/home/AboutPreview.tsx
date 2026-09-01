import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import Container from "@/components/ui/Container";
import Reveal from "@/components/animations/Reveal";
import Parallax from "@/components/animations/Parallax";
import { projects } from "@/data/projects";

const pillars = [
  {
    index: "01",
    title: "Strategy",
    line: "Sharp market and channel thinking that points every play in the right direction.",
  },
  {
    index: "02",
    title: "Creativity",
    line: "Bold identity and campaigns engineered for attention — and for memory.",
  },
  {
    index: "03",
    title: "Execution",
    line: "Disciplined delivery that turns plans into launches, content and growth.",
  },
  {
    index: "04",
    title: "Growth",
    line: "Measurement and iteration that keep the momentum compounding long-term.",
  },
];

export default function AboutPreview() {
  const tall = projects[2];
  const small = projects[0];

  return (
    <section id="about" className="scroll-mt-24 py-24 lg:py-36">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Editorial image composition */}
          <div className="relative lg:col-span-5">
            <Parallax offset={40}>
              <Reveal distance={36}>
                <div className="relative border border-paper/10">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={tall.image}
                      alt={tall.alt}
                      fill
                      sizes="(min-width: 1024px) 38vw, 100vw"
                      className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                    <span className="absolute bottom-6 left-6 text-[0.6rem] uppercase tracking-[0.22em] text-paper/70">
                      The yard — {tall.client}
                    </span>
                  </div>
                </div>
              </Reveal>
            </Parallax>

            {/* Overlapping second art */}
            <Reveal delay={0.15} className="relative z-10 -mt-16 ml-auto w-[62%] lg:-mt-20 lg:mr-8">
              <div className="border border-paper/10 bg-ink p-2">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={small.image}
                    alt={small.alt}
                    fill
                    sizes="(min-width: 1024px) 24vw, 55vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Wordmark + manifesto */}
          <div className="flex flex-col lg:col-span-7">
            <Reveal>
              <SectionLabel number="03">About</SectionLabel>
            </Reveal>

            <Reveal delay={0.06}>
              <h2
                className="mt-8 text-balance font-medium tracking-tight text-paper"
                style={{ fontSize: "clamp(2rem, 4.4vw, 3.9rem)", lineHeight: 1.06 }}
              >
                Not another agency.{" "}
                <span className="serif-em">Your growth partner.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-paper/60 sm:text-lg">
                GrowthYard is an independent, creatively-led team that treats
                your growth as our own — sharp strategy, bold creative and
                disciplined marketing under one roof.
              </p>
            </Reveal>

            {/* Manifesto pillars — editorial, not cards */}
            <Reveal delay={0.15}>
              <div className="mt-12 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                {pillars.map((p) => (
                  <div
                    key={p.title}
                    className="group border-t border-paper/10 py-7 transition-colors duration-500"
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        className="serif-em text-2xl leading-none text-paper/25 transition-colors duration-500 group-hover:text-accent/70"
                        aria-hidden="true"
                      >
                        {p.index}
                      </span>
                      <h3 className="text-lg font-medium tracking-tight text-paper">
                        {p.title}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/50">
                      {p.line}
                    </p>
                    <span
                      className="mt-5 block h-px w-8 bg-accent transition-all duration-500 group-hover:w-16"
                      aria-hidden="true"
                    />
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-12">
                <Button href="/about" variant="outline">
                  More about us
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
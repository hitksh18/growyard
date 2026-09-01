import SectionLabel from "@/components/ui/SectionLabel";
import Container from "@/components/ui/Container";
import Reveal from "@/components/animations/Reveal";
import { resultPillars } from "@/data/results";

export default function Results() {
  return (
    <section id="results" className="scroll-mt-24 border-y border-paper/10 py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="relative lg:col-span-7">
            <Reveal>
              <SectionLabel number="04">How we measure</SectionLabel>
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                className="mt-8 text-balance font-medium tracking-tight text-paper"
                style={{ fontSize: "clamp(2rem, 4.8vw, 4.1rem)", lineHeight: 1.05 }}
              >
                Creativity is great.{" "}
                <span className="serif-em">Results are better.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-md text-base leading-relaxed text-paper/55">
                We don&rsquo;t print numbers we can&rsquo;t stand behind. Instead,
                every engagement runs on a clear framework for what growth means
                — and how it gets measured.
              </p>
            </Reveal>
          </div>

          <div className="grid-bg relative flex items-end opacity-60 lg:col-span-5">
            <Reveal delay={0.15}>
              <p className="serif-em pb-2 text-right text-2xl leading-snug text-paper/40 sm:text-3xl">
                “The plan is
                <br />
                only as good as
                <br />
                the number after it.”
              </p>
            </Reveal>
          </div>
        </div>

        {/* Working framework — editorial rows, no invented stats */}
        <div className="mt-16 lg:mt-20">
          <div className="flex flex-col">
            {resultPillars.map((pillar, i) => (
              <Reveal key={pillar.index} distance={18} delay={i * 0.04}>
                <div className="group grid grid-cols-1 gap-3 border-t border-paper/10 py-8 transition-colors duration-500 hover:bg-paper/[0.015] sm:grid-cols-12 sm:items-baseline sm:gap-6">
                  <span
                    className="serif-em text-xl leading-none text-paper/25 transition-colors duration-500 group-hover:text-accent/70 sm:col-span-1"
                    aria-hidden="true"
                  >
                    {pillar.index}
                  </span>
                  <h3 className="text-lg font-medium tracking-tight text-paper sm:col-span-3 sm:text-xl">
                    {pillar.label}
                  </h3>
                  <p className="text-base leading-relaxed text-paper/70 sm:col-span-5">
                    {pillar.statement}
                  </p>
                  <p className="text-sm leading-relaxed text-paper/40 sm:col-span-3 sm:text-right">
                    {pillar.measure}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="border-t border-paper/10 pb-2 pt-5 text-[0.62rem] uppercase tracking-[0.2em] text-paper/25">
            Published the moment it&rsquo;s verified — nothing printed early.
          </p>
        </div>
      </Container>
    </section>
  );
}
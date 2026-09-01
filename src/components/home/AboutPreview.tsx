import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import Container from "@/components/ui/Container";
import Reveal from "@/components/animations/Reveal";

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
  return (
    <section id="about" className="scroll-mt-24 border-y border-paper/10 py-24 lg:py-32">
      <Container className="grid-bg">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionLabel number="03">About</SectionLabel>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.05}>
              <h2 className="max-w-4xl text-balance font-medium tracking-tight text-paper" style={{ fontSize: "clamp(2.1rem, 4.8vw, 4rem)", lineHeight: 1.06 }}>
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
            <Reveal delay={0.18}>
              <div className="mt-10">
                <Button href="/about" variant="outline">
                  More about us
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-20 grid grid-cols-1 gap-px bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div key={p.title} className="group bg-ink p-8 transition-colors duration-500 hover:bg-charcoal/60">
                <span className="text-[0.62rem] font-medium tracking-[0.2em] text-accent" aria-hidden="true">
                  {p.index}
                </span>
                <h3 className="mt-6 text-xl font-medium tracking-tight text-paper">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/50">
                  {p.line}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
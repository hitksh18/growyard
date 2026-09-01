import SectionHeading from "@/components/ui/SectionHeading";
import SectionLabel from "@/components/ui/SectionLabel";
import Container from "@/components/ui/Container";
import Reveal from "@/components/animations/Reveal";
import { testimonials } from "@/data/testimonials";

const real = testimonials.filter(
  (t) => !t.id.startsWith("placeholder") && t.author !== "Client Name"
);

export default function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24 py-24 lg:py-32">
      <Container className="grid-bg">
        {real.length > 0 ? (
          <>
            <SectionHeading label="Kind words" number="07">
              Trusted by people who measure.
            </SectionHeading>
            <div className="mt-16 flex flex-col gap-8">
              {real.map((t, i) => (
                <Reveal key={t.id} delay={i * 0.05}>
                  <figure className="grid grid-cols-1 gap-6 border-y border-paper/10 py-10 lg:grid-cols-12 lg:py-14">
                    <span
                      className="text-5xl leading-none text-accent"
                      aria-hidden="true"
                    >
                      “
                    </span>
                    <blockquote className="lg:col-span-8">
                      <p className="text-xl leading-relaxed text-paper/85 sm:text-2xl">
                        {t.quote}
                      </p>
                    </blockquote>
                    <figcaption className="flex items-start gap-4 lg:col-span-3 lg:justify-end">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-paper/15 text-sm font-medium text-paper/70">
                        {t.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-paper">
                          {t.author}
                        </div>
                        <div className="mt-0.5 text-xs text-paper/50">
                          {t.role}
                        </div>
                        <div className="text-xs uppercase tracking-[0.14em] text-paper/35">
                          {t.company}
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionLabel number="07">Kind words</SectionLabel>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal delay={0.08}>
                <h2
                  className="text-balance font-medium tracking-tight text-paper"
                  style={{ fontSize: "clamp(1.6rem, 4vw, 3.4rem)", lineHeight: 1.1 }}
                >
                  Real client stories land here.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/55">
                  We don&rsquo;t print testimonials until clients have actually
                  said them. The first chapter is being written — and your brand
                  could be in it.
                </p>
              </Reveal>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
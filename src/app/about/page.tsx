import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import TeamSection from "@/components/about/TeamSection";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "About",
  description:
    "GrowthYard is an independent creative & growth agency. Not another agency — your growth partner.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <section className="border-t border-paper/10 py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <FadeIn className="lg:col-span-4">
              <p className="label-uppercase flex items-center gap-3 text-paper/50">
                <span className="h-px w-8 bg-accent" aria-hidden="true" />
                Story
              </p>
            </FadeIn>
            <div className="lg:col-span-7">
              <FadeIn delay={0.05}>
                <p className="text-lg leading-relaxed text-paper/70 sm:text-xl">
                  GrowthYard exists because most agencies sell hours, not
                  outcomes. We pair strategy with creativity and a sharp focus
                  on measurable growth — so every decision pulls toward a
                  result you can point to.
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 max-w-xl leading-relaxed text-paper/50">
                  Independent, senior, and hands-on. You work directly with the
                  people shaping your brand, from first positioning to ongoing
                  optimisation.
                </p>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      <TeamSection number="02" />
    </>
  );
}
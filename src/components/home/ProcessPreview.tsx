import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import Reveal from "@/components/animations/Reveal";
import ProcessTimeline from "@/components/process/ProcessTimeline";
import { processSteps } from "@/data/process";

export default function ProcessPreview() {
  return (
    <section id="process" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading label="How we work" number="05">
            From first idea to real growth.
          </SectionHeading>
          <Reveal delay={0.1}>
            <Link
              href="/process"
              className="group inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-paper/70 transition-colors hover:text-accent"
            >
              <span className="link-underline">Full process</span>
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
          <ProcessTimeline steps={processSteps} />
        </div>
      </Container>
    </section>
  );
}
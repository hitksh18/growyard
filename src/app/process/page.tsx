import type { Metadata } from "next";
import ProcessTimeline from "@/components/process/ProcessTimeline";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import { processSteps } from "@/data/process";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Discovery, strategy, design, development, launch and growth — the GrowthYard process engineered for measurable results.",
};

export default function ProcessPage() {
  return (
    <section className="pb-28 pt-36 lg:pt-44">
      <Container>
        <SectionHeading
          label="Process"
          number="01"
          description="A proven sequence — worn in, not invented. It keeps every engagement moving from insight to measurable growth."
        >
          A process engineered for results.
        </SectionHeading>

        <div className="mt-20 lg:mt-28">
          <ProcessTimeline steps={processSteps} />
        </div>

        <div className="mt-24 border-t border-paper/10 pt-12 lg:mt-32">
          <p className="max-w-xl text-sm leading-relaxed text-paper/50">
            Most engagements touch every stage. Projects follow a clear slice —
            we&apos;ll agree the starting point together based on where you are
            today.
          </p>
        </div>
      </Container>
    </section>
  );
}
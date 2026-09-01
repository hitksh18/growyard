import type { ProcessStep as ProcessStepType } from "@/types/content";
import Reveal from "@/components/animations/Reveal";

interface ProcessStepProps {
  step: ProcessStepType;
}

export default function ProcessStep({ step }: ProcessStepProps) {
  return (
    <Reveal distance={28}>
      <div className="grid grid-cols-12 items-start gap-x-6">
        <span
          className="serif-em col-span-12 leading-none text-paper/15 transition-colors duration-500 hover:text-accent/60 sm:col-span-3 lg:col-span-2"
          style={{ fontSize: "clamp(4.5rem, 7vw, 7rem)" }}
          aria-hidden="true"
        >
          {step.index}
        </span>
        <div className="col-span-12 sm:col-span-9 lg:col-span-10 sm:pt-2">
          <h3 className="text-2xl font-medium tracking-tight text-paper sm:text-3xl">
            {step.title}
          </h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-paper/55">
            {step.description}
          </p>
          {step.deliverables && (
            <p className="mt-5 text-[0.65rem] uppercase tracking-[0.18em] text-paper/35">
              {step.deliverables.join("  ·  ")}
            </p>
          )}
        </div>
      </div>
    </Reveal>
  );
}
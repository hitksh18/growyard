import type { ProcessStep } from "@/types/content";

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Discovery",
    description:
      "We dig into your business, market and goals. Understanding the problem before we touch the solution.",
    deliverables: ["Deep-dive workshops", "Market & audience research", "Goal alignment"],
  },
  {
    index: "02",
    title: "Strategy",
    description:
      "We translate insight into a clear plan — positioning, channels and the measures that define success.",
    deliverables: ["Positioning", "Growth roadmap", "Success metrics"],
  },
  {
    index: "03",
    title: "Design",
    description:
      "Creativity comes alive. We shape the identity, message and experience that differentiate your brand.",
    deliverables: ["Visual identity", "Creative direction", "Campaign concepts"],
  },
  {
    index: "04",
    title: "Development",
    description:
      "We build — websites, campaigns, systems — engineered to feel premium and perform reliably.",
    deliverables: ["Web builds", "Campaign assets", "Integration & automation"],
  },
  {
    index: "05",
    title: "Launch",
    description:
      "A considered launch across the right channels, timed and measured for maximum impact.",
    deliverables: ["Channel rollout", "Go-live support", "Launch comms"],
  },
  {
    index: "06",
    title: "Growth",
    description:
      "We learn from the data and iterate — compounding results through continuous optimisation.",
    deliverables: ["Performance review", "Ongoing optimisation", "Scale what works"],
  },
];

export const homeProcessSteps: ProcessStep[] = processSteps.slice(0, 4);

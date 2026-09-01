"use client";

import { useRef, useState, useEffect } from "react";
import { animate, useReducedMotion, useInView } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Container from "@/components/ui/Container";
import Reveal from "@/components/animations/Reveal";
import { resultsMetrics } from "@/data/results";

function MetricValue({
  value,
  suffix,
}: {
  value: string;
  suffix?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const numeric = Number(value);
  const isPlaceholder = Number.isNaN(numeric);
  const [display, setDisplay] = useState(() => (isPlaceholder ? value : "0"));

  useEffect(() => {
    if (reduce || isPlaceholder || !isInView || !ref.current) return;
    const controls = animate(0, numeric, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(0)),
    });
    return () => controls.stop();
  }, [isInView, numeric, reduce, isPlaceholder]);

  return (
    <span ref={ref} className={isPlaceholder ? "text-paper/30" : ""}>
      {display}
      {suffix && !isPlaceholder ? suffix : ""}
    </span>
  );
}

export default function Results() {
  return (
    <section id="results" className="scroll-mt-24 py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel number="04">Track record</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                className="mt-8 text-balance font-medium tracking-tight text-paper"
                style={{ fontSize: "clamp(2.1rem, 5vw, 4.2rem)", lineHeight: 1.05 }}
              >
                Creativity is great.{" "}
                <span className="serif-em">Results are better.</span>
              </h2>
            </Reveal>
          </div>
          <div className="flex items-end lg:col-span-5">
            <Reveal delay={0.15}>
              <p className="max-w-sm text-base leading-relaxed text-paper/55 lg:ml-auto">
                Every brand we build and every campaign we run is measured
                against growth that matters. Figures are reported transparently
                as hard data lands.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-20 grid grid-cols-2 gap-px border-y border-paper/10 bg-paper/10 lg:grid-cols-4">
            {resultsMetrics.map((metric) => (
              <div
                key={metric.label}
                className="group bg-ink px-2 py-10 text-center transition-colors duration-500 hover:bg-charcoal/50 sm:py-14"
              >
                <div
                  className="font-medium tracking-tight text-paper"
                  style={{ fontSize: "clamp(2.4rem, 4.5vw, 4rem)" }}
                >
                  <MetricValue value={metric.value} suffix={metric.suffix} />
                </div>
                <p className="mt-4 text-[0.62rem] uppercase tracking-[0.2em] text-paper/45">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
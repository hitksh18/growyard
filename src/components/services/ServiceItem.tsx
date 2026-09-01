import type { Service } from "@/types/service";
import Reveal from "@/components/animations/Reveal";

interface ServiceItemProps {
  service: Service;
  index: number;
}

export default function ServiceItem({ service, index }: ServiceItemProps) {
  const Icon = service.icon;

  return (
    <Reveal distance={28} delay={index * 0.05}>
      <article
        id={service.slug}
        className="group flex h-full scroll-mt-28 flex-col border border-paper/10 bg-paper/[0.015] transition-colors duration-500 hover:border-accent/35 hover:bg-paper/[0.04]"
      >
        <div className="flex items-center justify-between border-b border-paper/10 p-6">
          <span className="flex h-10 w-10 items-center justify-center text-accent">
            <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <span
            className="label-uppercase text-paper/30 transition-colors duration-300 group-hover:text-accent"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6 lg:p-8">
          <h3 className="text-xl font-medium tracking-tight text-paper sm:text-2xl">
            {service.title}
          </h3>
          <p className="mt-2 text-[0.62rem] uppercase tracking-[0.18em] text-accent">
            {service.tagline}
          </p>
          <p className="mt-5 text-sm leading-relaxed text-paper/60">
            {service.description}
          </p>
          <ul className="mt-auto flex flex-col gap-2 border-t border-paper/10 pt-5 sm:mt-8">
            {service.deliverables.map((d) => (
              <li
                key={d}
                className="flex items-baseline gap-3 text-sm text-paper/50"
              >
                <span className="text-accent/70" aria-hidden="true">
                  —
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}
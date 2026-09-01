import Image from "next/image";
import type { Project } from "@/types/project";
import Reveal from "@/components/animations/Reveal";

interface CaseStudyHeaderProps {
  project: Project;
}

export default function CaseStudyHeader({ project }: CaseStudyHeaderProps) {
  return (
    <header>
      <Reveal>
        <p className="label-uppercase mb-6 flex items-center gap-3 text-paper/50">
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          {project.category}
        </p>
        <h1 className="line-clamp-3 max-w-4xl text-balance text-4xl font-medium tracking-tight text-paper sm:text-5xl md:text-6xl">
          {project.title}
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg bg-charcoal/40">
          <Image
            src={project.image}
            alt={project.alt}
            fill
            sizes="100vw"
            className="object-cover opacity-80"
            priority
          />
        </div>
      </Reveal>
    </header>
  );
}

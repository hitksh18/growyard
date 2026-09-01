import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types/project";
import Reveal from "@/components/animations/Reveal";

interface ProjectCardProps {
  project: Project;
  aspect?: string;
  index?: number;
}

export default function ProjectCard({
  project,
  aspect = "aspect-[4/3]",
  index = 0,
}: ProjectCardProps) {
  return (
    <Reveal distance={28} delay={(index % 2) * 0.08}>
      <Link
        href={`/work#${project.slug}`}
        className="group block"
        aria-label={`${project.title} — ${project.category}`}
      >
        <div
          className={`relative overflow-hidden ${aspect} border border-paper/10 bg-charcoal`}
        >
          <Image
            src={project.image}
            alt={project.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute left-5 top-4 text-[0.6rem] uppercase tracking-[0.2em] text-paper/70">
            {project.index}
          </span>
          <span className="absolute bottom-5 right-5 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-accent text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span aria-hidden="true">→</span>
          </span>
        </div>
        <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-paper/10 pt-4">
          <div>
            <h3 className="text-xl font-medium tracking-tight text-paper">
              {project.title}
            </h3>
            <p className="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-paper/40">
              {project.category}
            </p>
          </div>
          <span className="text-[0.62rem] uppercase tracking-[0.18em] text-paper/35">
            {project.year}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-paper/50">
          {project.summary}
        </p>
      </Link>
    </Reveal>
  );
}
import type { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
  className?: string;
}

export default function ProjectGrid({ projects, className }: ProjectGridProps) {
  return (
    <div className={className}>
      {projects.map((project, i) => (
        <div key={project.slug} id={project.slug} className="scroll-mt-28">
          <ProjectCard project={project} index={i} />
        </div>
      ))}
    </div>
  );
}

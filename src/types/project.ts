export type ProjectCategory =
  | "Brand Strategy"
  | "Web Design"
  | "Performance Marketing"
  | "Social Media"
  | "Content Creation"
  | "SEO & Growth"
  | "Creative & Design";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  index: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  client: string;
  year: string;
  summary: string;
  description: string;
  services: string[];
  metrics: ProjectMetric[];
  image: string;
  alt: string;
  featured: boolean;
}

export interface ProjectImage {
  src: string;
  alt: string;
}

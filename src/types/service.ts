import type { LucideIcon } from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: LucideIcon;
}

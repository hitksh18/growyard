export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
  deliverables?: string[];
}

export interface InsightPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  image?: string;
}

export interface Metric {
  label: string;
  value: string;
  suffix?: string;
  note?: string;
}

export interface NavItem {
  label: string;
  href: string;
  /** Home section this item refers to (for scroll-spy). */
  section?: string;
}

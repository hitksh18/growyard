import type { NavItem } from "@/types/content";

export const navigation: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

export const footerNavigation: {
  title: string;
  links: NavItem[];
}[] = [
  {
    title: "Navigate",
    links: [
      { label: "Work", href: "/work" },
      { label: "Services", href: "/services" },
      { label: "Process", href: "/process" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/about#team" },
    ],
  },
  {
    title: "Contact",
    links: [{ label: "Contact", href: "/contact" }],
  },
];

import type { NavItem } from "@/types/content";

export const navigation: NavItem[] = [
  { label: "About", href: "/about", section: "about" },
  { label: "Services", href: "/services", section: "services" },
  { label: "Work", href: "/work", section: "work" },
  { label: "Process", href: "/process", section: "process" },
  { label: "Team", href: "/about#team", section: "team" },
  { label: "FAQ", href: "/#faq", section: "faq" },
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

export const BRAND = {
  name: "GROWTHYARD",
  tagline: "Growth Focused. Results Driven.",
  footerTagline: "Design. Creativity. Growth.",
  email: "hello@growyard.agency",
  location: "Working worldwide",
};

export const ROUTES = {
  home: "/",
  work: "/work",
  services: "/services",
  about: "/about",
  process: "/process",
  contact: "/contact",
  insights: "/insights",
} as const;

export const ANIMATION = {
  duration: {
    fast: 0.4,
    base: 0.6,
    slow: 0.9,
  },
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
} as const;

// Legacy inline ease used by scroll-driven timeline
export const EASE_BEZIER: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1440,
} as const;

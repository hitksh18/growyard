/**
 * Results / framework.
 *
 * GROWYARD reports honestly. No statistics are listed here until real,
 * verifiable figures exist — instead this drives a "how we measure" section
 * built on real practice, not invented numbers. When actual metrics land,
 * swap any statement for the figure (e.g. { label: "Brands scaled", value: "12" }).
 */
export interface ResultPillar {
  index: string;
  label: string;
  statement: string;
  measure: string;
}

export const resultPillars: ResultPillar[] = [
  {
    index: "01",
    label: "Brand Growth",
    statement: "Brands built to compound awareness and desire — not spike and fade.",
    measure: "Tracked through search intent, repeat purchase and share of voice.",
  },
  {
    index: "02",
    label: "Creative Impact",
    statement: "Campaigns engineered to earn attention, memory and conversation.",
    measure: "Judged on saves, shares and mention quality — not vanity reach.",
  },
  {
    index: "03",
    label: "Digital Growth",
    statement: "Websites and channels tuned to convert curious visitors into customers.",
    measure: "Measured on traffic quality, conversion rate and acquisition cost.",
  },
  {
    index: "04",
    label: "Measurable Progress",
    statement: "A shared reporting rhythm that turns data into the next confident decision.",
    measure: "Reviewed on a cadence you can see — and hold us accountable to.",
  },
];
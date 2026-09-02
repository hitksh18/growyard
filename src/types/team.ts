export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  /** Primary designation shown on the portfolio hero (e.g. "Founder"). */
  roleLabel?: string;
  bio: string;
  image: string;
  focus: string[];
  email?: string;
  linkedin?: string;
  /** Longer editorial bio shown on the member's portfolio page. */
  longBio?: string;
  /** Area expertise displayed on the portfolio page. */
  expertise?: string[];
  /** Demo projects tied to this member. */
  projects?: { name: string; note?: string }[];
  /** Work history shown on the portfolio page (most recent first). */
  experience?: { role: string; company: string; period: string }[];
  /** Physical location shown on the portfolio page. */
  location?: string;
}

export interface TeamSection {
  label: string;
  heading: string;
  members: TeamMember[];
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  /** Primary designation shown on the portfolio hero (e.g. "Founder"). */
  roleLabel?: string;
  bio: string;
  /**
   * Portrait image. When present it is shown as an immersive object-cover panel
   * (portrait presentation). Empty string renders a typographic placeholder.
   * Paths are relative to /public, e.g. "/images/team/sri-charan.jpg".
   */
  image: string;
  focus: string[];
  email?: string;
  linkedin?: string;
  /**
   * Resume / portfolio image (e.g. a PDF preview, CV, or one-page folio).
   * Shown object-contain so the document stays fully readable without
   * stretching or distortion. Empty string renders a typographic placeholder.
   */
  resumeImage?: string;
  /** Longer editorial bio shown on the member's portfolio page. */
  longBio?: string;
  /** Area expertise displayed on the portfolio page. */
  expertise?: string[];
  /** Demo projects tied to this member. */
  projects?: { name: string; note?: string; href?: string }[];
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

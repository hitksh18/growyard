export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  focus: string[];
  email?: string;
  linkedin?: string;
}

export interface TeamSection {
  label: string;
  heading: string;
  members: TeamMember[];
}

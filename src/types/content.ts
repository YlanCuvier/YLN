export interface SocialLink {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  headline: string;
  bio: string;
  skills: string[];
  socials: SocialLink[];
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  tech: string[];
  image: string;
  repoUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  availability?: string;
}

export type SocialLinks = {
  email: string;
  linkedin: string;
  github: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  status?: string;
  liveUrl?: string;
  githubUrl?: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  tech: string[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type Portfolio = {
  name: string;
  role: string;
  availability: string;
  headline: string;
  summary: string;
  stackLine: string;
  nav: NavItem[];
  socials: SocialLinks;
  projects: Project[];
  experience: Experience[];
  skills: SkillGroup[];
  about: {
    headline: string;
    intro: string;
    background: string;
    whatIBuild: string;
    currentFocus: string;
  };
  contact: {
    headline: string;
  };
};

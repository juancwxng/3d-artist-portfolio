export type TagVariant = "interior" | "exterior" | "neutral";

export interface ProjectTag {
  label: string;
  variant: TagVariant;
}

export interface Project {
  id: string;
  name: string;
  sub: string;
  year: string;
  tags: ProjectTag[];
  imgStyle: string;
  imgLabel: string;
  featured: boolean;
}

export interface ProcessStep {
  num: string;
  phase: string;
  name: string;
  desc: string;
}

export interface AboutStat {
  num: string;
  label: string;
}

export interface HeroStat {
  num: string;
  label: string;
}

export interface HeroDiscipline {
  label: string;
  active: boolean;
}

export interface ContactMetaItem {
  label: string;
  value: string;
  href?: string;
}

export interface NavLink {
  label: string;
  href: string;
  cta?: boolean;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  label: string;
  handle: string;
  href: string;
  desc?: string;
}

export interface Profile {
  name: string;
  title: string;
  email: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
}

export interface Job {
  company: string;
  title?: string;
  location?: string;
  dates?: string;
  bullets: string[];
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  date: string;
}

export interface ResumeData {
  profile: Profile;
  experience: Job[];
  skills: string[];
  education: Education[];
}

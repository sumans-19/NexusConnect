export interface User {
  id: string;
  name: string;
  avatar: string;
  aiHint: string;
  headline: string;
  email: string;
  password?: string; // Should not be sent to client
  skills: string[];
  interests: string[];
  availability: string;
  projects: { name: string; role: string }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  image: string;
  aiHint: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  aiHint: string;
}


export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  features?: string[];
  benefits?: string[];
  icon: string;
  category: 'AI' | 'Web' | 'App' | 'Immersive' | 'Cloud' | 'Security';
}

export interface Project {
  id: number;
  title: string;
  description: string;
  categories: string[];
  imageUrl: string;
  videoId: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  url: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime?: string;
  content?: string[];
  tags?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

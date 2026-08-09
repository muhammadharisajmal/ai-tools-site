// ======================================================
// AI STUDY HUB
// Blog Types
// ======================================================

export interface BlogPost {
    id: number;
  
    slug: string;
  
    title: string;
  
    excerpt: string;
  
    content: string;
  
    author: string;
  
    category: string;
  
    coverImage: string;
  
    publishedAt: string;
  
    readingTime: string;
  
    featured: boolean;
  
    tags: string[];
  }
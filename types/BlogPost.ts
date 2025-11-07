export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  category: string;
  image: string;
  featuredImage?: string;
  readTime: number;
  tags: string[];
  // SEO Fields
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  slug?: string;
  canonicalUrl?: string;
}
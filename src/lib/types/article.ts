export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  author: string;
  read_time: number | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
  status: string;
  read_count: number;
  published_at: string;
  reading_time: string;
  image_url: string;
  author_name: string;
  pinterest_posted: boolean;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[] | null;
  canonical_url: string | null;
  og_image: string | null;
}

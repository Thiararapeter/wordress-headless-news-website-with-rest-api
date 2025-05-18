export interface WordPressPost {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
    "wp:term"?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
  link: string;
  categories: number[];
  slug: string;
  acf?: Record<string, any>;
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface BookmarkedPost {
  id: number;
  title: string;
  excerpt: string;
  imageUrl?: string;
  date: string;
  categoryName?: string;
  slug: string;
  link: string;
}

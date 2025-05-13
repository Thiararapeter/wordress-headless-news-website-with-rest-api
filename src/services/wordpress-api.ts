
import { WordPressCategory, WordPressPost } from "@/types/wordpress";

// Set this to your WordPress site URL
const API_URL = "https://techcrunch.com/wp-json/wp/v2";

export async function fetchPosts(
  page = 1,
  perPage = 10,
  categoryId?: number
): Promise<WordPressPost[]> {
  try {
    let url = `${API_URL}/posts?_embed=true&per_page=${perPage}&page=${page}`;
    
    if (categoryId) {
      url += `&categories=${categoryId}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching WordPress posts:", error);
    return [];
  }
}

export async function fetchTopHeadlines(count = 5): Promise<WordPressPost[]> {
  try {
    const url = `${API_URL}/posts?_embed=true&per_page=${count}&sticky=true`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error fetching headlines: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    return [];
  }
}

export async function fetchCategories(): Promise<WordPressCategory[]> {
  try {
    const url = `${API_URL}/categories?per_page=100`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching WordPress categories:", error);
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const url = `${API_URL}/posts?slug=${slug}&_embed=true`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error fetching post: ${response.statusText}`);
    }
    
    const posts = await response.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error("Error fetching WordPress post by slug:", error);
    return null;
  }
}

export async function searchPosts(query: string): Promise<WordPressPost[]> {
  try {
    const url = `${API_URL}/posts?_embed=true&search=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error searching posts: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error searching WordPress posts:", error);
    return [];
  }
}

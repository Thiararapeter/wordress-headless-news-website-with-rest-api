
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCategories, fetchPosts } from "@/services/wordpress-api";
import { WordPressCategory, WordPressPost } from "@/types/wordpress";
import CategoryTabs from "@/components/CategoryTabs";
import ArticleList from "@/components/ArticleList";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<WordPressCategory | null>(null);
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategory = async () => {
      if (!slug) return;
      
      setIsLoading(true);
      try {
        // First, get all categories and find the matching one by slug
        const categories = await fetchCategories();
        const matchedCategory = categories.find(cat => cat.slug === slug) || null;
        
        setCategory(matchedCategory);
        
        // If we found a matching category, fetch its posts
        if (matchedCategory) {
          const categoryPosts = await fetchPosts(1, 10, matchedCategory.id);
          setPosts(categoryPosts);
        }
      } catch (error) {
        console.error('Error loading category:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategory();
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 animate-pulse">
        <div className="h-10 bg-gray-200 w-40 mb-8 rounded"></div>
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-48 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <p>The category you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <CategoryTabs activeCategoryId={category.id} />
      
      <h1 className="text-2xl font-bold mb-6">{category.name}</h1>
      
      <ArticleList initialPosts={posts} categoryId={category.id} />
    </div>
  );
};

export default CategoryPage;

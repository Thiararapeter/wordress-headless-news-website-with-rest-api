
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "@/services/wordpress-api";
import { WordPressCategory } from "@/types/wordpress";

const CategoryTabs = ({ activeCategoryId }: { activeCategoryId?: number }) => {
  const [categories, setCategories] = useState<WordPressCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const fetchedCategories = await fetchCategories();
        // Filter categories with posts and limit to top 8
        const filteredCategories = fetchedCategories
          .filter(cat => cat.count > 0)
          .slice(0, 8);
        
        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCategories();
  }, []);

  const handleCategoryClick = (categoryId: number, slug: string) => {
    navigate(`/category/${slug}`);
  };

  if (isLoading) {
    return (
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex space-x-2 py-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div 
              key={index}
              className="h-8 rounded-full bg-gray-200 animate-pulse min-w-[80px]"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto no-scrollbar">
      <div className="flex space-x-2 py-4">
        <button
          onClick={() => navigate('/')}
          className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
            !activeCategoryId 
              ? 'bg-news-primary text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-news-secondary'
          }`}
        >
          All
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id, category.slug)}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
              activeCategoryId === category.id 
                ? 'bg-news-primary text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-news-secondary'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;

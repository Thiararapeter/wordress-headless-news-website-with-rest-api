
import { useEffect, useState } from "react";
import { fetchPosts } from "@/services/wordpress-api";
import { WordPressPost } from "@/types/wordpress";
import { formatDate } from "@/utils/date-utils";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SortingOptions } from "@/components/SortingOptions";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type SortType = "newest" | "oldest" | "trending";

const FeaturedPage = () => {
  const [featuredPosts, setFeaturedPosts] = useState<WordPressPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<WordPressPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeSort, setActiveSort] = useState<SortType>("newest");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    const loadFeaturedPosts = async () => {
      setIsLoading(true);
      try {
        const posts = await fetchPosts(1, 10);
        setFeaturedPosts(posts);
        setFilteredPosts(posts);
      } catch (error) {
        console.error("Error loading featured posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedPosts();
  }, []);

  useEffect(() => {
    let sorted = [...featuredPosts];
    
    // Apply sorting
    if (activeSort === "newest") {
      sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (activeSort === "oldest") {
      sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (activeSort === "trending") {
      // For demo purposes, we'll sort by title length as a proxy for "trending"
      sorted.sort((a, b) => b.title.rendered.length - a.title.rendered.length);
    }
    
    // Apply category filtering
    if (selectedCategories.length > 0) {
      sorted = sorted.filter(post => {
        const postCategories = post._embedded?.["wp:term"]?.[0] || [];
        return postCategories.some(category => 
          selectedCategories.includes(category.slug || "")
        );
      });
    }
    
    setFilteredPosts(sorted);
  }, [featuredPosts, selectedCategories, activeSort]);

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const handleSortChange = (sortType: SortType) => {
    setActiveSort(sortType);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 animate-pulse">
        <h1 className="text-2xl font-bold mb-6">Featured Articles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-64 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Featured Articles</h1>
        
        <div className="w-full md:w-auto">
          <Collapsible 
            open={isFiltersOpen} 
            onOpenChange={setIsFiltersOpen}
            className="w-full md:w-auto"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Filters & Sort</p>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ChevronDown className={`h-4 w-4 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                <SortingOptions activeSort={activeSort} onSortChange={handleSortChange} />
                <Separator className="my-2" />
                <CategoryFilter onCategoryChange={handleCategoryChange} />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => {
            const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || '';
            const categoryName = post._embedded?.["wp:term"]?.[0]?.[0]?.name || '';
            
            return (
              <Link key={post.id} to={`/article/${post.slug}`} className="block group bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                <div className="relative">
                  <AspectRatio ratio={16/9}>
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200"></div>
                    )}
                  </AspectRatio>
                  
                  {categoryName && (
                    <span className="absolute top-2 left-2 bg-news-accent text-white text-xs px-2 py-1 rounded-md">
                      {categoryName}
                    </span>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 
                    className="font-bold mb-2 group-hover:text-news-accent transition-colors line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  
                  <div 
                    className="text-gray-600 text-sm mb-3 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  
                  <div className="text-news-secondary text-sm">
                    {formatDate(post.date)}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No articles match your filters. Try changing your selection.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedCategories([]);
                setActiveSort("newest");
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedPage;

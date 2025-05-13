
import { useEffect, useState } from "react";
import { fetchPosts } from "@/services/wordpress-api";
import { WordPressPost } from "@/types/wordpress";
import { formatDate } from "@/utils/date-utils";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const FeaturedPage = () => {
  const [featuredPosts, setFeaturedPosts] = useState<WordPressPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedPosts = async () => {
      setIsLoading(true);
      try {
        const posts = await fetchPosts(1, 10);
        setFeaturedPosts(posts);
      } catch (error) {
        console.error("Error loading featured posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedPosts();
  }, []);

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
      <h1 className="text-2xl font-bold mb-6">Featured Articles</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredPosts.slice(0, 1).map(post => {
          const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || '';
          const categoryName = post._embedded?.["wp:term"]?.[0]?.[0]?.name || '';
          
          return (
            <div key={post.id} className="md:col-span-2">
              <Link to={`/article/${post.slug}`} className="block group">
                <div className="relative rounded-xl overflow-hidden">
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
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                    {categoryName && (
                      <span className="bg-news-accent text-white text-xs px-2 py-1 rounded-md mb-3 w-fit">
                        {categoryName}
                      </span>
                    )}
                    
                    <h2 
                      className="text-white text-2xl font-bold mb-2 group-hover:text-news-accent transition-colors"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    
                    <div className="text-white/80 text-sm">
                      {formatDate(post.date)}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
        
        {featuredPosts.slice(1, 7).map(post => {
          const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || '';
          const categoryName = post._embedded?.["wp:term"]?.[0]?.[0]?.name || '';
          
          return (
            <Link key={post.id} to={`/article/${post.slug}`} className="block group bg-white rounded-lg shadow-sm overflow-hidden">
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
                
                <div className="text-news-secondary text-sm">
                  {formatDate(post.date)}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedPage;


import { useEffect, useState } from "react";
import { fetchTopHeadlines } from "@/services/wordpress-api";
import { WordPressPost } from "@/types/wordpress";
import { formatDate } from "@/utils/date-utils";
import { Link } from "react-router-dom";
import { TrendingUp, ArrowRight } from "lucide-react";
import ReadingTime from "@/components/ReadingTime";
import HeadlineReadingProgress from "@/components/HeadlineReadingProgress";

const TrendingPage = () => {
  const [trendingPosts, setTrendingPosts] = useState<WordPressPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTrendingPosts = async () => {
      setIsLoading(true);
      try {
        // Enforce 12 posts
        const posts = await fetchTopHeadlines(12);
        setTrendingPosts(posts.slice(0, 12));
      } catch (error) {
        console.error("Error loading trending posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTrendingPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 animate-pulse">
        <h1 className="text-2xl font-bold mb-6">Trending Articles</h1>
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="h-20 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <TrendingUp className="text-news-accent h-6 w-6 mr-2" />
        <h1 className="text-2xl font-bold">Trending Articles</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-4 divide-y divide-gray-100">
        {trendingPosts.slice(0, 12).map((post, index) => {
          const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || '';
          const categoryName = post._embedded?.["wp:term"]?.[0]?.[0]?.name || '';
          
          return (
            <div key={post.id} className="py-4 group">
              <Link 
                to={`/article/${post.slug}`} 
                className="flex items-center gap-4"
              >
                <div className="text-2xl font-bold text-gray-300 w-8">
                  {index + 1}
                </div>
                
                {imageUrl && (
                  <div className="w-16 h-16 flex-shrink-0">
                    <img 
                      src={imageUrl} 
                      alt={post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                )}
                
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    {categoryName && (
                      <span className="text-xs text-news-accent font-medium">
                        {categoryName}
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      {formatDate(post.date)}
                    </span>
                  </div>
                  
                  <h3 
                    className="font-medium group-hover:text-news-accent transition-colors line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <div className="flex items-center mt-2 gap-3">
                    <ReadingTime html={post.content.rendered} className="text-xs text-news-secondary" />
                    <span className="text-xs text-blue-500 underline flex items-center gap-1">
                      Continue Reading
                      <ArrowRight className="w-4 h-4 inline" />
                    </span>
                  </div>
                </div>
              </Link>
              {/* Per-headline reading progress bar */}
              <div className="mt-2">
                <HeadlineReadingProgress html={post.content.rendered} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingPage;

import { useEffect, useState } from "react";
import { fetchPosts, fetchTopHeadlines } from "@/services/wordpress-api";
import { WordPressPost } from "@/types/wordpress";
import CategoryTabs from "@/components/CategoryTabs";
import FeaturedSlider from "@/components/FeaturedSlider";
import HeadlineCard from "@/components/HeadlineCard";
import ArticleCard from "@/components/ArticleCard";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowRight } from "lucide-react";

const HomePage = () => {
  const [featuredPosts, setFeaturedPosts] = useState<WordPressPost[]>([]);
  const [topHeadlines, setTopHeadlines] = useState<WordPressPost[]>([]);
  const [latestPosts, setLatestPosts] = useState<WordPressPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        // Fetch data in parallel with more attempts to ensure we get data
        const fetchWithRetry = async (fetcher: () => Promise<WordPressPost[]>, attempts = 3) => {
          for (let i = 0; i < attempts; i++) {
            try {
              const data = await fetcher();
              if (data.length > 0) return data;
              // Short delay before retry
              await new Promise(resolve => setTimeout(resolve, 500));
            } catch (err) {
              console.error("Error in fetch attempt", i + 1, err);
            }
          }
          return [];
        };
        
        const [headlinesData, latestData] = await Promise.all([
          fetchWithRetry(() => fetchTopHeadlines(5)),
          fetchWithRetry(() => fetchPosts(1, 7))
        ]);
        
        setTopHeadlines(headlinesData);
        
        // Use first 3 posts as featured if available
        if (latestData.length > 0) {
          setFeaturedPosts(latestData.slice(0, 3));
          setLatestPosts(latestData.slice(3));
        } else {
          setLatestPosts([]);
        }
      } catch (error) {
        console.error("Error loading homepage data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 animate-pulse">
        <div className="h-8 w-40 bg-gray-200 mb-4 rounded"></div>
        <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-6 w-24 bg-gray-200 rounded mb-2"></div>
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <CategoryTabs />
      
      {featuredPosts.length > 0 && (
        <section>
          <FeaturedSlider posts={featuredPosts} />
        </section>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl">Latest News</h2>
            <Link to="/all-posts" className="flex items-center text-news-accent hover:underline text-sm">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestPosts.slice(0, 6).map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="font-bold text-xl mb-4">Top Headlines</h2>
          {topHeadlines.length > 0 ? (
            <div className="bg-gray-50 rounded-lg p-3">
              {topHeadlines.map((post, index) => (
                <HeadlineCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 text-center text-news-secondary">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 text-news-accent opacity-70" />
              <p>No headlines available at the moment.</p>
            </div>
          )}
          
          <Link 
            to="/trending" 
            className="mt-4 block text-center py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-news-accent"
          >
            View more headlines
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

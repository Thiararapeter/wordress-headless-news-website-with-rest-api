
import { useEffect, useState } from "react";
import { fetchPosts, fetchTopHeadlines } from "@/services/wordpress-api";
import { WordPressPost } from "@/types/wordpress";
import CategoryTabs from "@/components/CategoryTabs";
import FeaturedArticle from "@/components/FeaturedArticle";
import ArticleList from "@/components/ArticleList";
import HeadlineCard from "@/components/HeadlineCard";

const HomePage = () => {
  const [featuredPosts, setFeaturedPosts] = useState<WordPressPost[]>([]);
  const [topHeadlines, setTopHeadlines] = useState<WordPressPost[]>([]);
  const [latestPosts, setLatestPosts] = useState<WordPressPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        // Fetch data in parallel
        const [headlinesData, latestData] = await Promise.all([
          fetchTopHeadlines(5),
          fetchPosts(1, 5)
        ]);
        
        setTopHeadlines(headlinesData);
        
        // Use first post as featured if available
        if (latestData.length > 0) {
          setFeaturedPosts([latestData[0]]);
          setLatestPosts(latestData.slice(1));
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
          <div className="md:col-span-2 space-y-6">
            <div className="h-48 bg-gray-200 rounded-lg"></div>
            <div className="h-48 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="space-y-4">
            <div className="h-6 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-16 bg-gray-200 rounded-lg"></div>
            <div className="h-16 bg-gray-200 rounded-lg"></div>
            <div className="h-16 bg-gray-200 rounded-lg"></div>
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
          <FeaturedArticle post={featuredPosts[0]} />
        </section>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="font-bold text-xl mb-4">Latest News</h2>
          <ArticleList initialPosts={latestPosts} />
        </div>
        
        <div className="mt-6 md:mt-0">
          <h2 className="font-bold text-xl mb-4">Top Headlines</h2>
          <div className="bg-gray-50 rounded-lg p-3">
            {topHeadlines.map((post, index) => (
              <HeadlineCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

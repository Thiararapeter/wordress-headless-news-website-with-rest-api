
import { WordPressPost } from "@/types/wordpress";
import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { fetchPosts } from "@/services/wordpress-api";

interface ArticleListProps {
  initialPosts?: WordPressPost[];
  categoryId?: number;
}

const ArticleList = ({ initialPosts, categoryId }: ArticleListProps) => {
  const [posts, setPosts] = useState<WordPressPost[]>(initialPosts || []);
  const [page, setPage] = useState(initialPosts && initialPosts.length > 0 ? 2 : 1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
      setPage(2);
      setHasMore(true);
    } else {
      loadPosts();
    }
  }, [initialPosts, categoryId]);

  const loadPosts = async (nextPage = page) => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    try {
      const newPosts = await fetchPosts(nextPage, 10, categoryId);
      
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prevPosts => nextPage === 1 ? newPosts : [...prevPosts, ...newPosts]);
        setPage(nextPage + 1);
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if we're near the bottom of the page
      if (
        window.innerHeight + document.documentElement.scrollTop >= 
        document.documentElement.offsetHeight - 500 &&
        !isLoading && 
        hasMore
      ) {
        loadPosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore]);

  if (posts.length === 0 && isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="h-48 image-skeleton"></div>
            <div className="p-4">
              <div className="h-6 w-3/4 image-skeleton mb-2 rounded"></div>
              <div className="h-4 w-1/4 image-skeleton mb-3 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 image-skeleton rounded"></div>
                <div className="h-4 image-skeleton rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
      
      {isLoading && (
        <div className="flex justify-center mt-6">
          <div className="w-6 h-6 border-2 border-news-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {!hasMore && posts.length > 0 && (
        <p className="text-center text-news-secondary mt-8">
          You've reached the end of the articles
        </p>
      )}
    </div>
  );
};

export default ArticleList;

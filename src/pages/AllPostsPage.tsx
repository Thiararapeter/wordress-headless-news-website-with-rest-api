
import { useState, useEffect } from "react";
import { fetchPosts } from "@/services/wordpress-api";
import { WordPressPost } from "@/types/wordpress";
import ArticleCard from "@/components/ArticleCard";

const AllPostsPage = () => {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const fetchedPosts = await fetchPosts(1, 20);
        setPosts(fetchedPosts);
        setHasMore(fetchedPosts.length === 20);
      } catch (error) {
        console.error("Error loading all posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;
    
    try {
      setIsLoading(true);
      const nextPage = page + 1;
      const morePosts = await fetchPosts(nextPage, 20);
      
      if (morePosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prevPosts => [...prevPosts, ...morePosts]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">All Posts</h1>
      
      {isLoading && posts.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
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
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
          
          {hasMore && (
            <div className="mt-8 text-center">
              <button
                onClick={loadMore}
                disabled={isLoading}
                className="px-4 py-2 bg-news-accent text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Loading...
                  </span>
                ) : (
                  "Load More"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllPostsPage;

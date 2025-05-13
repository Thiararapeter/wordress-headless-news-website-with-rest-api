
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchPosts } from "@/services/wordpress-api";
import { WordPressPost } from "@/types/wordpress";
import ArticleCard from "@/components/ArticleCard";
import SearchBar from "@/components/SearchBar";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<WordPressPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const query = searchParams.get("q") || "";
  
  useEffect(() => {
    const performSearch = async () => {
      if (!query) {
        setResults([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const posts = await searchPosts(query);
        setResults(posts);
      } catch (error) {
        console.error("Error searching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    performSearch();
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    setSearchParams({ q: searchQuery });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Search</h1>
      
      <SearchBar 
        initialQuery={query} 
        onSearch={handleSearch}
        autoFocus
      />
      
      <div className="mt-8">
        {isLoading ? (
          <div className="space-y-6 animate-pulse">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <>
            {query && (
              <p className="mb-4 text-news-secondary">
                {results.length === 0 
                  ? 'No results found' 
                  : `Found ${results.length} result${results.length !== 1 ? 's' : ''}`}
              </p>
            )}
            
            <div className="space-y-6">
              {results.map(post => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
            
            {!query && (
              <div className="text-center py-12">
                <p className="text-news-secondary mb-2">
                  Enter keywords to search for articles
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

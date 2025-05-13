
import { useBookmarks } from "@/contexts/BookmarksContext";
import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { formatDate } from "@/utils/date-utils";

const BookmarksPage = () => {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Your Bookmarks</h1>
      
      {bookmarks.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Bookmark className="h-8 w-8 text-news-secondary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No bookmarks yet</h2>
          <p className="text-news-secondary mb-6">
            Save articles to read later by clicking the bookmark icon
          </p>
          <Link to="/" className="text-news-accent hover:underline">
            Explore articles
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map(bookmark => (
            <div 
              key={bookmark.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row">
                {bookmark.imageUrl && (
                  <div className="sm:w-48 h-32 sm:h-auto flex-shrink-0">
                    <img 
                      src={bookmark.imageUrl} 
                      alt={bookmark.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link to={`/article/${bookmark.slug}`}>
                        <h3 
                          className="font-semibold text-lg mb-2 hover:text-news-accent transition-colors"
                          dangerouslySetInnerHTML={{ __html: bookmark.title }}
                        />
                      </Link>
                      <button 
                        onClick={() => removeBookmark(bookmark.id)}
                        className="p-1 text-sm text-news-secondary hover:text-news-accent"
                        aria-label="Remove bookmark"
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="text-sm text-news-secondary mb-2">
                      {formatDate(bookmark.date)}
                      {bookmark.categoryName && (
                        <> · <span>{bookmark.categoryName}</span></>
                      )}
                    </div>
                    
                    <div 
                      className="text-sm text-news-secondary line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: bookmark.excerpt }}
                    />
                  </div>
                  
                  <Link 
                    to={`/article/${bookmark.slug}`} 
                    className="text-news-accent text-sm mt-3 hover:underline"
                  >
                    Read article →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;

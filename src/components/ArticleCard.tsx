
import { WordPressPost } from "@/types/wordpress";
import { formatDate } from "@/utils/date-utils";
import { generateExcerpt } from "@/utils/html-utils";
import { useBookmarks } from "@/contexts/BookmarksContext";
import { BookmarkPlus, BookmarkCheck, Share } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ShareMenu from "./ShareMenu";

interface ArticleCardProps {
  post: WordPressPost;
  showImage?: boolean;
  isCompact?: boolean;
}

const ArticleCard = ({ post, showImage = true, isCompact = false }: ArticleCardProps) => {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || '';
  const categoryName = post._embedded?.["wp:term"]?.[0]?.[0]?.name || '';
  
  const excerpt = generateExcerpt(post.excerpt.rendered, isCompact ? 80 : 150);
  const bookmarked = isBookmarked(post.id);

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (bookmarked) {
      removeBookmark(post.id);
    } else {
      addBookmark({
        id: post.id,
        title: post.title.rendered,
        excerpt,
        imageUrl,
        date: post.date,
        categoryName,
        slug: post.slug,
        link: post.link
      });
    }
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShareMenu(true);
  };

  const handleShareClose = () => {
    setShowShareMenu(false);
  };

  return (
    <Link 
      to={`/article/${post.slug}`} 
      className={`block group ${isCompact ? 'mb-2' : 'mb-6'} relative`}
    >
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        {showImage && imageUrl && (
          <div className={`overflow-hidden ${isCompact ? 'h-32' : 'h-48'} relative`}>
            <img 
              src={imageUrl} 
              alt={post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
            />
            {categoryName && (
              <span className="absolute top-2 left-2 bg-news-accent text-white text-xs px-2 py-1 rounded-md">
                {categoryName}
              </span>
            )}
          </div>
        )}
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 
              className={`font-semibold ${isCompact ? 'text-base' : 'text-xl'} mb-2 group-hover:text-news-accent transition-colors`}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div className="flex space-x-1">
              <button 
                onClick={handleBookmarkToggle}
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
              >
                {bookmarked ? (
                  <BookmarkCheck className="w-5 h-5 text-news-accent" />
                ) : (
                  <BookmarkPlus className="w-5 h-5 text-gray-500" />
                )}
              </button>
              <button 
                onClick={handleShareClick}
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Share article"
              >
                <Share className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="text-sm text-news-secondary mb-3">
            {formatDate(post.date)}
          </div>
          {!isCompact && (
            <div 
              className="text-sm text-news-secondary"
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
          )}
        </div>
      </div>
      {showShareMenu && (
        <ShareMenu 
          post={post} 
          onClose={handleShareClose}
        />
      )}
    </Link>
  );
};

export default ArticleCard;

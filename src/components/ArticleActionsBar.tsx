
import { Share, BookmarkPlus, BookmarkCheck } from "lucide-react";
import { WordPressPost } from "@/types/wordpress";
import { useBookmarks } from "@/contexts/BookmarksContext";
import { useState } from "react";
import ShareMenu from "./ShareMenu";

interface ArticleActionsBarProps {
  article: WordPressPost;
}

const ArticleActionsBar = ({ article }: ArticleActionsBarProps) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const bookmarked = isBookmarked(article.id);

  // For bookmark data
  const imageUrl = article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || '';
  const categoryName = article._embedded?.["wp:term"]?.[0]?.[0]?.name || '';
  const excerpt = article.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 120);

  const handleBookmarkToggle = () => {
    if (!article) return;
    if (bookmarked) removeBookmark(article.id);
    else {
      addBookmark({
        id: article.id,
        title: article.title.rendered,
        excerpt,
        imageUrl,
        date: article.date,
        categoryName,
        slug: article.slug,
        link: article.link
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3 items-end">
      <button
        onClick={() => setShowShareMenu((v) => !v)}
        className="bg-white/90 border ring-1 ring-news-accent hover:bg-news-accent text-news-accent hover:text-white transition p-2 rounded-full shadow-lg backdrop-blur group"
        aria-label="Share article"
      >
        <Share className="w-5 h-5 group-hover:scale-125 transition" />
        {showShareMenu && (
          <ShareMenu 
            post={article}
            onClose={() => setShowShareMenu(false)}
          />
        )}
      </button>
      <button
        onClick={handleBookmarkToggle}
        className="bg-white/90 border ring-1 ring-news-accent hover:bg-news-accent text-news-accent hover:text-white transition p-2 rounded-full shadow-lg backdrop-blur"
        aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
      >
        {bookmarked ? (
          <BookmarkCheck className="w-5 h-5" />
        ) : (
          <BookmarkPlus className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default ArticleActionsBar;


import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostBySlug, fetchPosts } from "@/services/wordpress-api";
import { WordPressPost } from "@/types/wordpress";
import { formatPostDate } from "@/utils/date-utils";
import { Share, BookmarkPlus, BookmarkCheck } from "lucide-react";
import { useBookmarks } from "@/contexts/BookmarksContext";
import ArticleCard from "@/components/ArticleCard";
import { generateExcerpt } from "@/utils/html-utils";
import ShareMenu from "@/components/ShareMenu";
import RelatedCarousel from "@/components/RelatedCarousel";
import ReadProgressBar from "@/components/ReadProgressBar";
import ReadingTime from "@/components/ReadingTime";
import { SidebarTrigger } from "@/components/ui/sidebar"; // We'll use this in the main layout, not here

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<WordPressPost | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<WordPressPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const navigate = useNavigate();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const articleContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return;

      setIsLoading(true);
      try {
        const post = await fetchPostBySlug(slug);

        if (!post) {
          navigate('/not-found');
          return;
        }

        setArticle(post);

        // Update document title
        const title = new DOMParser().parseFromString(post.title.rendered, 'text/html').body.textContent;
        document.title = `${title} | TechNews`;

        // Fetch related articles from the same category if available
        if (post.categories && post.categories.length > 0) {
          const categoryId = post.categories[0];
          const related = await fetchPosts(1, 6, categoryId); // fetch more for possible filtering
          // Filter out current, slice to 5
          setRelatedArticles(related.filter(p => p.id !== post.id).slice(0, 5));
        }
      } catch (error) {
        console.error('Error loading article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();

    window.scrollTo(0, 0);

    return () => {
      document.title = 'TechNews';
    };
  }, [slug, navigate]);

  const handleBookmarkToggle = () => {
    if (!article) return;

    const bookmarked = isBookmarked(article.id);

    if (bookmarked) {
      removeBookmark(article.id);
    } else {
      const imageUrl = article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || '';
      const categoryName = article._embedded?.["wp:term"]?.[0]?.[0]?.name || '';
      const excerpt = generateExcerpt(article.excerpt.rendered);

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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="max-w-3xl mx-auto">
          <div className="h-8 w-4/5 bg-gray-200 mb-4 rounded"></div>
          <div className="h-5 w-40 bg-gray-200 mb-6 rounded"></div>
          <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  const imageUrl = article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || '';
  const categoryName = article._embedded?.["wp:term"]?.[0]?.[0]?.name || '';
  const bookmarked = isBookmarked(article.id);

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Move ReadProgressBar outside of the main content box to ensure always visible */}
      <ReadProgressBar targetRef={articleContentRef} />
      <div className="max-w-3xl mx-auto">
        <article>
          {/* No longer render ReadProgressBar here, just above */}
          {categoryName && (
            <span className="inline-block bg-news-accent text-white text-xs px-3 py-1 rounded-md mb-3">
              {categoryName}
            </span>
          )}
          <h1 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
            dangerouslySetInnerHTML={{ __html: article.title.rendered }}
          />
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col">
              <span className="text-news-secondary text-sm">
                {formatPostDate(article.date)}
              </span>
              <ReadingTime html={article.content.rendered} className="text-news-secondary text-xs mt-1" />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2 rounded-full hover:bg-gray-100 relative"
                aria-label="Share article"
              >
                <Share className="w-5 h-5 text-gray-600" />
                {showShareMenu && (
                  <ShareMenu 
                    post={article}
                    onClose={() => setShowShareMenu(false)}
                  />
                )}
              </button>
              <button
                onClick={handleBookmarkToggle}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
              >
                {bookmarked ? (
                  <BookmarkCheck className="w-5 h-5 text-news-accent" />
                ) : (
                  <BookmarkPlus className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
          {imageUrl && (
            <div className="mb-8">
              <img 
                src={imageUrl} 
                alt={article._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || article.title.rendered}
                className="w-full rounded-xl"
              />
            </div>
          )}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content.rendered }}
            ref={articleContentRef}
          />
        </article>
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">Related Articles</h2>
            <RelatedCarousel posts={relatedArticles} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;

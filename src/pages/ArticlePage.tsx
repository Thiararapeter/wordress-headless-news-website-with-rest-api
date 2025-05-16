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
import ArticleMeta from "@/components/ArticleMeta";
import ArticleActionsBar from "@/components/ArticleActionsBar";
import BackToTopButton from "@/components/BackToTopButton";

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
  const authorName = article._embedded?.["author"]?.[0]?.name || "TechCrunch";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f0f3fa] to-[#fffced] dark:from-[#22243a] dark:to-[#181927] transition-colors py-8 px-1">
      <div className="container mx-auto px-0 max-w-3xl">
        <div className="relative z-10 rounded-2xl bg-white dark:bg-[#23243a] shadow-xl border border-news-border/60 overflow-hidden mb-10 fade-in">
          {/* Article image */}
          {imageUrl && (
            <div className="relative h-64 md:h-96 w-full overflow-hidden">
              <img 
                src={imageUrl}
                alt={article._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || article.title.rendered}
                className="object-cover w-full h-full transition-transform duration-700 scale-105 hover:scale-110 group"
                style={{
                  maskImage: "linear-gradient(to bottom,black 90%,transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom,black 90%,transparent 100%)"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-white/90 dark:to-[#23243a] pointer-events-none"></div>
            </div>
          )}
          <div className="px-6 py-8 md:py-10">
            {/* Category badge floating above the content */}
            {categoryName && (
              <span className="inline-flex items-center gap-1 bg-news-accent/90 text-white text-xs font-bold px-3 py-1 mb-4 rounded-md shadow-sm uppercase tracking-wide">
                {categoryName}
              </span>
            )}
            <h1
              className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-news-primary dark:text-white"
              dangerouslySetInnerHTML={{ __html: article.title.rendered }}
            />
            <ArticleMeta
              date={article.date}
              html={article.content.rendered}
              authorName={authorName}
              categoryName={categoryName}
            />
            <div 
              className="prose prose-lg dark:prose-invert max-w-none mt-8"
              dangerouslySetInnerHTML={{ __html: article.content.rendered }}
              ref={articleContentRef}
            />
          </div>
        </div>
        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-6 text-news-primary dark:text-white">Related Articles</h2>
            <RelatedCarousel posts={relatedArticles} />
          </div>
        )}
      </div>
      {/* Floating Action Bar */}
      <ArticleActionsBar article={article} />
      {/* Back To Top */}
      <BackToTopButton />
      {/* Progress Bar over article */}
      <div className="fixed top-0 left-0 w-full z-40">
        <ReadProgressBar targetRef={articleContentRef} />
      </div>
    </div>
  );
};

export default ArticlePage;

import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostBySlug, fetchPosts } from "@/services/wordpress-api";
import { WordPressPost } from "@/types/wordpress";
import { generateExcerpt } from "@/utils/html-utils";
import ArticleMeta from "@/components/ArticleMeta";
import ArticleActionsBar from "@/components/ArticleActionsBar";
import BackToTopButton from "@/components/BackToTopButton";
import RelatedCarousel from "@/components/RelatedCarousel";
import ReadProgressBar from "@/components/ReadProgressBar";
import PostTextToAudioButton from "@/components/PostTextToAudioButton";
import ArticleSidebar from "@/components/ArticleSidebar";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<WordPressPost | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<WordPressPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
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
          const related = await fetchPosts(1, 6, categoryId);
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
  const mainContentHtml = article.content.rendered
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f0f3fa] to-[#fffced] dark:from-[#22243a] dark:to-[#181927] transition-colors py-4 px-1">
      <div className="container mx-auto px-0 max-w-[1200px]">
        {/* Hero image full width */}
        {imageUrl && (
          <div className="relative w-full h-56 md:h-96 mb-6 overflow-hidden rounded-xl shadow-md">
            <img
              src={imageUrl}
              alt={article._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || article.title.rendered}
              className="object-cover w-full h-full transition-transform duration-700 scale-105 hover:scale-110"
              style={{
                maskImage: "linear-gradient(to bottom,black 92%,transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom,black 92%,transparent 100%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-white/90 dark:to-[#23243a] pointer-events-none"></div>
          </div>
        )}

        {/* Main content + Sidebar grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Main content area (80%) */}
          <div className="md:col-span-4 w-full relative">
            <div className="bg-white dark:bg-[#23243a] px-4 py-7 md:p-10 rounded-2xl shadow-xl border border-news-border/70 fade-in mb-8">
              {/* Top meta */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <ArticleMeta
                  date={article.date}
                  html={mainContentHtml}
                  authorName={authorName}
                  categoryName={categoryName}
                />
              </div>
              <h1
                className="text-3xl md:text-5xl font-extrabold leading-tight mb-5 text-news-primary dark:text-white"
                dangerouslySetInnerHTML={{ __html: article.title.rendered }}
              />
              {/* Progress bar just above article body */}
              <div className="sticky top-0 z-40">
                <ReadProgressBar targetRef={articleContentRef} />
              </div>
              {/* Article body */}
              <div
                className="prose prose-lg dark:prose-invert max-w-none mt-8"
                dangerouslySetInnerHTML={{ __html: mainContentHtml }}
                ref={articleContentRef}
              />
            </div>
            {/* Related carousel at bottom */}
            {relatedArticles.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-6 text-news-primary dark:text-white">Related Articles</h2>
                <RelatedCarousel posts={relatedArticles} />
              </div>
            )}
          </div>
          {/* Sidebar (20%) - improved UI and width */}
          <div className="md:col-span-1">
            <div className="sticky top-10">
              <ArticleSidebar excludeId={article.id} categoryId={article.categories?.[0]} title="Recent Posts" customCard />
            </div>
          </div>
        </div>
      </div>
      {/* Floating Action Bar */}
      <ArticleActionsBar article={article} />
      {/* Back To Top */}
      <BackToTopButton />
    </div>
  );
};

export default ArticlePage;

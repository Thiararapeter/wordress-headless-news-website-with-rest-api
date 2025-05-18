
import { useEffect, useState } from "react";
import { WordPressPost } from "@/types/wordpress";
import ArticleCard from "./ArticleCard";
import { fetchPosts } from "@/services/wordpress-api";
import { Share } from "lucide-react";

interface ArticleSidebarProps {
  excludeId?: number;
  categoryId?: number;
  title?: string;
  customCard?: boolean;
}

const ArticleSidebar = ({
  excludeId,
  categoryId,
  title = "Recent Posts",
  customCard = false
}: ArticleSidebarProps) => {
  const [posts, setPosts] = useState<WordPressPost[]>([]);

  useEffect(() => {
    async function load() {
      let fetched = await fetchPosts(1, 6, categoryId);
      if (excludeId) {
        fetched = fetched.filter((p) => p.id !== excludeId);
      }
      setPosts(fetched.slice(0, 3));
    }
    load();
  }, [categoryId, excludeId]);

  if (!posts.length) {
    return (
      <div className="text-news-secondary text-xs px-2 py-4">
        No recent posts found.
      </div>
    );
  }

  // Sidebar UI: Title → Share → Posts
  return (
    <aside className="w-full">
      <div className="flex flex-col gap-2 mb-4 px-2">
        <h3 className="text-base font-extrabold text-news-primary tracking-tight">
          {title}
        </h3>
        <button
          className="self-start flex items-center gap-1 text-xs text-news-accent bg-news-accent/10 rounded-full px-3 py-1 hover:bg-news-accent/20 transition-colors mb-2"
          aria-label="Share recent posts"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: "Check out these recent posts on TechNews!",
                url: window.location.origin || window.location.href,
              });
            } else {
              window.navigator.clipboard.writeText(window.location.origin || window.location.href);
              alert("Link copied!");
            }
          }}
        >
          <Share className="w-4 h-4 mr-1" />
          Share
        </button>
      </div>
      <div className="flex flex-col gap-5">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-2xl glass-morphism shadow-[0_1px_10px_rgba(100,100,130,0.07)] border border-news-border px-3 pb-3 pt-3 transition-all hover:shadow-md backdrop-blur-md bg-white/80 dark:bg-[#241e36]/80"
          >
            <ArticleCard
              post={post}
              showImage={true}
              isCompact={true}
            />
          </div>
        ))}
      </div>
    </aside>
  );
};
export default ArticleSidebar;

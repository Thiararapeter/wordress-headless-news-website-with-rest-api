
import { useEffect, useState } from "react";
import { WordPressPost } from "@/types/wordpress";
import ArticleCard from "./ArticleCard";
import { fetchPosts } from "@/services/wordpress-api";

interface ArticleSidebarProps {
  excludeId?: number;
  categoryId?: number;
  title?: string;
  customCard?: boolean;
}

const ArticleSidebar = ({
  excludeId,
  categoryId,
  title = "Related Posts",
  customCard = false
}: ArticleSidebarProps) => {
  const [posts, setPosts] = useState<WordPressPost[]>([]);

  useEffect(() => {
    async function load() {
      let fetched = await fetchPosts(1, 6, categoryId);
      if (excludeId) {
        fetched = fetched.filter((p) => p.id !== excludeId);
      }
      setPosts(fetched.slice(0, 5));
    }
    load();
  }, [categoryId, excludeId]);

  if (!posts.length) {
    return (
      <div className="text-news-secondary text-xs px-2 py-4">
        No related posts found.
      </div>
    );
  }

  // Improved Recent Posts list
  return (
    <aside className="w-full">
      <h3 className="text-base font-bold text-news-primary mb-4 px-2">{title}</h3>
      <div className={`flex flex-col gap-5`}>
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-2xl bg-white shadow-[0_1px_10px_rgba(68,68,90,0.05)] border border-news-border px-3 pb-3 pt-3 transition-all hover:shadow-md"
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

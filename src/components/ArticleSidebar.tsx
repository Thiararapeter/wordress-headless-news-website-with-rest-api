
import { useEffect, useState } from "react";
import { WordPressPost } from "@/types/wordpress";
import ArticleCard from "./ArticleCard";
import { fetchPosts } from "@/services/wordpress-api";

interface ArticleSidebarProps {
  excludeId?: number;
  categoryId?: number;
  title?: string;
}

const ArticleSidebar = ({ excludeId, categoryId, title = "Related Posts" }: ArticleSidebarProps) => {
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

  return (
    <aside className="w-full flex flex-col gap-3">
      <h3 className="text-base font-bold text-news-primary mb-2 px-1">{title}</h3>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <div key={post.id}>
            <ArticleCard post={post} isCompact />
          </div>
        ))}
      </div>
    </aside>
  );
};
export default ArticleSidebar;

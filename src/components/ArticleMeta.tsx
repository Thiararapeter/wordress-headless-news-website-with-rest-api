
import { formatPostDate } from "@/utils/date-utils";
import ReadingTime from "./ReadingTime";
import { BookOpen, User, Tag } from "lucide-react";

interface ArticleMetaProps {
  date: string;
  html: string;
  authorName?: string;
  categoryName?: string;
}

const ArticleMeta = ({ date, html, authorName, categoryName }: ArticleMetaProps) => {
  return (
    <div className="flex flex-wrap gap-3 items-center text-sm mb-6">
      <span className="flex items-center gap-1 text-news-secondary">
        <User className="w-4 h-4" /> {authorName ? authorName : "TechCrunch"}
      </span>
      <span className="flex items-center gap-1 text-news-secondary">
        <BookOpen className="w-4 h-4" />
        <ReadingTime html={html} />
      </span>
      <span className="flex items-center gap-1 text-news-secondary">
        <Tag className="w-4 h-4" /> {categoryName || "News"}
      </span>
      <span className="ml-auto text-xs px-2 py-1 rounded bg-news-background text-news-secondary">
        {formatPostDate(date)}
      </span>
    </div>
  );
};

export default ArticleMeta;


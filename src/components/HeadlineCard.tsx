
import { formatDate } from "@/utils/date-utils";
import { WordPressPost } from "@/types/wordpress";
import { Link } from "react-router-dom";

interface HeadlineCardProps {
  post: WordPressPost;
  index: number;
}

const HeadlineCard = ({ post, index }: HeadlineCardProps) => {
  const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || '';
  
  return (
    <Link 
      to={`/article/${post.slug}`}
      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all"
    >
      <div className="font-bold text-news-accent text-xl w-8">
        {index + 1}
      </div>
      {imageUrl && (
        <div className="w-16 h-16 flex-shrink-0">
          <img 
            src={imageUrl} 
            alt={post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      )}
      <div className="flex-1">
        <h3 
          className="font-medium text-sm line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <div className="text-xs text-news-secondary mt-1">
          {formatDate(post.date)}
        </div>
      </div>
    </Link>
  );
};

export default HeadlineCard;

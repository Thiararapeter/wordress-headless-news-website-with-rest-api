
import { WordPressPost } from "@/types/wordpress";
import { formatDate } from "@/utils/date-utils";
import { Link } from "react-router-dom";

interface FeaturedArticleProps {
  post: WordPressPost;
}

const FeaturedArticle = ({ post }: FeaturedArticleProps) => {
  const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || '';
  const categoryName = post._embedded?.["wp:term"]?.[0]?.[0]?.name || '';
  
  return (
    <Link to={`/article/${post.slug}`} className="block group">
      <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden mb-6">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 sm:p-6">
          {categoryName && (
            <span className="bg-news-accent text-white text-xs px-2 py-1 rounded-md mb-3 w-fit">
              {categoryName}
            </span>
          )}
          
          <h2 
            className="text-white text-xl sm:text-2xl font-bold mb-2 group-hover:text-news-accent transition-colors"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          
          <div className="text-white/80 text-sm">
            {formatDate(post.date)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedArticle;

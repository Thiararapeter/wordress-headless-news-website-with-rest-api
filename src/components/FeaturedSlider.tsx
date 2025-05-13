
import { useState, useEffect } from "react";
import { WordPressPost } from "@/types/wordpress";
import { formatDate } from "@/utils/date-utils";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeaturedSliderProps {
  posts: WordPressPost[];
}

const FeaturedSlider = ({ posts }: FeaturedSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Auto advance slide every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [posts.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? posts.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden mb-6 group">
      {posts.map((post, index) => {
        const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || '';
        const categoryName = post._embedded?.["wp:term"]?.[0]?.[0]?.name || '';
        
        return (
          <div 
            key={post.id}
            className={`absolute inset-0 transition-opacity duration-700 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <Link to={`/article/${post.slug}`} className="block h-full">
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
                  className="text-white text-xl sm:text-2xl font-bold mb-2 hover:text-news-accent transition-colors"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                
                <div className="text-white/80 text-sm">
                  {formatDate(post.date)}
                </div>
              </div>
            </Link>
          </div>
        );
      })}
      
      {/* Navigation arrows */}
      <button 
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      
      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-white w-4' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSlider;

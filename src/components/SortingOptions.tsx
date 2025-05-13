
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

type SortType = "newest" | "oldest" | "trending";

interface SortingOptionsProps {
  activeSort: SortType;
  onSortChange: (sortType: SortType) => void;
}

export const SortingOptions = ({ activeSort, onSortChange }: SortingOptionsProps) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button 
        variant="outline" 
        size="sm"
        className={cn(
          "flex items-center gap-1", 
          activeSort === "newest" ? "bg-news-accent text-white border-news-accent" : ""
        )}
        onClick={() => onSortChange("newest")}
      >
        <Clock className="h-4 w-4" />
        <span>Newest</span>
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        className={cn(
          "flex items-center gap-1", 
          activeSort === "oldest" ? "bg-news-accent text-white border-news-accent" : ""
        )}
        onClick={() => onSortChange("oldest")}
      >
        <Calendar className="h-4 w-4" />
        <span>Oldest</span>
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        className={cn(
          "flex items-center gap-1", 
          activeSort === "trending" ? "bg-news-accent text-white border-news-accent" : ""
        )}
        onClick={() => onSortChange("trending")}
      >
        <Flame className="h-4 w-4" />
        <span>Trending</span>
      </Button>
    </div>
  );
};

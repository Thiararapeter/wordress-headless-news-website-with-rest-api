
import { WordPressPost } from "@/types/wordpress";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ArticleCard from "@/components/ArticleCard";

interface RelatedCarouselProps {
  posts: WordPressPost[];
}
const RelatedCarousel = ({ posts }: RelatedCarouselProps) => (
  <Carousel className="w-full max-w-4xl mx-auto" opts={{ align: "start" }}>
    <CarouselContent>
      {posts.map((post) => (
        <CarouselItem key={post.id} className="basis-80 md:basis-96">
          <ArticleCard post={post} isCompact />
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
);

export default RelatedCarousel;

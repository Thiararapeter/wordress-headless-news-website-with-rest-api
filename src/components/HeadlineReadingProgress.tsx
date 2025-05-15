
import React, { useRef, useEffect, useState } from "react";

interface HeadlineReadingProgressProps {
  html: string;
}

const HeadlineReadingProgress: React.FC<HeadlineReadingProgressProps> = ({ html }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function calcProgress() {
      if (!ref.current) return setProgress(0);
      const el = ref.current;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollPos = window.scrollY || window.pageYOffset;
      const elementTop = rect.top + scrollPos;
      const elementBottom = elementTop + el.offsetHeight;
      const currentScroll = scrollPos + windowHeight / 2;
      const percent = Math.min(
        100,
        Math.max(0, ((currentScroll - elementTop) / (elementBottom - elementTop)) * 100)
      );
      setProgress(percent);
    }
    window.addEventListener("scroll", calcProgress);
    window.addEventListener("resize", calcProgress);
    calcProgress();
    return () => {
      window.removeEventListener("scroll", calcProgress);
      window.removeEventListener("resize", calcProgress);
    };
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <div className="h-1 bg-gray-200 rounded w-full">
        <div
          className="h-1 rounded bg-news-accent transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default HeadlineReadingProgress;

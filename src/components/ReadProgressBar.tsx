
import { useEffect, useState } from "react";

interface ReadProgressBarProps {
  targetRef: React.RefObject<HTMLElement>;
}
const ReadProgressBar = ({ targetRef }: ReadProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function calcProgress() {
      if (!targetRef.current) return setProgress(0);
      const el = targetRef.current;
      const rect = el.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      const top = rect.top + scrollTop;
      const height = el.offsetHeight;
      const scrollPos = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const percent = Math.min(
        100,
        Math.max(0, ((scrollPos + windowHeight / 2 - top) / height) * 100)
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
  }, [targetRef]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-30 bg-transparent pointer-events-none">
      <div
        className="h-1 bg-news-accent transition-all duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadProgressBar;

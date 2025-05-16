
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const BackToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!show) return null;

  return (
    <button
      className="fixed z-50 bottom-6 left-6 bg-white/80 border ring-1 ring-news-accent text-news-accent hover:bg-news-accent hover:text-white p-2 rounded-full shadow-lg transition-all"
      title="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default BackToTopButton;



import { useEffect, useState } from "react";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      const fadeOutTimer = setTimeout(() => {
        onFinish();
      }, 500);
      
      return () => clearTimeout(fadeOutTimer);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 bg-news-primary flex flex-col items-center justify-center z-50 transition-opacity duration-500 ${
        animationComplete ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="splash-animation text-center">
        <div className="text-white text-4xl font-bold mb-4">Tech News</div>
        <div className="w-16 h-1 bg-news-accent mx-auto mb-6 rounded-full"></div>
        <p className="text-white/80 text-sm">Stay informed with the latest updates</p>
      </div>
    </div>
  );
};

export default SplashScreen;


import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Bookmark, Search } from "lucide-react";
import { useBookmarks } from "@/contexts/BookmarksContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { bookmarks } = useBookmarks();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-news-primary">
            Tech<span className="text-news-accent">News</span>
          </Link>
          
          <div className="flex items-center space-x-1">
            <Link 
              to="/search" 
              className={`p-2 rounded-full ${isActive('/search') ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-news-primary" />
            </Link>
            
            <Link 
              to="/notifications" 
              className={`p-2 rounded-full ${isActive('/notifications') ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-news-primary" />
            </Link>
            
            <Link 
              to="/bookmarks" 
              className={`p-2 rounded-full relative ${isActive('/bookmarks') ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
              aria-label="Bookmarks"
            >
              <Bookmark className="h-5 w-5 text-news-primary" />
              {bookmarks.length > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-news-accent flex items-center justify-center text-white text-xs">
                  {bookmarks.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

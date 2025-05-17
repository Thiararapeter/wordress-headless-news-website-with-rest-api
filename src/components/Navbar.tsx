
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Bookmark, Search } from "lucide-react";
import { useBookmarks } from "@/contexts/BookmarksContext";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "All Posts", path: "/all-posts" },
  { name: "Search", path: "/search" },
  { name: "Bookmarks", path: "/bookmarks" }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { bookmarks } = useBookmarks();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => (location.pathname === path);

  return (
    <header
      className={`sticky top-0 z-40 w-full shadow transition-all duration-300 bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 ${scrolled ? 'backdrop-blur-md' : ''}`}
      style={{
        borderBottom: "1.5px solid #eee",
        boxShadow: scrolled ? "0 2px 24px 0 rgba(94, 75, 233, 0.07)" : "none"
      }}
    >
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-news-primary flex items-center gap-2">
            <span className="bg-gradient-to-r from-news-accent via-violet-500 to-news-primary bg-clip-text text-transparent">TechNews</span>
          </Link>
          {/* Main navigation links */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm px-4 py-2 rounded transition font-semibold
                  ${isActive(item.path)
                    ? "bg-news-accent text-white shadow hover:scale-105"
                    : "text-news-primary hover:bg-gray-100 hover:text-news-accent"}
                  hover-scale
                `}
              >
                {item.name}
                {item.name === "Bookmarks" && bookmarks.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-news-accent text-white text-xs">{bookmarks.length}</span>
                )}
                {/* active indicator */}
                {isActive(item.path) && (
                  <span className="absolute left-0 right-0 -bottom-1 h-[3px] bg-gradient-to-r from-news-accent via-pink-400 to-indigo-400 rounded"></span>
                )}
              </Link>
            ))}
          </nav>
          {/* Mobile & utility icons */}
          <div className="flex items-center space-x-1 md:space-x-0">
            <div className="md:hidden flex items-center gap-1">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`p-2 rounded-full relative ${isActive(item.path) ? 'bg-gray-100' : 'hover:bg-gray-100'} transition`}
                  aria-label={item.name}
                >
                  {item.name === "Search" && <Search className="h-5 w-5 text-news-primary" />}
                  {item.name === "Bookmarks" && (
                    <>
                      <Bookmark className="h-5 w-5 text-news-primary" />
                      {bookmarks.length > 0 && (
                        <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-news-accent flex items-center justify-center text-white text-xs">
                          {bookmarks.length}
                        </span>
                      )}
                    </>
                  )}
                  {/* Optionally, icons for Home and All Posts can be added for more visual context */}
                </Link>
              ))}
            </div>
            {/* Notifications */}
            <Link
              to="/notifications"
              className={`p-2 rounded-full hover:bg-gray-100 transition ${isActive('/notifications') ? 'bg-gray-200' : ''}`}
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-news-primary" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

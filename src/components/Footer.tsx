
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white py-8 mt-8 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-xl font-bold text-news-primary">
              Tech<span className="text-news-accent">News</span>
            </Link>
            <p className="text-news-secondary mt-2 text-sm max-w-md">
              Stay updated with the latest technology news and trends from around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3 text-news-primary">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-news-secondary hover:text-news-accent">Home</Link></li>
                <li><Link to="/categories" className="text-news-secondary hover:text-news-accent">Categories</Link></li>
                <li><Link to="/bookmarks" className="text-news-secondary hover:text-news-accent">Bookmarks</Link></li>
                <li><Link to="/search" className="text-news-secondary hover:text-news-accent">Search</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-news-primary">Categories</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/category/technology" className="text-news-secondary hover:text-news-accent">Technology</Link></li>
                <li><Link to="/category/startups" className="text-news-secondary hover:text-news-accent">Startups</Link></li>
                <li><Link to="/category/apps" className="text-news-secondary hover:text-news-accent">Apps</Link></li>
                <li><Link to="/category/gadgets" className="text-news-secondary hover:text-news-accent">Gadgets</Link></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-semibold mb-3 text-news-primary">About</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-news-secondary hover:text-news-accent">About Us</Link></li>
                <li><Link to="/privacy" className="text-news-secondary hover:text-news-accent">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-news-secondary hover:text-news-accent">Terms of Service</Link></li>
                <li><Link to="/contact" className="text-news-secondary hover:text-news-accent">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-100 text-sm text-center text-news-secondary">
          <p>© {new Date().getFullYear()} TechNews. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

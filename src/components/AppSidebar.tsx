
import { Link, useLocation } from "react-router-dom";
import { Home, Search, BookmarkPlus, TrendingUp, Star, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import SidebarCollapsibleSection from "./SidebarCollapsibleSection";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();

  const mainNavLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "All Posts", path: "/all-posts", icon: Home },
    { name: "Search", path: "/search", icon: Search },
    { name: "Bookmarks", path: "/bookmarks", icon: BookmarkPlus },
  ];

  const discoverLinks = [
    { name: "Trending", path: "/trending", icon: TrendingUp },
    { name: "Featured", path: "/featured", icon: Star },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarRail />
      {/* Collapsible trigger */}
      <SidebarTrigger className="absolute top-2 right-2 md:hidden" />
      <SidebarHeader className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-news-accent">NewsApp</h1>
        {/* Desktop toggle (collapse/expand) */}
        <button
          aria-label={state === "expanded" ? "Collapse sidebar" : "Expand sidebar"}
          onClick={toggleSidebar}
          className="hidden md:flex items-center justify-center p-1 rounded hover:bg-gray-100 transition"
        >
          {state === "expanded" ? (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarCollapsibleSection title="Main Navigation" defaultOpen={true}>
          {mainNavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center px-4 py-2 text-sm rounded-md transition-colors",
                isActive(link.path)
                  ? "bg-news-accent text-white font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <link.icon className="mr-3 h-5 w-5" />
              {link.name}
            </Link>
          ))}
        </SidebarCollapsibleSection>

        <SidebarCollapsibleSection title="Discover" defaultOpen={true}>
          {discoverLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center px-4 py-2 text-sm rounded-md transition-colors",
                isActive(link.path)
                  ? "bg-news-accent text-white font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <link.icon className="mr-3 h-5 w-5" />
              {link.name}
            </Link>
          ))}
        </SidebarCollapsibleSection>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <Link
          to="/about"
          className="block mx-2 my-1 px-4 py-2 text-sm text-center rounded-md hover:bg-gray-100"
        >
          About
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}

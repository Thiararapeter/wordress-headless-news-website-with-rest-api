
import { Link, useLocation } from "react-router-dom";
import { BookmarkIcon, ChevronLeft, ChevronRight, Grid3x3, Home, LayoutGrid, Menu, SearchIcon, TrendingUp, Star, X } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { useState } from "react";

export function AppSidebar() {
  const location = useLocation();
  const { toggleSidebar, isMobile, state } = useSidebar();
  const [isMainNavOpen, setIsMainNavOpen] = useState(true);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(true);
  
  const isExpanded = state === "expanded";
  
  const mainMenuItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "All Posts",
      url: "/all-posts",
      icon: Grid3x3,
    },
    {
      title: "Search",
      url: "/search",
      icon: SearchIcon,
    },
    {
      title: "Bookmarks",
      url: "/bookmarks",
      icon: BookmarkIcon,
    },
  ];
  
  const otherPages = [
    {
      title: "Trending",
      url: "/trending",
      icon: TrendingUp,
    },
    {
      title: "Featured",
      url: "/featured",
      icon: Star,
    },
  ];

  const toggleMainNav = () => {
    setIsMainNavOpen(!isMainNavOpen);
  };

  const toggleDiscover = () => {
    setIsDiscoverOpen(!isDiscoverOpen);
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader>
        <div className="flex items-center justify-between px-4 py-2">
          <Link to="/" className="flex items-center gap-2">
            <Menu className="h-6 w-6 text-news-accent" />
            <h1 className="text-xl font-bold">NewsApp</h1>
          </Link>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between px-2">
            <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={toggleMainNav}
            >
              {isMainNavOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {isMainNavOpen && (
            <SidebarGroupContent>
              <SidebarMenu>
                {mainMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={location.pathname === item.url}
                    >
                      <Link to={item.url}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
        
        <SidebarGroup>
          <div className="flex items-center justify-between px-2">
            <SidebarGroupLabel>Discover</SidebarGroupLabel>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={toggleDiscover}
            >
              {isDiscoverOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {isDiscoverOpen && (
            <SidebarGroupContent>
              <SidebarMenu>
                {otherPages.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={location.pathname === item.url}
                    >
                      <Link to={item.url}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="p-4">
          <Link to="/about">
            <Button variant="outline" className="w-full">
              About
            </Button>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

function ChevronDown(props: React.ComponentProps<typeof ChevronLeft>) {
  return <ChevronLeft className="rotate-90" {...props} />;
}

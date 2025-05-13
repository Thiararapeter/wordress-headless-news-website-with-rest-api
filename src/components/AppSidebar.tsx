
import { Link, useLocation } from "react-router-dom";
import { BookmarkIcon, Grid3x3, LayoutGrid, Menu, SearchIcon } from "lucide-react";
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
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";

export function AppSidebar() {
  const location = useLocation();
  
  const mainMenuItems = [
    {
      title: "Home",
      url: "/",
      icon: LayoutGrid,
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
    },
    {
      title: "Featured",
      url: "/featured",
    },
  ];

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader>
        <div className="flex items-center justify-between px-4 py-2">
          <Link to="/" className="flex items-center gap-2">
            <Menu className="h-6 w-6 text-news-accent" />
            <h1 className="text-xl font-bold">NewsApp</h1>
          </Link>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
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
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Discover</SidebarGroupLabel>
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
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="p-4">
          <Button variant="outline" className="w-full">
            About
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

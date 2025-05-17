import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookmarksProvider } from "@/contexts/BookmarksContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import ArticlePage from "./pages/ArticlePage";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import BookmarksPage from "./pages/BookmarksPage";
import NotificationsPage from "./pages/NotificationsPage";
import AllPostsPage from "./pages/AllPostsPage";
import TrendingPage from "./pages/TrendingPage";
import FeaturedPage from "./pages/FeaturedPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import TopicsPage from "./pages/TopicsPage";
import LeadersPage from "./pages/LeadersPage";
import CommunityPage from "./pages/CommunityPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BookmarksProvider>
        <BrowserRouter>
          <SidebarProvider>
            <div className="flex w-full min-h-screen">
              <AppSidebar />
              <div className="flex flex-col flex-1">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/article/:slug" element={<ArticlePage />} />
                    <Route path="/category/:slug" element={<CategoryPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/bookmarks" element={<BookmarksPage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/all-posts" element={<AllPostsPage />} />
                    <Route path="/trending" element={<TrendingPage />} />
                    <Route path="/featured" element={<FeaturedPage />} />
                    <Route path="/topics" element={<TopicsPage />} />
                    <Route path="/leaders" element={<LeadersPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </BookmarksProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

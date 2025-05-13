
import { BookmarkedPost } from "@/types/wordpress";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface BookmarksContextProps {
  bookmarks: BookmarkedPost[];
  addBookmark: (post: BookmarkedPost) => void;
  removeBookmark: (postId: number) => void;
  isBookmarked: (postId: number) => boolean;
}

const BookmarksContext = createContext<BookmarksContextProps | undefined>(undefined);

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
};

export const BookmarksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<BookmarkedPost[]>([]);

  // Load bookmarks from localStorage on initial render
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('news-bookmarks');
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
    } catch (error) {
      console.error('Failed to load bookmarks from localStorage:', error);
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('news-bookmarks', JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Failed to save bookmarks to localStorage:', error);
    }
  }, [bookmarks]);

  const addBookmark = (post: BookmarkedPost) => {
    setBookmarks(prev => {
      if (prev.some(b => b.id === post.id)) {
        return prev;
      }
      toast.success('Article bookmarked');
      return [...prev, post];
    });
  };

  const removeBookmark = (postId: number) => {
    setBookmarks(prev => {
      toast.success('Bookmark removed');
      return prev.filter(bookmark => bookmark.id !== postId);
    });
  };

  const isBookmarked = (postId: number) => {
    return bookmarks.some(bookmark => bookmark.id === postId);
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarksContext.Provider>
  );
};

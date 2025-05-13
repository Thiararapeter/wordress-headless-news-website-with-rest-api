
import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import { BookmarksProvider } from "@/contexts/BookmarksContext";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <BookmarksProvider>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <HomePage />
        </main>
        <Footer />
      </div>
    </BookmarksProvider>
  );
};

export default Index;

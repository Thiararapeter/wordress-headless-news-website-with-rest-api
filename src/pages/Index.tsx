
import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import HomePage from "@/pages/HomePage";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <HomePage />
    </>
  );
};

export default Index;

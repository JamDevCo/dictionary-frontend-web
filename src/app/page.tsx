import HomeHeader from "@/components/header/HomeHeader";
import DictionarySection from "@/components/index/DictionarySection";
import GrammarSection from "@/components/index/GrammarSection";
import ShopYahso from "@/components/index/ShopYahso";
import Wordplay from "@/components/index/Wordplay";
import VideoSection from "@/components/videoSection/VideoSection";

export default function Home() {
  return (
    <main className="bg-gray-50">
      <HomeHeader />
      <DictionarySection />
      <GrammarSection />
      <ShopYahso />
      <Wordplay />
      <VideoSection />
    </main>
  );
}

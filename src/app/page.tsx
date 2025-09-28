import Layout from "@/app/layout";
import HomeHeader from "@/components/header/HomeHeader";
import DictionarySections from "@/components/index/DictionarySection";
import GrammarUsage from "@/components/index/GrammarSection";
import VideosSection from "@/components/videoSection/VideoSection";

export default function Home() {
  return (
    <main className="pb-[90px]">
      <HomeHeader />
      <DictionarySections/>
      <GrammarUsage/>
      <VideosSection/>
      <GrammarUsage/>
    </main>
  );
}

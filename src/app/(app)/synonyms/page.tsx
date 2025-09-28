import Header from "@/components/header/Header";
import Quiz from "@/components/quiz/Quiz";
import SynonymsList from "@/components/synonyms/synonymsList";

export default function Home() {
  return (
    <main className="pb-[90px]">
      <Header
        title="Synonyms"
        description={`Synonyms are words or phrases that means exactly or nearly the same as another word or phrase in the same language, for example shut is a synonym of close.
"“shut” is a synonym of “close”"`}
      />
      <SynonymsList />
      <Quiz />
    </main>
  );
}

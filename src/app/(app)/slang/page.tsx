import AntonymsList from "@/components/antonyms/antonymsList";
import Header from "@/components/header/Header";
import Quiz from "@/components/quiz/Quiz";
import VocabularyQuiz from "@/components/quiz/VocabularyQuiz";
import SlangGrid from "@/components/slang/SlangGrid";

export default function Page() {
  return (
    <main className="pb-[90px]">
      <Header title="Slangs" />
      <SlangGrid />
      <VocabularyQuiz />
      <SlangGrid />
      <Quiz />
    </main>
  );
}

import DidYouKnow from "@/components/wordOfTheDay/DidYouKnow";
import MoreWordsOfTheDay from "@/components/wordOfTheDay/MoreWordsOfTheDay";
import VocabularyQuiz from "@/components/quiz/VocabularyQuiz";
import WordContext from "@/components/wordOfTheDay/WordContext";
import WordOfTheDay from "@/components/wordOfTheDay/WordOfTheDay";

export default function Page() {
  return (
    <main className="pb-[90px]">
      <WordOfTheDay />
      <WordContext />
      <DidYouKnow />
      <VocabularyQuiz />
      <MoreWordsOfTheDay />
    </main>
  );
}

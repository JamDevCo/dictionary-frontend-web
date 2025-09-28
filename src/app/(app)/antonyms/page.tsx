import AntonymsList from "@/components/antonyms/antonymsList";
import Header from "@/components/header/Header";
import Quiz from "@/components/quiz/Quiz";

export default function Home() {
  return (
    <main className="pb-[90px]">
      <Header
        title="Antonyms"
        description={`In English, an antonym is a word that means the opposite of another word. For example, "hot" and "cold" are antonyms, as are "good" and "bad". The term "antonym" comes from the Greek words anti (meaning "opposite") and onym (meaning "name"). `}
      />
      <AntonymsList />
      <Quiz />
    </main>
  );
}

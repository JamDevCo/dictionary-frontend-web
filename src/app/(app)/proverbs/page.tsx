import Header from "@/components/header/Header";
import ProverbsAccordion from "@/components/proverbs/ProverbsAccordion";
import Quiz from "@/components/quiz/Quiz";

export default function Page() {
  return (
    <main className="pb-[90px]">
      <Header
        title="Proverbs"
        description={`Jamaican proverbs, known as "patwa" or "patois" sayings, are rich with cultural wisdom and offer guidance 
          on various aspects of life. Many proverbs emphasize the importance of hard work, perseverance, and 
          humility, while also warning against negativity, carelessness, and deception.`}
      />
      <ProverbsAccordion />
      <Quiz />
    </main>
  );
}

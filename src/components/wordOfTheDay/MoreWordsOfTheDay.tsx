"use client";

import React from "react";
import { Section } from "@/components/section";

interface WordEntry {
  date: string;
  word: string;
}

export default function MoreWordsOfTheDay() {
  const words: WordEntry[] = [
    { date: "JUL 21", word: "Yah" },
    { date: "JUL 20", word: "Dem" },
    { date: "JUL 19", word: "Dutty" },
    { date: "JUL 18", word: "Mawga" },
    { date: "JUL 17", word: "Neva" },
    { date: "JUL 16", word: "Kukumba" },
  ];

  return (
    <Section
      as="div"
      card
      divider="bottom"
      title="More Words of the Day"
      align="center"
    >
      <div className="text-center">
        <div className="grid grid-cols-2 gap-x-16 gap-y-8 max-w-2xl mx-auto">
          {words.map((entry, index) => (
            <div key={index} className="text-center">
              <p className="text-sm text-gray-600 mb-2 uppercase tracking-wide">
                {entry.date}
              </p>
              <button className="text-2xl font-medium text-red-600 hover:text-red-700 transition-colors cursor-pointer">
                {entry.word}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <button className="text-green-600 hover:text-green-700 font-bold text-sm transition-colors uppercase tracking-wide">
            SEE ALL WORDS OF THE DAY
          </button>
        </div>
      </div>
    </Section>
  );
}

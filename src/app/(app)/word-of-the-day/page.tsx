
"use client";

import DidYouKnow from "@/components/wordOfTheDay/DidYouKnow";
import MoreWordsOfTheDay from "@/components/wordOfTheDay/MoreWordsOfTheDay";
import VocabularyQuiz from "@/components/quiz/VocabularyQuiz";
import WordContext from "@/components/wordOfTheDay/WordContext";
import WordOfTheDay from "@/components/wordOfTheDay/WordOfTheDay";
import { Volume2, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";

export default function Page() {

   
  const [wordOfTheDay, setWordOfTheDay] = useState({word_of_the_day:{word:'', pronunciation:''}, meaning:{definition:'', example:''}});
  

   const getWordOfTheDay = async () => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/adjustWordOfTheDay`).then((res) => {
        setWordOfTheDay(res.data.data);
      });
    }

    useEffect(() => {
      getWordOfTheDay();
    }, [])

  return (
    <main className="pb-[90px]">
      <div className="max-w-6xl mx-auto p-8 ">
      {/* Header with navigation */}
      <div className="flex items-center justify-between mb-8">
        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-400" />
        </button>

        <div className="text-center">
          <h1 className="text-lg font-medium text-gray-700 mb-1">
            Word of the day
          </h1>
          <p className="text-sm text-gray-500">{moment().format('MMMM Do YYYY, h:mm:ss a')}</p>
        </div>

        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      {/* Word section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h2 className="text-6xl font-light text-gray-900">{wordOfTheDay.word_of_the_day.word}</h2>
          {/* <button
            onClick={handlePronunciation}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label={`Play pronunciation of ${word}`}
          >
            <Volume2 className="w-6 h-6 text-gray-600" />
          </button> */}
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <span className="bg-gray-200 px-3 py-1 rounded-full">
            {wordOfTheDay.meaning.part_of_speech}
          </span>
          <span>|</span>
          <span>{wordOfTheDay.word_of_the_day.pronunciation}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-green-300 mb-8"></div>

      {/* Definition section */}
      <div className="mb-8">
        <h3 className="text-xl font-medium text-gray-900 mb-4">
          What It means
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">{wordOfTheDay.meaning.definition}</p>
        <p className="text-gray-600 italic text-sm leading-relaxed">
          // {wordOfTheDay.meaning.example}
        </p>
      </div>

      {/* See the entry link */}
      <div className="pt-4">
        <button className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors">
          See the entry &gt;
        </button>
      </div>
    </div>
      <div className="max-w-6xl mx-auto  p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column - Context */}
        <div>
          <h2 className="text-2xl font-medium text-gray-900 mb-6">
            NYAM in Context
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. A non ut blandit sit eget
            sodales malesuada laoreet. Tincidunt duis eget id integer eu arcu.
            Congue bibendum ut eget bibendum. Consectetur nisl blandit mattis
            auctor scelerisque a ornare morbi. Rhoncus pulvinar justo elit
            faucibus. Aliquet lectus sit turpis pharetra sagittis. Quis est mi
            euismod urna pellentesque placerat tempus. Sed et morbi vulputate
            elementum. Pellentesque malesuada sit massa arcu pretium. Eget quis
            malesuada cras a id cursus tristique viverra. Eros suspendisse et
            viverra quis enim ornare nisl nulla congue.
          </p>
        </div>

        {/* Right Column - Newsletter Signup */}
        
      </div>
    </div>
    
      {/* <DidYouKnow />
      <VocabularyQuiz />
      <MoreWordsOfTheDay /> */}
    </main>
  );
}

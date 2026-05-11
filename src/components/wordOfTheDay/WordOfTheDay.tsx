"use client";

import React from "react";
import { Volume2, ChevronLeft, ChevronRight } from "lucide-react";

interface WordOfTheDayProps {
  date?: string;
  word?: string;
  pronunciation?: string;
  partOfSpeech?: string;
  definition?: string;
  example?: string;
}

export default function WordOfTheDay() {
  const date = "July 28, 2025";
  const word = "nyam";
  const pronunciation = "ni-yam";
  const partOfSpeech = "verb";
  const definition =
    "Lorem ipsum dolor sit amet consectetur. Ultrices et eu accumsan vitae. Quis sed augue id.";
  const example =
    "Lorem ipsum dolor sit amet consectetur. Ultrices et eu accumsan vitae. Quis sed augue id.";
  const handlePronunciation = () => {
    // This would typically trigger text-to-speech or audio playback
    console.log(`Playing pronunciation for: ${word}`);
  };

  return (
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
          <p className="text-sm text-gray-500">{date}</p>
        </div>

        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      {/* Word section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h2 className="text-6xl font-light text-gray-900">{word}</h2>
          <button
            onClick={handlePronunciation}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label={`Play pronunciation of ${word}`}
          >
            <Volume2 className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <span className="bg-gray-200 px-3 py-1 rounded-full">
            {partOfSpeech}
          </span>
          <span>|</span>
          <span>{pronunciation}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-green-300 mb-8"></div>

      {/* Definition section */}
      <div className="mb-8">
        <h3 className="text-xl font-medium text-gray-900 mb-4">
          What It means
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">{definition}</p>
        <p className="text-gray-600 italic text-sm leading-relaxed">
          {`// ${example}`}
        </p>
      </div>

      {/* See the entry link */}
      <div className="pt-4">
        <button className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors">
          See the entry &gt;
        </button>
      </div>
    </div>
  );
}

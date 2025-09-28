'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SynonymGroup {
  word: string;
  translations: string[];
  meanings: {
    type: string;
    description: string;
    examples: string[];
  }[];
  synonyms: string[];
}

export default function SynonymsList() {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  const synonymGroups: SynonymGroup[] = [
    {
      word: "Gweh",
      translations: ["Go away or departure"],
      meanings: [
        {
          type: "To tell someone to leave",
          description: "It's a direct way to say someone needs to go.",
          examples: [
            "As a playful or informal expression, it can be a playful way to tell someone to leave.",
            "To mean 'exit' or 'leave'; it signifies departure."
          ]
        }
      ],
      synonyms: ["-Lorem", "-Nisi", "-Lorem", "-Lorem"]
    },
    {
      word: "Sem",
      translations: [],
      meanings: [],
      synonyms: ["-Lorem", "-Urna", "-Lorem", "-Lorem"]
    },
    {
      word: "Fnim",
      translations: [],
      meanings: [],
      synonyms: ["-Lorem", "-Quis", "-Lorem", "-Lorem"]
    },
    {
      word: "Amet",
      translations: [],
      meanings: [],
      synonyms: ["-Lorem", "-Lorem", "-Lorem", "-Lorem"]
    },
    {
      word: "Soming",
      translations: [],
      meanings: [],
      synonyms: ["-Sinting", "-Sintin", "-Somt'm"]
    },
    {
      word: "Si et",
      translations: [],
      meanings: [],
      synonyms: ["-Lorem", "-Enim", "-Lorem", "-Lorem"]
    },
    {
      word: "Sah",
      translations: [],
      meanings: [],
      synonyms: ["-Lorem", "-Lorem", "-Lorem"]
    },
    {
      word: "Amet",
      translations: [],
      meanings: [],
      synonyms: ["-Lorem", "-Amet", "-Lorem", "-Lorem"]
    },
    {
      word: "Arcu",
      translations: [],
      meanings: [],
      synonyms: ["-Lorem", "-Velit", "-Lorem", "-Lorem"]
    },
    {
      word: "Lorem",
      translations: [],
      meanings: [],
      synonyms: ["-Lorem", "-Nisi", "-Lorem", "-Lorem"]
    },
    {
      word: "Bredda",
      translations: [],
      meanings: [],
      synonyms: ["-Breddren"]
    },
    {
      word: "Sem",
      translations: [],
      meanings: [],
      synonyms: ["-Lorem", "-Amet", "-Lorem", "-Lorem"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-20">
        {synonymGroups.map((group, index) => (
          <div key={index} className="relative">
            {/* Word Button */}
            <div
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredWord(group.word + index)}
              onMouseLeave={() => setHoveredWord(null)}
            >
              <div className="flex items-center gap-2 text-lg font-medium text-gray-900 hover:text-green-600 transition-colors">
                <span>{group.word}</span>
                <ChevronDown className="w-4 h-4 text-green-600" />
              </div>
              
              {/* Dropdown Content */}
              {hoveredWord === group.word + index && (
                <div className="absolute left-0  w-150 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
                  {/* English Translation */}
                  {group.translations.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">English Translation :</h4>
                      {group.translations.map((translation, idx) => (
                        <p key={idx} className="text-gray-700 text-sm">{translation}</p>
                      ))}
                    </div>
                  )}
                  
                  {/* Meaning */}
                  {group.meanings.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Meaning :</h4>
                      {group.meanings.map((meaning, idx) => (
                        <div key={idx} className="mb-2">
                          <p className="text-gray-700 text-sm font-medium">{meaning.type}</p>
                          <p className="text-gray-600 text-sm">{meaning.description}</p>
                          {meaning.examples.map((example, exampleIdx) => (
                            <p key={exampleIdx} className="text-gray-600 text-sm mt-1">• {example}</p>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Static Synonyms List */}
            <div className="mt-2 space-y-1">
              {group.synonyms.map((synonym, idx) => (
                <p key={idx} className="text-gray-600 text-sm font-bold">{synonym}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
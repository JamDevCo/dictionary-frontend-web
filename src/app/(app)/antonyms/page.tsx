"use client";

import AntonymsList from "@/components/antonyms/antonymsList";
import Header from "@/components/header/Header";
import Quiz from "@/components/quiz/Quiz";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';


interface AntonymGroup {
  word: string;
  translations: string[];
  meanings: {
    type: string;
    description: string;
    examples: string[];
  }[];
  Antonyms: string[];
}

export default function Home() {


   const [hoveredWord, setHoveredWord] = useState<string | null>(null);
   const [antonyms, setAntonyms] = useState([]);

   const getAntonyms = async () => {
     let result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getAntonyms`);
     console.log(result.data);
      setAntonyms(result.data);
   }

  useEffect(() => {
    getAntonyms();
  }, []);
  
    const AntonymGroups: AntonymGroup[] = [
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
        Antonyms: ["-Lorem", "-Nisi", "-Lorem", "-Lorem"]
      },
      {
        word: "Sem",
        translations: [],
        meanings: [],
        Antonyms: ["-Lorem", "-Urna", "-Lorem", "-Lorem"]
      },
      {
        word: "Fnim",
        translations: [],
        meanings: [],
        Antonyms: ["-Lorem", "-Quis", "-Lorem", "-Lorem"]
      },
      {
        word: "Amet",
        translations: [],
        meanings: [],
        Antonyms: ["-Lorem", "-Lorem", "-Lorem", "-Lorem"]
      },
      {
        word: "Soming",
        translations: [],
        meanings: [],
        Antonyms: ["-Sinting", "-Sintin", "-Somt'm"]
      },
      {
        word: "Si et",
        translations: [],
        meanings: [],
        Antonyms: ["-Lorem", "-Enim", "-Lorem", "-Lorem"]
      },
      {
        word: "Sah",
        translations: [],
        meanings: [],
        Antonyms: ["-Lorem", "-Lorem", "-Lorem"]
      },
      {
        word: "Amet",
        translations: [],
        meanings: [],
        Antonyms: ["-Lorem", "-Amet", "-Lorem", "-Lorem"]
      },
      {
        word: "Arcu",
        translations: [],
        meanings: [],
        Antonyms: ["-Lorem", "-Velit", "-Lorem", "-Lorem"]
      },
      {
        word: "Lorem",
        translations: [],
        meanings: [],
        Antonyms: ["-Lorem", "-Nisi", "-Lorem", "-Lorem"]
      },
      {
        word: "Bredda",
        translations: [],
        meanings: [],
        Antonyms: ["-Breddren"]
      },
      {
        word: "Sem",
        translations: [],
        meanings: [],
        Antonyms: ["-Lorem", "-Amet", "-Lorem", "-Lorem"]
      }
    ];

  return (
    <main className="pb-[90px]">
      <Header
        title="Antonyms"
        description={`In English, an antonym is a word that means the opposite of another word. For example, "hot" and "cold" are antonyms, as are "good" and "bad". The term "antonym" comes from the Greek words anti (meaning "opposite") and onym (meaning "name"). `}
      />
      <div className="max-w-6xl mx-auto bg-gray-50 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-20">
        {antonyms.map((group, index) => (
          <div key={index} className="relative">
            {/* Word Button */}
            <div
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredWord(group.meaning.definition + index)}
              onMouseLeave={() => setHoveredWord(null)}
            >
              <div className="flex items-center gap-2 text-lg font-medium text-gray-900 hover:text-green-600 transition-colors">
                <span>{group.antonym}</span>
                <ChevronDown className="w-4 h-4 text-green-600" />
              </div>
              
              {/* Dropdown Content */}
              {hoveredWord === group.meaning.definition + index && (
                <div className="absolute left-0  w-150 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
                  {/* English Translation */}
                  
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 ">Antonym :</h4>
                      <p  className="text-gray-700 text-sm mb-1">{group.meaning.definition}</p>

                      <h4 className="font-semibold text-gray-900 ">Antonym part of speech :</h4>
                      <p  className="text-gray-700 text-sm mb-2">{group.meaning.part_of_speech}</p>
                    
                    </div>
                 
                  
                  {/* Meaning */}
                  {/* {group.meanings.length > 0 && (
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
                  )} */}
                </div>
              )}
            </div>
            
            {/* Static Antonyms List */}
            <div className="mt-2 space-y-1">
              {/* {group.Antonyms.map((Antonym, idx) => (
                <p key={idx} className="text-gray-600 text-sm font-bold">{Antonym}</p>
              ))} */}
            </div>
          </div>
        ))}
      </div>
    </div>
    </main>
  );
}

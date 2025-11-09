"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function Page() {
  const params = useParams();
  const id = params?.id ?? "nuff";
  const [loading, setLoading] = useState(true);
  const [word, setWord] = useState({word:'', pronounciation:''});
  const [meaning, setMeaning] = useState({definition:'', example:'', part_of_speech:''});
  const [thesaurusList, setThesaurusList] = useState([]);
  

  const pos = "adjective";
  const pron = "noff";


    const getThesarusinformation = async () => {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getThesaurus/${id}`);
        setWord(response.data.word);
        setMeaning(response.data.word_meaning);
        setThesaurusList(response.data.list);
        setLoading(false);
    }


    useEffect(() => {
        getThesarusinformation();
    }, [])

  const senses = [
    {
      title: "1. as in many",
      gloss: "Large in quantity",
      example: "e.g. Di banana dem nuff dis season",
      synonyms: [
        "whole Yeep","a lot","plenti","pile","bongle","chunk","quantity","stack",
        "volume","platefull","reams","wealth","truck load","thousands","heap","boat load"
      ],
      antonyms: ["likkle bit","a copple","shaatege","scrappings","an full","grain"]
    },
    {
      title: "2. as in prying",
      gloss: "excessively interested in a person's private affairs.",
      example: "e.g. Close di window dem. Him too nuff.",
      synonyms: ["extra","fass","nosy","nuffesha","fassie"],
      antonyms: ["umble","mannas","modes","shai","decent"]
    }
  ];

  return (
    <main className="min-h-screen  bg-gray-50 py-6">
      {loading == false && <div className=" px-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Left sidebar */}
          <aside className="col-span-12 md:col-span-2 bg-green-700 text-white rounded-md p-5">
            <h2 className="text-xl font-bold">Thesaurus</h2>
            <p className="text-sm opacity-90">Synonyms of {word.word}</p>

            <div className="mt-4 text-sm p-3 rounded">
              <div className="font-semibold">{meaning.part_of_speech ? meaning.part_of_speech.toUpperCase() : ''}</div>
              
              {thesaurusList.map((s, idx) => ( <div key={idx} className="mt-2 text-xs opacity-90">{s.synonym.word}</div> ))}
            </div>
          </aside>

          {/* Main content */}
          <section className="col-span-12 md:col-span-8 bg-white rounded-md p-6 shadow-sm">
            <header className="flex items-start justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <h1 className="text-3xl font-extralight">{word.word}</h1>
                  <span className="text-sm text-gray-600">{word.pronounciation}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">{word.pronunciation} · pronunciation</div>
              </div>

              <div className="text-right">
                <a className="text-green-700 text-sm font-medium hover:underline" href={`/word/${word.id}`}>definition of {word.word} &gt;</a>
              </div>
            </header>

            <hr className="my-5 border-gray-200" />

            {thesaurusList.map((s, idx) => (
              <article key={idx} className="mb-6">
                <h4 className="font-semibold mb-1">{s.synonym.word}</h4>
                <p className="text-sm text-gray-700 mb-2">{s.meaning.definition}</p>
                <p className="text-sm text-gray-700 italic mt-4">e.g. {s.meaning.example}</p>

                {/* <div className="mb-4">
                  <div className="text-sm font-medium mb-2">Synonyms and Similar Words</div>
                  <div className="flex flex-wrap gap-2">
                    {s.synonyms.map((syn) => (
                      <span key={syn} className="bg-yellow-400 text-yellow-900 text-sm px-3 py-1 rounded-full shadow-sm">
                        {syn}
                      </span>
                    ))}
                  </div>
                </div> */}

                {/* <div>
                  <div className="text-sm font-medium mb-2">Antonyms and Near Antonyms</div>
                  <div className="flex flex-wrap gap-2">
                    {s.antonyms.map((ant) => (
                      <span key={ant} className="bg-gray-800 text-white text-sm px-3 py-1 rounded-full">
                        {ant}
                      </span>
                    ))}
                  </div>
                </div> */}

                {/* <hr className="mt-5 border-dashed border-gray-200" /> */}
              </article>
            ))}

            {/* <div className="text-sm text-gray-700 italic mt-4">
              "Have, nuff gyal and none of dem mustn't grumble" — Beenie Man, Nuff gyal, 1996
              <div className="mt-2">"Jah Jah, You Too Nuff" — Anna Mckreith, Journal, January 28th 2023</div>
            </div> */}
          </section>

        </div>
      </div>}
    </main>
  );
}

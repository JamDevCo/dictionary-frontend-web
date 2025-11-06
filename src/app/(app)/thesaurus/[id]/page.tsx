"use client";

import React from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id = params?.id ?? "nuff";

  // sample data — replace with API fetch when ready
  const word = id;
  const pos = "adjective";
  const pron = "noff";
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
      <div className=" px-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Left sidebar */}
          <aside className="col-span-12 md:col-span-2 bg-green-700 text-white rounded-md p-5">
            <h2 className="text-xl font-bold">Thesaurus</h2>
            <p className="text-sm opacity-90">Synonyms of {word}</p>

            <div className="mt-4 text-sm bg-green-800 p-3 rounded">
              <div className="font-semibold">noun</div>
              <div className="mt-2 text-xs opacity-90">as in many</div>
              <div className="mt-3 text-xs">Example Sentences</div>
            </div>
          </aside>

          {/* Main content */}
          <section className="col-span-12 md:col-span-8 bg-white rounded-md p-6 shadow-sm">
            <header className="flex items-start justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <h1 className="text-3xl font-extralight">{word}</h1>
                  <span className="text-sm text-gray-600">{pos}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">{pron} · pronunciation</div>
              </div>

              <div className="text-right">
                <a className="text-green-700 text-sm font-medium hover:underline">definition of {word} &gt;</a>
              </div>
            </header>

            <hr className="my-5 border-gray-200" />

            {senses.map((s, idx) => (
              <article key={idx} className="mb-6">
                <h4 className="font-semibold mb-1">{s.title}</h4>
                <p className="text-sm text-gray-700 mb-2">{s.gloss}</p>
                <p className="text-xs text-gray-500 italic mb-4">{s.example}</p>

                <div className="mb-4">
                  <div className="text-sm font-medium mb-2">Synonyms and Similar Words</div>
                  <div className="flex flex-wrap gap-2">
                    {s.synonyms.map((syn) => (
                      <span key={syn} className="bg-yellow-400 text-yellow-900 text-sm px-3 py-1 rounded-full shadow-sm">
                        {syn}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Antonyms and Near Antonyms</div>
                  <div className="flex flex-wrap gap-2">
                    {s.antonyms.map((ant) => (
                      <span key={ant} className="bg-gray-800 text-white text-sm px-3 py-1 rounded-full">
                        {ant}
                      </span>
                    ))}
                  </div>
                </div>

                <hr className="mt-5 border-dashed border-gray-200" />
              </article>
            ))}

            <div className="text-sm text-gray-700 italic mt-4">
              "Have, nuff gyal and none of dem mustn't grumble" — Beenie Man, Nuff gyal, 1996
              <div className="mt-2">"Jah Jah, You Too Nuff" — Anna Mckreith, Journal, January 28th 2023</div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Volume2 } from "lucide-react";

interface Game {
  id: number;
  title: string;
  image: string;
}

interface Word {
  rank: number;
  word: string;
}

const games: Game[] = [
  {
    id: 1,
    title: "Name the Animal",
    image:
      "https://images.unsplash.com/photo-1574781330855-d0db2706b3d0?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Guess the Folklore",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    title: "Name the Dish",
    image:
      "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=300&h=200&fit=crop",
  },
  {
    id: 4,
    title: "Guess the meaning of the Jamaican Proverb",
    image:
      "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=300&h=200&fit=crop",
  },
];

const topWords: Word[] = [
  { rank: 1, word: "Duppy" },
  { rank: 2, word: "Riva Muma" },
  { rank: 3, word: "Heng" },
  { rank: 4, word: "Bulla" },
  { rank: 5, word: "Deh" },
  { rank: 6, word: "Dutty" },
  { rank: 7, word: "Nyam" },
  { rank: 8, word: "Mada" },
  { rank: 9, word: "Breda" },
  { rank: 10, word: "Fren" },
];

export default function DictionarySection() {
  const [email, setEmail] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Word of the day signup:", email);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Games and Quizzes */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Games and Quizzes
          </h2>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="grid grid-cols-2 gap-3 mb-3">
              {games.map((game) => (
                <button
                  key={game.id}
                  className="relative h-28 rounded-md overflow-hidden group"
                >
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 left-2 right-2 bg-yellow-400/95 rounded px-2 py-1 text-[11px] font-medium text-black text-center leading-tight">
                    {game.title}
                  </span>
                </button>
              ))}
            </div>

            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2.5 rounded-md transition-colors">
              More Games and Qiuzzes
            </button>
          </div>
        </div>

        {/* Word of the day */}
        <div>
          <div className="text-center mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Word of the day
            </h2>
            <p className="text-gray-600">July 28, 2025</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="relative h-56 rounded-md overflow-hidden mb-4">
              <Image
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=400&fit=crop"
                alt="Nyam"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-gray-900 drop-shadow">
                    Nyam
                  </span>
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary">
                    <Volume2 className="w-4 h-4 text-white" />
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-900 drop-shadow">
                  Definition and examples
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-3">
              Get your word of the day daily email!
            </p>

            <form onSubmit={handleSignup} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Your email address"
                className="flex-1 min-w-0 px-3 py-2 bg-white border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                className="shrink-0 bg-primary hover:bg-dark-green text-white font-medium px-4 py-2 rounded-md transition-colors"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>

        {/* Top 10 Words today */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Top 10 Words today
          </h2>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {topWords.map((item) => (
              <button
                key={item.rank}
                className="w-full flex items-center gap-4 px-4 py-2.5 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors text-left"
              >
                <span className="font-bold text-gray-900 w-6">{item.rank}</span>
                <span className="font-semibold text-gray-900">{item.word}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

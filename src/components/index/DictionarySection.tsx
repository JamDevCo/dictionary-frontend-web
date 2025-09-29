"use client";

import { useState } from "react";

interface Game {
  id: number;
  title: string;
  image: string;
  bgColor: string;
}

interface Word {
  rank: number;
  word: string;
}

export default function DictionarySections() {
  const [email, setEmail] = useState("");

  const games: Game[] = [
    {
      id: 1,
      title: "Guess the Animal",
      image: "/rooster.jpg", // Replace with actual image
      bgColor: "bg-yellow-400",
    },
    {
      id: 2,
      title: "Guess the Folklore",
      image: "/folklore.jpg", // Replace with actual image
      bgColor: "bg-yellow-100",
    },
    {
      id: 3,
      title: "Guess the Dish",
      image: "/dish.jpg", // Replace with actual image
      bgColor: "bg-yellow-400",
    },
    {
      id: 4,
      title: "Guess the meaning of the Jamaican Proverb",
      image: "/proverb.jpg", // Replace with actual image
      bgColor: "bg-gray-200",
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

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Games and Quizzes Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Games and Quizzes</h2>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="relative cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <div
                    className={`${game.bgColor} rounded-lg overflow-hidden h-24`}
                  >
                    {/* Placeholder for game image */}
                    <div className="w-full h-full flex items-center justify-center">
                      {game.id === 1 && (
                        <div className="text-center">
                          <span className="text-4xl">🐓</span>
                        </div>
                      )}
                      {game.id === 2 && (
                        <div className="text-center">
                          <span className="text-3xl">🏛️</span>
                        </div>
                      )}
                      {game.id === 3 && (
                        <div className="text-center">
                          <span className="text-4xl">🍛</span>
                        </div>
                      )}
                      {game.id === 4 && (
                        <div className="text-center p-2">
                          <span className="text-2xl">📜</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-center mt-1 px-1 line-clamp-2">
                    {game.title}
                  </p>
                </div>
              ))}
            </div>

            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded-md transition-colors">
              More Games and Quizzes
            </button>
          </div>

          {/* Word of the Day Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-2">Word of the day</h2>
            <p className="text-sm text-gray-600 mb-4">July 28, 2025</p>

            <div className="relative mb-4">
              {/* Placeholder for person image */}
              <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-5xl">👤</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-2xl font-bold">Nyam</h3>
                    <button className="text-blue-500 hover:text-blue-600">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Definition and examples
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-3">
              Get your word of the day daily email!
            </p>

            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors">
                Sign up
              </button>
            </div>
          </div>

          {/* Top 10 Words Today Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Top 10 Words today</h2>

            <div className="space-y-2">
              {topWords.map((item) => (
                <div
                  key={item.rank}
                  className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-gray-600 w-6">
                    {item.rank}
                  </span>
                  <span className="text-gray-800">{item.word}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

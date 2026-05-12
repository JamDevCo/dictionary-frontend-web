"use client";

import Image from 'next/image';
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuizCard {
  id: number;
  title: string;
  image: string;
  playText: string;
}

export default function VocabularyQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const quizCards: QuizCard[] = [
    {
      id: 1,
      title: "Name the Animal Quiz",
      image:
        "https://images.unsplash.com/photo-1574781330855-d0db2706b3d0?w=300&h=200&fit=crop&crop=center",
      playText: "PLAY NOW",
    },
    {
      id: 2,
      title: "Guess the Folklore Quiz",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&crop=center",
      playText: "PLAY NOW",
    },
    {
      id: 3,
      title: "Name the Food Quiz",
      image:
        "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=300&h=200&fit=crop&crop=center",
      playText: "PLAY NOW",
    },
    {
      id: 4,
      title: "Geography Challenge",
      image:
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop&crop=center",
      playText: "PLAY NOW",
    },
    {
      id: 5,
      title: "Science Facts Quiz",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=200&fit=crop&crop=center",
      playText: "PLAY NOW",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, quizCards.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.max(1, quizCards.length - 2)) %
        Math.max(1, quizCards.length - 2)
    );
  };

  const getVisibleCards = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % quizCards.length;
      visible.push(quizCards[index]);
    }
    return visible;
  };

  const handleViewAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="max-w-6xl mx-auto  p-8">
      {/* Top decorative line */}
      <div className="w-full h-px bg-green-300 mb-8"></div>

      {/* Quiz Slider Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-medium text-gray-900 text-center mb-8">
          Test Your Vocabulary with M-W Quizzes
        </h2>

        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          {/* Quiz Cards */}
          <div className="flex gap-6 px-16">
            {getVisibleCards().map((card, index) => (
              <div
                key={`${card.id}-${index}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-64 text-center"
              >
                <div className="mb-4 h-32 overflow-hidden rounded-lg">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={256}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {card.title}
                </h3>
                <button className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors">
                  {card.playText} &gt;
                </button>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Quiz Question Section */}
      <div className="mb-8">
        <h3 className="text-xl font-medium text-gray-900 mb-4">
          Test Your Vocabulary with M-W Quizzes
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Fill in the blank that refers to the name of the dish that is
          typically made with grated sweet potato, coconut, cornmeal, sugar and
          spices, all wrapped in banana leaves and steamed :
        </p>
        <p className="text-gray-900 font-medium mb-6">b_u____r_ws</p>

        {showAnswer && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-green-800 font-medium">Answer: blue draws</p>
          </div>
        )}

        <button
          onClick={handleViewAnswer}
          className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors uppercase tracking-wide"
        >
          {showAnswer ? "HIDE THE ANSWER" : "VIEW THE ANSWER"}
        </button>
      </div>

      {/* Bottom decorative line */}
      <div className="w-full h-px bg-green-300"></div>
    </div>
  );
}

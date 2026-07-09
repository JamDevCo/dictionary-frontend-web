"use client";

import GrammarCard from "@/components/card/GrammarCard";
import React from "react";
import { Section, SectionColumns } from "@/components/section";

interface GrammarEntry {
  title: string;
  image: string;
}

export default function GrammarUsage() {
  const grammarEntries: GrammarEntry[] = [
    {
      title: "The continuum between English and Patwah",
      image:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=300&fit=crop",
    },
    {
      title: "How to use 'Dem'",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    },
    {
      title: "Should some words remain in English?",
      image: "/patwah-english.jpg", // You'll need to add this custom image
    },
    {
      title: "Singular to plural",
      image:
        "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=400&h=300&fit=crop",
    },
  ];

  const handleCardClick = (entry: GrammarEntry) => {
    console.log("Clicked on:", entry.title);
    // Add navigation or modal logic here
  };

  return (
    <Section as="div">
      <div className="p-6">
        <div className="bg-green-50 p-6 rounded-lg flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Grammar & Usage</h2>
          <button
            className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
            onClick={() => console.log("See all clicked")}
          >
            See All
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <SectionColumns columns={4} gap="sm">
          {grammarEntries.map((entry, index) => (
            <GrammarCard
              key={index}
              title={entry.title}
              image={entry.image}
              onClick={() => handleCardClick(entry)}
            />
          ))}
        </SectionColumns>
      </div>
    </Section>
  );
}

"use client";

import GrammarCard from "@/components/card/GrammarCard";
import React from "react";
import { SectionBanner, SectionColumns } from "@/components/section";

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SectionBanner title="Grammar & Usage" seeAllHref="#" className="mb-6" />

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
    </section>
  );
}

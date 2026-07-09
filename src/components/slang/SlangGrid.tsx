'use client';

import React from 'react';
import Card from "../card/Card";
import { Section, SectionColumns } from "@/components/section";

interface SlangEntry {
  title: string;
  image: string;
  description: string;
}

export default function Slangs() {
  const slangEntries: SlangEntry[] = [
    {
      title: "Bousy Paupa",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&crop=center",
      description: "A person who expresses affluence in materialistic things or verbally, but can barely afford it."
    },
    {
      title: "Bredren",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop&crop=center",
      description: "A friend or comrade, particularly among males."
    },
    {
      title: "Kus Kus",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop&crop=center",
      description: "Cheap perfume."
    },
    {
      title: "Carry guh bring come",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop&crop=center",
      description: "Gossip or spreading rumors."
    },
    {
      title: "Creamie",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
      description: "An ice-cream man."
    },
    {
      title: "Likky Likky",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&crop=center",
      description: "Greedy."
    },
    {
      title: "Yamhead",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop&crop=center",
      description: "A female who is made to look like a fool by her partner. She is often blindly in love and doesn't realize she is being played."
    },
    {
      title: "Chaka Chaka",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center",
      description: "Untidy."
    }
  ];

  return (
    <Section as="div" background="muted">
      <SectionColumns columns={4} gap="sm">
        {slangEntries.map((entry, index) => (
          <Card
            key={index}
            title={entry.title}
            image={entry.image}
            description={entry.description}
          />
        ))}
      </SectionColumns>
    </Section>
  );
}
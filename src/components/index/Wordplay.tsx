"use client";

import React from "react";
import Image from "next/image";
import { SectionBanner, SectionColumns } from "@/components/section";

interface WordplayItem {
  text: string;
  image: string;
  bgColor: string;
}

const items: WordplayItem[] = [
  {
    text: "Lorem ipsum dolor sit amet consectetur. Mauris.",
    image:
      "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400&h=300&fit=crop",
    bgColor: "bg-gray-200",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur. In.",
    image:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=300&fit=crop",
    bgColor: "bg-amber-50",
  },
  {
    text: "Lorem ipsum dolor sit",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    bgColor: "bg-green-50",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur. Fermentum.",
    image:
      "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&h=300&fit=crop",
    bgColor: "bg-gray-200",
  },
];

export default function Wordplay() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SectionBanner title="Wordplay" seeAllHref="#" className="mb-6" />

      <SectionColumns columns={4} gap="sm">
        {items.map((item, index) => (
          <article
            key={index}
            className={`${item.bgColor} rounded-lg p-3 flex flex-col`}
          >
            <div className="relative h-40 rounded-md overflow-hidden mb-4">
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <p className="text-gray-800 leading-relaxed px-1 pb-2">
              {item.text}
            </p>
          </article>
        ))}
      </SectionColumns>
    </section>
  );
}

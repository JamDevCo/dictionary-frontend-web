"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { SectionBanner } from "@/components/section";

interface ProductGroup {
  name: string;
  image: string;
  items: string[];
}

const groups: ProductGroup[] = [
  {
    name: "Books",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=500&fit=crop",
    items: ["Dictionaries", "Notebooks", "Textbooks", "Planners"],
  },
  {
    name: "Stationaries",
    image:
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&h=500&fit=crop",
    items: ["Pencils", "Erasers", "Scissors", "Pens"],
  },
];

function ProductGroupColumn({ name, image, items }: ProductGroup) {
  return (
    <div className="flex gap-4">
      {/* Category image card */}
      <div className="shrink-0 w-36 bg-white rounded-lg overflow-hidden flex flex-col">
        <div className="relative flex-1 min-h-40">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div className="py-3 text-center">
          <span className="font-bold text-gray-900">{name}</span>
        </div>
      </div>

      {/* Category links */}
      <div className="flex-1 flex flex-col gap-4">
        {items.map((item) => (
          <a
            key={item}
            href="#"
            className="flex items-center justify-between bg-[#3f3f46] hover:bg-[#52525b] text-white rounded-lg pl-5 pr-3 py-3 transition-colors"
          >
            <span>{item}</span>
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black/50">
              <ChevronRight className="w-4 h-4" />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ShopYahso() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SectionBanner title="Shop Yahso" className="mb-6" />

      {/* Navy panel with a green accent strip */}
      <div className="rounded-xl overflow-hidden">
        <div className="h-3 bg-primary" />
        <div className="bg-[#0d2137] p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {groups.map((group) => (
              <ProductGroupColumn key={group.name} {...group} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

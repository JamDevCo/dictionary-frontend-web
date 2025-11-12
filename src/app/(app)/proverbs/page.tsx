"use client";

import Header from "@/components/header/Header";
import ProverbsAccordion from "@/components/proverbs/ProverbsAccordion";
import Quiz from "@/components/quiz/Quiz";
import React, {useState, useEffect} from "react";
import axios from "axios";
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Page() {

  const [proverbs, setProverbs] = useState([]);
  const [openItems, setOpenItems] = useState<number[]>([1]); // First item open by default
  

  const getProverbs = async () => {
      let results = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getProverbs`);
      setProverbs(results.data);
  }

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

    const isOpen = (id: number) => openItems.includes(id);

  useEffect(() => {
      getProverbs();
  }, [])

  return (
    <main className="pb-[90px]">
      <Header
        title="Proverbs"
        description={`Jamaican proverbs, known as "patwa" or "patois" sayings, are rich with cultural wisdom and offer guidance 
          on various aspects of life. Many proverbs emphasize the importance of hard work, perseverance, and 
          humility, while also warning against negativity, carelessness, and deception.`}
      />
      <div className="max-w-6xl mx-auto bg-gray-50 p-8">
      <div className="space-y-4">
        {proverbs.map((proverb) => (
          <div key={proverb.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleItem(proverb.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg font-medium text-gray-900">
                {proverb.saying}
              </span>
              <div className="flex-shrink-0 ml-4">
                {isOpen(proverb.id) ? (
                  <ChevronUp className="w-5 h-5 text-orange-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-green-600" />
                )}
              </div>
            </button>
            
            {isOpen(proverb.id) && (
              <div className="px-6 pb-6 border-t border-gray-100">
                <div className="pt-4 space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">English Translation :</h4>
                    <p className="text-gray-700">{proverb.translation}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Meaning :</h4>
                    <p className="text-gray-700">{proverb.meaning}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </main>
  );
}

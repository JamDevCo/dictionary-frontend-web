'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Proverb {
  id: number;
  patois: string;
  translation: string;
  meaning: string;
}

export default function ProverbsAccordion() {
  const [openItems, setOpenItems] = useState<number[]>([1]); // First item open by default

  const proverbs: Proverb[] = [
    {
      id: 1,
      patois: "Sorry fi mawga dawg, im tun roun' bite yuh",
      translation: "Feel sorry for a meager or skinny dog, then he turns around and bites you.",
      meaning: "Sometimes it's the ones who we've helped are the most ungrateful."
    },
    {
      id: 2,
      patois: "Wah sweet nanny goat aguh run im belly",
      translation: "What tastes sweet to the nanny goat will give her a stomach ache.",
      meaning: "What seems appealing at first may cause problems later."
    },
    {
      id: 3,
      patois: "If yuh waa gud yuh nose affi run",
      translation: "If you want good things, your nose must run.",
      meaning: "You have to work hard and endure discomfort to achieve good things."
    },
    {
      id: 4,
      patois: "Every mickle mek a muckle",
      translation: "Every little bit makes a lot.",
      meaning: "Small amounts add up to make something substantial."
    },
    {
      id: 5,
      patois: "Cowad man kip soun' bone",
      translation: "A coward keeps sound bones.",
      meaning: "Being cautious can keep you out of trouble and harm."
    },
    {
      id: 6,
      patois: "Wen chubble tek yuh, pikney shut fit yuh",
      translation: "When trouble takes you, a child's shirt will fit you.",
      meaning: "Trouble can make anyone feel small and helpless."
    },
    {
      id: 7,
      patois: "Want I want I cyah get I and get I get I, nuh want I",
      translation: "What I want I can't get, and what I get I don't want.",
      meaning: "Life often doesn't give us what we desire most."
    },
    {
      id: 8,
      patois: "Gud fren betta dan packet money",
      translation: "A good friend is better than pocket money.",
      meaning: "Good friendship is more valuable than money."
    },
    {
      id: 9,
      patois: "Yuh neva si smoke widout fiyah",
      translation: "You never see smoke without fire.",
      meaning: "There's usually some truth behind rumors or accusations."
    },
    {
      id: 10,
      patois: "Rain neva fall a one man door",
      translation: "Rain never falls at one man's door.",
      meaning: "Everyone faces difficulties; troubles are shared by all."
    },
    {
      id: 11,
      patois: "Weh sweet yuh aguh sour yuh",
      translation: "What sweetens you will sour you.",
      meaning: "What brings pleasure can also bring pain."
    },
    {
      id: 12,
      patois: "Tek weh yuh get till yuh get weh yuh want",
      translation: "Take what you get until you get what you want.",
      meaning: "Be grateful for what you have while working toward your goals."
    },
    {
      id: 13,
      patois: "Nuh mug nuh bruk nuh coffi nuh dash weh",
      translation: "No mug breaks, no coffee gets thrown away.",
      meaning: "Nothing bad happens without some consequence or waste."
    },
    {
      id: 14,
      patois: "Chicken merry, hawk deh near",
      translation: "When chickens are happy, the hawk is near.",
      meaning: "Be careful when things seem too good to be true; danger may be lurking."
    },
    {
      id: 15,
      patois: "Tidday fi mi, tomorrow fi yuh",
      translation: "Today for me, tomorrow for you.",
      meaning: "What happens to me today may happen to you tomorrow; we all face similar fates."
    },
    {
      id: 16,
      patois: "Yuh can carry jackass guh riva but yuh cyah force im fi drink",
      translation: "You can lead a jackass to the river but you can't force him to drink.",
      meaning: "You can provide opportunities but you can't force someone to take advantage of them."
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const isOpen = (id: number) => openItems.includes(id);

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 p-8">
      <div className="space-y-4">
        {proverbs.map((proverb) => (
          <div key={proverb.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleItem(proverb.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg font-medium text-gray-900">
                {proverb.patois}
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
  );
}
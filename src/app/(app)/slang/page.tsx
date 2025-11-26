"use client";

import AntonymsList from "@/components/antonyms/antonymsList";
import Header from "@/components/header/Header";
import Quiz from "@/components/quiz/Quiz";
import VocabularyQuiz from "@/components/quiz/VocabularyQuiz";
import SlangGrid from "@/components/slang/SlangGrid";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Page() {

  const [slangs, setSlangs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSlangs = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getSlangs`);
    setSlangs(response.data);

  }

  useEffect(() => {
    getSlangs();
    setLoading(false);
  }, [])

  return (
    <main className="pb-[90px]">
     <div className="max-w-6xl mx-auto bg-gray-50 p-8">
      <div className="mb-12">
        <h1 className="text-6xl font-bold italic text-black mb-8">Slangs</h1>

      </div>

      {/* Bottom decorative line */}
      <div className="w-full h-px bg-green-300"></div>
    </div>
     <div className="max-w-6xl mx-auto bg-gray-50 p-8">
      {loading && (
  <div className="w-full flex justify-center items-center py-10">
    <div role="status">
       <div className="flex items-center justify-center">
  <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-600 border-t-transparent"></div>
</div>
      
    </div>
  </div>
)}
      {!loading && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {slangs.map((entry, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Image */}
            <div className="h-48 overflow-hidden">
              <img 
                src={`${process.env.NEXT_PUBLIC_API_URL}/slangs/entry.image_path`} 
                alt={entry.slang}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">
                {entry.slang}
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                {entry.meaning}
              </p>
            </div>
          </div>
        ))}
      </div>}
        </div>
     
    </main>
  );
}

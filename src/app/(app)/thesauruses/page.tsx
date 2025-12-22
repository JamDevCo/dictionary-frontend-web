"use client";
import React, { useEffect, useState, useRef, use } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Volume2, ChevronLeft, ChevronRight } from "lucide-react";
import Alphabets from "../../../components/alphabets";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState([]);

  const getThesaurusByLetter = async (letter) => {
    setLoading(true);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getThesaurusByLetter/${letter}`
    );
    setWords(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getThesaurusByLetter("A");
  }, []);

  return (
    <main className="min-h-screen  bg-gray-50 py-6">
      <div className="flex items-center justify-between mb-8 px-10">
        <div className="text-center">
          <h1 className="text-4xl mb-3 font-bold text-green-700 mb-1">
            Browse our Dictionary
          </h1>
          <p className="text-sm text-gray-500 text-lg">
            Improve clarity and expression with the Jamaican Creole Dictionary.
            Our intelligent ranking system helps you quickly find the right word
            from a rich collection of Creole terms, related expressions, and
            antonyms. An essential reference for understanding and using
            Jamaican Creole accurately.
          </p>
        </div>
      </div>
      <Alphabets load={getThesaurusByLetter} />

      {loading && <div className="flex justify-center items-center"> 
       
  <div className="w-full flex justify-center items-center py-10">
    <div role="status">
       <div className="flex items-center justify-center">
  <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-600 border-t-transparent"></div>
</div>
      
    </div>
  </div>

      </div>} 

      {loading == false &&<div className="mt-10">
        {words.map((wordItem) => (
          <div key={wordItem.id} className="bg-white p-4  shadow mb-4 mx-10">
            <Link
              href={`/thesaurus/${wordItem.id}`}
              className="text-xl font-semibold text-green-700 hover:underline"
            >
              {wordItem.definition}
            </Link>
          </div>
        ))}
      </div>}
    </main>
  );
}

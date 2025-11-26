"use client";

import Header from "@/components/header/Header";
import ProverbsAccordion from "@/components/proverbs/ProverbsAccordion";
import Quiz from "@/components/quiz/Quiz";
import React, {useState, useEffect} from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Page() {

    const params = useParams();
    const id = params?.id;
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
        title="Games"
        description={`Dive into fun, interactive games designed to help you learn Jamaican Patois in an easy and engaging way. Each activity reinforces vocabulary, expressions, and everyday phrases while immersing you in the rhythm and culture of the language. Whether you're matching words, solving challenges, or testing your memory, these games make learning Jamaican dialect natural, enjoyable, and authentic.`}
      />
     <div className="max-w-6xl mx-auto bg-gray-50 py-8">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="block bg-white rounded-lg shadow overflow-hidden hover:shadow-lg">
            <div className="relative h-40 bg-gray-100">
              <Image src="/blank.png" alt="Games" fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
            </div>
            <div className="p-4 text-center ">
              <div className="font-semibold">Fill in the Blank</div>
              <div className="text-xs text-gray-500">Play our fill in the blank quiz</div>
                <Link href="/quiz/1"><button className='h-10 w-80 bg-green-600 mt-5 rounded-lg font-bold text-white'>Play</button></Link>
            </div>
          </div>

          <div className="block bg-white rounded-lg shadow overflow-hidden hover:shadow-lg">
            <div className="relative h-40 bg-gray-100">
              <Image src="/multiple.jpg" alt="True or False" fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
            </div>
            <div className="p-4 text-center">
              <div className="font-semibold">Multiple choice</div>
              <div className="text-xs text-gray-500">Choose from multiple answers to figure the question</div>
                <Link href='/quiz/2'><button className='h-10 w-80 bg-green-600 mt-5 rounded-lg font-bold text-white'>Play</button></Link>

            </div>
          </div>

          <div className="block bg-white rounded-lg shadow overflow-hidden hover:shadow-lg">
            <div className="relative h-40 bg-gray-100">
              <Image src="/translate.jpg" alt="Guess the meaning" fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
            </div>
            <div className="p-4 text-center">
              <div className="font-semibold">Translate language</div>
              <div className="text-xs text-gray-500">Learn how to translate from english to jamaica creole</div>
              <Link href='/quiz/3'><button className='h-10 w-80 bg-green-600 mt-5 rounded-lg font-bold text-white'>Play</button></Link>

            </div>
          </div>
        </div>
      </section>
     </div>

    </main>
  );
}

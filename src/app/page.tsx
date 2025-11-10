"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [wordOfTheDay, setWordOfTheDay] = useState({word_of_the_day:{word:'', pronunciation:''}, meaning:{definition:'', example:''}});

  // predictive text (hard-coded suggestions for now)
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [thesaurusSuggestions, setThesaurusSuggestions] = useState<string[]>([])

  // const matches = suggestions.filter((s) =>
  //   s.toLowerCase().includes(searchQuery.trim().toLowerCase())
  // );

 
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const clear = () => {
    setSearchQuery("");
    setSuggestions([]);
    setThesaurusSuggestions([]);
  }

  const suggestiveSearch = () => {

     if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

   const delayDebounce = setTimeout(() => {
      setLoading(true);
      axios
        .post(`http://localhost:8000/api/autocomplete`, {
          query: searchQuery,
        })
        .then((res) => {
          console.log(res.data);
          setSuggestions(res.data.words);
          setThesaurusSuggestions(res.data.meanings);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching suggestions:", err);
          setLoading(false);
        });
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounce);
  }
    const getWordOfTheDay = async () => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/adjustWordOfTheDay`).then((res) => {
      
        setWordOfTheDay(res.data.data);
      });
    }

  useEffect(() => {
     getWordOfTheDay()
  }, []);
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo_dic.jpg"
                alt="Logo"
                width={44}
                height={44}
                className="rounded-full object-cover"
              />
              <div>
                <Link href="/" className="text-lg font-bold text-[#053a12]">
                  Jamaican Patwa Dictionary
                </Link>
                <div className="text-xs text-gray-500">
                  Preserve & celebrate
                </div>
              </div>
            </div>

            <nav className="hidden sm:flex gap-6 items-center text-sm">
              <Link
                href="/word-of-the-day"
                className="text-gray-700 hover:text-[#016701]"
              >
                Word of the Day
              </Link>
              <Link
                href="/thesaurus"
                className="text-gray-700 hover:text-[#016701]"
              >
                Thesaurus
              </Link>
              <Link
                href="/slang"
                className="text-gray-700 hover:text-[#016701]"
              >
                Slang
              </Link>
              <Link
                href="/quiz"
                className="text-gray-700 hover:text-[#016701]"
              >
                Quizzes
              </Link>
            </nav>

            <div className="sm:hidden">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-md bg-gray-100"
                aria-label="Toggle menu"
              >
                {mobileOpen ? "Close" : "Menu"}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="sm:hidden pb-4">
              <div className="flex flex-col gap-2 text-sm">
                <Link
                  href="/word-of-the-day"
                  className="block px-2 py-2 rounded hover:bg-gray-50"
                >
                  Word of the Day
                </Link>
                <Link
                  href="/thesaurus"
                  className="block px-2 py-2 rounded hover:bg-gray-50"
                >
                  Thesaurus
                </Link>
                <Link
                  href="/slang"
                  className="block px-2 py-2 rounded hover:bg-gray-50"
                >
                  Slang
                </Link>
                <Link
                  href="/about"
                  className="block px-2 py-2 rounded hover:bg-gray-50"
                >
                  About
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

    
      <section className="relative bg-[url('/flag.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#f1fff1]">
            Preserve, Learn, and Celebrate Jamaica Creole
          </h1>
          <p className="mt-3 text-gray-200 max-w-2xl mx-auto">
            Look up words, listen to pronunciations, read example sentences, and
            explore cultural notes.
          </p>

          <form
            action="/search"
            method="get"
            className="mt-8 max-w-3xl mx-auto w-full"
            onSubmit={() => setShowSuggestions(false)}
          >
            <div className="relative flex items-center bg-white rounded-full overflow-hidden shadow">
              <input
                name="q"
                onInput={() => suggestiveSearch()}
                onChange={(e) => e.target.value.length == 0 ? () => clear() : setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                className="flex-1 px-5 py-3 text-gray-800 outline-none rounded-l-full"
                placeholder="Search Jamaican Creole — type a word or phrase"
                aria-label="Search"
              />
             
            </div>

            {(suggestions.length > 0 || thesaurusSuggestions.length > 0) && (
              <div className="absolute p-5 text-left left-0 right-0 bg-white border rounded-md shadow-lg z-50">
                <p className=' font-extrabold text-[#016701]'>Dictionary</p>
                <ul className="max-h-48 overflow-auto mb-5">
                  {suggestions.map((s) => (
                    <a key={s.id} href={`/word/${s.id}`}><li
                      className="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                    >
                      {s.text}
                    </li></a>
                  ))}
                </ul>

                 <p className=' font-extrabold text-[#016701]'>Thesaurus</p>
                <ul className="max-h-48 overflow-auto">
                  {thesaurusSuggestions.map((s) => (
                    <a key={s.id} href={`/thesaurus/${s.id}`}><li
                  
                      className="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                    >
                      {s.text}
                    </li></a>
                  ))}
                </ul>
              </div>
            )}

            {(suggestions.length == 0 && thesaurusSuggestions.length == 0 ) && searchQuery.length != 0 && (
              <div className="absolute p-5 text-left left-0 right-0 bg-white border rounded-md shadow-lg z-50">
                <p className=' font-extrabold text-[#016701]'>No results found</p>
                
              </div>
            )}
          </form>
        </div>
      </section>

      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 ring-1 ring-black/5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="text-sm text-gray-500">Word of the Day</div>
              <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#016701]">
                {wordOfTheDay.word_of_the_day.word}
                <span className="ml-3 text-base font-medium text-gray-500">
                  {wordOfTheDay.word_of_the_day.pronunciation}
                </span>
              </div>
              <div className="mt-3 text-gray-700">Translation: {wordOfTheDay.meaning.definition}</div>
              <div className="mt-2 text-sm text-gray-500 italic">Meaning: {wordOfTheDay.meaning.usage}</div>
              <div className="mt-2 text-sm text-gray-600">
                Example: {wordOfTheDay.meaning.example}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-[#016701] text-white rounded-md text-sm">
                  Listen
                </button>
                <Link
                  href={`/word/${wordOfTheDay.word_of_the_day.id}`}
                  className="px-4 py-2 border border-gray-200 rounded-md text-[#016701] text-sm"
                >
                  View
                </Link>
                <a
                  href="/word-of-the-day"
                  className="px-4 py-2 text-sm rounded-md bg-gray-50 hover:bg-gray-100"
                >
                  More words
                </a>
              </div>
            </div>

            <div className="w-full sm:w-48">
              <audio controls className="w-full rounded-md">
                <source src="/audio/irie.mp3" type="audio/mpeg" />
              </audio>
            </div>
          </div>
        </div>
      </section>

      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-[#053a12]">
              Featured words
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Curated examples and popular lookups.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <article className="border rounded-lg p-4 hover:shadow">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="text-lg font-bold text-[#016701]">
                      Wah gwaan
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      What's going on? / How are you?
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <button className="px-3 py-1 bg-[#053a12] text-white text-sm rounded">
                      Listen
                    </button>
                    <Link
                      href={`/word/${encodeURIComponent("Wah gwaan")}`}
                      className="text-sm text-[#016701]"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </article>

              <article className="border rounded-lg p-4 hover:shadow">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="text-lg font-bold text-[#016701]">Irie</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Fine, good, pleasing
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <button className="px-3 py-1 bg-[#053a12] text-white text-sm rounded">
                      Listen
                    </button>
                    <Link
                      href={`/word/${encodeURIComponent("Irie")}`}
                      className="text-sm text-[#016701]"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </article>

              <article className="border rounded-lg p-4 hover:shadow">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="text-lg font-bold text-[#016701]">Nyam</div>
                    <div className="text-sm text-gray-600 mt-1">
                      To eat, food
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <button className="px-3 py-1 bg-[#053a12] text-white text-sm rounded">
                      Listen
                    </button>
                    <Link
                      href={`/word/${encodeURIComponent("Nyam")}`}
                      className="text-sm text-[#016701]"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </article>

              <article className="border rounded-lg p-4 hover:shadow">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="text-lg font-bold text-[#016701]">
                      Pickney
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Child</div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <button className="px-3 py-1 bg-[#053a12] text-white text-sm rounded">
                      Listen
                    </button>
                    <Link
                      href={`/word/${encodeURIComponent("Pickney")}`}
                      className="text-sm text-[#016701]"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>

          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-[#053a12]">
              Pronunciation & examples
            </h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">
                  Try a sample pronunciation
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1">
                    <div className="font-medium">Irie</div>
                    <div className="text-xs text-gray-500">/ˈiːri/</div>
                  </div>
                  <audio controls className="w-48">
                    <source src="/audio/sample.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600">Example sentence</div>
                <div className="mt-3 bg-gray-50 p-3 rounded">
                  <div className="text-sm">"Mi deh yah, everything irie."</div>
                  <div className="text-xs text-gray-500 mt-2">
                    Translation: "I'm here, everything's good."
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-[#053a12]">
              Cultural notes
            </h3>
            <div className="mt-4 space-y-3">
              <div className="border-l-4 border-[#016701] pl-3">
                <div className="font-medium">Naming & forms of address</div>
                <div className="text-sm text-gray-600">
                  How people address each other varies by context and region.
                </div>
              </div>

              <div className="border-l-4 border-[#016701] pl-3">
                <div className="font-medium">Food terms</div>
                <div className="text-sm text-gray-600">
                  Unique words around popular Jamaican dishes and preparation.
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <aside className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-semibold text-[#053a12]">Categories</h4>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-1 gap-2">
              <a
                href={`/search?q=${encodeURIComponent("Greetings")}`}
                className="block px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100 text-sm text-gray-700"
              >
                Greetings
              </a>
              <a
                href={`/search?q=${encodeURIComponent("Food")}`}
                className="block px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100 text-sm text-gray-700"
              >
                Food
              </a>
              <a
                href={`/search?q=${encodeURIComponent("Family")}`}
                className="block px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100 text-sm text-gray-700"
              >
                Family
              </a>
              <a
                href={`/search?q=${encodeURIComponent("Work")}`}
                className="block px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100 text-sm text-gray-700"
              >
                Work
              </a>
              <a
                href={`/search?q=${encodeURIComponent("Nature")}`}
                className="block px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100 text-sm text-gray-700"
              >
                Nature
              </a>
              <a
                href={`/search?q=${encodeURIComponent("Music")}`}
                className="block px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100 text-sm text-gray-700"
              >
                Music
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-semibold text-[#053a12]">
              Latest videos
            </h4>
            <div className="mt-4 space-y-3">
              <Link href={`/videos/1`} className="flex items-center gap-3">
                <div className="w-20 h-12 bg-gray-200 rounded overflow-hidden relative">
                  <Image
                    src={`/thumb1.jpg`}
                    alt={`video 1`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="text-sm">
                  <div className="font-medium">Quick phrase #1</div>
                  <div className="text-xs text-gray-500">
                    2:13 • Jamaican Creole
                  </div>
                </div>
              </Link>

              <Link href={`/videos/2`} className="flex items-center gap-3">
                <div className="w-20 h-12 bg-gray-200 rounded overflow-hidden relative">
                  <Image
                    src={`/thumb2.jpg`}
                    alt={`video 2`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="text-sm">
                  <div className="font-medium">Quick phrase #2</div>
                  <div className="text-xs text-gray-500">
                    1:45 • Jamaican Creole
                  </div>
                </div>
              </Link>

              <Link href={`/videos/3`} className="flex items-center gap-3">
                <div className="w-20 h-12 bg-gray-200 rounded overflow-hidden relative">
                  <Image
                    src={`/thumb3.jpg`}
                    alt={`video 3`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="text-sm">
                  <div className="font-medium">Quick phrase #3</div>
                  <div className="text-xs text-gray-500">
                    3:02 • Jamaican Creole
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-[#016701] text-white rounded-lg p-6">
            <h4 className="text-lg font-semibold">Stay in the loop</h4>
            <p className="text-sm opacity-90 mt-2">
              Subscribe to weekly updates about new entries and features.
            </p>
            <form action="/subscribe" method="post" className="mt-4 flex gap-2">
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="flex-1 px-3 py-2 bg-white rounded text-gray-900"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white text-[#016701] font-medium rounded"
              >
                Subscribe
              </button>
            </form>
          </div>
        </aside>
      </section>

      
    </main>
  );
}

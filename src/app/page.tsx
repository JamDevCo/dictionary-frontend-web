"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [wordOfTheDay, setWordOfTheDay] = useState({word_of_the_day:{word:'', pronunciation:''}, meaning:{definition:'', example:'', usage:''}});
  const [topTen, setTopTen] = useState([]);
  // predictive text (hard-coded suggestions for now)
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [thesaurusSuggestions, setThesaurusSuggestions] = useState<string[]>([])

  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const clear = () => {
    setSearchQuery("");
    setSuggestions([]);
    setThesaurusSuggestions([]);
  }

  const addWordHistoryWord = async (id : int) => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/addSearch`, { word_id: id })
      .then(() => {
        router.push(`/word/${id}`);
      })
      .catch((err) => {
        console.error("Failed to update word history", err);
      });
  }

  const getTopTen = async () => {
    let top = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getTopTenSearches`);
    console.log(top.data);
    setTopTen(top.data);
  }

  const suggestiveSearch = () => {
     if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

   const delayDebounce = setTimeout(() => {
      setSearchLoading(true)
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/autocomplete`, {
          query: searchQuery,
        })
        .then((res) => {
          // keep the existing data shape handling
          setSuggestions(res.data.words || []);
          setThesaurusSuggestions(res.data.meanings || []);
          setSearchLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching suggestions:", err);
          setSearchLoading(false);
        });
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounce);
  }

  const getWordOfTheDay = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/adjustWordOfTheDay`);
      setWordOfTheDay(res.data.data);
    } catch (err) {
      console.error("Failed to load word of the day", err);
    }
  }



  useEffect(() => {
     getWordOfTheDay()
     getTopTen()
     setLoading(false);
  }, []);

  return (
    <main className="min-h-screen   text-gray-900">
      {/* Top green header (site nav + mini controls) */}
      <header className="bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Image src="/logo_dic.jpg" alt="Logo" width={44} height={44} className="rounded-full object-cover" />
              <div>
                <Link href="/" className="text-lg font-bold">
                  Jamaican Patwa Dictionary
                </Link>
                <div className="text-xs opacity-90">Preserve & celebrate</div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/dictionary" className="px-3 py-1 bg-yellow-400 text-[#053a12] rounded">Dictionary</Link>
              <Link href="/thesauruses" className="px-3 py-1 bg-white text-[#016701] rounded">Thesaurus</Link>
              <Link href="/quiz/2" className="text-sm hover:underline">Quizzes</Link>
              <Link href="/slang" className="text-sm hover:underline">Slang</Link>
              <Link href="/proverbs" className="text-sm hover:underline">Proverbs</Link>
              <Link href="/synonyms" className="text-sm hover:underline">Synonyms</Link>
              <Link href="/antonyms" className="text-sm hover:underline">Antonyms</Link>
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileOpen(!mobileOpen)} className="px-3 py-1 bg-white text-[#016701] rounded">
                Menu
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="md:hidden pb-3">
              <div className="flex flex-col gap-2 text-sm">
                <Link href="/word-of-the-day" className="block px-2 py-2 rounded hover:bg-white/10">Word of the Day</Link>
                <Link href="/thesaurus" className="block px-2 py-2 rounded hover:bg-white/10">Thesaurus</Link>
                <Link href="/slang" className="block px-2 py-2 rounded hover:bg-white/10">Slang</Link>
                <Link href="/quiz" className="block px-2 py-2 rounded hover:bg-white/10">Quizzes</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero with search */}
      <section className="relative bg-green-800 bg-cover bg-center">
        <div className="absolute inset-0  " />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#f1fff1]">Preserve, Learn, and Celebrate Jamaica Creole</h1>
          <p className="mt-2 text-gray-200 max-w-2xl mx-auto">Look up words, listen to pronunciations, read example sentences, and explore cultural notes.</p>

          <form
            action="/search"
            method="get"
            className="mt-8 max-w-3xl mx-auto w-full"
            onSubmit={() => setShowSuggestions(false)}
          >
            <div className="relative flex items-center bg-white rounded-full overflow-hidden shadow">
              <input
                name="q"
                value={searchQuery}
                onInput={() => suggestiveSearch()}
                onChange={(e) => {
                  const v = e.target.value;
                  setSearchQuery(v);
                  if (v.length === 0) clear();
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                className="flex-1 px-5 py-3 text-gray-800 outline-none rounded-l-full"
                placeholder="Search Jamaican Creole — type a word or phrase"
                aria-label="Search"
              />
              {/* <button type="submit" className="px-4 py-3 bg-[#053a12] text-white rounded-r-full">Search</button> */}
            </div>

            {/* Suggestive dropdown */}
            {(showSuggestions && (suggestions.length > 0 || thesaurusSuggestions.length > 0)) && (
              <div className="absolute p-5 text-left left-0 right-0 bg-white border rounded-md shadow-lg z-50 max-w-3xl mx-auto">
                {searchLoading && (
  <div className="w-full flex justify-center items-center py-10">
    <div role="status">
       <div className="flex items-center justify-center">
  <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-600 border-t-transparent"></div>
</div>
      
    </div>
  </div>
)}
                {!searchLoading && <div className="">
                  <div>
                    <p className="font-extrabold text-[#016701] mb-2">Dictionary</p>
                    <ul className="max-h-48 overflow-auto">
                      {suggestions.map((s: any) => (
                        <a key={s.id} onClick={() => addWordHistoryWord(s.id)}  className="block px-3 py-2 text-sm hover:bg-gray-50">
                          {s.text}
                        </a>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-extrabold text-[#016701] mb-2">Thesaurus</p>
                    <ul className="max-h-48 overflow-auto">
                      {thesaurusSuggestions.map((s: any) => (
                        <a key={s.id} href={`/thesaurus/${s.id}`} className="block px-3 py-2 text-sm hover:bg-gray-50">
                          {s.text}
                        </a>
                      ))}
                    </ul>
                  </div>
                </div>}
              </div>
            )}

            {(showSuggestions && suggestions.length === 0 && thesaurusSuggestions.length === 0 && searchQuery.length !== 0) && (
              <div className="absolute p-5 text-left left-0 right-0 bg-white border rounded-md shadow-lg z-50 max-w-3xl mx-auto">
                <p className="font-extrabold text-[#016701]">No results found</p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Feature cards row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link href="/quiz/2" className="block bg-white rounded-lg shadow overflow-hidden hover:shadow-lg">
            <div className="relative h-40 bg-gray-100">
              <Image src="/quiz/2.jpeg" alt="Games" fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
            </div>
            <div className="p-4 text-center">
              <div className="font-semibold">Quizzes</div>
              <div className="text-xs text-gray-500">Play our quizzes to test your knowledge</div>
            </div>
          </Link>

          <Link href="/quiz" className="block bg-white rounded-lg shadow overflow-hidden hover:shadow-lg">
            <div className="relative h-40 bg-gray-100">
              <Image src="/slang (1).jpg" alt="True or False" fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
            </div>
            <div className="p-4 text-center">
              <div className="font-semibold">Slangs</div>
              <div className="text-xs text-gray-500">Learn popular jamaican slangs</div>
            </div>
          </Link>

          <Link href="/guess" className="block bg-white rounded-lg shadow overflow-hidden hover:shadow-lg">
            <div className="relative h-40 bg-gray-100">
              <Image src="/proverbs.jpeg" alt="Guess the meaning" fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
            </div>
            <div className="p-4 text-center">
              <div className="font-semibold">Proverbs</div>
              <div className="text-xs text-gray-500">Learn wisdom from our jamaican proverbs</div>
            </div>
          </Link>
        </div>
      </section>

      {/* Main three-column area: Games & Quizzes | Word of the day | Top 10 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
          <div className="bg-white rounded-lg shadow p-4">
            <div className="block  overflow-hidden">
                        <div className="relative h-40 bg-gray-100">
                          <Image src="/multiple.jpg" alt="True or False" fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                        </div>
                        <div className="p-4 text-center">
                          <div className="font-semibold">Multiple choice</div>
                          <div className="text-xs text-gray-500">Choose from multiple answers to figure the question</div>
                            <Link href='/quiz/2'><button className='h-10 w-80 bg-green-600 mt-5 rounded-lg font-bold text-white'>Play</button></Link>
            
                        </div>
                      </div>
            
          </div>

          {/* Word of the day */}
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-sm text-gray-500">Word of the day</div>
            {loading && (
  <div className="w-full flex justify-center items-center py-10">
    <div role="status">
       <div className="flex items-center justify-center">
  <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-600 border-t-transparent"></div>
</div>
      
    </div>
  </div>
)}
             {!loading && <div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#016701]">
              {wordOfTheDay.word_of_the_day.word}
              <span className="ml-3 text-base font-medium text-gray-500">{wordOfTheDay.word_of_the_day.pronunciation}</span>
            </div>
            <div className="mt-3 text-gray-700">Translation: {wordOfTheDay.meaning.definition}</div>
            <div className="mt-2 text-sm text-gray-500 italic">Meaning: {wordOfTheDay.meaning.usage}</div>
            <div className="mt-3 text-sm text-gray-600">Example: {wordOfTheDay.meaning.example}</div>
            <div className="mt-6">
              <audio controls className="w-full rounded-md">
  <source
    src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${wordOfTheDay.word_of_the_day.audio_path}`}
    type="audio/mpeg"
  />
  <source
    src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${wordOfTheDay.word_of_the_day.audio_path}`}
    type="audio/wav"
  />
  <source
    src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${wordOfTheDay.word_of_the_day.audio_path}`}
    type="audio/ogg"
  />
  Your browser does not support the audio element.
</audio>
            </div>
            <div className="mt-4 flex justify-center gap-3">
              <Link href={`/word/${wordOfTheDay.word_of_the_day.id}`} className="px-4 py-2 border rounded text-[#016701]">View</Link>
              <a href="/word-of-the-day" className="px-4 py-2 bg-gray-50 rounded">More words</a>
            </div>
          </div>
          }
  </div>
          {/* Top 10 Words today */}
          <aside className="bg-white rounded-lg shadow p-4">
            <h4 className="text-lg font-semibold text-[#053a12]">Top 10 Words today</h4>
            {loading && (
  <div className="w-full flex justify-center items-center py-10">
    <div role="status">
       <div className="flex items-center justify-center">
  <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-600 border-t-transparent"></div>
</div>
      
    </div>
  </div>
)}
           {!loading && <ol className="mt-3 list-decimal list-inside space-y-1 text-sm text-gray-700">
              {topTen.map((word: any) => (
                <li key={word.word_id}>
                  <a href={`/word/${word.word_id}`} className="hover:underline">{word.word.word}</a>
                </li>
              ))}
              {/* <li>Duppy</li>
              <li>Riva Muma</li>
              <li>Heng</li>
              <li>Bulla</li>
              <li>Deh</li>
              <li>Dufty</li>
              <li>Nyam</li>
              <li>Mada</li>
              <li>Bredda</li>
              <li>Fren</li> */}
            </ol>}
          </aside>
        </div>

         {/* <div className="bg-[#f2f9f2] rounded-xl px-4 mt-10 sm:px-6 lg:px-8 ">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-semibold">Grammer & Usage</h2>
    <a href="#" className="text-sm text-green-700 hover:underline">See All &gt;</a>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition">
      <img src="/quiz.jpeg" alt="" className="w-full h-40 object-cover" />
      <div className="p-3">
        <p className="text-sm font-medium">The continuum between English and Patwah</p>
      </div>
    </div>

    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition">
      <img src="/proverbs.jpeg" alt="" className="w-full h-40 object-cover" />
      <div className="p-3">
        <p className="text-sm font-medium">How to use ‘Dem’</p>
      </div>
    </div>

    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition">
      <img src="/slang.jpg" alt="" className="w-full h-40 object-cover" />
      <div className="p-3">
        <p className="text-sm font-medium">Should some words remain in English?</p>
      </div>
    </div>

    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition">
      <img src="/slang.jpg" alt="" className="w-full h-40 object-cover" />
      <div className="p-3">
        <p className="text-sm font-medium">Singular to plural</p>
      </div>
    </div>
  </div>
        </div>

<div className="space-y-8 bg-[#f2f9f2] p-6 rounded-xl">

  <div>
    <h2 className="text-lg font-semibold mb-3">Shop Yahso</h2>
    <div className="bg-[#08131f] rounded-xl p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">

      <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition">
        <img src="https://via.placeholder.com/300x200" alt="" className="w-full h-36 object-cover" />
        <div className="p-3">
          <p className="text-sm font-semibold">Books</p>
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition">
        <img src="https://via.placeholder.com/300x200" alt="" className="w-full h-36 object-cover" />
        <div className="p-3">
          <p className="text-sm font-semibold">Stationaries</p>
        </div>
      </div>

      <div className="space-y-2">
        {Array(4).fill().map((_, i) => (
          <div key={i} className="bg-[#0f2438] text-white flex justify-between items-center px-4 py-2 rounded-lg hover:bg-[#19314a] transition">
            <span className="text-sm">Dictionaries</span>
            <span className="text-lg">&gt;</span>
          </div>
        ))}
      </div>
    </div>
  </div>

  <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Wordplay</h2>
      <a href="#" className="text-sm text-green-700 hover:underline">See All &gt;</a>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition">
        <img src="https://via.placeholder.com/300x200" alt="" className="w-full h-40 object-cover" />
        <div className="p-3">
          <p className="text-sm">Lorem ipsum dolor sit amet consectetur. Mauris.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition">
        <img src="https://via.placeholder.com/300x200" alt="" className="w-full h-40 object-cover" />
        <div className="p-3">
          <p className="text-sm">Lorem ipsum dolor sit amet consectetur. In.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition">
        <img src="https://via.placeholder.com/300x200" alt="" className="w-full h-40 object-cover" />
        <div className="p-3">
          <p className="text-sm">Lorem ipsum dolor sit</p>
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition">
        <img src="https://via.placeholder.com/300x200" alt="" className="w-full h-40 object-cover" />
        <div className="p-3">
          <p className="text-sm">Lorem ipsum dolor sit amet consectetur. Fermentum.</p>
        </div>
      </div>
    </div>
  </div>
</div> */}

      </section>


           
    
    </main>
  );
}

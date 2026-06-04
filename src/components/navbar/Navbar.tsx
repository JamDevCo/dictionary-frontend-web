"use client";

<<<<<<< HEAD
import { useState } from "react";
import { usePathname } from "next/navigation";
=======
import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
>>>>>>> 66b635c (Added dropdown feature to show word suggestion)
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("dictionary");
  const [suggestions, setSuggestions] = useState<{ id: string | number; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const isHomePage = pathname === "/";

  // Fetch suggestions
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      setLoading(true);
      axios
        .post(`${apiUrl}/api/autocomplete`, { query })
        .then((res) => {
          setSuggestions(res.data.words || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching suggestions:", err);
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, apiUrl]);

  // Hide dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      const path = searchType === "thesaurus" ? "/thesaurus" : "/word";
      console.log("Going to:", `${path}/${query}`);
      router.push(`${path}/${encodeURIComponent(query.trim())}`);
      setSuggestions([]);
    }
  };

  return (
    <>
      {isHomePage ? (
        /* HOME PAGE NAVBAR  */
        <header className="bg-[#016701] text-white border-b">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-between h-32">
              <div className="flex items-center gap-10 font-bold text-lg">
                <Link href="/games">Games</Link>
                <Link href="/word-of-the-day">Word of the Day</Link>
                <Link href="/proverbs">Proverbs</Link>
              </div>
              <Link href="/">
                <Image src="/dictionary.svg" alt="Logo" width={90} height={90} className="rounded-full object-cover" />
              </Link>
              <div className="flex items-center gap-10 font-bold text-lg">
                <Link href="/slang">
                  Slang
                </Link>

                <Link href="/rhymes">
                  Rhymes
                </Link>

                <Link href="/thesaurus/1">
                  Thesaurus
                </Link>
              </div>
            </div>
          </div>
        </header>
      ) : (
        /* OTHER PAGES NAVBAR */
        <header className="bg-[#016701] text-white border-b">
          <div className="w-full px-4">
            <div className="flex items-center justify-between h-20">

              <div className="flex items-center gap-5">
                <Link href="/">
                  <Image src="/dictionary.svg" alt="Logo" width={70} height={70} className="rounded-full object-cover" />
                </Link>

                {/* Search section with autocomplete */}
                <div className="hidden md:flex items-center border-[3px] border-[#0b3550] rounded-lg bg-white shadow-md relative" ref={wrapperRef}>
                  <button
                    onClick={() => setSearchType("dictionary")}
                    className={`px-6 py-3 font-bold transition-colors ${searchType === "dictionary" ? "bg-yellow-600 text-white" : "bg-[#0b3550] text-white"}`}
                  >
                    Dictionary
                  </button>
                  <button
                    onClick={() => setSearchType("thesaurus")}
                    className={`px-6 py-3 font-bold transition-colors ${searchType === "thesaurus" ? "bg-yellow-600 text-white" : "bg-[#0b3550] text-white"}`}
                  >
                    Thesaurus
                  </button>

                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      placeholder={searchType === "dictionary" ? "Search Dictionary" : "Search Thesaurus"}
                      className="px-4 py-3 w-80 text-black outline-none"
                    />

                    {/* Dropdown */}
                    {suggestions.length > 0 && (
                      <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 shadow-lg z-50">
                        {suggestions.map((word, i) => (
                          <li
                            key={i}
                            onClick={() => {
                              router.push(`/word/${encodeURIComponent(word.text)}`);
                              setSuggestions([]);
                              setQuery(word.text);
                            }}
                            className="px-4 py-2 cursor-pointer hover:bg-yellow-100 text-black text-sm"
                          >
                            {word.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <button onClick={handleSearch} className="bg-yellow-600 px-5 py-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.5 5.5a7.5 7.5 0 0 0 11.15 11.15Z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-8 font-bold">
                <Link href="/games">
                  Games
                </Link>

                <Link href="/word-of-the-day">
                  Word of the Day
                </Link>

                <Link href="/proverbs">
                  Proverbs
                </Link>

                <Link href="/slang">
                  Slang
                </Link>

                <Link href="/rhymes">
                  Rhymes
                </Link>

                <Link href="/thesaurus/1">
                  Thesaurus
                </Link>

              </div>

              <button onClick={() => setMobileOpen((s) => !s)} className="lg:hidden text-3xl">☰</button>
            </div>
          </div>

          {mobileOpen && (
            <div className="lg:hidden bg-white text-black p-4 space-y-3">
              <Link href="/games" className="block">Games</Link>
              <Link href="/word-of-the-day" className="block">Word of the Day</Link>
              <Link href="/proverbs" className="block">Proverbs</Link>
              <Link href="/slang" className="block">Slang</Link>
              <Link href="/rhymes" className="block">Rhymes</Link>
              <Link href="/thesaurus" className="block">Thesaurus</Link>
            </div>
          )}
        </header>
      )}
    </>
  );
}
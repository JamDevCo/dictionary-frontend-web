"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Note: In a real Next.js app, you would import Link like this:
// import Link from 'next/link';

// For this React artifact environment, we'll create a mock Link component
// Replace this with the actual Next.js Link import in your project

export default function Navbar() {
   const [mobileOpen, setMobileOpen] = useState(false);
    const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching in ${activeTab} for:`, searchQuery);
    // Implement search functionality here
    // You can redirect to the appropriate route with the search query
  };

  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-40 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/logo_dic.jpg"
                  alt="Jamaica Creole Dictionary"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <span className="text-lg font-extrabold text-[#016701]">
                 Patwa Dictionary
                </span>
              </Link>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <Link href="/word-of-the-day" className="hover:text-[#0b3550]">
                  Word of the Day
                </Link>
                <Link href="/slang" className="hover:text-[#0b3550]">
                  Slang
                </Link>
                <Link href="/thesaurus" className="hover:text-[#0b3550]">
                  Thesaurus
                </Link>
                <Link href="/games" className="hover:text-[#0b3550]">
                  Games
                </Link>
              </nav>
            </div>

            {/* Search (desktop) */}
            <div className="hidden lg:flex items-center flex-1 max-w-2xl mx-6">
              <form action="/search" method="get" className="w-full">
                <div className="flex w-full bg-white rounded-full shadow-sm border overflow-hidden">
                  <input
                    name="q"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 px-4 py-2 text-sm sm:text-base outline-none"
                    placeholder="Search Jamaican Creole (e.g. bway, bruk out)"
                    aria-label="Search"
                  />
                  <button
                    type="submit"
                    className="px-4 bg-[#016701] hover:bg-[#0a7a0a] text-white font-semibold"
                    aria-label="Search"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/contribute"
                className="hidden md:inline-block text-sm px-3 py-1 rounded hover:bg-gray-100"
              >
                Contribute
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen((s) => !s)}
                className="p-2 rounded-md md:hidden bg-white/60 hover:bg-white/80"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6 text-[#016701]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>

              {/* Search icon for small screens opens a modal-like focus on input below */}
              <Link
                href="/search"
                className="md:hidden p-2 rounded-full bg-white/60 hover:bg-white/80"
              >
                <svg
                  className="w-5 h-5 text-[#016701]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-3 space-y-3">
              <form action="/search" method="get" className="w-full">
                <div className="flex w-full bg-gray-100 rounded-full overflow-hidden border">
                  <input
                    name="q"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 px-4 py-2 text-sm outline-none"
                    placeholder="Search Jamaican Creole"
                  />
                  <button type="submit" className="px-4 bg-[#016701] text-white">
                    Go
                  </button>
                </div>
              </form>

              <div className="flex flex-col gap-2">
                <Link
                  href="/word-of-the-day"
                  className="block px-2 py-2 rounded hover:bg-gray-50"
                >
                  Word of the Day
                </Link>
                <Link
                  href="/slang"
                  className="block px-2 py-2 rounded hover:bg-gray-50"
                >
                  Slang
                </Link>
                <Link
                  href="/thesaurus"
                  className="block px-2 py-2 rounded hover:bg-gray-50"
                >
                  Thesaurus
                </Link>
                <Link
                  href="/games"
                  className="block px-2 py-2 rounded hover:bg-gray-50"
                >
                  Games
                </Link>
                <Link
                  href="/contribute"
                  className="block px-2 py-2 rounded hover:bg-gray-50"
                >
                  Contribute
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
  );
}

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
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"dictionary" | "thesaurus">(
    "dictionary"
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching in ${activeTab} for:`, searchQuery);
    // Implement search functionality here
    // You can redirect to the appropriate route with the search query
  };

  return (
    <nav className="bg-gradient-to-r from-green-700 to-green-600 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            width={70}
            height={70}
            alt="logo"
            src={"/dictionary.svg"}
            className="absolute left-6 top-2"
          />
        </Link>

        {/* Dictionary, Thesaurus and Search Bar - Joined */}
        <div className="flex">
          <button
            onClick={() => setActiveTab("dictionary")}
            className={`px-5 py-2 font-semibold transition-colors rounded-l ${
              activeTab === "dictionary"
                ? "bg-yellow-600 text-white"
                : "bg-gray-600 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Dictionary
          </button>
          <button
            onClick={() => setActiveTab("thesaurus")}
            className={`px-5 py-2 font-semibold transition-colors ${
              activeTab === "thesaurus"
                ? "bg-green-800 text-white"
                : "bg-gray-600 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Thesaurus
          </button>
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder={`Search ${
                activeTab === "dictionary" ? "Dictionary" : "Thesaurus"
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 text-gray-800 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 min-w-[200px]"
            />
            <button
              type="submit"
              className="px-4 bg-yellow-600 hover:bg-yellow-700 rounded-r transition-colors"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
          </form>
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Right Navigation Items */}
        <div className="flex items-center gap-6 text-white font-semibold">
          <Link
            href="/games"
            className="hover:text-yellow-300 transition-colors"
          >
            Games
          </Link>
          <Link
            href="/word-of-the-day"
            className="hover:text-yellow-300 transition-colors"
          >
            Word of the Day
          </Link>
          <Link
            href="/proverbs"
            className="hover:text-yellow-300 transition-colors"
          >
            Proverbs
          </Link>
          <Link
            href="/slang"
            className="hover:text-yellow-300 transition-colors"
          >
            Slang
          </Link>
          <Link
            href="/rhymes"
            className="hover:text-yellow-300 transition-colors"
          >
            Rhymes
          </Link>
          <Link
            href="/thesaurus"
            className="hover:text-yellow-300 transition-colors"
          >
            Thesaurus
          </Link>
        </div>
      </div>
    </nav>
  );
}

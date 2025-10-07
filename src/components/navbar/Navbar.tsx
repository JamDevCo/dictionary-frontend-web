"use client";
import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"dictionary" | "thesaurus">(
    "dictionary"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching in ${activeTab} for:`, searchQuery);
    // Implement search functionality here
  };

  return (
    <nav className="bg-gradient-to-r from-green-700 to-green-600 px-4 py-3 relative">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img
              width={70}
              height={70}
              alt="logo"
              src={"/dictionary.svg"}
              className="absolute left-6 top-2"
            />
          </a>

          {/* Dictionary, Thesaurus and Search Bar - Joined */}
          <div className="flex">
            <button
              onClick={() => setActiveTab("dictionary")}
              className={`px-5 py-2 font-semibold transition-colors rounded-l ${activeTab === "dictionary"
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-600 text-gray-300 hover:bg-gray-700"
                }`}
            >
              Dictionary
            </button>
            <button
              onClick={() => setActiveTab("thesaurus")}
              className={`px-5 py-2 font-semibold transition-colors ${activeTab === "thesaurus"
                  ? "bg-green-800 text-white"
                  : "bg-gray-600 text-gray-300 hover:bg-gray-700"
                }`}
            >
              Thesaurus
            </button>
            <div className="flex">
              <input
                type="text"
                placeholder={`Search ${activeTab === "dictionary" ? "Dictionary" : "Thesaurus"
                  }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
                className="px-4 py-2 text-gray-800 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 min-w-[200px]"
              />
              <button
                onClick={handleSearch}
                className="px-4 bg-yellow-600 hover:bg-yellow-700 rounded-r transition-colors"
              >
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Right Navigation Items */}
          <div className="flex items-center gap-6 text-white font-semibold">
            <a href="/games" className="hover:text-yellow-300 transition-colors">
              Games
            </a>
            <a
              href="/word-of-the-day"
              className="hover:text-yellow-300 transition-colors"
            >
              Word of the Day
            </a>
            <a href="/proverbs" className="hover:text-yellow-300 transition-colors">
              Proverbs
            </a>
            <a href="/slang" className="hover:text-yellow-300 transition-colors">
              Slang
            </a>
            <a href="/rhymes" className="hover:text-yellow-300 transition-colors">
              Rhymes
            </a>
            <a
              href="/thesaurus"
              className="hover:text-yellow-300 transition-colors"
            >
              Thesaurus
            </a>
          </div>
        </div>

        {/* Tablet Layout (md to lg) */}
        <div className="hidden md:flex lg:hidden items-center gap-3">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img
              width={60}
              height={60}
              alt="logo"
              src={"/dictionary.svg"}
              className="absolute left-4 top-2"
            />
          </a>

          {/* Search Section */}
          <div className="flex flex-1 max-w-2xl">
            <button
              onClick={() => setActiveTab("dictionary")}
              className={`px-3 py-2 text-sm font-semibold transition-colors rounded-l ${activeTab === "dictionary"
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-600 text-gray-300 hover:bg-gray-700"
                }`}
            >
              Dictionary
            </button>
            <button
              onClick={() => setActiveTab("thesaurus")}
              className={`px-3 py-2 text-sm font-semibold transition-colors ${activeTab === "thesaurus"
                  ? "bg-green-800 text-white"
                  : "bg-gray-600 text-gray-300 hover:bg-gray-700"
                }`}
            >
              Thesaurus
            </button>
            <div className="flex flex-1">
              <input
                type="text"
                placeholder={`Search ${activeTab === "dictionary" ? "Dictionary" : "Thesaurus"
                  }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
                className="px-3 py-2 text-sm text-gray-800 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex-1 min-w-0"
              />
              <button
                onClick={handleSearch}
                className="px-3 bg-yellow-600 hover:bg-yellow-700 rounded-r transition-colors"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:bg-green-800 rounded transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Layout (sm and below) */}
        <div className="flex md:hidden items-center gap-2">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img
              width={50}
              height={50}
              alt="logo"
              src={"/dictionary.svg"}
            />
          </a>

          {/* Search Section */}
          <div className="flex flex-1">
            <button
              onClick={() => setActiveTab("dictionary")}
              className={`px-2 py-1.5 text-xs font-semibold transition-colors rounded-l ${activeTab === "dictionary"
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-600 text-gray-300"
                }`}
            >
              Dict
            </button>
            <button
              onClick={() => setActiveTab("thesaurus")}
              className={`px-2 py-1.5 text-xs font-semibold transition-colors ${activeTab === "thesaurus"
                  ? "bg-green-800 text-white"
                  : "bg-gray-600 text-gray-300"
                }`}
            >
              Thes
            </button>
            <div className="flex flex-1">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
                className="px-2 py-1.5 text-xs text-gray-800 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 flex-1 min-w-0"
              />
              <button
                onClick={handleSearch}
                className="px-2 bg-yellow-600 hover:bg-yellow-700 rounded-r transition-colors"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-white hover:bg-green-800 rounded transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile/Tablet Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-full bg-green-700 shadow-lg z-50">
            <div className="flex flex-col py-2">
              <a
                href="/games"
                className="px-4 py-3 text-white hover:bg-green-800 transition-colors font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Games
              </a>
              <a
                href="/word-of-the-day"
                className="px-4 py-3 text-white hover:bg-green-800 transition-colors font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Word of the Day
              </a>
              <a
                href="/proverbs"
                className="px-4 py-3 text-white hover:bg-green-800 transition-colors font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Proverbs
              </a>
              <a
                href="/slang"
                className="px-4 py-3 text-white hover:bg-green-800 transition-colors font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Slang
              </a>
              <a
                href="/rhymes"
                className="px-4 py-3 text-white hover:bg-green-800 transition-colors font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Rhymes
              </a>
              <a
                href="/thesaurus"
                className="px-4 py-3 text-white hover:bg-green-800 transition-colors font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Thesaurus
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
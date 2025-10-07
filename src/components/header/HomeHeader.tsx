"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { Search, ChevronDown, Menu, X } from "lucide-react";
import FeatureCard from "@/components/card/FeatureCard";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const HomeHeader: React.FC = () => {
  const apiBaseUrl = process.env.API_BASE_URL;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"dictionary" | "thesaurus">(
    "dictionary"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleTabChange = useCallback((tab: "dictionary" | "thesaurus") => {
    setActiveTab(tab);
  }, []);

  const navItems = [
    { label: "Games", href: "/games" },
    { label: "Word of the Day", href: "/word-of-the-day" },
    { label: "Proverbs", href: "/proverbs" },
    { label: "Slang", href: "/slang" },
    { label: "Rhymes", href: "/rhymes" },
    { label: "Thesaurus", href: "/thesaurus" },
  ];

  // fetch suggestions when searchQuery changes
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      setLoading(true);
      axios
        .get(`${apiBaseUrl}/api/autocomplete/${searchQuery}`, {})
        .then((res) => {
          const merged = [...res.data.words, ...res.data.meanings];
          const suggestionsList = merged.map((item) => item.word);
          console.log("Suggestions:", suggestionsList);
          setSuggestions(suggestionsList);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching suggestions:", err);
          setLoading(false);
        });
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Hide dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#016701] h-[30%] overflow-x-hidden">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center px-3 py-1 sm:px-6 lg:px-8 font-sans font-bold">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex gap-8">
          {navItems.slice(0, 3).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-white hover:text-yellow-300 transition-colors text-sm lg:text-base"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Logo */}
        <div className="flex justify-center items-center shrink-0">
          <Link href="/" aria-label="Home">
            <Image
              src="/logo_dic.jpg"
              alt="Logo"
              height={90}
              width={90}
              className="rounded-full object-cover mr-2"
              priority
            />
          </Link>
        </div>

        <div className="hidden lg:flex flex gap-8">
          {navItems.slice(-3).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-white hover:text-yellow-300 transition-colors text-sm lg:text-base"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#016701] text-white font-bold font-sans text-sm">
          <div className="flex flex-col gap-4 px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white hover:text-yellow-300 transition-colors text-base"
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Search Section */}
      <div className="flex justify-center mt-8 px-4 sm:mt-12 lg:mt-16">
        <div
          className="flex flex-col sm:flex-row bg-gray-900 rounded-lg overflow-hidden shadow-2xl w-full max-w-3xl"
          ref={wrapperRef}
        >
          <button
            onClick={() => handleTabChange("dictionary")}
            className={`flex-1 px-4 py-3 sm:px-6 sm:py-4 font-bold text-sm sm:text-base transition-all ${activeTab === "dictionary"
              ? "bg-[#B88600] text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            aria-pressed={activeTab === "dictionary"}
          >
            Dictionary
          </button>
          <button
            onClick={() => handleTabChange("thesaurus")}
            className={`flex-1 px-4 py-3 sm:px-6 sm:py-4 font-bold text-sm sm:text-base transition-all ${activeTab === "thesaurus"
              ? "bg-[#B88600] text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            aria-pressed={activeTab === "thesaurus"}
          >
            Thesaurus
          </button>
          <div className="flex items-center bg-white ">
            <div className="flex-1 flex-col w-72" ref={wrapperRef}>
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-3 sm:px-6 sm:py-4 w-full sm:w-64 lg:w-80 outline-none text-gray-800 text-sm sm:text-base"
                aria-label={`Search ${activeTab}`}
              />

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 rounded-b-md shadow-lg h-auto z-50 mt-0 w-72 sm:w-64 lg:w-80">
                  {suggestions.map((word, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setSearchQuery(word);
                        setSuggestions([]);
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-yellow-100 text-black"
                    >
                      {word}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button className="bg-[#B88600] hover:bg-amber-700 px-4 py-3 sm:px-6 sm:py-4 transition-colors">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 mt-12 pb-12 max-w-7xl mx-auto">
        <FeatureCard
          title="Slangs"
          subtitle="Explore Jamaican Slangs"
          bgColor="bg-gray-900"
          image="slang.jpg"
        />
        <FeatureCard
          title="True or False Quiz"
          subtitle="Test your knowledge"
          bgColor="bg-sky-500"
        />
        <FeatureCard
          title="Guess the meaning"
          subtitle="Challenge yourself"
          bgColor="bg-gray-300"
          textColor="text-white"
        />
      </div>
    </header>
  );
};

export default HomeHeader;

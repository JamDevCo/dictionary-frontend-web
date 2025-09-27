"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("Dictionary");

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  // fetch suggestions when query changes
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]); // don’t call API for very short queries
      return;
    }

    const delayDebounce = setTimeout(() => {
      setLoading(true);
      axios
        .get(`http://localhost:8000/api/autocomplete/${query}`, {})
        .then((res) => {
          const merged = [...res.data.words, ...res.data.meanings];
          const suggestionsList = merged.map((item) => item.word);
          setSuggestions(suggestionsList);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching suggestions:", err);
          setLoading(false);
        });
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  // navigation items
  const navItems = [
    "Games",
    "Word of the Day",
    "Proverbs",
    "Slang",
    "Rhymes",
    "Thesaurus",
  ];

  // Hide dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // button styles
  const buttonStyles =
    "px-3 py-2 rounded hover:bg-yellow-300 hover:text-black transition";
  const toggleButtonStyles = (isActive) =>
    `px-4 h-full transition text-sm ${
      isActive ? "bg-yellow-600 text-white" : "text-white hover:bg-yellow-600"
    }`;

  return (
    <header className="bg-green-600 border-b-3">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 h-20">
        <div className="flex justify-center items-center shrink-0">
          <Link href="/">
            <Image
              src="/logo_dic.jpg"
              alt="Logo"
              height={80}
              width={80}
              className="rounded-full object-cover mr-2"
              priority
            />
          </Link>
        </div>
        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center space-x-4 m-5">
          {/* Toggle Buttons */}
          <div className="bg-black h-11 flex items-center rounded-lg overflow-hidden">
            <button
              onClick={() => setMode("Dictionary")}
              className={toggleButtonStyles(mode === "Dictionary")}
            >
              Dictionary
            </button>
            <button
              onClick={() => setMode("Thesaurus")}
              className={toggleButtonStyles(mode === "Thesaurus")}
            >
              Thesaurus
            </button>
          </div>

          {/* Search Input */}
          <div className="flex items-center" ref={wrapperRef}>
            <div className="flex flex-col relative w-72">
              <input
                type="text"
                placeholder={`Search ${mode}...`}
                className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-black"
                aria-label={`Search ${mode}`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10 mt-1">
                  {suggestions.map((word, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setQuery(word);
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

            <button
              className="flex-1 px-4 py-2 bg-yellow-300 text-black rounded-r-md hover:bg-yellow-400 transition"
              aria-label="Search"
            >
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </div>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden xl:flex space-x-4 lg:space-x-6 text-white font-bold font-sans text-sm flex">
          {navItems.map((item) => (
            <button key={item} className={buttonStyles}>
              {item}
            </button>
          ))}
        </nav>
        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="xl:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="xl:hidden bg-green-600 text-white font-bold font-sans text-sm">
          {/* Mobile Search */}
          <div className="flex flex-col items-center px-4 py-3">
            <div className="bg-black h-10 flex items-center rounded-lg overflow-hidden">
              <button
                onClick={() => setMode("Dictionary")}
                className={toggleButtonStyles(mode === "Dictionary")}
              >
                Dictionary
              </button>
              <button
                onClick={() => setMode("Thesaurus")}
                className={toggleButtonStyles(mode === "Thesaurus")}
              >
                Thesaurus
              </button>
            </div>
            <div className="flex flex-row mb-5 mt-5" ref={wrapperRef}>
              <div className="flex flex-col relative w-72">
                <input
                  type="text"
                  placeholder={`Search ${mode}...`}
                  className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-black"
                  aria-label={`Search ${mode}`}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />

                {/* Suggestions Dropdown */}
                {suggestions.length > 0 && (
                  <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10 mt-1">
                    {suggestions.map((word, i) => (
                      <li
                        key={i}
                        onClick={() => {
                          setQuery(word);
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
              <button
                className="px-3 py-1 bg-yellow-300 text-black rounded-r-md hover:bg-yellow-400 transition"
                aria-label="Search"
              >
                <i className="fa-solid fa-magnifying-glass" />
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex flex-col space-y-3 px-4 pb-3">
            {navItems.map((item) => (
              <button key={item} className={buttonStyles}>
                {item}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

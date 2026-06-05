"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("dictionary");

  const pathname = usePathname();

  // Checks if current page is homepage
  const isHomePage = pathname === "/";

  return (
    <>
      {isHomePage ? (
        /* HOME PAGE NAVBAR */
        <header className="bg-[#016701] text-white border-b">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-between h-32">

              {/* Desktop nav */}
              <div className="flex items-center gap-10 font-bold text-lg">
                <Link href="/games">
                  Games
                </Link>

                <Link href="/word-of-the-day">
                  Word of the Day
                </Link>

                <Link href="/proverbs">
                  Proverbs
                </Link>
              </div>

              {/* Logo */}
              <Link href="/">
                <Image
                  src="/dictionary.svg"
                  alt="Logo"
                  width={90}
                  height={90}
                  className="rounded-full object-cover"
                />
              </Link>

              {/* Desktop nav */}
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

              {/* Logo and search */}
              <div className="flex items-center gap-5">

                {/* Logo */}
                <Link href="/">
                  <Image
                    src="/dictionary.svg"
                    alt="Logo"
                    width={70}
                    height={70}
                    className="rounded-full object-cover"
                  />
                </Link>

                {/* Search section */}
                <div className="hidden md:flex items-center border-[3px] border-[#0b3550] rounded-lg overflow-hidden bg-white shadow-md">

                  <button
                    onClick={() => setSearchType("dictionary")}
                    className={`px-6 py-3 font-bold transition-colors ${
                      searchType === "dictionary"
                        ? "bg-yellow-600 text-white"
                        : "bg-[#0b3550] text-white"
                    }`}
                  >
                    Dictionary
                  </button>

                  <button
                    onClick={() => setSearchType("thesaurus")}
                    className={`px-6 py-3 font-bold transition-colors ${
                      searchType === "thesaurus"
                        ? "bg-yellow-600 text-white"
                        : "bg-[#0b3550] text-white"
                    }`}
                  >
                    Thesaurus
                  </button>

                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={
                      searchType === "dictionary"
                        ? "Search Dictionary"
                        : "Search Thesaurus"
                    }
                    className="px-4 py-3 w-80 text-black outline-none"
                  />

                  <button className="bg-yellow-600 px-5 py-3 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.5 5.5a7.5 7.5 0 0 0 11.15 11.15Z"
                      />
                    </svg>
                  </button>

                </div>
              </div>

              {/* Desktop nav */}
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

              {/* Mobile menu button */}
              <button
                onClick={() =>
                  setMobileOpen((s) => !s)
                }
                className="lg:hidden text-3xl"
              >
                ☰
              </button>

            </div>
          </div>

          {/* Mobile menu panel */}
          {mobileOpen && (
            <div className="lg:hidden bg-white text-black p-4 space-y-3">

              <Link
                href="/games"
                className="block"
              >
                Games
              </Link>

              <Link
                href="/word-of-the-day"
                className="block"
              >
                Word of the Day
              </Link>

              <Link
                href="/proverbs"
                className="block"
              >
                Proverbs
              </Link>

              <Link
                href="/slang"
                className="block"
              >
                Slang
              </Link>

              <Link
                href="/rhymes"
                className="block"
              >
                Rhymes
              </Link>

              <Link
                href="/thesaurus"
                className="block"
              >
                Thesaurus
              </Link>

            </div>
          )}
        </header>
      )}
    </>
  );
}
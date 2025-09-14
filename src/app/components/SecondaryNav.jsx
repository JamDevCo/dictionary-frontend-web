"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const DEFAULT_LINKS = [
  { href: "/games", label: "Games" },
  { href: "/word-of-the-day", label: "Word of the Day" },
  { href: "/proverbs", label: "Proverbs" },
  { href: "/slang", label: "Slang" },
  { href: "/rhymes", label: "Rhymes" },
  { href: "/thesaurus", label: "Thesaurus" },
];

export default function SecondaryNav({
  initialTab = "dictionary",     // 'dictionary' | 'thesaurus'
  links = DEFAULT_LINKS,         // optional override
  searchPath = "/search",        // where to send the user
}) {
  const router = useRouter();
  const [tab, setTab] = useState(initialTab);
  const [q, setQ] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    const params = new URLSearchParams({ tab, q: term }).toString();
    router.push(`${searchPath}?${params}`);
  };

  return (
    <div className="sticky top-0 z-40 border-b border-black/20 bg-green-800 text-white">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
        <div className="h-14 flex items-center gap-3">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="Patwanary logo"
              width={44}
              height={44}
              className="rounded-full bg-white ring-1 ring-black/20"
              priority={false}
            />
          </Link>

          {/* Tabs + search */}
          <form
            onSubmit={submit}
            className="flex items-stretch overflow-hidden rounded-md shadow-sm"
            role="search"
            aria-label="Quick search"
          >
            {/* Tabs */}
            <div className="flex">
              <button
                type="button"
                onClick={() => setTab("dictionary")}
                className={[
                  "px-3 sm:px-4 text-sm font-semibold border border-black/25",
                  tab === "dictionary"
                    ? "bg-yellow-600 text-black"
                    : "bg-green-900 text-white/90 hover:text-white",
                  "rounded-l-md",
                ].join(" ")}
                aria-pressed={tab === "dictionary"}
              >
                Dictionary
              </button>
              <button
                type="button"
                onClick={() => setTab("thesaurus")}
                className={[
                  "px-3 sm:px-4 text-sm font-semibold border-y border-r border-black/25",
                  tab === "thesaurus"
                    ? "bg-yellow-600 text-black"
                    : "bg-green-900 text-white/90 hover:text-white",
                ].join(" ")}
                aria-pressed={tab === "thesaurus"}
              >
                Thesaurus
              </button>
            </div>

            {/* Input */}
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={tab === "dictionary" ? "Search Dictionary" : "Search Thesaurus"}
              className="h-9 sm:h-10 w-[42vw] max-w-[520px] min-w-[160px] bg-white text-black placeholder:text-neutral-500 px-3 sm:px-4 outline-none border-y border-black/25"
              aria-label="Search"
              autoComplete="off"
            />

            {/* Submit */}
            <button
              type="submit"
              className="h-9 sm:h-10 px-3 sm:px-4 bg-yellow-600 text-black font-semibold border border-black/25 rounded-r-md hover:bg-yellow-500"
              title="Search"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7"></circle>
                <path d="M20 20l-3.5-3.5"></path>
              </svg>
            </button>
          </form>

          {/* Right links */}
          <nav className="ml-auto hidden md:flex items-center gap-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-semibold hover:underline underline-offset-4"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

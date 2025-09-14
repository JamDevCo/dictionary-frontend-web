"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const TABS = ["dictionary", "thesaurus"];

export default function SearchBar({
  initialTab = "dictionary",
  onSearch,
  minChars = 2,
}) {
  const [tab, setTab] = useState(initialTab);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const abortRef = useRef(null);

  const ph = useMemo(
    () => (tab === "dictionary" ? "Search Dictionary" : "Search Thesaurus"),
    [tab]
  );

  useEffect(() => {
    if (q.trim().length < minChars) {
      setSuggestions([]);
      setLoading(false);
      if (abortRef.current) abortRef.current.abort();
      return;
    }

    setLoading(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    const t = setTimeout(async () => {
      try {
        // TODO: replace with your API call
        const sample = [
          q,
          `${q} meaning`,
          `${q} example`,
          `${q} in patois`,
          `${q} antonyms`,
        ];
        setSuggestions(sample.slice(0, 5));
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(t);
  }, [q, tab, minChars]);

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    onSearch?.(q.trim(), tab);
  };

  return (
    <div className="relative w-full max-w-2xl">
      {/* Thick edge, no inner ring; contents flush to the border */}
      <form
        onSubmit={submit}
        className="
          flex items-stretch overflow-hidden
          rounded-2xl border-4 border-white
          bg-green-900/60 backdrop-blur-sm
          focus-within:ring-2 focus-within:ring-yellow-400 focus-within:ring-offset-2 focus-within:ring-offset-green-900
        "
        role="search"
        aria-label="Dictionary search"
      >
        {/* Tabs */}
        <div className="flex">
          {TABS.map((t) => {
            const active = t === tab;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={[
                  "px-4 h-12 text-sm font-semibold transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-green-900",
                  active
                    ? "bg-yellow-600 text-black"
                    : "bg-transparent text-white/90 hover:text-white",
                ].join(" ")}
                aria-pressed={active}
              >
                {t === "dictionary" ? "Dictionary" : "Thesaurus"}
              </button>
            );
          })}
        </div>

        {/* Input */}
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={ph}
          className="flex-1 h-12 bg-white text-black placeholder:text-neutral-500 px-4 outline-none"
          aria-label={ph}
          autoComplete="off"
        />

        {/* Submit */}
        <button
          type="submit"
          className="
            h-12 px-4 bg-yellow-600 text-black font-semibold
            hover:bg-yellow-500
            focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-green-900
          "
          aria-label="Search"
          title="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7"></circle>
            <path d="M20 20l-3.5-3.5"></path>
          </svg>
        </button>
      </form>

      {/* Suggestions dropdown (match the thicker edge look) */}
      {(loading || suggestions.length > 0) && (
        <div
          className="
            absolute left-0 right-0 mt-2
            rounded-2xl border-4 border-white
            bg-white text-neutral-900 shadow-lg overflow-hidden
          "
          role="listbox"
        >
          {loading && (
            <div className="px-4 py-3 text-sm text-neutral-500">Searching…</div>
          )}
          {!loading &&
            suggestions.map((s, i) => (
              <button
                key={`${s}-${i}`}
                onClick={() => setQ(s)}
                className="w-full text-left px-4 py-2 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none"
                role="option"
              >
                {s}
              </button>
            ))}
          {!loading && suggestions.length === 0 && q.length >= minChars && (
            <div className="px-4 py-3 text-sm text-neutral-500">No suggestions</div>
          )}
        </div>
      )}
    </div>
  );
}

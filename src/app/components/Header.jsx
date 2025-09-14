"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import SearchBar from "./SearchBar";

/* ──────────────────────────────────────────────────────────────────────────
   NAVIGATION DATA (edit submenus here)
   ────────────────────────────────────────────────────────────────────────── */
const NAV_ITEMS_LEFT = [
  {
    href: "/games",
    label: "Games",
    children: [
      { href: "/games/true-or-false", label: "True or False" },
      { href: "/games/guess-meaning", label: "Guess the Meaning" },
    ],
  },
  { href: "/word-of-the-day", label: "Word of the Day" },
  {
    href: "/proverbs",
    label: "Proverbs",
    children: [
      { href: "/proverbs/jamaican", label: "Jamaican Proverbs" },
      { href: "/proverbs/popular", label: "Popular Proverbs" },
    ],
  },
];

const NAV_ITEMS_RIGHT = [
  { href: "/slang", label: "Slang" },
  { href: "/rhymes", label: "Rhymes" },
  { href: "/thesaurus", label: "Thesaurus" },
];

/* ──────────────────────────────────────────────────────────────────────────
   Utils
   ────────────────────────────────────────────────────────────────────────── */
function useOutsideClick(ref, handler) {
  useEffect(() => {
    const onDocClick = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) handler();
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, [ref, handler]);
}

/* ──────────────────────────────────────────────────────────────────────────
   Desktop dropdown (accessible: ARIA + keyboard)
   ────────────────────────────────────────────────────────────────────────── */
function DesktopDropdown({ item }) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const itemsRef = useRef([]);
  const menuId = useId();

  useOutsideClick(menuRef, () => setOpen(false));

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const onButtonKeyDown = (e) => {
    if (!hasChildren) return;
    if (["ArrowDown", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => itemsRef.current?.[0]?.focus());
    }
  };

  const onMenuKeyDown = (e) => {
    if (!hasChildren) return;
    const idx = itemsRef.current.findIndex((el) => el === document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      itemsRef.current[(idx + 1) % itemsRef.current.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      itemsRef.current[(idx + itemsRef.current.length - 1) % itemsRef.current.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      itemsRef.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      itemsRef.current[itemsRef.current.length - 1]?.focus();
    }
  };

  return (
    <div
      className="relative"
      ref={menuRef}
      onMouseEnter={() => hasChildren && setOpen(true)}
      onMouseLeave={() => hasChildren && setOpen(false)}
    >
      <Link
        href={item.href}
        ref={buttonRef}
        onClick={(e) => {
          if (hasChildren) {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
        onKeyDown={onButtonKeyDown}
        aria-haspopup={hasChildren ? "menu" : undefined}
        aria-expanded={hasChildren ? open : undefined}
        aria-controls={hasChildren ? menuId : undefined}
        className="rounded px-2 py-1 hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/80 focus-visible:ring-offset-green-800"
      >
        {item.label}
      </Link>

      {hasChildren && open && (
        <div
          id={menuId}
          role="menu"
          aria-label={`${item.label} sub menu`}
          onKeyDown={onMenuKeyDown}
          className="absolute left-0 mt-2 w-56 rounded-xl border border-black/10 bg-white text-neutral-900 shadow-lg ring-1 ring-black/5"
        >
          <ul className="py-2">
            {item.children.map((child, i) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  role="menuitem"
                  ref={(el) => (itemsRef.current[i] = el)}
                  onClick={() => setOpen(false)}
                  className="block w-full px-3 py-2 text-sm hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none rounded"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Mobile accordion entry for nested nav
   ────────────────────────────────────────────────────────────────────────── */
function MobileAccordionItem({ item }) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const [open, setOpen] = useState(false);

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        className="rounded px-3 py-2 hover:bg-white/10 focus:bg-white/10 focus:outline-none"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="rounded">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`m-sub-${item.label}`}
        className="flex w-full items-center justify-between rounded px-3 py-2 hover:bg-white/10 focus:bg-white/10 focus:outline-none"
      >
        <span>{item.label}</span>
        <span className={`transition-transform ${open ? "rotate-90" : ""}`}>›</span>
      </button>
      {open && (
        <div id={`m-sub-${item.label}`} className="pl-4">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block rounded px-3 py-2 text-sm hover:bg-white/10 focus:bg-white/10 focus:outline-none"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Optional: overhanging header tiles
   ────────────────────────────────────────────────────────────────────────── */
function HeaderCard({ href, title, imgSrc, tall = false }) {
  return (
    <Link
      href={href}
      className="
        pointer-events-auto group relative block overflow-hidden
        rounded-2xl border-4 border-white
        bg-white/5 shadow-lg hover:shadow-xl
        focus:outline-none focus-visible:ring-2 focus-visible:ring-green-700
      "
    >
      <div className={`relative bg-neutral-200 h-44 sm:h-52 ${tall ? "lg:h-[280px]" : "lg:h-[260px]"}`}>
        <Image
          src={imgSrc}
          alt={title}
          fill
          sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 95vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="absolute left-6 right-6 bottom-6">
        <div className="rounded-xl bg-yellow-600/95 px-4 py-2 text-center font-semibold text-black shadow ring-1 ring-black/10">
          {title}
        </div>
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   MAIN HEADER
   ────────────────────────────────────────────────────────────────────────── */
export default function Header() {
  const [open, setOpen] = useState(false);

  // Escape to close + body scroll lock on mobile panel
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.toggle("overflow-hidden", open);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-green-800 text-white shadow">
      <div className="relative mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Mobile / tablet bar */}
        <div className="lg:hidden flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/80 focus-visible:ring-offset-green-800 rounded-md"
            aria-label="Go to homepage"
          >
            <Image
              src="/images/logo.png"
              alt="Patwanary logo"
              width={48}
              height={48}
              className="rounded-full border-[1.01px] border-white"
              priority
            />
            <span className="font-semibold tracking-wide">Patwanary</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop header body */}
        <div className="hidden lg:flex lg:h-[433px] w-full flex-col items-stretch relative">
          <div className="mx-auto w-full max-w-5xl">
            {/* row 1: navs + centered logo */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center pt-6">
              <nav className="flex items-center gap-6 justify-start" aria-label="Primary left">
                {NAV_ITEMS_LEFT.map((item) => (
                  <DesktopDropdown key={item.label} item={item} />
                ))}
              </nav>

              <Link
                href="/"
                className="justify-self-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/80 focus-visible:ring-offset-green-800 rounded-full"
                aria-label="Go to homepage"
              >
                <Image
                  src="/images/logo.png"
                  alt="Patwanary logo"
                  width={71}
                  height={71}
                  className="rounded-full border-[1.01px] border-white"
                  priority
                />
              </Link>

              <nav className="flex items-center gap-6 justify-end" aria-label="Primary right">
                {NAV_ITEMS_RIGHT.map((item) => (
                  <DesktopDropdown key={item.label} item={item} />
                ))}
              </nav>
            </div>

            {/* row 2: search */}
            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-3xl">
                <SearchBar
                  initialTab="dictionary"
                  onSearch={(term, tab) => console.log("SEARCH:", { term, tab })}
                />
              </div>
            </div>
          </div>

          {/* overhanging tiles */}
          <div className="pointer-events-none absolute left-1/2 bottom-0 z-10 w-full max-w-7xl -translate-x-1/2 translate-y-10 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-end">
              <HeaderCard href="/slang" title="Slangs" imgSrc="/images/slang.jpg" />
              <HeaderCard href="/games/true-or-false" title="True or False" imgSrc="/images/true-false.jpg" tall />
              <HeaderCard href="/games/guess-meaning" title="Guess the meaning" imgSrc="/images/guess.jpg" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: backdrop + slideout */}
      {open && (
        <button
          aria-hidden
          className="fixed inset-0 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
          tabIndex={-1}
        />
      )}

      <div
        id="mobile-nav"
        className={`lg:hidden ${open ? "translate-x-0" : "translate-x-full"} fixed top-0 right-0 h-full w-80 bg-green-900 shadow-xl z-[60] transition-transform`}
      >
        <div className="px-4 pt-16 pb-6 space-y-2 overflow-y-auto">
          {[...NAV_ITEMS_LEFT, ...NAV_ITEMS_RIGHT].map((item) => (
            <MobileAccordionItem key={item.label} item={item} />
          ))}
          <div className="pt-4">
            <SearchBar
              initialTab="dictionary"
              onSearch={(term, tab) => {
                console.log("SEARCH mobile:", { term, tab });
                setOpen(false);
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

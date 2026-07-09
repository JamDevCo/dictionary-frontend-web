import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SectionBannerProps {
  /** Banner title (bold, left-aligned). */
  title: string;
  /** Show a "See All" link on the right when provided. */
  seeAllHref?: string;
  /** Click handler for the "See All" action (used when there is no href). */
  onSeeAll?: () => void;
  /** Extra classes for the banner wrapper. */
  className?: string;
}

/**
 * The soft-green title bar used to introduce home-page sections
 * (Grammar & Usage, Shop Yahso, Wordplay). Optionally renders a
 * right-aligned "See All" link.
 */
export default function SectionBanner({
  title,
  seeAllHref,
  onSeeAll,
  className = "",
}: SectionBannerProps) {
  const showSeeAll = Boolean(seeAllHref || onSeeAll);

  const seeAllContent = (
    <>
      See All
      <ChevronRight className="w-4 h-4" />
    </>
  );

  return (
    <div
      className={`bg-green-100 rounded-lg px-6 py-5 flex items-center justify-between gap-4 ${className}`.trim()}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>

      {showSeeAll ? (
        seeAllHref ? (
          <Link
            href={seeAllHref}
            className="shrink-0 flex items-center gap-1 text-green-700 hover:text-green-800 font-medium transition-colors"
          >
            {seeAllContent}
          </Link>
        ) : (
          <button
            type="button"
            onClick={onSeeAll}
            className="shrink-0 flex items-center gap-1 text-green-700 hover:text-green-800 font-medium transition-colors"
          >
            {seeAllContent}
          </button>
        )
      ) : null}
    </div>
  );
}

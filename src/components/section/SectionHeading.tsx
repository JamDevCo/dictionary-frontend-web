import React from "react";

export type SectionHeadingLevel = "h1" | "h2" | "h3";
export type SectionHeadingSize = "sm" | "md" | "hero";
export type SectionAlign = "left" | "center";

interface SectionHeadingProps {
  /** Main heading text. */
  title: string;
  /** Optional supporting copy shown beneath the title. */
  description?: string;
  /** Semantic heading tag. Defaults to `h2`. */
  level?: SectionHeadingLevel;
  /** Visual size preset. Defaults to `md` (the standard section heading). */
  size?: SectionHeadingSize;
  /** Horizontal alignment of the heading block. */
  align?: SectionAlign;
  /** Extra classes for the wrapper. */
  className?: string;
  /** Extra classes for the title element. */
  titleClassName?: string;
  /** Extra classes for the description element. */
  descriptionClassName?: string;
}

const titleSizes: Record<SectionHeadingSize, string> = {
  sm: "text-xl font-medium text-gray-900",
  md: "text-2xl font-medium text-gray-900",
  hero: "text-6xl font-bold italic text-black",
};

const descriptionSizes: Record<SectionHeadingSize, string> = {
  sm: "text-gray-700 leading-relaxed",
  md: "text-gray-700 leading-relaxed",
  hero: "text-lg text-gray-700 leading-relaxed max-w-5xl",
};

const alignments: Record<SectionAlign, string> = {
  left: "text-left",
  center: "text-center",
};

/**
 * Standard heading block for a page section: a title plus optional description,
 * with shared typography, spacing and alignment. Use the `hero` size for a
 * page title and `md`/`sm` for in-page section headers.
 */
export default function SectionHeading({
  title,
  description,
  level = "h2",
  size = "md",
  align = "left",
  className = "",
  titleClassName = "",
  descriptionClassName = "",
}: SectionHeadingProps) {
  const Tag = level;
  const titleSpacing = description ? (size === "hero" ? "mb-8" : "mb-4") : "";

  return (
    <div className={`${alignments[align]} ${className}`.trim()}>
      <Tag className={`${titleSizes[size]} ${titleSpacing} ${titleClassName}`.trim()}>
        {title}
      </Tag>
      {description ? (
        <p className={`${descriptionSizes[size]} ${descriptionClassName}`.trim()}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

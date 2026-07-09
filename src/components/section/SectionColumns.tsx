import React from "react";

export type SectionColumnCount = 2 | 3 | 4;
export type SectionGap = "sm" | "md" | "lg";

interface SectionColumnsProps {
  children: React.ReactNode;
  /** Number of columns at the large breakpoint. Defaults to 2. */
  columns?: SectionColumnCount;
  /** Gap between columns/rows. Defaults to `md`. */
  gap?: SectionGap;
  /** Vertical alignment of columns. Defaults to `start`. */
  align?: "start" | "center" | "stretch";
  /** Extra classes for the grid wrapper. */
  className?: string;
}

const columnClasses: Record<SectionColumnCount, string> = {
  2: "grid-cols-1 lg:grid-cols-2",
  3: "grid-cols-1 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

const gaps: Record<SectionGap, string> = {
  sm: "gap-6",
  md: "gap-8",
  lg: "gap-12",
};

const aligns: Record<NonNullable<SectionColumnsProps["align"]>, string> = {
  start: "items-start",
  center: "items-center",
  stretch: "items-stretch",
};

/**
 * Responsive multi-column layout for section content. Collapses to a single
 * column on small screens. Use for the recurring two-column (content +
 * sidebar) and card-grid layouts across the site.
 */
export default function SectionColumns({
  children,
  columns = 2,
  gap = "md",
  align = "start",
  className = "",
}: SectionColumnsProps) {
  return (
    <div
      className={`grid ${columnClasses[columns]} ${gaps[gap]} ${aligns[align]} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

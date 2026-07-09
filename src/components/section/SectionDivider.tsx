import React from "react";

interface SectionDividerProps {
  /** Extra classes, typically for vertical margin (e.g. `mb-8`). */
  className?: string;
}

/**
 * The thin green rule used to separate sections throughout the site.
 * Renders `<div className="w-full h-px bg-green-300" />` with optional spacing.
 */
export default function SectionDivider({ className = "" }: SectionDividerProps) {
  return <div className={`w-full h-px bg-green-300 ${className}`.trim()} />;
}

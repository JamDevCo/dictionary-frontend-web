import React from "react";
import SectionDivider from "./SectionDivider";
import SectionHeading, {
  SectionAlign,
  SectionHeadingLevel,
  SectionHeadingSize,
} from "./SectionHeading";

export type SectionWidth = "narrow" | "default" | "wide" | "full";
export type SectionBackground = "transparent" | "muted";
export type SectionDividerPosition = "none" | "top" | "bottom" | "both";

interface SectionProps {
  children?: React.ReactNode;
  /** Element rendered as the outer tag. Defaults to `section`. */
  as?: React.ElementType;
  /** Centered content width. `default` is the site-wide `max-w-6xl`. */
  width?: SectionWidth;
  /** Background treatment. `muted` applies the light grey backdrop. */
  background?: SectionBackground;
  /** Render as a white surface card (border + shadow + rounded corners). */
  card?: boolean;
  /** Apply the standard `p-8` padding. Defaults to true. */
  padded?: boolean;
  /** Where to render the green divider rule(s). */
  divider?: SectionDividerPosition;
  /** Convenience heading rendered above the content. */
  title?: string;
  /** Convenience description rendered under the title. */
  description?: string;
  /** Semantic tag for the convenience heading. */
  headingLevel?: SectionHeadingLevel;
  /** Size preset for the convenience heading. */
  headingSize?: SectionHeadingSize;
  /** Alignment for the convenience heading. */
  align?: SectionAlign;
  /** Extra classes for the outer wrapper. */
  className?: string;
  /** Extra classes applied to the convenience heading wrapper. */
  headingClassName?: string;
}

const widths: Record<SectionWidth, string> = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  full: "",
};

const backgrounds: Record<SectionBackground, string> = {
  transparent: "",
  muted: "bg-gray-50",
};

/**
 * Reusable page section wrapper. Centers its content to a shared width, applies
 * the standard padding/background, and optionally renders the green divider
 * rule(s) and a heading. Compose freely with `SectionHeading`,
 * `SectionDivider` and `SectionColumns` for richer layouts.
 */
export default function Section({
  children,
  as: Tag = "section",
  width = "default",
  background = "transparent",
  card = false,
  padded = true,
  divider = "none",
  title,
  description,
  headingLevel,
  headingSize,
  align = "left",
  className = "",
  headingClassName = "",
}: SectionProps) {
  const cardClasses = card
    ? "bg-white rounded-lg shadow-sm border border-gray-200"
    : "";

  const classes = [
    widths[width],
    "mx-auto",
    backgrounds[background],
    cardClasses,
    padded ? "p-8" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const showTop = divider === "top" || divider === "both";
  const showBottom = divider === "bottom" || divider === "both";

  return (
    <Tag className={classes}>
      {showTop ? <SectionDivider className="mb-8" /> : null}

      {title ? (
        <SectionHeading
          title={title}
          description={description}
          level={headingLevel}
          size={headingSize}
          align={align}
          className={`mb-8 ${headingClassName}`.trim()}
        />
      ) : null}

      {children}

      {showBottom ? <SectionDivider className="mt-8" /> : null}
    </Tag>
  );
}

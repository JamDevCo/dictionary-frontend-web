"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type SidebarLink = {
  label: string;
  href?: string;
  /** Marks the link as the current selection. */
  active?: boolean;
  /** Italicised label, used for the "as in ..." sense entries. */
  emphasis?: boolean;
  onClick?: () => void;
};

export type SidebarGroup = {
  /** Optional heading for the group (e.g. the part of speech). */
  label?: string;
  items: SidebarLink[];
};

type SidebarProps = {
  title: string;
  subtitle?: string;
  /** Grouped navigation. Takes precedence over `items`/`sectionLabel`. */
  groups?: SidebarGroup[];
  /** Convenience for a single ungrouped list of links. */
  items?: SidebarLink[];
  /** Heading for the convenience `items` list. */
  sectionLabel?: string;
  /** Render a chevron toggle that collapses the body. */
  collapsible?: boolean;
  /** Initial collapsed state when `collapsible` is set. */
  defaultCollapsed?: boolean;
  /** Extra classes for the <aside> (e.g. grid column span). */
  className?: string;
};

function SidebarNavLink({ label, href, active, emphasis, onClick }: SidebarLink) {
  const classes = [
    "block text-sm transition-opacity",
    emphasis ? "italic" : "",
    active
      ? "font-semibold opacity-100"
      : "opacity-90 hover:opacity-100 hover:underline",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a href={href ?? "#"} onClick={onClick} aria-current={active ? "page" : undefined} className={classes}>
      {label}
    </a>
  );
}

/**
 * Reusable page sidebar matching the green thesaurus/entry panel: an italic
 * title, an optional subtitle, and a vertical-rule navigation of grouped links.
 * Supports active items, grouped links and an optional collapsed state.
 */
export default function Sidebar({
  title,
  subtitle,
  groups,
  items,
  sectionLabel,
  collapsible = false,
  defaultCollapsed = false,
  className = "",
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  // Normalise the legacy `items`/`sectionLabel` props into a single group.
  const resolvedGroups: SidebarGroup[] =
    groups && groups.length > 0
      ? groups
      : items && items.length > 0
        ? [{ label: sectionLabel, items }]
        : [];

  return (
    <aside
      className={`bg-green-700 text-white rounded-md p-5 ${className}`.trim()}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold italic">{title}</h2>
          {subtitle ? <p className="text-sm opacity-90">{subtitle}</p> : null}
        </div>

        {collapsible ? (
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            aria-expanded={!collapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        ) : null}
      </div>

      {!collapsed && resolvedGroups.length > 0 ? (
        <div className="mt-6 border-l border-white pl-4 space-y-6">
          {resolvedGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              {group.label ? (
                <div className="font-semibold uppercase mb-4">
                  {group.label}
                </div>
              ) : null}

              <nav className="space-y-3">
                {group.items.map((item, index) => (
                  <SidebarNavLink key={index} {...item} />
                ))}
              </nav>
            </div>
          ))}
        </div>
      ) : null}
    </aside>
  );
}

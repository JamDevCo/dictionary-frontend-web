"use client";

import React from "react";
import { Section, SectionHeading, SectionDivider } from "@/components/section";

interface HeaderProps {
  title: string;
  description?: string;
}

export default function Header({ title, description }: HeaderProps) {
  return (
    <Section as="div" background="muted">
      <SectionHeading
        title={title}
        description={description}
        level="h1"
        size="hero"
        className="mb-12"
      />

      {/* Bottom decorative line */}
      <SectionDivider />
    </Section>
  );
}

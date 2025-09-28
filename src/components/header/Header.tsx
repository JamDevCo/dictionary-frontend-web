"use client";

import React from "react";

interface HeaderProps {
  title: string;
  description?: string;
}

export default function Header({ title, description }: HeaderProps) {
  return (
    <div className="max-w-6xl mx-auto bg-gray-50 p-8">
      <div className="mb-12">
        <h1 className="text-6xl font-bold italic text-black mb-8">{title}</h1>

        {description ? (
          <p className="text-gray-700 text-lg leading-relaxed max-w-5xl">
            {description}
          </p>
        ) : null}
      </div>

      {/* Bottom decorative line */}
      <div className="w-full h-px bg-green-300"></div>
    </div>
  );
}

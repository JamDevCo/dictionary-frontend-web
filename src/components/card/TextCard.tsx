import React from "react";

interface TextCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TextCard({ children, className = "" }: TextCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-8 ${className}`}
    >
      {children}
    </div>
  );
}
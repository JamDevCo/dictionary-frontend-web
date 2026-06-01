'use client'

import React from 'react'
import Image from 'next/image';

interface SlangCardProps {
  title: string
  image: string
  description: string
  onClick?: () => void
  className?: string
}

export default function Card({ title, image, description, onClick, className = "" }: SlangCardProps) {
  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Image */}
      <div className="h-48 overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={title}
          width={400}
          height={192}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-2 text-sm line-clamp-1">
          {title}
        </h3>
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  )
}
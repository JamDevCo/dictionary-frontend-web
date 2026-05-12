"use client";

import React from "react";
import Image from 'next/image';
import { ChevronRight } from "lucide-react";

interface VideoItem {
  title: string;
  url?: string;
}

export default function VideosSection() {
  const videoItems: VideoItem[] = [
    {
      title: "How did Patwah come about",
      url: "#",
    },
    {
      title: "Influence of other languages over the years",
      url: "#",
    },
    {
      title: "Can you tell where I'm from based on my dialect?",
      url: "#",
    },
  ];

  const handleVideoClick = (video: VideoItem) => {
    console.log("Video clicked:", video.title);
    // Add navigation or video player logic here
  };

  const handleSeeAll = () => {
    console.log("See all videos clicked");
    // Add navigation logic here
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="bg-green-800 rounded-lg p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section - Videos List */}
          <div className="bg-slate-800 rounded-lg p-8">
            <h2 className="text-4xl font-bold text-white mb-8">Videos</h2>

            <div className="space-y-4 mb-8">
              {videoItems.map((video, index) => (
                <button
                  key={index}
                  onClick={() => handleVideoClick(video)}
                  className="w-full bg-gray-600 hover:bg-gray-500 text-white text-left px-6 py-4 rounded-lg transition-colors duration-200 flex items-center justify-between group"
                >
                  <span className="text-lg">{video.title}</span>
                  <div className="bg-gray-800 group-hover:bg-gray-700 rounded-full p-2 transition-colors">
                    <ChevronRight className="w-5 h-5 text-white" />
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleSeeAll}
              className="w-full bg-[#016701] hover:bg-green-400 text-slate-900 font-bold text-lg py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              See All
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right Section - Featured Card */}
          <div className="flex items-center justify-center">
            <div className="bg-pink-100 rounded-2xl shadow-2xl overflow-hidden max-w-md w-full transform hover:scale-105 transition-transform duration-300">
              {/* Card Header with Image Collage */}
              <div className="relative p-6">
                <div className="relative bg-gradient-to-br from-teal-400 to-cyan-300 p-1 rounded-lg">
                  <div className="border-4 border-green-400 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-4 grid-rows-2 h-48">
                      {/* Image placeholders - replace with actual images */}
                      <div className="bg-gray-400 border border-white">
                        <Image
                          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=150&fit=crop"
                          alt="Iguana"
                          width={200}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="bg-black border border-white flex items-center justify-center">
                        <span className="text-red-500 text-4xl">🦩</span>
                      </div>
                      <div className="bg-white border border-white">
                        <Image
                          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=200&h=150&fit=crop"
                          alt="Beach"
                          width={200}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="bg-cyan-400 border border-white">
                        <Image
                          src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=200&h=150&fit=crop"
                          alt="Tropical beach"
                          width={200}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="bg-teal-500 border border-white">
                        <Image
                          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop"
                          alt="Nature"
                          width={200}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="bg-cyan-300 border border-white">
                        <Image
                          src="https://images.unsplash.com/photo-1439405326854-014607f694d7?w=200&h=150&fit=crop"
                          alt="Ocean"
                          width={200}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="bg-blue-400 border border-white">
                        <Image
                          src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=200&h=150&fit=crop"
                          alt="Beach"
                          width={200}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="bg-yellow-300 border border-white flex items-center justify-center">
                        <span className="text-3xl">🦎</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="px-6 pb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Other Creoles in the Caribbean
                </h3>
                <p className="text-base text-gray-700">
                  Let&apos;s hear different creoles from Caribbean countries
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

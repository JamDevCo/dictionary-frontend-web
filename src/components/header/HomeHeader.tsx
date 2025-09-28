"use client";
import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import FeatureCard from "@/components/card/FeatureCard";

const HomeHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"dictionary" | "thesaurus">(
    "dictionary"
  );

  return (
    <div className="bg-gradient-to-br from-green-700 to-green-600">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center px-8 py-4">
        <div className="flex gap-8">
          <button className="text-white hover:text-yellow-300 transition-colors font-medium">
            Games
          </button>
          <button className="text-white hover:text-yellow-300 transition-colors font-medium">
            Word of the Day
          </button>
          <button className="text-white hover:text-yellow-300 transition-colors font-medium">
            Proverbs
          </button>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className="bg-white rounded-full p-4 w-24 h-24 flex items-center justify-center shadow-lg">
            <div className="text-center">
              <span className="text-green-600 text-3xl font-bold">📚</span>
              <div className="text-xs text-gray-600 mt-1">JAMAICA</div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <button className="text-white hover:text-yellow-300 transition-colors font-medium">
            Slang
          </button>
          <button className="text-white hover:text-yellow-300 transition-colors font-medium">
            Rhymes
          </button>
          <button className="text-white hover:text-yellow-300 transition-colors font-medium">
            Thesaurus
          </button>
        </div>
      </nav>

      {/* Search Section */}
      <div className="flex justify-center mt-8 px-4">
        <div className="flex bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
          <button
            onClick={() => setActiveTab("dictionary")}
            className={`px-8 py-4 font-bold transition-all ${
              activeTab === "dictionary"
                ? "bg-amber-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Dictionary
          </button>
          <button
            onClick={() => setActiveTab("thesaurus")}
            className={`px-8 py-4 font-bold transition-all ${
              activeTab === "thesaurus"
                ? "bg-amber-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Thesaurus
          </button>
          <div className="flex items-center bg-white">
            <input
              type="text"
              placeholder="Search Dictionary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-6 py-4 w-80 outline-none text-gray-800"
            />
            <button className="bg-amber-600 hover:bg-amber-700 px-6 py-4 transition-colors">
              <Search className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 mt-16 pb-16 max-w-6xl mx-auto">
        <FeatureCard
          title="Slangs"
          subtitle="Explore Jamaican Slangs"
          bgColor="bg-gray-900"
          image=""
        />
        <FeatureCard
          title="True or False Quiz"
          subtitle="Test your knowledge"
          bgColor="bg-sky-500"
        />
        <FeatureCard
          title="Guess the meaning"
          subtitle="Challenge yourself"
          bgColor="bg-gray-300"
          textColor="text-white"
        />
      </div>
    </div>
  );
};

export default HomeHeader;

import React from "react";
import { Search } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-[#016701] px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-32">
          <div className="w-10 rounded-full flex items-center justify-center">
            <Image
              width={70}
              height={70}
              alt="logo"
              src={"/dictionary.svg"}
              className="absolute top-2"
            />
          </div>

          {/* Main Navigation Buttons */}
          <div className="flex space-x-1">
            <button className="bg-[#B88600] text-white px-4 py-2 rounded font-medium hover:bg-[#9a7000] transition-colors">
              Dictionary
            </button>
            <button className="bg-[#B88600] text-white px-4 py-2 rounded font-medium hover:bg-[#9a7000] transition-colors">
              Thesaurus
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search Dictionary"
              className="w-64 px-4 py-2 pr-10 rounded border-0 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#B88600] p-1 rounded hover:bg-[#9a7000] transition-colors">
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Right Navigation Links */}
        <div className="flex items-center space-x-6 text-white">
          <a
            href="#"
            className="hover:text-gray-200 transition-colors font-medium"
          >
            Games
          </a>
          <a
            href="#"
            className="hover:text-gray-200 transition-colors font-medium"
          >
            Word of the Day
          </a>
          <a
            href="#"
            className="hover:text-gray-200 transition-colors font-medium"
          >
            Proverbs
          </a>
          <a
            href="#"
            className="hover:text-gray-200 transition-colors font-medium"
          >
            Slang
          </a>
          <a
            href="#"
            className="hover:text-gray-200 transition-colors font-medium"
          >
            Rhymes
          </a>
          <a
            href="#"
            className="hover:text-gray-200 transition-colors font-medium"
          >
            Thesaurus
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

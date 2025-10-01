"use client";

import React, { useState } from "react";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribe with email:", email);
    // Add subscription logic here
  };

  return (
    <footer className="bg-gray-800 text-white w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left Section - Logo and Links */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            {/* Logo */}
            <Link href="/">
              <Image
                src="/logo_bg_gone.png"
                alt="Patwa Dictionary Logo"
                height={80}
                width={80}
                className="rounded-full object-cover"
                priority
              />
            </Link>

            {/* Navigation Links */}
            <nav className="flex flex-col items-center gap-4">
              <a href="#" className="hover:text-green-400 transition-colors">
                Help
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                About Us
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                Contact Us
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                Terms of Use
              </a>
            </nav>
          </div>

          {/* Center Section - Newsletter */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-2">
              Learn a new word everyday.
            </h3>
            <p className="text-gray-300 mb-4">Delivered to your inbox!</p>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:border-green-500 transition-colors"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#016701] hover:bg-[#016701] text-white font-bold rounded-lg transition-colors uppercase"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Right Section - Social Media */}
          <div className="flex justify-center md:justify-end">
            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-full border-2 border-gray-600 hover:border-green-500 flex items-center justify-center transition-colors group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-green-400" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full border-2 border-gray-600 hover:border-green-500 flex items-center justify-center transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-green-400" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full border-2 border-gray-600 hover:border-green-500 flex items-center justify-center transition-colors group"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-gray-400 group-hover:text-green-400" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full border-2 border-gray-600 hover:border-green-500 flex items-center justify-center transition-colors group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-green-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-center text-sm text-gray-400">
            © 2025 Patwah Dictionary. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

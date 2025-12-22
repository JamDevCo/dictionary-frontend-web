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
    
  };

  return (
    <footer className="bg-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo_dic.jpg"
            alt="Logo"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div>
            <div className="font-bold">Jamaica Creole Dictionary</div>
            <div className="text-sm opacity-90">
              Preserving language & culture
            </div>
          </div>
        </div>

        {/* <nav className="mt-4 sm:mt-0 flex gap-4 text-sm">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav> */}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between">
        <img src={"/shop.png"} width={200} />
        <img src={"/CTC logo.png"} width={200} />
        <img src={"/Osoobe logo.png"} width={200} />
      </div>
      <div className="border-t border-white/20">
        <div className="max-w-7xl text-black mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs  text-center">
          © {new Date().getFullYear()} Jamaica Creole Dictionary — All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}

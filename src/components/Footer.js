"use client";
import Image from "next/image";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white w-full p-4 sm:p-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-6 sm:gap-8 items-center">
        {/* Logo Section */}
        <div className="shrink-0">
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
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          {/* Subscribe Section */}
          <div className="border-t sm:border-b-2 border-green-300 pt-4 sm:pb-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm sm:text-base">Learn a new word every day</p>
              <p className="text-sm sm:text-base">Delivered to your inbox!</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <input
                className="border-2 p-2 rounded-md bg-gray-600 text-white placeholder-gray-400 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-400"
                type="email"
                placeholder="Enter your email"
                aria-label="Email for subscription"
              />
              <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-yellow-300 transition-colors w-full sm:w-auto">
                Subscribe
              </button>
            </div>
          </div>

          {/* Navigation and Social Links */}
          <div className="flex flex-col items-center gap-4">
            <nav>
              <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
                {[
                  { href: "/help", label: "Help", rel: "noopener noreferrer" },
                  {
                    href: "/about",
                    label: "About",
                    rel: "noopener noreferrer",
                  },
                  {
                    href: "/contact",
                    label: "Contact Us",
                    rel: "noopener noreferrer",
                  },
                  {
                    href: "/privacy",
                    label: "Privacy Policy",
                    rel: "noopener noreferrer",
                  },
                  {
                    href: "/terms",
                    label: "Terms of Use",
                    rel: "noopener noreferrer",
                  },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-green-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social Media Links */}
            <div className="flex gap-4">
              {[
                {
                  href: "https://twitter.com/",
                  icon: "fab fa-twitter",
                  rel: "noopener noreferrer",
                },
                {
                  href: "https://facebook.com/",
                  icon: "fab fa-facebook",
                  rel: "noopener noreferrer",
                },
                {
                  href: "https://instagram.com/",
                  icon: "fab fa-instagram",
                  rel: "noopener noreferrer",
                },
                {
                  href: "https://youtube.com/",
                  icon: "fab fa-youtube",
                  rel: "noopener noreferrer",
                },
              ].map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  aria-label={social.icon.split(" ")[1].replace("fa-", "")}
                  className="text-lg hover:text-green-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm">
            <p>
              © {new Date().getFullYear()} Patwa Dictionary. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

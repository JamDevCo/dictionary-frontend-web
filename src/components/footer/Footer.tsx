"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  type LucideIcon,
} from "lucide-react";

type FooterLink = { label: string; href: string };
type FooterSocial = { label: string; href: string; Icon: LucideIcon };
type FooterBrand = {
  src: string;
  alt: string;
  width: number;
  height: number;
  href?: string;
};

interface FooterProps {
  /** Newsletter prompt copy (two-line by default). */
  newsletterHeading?: string;
  /** Hide the newsletter subscribe row. */
  showNewsletter?: boolean;
  /** Override the navigation links. */
  links?: FooterLink[];
  /** Override the social media icons. */
  socials?: FooterSocial[];
  /** Override the partner/brand logos. */
  brands?: FooterBrand[];
  /** Extra classes for the <footer>. */
  className?: string;
}

const defaultLinks: FooterLink[] = [
  { label: "Help", href: "/help" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];

const defaultSocials: FooterSocial[] = [
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "YouTube", href: "#", Icon: Youtube },
  { label: "X", href: "#", Icon: Twitter },
];

const defaultBrands: FooterBrand[] = [
  {
    src: "/CaribbeanTechConnectLogo.svg",
    alt: "Caribbean Tech Connect",
    width: 190,
    height: 55,
  },
  { src: "/ShopYahSoLogo.svg", alt: "Shop Yahso", width: 150, height: 55 },
  { src: "/OsoobeLogo.svg", alt: "Osoobe", width: 200, height: 55 },
];

export default function Footer({
  newsletterHeading = "Learn a new word everyday.\nDelivered to your inbox!",
  showNewsletter = true,
  links = defaultLinks,
  socials = defaultSocials,
  brands = defaultBrands,
  className = "",
}: FooterProps) {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Footer subscribe:", email);
    // Handle subscription logic here
  };

  return (
    <footer className={`bg-[#3b3e41] text-white ${className}`.trim()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-start gap-8">
          {/* Brand logo */}
          <Link href="/" className="shrink-0 mx-auto md:mx-0">
            <Image
              src="/dictionary.svg"
              alt="Patwanary"
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
          </Link>

          {/* Right column: newsletter + links/socials */}
          <div className="flex-1 w-full">
            {showNewsletter ? (
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                <p className="text-lg font-medium whitespace-pre-line lg:min-w-56">
                  {newsletterHeading}
                </p>

                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-1 gap-3 w-full"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    aria-label="Your email address"
                    className="flex-1 min-w-0 px-4 py-3 rounded-md bg-[#54636d] text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <button
                    type="submit"
                    className="shrink-0 px-6 py-3 rounded-md bg-primary hover:bg-dark-green text-white font-semibold uppercase text-sm tracking-wide transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            ) : null}

            {/* Green divider */}
            <div className="h-px bg-primary/80 my-6" />

            {/* Links + socials */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-white/90 hover:text-white hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-4">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-white/30 text-white/70 hover:text-white hover:border-white transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Partner brand logos */}
        {brands.length > 0 ? (
          <div className="mt-10 flex flex-wrap items-center gap-x-14 gap-y-6">
            {brands.map((brand) => {
              const logo = (
                <Image
                  src={brand.src}
                  alt={brand.alt}
                  width={brand.width}
                  height={brand.height}
                  className="h-12 w-auto object-contain"
                />
              );
              return brand.href ? (
                <a key={brand.alt} href={brand.href} aria-label={brand.alt}>
                  {logo}
                </a>
              ) : (
                <span key={brand.alt}>{logo}</span>
              );
            })}
          </div>
        ) : null}
      </div>
    </footer>
  );
}

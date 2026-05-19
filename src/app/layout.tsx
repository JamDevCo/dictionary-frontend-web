import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Patios Dictionary",
  description: "",
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-gray-50 antialiased`}>
        <Navbar />
        
        {children}

        <Footer />
      </body>
    </html>
  );
}
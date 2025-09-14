// src/app/(home)/layout.jsx
import Header from "../components/Header";

export default function HomeLayout({ children }) {
  return (
    <>
      <Header />
      {/* Extra padding so content clears the overhanging cards in Header */}
      <main id="main" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 lg:pt-44">
        {children}
      </main>
    </>
  );
}


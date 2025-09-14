import SecondaryNav from "../components/SecondaryNav"; // (site)/layout -> ../components

export default function SiteLayout({ children }) {
  return (
    <>
      <SecondaryNav initialTab="dictionary" />
      <main id="main" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </>
  );
}


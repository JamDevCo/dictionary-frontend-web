type SidebarItem = {
  label: string;
  href?: string;
};

type SidebarProps = {
  title: string;
  subtitle: string;
  sectionLabel?: string;
  items: SidebarItem[];
};

export default function Sidebar({
  title,
  subtitle,
  sectionLabel,
  items,
}: SidebarProps) {
  return (
    <aside className="col-span-12 md:col-span-2 bg-green-700 text-white rounded-md p-5">
      <h2 className="text-2xl font-bold italic">{title}</h2>
      <p className="text-sm opacity-90">{subtitle}</p>

      <div className="mt-6 border-l border-white pl-4">
        {sectionLabel && (
          <div className="font-semibold uppercase mb-4">{sectionLabel}</div>
        )}

        <nav className="space-y-3">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href ?? "#"}
              className="block text-sm opacity-90 hover:opacity-100 hover:underline"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
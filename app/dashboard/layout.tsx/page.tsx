export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-6 py-6 hidden md:block">
        <h1 className="text-2xl font-bold text-indigo-600 mb-8">
          Tutorly
        </h1>

        <nav className="space-y-4 text-sm">
          <NavItem href="/dashboard" label="Home" />
          <NavItem href="/dashboard/explore" label="Explore Courses" />
          <NavItem href="/dashboard/compare" label="Compare Courses" />
          <NavItem href="/dashboard/cart" label="My Cart" />
          <NavItem href="/dashboard/settings" label="Settings" />
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

import Link from "next/link";

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
    >
      {label}
    </Link>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Overview", href: "/" },
  { label: "Districts", href: "/districts" },
  { label: "Compare", href: "/compare" },
  { label: "Methodology", href: "/methodology" },
  { label: "Policy", href: "/policy" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0f1e] border-b border-[#e8c547]/30 h-16">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="text-[#e8c547] font-bold text-lg tracking-tight shrink-0">
          Nepal Remittance Paradox
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive
                    ? "text-[#e8c547] bg-[#e8c547]/10"
                    : "text-[#94a3b8] hover:text-[#e8c547] hover:bg-[#e8c547]/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className="md:hidden flex items-center gap-3 text-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "text-[#e8c547]"
                  : "text-[#94a3b8]"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

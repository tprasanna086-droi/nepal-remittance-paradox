import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-green-800">
          Nepal Paradox
        </Link>
        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <Link href="/compare" className="hover:text-green-700 transition-colors">
            Compare
          </Link>
          <Link href="/methodology" className="hover:text-green-700 transition-colors">
            Methodology
          </Link>
          <Link href="/policy" className="hover:text-green-700 transition-colors">
            Policy
          </Link>
        </div>
      </div>
    </nav>
  );
}

"use client";

import dynamic from "next/dynamic";

const YieldChart = dynamic(() => import("@/components/YieldChart"), {
  ssr: false,
});

export default function ComparePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Compare Districts</h1>
      <p className="text-gray-600 mb-8">
        Select multiple districts to compare remittance and agricultural
        productivity trends side by side.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">District A</h2>
          <YieldChart district="kathmandu" />
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">District B</h2>
          <YieldChart district="jhapa" />
        </div>
      </div>
    </div>
  );
}

import Map from "@/components/Map";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Nepal Remittance-Agriculture Paradox
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          An interactive exploration of how remittance inflows correlate with
          agricultural productivity, land abandonment, and rural transformation
          across all 77 districts of Nepal.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">District Overview</h2>
        <Map />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {["Koshi", "Madhesh", "Bagmati"].map((province) => (
          <div
            key={province}
            className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-medium mb-2">{province} Province</h3>
            <p className="text-gray-500 text-sm">
              Remittance &amp; agriculture data for {province} districts.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

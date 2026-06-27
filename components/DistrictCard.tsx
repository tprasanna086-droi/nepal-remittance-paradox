interface DistrictCardProps {
  slug: string;
}

export default function DistrictCard({ slug }: DistrictCardProps) {
  const name = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="border rounded-lg p-6 shadow-sm">
      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      <p className="text-gray-500">
        Remittance and agricultural data for {name} district.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-green-50 rounded p-4 text-center">
          <p className="text-sm text-gray-500">Remittance Rate</p>
          <p className="text-2xl font-bold text-green-700">--</p>
        </div>
        <div className="bg-amber-50 rounded p-4 text-center">
          <p className="text-sm text-gray-500">Yield (t/ha)</p>
          <p className="text-2xl font-bold text-amber-700">--</p>
        </div>
        <div className="bg-blue-50 rounded p-4 text-center">
          <p className="text-sm text-gray-500">Land Abandonment</p>
          <p className="text-2xl font-bold text-blue-700">--</p>
        </div>
        <div className="bg-purple-50 rounded p-4 text-center">
          <p className="text-sm text-gray-500">Migration Rate</p>
          <p className="text-2xl font-bold text-purple-700">--</p>
        </div>
      </div>
    </div>
  );
}

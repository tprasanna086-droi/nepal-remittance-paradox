export default function PolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">
        Policy Implications
      </h1>
      <div className="prose prose-gray max-w-none">
        <h2 className="text-xl font-semibold mt-6 mb-3">Key Findings</h2>
        <p>
          Preliminary evidence suggests that high remittance dependence is
          associated with reduced agricultural labor supply and increased
          land abandonment, particularly in hill and mountain districts.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">
          Recommended Interventions
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Productive remittance investment schemes</strong> —
            Incentivize investment in agricultural mechanization and
            irrigation
          </li>
          <li>
            <strong>Rural infrastructure development</strong> — Improve
            market access and cold-storage facilities
          </li>
          <li>
            <strong>Skill-building programs</strong> — Target returning
            migrants with agri-entrepreneurship training
          </li>
          <li>
            <strong>Social protection for farming households</strong> —
            Buffer against labor shortages during peak seasons
          </li>
        </ul>
      </div>
    </div>
  );
}

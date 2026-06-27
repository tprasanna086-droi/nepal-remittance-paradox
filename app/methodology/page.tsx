export default function MethodologyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Methodology</h1>
      <div className="prose prose-gray max-w-none">
        <h2 className="text-xl font-semibold mt-6 mb-3">Data Sources</h2>
        <p>
          This study draws on district-level data from the Nepal Living
          Standards Survey, Agricultural Census, and Nepal Rastra Bank
          remittance records.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Key Indicators</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Remittance Inflow</strong> — Household remittance receipt
            as a share of total income
          </li>
          <li>
            <strong>Agricultural Yield</strong> — Major crop productivity in
            metric tons per hectare
          </li>
          <li>
            <strong>Land Use Change</strong> — Area under cultivation vs. fallow
            land trends
          </li>
          <li>
            <strong>Labor Migration</strong> — Share of households with at least
            one absent member
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">
          Analytical Approach
        </h2>
        <p>
          We employ panel regression models with district and year fixed effects
          to estimate the causal relationship between remittance flows and
          agricultural outcomes, controlling for demographic and geographic
          covariates.
        </p>
      </div>
    </div>
  );
}

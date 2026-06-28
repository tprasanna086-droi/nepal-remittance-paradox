'use client'

import Link from 'next/link'

export default function MethodologyPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-3xl mx-auto px-10 py-16">

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: 'DM Mono, monospace', color: '#9b9890' }}>
            Research Design
          </p>
          <h1 className="font-serif font-bold text-4xl mb-4" style={{ color: '#0e0e0c' }}>Methodology</h1>
          <p className="text-sm leading-relaxed" style={{ color: '#6a6860' }}>
            District-level cross-sectional analysis linking remittance-migration intensity
            to agricultural productivity across all 75 districts of Nepal.
          </p>
        </div>

        {/* Research Question */}
        <section className="mb-12">
          <div className="rounded-lg p-7" style={{ backgroundColor: '#0e0e0c', borderRadius: '8px', borderLeft: '4px solid #9e7c44' }}>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: 'DM Mono, monospace', color: 'rgba(247,246,242,0.5)' }}>Primary Research Question</p>
            <p className="font-serif text-lg leading-relaxed" style={{ color: '#f7f6f2' }}>
              Do structurally vulnerable districts fail to convert remittance-migration wealth
              into agricultural productivity gains — and what structural conditions explain
              the divergence between paradox and resilient districts?
            </p>
          </div>
        </section>

        {/* Data Sources */}
        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl mb-6" style={{ color: '#0e0e0c' }}>Data Sources</h2>
          <div className="space-y-4">
            {[
              {
                source: 'MoALD Statistical Information on Nepalese Agriculture 2079/80 (2022/23)',
                shortname: 'MoALD 2022/23',
                provides: 'District-level cereal area (Ha), production (MT), and yield (MT/Ha) for all 75 districts. Covers paddy, maize, wheat and aggregate cereals.',
                coverage: '75 districts',
                level: 'District',
                color: '#16a34a'
              },
              {
                source: 'CBS Nepal National Population and Housing Census 2021',
                shortname: 'CBS 2021',
                provides: 'Absent household rate, absent population rate, literacy rate, secondary education attainment by district. Primary source for migration intensity measurement.',
                coverage: '75 districts',
                level: 'District',
                color: '#2563eb'
              },
              {
                source: 'Nepal Remittance Atlas — RDI & RVI Indices',
                shortname: 'Atlas 2026',
                provides: 'Remittance Dependency Index (RDI) and Remittance Vulnerability Index (RVI) constructed via PCA across five structural indicators. Jenks Natural Breaks tier classification.',
                coverage: '75 districts',
                level: 'District',
                color: '#9e7c44'
              },
              {
                source: 'World Bank Nepal Poverty Assessment',
                shortname: 'World Bank',
                provides: 'District-level poverty rate estimates used as structural control variable in cross-sectional analysis.',
                coverage: '75 districts',
                level: 'District',
                color: '#ea580c'
              },
            ].map((d, i) => (
              <div key={i} className="rounded-lg p-5" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '6px', borderLeft: `3px solid ${d.color}` }}>
                <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                  <div>
                    <p className="font-serif font-bold text-sm" style={{ color: '#0e0e0c' }}>{d.shortname}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#9b9890' }}>{d.source}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: d.color + '1a', color: d.color }}>{d.coverage}</span>
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'rgba(14,14,12,0.06)', color: '#6a6860' }}>{d.level} level</span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#6a6860' }}>{d.provides}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Index Construction */}
        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl mb-6" style={{ color: '#0e0e0c' }}>Index Construction</h2>
          
          <div className="space-y-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '6px' }}>
              <h3 className="font-serif font-bold text-base mb-3" style={{ color: '#9e7c44' }}>Remittance Dependency Index (RDI)</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#6a6860' }}>
                The RDI measures active migration intensity using three indicators with theory-driven weights: 
                absent population rate (0.40), absent household rate (0.35), and inverse secondary education 
                of migrants (0.25). Scores are rescaled 0–100 and classified into four tiers using 
                Jenks Natural Breaks optimization.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { indicator: 'Absent Population Rate', weight: '40%' },
                  { indicator: 'Absent Household Rate', weight: '35%' },
                  { indicator: 'Education Inverse', weight: '25%' },
                ].map((w, i) => (
                  <div key={i} className="rounded-lg p-3 text-center" style={{ backgroundColor: '#f7f6f2', borderRadius: '6px' }}>
                    <p className="font-serif font-bold text-lg" style={{ color: '#9e7c44' }}>{w.weight}</p>
                    <p className="text-xs mt-1" style={{ color: '#9b9890' }}>{w.indicator}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '6px' }}>
              <h3 className="font-serif font-bold text-base mb-3" style={{ color: '#9e7c44' }}>Remittance Vulnerability Index (RVI) — PCA-Derived</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#6a6860' }}>
                The RVI captures structural conditions predisposing districts to remittance dependency, 
                independent of current migration levels. Five indicators are z-score standardized and 
                entered into Principal Component Analysis (PCA). Weights derive from PC1 loadings 
                (PC1 explains 44.46% of variance). The RVI-RDI Spearman correlation of –0.31 confirms 
                the two indices measure fundamentally different phenomena.
              </p>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { indicator: 'Literacy Inverse', weight: '25.5%', loading: '0.562' },
                  { indicator: 'Education Inverse', weight: '20.7%', loading: '0.457' },
                  { indicator: 'MPI Poverty', weight: '19.6%', loading: '0.433' },
                  { indicator: 'Absent Pop Rate', weight: '18.7%', loading: '0.412' },
                  { indicator: 'Absent HH Rate', weight: '15.5%', loading: '0.343' },
                ].map((w, i) => (
                  <div key={i} className="rounded-lg p-3 text-center" style={{ backgroundColor: '#f7f6f2', borderRadius: '6px' }}>
                    <p className="font-serif font-bold text-sm" style={{ color: '#9e7c44' }}>{w.weight}</p>
                    <p className="text-xs mt-1" style={{ color: '#9b9890' }}>{w.indicator}</p>
                    <p className="text-xs" style={{ color: '#6a6860' }}>PC1: {w.loading}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Analytical Framework */}
        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl mb-6" style={{ color: '#0e0e0c' }}>Analytical Framework</h2>
          
          <div className="rounded-lg p-6 mb-6" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '6px' }}>
            <h3 className="font-serif font-bold text-base mb-3" style={{ color: '#9e7c44' }}>Cross-Sectional Classification</h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#6a6860' }}>
              Districts are classified into four quadrants based on two thresholds: household migration 
              rate above 25% (high migration) and cereal yield above the district mean of 2.90 MT/Ha 
              (above-average productivity). This produces the core paradox taxonomy:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Paradox Zone', desc: 'High migration + below-average yield', n: '11 districts', color: '#dc2626' },
                { label: 'Resilient', desc: 'High migration + above-average yield', n: '16 districts', color: '#16a34a' },
                { label: 'Structurally Poor', desc: 'Low migration + below-average yield', n: '32 districts', color: '#ea580c' },
                { label: 'Stable', desc: 'Low migration + above-average yield', n: '16 districts', color: '#2563eb' },
              ].map((q, i) => (
                <div key={i} className="rounded-lg p-4" style={{ backgroundColor: '#f7f6f2', borderRadius: '6px', borderLeft: `3px solid ${q.color}` }}>
                  <p className="font-medium text-sm" style={{ color: '#0e0e0c' }}>{q.label}</p>
                  <p className="text-xs mt-1" style={{ color: '#6a6860' }}>{q.desc}</p>
                  <p className="text-xs mt-2 font-medium" style={{ color: q.color }}>{q.n}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg p-6 mb-6" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '6px' }}>
            <h3 className="font-serif font-bold text-base mb-3" style={{ color: '#9e7c44' }}>Regression Model</h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#6a6860' }}>
              Cross-sectional OLS regression with province fixed effects estimates the structural 
              relationship between migration intensity and agricultural yield, controlling for 
              poverty and education:
            </p>
            <div className="rounded-lg p-4 font-mono text-sm leading-relaxed" style={{ backgroundColor: '#f7f6f2', borderRadius: '6px', color: '#0e0e0c' }}>
              Yield_i = β₀ + β₁(RDI_i) + β₂(RVI_i) + β₃(Literacy_i)<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ β₄(Poverty_i) + Province_FE + ε_i
            </div>
            <p className="text-xs mt-3" style={{ color: '#9b9890' }}>
              Where i indexes districts. Province fixed effects control for unobserved 
              geographic and ecological heterogeneity across Nepal&apos;s seven provinces.
            </p>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '6px' }}>
            <h3 className="font-serif font-bold text-base mb-3" style={{ color: '#9e7c44' }}>Robustness</h3>
            <div className="space-y-2">
              {[
                { check: 'RVI weighting schemes', result: 'Spearman correlations >0.93 across PCA, equal, and literature weights — index rankings are stable', pass: true },
                { check: 'Spatial autocorrelation (Moran\'s I)', result: 'RVI: 0.5712 (p=0.001), RDI: 0.4713 (p=0.001) — strong clustering confirmed; province FE partially controls', pass: true },
                { check: 'PCA sample size', result: 'n=75 districts, 5 indicators for RVI (15:1 ratio), exceeds MacCallum et al. (1999) minimum of 10:1', pass: true },
                { check: 'Split district reconciliation', result: 'Nawalparasi East/West and Rukum East/West merged by area-weighted yield average for Atlas compatibility', pass: true },
              ].map((r, i) => (
                <div key={i} className="flex gap-3 items-start p-3" style={{ borderRadius: '6px' }}>
                  <span className="mt-0.5" style={{ color: '#16a34a' }}>✓</span>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#0e0e0c' }}>{r.check}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#6a6860' }}>{r.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Threshold Sensitivity Analysis */}
        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl mb-6" style={{ color: '#0e0e0c' }}>Threshold Sensitivity Analysis</h2>
          
          <div className="rounded-lg p-6 mb-6" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '6px' }}>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#6a6860' }}>
              The four-quadrant paradox taxonomy depends on two classification thresholds: 
              household migration rate (baseline: 25%) and cereal yield (baseline: district mean 2.90 MT/Ha). 
              To test robustness, we re-classified all 75 districts under four alternative threshold combinations. 
              The baseline scenario (✦) is the primary analysis used throughout this study.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '0.8px solid rgba(14,14,12,0.09)' }}>
                    <th className="text-left py-2 pr-4" style={{ color: '#9b9890', fontFamily: 'DM Mono, monospace' }}>Migration Threshold</th>
                    <th className="text-left py-2 pr-4" style={{ color: '#9b9890', fontFamily: 'DM Mono, monospace' }}>Yield Threshold</th>
                    <th className="text-center py-2 pr-4" style={{ color: '#dc2626', fontFamily: 'DM Mono, monospace' }}>Paradox Zone</th>
                    <th className="text-center py-2 pr-4" style={{ color: '#16a34a', fontFamily: 'DM Mono, monospace' }}>Resilient</th>
                    <th className="text-center py-2 pr-4" style={{ color: '#ea580c', fontFamily: 'DM Mono, monospace' }}>Struct. Poor</th>
                    <th className="text-center py-2" style={{ color: '#2563eb', fontFamily: 'DM Mono, monospace' }}>Stable</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { mig: '>20%', yield: 'Median (2.86)', paradox: 20, resilient: 22, poor: 18, stable: 15, base: false },
                    { mig: '>25% ✦', yield: 'Mean (2.90) ✦', paradox: 11, resilient: 16, poor: 28, stable: 20, base: true },
                    { mig: '>30%', yield: 'Mean (2.90)', paradox: 6, resilient: 10, poor: 33, stable: 26, base: false },
                    { mig: '>25%', yield: '75th pct (3.48)', paradox: 20, resilient: 7, poor: 36, stable: 12, base: false },
                  ].map((row, i) => (
                    <tr key={i} className="" style={row.base ? { backgroundColor: 'rgba(158,124,68,0.06)' } : {}}>
                      <td className="py-3 pr-4">
                        <span style={row.base ? { color: '#9e7c44', fontWeight: 500 } : { color: '#6a6860' }}>{row.mig}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span style={row.base ? { color: '#9e7c44', fontWeight: 500 } : { color: '#6a6860' }}>{row.yield}</span>
                      </td>
                      <td className="py-3 pr-4 text-center font-semibold" style={{ color: '#dc2626' }}>{row.paradox}</td>
                      <td className="py-3 pr-4 text-center font-semibold" style={{ color: '#16a34a' }}>{row.resilient}</td>
                      <td className="py-3 pr-4 text-center font-semibold" style={{ color: '#ea580c' }}>{row.poor}</td>
                      <td className="py-3 text-center font-semibold" style={{ color: '#2563eb' }}>{row.stable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs mt-4" style={{ color: '#9b9890', fontFamily: 'DM Mono, monospace' }}>✦ Baseline scenario used in primary analysis throughout this study.</p>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '6px' }}>
            <h3 className="font-serif font-bold text-base mb-3" style={{ color: '#9e7c44' }}>Borderline Districts</h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#6a6860' }}>
              Six districts fall within ±3 percentage points of the 25% migration threshold with 
              below-average yields. These borderline cases are sensitive to threshold choice and 
              may warrant hybrid policy approaches combining Track 1 and Track 3 interventions:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: 'Baitadi', province: 'Sudurpashchim', migration: '26.5%', yield: '2.19' },
                { name: 'Gorkha', province: 'Bagmati', migration: '24.2%', yield: '2.51' },
                { name: 'Salyan', province: 'Lumbini', migration: '23.4%', yield: '2.76' },
                { name: 'Dailekh', province: 'Karnali', migration: '22.4%', yield: '2.05' },
                { name: 'Panchthar', province: 'Koshi', migration: '22.3%', yield: '2.33' },
                { name: 'Bajura', province: 'Sudurpashchim', migration: '22.0%', yield: '1.73' },
              ].map((d, i) => (
                <div key={i} className="rounded-lg p-3" style={{ backgroundColor: '#f7f6f2', borderRadius: '6px', border: '0.8px solid rgba(158,124,68,0.2)' }}>
                  <p className="text-sm font-medium" style={{ color: '#0e0e0c' }}>{d.name}</p>
                  <p className="text-xs" style={{ color: '#9b9890' }}>{d.province}</p>
                  <p className="text-xs mt-1" style={{ color: '#6a6860' }}>Migration: {d.migration} · Yield: {d.yield}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Limitations */}
        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl mb-6" style={{ color: '#0e0e0c' }}>Limitations</h2>
          <div className="rounded-lg p-6 space-y-4" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '6px' }}>
            {[
              { title: 'Cross-sectional design', text: 'Single-year agricultural data (2022/23) prevents causal time-series analysis. Correlation between migration and yield does not establish direction of causality.' },
              { title: 'India migration undercounting', text: 'Open border districts (Kanchanpur, Kailali, Jhapa) systematically underreport India-bound migration as no permits are required, potentially underestimating migration intensity.' },
              { title: 'Provincial MPI proxy', text: 'District-level MPI poverty data is unavailable in Nepal. All districts within a province share identical MPI scores, creating artificial spatial clustering in the RVI.' },
              { title: 'Remittance flow data', text: 'Direct remittance inflow data at district level does not exist in Nepal. Migration intensity (absent household rate) is used as the established proxy for remittance exposure.' },
            ].map((l, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-sm mt-0.5 shrink-0" style={{ color: '#ea580c' }}>⚠</span>
                <div>
                  <p className="text-sm" style={{ color: '#0e0e0c' }}>{l.title}</p>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#6a6860' }}>{l.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* References */}
        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl mb-6" style={{ color: '#0e0e0c' }}>References</h2>
          <div className="space-y-3">
            {[
              'Abson, D.J., Dougill, A.J., and Stringer, L.C. (2012). Using Principal Component Analysis for information-rich socio-ecological vulnerability mapping in Southern Africa. Applied Geography, 35(1-2), 515–524.',
              'CBS Nepal (2021). National Population and Housing Census 2021. Central Bureau of Statistics, Government of Nepal.',
              'MacCallum, R.C., Widaman, K.F., Zhang, S., and Hong, S. (1999). Sample size in factor analysis. Psychological Methods, 4(1), 84–99.',
              'MoALD (2023). Statistical Information on Nepalese Agriculture 2079/80 (2022/23). Ministry of Agriculture and Livestock Development, Government of Nepal.',
              'Shrestha, N. (2022). Do remittances reshape household expenditures? Evidence from Nepal. World Development, 157, 105933.',
              'World Bank (2023). Migration and Remittances Data. World Bank Open Data.',
            ].map((ref, i) => (
              <p key={i} className="text-xs leading-relaxed pb-3" style={{ color: '#9b9890', borderBottom: i < 5 ? '0.8px solid rgba(14,14,12,0.09)' : 'none' }}>
                {ref}
              </p>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4">
          <Link href="/" className="text-sm" style={{ color: '#9b9890' }}>
            ← Overview
          </Link>
          <Link href="/policy" className="text-sm" style={{ color: '#9e7c44' }}>
            Policy Implications →
          </Link>
        </div>

      </div>
    </div>
  )
}

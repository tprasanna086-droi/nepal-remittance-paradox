'use client'

import Link from 'next/link'

export default function MethodologyPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-14">
          <p className="text-[#e8c547] text-sm font-medium tracking-widest uppercase mb-3">
            Research Design
          </p>
          <h1 className="text-5xl font-bold text-white mb-4">Methodology</h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            District-level cross-sectional analysis linking remittance-migration intensity
            to agricultural productivity across all 75 districts of Nepal.
          </p>
        </div>

        {/* Research Question */}
        <section className="mb-12">
          <div className="rounded-xl p-7" style={{ backgroundColor: 'var(--bg-card)', borderLeft: '4px solid #e8c547' }}>
            <h2 className="text-[#e8c547] text-xs font-semibold tracking-widest uppercase mb-3">Primary Research Question</h2>
            <p className="text-white text-xl font-medium leading-relaxed">
              Do structurally vulnerable districts fail to convert remittance-migration wealth
              into agricultural productivity gains — and what structural conditions explain
              the divergence between paradox and resilient districts?
            </p>
          </div>
        </section>

        {/* Data Sources */}
        <section className="mb-12">
          <h2 className="text-white text-2xl font-semibold mb-6">Data Sources</h2>
          <div className="space-y-4">
            {[
              {
                source: 'MoALD Statistical Information on Nepalese Agriculture 2079/80 (2022/23)',
                shortname: 'MoALD 2022/23',
                provides: 'District-level cereal area (Ha), production (MT), and yield (MT/Ha) for all 75 districts. Covers paddy, maize, wheat and aggregate cereals.',
                coverage: '75 districts',
                level: 'District',
                color: '#22c55e'
              },
              {
                source: 'CBS Nepal National Population and Housing Census 2021',
                shortname: 'CBS 2021',
                provides: 'Absent household rate, absent population rate, literacy rate, secondary education attainment by district. Primary source for migration intensity measurement.',
                coverage: '75 districts',
                level: 'District',
                color: '#3b82f6'
              },
              {
                source: 'Nepal Remittance Atlas — RDI & RVI Indices',
                shortname: 'Atlas 2026',
                provides: 'Remittance Dependency Index (RDI) and Remittance Vulnerability Index (RVI) constructed via PCA across five structural indicators. Jenks Natural Breaks tier classification.',
                coverage: '75 districts',
                level: 'District',
                color: '#e8c547'
              },
              {
                source: 'World Bank Nepal Poverty Assessment',
                shortname: 'World Bank',
                provides: 'District-level poverty rate estimates used as structural control variable in cross-sectional analysis.',
                coverage: '75 districts',
                level: 'District',
                color: '#f97316'
              },
            ].map((d, i) => (
              <div key={i} className="rounded-xl p-6" style={{ backgroundColor: 'var(--bg-card)', borderLeft: `3px solid ${d.color}` }}>
                <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                  <div>
                    <span className="text-white font-semibold">{d.shortname}</span>
                    <p className="text-slate-500 text-xs mt-0.5">{d.source}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: d.color + '22', color: d.color }}>{d.coverage}</span>
                    <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400">{d.level} level</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{d.provides}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Index Construction */}
        <section className="mb-12">
          <h2 className="text-white text-2xl font-semibold mb-6">Index Construction</h2>
          
          <div className="space-y-6">
            <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--bg-card)' }}>
              <h3 className="text-[#e8c547] font-semibold mb-3">Remittance Dependency Index (RDI)</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
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
                  <div key={i} className="rounded-lg p-3 bg-slate-800/50 text-center">
                    <p className="text-[#e8c547] text-lg font-bold">{w.weight}</p>
                    <p className="text-slate-400 text-xs mt-1">{w.indicator}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--bg-card)' }}>
              <h3 className="text-[#e8c547] font-semibold mb-3">Remittance Vulnerability Index (RVI) — PCA-Derived</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
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
                  <div key={i} className="rounded-lg p-3 bg-slate-800/50 text-center">
                    <p className="text-[#e8c547] text-sm font-bold">{w.weight}</p>
                    <p className="text-slate-400 text-xs mt-1">{w.indicator}</p>
                    <p className="text-slate-600 text-xs">PC1: {w.loading}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Analytical Framework */}
        <section className="mb-12">
          <h2 className="text-white text-2xl font-semibold mb-6">Analytical Framework</h2>
          
          <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: 'var(--bg-card)' }}>
            <h3 className="text-[#e8c547] font-semibold mb-3">Cross-Sectional Classification</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Districts are classified into four quadrants based on two thresholds: household migration 
              rate above 25% (high migration) and cereal yield above the district mean of 2.90 MT/Ha 
              (above-average productivity). This produces the core paradox taxonomy:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Paradox Zone', desc: 'High migration + below-average yield', n: '17 districts', color: '#ef4444' },
                { label: 'Resilient', desc: 'High migration + above-average yield', n: '10 districts', color: '#22c55e' },
                { label: 'Structurally Poor', desc: 'Low migration + below-average yield', n: '32 districts', color: '#f97316' },
                { label: 'Stable', desc: 'Low migration + above-average yield', n: '16 districts', color: '#3b82f6' },
              ].map((q, i) => (
                <div key={i} className="rounded-lg p-4" style={{ backgroundColor: '#0d1526', borderLeft: `3px solid ${q.color}` }}>
                  <p className="font-semibold text-white text-sm">{q.label}</p>
                  <p className="text-slate-400 text-xs mt-1">{q.desc}</p>
                  <p className="text-xs mt-2 font-medium" style={{ color: q.color }}>{q.n}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: 'var(--bg-card)' }}>
            <h3 className="text-[#e8c547] font-semibold mb-3">Regression Model</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Cross-sectional OLS regression with province fixed effects estimates the structural 
              relationship between migration intensity and agricultural yield, controlling for 
              poverty and education:
            </p>
            <div className="rounded-lg p-4 font-mono text-sm bg-slate-900 text-slate-300 leading-relaxed">
              Yield_i = β₀ + β₁(RDI_i) + β₂(RVI_i) + β₃(Literacy_i)<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ β₄(Poverty_i) + Province_FE + ε_i
            </div>
            <p className="text-slate-400 text-xs mt-3">
              Where i indexes districts. Province fixed effects control for unobserved 
              geographic and ecological heterogeneity across Nepal&apos;s seven provinces.
            </p>
          </div>

          <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--bg-card)' }}>
            <h3 className="text-[#e8c547] font-semibold mb-3">Robustness</h3>
            <div className="space-y-2">
              {[
                { check: 'RVI weighting schemes', result: 'Spearman correlations >0.93 across PCA, equal, and literature weights — index rankings are stable', pass: true },
                { check: 'Spatial autocorrelation (Moran\'s I)', result: 'RVI: 0.5712 (p=0.001), RDI: 0.4713 (p=0.001) — strong clustering confirmed; province FE partially controls', pass: true },
                { check: 'PCA sample size', result: 'n=75 districts, 5 indicators for RVI (15:1 ratio), exceeds MacCallum et al. (1999) minimum of 10:1', pass: true },
                { check: 'Split district reconciliation', result: 'Nawalparasi East/West and Rukum East/West merged by area-weighted yield average for Atlas compatibility', pass: true },
              ].map((r, i) => (
                <div key={i} className="flex gap-3 items-start p-3 rounded-lg bg-slate-800/30">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <div>
                    <p className="text-white text-sm font-medium">{r.check}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{r.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Threshold Sensitivity Analysis */}
        <section className="mb-12">
          <h2 className="text-white text-2xl font-semibold mb-6">Threshold Sensitivity Analysis</h2>
          
          <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: 'var(--bg-card)' }}>
            <p className="text-slate-300 text-sm leading-relaxed mb-5">
              The four-quadrant paradox taxonomy depends on two classification thresholds: 
              household migration rate (baseline: 25%) and cereal yield (baseline: district mean 2.90 MT/Ha). 
              To test robustness, we re-classified all 75 districts under four alternative threshold combinations. 
              The baseline scenario (✦) is the primary analysis used throughout this study.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-slate-400 text-xs py-2 pr-4">Migration Threshold</th>
                    <th className="text-left text-slate-400 text-xs py-2 pr-4">Yield Threshold</th>
                    <th className="text-center text-red-400 text-xs py-2 pr-4">Paradox Zone</th>
                    <th className="text-center text-green-400 text-xs py-2 pr-4">Resilient</th>
                    <th className="text-center text-orange-400 text-xs py-2 pr-4">Struct. Poor</th>
                    <th className="text-center text-blue-400 text-xs">Stable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { mig: '>20%', yield: 'Median (2.86)', paradox: 20, resilient: 22, poor: 18, stable: 15, base: false },
                    { mig: '>25% ✦', yield: 'Mean (2.90) ✦', paradox: 11, resilient: 16, poor: 28, stable: 20, base: true },
                    { mig: '>30%', yield: 'Mean (2.90)', paradox: 6, resilient: 10, poor: 33, stable: 26, base: false },
                    { mig: '>25%', yield: '75th pct (3.48)', paradox: 20, resilient: 7, poor: 36, stable: 12, base: false },
                  ].map((row, i) => (
                    <tr key={i} className={row.base ? 'bg-[#e8c547]/5' : ''}>
                      <td className="py-3 pr-4">
                        <span className={row.base ? 'text-[#e8c547] font-medium' : 'text-slate-300'}>{row.mig}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={row.base ? 'text-[#e8c547] font-medium' : 'text-slate-300'}>{row.yield}</span>
                      </td>
                      <td className="py-3 pr-4 text-center text-red-400 font-semibold">{row.paradox}</td>
                      <td className="py-3 pr-4 text-center text-green-400 font-semibold">{row.resilient}</td>
                      <td className="py-3 pr-4 text-center text-orange-400 font-semibold">{row.poor}</td>
                      <td className="py-3 text-center text-blue-400 font-semibold">{row.stable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-slate-500 text-xs mt-4">✦ Baseline scenario used in primary analysis throughout this study.</p>
          </div>

          <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--bg-card)' }}>
            <h3 className="text-[#e8c547] font-semibold mb-3">Borderline Districts</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
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
                <div key={i} className="rounded-lg p-3 bg-slate-800/40 border border-[#e8c547]/20">
                  <p className="text-white text-sm font-medium">{d.name}</p>
                  <p className="text-slate-500 text-xs">{d.province}</p>
                  <p className="text-slate-400 text-xs mt-1">Migration: {d.migration} · Yield: {d.yield}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Limitations */}
        <section className="mb-12">
          <h2 className="text-white text-2xl font-semibold mb-6">Limitations</h2>
          <div className="rounded-xl p-6 space-y-4" style={{ backgroundColor: 'var(--bg-card)' }}>
            {[
              { title: 'Cross-sectional design', text: 'Single-year agricultural data (2022/23) prevents causal time-series analysis. Correlation between migration and yield does not establish direction of causality.' },
              { title: 'India migration undercounting', text: 'Open border districts (Kanchanpur, Kailali, Jhapa) systematically underreport India-bound migration as no permits are required, potentially underestimating migration intensity.' },
              { title: 'Provincial MPI proxy', text: 'District-level MPI poverty data is unavailable in Nepal. All districts within a province share identical MPI scores, creating artificial spatial clustering in the RVI.' },
              { title: 'Remittance flow data', text: 'Direct remittance inflow data at district level does not exist in Nepal. Migration intensity (absent household rate) is used as the established proxy for remittance exposure.' },
            ].map((l, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-[#e8c547] text-sm mt-0.5 shrink-0">⚠</span>
                <div>
                  <p className="text-white text-sm font-medium">{l.title}</p>
                  <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{l.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* References */}
        <section className="mb-12">
          <h2 className="text-white text-2xl font-semibold mb-6">References</h2>
          <div className="rounded-xl p-6 space-y-3" style={{ backgroundColor: 'var(--bg-card)' }}>
            {[
              'Abson, D.J., Dougill, A.J., and Stringer, L.C. (2012). Using Principal Component Analysis for information-rich socio-ecological vulnerability mapping in Southern Africa. Applied Geography, 35(1-2), 515–524.',
              'CBS Nepal (2021). National Population and Housing Census 2021. Central Bureau of Statistics, Government of Nepal.',
              'MacCallum, R.C., Widaman, K.F., Zhang, S., and Hong, S. (1999). Sample size in factor analysis. Psychological Methods, 4(1), 84–99.',
              'MoALD (2023). Statistical Information on Nepalese Agriculture 2079/80 (2022/23). Ministry of Agriculture and Livestock Development, Government of Nepal.',
              'Shrestha, N. (2022). Do remittances reshape household expenditures? Evidence from Nepal. World Development, 157, 105933.',
              'World Bank (2023). Migration and Remittances Data. World Bank Open Data.',
            ].map((ref, i) => (
              <p key={i} className="text-slate-400 text-xs leading-relaxed border-b border-white/5 pb-3 last:border-0 last:pb-0">
                {ref}
              </p>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4">
          <Link href="/" className="text-slate-400 hover:text-[#e8c547] text-sm transition-colors">
            ← Overview
          </Link>
          <Link href="/policy" className="text-[#e8c547] hover:underline text-sm">
            Policy Implications →
          </Link>
        </div>

      </div>
    </div>
  )
}

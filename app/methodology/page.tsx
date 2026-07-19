'use client'

import Link from 'next/link'

export default function MethodologyPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-3xl mx-auto px-10 py-16">

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs tracking-widest uppercase mb-3"
            style={{ fontFamily: 'DM Mono, monospace', color: '#9b9890' }}>
            Research Design
          </p>
          <h1 className="font-serif font-bold text-4xl mb-4"
            style={{ color: '#0e0e0c', fontFamily: 'Libre Baskerville, serif' }}>
            Methodology
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: '#6a6860' }}>
            District-level cross-sectional analysis linking remittance-migration
            intensity to agricultural productivity across all 75 districts of Nepal.
            Full replication code available at{' '}
            <a href="https://github.com/tprasanna086-droi/nepal-remittance-paradox"
              className="underline" style={{ color: '#9e7c44' }}>
              github.com/tprasanna086-droi/nepal-remittance-paradox
            </a>.
          </p>
        </div>

        {/* Research Question */}
        <section className="mb-12">
          <div className="rounded-lg p-7"
            style={{ backgroundColor: '#0e0e0c', borderLeft: '4px solid #9e7c44' }}>
            <p className="text-xs tracking-widest uppercase mb-3"
              style={{ fontFamily: 'DM Mono, monospace', color: 'rgba(247,246,242,0.5)' }}>
              Primary Research Question
            </p>
            <p className="font-serif text-lg leading-relaxed"
              style={{ color: '#f7f6f2', fontFamily: 'Libre Baskerville, serif' }}>
              Do structurally vulnerable districts fail to convert remittance-migration
              wealth into agricultural productivity gains — and what structural conditions
              explain the divergence between paradox and resilient districts?
            </p>
          </div>
        </section>

        {/* Data Sources */}
        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl mb-5"
            style={{ color: '#0e0e0c', fontFamily: 'Libre Baskerville, serif' }}>
            Data Sources
          </h2>
          <div className="space-y-4">
            {[
              {
                name: 'MoALD 2022/23',
                full: 'MoALD Statistical Information on Nepalese Agriculture 2079/80 (2022/23)',
                desc: 'District-level cereal area (Ha), production (MT), and yield (MT/Ha) for all 75 districts. Extracted from Table 1.3 of the official PDF using pdfplumber.',
                tag: '75 districts',
                color: '#16a34a',
              },
              {
                name: 'CBS Nepal 2021',
                full: 'CBS Nepal National Population and Housing Census 2021',
                desc: 'Absent household rate, absent population rate, literacy rate, secondary education attainment by district. Primary source for migration intensity measurement.',
                tag: '75 districts',
                color: '#2563eb',
              },
              {
                name: 'Nepal Remittance Atlas',
                full: 'Nepal Remittance Atlas — RDI & RVI Indices (Thapa, 2026)',
                desc: 'Remittance Dependency Index (RDI) and Remittance Vulnerability Index (RVI) constructed via PCA across CBS microdata. Jenks Natural Breaks tier classification. Companion project to this study.',
                tag: '75 districts',
                color: '#9e7c44',
              },
              {
                name: 'World Bank / OPHI',
                full: 'World Bank Nepal Poverty Assessment & OPHI MPI 2022',
                desc: 'District-level poverty rates (excluded from preferred regression — VIF=894 indicating severe multicollinearity). Provincial MPI used as poverty proxy in RVI construction.',
                tag: 'District / Provincial',
                color: '#ea580c',
              },
            ].map((d, i) => (
              <div key={i} className="rounded-lg p-6"
                style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderLeft: `3px solid ${d.color}` }}>
                <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                  <div>
                    <span className="font-serif font-bold text-sm" style={{ color: '#0e0e0c' }}>{d.name}</span>
                    <p className="text-xs mt-0.5" style={{ color: '#9b9890' }}>{d.full}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded shrink-0"
                    style={{ backgroundColor: d.color + '15', color: d.color }}>
                    {d.tag}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#6a6860' }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Index Construction */}
        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl mb-5"
            style={{ color: '#0e0e0c', fontFamily: 'Libre Baskerville, serif' }}>
            Index Construction
          </h2>
          <div className="space-y-6">

            {/* RDI */}
            <div className="rounded-lg p-6"
              style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)' }}>
              <h3 className="font-serif font-bold text-base mb-3"
                style={{ color: '#9e7c44', fontFamily: 'Libre Baskerville, serif' }}>
                Remittance Dependency Index (RDI)
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#6a6860' }}>
                Theory-driven weights across three CBS indicators reflecting migration stock,
                household breadth, and human capital selectivity. A sensitivity analysis
                comparing theory-driven and equal weights (0.33/0.33/0.33) yields a Spearman
                correlation of 0.753 between the two versions — the equal-weight version
                produces a statistically insignificant yield association, confirming the
                theory weights better capture the dominant migration signal.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Absent Population Rate', weight: '40%' },
                  { label: 'Absent Household Rate', weight: '35%' },
                  { label: 'Education Inverse', weight: '25%' },
                ].map((w, i) => (
                  <div key={i} className="rounded p-3 text-center"
                    style={{ backgroundColor: '#f7f6f2' }}>
                    <p className="font-serif font-bold text-lg" style={{ color: '#9e7c44' }}>{w.weight}</p>
                    <p className="text-xs mt-1" style={{ color: '#9b9890' }}>{w.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RVI */}
            <div className="rounded-lg p-6"
              style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)' }}>
              <h3 className="font-serif font-bold text-base mb-3"
                style={{ color: '#9e7c44', fontFamily: 'Libre Baskerville, serif' }}>
                Remittance Vulnerability Index (RVI) — PCA Derived
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#6a6860' }}>
                Five indicators z-score standardized and entered into PCA. PC1 (explaining
                44.46% of variance) provides the basis for RVI scores, following Abson et al.
                (2012). Robustness confirmed: Spearman correlation between PCA and equal-weight
                versions is 0.989. The RDI–RVI Spearman correlation is −0.31, confirming
                the two indices measure fundamentally different phenomena.
              </p>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { label: 'Literacy Inverse', weight: '25.5%', loading: '0.562' },
                  { label: 'Education Inverse', weight: '20.7%', loading: '0.457' },
                  { label: 'MPI Poverty', weight: '19.6%', loading: '0.433' },
                  { label: 'Absent Pop Rate', weight: '18.7%', loading: '0.412' },
                  { label: 'Absent HH Rate', weight: '15.5%', loading: '0.343' },
                ].map((w, i) => (
                  <div key={i} className="rounded p-3 text-center"
                    style={{ backgroundColor: '#f7f6f2' }}>
                    <p className="font-serif font-bold text-sm" style={{ color: '#9e7c44' }}>{w.weight}</p>
                    <p className="text-xs mt-1" style={{ color: '#9b9890' }}>{w.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#d1cfc8' }}>PC1: {w.loading}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Analytical Framework */}
        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl mb-5"
            style={{ color: '#0e0e0c', fontFamily: 'Libre Baskerville, serif' }}>
            Analytical Framework
          </h2>

          {/* Paradox Taxonomy */}
          <div className="rounded-lg p-6 mb-6"
            style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)' }}>
            <h3 className="font-serif font-bold text-base mb-3"
              style={{ color: '#9e7c44', fontFamily: 'Libre Baskerville, serif' }}>
              Four-Quadrant Paradox Taxonomy
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#6a6860' }}>
              Districts classified by two thresholds: household migration rate above 25%
              and cereal yield above the district mean of 2.90 MT/Ha. Threshold sensitivity
              analysis across four alternative specifications confirms the Paradox Zone
              ranges from 6 to 20 districts — the baseline 17-district classification
              is robust to reasonable threshold variation.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Paradox Zone', desc: 'High migration + below-average yield', n: '17 districts', color: '#dc2626' },
                { label: 'Resilient', desc: 'High migration + above-average yield', n: '10 districts', color: '#16a34a' },
                { label: 'Structurally Poor', desc: 'Low migration + below-average yield', n: '32 districts', color: '#ea580c' },
                { label: 'Stable', desc: 'Low migration + above-average yield', n: '16 districts', color: '#2563eb' },
              ].map((q, i) => (
                <div key={i} className="rounded p-4"
                  style={{ backgroundColor: '#f7f6f2', borderLeft: `3px solid ${q.color}` }}>
                  <p className="font-serif font-bold text-sm" style={{ color: '#0e0e0c' }}>{q.label}</p>
                  <p className="text-xs mt-1" style={{ color: '#6a6860' }}>{q.desc}</p>
                  <p className="text-xs mt-2 font-medium" style={{ color: q.color }}>{q.n}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Regression */}
          <div className="rounded-lg p-6 mb-6"
            style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)' }}>
            <h3 className="font-serif font-bold text-base mb-3"
              style={{ color: '#9e7c44', fontFamily: 'Libre Baskerville, serif' }}>
              Regression Model
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#6a6860' }}>
              Preferred OLS specification (poverty rate excluded — VIF=894):
            </p>
            <div className="rounded p-4 mb-4"
              style={{ backgroundColor: '#f7f6f2', fontFamily: 'DM Mono, monospace', fontSize: '13px', color: '#0e0e0c' }}>
              Yield_i = β₀ + β₁(RDI_i) + β₂(RVI_i) + β₃(Literacy_i) + ε_i
            </div>
            <div className="space-y-2">
              {[
                { label: 'RDI Score', result: 'β=0.019, p=0.004 ***', note: 'Positive — ecological confounding (Terai districts have both high migration and high yields)', color: '#16a34a' },
                { label: 'RVI Score', result: 'β=−0.025, p=0.010 ***', note: 'Negative in OLS — attenuates under spatial correction (see below)', color: '#dc2626' },
                { label: 'Literacy Rate', result: 'β=−0.040, p=0.162', note: 'Not independently significant — collinear with RVI', color: '#9b9890' },
                { label: 'R² = 0.194', result: 'F=5.83, p<0.001', note: 'N=75 districts. Province FE raises R² to 0.652.', color: '#9e7c44' },
              ].map((r, i) => (
                <div key={i} className="flex gap-3 items-start p-3 rounded"
                  style={{ backgroundColor: '#f7f6f2' }}>
                  <div className="shrink-0 mt-0.5">
                    <span className="text-xs font-medium px-2 py-0.5 rounded"
                      style={{ backgroundColor: r.color + '15', color: r.color,
                        fontFamily: 'DM Mono, monospace' }}>
                      {r.label}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-0.5"
                      style={{ color: '#0e0e0c', fontFamily: 'DM Mono, monospace' }}>
                      {r.result}
                    </p>
                    <p className="text-xs" style={{ color: '#6a6860' }}>{r.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spatial Models */}
          <div className="rounded-lg p-6 mb-6"
            style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)' }}>
            <h3 className="font-serif font-bold text-base mb-3"
              style={{ color: '#9e7c44', fontFamily: 'Libre Baskerville, serif' }}>
              Spatial Econometric Models
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#6a6860' }}>
              Moran&rsquo;s I on OLS residuals = 0.511 (p=0.001), confirming significant spatial
              autocorrelation. Maximum likelihood spatial lag (SLM) and spatial error (SEM)
              models estimated on the complete 75-district sample using Queen contiguity weights.
            </p>
            <div className="space-y-3 mb-4">
              {[
                { label: 'Spatial lag ρ = 0.823***', note: 'Dominant finding: neighboring districts\' yields strongly predict own yield — geography (terrain, irrigation, climate) explains most yield variation', color: '#0e0e0c' },
                { label: 'RDI: robust across all models', note: 'Remains significant in SLM (p=0.010) and SEM (p=0.010) — migration intensity has an independent association with yield beyond geographic clustering', color: '#16a34a' },
                { label: 'RVI: attenuates under spatial correction', note: 'Becomes insignificant in SLM (p=0.177) and SEM (p=0.904) — the vulnerability-yield association is largely geographic in origin', color: '#dc2626' },
              ].map((r, i) => (
                <div key={i} className="flex gap-3 items-start p-3 rounded"
                  style={{ backgroundColor: '#f7f6f2' }}>
                  <span className="text-xs mt-0.5" style={{ color: r.color }}>→</span>
                  <div>
                    <p className="text-xs font-medium mb-0.5"
                      style={{ color: '#0e0e0c', fontFamily: 'DM Mono, monospace' }}>
                      {r.label}
                    </p>
                    <p className="text-xs" style={{ color: '#6a6860' }}>{r.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'OLS AIC', value: '173.4' },
                { label: 'SLM AIC', value: '123.2' },
                { label: 'SEM AIC', value: '122.1 ✦' },
              ].map((s, i) => (
                <div key={i} className="rounded p-3 text-center"
                  style={{ backgroundColor: '#f7f6f2' }}>
                  <p className="font-serif font-bold text-base" style={{ color: '#0e0e0c' }}>{s.value}</p>
                  <p className="text-xs mt-1" style={{ color: '#9b9890' }}>{s.label}</p>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3" style={{ color: '#9b9890', fontFamily: 'DM Mono, monospace' }}>
              ✦ SEM preferred by AIC. Pseudo R² not comparable across OLS and spatial models — use AIC.
            </p>
          </div>
        </section>

        {/* Robustness */}
        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl mb-5"
            style={{ color: '#0e0e0c', fontFamily: 'Libre Baskerville, serif' }}>
            Robustness Checks
          </h2>
          <div className="rounded-lg p-6"
            style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)' }}>
            <div className="space-y-3">
              {[
                { check: 'VIF analysis', result: 'Poverty rate excluded (VIF=894). RDI, RVI, literacy have acceptable VIFs (1.04, 4.85, 4.83)', pass: true },
                { check: 'RVI weighting schemes', result: 'Spearman correlation >0.989 between PCA and equal-weight versions — index rankings are stable', pass: true },
                { check: 'RDI weighting schemes', result: 'Spearman correlation 0.753 between theory and equal weights; theory weights produce stronger yield association', pass: true },
                { check: 'Spatial autocorrelation', result: "Moran's I on residuals: 0.511 (p=0.001). Addressed via SLM and SEM. RDI robust; RVI attenuates.", pass: true },
                { check: 'Border district exclusion (N=71)', result: 'Removing Kanchanpur, Kailali, Jhapa, Mahottari does not change any district classifications or qualitative conclusions', pass: true },
                { check: 'Threshold sensitivity (4 scenarios)', result: 'Paradox Zone ranges from 6–20 districts. Baseline 11-district classification is stable at moderate thresholds', pass: true },
                { check: 'Province fixed effects', result: 'R² increases from 0.194 to 0.652; RDI and RVI direction maintained across specifications', pass: true },
              ].map((r, i) => (
                <div key={i} className="flex gap-3 items-start p-3 rounded"
                  style={{ backgroundColor: '#f7f6f2' }}>
                  <span className="shrink-0 mt-0.5" style={{ color: '#16a34a' }}>✓</span>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#0e0e0c' }}>{r.check}</p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#6a6860' }}>{r.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Threshold Sensitivity Table */}
        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl mb-5"
            style={{ color: '#0e0e0c', fontFamily: 'Libre Baskerville, serif' }}>
            Threshold Sensitivity Analysis
          </h2>
          <div className="rounded-lg p-6 mb-6"
            style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)' }}>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#6a6860' }}>
              The four-quadrant taxonomy depends on two classification thresholds.
              The baseline scenario (✦) is the primary analysis used throughout this study.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '0.8px solid rgba(14,14,12,0.12)' }}>
                    <th className="text-left py-2 pr-4 text-xs"
                      style={{ color: '#9b9890', fontFamily: 'DM Mono, monospace' }}>Migration</th>
                    <th className="text-left py-2 pr-4 text-xs"
                      style={{ color: '#9b9890', fontFamily: 'DM Mono, monospace' }}>Yield Threshold</th>
                    <th className="text-center py-2 pr-4 text-xs" style={{ color: '#dc2626' }}>Paradox</th>
                    <th className="text-center py-2 pr-4 text-xs" style={{ color: '#16a34a' }}>Resilient</th>
                    <th className="text-center py-2 pr-4 text-xs" style={{ color: '#ea580c' }}>Struct. Poor</th>
                    <th className="text-center py-2 text-xs" style={{ color: '#2563eb' }}>Stable</th>
                  </tr>
                </thead>
                <tbody style={{ borderTop: 'none' }}>
                  {[
                    { mig: '>20%', yield: 'Median (2.86)', p: 20, r: 22, sp: 18, st: 15, base: false },
                    { mig: '>25% ✦', yield: 'Mean (2.90) ✦', p: 11, r: 16, sp: 28, st: 20, base: true },
                    { mig: '>30%', yield: 'Mean (2.90)', p: 6, r: 10, sp: 33, st: 26, base: false },
                    { mig: '>25%', yield: '75th pct (3.48)', p: 20, r: 7, sp: 36, st: 12, base: false },
                  ].map((row, i) => (
                    <tr key={i}
                      style={{ backgroundColor: row.base ? 'rgba(158,124,68,0.06)' : 'transparent',
                        borderBottom: '0.8px solid rgba(14,14,12,0.06)' }}>
                      <td className="py-3 pr-4">
                        <span className="text-xs"
                          style={{ color: row.base ? '#9e7c44' : '#6a6860',
                            fontWeight: row.base ? 600 : 400,
                            fontFamily: 'DM Mono, monospace' }}>
                          {row.mig}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-xs"
                          style={{ color: row.base ? '#9e7c44' : '#6a6860',
                            fontWeight: row.base ? 600 : 400,
                            fontFamily: 'DM Mono, monospace' }}>
                          {row.yield}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-center text-xs font-semibold" style={{ color: '#dc2626' }}>{row.p}</td>
                      <td className="py-3 pr-4 text-center text-xs font-semibold" style={{ color: '#16a34a' }}>{row.r}</td>
                      <td className="py-3 pr-4 text-center text-xs font-semibold" style={{ color: '#ea580c' }}>{row.sp}</td>
                      <td className="py-3 text-center text-xs font-semibold" style={{ color: '#2563eb' }}>{row.st}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-4"
              style={{ color: '#9b9890', fontFamily: 'DM Mono, monospace' }}>
              ✦ Baseline scenario used in primary analysis throughout this study.
            </p>
          </div>

          {/* Borderline Districts */}
          <div className="rounded-lg p-6"
            style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)' }}>
            <h3 className="font-serif font-bold text-base mb-3"
              style={{ color: '#9e7c44', fontFamily: 'Libre Baskerville, serif' }}>
              Borderline Districts
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#6a6860' }}>
              Six districts fall within ±3 percentage points of the 25% migration threshold
              with below-average yields. These are sensitive to threshold choice and may
              warrant hybrid policy approaches:
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
                <div key={i} className="rounded p-3"
                  style={{ backgroundColor: '#f7f6f2', border: '0.8px solid rgba(158,124,68,0.2)' }}>
                  <p className="text-sm font-medium" style={{ color: '#0e0e0c' }}>{d.name}</p>
                  <p className="text-xs" style={{ color: '#9b9890' }}>{d.province}</p>
                  <p className="text-xs mt-1" style={{ color: '#6a6860' }}>
                    Migration: {d.migration} · Yield: {d.yield}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Limitations */}
        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl mb-5"
            style={{ color: '#0e0e0c', fontFamily: 'Libre Baskerville, serif' }}>
            Limitations
          </h2>
          <div className="rounded-lg p-6"
            style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)' }}>
            <div className="space-y-4">
              {[
                {
                  title: 'Cross-sectional design — no causal identification',
                  text: 'Supports association claims only. Causal identification requires panel data with within-district variation over time — at minimum, three years of MoALD district yield data.',
                },
                {
                  title: 'Geography is the dominant constraint (ρ=0.823)',
                  text: 'Spatial models reveal that geographic proximity explains most yield variation. District-level migration policy operates within a powerful terrain and infrastructure constraint that policy cannot easily shift in the short term.',
                },
                {
                  title: 'RVI attenuates under spatial correction',
                  text: 'RVI becomes statistically insignificant in spatial models (SLM: p=0.177; SEM: p=0.904), indicating the structural vulnerability-yield association is largely geographic in origin rather than an independent mechanism.',
                },
                {
                  title: 'India migration undercounting',
                  text: 'Open border means migration intensity is underestimated in border districts. Border district exclusion confirms this does not change district classifications.',
                },
                {
                  title: 'Provincial MPI proxy',
                  text: 'District-level MPI unavailable for Nepal. All districts within a province share identical poverty scores, introducing artificial spatial clustering in RVI.',
                },
                {
                  title: 'Omitted variables (R²=0.194 in base OLS)',
                  text: 'Soil quality, crop mix, elevation, and irrigation coverage are not captured in CBS or MoALD data at the district level. The 80% unexplained variance reflects these omitted geographic and agronomic factors.',
                },
              ].map((l, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="shrink-0 mt-0.5" style={{ color: '#ea580c' }}>⚠</span>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#0e0e0c' }}>{l.title}</p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#6a6860' }}>{l.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* References */}
        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl mb-5"
            style={{ color: '#0e0e0c', fontFamily: 'Libre Baskerville, serif' }}>
            References
          </h2>
          <div className="rounded-lg p-6"
            style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)' }}>
            <div className="space-y-3">
              {[
                'Abson, D.J., Dougill, A.J., and Stringer, L.C. (2012). Using Principal Component Analysis for information-rich socio-ecological vulnerability mapping in Southern Africa. Applied Geography, 35(1-2), 515–524.',
                'CBS Nepal (2021). National Population and Housing Census 2021. Central Bureau of Statistics, Government of Nepal.',
                'MacCallum, R.C., Widaman, K.F., Zhang, S., and Hong, S. (1999). Sample size in factor analysis. Psychological Methods, 4(1), 84–99.',
                'MoALD (2023). Statistical Information on Nepalese Agriculture 2079/80 (2022/23). Ministry of Agriculture and Livestock Development, Government of Nepal.',
                'OPHI/DHS (2022). Nepal Multidimensional Poverty Index. Oxford Poverty and Human Development Initiative via Humanitarian Data Exchange.',
                'Shrestha, N. (2022). Do remittances reshape household expenditures? Evidence from Nepal. World Development, 157, 105933.',
                'World Bank (2023). Migration and Remittances Data. World Bank Open Data.',
              ].map((ref, i) => (
                <p key={i} className="text-xs leading-relaxed"
                  style={{ color: '#9b9890', borderBottom: i < 6 ? '0.8px solid rgba(14,14,12,0.06)' : 'none', paddingBottom: i < 6 ? '12px' : '0' }}>
                  {ref}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4">
          <Link href="/" className="text-sm transition-colors"
            style={{ color: '#9b9890' }}
            onMouseEnter={e => e.currentTarget.style.color = '#9e7c44'}
            onMouseLeave={e => e.currentTarget.style.color = '#9b9890'}>
            ← Overview
          </Link>
          <Link href="/policy" className="text-sm underline"
            style={{ color: '#9e7c44' }}>
            Policy Implications →
          </Link>
        </div>

      </div>
    </div>
  )
}

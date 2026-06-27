'use client'

import Link from 'next/link'

export default function PolicyPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-14">
          <p className="text-[#e8c547] text-sm font-medium tracking-widest uppercase mb-3">
            Research Implications
          </p>
          <h1 className="text-5xl font-bold text-white mb-4">Policy Brief</h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            District-differentiated policy recommendations derived from cross-sectional 
            analysis of Nepal&apos;s 75 districts. One-size-fits-all remittance policy 
            fails because the paradox is not uniform.
          </p>
        </div>

        {/* Core Finding Box */}
        <section className="mb-12">
          <div className="rounded-xl p-7" style={{ backgroundColor: 'var(--bg-card)', borderLeft: '4px solid #e8c547' }}>
            <h2 className="text-[#e8c547] text-xs font-semibold tracking-widest uppercase mb-3">Core Finding</h2>
            <p className="text-white text-lg leading-relaxed mb-4">
              Structural vulnerability — not migration intensity alone — determines whether 
              remittance-sending districts stagnate agriculturally. Districts with high RVI 
              scores average <span className="text-[#ef4444] font-semibold">2.1 MT/Ha</span> cereal 
              yield against a national average of <span className="text-[#e8c547] font-semibold">3.26 MT/Ha</span>, 
              while ecologically advantaged high-migration districts maintain yields above average.
            </p>
            <p className="text-slate-400 text-sm">
              This divergence implies that agricultural policy targeting remittance districts must 
              be differentiated by structural context — not applied uniformly across Nepal&apos;s 
              geographically and ecologically diverse districts.
            </p>
          </div>
        </section>

        {/* Three Policy Tracks */}
        <section className="mb-12">
          <h2 className="text-white text-2xl font-semibold mb-2">Three Policy Tracks</h2>
          <p className="text-slate-400 text-sm mb-6">Recommendations differentiated by district classification</p>

          <div className="space-y-6">

            {/* Track 1 — Paradox Zone */}
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-card)' }}>
              <div className="px-6 py-4 flex items-center gap-3" style={{ backgroundColor: '#ef444415', borderBottom: '1px solid #ef444430' }}>
                <span className="w-3 h-3 rounded-full bg-red-500 shrink-0"></span>
                <div>
                  <h3 className="text-white font-semibold">Track 1 — Paradox Zone Districts</h3>
                  <p className="text-slate-400 text-xs">17 districts: High migration + below-average yield</p>
                </div>
                <span className="ml-auto text-red-400 text-xs font-medium">Examples: Achham, Bajura, Bajhang, Doti, Jajarkot</span>
              </div>
              <div className="px-6 py-5 space-y-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  These districts face the full paradox: labour outmigration reduces farm workforce 
                  while remittance income flows primarily into consumption rather than agricultural 
                  investment. The structural vulnerability (high RVI) compounds the migration effect.
                </p>
                <div className="space-y-3">
                  {[
                    {
                      rec: 'Agricultural mechanization subsidies',
                      rationale: 'Labour shortages from outmigration require machinery substitution. Tractor and irrigation equipment subsidies offset workforce reductions without requiring return migration.'
                    },
                    {
                      rec: 'Remittance-linked agricultural bonds',
                      rationale: 'Channel a percentage of formal remittance inflows into district agricultural investment funds. Requires NRB coordination with commercial banks.'
                    },
                    {
                      rec: 'Cooperative strengthening',
                      rationale: 'Consolidate fragmented smallholder plots under cooperative management. Reduces per-hectare labour requirements and enables bulk input purchasing.'
                    },
                    {
                      rec: 'Returning migrant reintegration programs',
                      rationale: 'Gulf-return migrants carry savings and sometimes skills. Structured agri-entrepreneurship programs can redirect capital toward farm investment.'
                    },
                  ].map((r, i) => (
                    <div key={i} className="rounded-lg p-4 bg-slate-800/40">
                      <p className="text-white text-sm font-medium mb-1">→ {r.rec}</p>
                      <p className="text-slate-400 text-xs leading-relaxed">{r.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Track 2 — Resilient */}
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-card)' }}>
              <div className="px-6 py-4 flex items-center gap-3" style={{ backgroundColor: '#22c55e15', borderBottom: '1px solid #22c55e30' }}>
                <span className="w-3 h-3 rounded-full bg-green-500 shrink-0"></span>
                <div>
                  <h3 className="text-white font-semibold">Track 2 — Resilient Districts</h3>
                  <p className="text-slate-400 text-xs">10 districts: High migration + above-average yield</p>
                </div>
                <span className="ml-auto text-green-400 text-xs font-medium">Examples: Kailali, Jhapa, Morang, Rupandehi, Chitwan</span>
              </div>
              <div className="px-6 py-5 space-y-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  These districts — predominantly Terai plains — maintain high agricultural 
                  productivity despite heavy migration, likely due to irrigation infrastructure, 
                  flat terrain enabling mechanization, and stronger market linkages. 
                  They represent the model to replicate and study.
                </p>
                <div className="space-y-3">
                  {[
                    {
                      rec: 'Document and replicate success factors',
                      rationale: 'Commission district-level case studies identifying which institutional structures (cooperatives, irrigation schemes, extension services) enable resilience. Scale to paradox zone districts.'
                    },
                    {
                      rec: 'Agricultural value chain development',
                      rationale: 'Resilient districts already produce surplus. Investment in cold storage, processing, and market access converts yield advantage into sustained income without requiring more labour.'
                    },
                    {
                      rec: 'Model district designation',
                      rationale: 'Designate resilient high-migration districts as learning hubs for extension workers from paradox zone districts. Peer learning is more effective than top-down policy transfer.'
                    },
                  ].map((r, i) => (
                    <div key={i} className="rounded-lg p-4 bg-slate-800/40">
                      <p className="text-white text-sm font-medium mb-1">→ {r.rec}</p>
                      <p className="text-slate-400 text-xs leading-relaxed">{r.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Track 3 — Structurally Poor */}
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-card)' }}>
              <div className="px-6 py-4 flex items-center gap-3" style={{ backgroundColor: '#f9731615', borderBottom: '1px solid #f9731630' }}>
                <span className="w-3 h-3 rounded-full bg-orange-500 shrink-0"></span>
                <div>
                  <h3 className="text-white font-semibold">Track 3 — Structurally Poor Districts</h3>
                  <p className="text-slate-400 text-xs">32 districts: Low migration + below-average yield</p>
                </div>
                <span className="ml-auto text-orange-400 text-xs font-medium">Examples: Humla, Dolpa, Mugu, Rasuwa, Manang</span>
              </div>
              <div className="px-6 py-5 space-y-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  The largest category. These districts face agricultural underperformance 
                  driven by structural poverty and geographic isolation — not remittance dynamics. 
                  Applying remittance-focused policy here misdiagnoses the problem. 
                  Direct agricultural investment is needed.
                </p>
                <div className="space-y-3">
                  {[
                    {
                      rec: 'Infrastructure-first approach',
                      rationale: 'Road connectivity and irrigation access are prerequisites for any agricultural improvement in remote hill and mountain districts. Yield improvements require physical access to markets and inputs.'
                    },
                    {
                      rec: 'Direct agricultural input subsidies',
                      rationale: 'Seeds, fertilizer, and pest management subsidies targeted at subsistence farmers in low-productivity districts. Not contingent on remittance inflows which are low in these areas.'
                    },
                    {
                      rec: 'Climate-adaptive crop programs',
                      rationale: 'High-altitude districts face distinct agronomic constraints. Research into cold-tolerant varieties and altitude-appropriate cropping systems is more relevant than remittance policy.'
                    },
                  ].map((r, i) => (
                    <div key={i} className="rounded-lg p-4 bg-slate-800/40">
                      <p className="text-white text-sm font-medium mb-1">→ {r.rec}</p>
                      <p className="text-slate-400 text-xs leading-relaxed">{r.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* What This Study Cannot Conclude */}
        <section className="mb-12">
          <h2 className="text-white text-2xl font-semibold mb-6">What This Study Cannot Conclude</h2>
          <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--bg-card)' }}>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              The cross-sectional design of this study establishes correlation, not causation. 
              The following causal claims are not supported by the current data and should 
              not be inferred from the findings:
            </p>
            <div className="space-y-2">
              {[
                'That remittances directly cause agricultural decline — ecological and terrain factors partially explain the pattern',
                'That reducing migration would improve agricultural yields — labour drain is one of several mechanisms',
                'That the paradox is worsening over time — single-year cross-sectional data cannot establish trend direction',
                'That policy interventions in paradox zone districts will produce resilient-district outcomes — structural conditions differ',
              ].map((c, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-lg bg-slate-800/30">
                  <span className="text-red-400 text-sm shrink-0">✕</span>
                  <p className="text-slate-400 text-xs leading-relaxed">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Future Research */}
        <section className="mb-12">
          <h2 className="text-white text-2xl font-semibold mb-6">Future Research Directions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Panel data extension', desc: 'Acquiring MoALD data across 5–10 years would enable fixed-effects panel regression and support causal claims about the migration-yield relationship over time.' },
              { title: 'Household-level survey', desc: 'District aggregates mask household variation. A targeted survey of 200–300 households across paradox vs resilient districts would identify remittance usage patterns.' },
              { title: 'Spatial lag models', desc: 'Moran\'s I confirms strong spatial clustering. Future work should apply spatial lag or spatial error models using pysal to account for geographic spillovers between districts.' },
              { title: 'Crop disaggregation', desc: 'Aggregate cereal yield combines paddy, maize, and wheat with different migration sensitivities. Disaggregated crop analysis may reveal stronger migration effects in specific staples.' },
            ].map((f, i) => (
              <div key={i} className="rounded-xl p-5" style={{ backgroundColor: 'var(--bg-card)' }}>
                <p className="text-[#e8c547] font-semibold text-sm mb-2">{f.title}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4">
          <Link href="/methodology" className="text-slate-400 hover:text-[#e8c547] text-sm transition-colors">
            ← Methodology
          </Link>
          <Link href="/compare" className="text-[#e8c547] hover:underline text-sm">
            Compare Districts →
          </Link>
        </div>

      </div>
    </div>
  )
}

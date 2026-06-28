'use client'

import Link from 'next/link'

export default function PolicyPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-3xl mx-auto px-10 py-16">

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: 'DM Mono, monospace', color: '#9b9890' }}>
            Research Implications
          </p>
          <h1 className="font-serif font-bold text-4xl mb-4" style={{ color: '#0e0e0c' }}>Policy Brief</h1>
          <p className="text-sm leading-relaxed" style={{ color: '#6a6860' }}>
            District-differentiated policy recommendations derived from cross-sectional 
            analysis of Nepal&apos;s 75 districts. One-size-fits-all remittance policy 
            fails because the paradox is not uniform.
          </p>
        </div>

        {/* Core Finding Box */}
        <section className="mb-12">
          <div className="rounded-lg p-7" style={{ backgroundColor: '#0e0e0c', borderRadius: '8px', borderLeft: '4px solid #9e7c44' }}>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: 'DM Mono, monospace', color: 'rgba(247,246,242,0.5)' }}>Core Finding</p>
            <p className="font-serif text-base leading-relaxed mb-4" style={{ color: '#f7f6f2' }}>
              Structural vulnerability — not migration intensity alone — determines whether 
              remittance-sending districts stagnate agriculturally. Districts with high RVI 
              scores average <span className="font-bold" style={{ color: '#dc2626' }}>2.1 MT/Ha</span> cereal 
              yield against a national average of <span className="font-bold" style={{ color: '#9e7c44' }}>2.90 MT/Ha</span>, 
              while ecologically advantaged high-migration districts maintain yields above average.
            </p>
            <p className="text-sm" style={{ color: 'rgba(247,246,242,0.6)' }}>
              This divergence implies that agricultural policy targeting remittance districts must 
              be differentiated by structural context — not applied uniformly across Nepal&apos;s 
              geographically and ecologically diverse districts.
            </p>
          </div>
        </section>

        {/* Three Policy Tracks */}
        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl mb-2" style={{ color: '#0e0e0c' }}>Three Policy Tracks</h2>
          <p className="text-sm mb-6" style={{ color: '#6a6860' }}>Recommendations differentiated by district classification</p>

          <div className="space-y-6">

            {/* Track 1 — Paradox Zone */}
            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '6px' }}>
              <div className="p-6 flex gap-5 items-start">
                <span className="font-mono text-3xl font-bold shrink-0" style={{ color: '#9e7c44', opacity: 0.15 }}>01</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-serif font-bold text-lg" style={{ color: '#0e0e0c' }}>Track 1 — Paradox Zone Districts</h3>
                    <span className="text-xs" style={{ color: '#9e7c44', fontFamily: 'DM Mono, monospace' }}>17 districts</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#6a6860' }}>
                    These districts face the full paradox: labour outmigration reduces farm workforce 
                    while remittance income flows primarily into consumption rather than agricultural 
                    investment. The structural vulnerability (high RVI) compounds the migration effect.
                  </p>
                </div>
              </div>
              <div style={{ borderTop: '0.8px solid rgba(14,14,12,0.09)', margin: '0 24px' }}></div>
              <div className="px-6 py-5">
                <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: 'DM Mono, monospace', color: '#0e0e0c' }}>RECOMMENDED ACTIONS</p>
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
                    <div key={i} className="flex gap-2">
                      <span style={{ color: '#9e7c44' }}>→</span>
                      <div>
                        <p className="text-sm" style={{ color: '#6a6860' }}><span className="font-medium" style={{ color: '#0e0e0c' }}>{r.rec}</span>: {r.rationale}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Track 2 — Resilient */}
            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '6px' }}>
              <div className="p-6 flex gap-5 items-start">
                <span className="font-mono text-3xl font-bold shrink-0" style={{ color: '#9e7c44', opacity: 0.15 }}>02</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-serif font-bold text-lg" style={{ color: '#0e0e0c' }}>Track 2 — Resilient Districts</h3>
                    <span className="text-xs" style={{ color: '#9e7c44', fontFamily: 'DM Mono, monospace' }}>16 districts</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#6a6860' }}>
                    These districts — predominantly Terai plains — maintain high agricultural 
                    productivity despite heavy migration, likely due to irrigation infrastructure, 
                    flat terrain enabling mechanization, and stronger market linkages. 
                    They represent the model to replicate and study.
                  </p>
                </div>
              </div>
              <div style={{ borderTop: '0.8px solid rgba(14,14,12,0.09)', margin: '0 24px' }}></div>
              <div className="px-6 py-5">
                <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: 'DM Mono, monospace', color: '#0e0e0c' }}>RECOMMENDED ACTIONS</p>
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
                    <div key={i} className="flex gap-2">
                      <span style={{ color: '#9e7c44' }}>→</span>
                      <div>
                        <p className="text-sm" style={{ color: '#6a6860' }}><span className="font-medium" style={{ color: '#0e0e0c' }}>{r.rec}</span>: {r.rationale}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Track 3 — Structurally Poor */}
            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '6px' }}>
              <div className="p-6 flex gap-5 items-start">
                <span className="font-mono text-3xl font-bold shrink-0" style={{ color: '#9e7c44', opacity: 0.15 }}>03</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-serif font-bold text-lg" style={{ color: '#0e0e0c' }}>Track 3 — Structurally Poor Districts</h3>
                    <span className="text-xs" style={{ color: '#9e7c44', fontFamily: 'DM Mono, monospace' }}>32 districts</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#6a6860' }}>
                    The largest category. These districts face agricultural underperformance 
                    driven by structural poverty and geographic isolation — not remittance dynamics. 
                    Applying remittance-focused policy here misdiagnoses the problem. 
                    Direct agricultural investment is needed.
                  </p>
                </div>
              </div>
              <div style={{ borderTop: '0.8px solid rgba(14,14,12,0.09)', margin: '0 24px' }}></div>
              <div className="px-6 py-5">
                <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: 'DM Mono, monospace', color: '#0e0e0c' }}>RECOMMENDED ACTIONS</p>
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
                    <div key={i} className="flex gap-2">
                      <span style={{ color: '#9e7c44' }}>→</span>
                      <div>
                        <p className="text-sm" style={{ color: '#6a6860' }}><span className="font-medium" style={{ color: '#0e0e0c' }}>{r.rec}</span>: {r.rationale}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* What This Study Cannot Conclude */}
        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl mb-6" style={{ color: '#0e0e0c' }}>What This Study Cannot Conclude</h2>
          <div className="rounded-lg p-6" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '6px' }}>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#6a6860' }}>
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
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-sm shrink-0" style={{ color: '#dc2626' }}>✕</span>
                  <p className="text-xs leading-relaxed" style={{ color: '#6a6860' }}>{c}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Future Research */}
        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl mb-6" style={{ color: '#0e0e0c' }}>Future Research Directions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Panel data extension', desc: 'Acquiring MoALD data across 5–10 years would enable fixed-effects panel regression and support causal claims about the migration-yield relationship over time.' },
              { title: 'Household-level survey', desc: 'District aggregates mask household variation. A targeted survey of 200–300 households across paradox vs resilient districts would identify remittance usage patterns.' },
              { title: 'Spatial lag models', desc: 'Moran\'s I confirms strong spatial clustering. Future work should apply spatial lag or spatial error models using pysal to account for geographic spillovers between districts.' },
              { title: 'Crop disaggregation', desc: 'Aggregate cereal yield combines paddy, maize, and wheat with different migration sensitivities. Disaggregated crop analysis may reveal stronger migration effects in specific staples.' },
            ].map((f, i) => (
              <div key={i} className="rounded-lg p-5" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '6px' }}>
                <p className="font-serif font-bold text-sm mb-2" style={{ color: '#9e7c44' }}>{f.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: '#6a6860' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4">
          <Link href="/methodology" className="text-sm" style={{ color: '#9b9890' }}>
            ← Methodology
          </Link>
          <Link href="/compare" className="text-sm" style={{ color: '#9e7c44' }}>
            Compare Districts →
          </Link>
        </div>

      </div>
    </div>
  )
}

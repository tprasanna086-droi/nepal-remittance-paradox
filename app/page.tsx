'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

const NepalMap = dynamic(() => import('@/components/NepalMap'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-lg flex items-center justify-center"
      style={{ height: '500px', backgroundColor: '#f0ede6', border: '0.8px solid rgba(14,14,12,0.09)' }}
    >
      <div className="text-center">
        <p className="text-sm font-medium" style={{ color: '#9e7c44', fontFamily: 'DM Mono, monospace' }}>
          Loading map...
        </p>
      </div>
    </div>
  )
})

export default function HomePage() {
  return (
    <main style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-10 pt-16 pb-12">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          {/* Left: text */}
          <div className="flex-1 min-w-0">
            <p
              className="text-xs tracking-widest uppercase mb-4"
              style={{ fontFamily: 'DM Mono, monospace', color: '#9b9890' }}
            >
              Independent Research · Prasanna Thapa · 2026
            </p>
            <h1
              className="font-serif font-bold leading-tight mb-4"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: '#0e0e0c' }}
            >
              Nepal&apos;s<br />
              <span style={{ color: '#9e7c44' }}>Remittance</span><br />
              Paradox
            </h1>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#6a6860', maxWidth: '480px' }}>
              Why migration-intensive districts fail to convert remittance wealth into agricultural productivity gains — a cross-sectional study of all 75 districts.
            </p>

            {/* Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['75 Districts Analyzed', 'MoALD 2022/23', 'CBS Census 2021', 'Cross-Sectional OLS'].map(pill => (
                <span
                  key={pill}
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    backgroundColor: 'var(--accent-light)',
                    color: '#9e7c44',
                    border: '0.8px solid var(--accent-border)'
                  }}
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* Findings strip */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { n: '11', label: 'Paradox Zone Districts', sub: 'High migration + below-avg yield', color: '#dc2626' },
                { n: '16', label: 'Resilient Districts', sub: 'High migration + above-avg yield', color: '#16a34a' },
                { n: '2.90', label: 'MT/Ha National Average', sub: 'Mean cereal yield 2022/23', color: '#9e7c44' },
                { n: '0.27', label: 'RDI–Yield Correlation', sub: 'Significant at p=0.017', color: '#2563eb' },
              ].map((f, i) => (
                <div
                  key={i}
                  className="rounded-lg p-4"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '0.8px solid var(--border)',
                    borderTop: `3px solid ${f.color}`
                  }}
                >
                  <p className="font-serif font-bold text-2xl mb-1" style={{ color: f.color }}>{f.n}</p>
                  <p className="text-sm font-medium" style={{ color: '#0e0e0c' }}>{f.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#9b9890' }}>{f.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: map */}
          <div className="flex-1 min-w-0 w-full">
            <p
              className="text-xs mb-2"
              style={{ fontFamily: 'DM Mono, monospace', color: '#9b9890' }}
            >
              Click any district to explore ↓
            </p>
            <NepalMap />
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-6xl mx-auto px-10">
        <div style={{ height: '0.8px', backgroundColor: 'var(--border)' }} />
      </div>

      {/* CORE FINDING */}
      <section className="max-w-6xl mx-auto px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Text */}
          <div>
            <p
              className="text-xs tracking-widest uppercase mb-3"
              style={{ fontFamily: 'DM Mono, monospace', color: '#9b9890' }}
            >
              The Core Finding
            </p>
            <h2
              className="font-serif font-bold text-3xl leading-snug mb-5"
              style={{ color: '#0e0e0c' }}
            >
              Not all migration hurts farms — but structural vulnerability always does.
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#6a6860' }}>
              Districts with high RVI (structural vulnerability) scores average 2.1 MT/Ha — 28% below the national mean — regardless of migration intensity. Ecologically advantaged districts maintain yields despite heavy migration.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#6a6860' }}>
              This study cross-references the Nepal Remittance Atlas (RDI + RVI indices) with MoALD 2022/23 agricultural data to isolate structural mechanisms driving the paradox.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#9b9890' }}>
              Terrain and irrigation infrastructure mediate the relationship — Terai districts maintain productivity despite heavy migration while Sudurpashchim hill districts face the full paradox.
            </p>
          </div>

          {/* Mini stats */}
          <div className="space-y-3">
            {[
              { val: '1.17 MT/Ha', sub: 'Lowest cereal yield — Humla district' },
              { val: '5.08 MT/Ha', sub: 'Highest cereal yield — Bhaktapur district' },
              { val: '42%', sub: 'Maximum household migration rate' },
              { val: '6 districts', sub: 'Borderline paradox zone (±3pp threshold sensitivity)' },
            ].map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-6 rounded-lg p-5"
                style={{ backgroundColor: 'var(--bg-card)', border: '0.8px solid var(--border)' }}
              >
                <p className="font-serif font-bold text-2xl shrink-0" style={{ color: '#0e0e0c', minWidth: '120px' }}>{s.val}</p>
                <p className="text-sm" style={{ color: '#6a6860' }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-6xl mx-auto px-10">
        <div style={{ height: '0.8px', backgroundColor: 'var(--border)' }} />
      </div>

      {/* EXPLORE */}
      <section className="max-w-6xl mx-auto px-10 py-16">
        <p
          className="text-xs tracking-widest uppercase mb-6"
          style={{ fontFamily: 'DM Mono, monospace', color: '#9b9890' }}
        >
          Explore the Research
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { href: '/districts', title: 'District Explorer', sub: 'Browse all 75 Nepal districts with migration and yield data', arrow: true },
            { href: '/compare', title: 'Compare Districts', sub: 'Side-by-side analysis of paradox vs resilient districts', arrow: true },
            { href: '/methodology', title: 'Methodology', sub: 'Data sources, index construction, and regression approach', arrow: true },
          ].map((card, i) => (
            <Link
              key={i}
              href={card.href}
              className="rounded-lg p-6 group transition-all"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '0.8px solid var(--border)',
              }}
            >
              <h3
                className="font-serif font-bold text-lg mb-2 group-hover:text-[#9e7c44] transition-colors"
                style={{ color: '#0e0e0c' }}
              >
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#6a6860' }}>{card.sub}</p>
              <p className="text-sm font-medium" style={{ color: '#9e7c44' }}>Explore →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="mt-8"
        style={{ borderTop: '0.8px solid var(--border)', backgroundColor: 'var(--bg-secondary)' }}
      >
        <div className="max-w-6xl mx-auto px-10 py-6 flex items-center justify-between flex-wrap gap-4">
          <p className="text-xs" style={{ fontFamily: 'DM Mono, monospace', color: '#9b9890' }}>
            Data: MoALD 2022/23 · CBS Nepal 2021 · Nepal Remittance Atlas
          </p>
          <p className="text-xs" style={{ fontFamily: 'DM Mono, monospace', color: '#9b9890' }}>
            Prasanna Thapa · Independent Research · 2026
          </p>
        </div>
      </footer>

    </main>
  )
}

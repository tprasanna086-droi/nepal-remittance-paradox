'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import districtsData from '@/data/districts.json'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts'

type District = {
  id: string
  name: string
  province: string
  slug: string
  absent_hh_rate: number
  absent_pop_rate: number
  rdi_score: number
  rdi_tier: string
  rvi_score: number
  rvi_tier: string
  cereal_yield_mt_ha: number
  cereal_area_ha: number
  cereal_production_mt: number
  literacy_rate: number
  pct_secondary: number
  poverty_rate: number
  paradox_type: string
  paradox_label: string
  paradox_color: string
  ag_data_year: string
  ag_source: string
  migration_source: string
}

const districts = districtsData as District[]

const TIER_COLORS: Record<string, string> = {
  Low: '#22c55e',
  Moderate: '#f97316',
  High: '#ef4444',
  Critical: '#dc2626',
}

const PARADOX_COLORS: Record<string, string> = {
  red: '#ef4444',
  green: '#22c55e',
  orange: '#f97316',
  blue: '#3b82f6',
}

export default function DistrictPage() {
  const params = useParams()
  const slug = params?.slug as string
  const district = districts.find(d => d.slug === slug)

  if (!district) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-center">
          <p className="text-lg mb-4" style={{ color: '#6a6860' }}>District not found: {slug}</p>
          <Link href="/" className="text-sm" style={{ color: '#9e7c44' }}>← Back to Overview</Link>
        </div>
      </div>
    )
  }

  const nationalAvgYield = 2.90
  const yieldVsNational = ((district.cereal_yield_mt_ha - nationalAvgYield) / nationalAvgYield * 100).toFixed(1)
  const yieldAbove = district.cereal_yield_mt_ha >= nationalAvgYield

  // Radar chart data — normalize all to 0-100
  const radarData = [
    { metric: 'Migration', value: Math.round(district.rdi_score) },
    { metric: 'Vulnerability', value: Math.round(district.rvi_score) },
    { metric: 'Yield Gap', value: Math.round((1 - district.cereal_yield_mt_ha / 5.08) * 100) },
    { metric: 'Edu Deficit', value: Math.round(100 - district.pct_secondary) },
    { metric: 'Poverty', value: Math.round(Math.min(district.poverty_rate * 10, 100)) },
  ]

  // All districts scatter data
  const scatterData = districts.map(d => ({
    x: d.absent_hh_rate,
    y: d.cereal_yield_mt_ha,
    name: d.name,
    isThis: d.slug === slug,
    color: PARADOX_COLORS[d.paradox_color] || '#64748b'
  }))

  const paradoxColor = PARADOX_COLORS[district.paradox_color] || '#64748b'
  const tierColor = TIER_COLORS[district.rdi_tier] || '#64748b'

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="text-sm transition-colors" style={{ color: '#9b9890' }}>
            ← Overview
          </Link>
          <span className="mx-2" style={{ color: '#6a6860' }}>/</span>
          <span className="text-sm" style={{ color: '#9b9890' }}>Districts</span>
          <span className="mx-2" style={{ color: '#6a6860' }}>/</span>
          <span className="text-sm" style={{ color: '#0e0e0c' }}>{district.name}</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs tracking-widest uppercase mb-2" style={{ fontFamily: 'DM Mono, monospace', color: '#9b9890' }}>
                {district.province} Province
              </p>
              <h1 className="font-serif font-bold mb-3" style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: '#0e0e0c' }}>{district.name}</h1>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium"
                style={{ backgroundColor: `${paradoxColor}1a`, color: paradoxColor, border: `0.8px solid ${paradoxColor}40` }}
              >
                {district.paradox_label}
              </span>
            </div>
          </div>
        </div>

        {/* Key Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            {
              label: 'Household Migration Rate',
              value: `${district.absent_hh_rate.toFixed(1)}%`,
              sub: 'CBS Nepal Census 2021',
              color: '#9e7c44'
            },
            {
              label: 'Cereal Yield (2022/23)',
              value: `${district.cereal_yield_mt_ha} MT/Ha`,
              sub: yieldAbove ? `↑ ${yieldVsNational}% above national avg` : `↓ ${Math.abs(Number(yieldVsNational))}% below national avg`,
              color: yieldAbove ? '#16a34a' : '#dc2626'
            },
            {
              label: 'RDI Score',
              value: district.rdi_score.toFixed(1),
              sub: `Tier: ${district.rdi_tier}`,
              color: tierColor
            },
            {
              label: 'RVI Score',
              value: district.rvi_score.toFixed(1),
              sub: `Tier: ${district.rvi_tier}`,
              color: TIER_COLORS[district.rvi_tier] || '#6a6860'
            },
          ].map((stat, i) => (
            <div key={i} className="rounded-lg p-5" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '8px', borderTop: `3px solid ${stat.color}` }}>
              <p className="text-xs mb-2" style={{ color: '#9b9890' }}>{stat.label}</p>
              <p className="font-serif font-bold text-2xl mb-1" style={{ color: '#0e0e0c' }}>{stat.value}</p>
              <p className="text-xs font-medium" style={{ color: stat.color }}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Secondary stats row */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Literacy Rate', value: `${district.literacy_rate.toFixed(1)}%`, sub: 'CBS 2021' },
            { label: 'Secondary Education', value: `${district.pct_secondary.toFixed(1)}%`, sub: 'CBS 2021' },
            { label: 'Cereal Area', value: `${district.cereal_area_ha.toLocaleString()} Ha`, sub: 'MoALD 2022/23' },
          ].map((s, i) => (
            <div key={i} className="rounded-lg p-5" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '8px' }}>
              <p className="text-xs mb-2" style={{ color: '#9b9890' }}>{s.label}</p>
              <p className="font-serif font-bold text-xl" style={{ color: '#0e0e0c' }}>{s.value}</p>
              <p className="text-xs mt-1" style={{ color: '#6a6860' }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* Radar chart */}
          <div className="rounded-lg p-6" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '12px' }}>
            <h2 className="font-serif font-bold text-base mb-1" style={{ color: '#0e0e0c' }}>District Profile</h2>
            <p className="text-xs mb-4" style={{ color: '#9b9890', fontFamily: 'DM Mono, monospace' }}>Multi-dimensional vulnerability radar (0–100)</p>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(14,14,12,0.08)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#6a6860', fontSize: 11 }} />
                <Radar
                  name={district.name}
                  dataKey="value"
                  stroke="#9e7c44"
                  fill="#9e7c44"
                  fillOpacity={0.15}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.12)', color: '#0e0e0c', borderRadius: '6px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Scatter chart — this district vs all */}
          <div className="rounded-lg p-6" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '12px' }}>
            <h2 className="font-serif font-bold text-base mb-1" style={{ color: '#0e0e0c' }}>Position Among All Districts</h2>
            <p className="text-xs mb-4" style={{ color: '#9b9890', fontFamily: 'DM Mono, monospace' }}>Migration rate vs cereal yield — {district.name} highlighted</p>
            <ResponsiveContainer width="100%" height={280}>
              <ScatterChart>
                <CartesianGrid stroke="rgba(14,14,12,0.06)" />
                <XAxis
                  dataKey="x"
                  name="Migration Rate"
                  type="number"
                  domain={[0, 50]}
                  tickCount={6}
                  tick={{ fill: '#9b9890', fontSize: 11 }}
                  label={{ value: 'HH Migration Rate (%)', position: 'insideBottom', offset: -5, fill: '#9b9890', fontSize: 11 }}
                />
                <YAxis
                  dataKey="y"
                  name="Yield"
                  type="number"
                  domain={[0, 6]}
                  tickCount={7}
                  tick={{ fill: '#9b9890', fontSize: 11 }}
                  label={{ value: 'Yield (MT/Ha)', angle: -90, position: 'insideLeft', fill: '#9b9890', fontSize: 11 }}
                />
                <ReferenceLine y={2.90} stroke="#9e7c44" strokeDasharray="4 4" label={{ value: 'Nat. avg 2.90', fill: '#9e7c44', fontSize: 10 }} />
                <Tooltip
                  formatter={(value, name) => [typeof value === 'number' ? value.toFixed(2) : String(value ?? ''), String(name)]}
                  labelFormatter={() => ''}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload
                      return (
                        <div className="p-2 rounded text-xs" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.12)', borderRadius: '6px' }}>
                          <p className="font-medium" style={{ color: '#0e0e0c' }}>{d.name}</p>
                          <p style={{ color: '#6a6860' }}>Migration: {d.x.toFixed(1)}%</p>
                          <p style={{ color: '#6a6860' }}>Yield: {d.y} MT/Ha</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Scatter
                  data={scatterData.filter(d => !d.isThis)}
                  fill="#d1cfc8"
                  opacity={0.7}
                />
                <Scatter
                  data={scatterData.filter(d => d.isThis)}
                  fill={paradoxColor}
                  r={8}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Paradox analysis box */}
        <div className="rounded-lg p-6 mb-10" style={{ backgroundColor: '#0e0e0c', borderRadius: '8px', borderLeft: `4px solid ${paradoxColor}` }}>
          <h2 className="font-serif font-bold text-base mb-3" style={{ color: '#f7f6f2' }}>
            Why is {district.name} classified as &ldquo;{district.paradox_label}&rdquo;?
          </h2>
          {district.paradox_type === 'high-migration-low-yield' && (
            <div className="space-y-2 text-sm leading-relaxed" style={{ color: 'rgba(247,246,242,0.7)' }}>
              <p>{district.name} exhibits the core remittance paradox: a high household migration rate of {district.absent_hh_rate.toFixed(1)}% — above the 25% threshold for migration-intensive districts — combined with cereal yields of {district.cereal_yield_mt_ha} MT/Ha, which fall {Math.abs(Number(yieldVsNational))}% below the national average of 2.90 MT/Ha.</p>
              <p>The district&rsquo;s RVI score of {district.rvi_score.toFixed(1)} ({district.rvi_tier} vulnerability tier) suggests that structural conditions — low human capital, limited infrastructure, and geographic constraints — prevent remittance wealth from converting into agricultural investment.</p>
              <p>This pattern is consistent with the labour drain hypothesis: as working-age household members migrate, farm labour shortages reduce production capacity even when remittance income rises.</p>
            </div>
          )}
          {district.paradox_type === 'high-migration-high-yield' && (
            <div className="space-y-2 text-sm leading-relaxed" style={{ color: 'rgba(247,246,242,0.7)' }}>
              <p>{district.name} is a resilient exception: despite a migration rate of {district.absent_hh_rate.toFixed(1)}%, cereal yields of {district.cereal_yield_mt_ha} MT/Ha exceed the national average by {yieldVsNational}%.</p>
              <p>This district&rsquo;s relatively lower RVI score ({district.rvi_score.toFixed(1)}, {district.rvi_tier} tier) suggests better structural foundations — likely ecological advantage (Terai plains, irrigation access) — that allow agricultural productivity to persist despite labour outmigration.</p>
              <p>Understanding what makes districts like {district.name} resilient is as important as understanding where the paradox fails.</p>
            </div>
          )}
          {district.paradox_type === 'low-migration-low-yield' && (
            <div className="space-y-2 text-sm leading-relaxed" style={{ color: 'rgba(247,246,242,0.7)' }}>
              <p>{district.name} has a migration rate of {district.absent_hh_rate.toFixed(1)}% — below the high-migration threshold — yet agricultural yields of {district.cereal_yield_mt_ha} MT/Ha remain {Math.abs(Number(yieldVsNational))}% below the national average.</p>
              <p>With an RVI score of {district.rvi_score.toFixed(1)} ({district.rvi_tier} tier), this district faces structural agricultural underperformance driven by poverty and limited human capital — not remittance-driven labour drain. The policy challenge here is fundamentally different: direct agricultural investment rather than remittance channelling.</p>
            </div>
          )}
          {district.paradox_type === 'low-migration-high-yield' && (
            <div className="space-y-2 text-sm leading-relaxed" style={{ color: 'rgba(247,246,242,0.7)' }}>
              <p>{district.name} demonstrates stable agricultural performance: a migration rate of {district.absent_hh_rate.toFixed(1)}% combined with cereal yields of {district.cereal_yield_mt_ha} MT/Ha — {yieldVsNational}% above the national average.</p>
              <p>This pattern — low migration pressure, above-average yields — likely reflects a combination of ecological advantage and retained agricultural labour. The RVI score of {district.rvi_score.toFixed(1)} ({district.rvi_tier} tier) confirms relatively lower structural vulnerability.</p>
            </div>
          )}
        </div>

        {/* Data sources */}
        <div className="rounded-lg p-4 mb-10" style={{ backgroundColor: 'rgba(14,14,12,0.04)', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '6px' }}>
          <p className="text-xs" style={{ color: '#9b9890', fontFamily: 'DM Mono, monospace' }}>
            <span className="font-medium" style={{ color: '#6a6860' }}>Data sources: </span>
            {district.ag_source} (agricultural yield) &bull; {district.migration_source} (migration data) &bull; Nepal Remittance Atlas RDI/RVI scores (Prasanna Thapa, 2026)
          </p>
        </div>

        {/* Navigation to other districts */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm transition-colors" style={{ color: '#9b9890' }}>
            ← Back to Overview
          </Link>
          <Link href="/compare" className="text-sm" style={{ color: '#9e7c44' }}>
            Compare Districts →
          </Link>
        </div>

      </div>
    </div>
  )
}

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 text-lg mb-4">District not found: {slug}</p>
          <Link href="/" className="text-[#e8c547] hover:underline">← Back to Overview</Link>
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
          <Link href="/" className="text-slate-400 hover:text-[#e8c547] text-sm transition-colors">
            ← Overview
          </Link>
          <span className="text-slate-600 mx-2">/</span>
          <span className="text-slate-400 text-sm">Districts</span>
          <span className="text-slate-600 mx-2">/</span>
          <span className="text-white text-sm">{district.name}</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-[#e8c547] text-sm font-medium tracking-widest uppercase mb-2">
                {district.province} Province
              </p>
              <h1 className="text-5xl font-bold text-white mb-3">{district.name}</h1>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold"
                style={{ backgroundColor: paradoxColor + '22', color: paradoxColor, border: `1px solid ${paradoxColor}55` }}
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
              color: '#e8c547'
            },
            {
              label: 'Cereal Yield (2022/23)',
              value: `${district.cereal_yield_mt_ha} MT/Ha`,
              sub: yieldAbove ? `↑ ${yieldVsNational}% above national avg` : `↓ ${Math.abs(Number(yieldVsNational))}% below national avg`,
              color: yieldAbove ? '#22c55e' : '#ef4444'
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
              color: TIER_COLORS[district.rvi_tier] || '#64748b'
            },
          ].map((stat, i) => (
            <div key={i} className="rounded-xl p-5" style={{ backgroundColor: 'var(--bg-card)', borderLeft: `4px solid ${stat.color}` }}>
              <p className="text-slate-400 text-xs mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs" style={{ color: stat.color }}>{stat.sub}</p>
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
            <div key={i} className="rounded-xl p-5" style={{ backgroundColor: 'var(--bg-card)' }}>
              <p className="text-slate-400 text-xs mb-2">{s.label}</p>
              <p className="text-xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* Radar chart */}
          <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--bg-card)' }}>
            <h2 className="text-white font-semibold mb-1">District Profile</h2>
            <p className="text-slate-400 text-xs mb-4">Multi-dimensional vulnerability radar (0–100)</p>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Radar
                  name={district.name}
                  dataKey="value"
                  stroke="#e8c547"
                  fill="#e8c547"
                  fillOpacity={0.2}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a2235', border: '1px solid #e8c54733', color: '#f1f5f9' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Scatter chart — this district vs all */}
          <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--bg-card)' }}>
            <h2 className="text-white font-semibold mb-1">Position Among All Districts</h2>
            <p className="text-slate-400 text-xs mb-4">Migration rate vs cereal yield — {district.name} highlighted</p>
            <ResponsiveContainer width="100%" height={280}>
              <ScatterChart>
                <CartesianGrid stroke="#1e293b" />
                <XAxis
                  dataKey="x"
                  name="Migration Rate"
                  type="number"
                  domain={[0, 50]}
                  tickCount={6}
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  label={{ value: 'HH Migration Rate (%)', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: 11 }}
                />
                <YAxis
                  dataKey="y"
                  name="Yield"
                  type="number"
                  domain={[0, 6]}
                  tickCount={7}
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  label={{ value: 'Yield (MT/Ha)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }}
                />
                <ReferenceLine y={2.90} stroke="#e8c547" strokeDasharray="4 4" label={{ value: 'Nat. avg 2.90', fill: '#e8c547', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a2235', border: '1px solid #e8c54733', color: '#f1f5f9' }}
                  formatter={(value, name) => [typeof value === 'number' ? value.toFixed(2) : String(value ?? ''), String(name)]}
                  labelFormatter={() => ''}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload
                      return (
                        <div className="p-2 rounded text-xs" style={{ backgroundColor: '#1a2235', border: '1px solid #e8c54733' }}>
                          <p className="text-white font-semibold">{d.name}</p>
                          <p className="text-slate-400">Migration: {d.x.toFixed(1)}%</p>
                          <p className="text-slate-400">Yield: {d.y} MT/Ha</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Scatter
                  data={scatterData.filter(d => !d.isThis)}
                  fill="#334155"
                  opacity={0.6}
                />
                <Scatter
                  data={scatterData.filter(d => d.isThis)}
                  fill="#e8c547"
                  r={8}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Paradox analysis box */}
        <div className="rounded-xl p-6 mb-10" style={{ backgroundColor: 'var(--bg-card)', borderLeft: `4px solid ${paradoxColor}` }}>
          <h2 className="text-white font-semibold text-lg mb-3">
            Why is {district.name} classified as &ldquo;{district.paradox_label}&rdquo;?
          </h2>
          {district.paradox_type === 'high-migration-low-yield' && (
            <div className="space-y-2 text-slate-300 text-sm leading-relaxed">
              <p>{district.name} exhibits the core remittance paradox: a high household migration rate of {district.absent_hh_rate.toFixed(1)}% — above the 25% threshold for migration-intensive districts — combined with cereal yields of {district.cereal_yield_mt_ha} MT/Ha, which fall {Math.abs(Number(yieldVsNational))}% below the national average of 2.90 MT/Ha.</p>
              <p>The district&rsquo;s RVI score of {district.rvi_score.toFixed(1)} ({district.rvi_tier} vulnerability tier) suggests that structural conditions — low human capital, limited infrastructure, and geographic constraints — prevent remittance wealth from converting into agricultural investment.</p>
              <p>This pattern is consistent with the labour drain hypothesis: as working-age household members migrate, farm labour shortages reduce production capacity even when remittance income rises.</p>
            </div>
          )}
          {district.paradox_type === 'high-migration-high-yield' && (
            <div className="space-y-2 text-slate-300 text-sm leading-relaxed">
              <p>{district.name} is a resilient exception: despite a migration rate of {district.absent_hh_rate.toFixed(1)}%, cereal yields of {district.cereal_yield_mt_ha} MT/Ha exceed the national average by {yieldVsNational}%.</p>
              <p>This district&rsquo;s relatively lower RVI score ({district.rvi_score.toFixed(1)}, {district.rvi_tier} tier) suggests better structural foundations — likely ecological advantage (Terai plains, irrigation access) — that allow agricultural productivity to persist despite labour outmigration.</p>
              <p>Understanding what makes districts like {district.name} resilient is as important as understanding where the paradox fails.</p>
            </div>
          )}
          {district.paradox_type === 'low-migration-low-yield' && (
            <div className="space-y-2 text-slate-300 text-sm leading-relaxed">
              <p>{district.name} has a migration rate of {district.absent_hh_rate.toFixed(1)}% — below the high-migration threshold — yet agricultural yields of {district.cereal_yield_mt_ha} MT/Ha remain {Math.abs(Number(yieldVsNational))}% below the national average.</p>
              <p>With an RVI score of {district.rvi_score.toFixed(1)} ({district.rvi_tier} tier), this district faces structural agricultural underperformance driven by poverty and limited human capital — not remittance-driven labour drain. The policy challenge here is fundamentally different: direct agricultural investment rather than remittance channelling.</p>
            </div>
          )}
          {district.paradox_type === 'low-migration-high-yield' && (
            <div className="space-y-2 text-slate-300 text-sm leading-relaxed">
              <p>{district.name} demonstrates stable agricultural performance: a migration rate of {district.absent_hh_rate.toFixed(1)}% combined with cereal yields of {district.cereal_yield_mt_ha} MT/Ha — {yieldVsNational}% above the national average.</p>
              <p>This pattern — low migration pressure, above-average yields — likely reflects a combination of ecological advantage and retained agricultural labour. The RVI score of {district.rvi_score.toFixed(1)} ({district.rvi_tier} tier) confirms relatively lower structural vulnerability.</p>
            </div>
          )}
        </div>

        {/* Data sources */}
        <div className="rounded-xl p-5 mb-10 border border-white/5" style={{ backgroundColor: '#0d1526' }}>
          <p className="text-slate-500 text-xs">
            <span className="text-slate-400 font-medium">Data sources: </span>
            {district.ag_source} (agricultural yield) &bull; {district.migration_source} (migration data) &bull; Nepal Remittance Atlas RDI/RVI scores (Prasanna Thapa, 2026)
          </p>
        </div>

        {/* Navigation to other districts */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-slate-400 hover:text-[#e8c547] text-sm transition-colors">
            ← Back to Overview
          </Link>
          <Link href="/compare" className="text-[#e8c547] hover:underline text-sm">
            Compare Districts →
          </Link>
        </div>

      </div>
    </div>
  )
}

'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import districtsData from '@/data/districts.json'
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
  BarChart, Bar, Legend
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
}

const districts = districtsData as District[]

const PARADOX_COLORS: Record<string, string> = {
  'high-migration-low-yield': '#ef4444',
  'high-migration-high-yield': '#22c55e',
  'low-migration-low-yield': '#f97316',
  'low-migration-high-yield': '#3b82f6',
}

const PARADOX_LABELS: Record<string, string> = {
  'high-migration-low-yield': 'Paradox Zone',
  'high-migration-high-yield': 'Resilient',
  'low-migration-low-yield': 'Structurally Poor',
  'low-migration-high-yield': 'Stable',
}

export default function ComparePage() {
  const [districtA, setDistrictA] = useState('kailali')
  const [districtB, setDistrictB] = useState('achham')
  const [filterType, setFilterType] = useState<string>('all')

  const dA = districts.find(d => d.slug === districtA) || districts[0]
  const dB = districts.find(d => d.slug === districtB) || districts[1]

  const scatterData = useMemo(() => districts.map(d => ({
    x: d.absent_hh_rate,
    y: d.cereal_yield_mt_ha,
    name: d.name,
    slug: d.slug,
    type: d.paradox_type,
    color: PARADOX_COLORS[d.paradox_type],
    isA: d.slug === districtA,
    isB: d.slug === districtB,
  })), [districtA, districtB])

  const comparisonStats = [
    { label: 'Household Migration Rate', keyA: dA.absent_hh_rate.toFixed(1) + '%', keyB: dB.absent_hh_rate.toFixed(1) + '%', unit: '%', higher: dA.absent_hh_rate > dB.absent_hh_rate ? 'A' : 'B' },
    { label: 'Cereal Yield (MT/Ha)', keyA: dA.cereal_yield_mt_ha.toFixed(2), keyB: dB.cereal_yield_mt_ha.toFixed(2), unit: 'MT/Ha', higher: dA.cereal_yield_mt_ha > dB.cereal_yield_mt_ha ? 'A' : 'B' },
    { label: 'RDI Score', keyA: dA.rdi_score.toFixed(1), keyB: dB.rdi_score.toFixed(1), unit: '/100', higher: dA.rdi_score > dB.rdi_score ? 'A' : 'B' },
    { label: 'RVI Score', keyA: dA.rvi_score.toFixed(1), keyB: dB.rvi_score.toFixed(1), unit: '/100', higher: dA.rvi_score > dB.rvi_score ? 'A' : 'B' },
    { label: 'Literacy Rate', keyA: dA.literacy_rate.toFixed(1) + '%', keyB: dB.literacy_rate.toFixed(1) + '%', unit: '%', higher: dA.literacy_rate > dB.literacy_rate ? 'A' : 'B' },
    { label: 'Secondary Education', keyA: dA.pct_secondary.toFixed(1) + '%', keyB: dB.pct_secondary.toFixed(1) + '%', unit: '%', higher: dA.pct_secondary > dB.pct_secondary ? 'A' : 'B' },
  ]

  const barData = [
    { metric: 'Migration Rate', A: dA.absent_hh_rate, B: dB.absent_hh_rate },
    { metric: 'RDI Score', A: dA.rdi_score, B: dB.rdi_score },
    { metric: 'RVI Score', A: dA.rvi_score, B: dB.rvi_score },
    { metric: 'Literacy', A: dA.literacy_rate, B: dB.literacy_rate },
    { metric: 'Secondary Ed', A: dA.pct_secondary, B: dB.pct_secondary },
  ]

  const colorA = PARADOX_COLORS[dA.paradox_type]
  const colorB = PARADOX_COLORS[dB.paradox_type]

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[#e8c547] text-sm font-medium tracking-widest uppercase mb-3">
            District Analysis
          </p>
          <h1 className="text-4xl font-bold text-white mb-2">Compare Districts</h1>
          <p className="text-slate-400">
            Select any two districts to compare migration intensity, agricultural yield, and structural vulnerability side by side.
          </p>
        </div>

        {/* District Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            { label: 'District A', value: districtA, setter: setDistrictA, color: colorA, district: dA },
            { label: 'District B', value: districtB, setter: setDistrictB, color: colorB, district: dB },
          ].map(({ label, value, setter, color, district }) => (
            <div key={label} className="rounded-xl p-5" style={{ backgroundColor: 'var(--bg-card)', borderTop: `3px solid ${color}` }}>
              <p className="text-slate-400 text-xs mb-2">{label}</p>
              <select
                value={value}
                onChange={e => setter(e.target.value)}
                className="w-full bg-slate-800 text-white rounded-lg px-3 py-2 text-sm border border-white/10 mb-4 focus:outline-none focus:border-[#e8c547]/50"
              >
                {districts.sort((a, b) => a.name.localeCompare(b.name)).map(d => (
                  <option key={d.slug} value={d.slug}>{d.name} ({d.province})</option>
                ))}
              </select>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white font-bold text-lg">{district.name}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: color + '22', color: color, border: `1px solid ${color}44` }}
                >
                  {PARADOX_LABELS[district.paradox_type]}
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-1">{district.province} Province</p>
            </div>
          ))}
        </div>

        {/* Key Comparison Stats */}
        <div className="rounded-xl p-6 mb-10" style={{ backgroundColor: 'var(--bg-card)' }}>
          <h2 className="text-white font-semibold mb-5">Head-to-Head Comparison</h2>
          <div className="space-y-3">
            {comparisonStats.map((stat, i) => (
              <div key={i} className="grid grid-cols-3 items-center gap-4">
                <div className="text-right">
                  <span
                    className={`text-sm font-semibold ${stat.higher === 'A' ? 'text-white' : 'text-slate-500'}`}
                  >
                    {stat.keyA}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-slate-400 text-xs">{stat.label}</p>
                </div>
                <div className="text-left">
                  <span
                    className={`text-sm font-semibold ${stat.higher === 'B' ? 'text-white' : 'text-slate-500'}`}
                  >
                    {stat.keyB}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Yield comparison highlight */}
          <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 gap-4">
            {[dA, dB].map((d, i) => {
              const diff = ((d.cereal_yield_mt_ha - 2.90) / 2.90 * 100)
              const above = diff >= 0
              return (
                <div key={i} className="rounded-lg p-4 bg-slate-800/40 text-center">
                  <p className="text-slate-400 text-xs mb-1">{d.name} vs National Avg</p>
                  <p className={`text-2xl font-bold ${above ? 'text-green-400' : 'text-red-400'}`}>
                    {above ? '+' : ''}{diff.toFixed(1)}%
                  </p>
                  <p className="text-slate-500 text-xs mt-1">{d.cereal_yield_mt_ha} MT/Ha vs 2.90 avg</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="rounded-xl p-6 mb-10" style={{ backgroundColor: 'var(--bg-card)' }}>
          <h2 className="text-white font-semibold mb-1">Indicator Comparison</h2>
          <p className="text-slate-400 text-xs mb-4">All indicators on 0–100 scale</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} barGap={4}>
              <CartesianGrid stroke="#1e293b" vertical={false} />
              <XAxis dataKey="metric" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a2235', border: '1px solid #e8c54733', color: '#f1f5f9' }}
              />
              <Legend />
              <Bar dataKey="A" name={dA.name} fill={colorA} radius={[4, 4, 0, 0]} />
              <Bar dataKey="B" name={dB.name} fill={colorB} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Scatter — all districts with A and B highlighted */}
        <div className="rounded-xl p-6 mb-10" style={{ backgroundColor: 'var(--bg-card)' }}>
          <h2 className="text-white font-semibold mb-1">All 75 Districts — Migration vs Yield</h2>
          <p className="text-slate-400 text-xs mb-4">
            Selected districts highlighted. Colors indicate paradox classification.
          </p>

          {/* Filter buttons */}
          <div className="flex gap-2 flex-wrap mb-4">
            {[
              { key: 'all', label: 'All Districts', color: '#64748b' },
              { key: 'high-migration-low-yield', label: 'Paradox Zone', color: '#ef4444' },
              { key: 'high-migration-high-yield', label: 'Resilient', color: '#22c55e' },
              { key: 'low-migration-low-yield', label: 'Structurally Poor', color: '#f97316' },
              { key: 'low-migration-high-yield', label: 'Stable', color: '#3b82f6' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilterType(f.key)}
                className="text-xs px-3 py-1 rounded-full border transition-all"
                style={{
                  borderColor: filterType === f.key ? f.color : '#334155',
                  backgroundColor: filterType === f.key ? f.color + '22' : 'transparent',
                  color: filterType === f.key ? f.color : '#64748b'
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={360}>
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
              <ReferenceLine x={25} stroke="#64748b" strokeDasharray="4 4" label={{ value: '25% threshold', fill: '#64748b', fontSize: 10, position: 'top' }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload
                    return (
                      <div className="p-2 rounded text-xs" style={{ backgroundColor: '#1a2235', border: '1px solid #e8c54733' }}>
                        <p className="text-white font-semibold">{d.name}</p>
                        <p className="text-slate-400">Migration: {d.x?.toFixed(1)}%</p>
                        <p className="text-slate-400">Yield: {d.y} MT/Ha</p>
                        <p style={{ color: d.color }}>{PARADOX_LABELS[d.type]}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              {/* Background districts */}
              <Scatter
                data={scatterData.filter(d => !d.isA && !d.isB && (filterType === 'all' || d.type === filterType))}
                fill="#334155"
                opacity={0.7}
              />
              {/* District A */}
              <Scatter
                data={scatterData.filter(d => d.isA)}
                fill={colorA}
                r={10}
              />
              {/* District B */}
              <Scatter
                data={scatterData.filter(d => d.isB)}
                fill={colorB}
                r={10}
              />
            </ScatterChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex gap-4 mt-3 flex-wrap">
            {[dA, dB].map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: i === 0 ? colorA : colorB }}></span>
                <span className="text-slate-400">{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* View individual district links */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {[dA, dB].map((d, i) => (
            <Link
              key={i}
              href={`/district/${d.slug}`}
              className="rounded-xl p-4 border border-white/10 hover:border-[#e8c547]/40 transition-all text-center"
              style={{ backgroundColor: 'var(--bg-card)' }}
            >
              <p className="text-slate-400 text-xs mb-1">View full profile</p>
              <p className="text-white font-semibold">{d.name} →</p>
            </Link>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-slate-400 hover:text-[#e8c547] text-sm transition-colors">
            ← Overview
          </Link>
          <Link href="/methodology" className="text-[#e8c547] hover:underline text-sm">
            Methodology →
          </Link>
        </div>

      </div>
    </div>
  )
}

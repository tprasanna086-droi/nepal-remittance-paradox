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
      <div className="max-w-5xl mx-auto px-10 py-16">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: 'DM Mono, monospace', color: '#9b9890' }}>
            District Analysis
          </p>
          <h1 className="font-serif font-bold text-4xl mb-2" style={{ color: '#0e0e0c' }}>Compare Districts</h1>
          <p className="text-sm" style={{ color: '#6a6860' }}>
            Select any two districts to compare migration intensity, agricultural yield, and structural vulnerability side by side.
          </p>
        </div>

        {/* District Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            { label: 'District A', value: districtA, setter: setDistrictA, color: colorA, district: dA },
            { label: 'District B', value: districtB, setter: setDistrictB, color: colorB, district: dB },
          ].map(({ label, value, setter, color, district }) => (
            <div key={label} className="rounded-lg p-5" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '8px', borderTop: `3px solid ${color}` }}>
              <p className="text-xs mb-2" style={{ color: '#9b9890', fontFamily: 'DM Mono, monospace' }}>{label}</p>
              <select
                value={value}
                onChange={e => setter(e.target.value)}
                className="w-full px-3 py-2 text-sm mb-4 focus:outline-none"
                style={{ backgroundColor: '#f7f6f2', border: '0.8px solid rgba(14,14,12,0.12)', borderRadius: '6px', color: '#0e0e0c' }}
              >
                {districts.sort((a, b) => a.name.localeCompare(b.name)).map(d => (
                  <option key={d.slug} value={d.slug}>{d.name} ({d.province})</option>
                ))}
              </select>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-serif font-bold text-lg" style={{ color: '#0e0e0c' }}>{district.name}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: color + '1a', color: color, border: `0.8px solid ${color}40` }}
                >
                  {PARADOX_LABELS[district.paradox_type]}
                </span>
              </div>
              <p className="text-xs mt-1" style={{ color: '#9b9890' }}>{district.province} Province</p>
            </div>
          ))}
        </div>

        {/* Key Comparison Stats */}
        <div className="rounded-lg p-6 mb-10" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '8px' }}>
          <h2 className="font-serif font-bold text-lg mb-5" style={{ color: '#0e0e0c' }}>Head-to-Head Comparison</h2>
          <div className="space-y-3">
            {comparisonStats.map((stat, i) => (
              <div key={i} className="grid grid-cols-3 items-center gap-4">
                <div className="text-right">
                  <span className="text-sm" style={{ fontWeight: stat.higher === 'A' ? 600 : 400, color: stat.higher === 'A' ? '#0e0e0c' : '#d1cfc8' }}>
                    {stat.keyA}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-xs" style={{ color: '#9b9890' }}>{stat.label}</p>
                </div>
                <div className="text-left">
                  <span className="text-sm" style={{ fontWeight: stat.higher === 'B' ? 600 : 400, color: stat.higher === 'B' ? '#0e0e0c' : '#d1cfc8' }}>
                    {stat.keyB}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Yield comparison highlight */}
          <div className="mt-6 pt-5 grid grid-cols-2 gap-4" style={{ borderTop: '0.8px solid rgba(14,14,12,0.09)' }}>
            {[dA, dB].map((d, i) => {
              const diff = ((d.cereal_yield_mt_ha - 2.90) / 2.90 * 100)
              const above = diff >= 0
              return (
                <div key={i} className="rounded-lg p-4 text-center" style={{ backgroundColor: '#f7f6f2', borderRadius: '8px' }}>
                  <p className="text-xs mb-1" style={{ color: '#9b9890' }}>{d.name} vs National Avg</p>
                  <p className="font-serif font-bold text-2xl" style={{ color: above ? '#16a34a' : '#dc2626' }}>
                    {above ? '+' : ''}{diff.toFixed(1)}%
                  </p>
                  <p className="text-xs mt-1" style={{ color: '#6a6860' }}>{d.cereal_yield_mt_ha} MT/Ha vs 2.90 avg</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="rounded-lg p-6 mb-10" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '8px' }}>
          <h2 className="font-serif font-bold text-base mb-1" style={{ color: '#0e0e0c' }}>Indicator Comparison</h2>
          <p className="text-xs mb-4" style={{ color: '#9b9890', fontFamily: 'DM Mono, monospace' }}>All indicators on 0–100 scale</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} barGap={4}>
              <CartesianGrid stroke="rgba(14,14,12,0.06)" vertical={false} />
              <XAxis dataKey="metric" tick={{ fill: '#9b9890', fontSize: 11 }} />
              <YAxis tick={{ fill: '#9b9890', fontSize: 11 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.12)', color: '#0e0e0c', borderRadius: '6px' }}
              />
              <Legend />
              <Bar dataKey="A" name={dA.name} fill={colorA} radius={[4, 4, 0, 0]} />
              <Bar dataKey="B" name={dB.name} fill={colorB} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Scatter — all districts with A and B highlighted */}
        <div className="rounded-lg p-6 mb-10" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '8px' }}>
          <h2 className="font-serif font-bold text-base mb-1" style={{ color: '#0e0e0c' }}>All 75 Districts — Migration vs Yield</h2>
          <p className="text-xs mb-4" style={{ color: '#9b9890', fontFamily: 'DM Mono, monospace' }}>
            Selected districts highlighted. Colors indicate paradox classification.
          </p>

          {/* Filter buttons */}
          <div className="flex gap-2 flex-wrap mb-4">
            {[
              { key: 'all', label: 'All Districts', color: '#6a6860' },
              { key: 'high-migration-low-yield', label: 'Paradox Zone', color: '#dc2626' },
              { key: 'high-migration-high-yield', label: 'Resilient', color: '#16a34a' },
              { key: 'low-migration-low-yield', label: 'Structurally Poor', color: '#ea580c' },
              { key: 'low-migration-high-yield', label: 'Stable', color: '#2563eb' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilterType(f.key)}
                className="text-xs px-3 py-1 rounded-full border transition-all"
                style={{
                  fontFamily: 'DM Mono, monospace',
                  borderColor: filterType === f.key ? f.color : 'rgba(14,14,12,0.12)',
                  backgroundColor: filterType === f.key ? `${f.color}1f` : 'transparent',
                  color: filterType === f.key ? f.color : '#9b9890'
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={360}>
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
              <ReferenceLine x={25} stroke="#9b9890" strokeDasharray="4 4" label={{ value: '25% threshold', fill: '#9b9890', fontSize: 10, position: 'top' }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload
                    return (
                      <div className="p-2 rounded text-xs" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.12)', borderRadius: '6px' }}>
                        <p className="font-medium" style={{ color: '#0e0e0c' }}>{d.name}</p>
                        <p style={{ color: '#6a6860' }}>Migration: {d.x?.toFixed(1)}%</p>
                        <p style={{ color: '#6a6860' }}>Yield: {d.y} MT/Ha</p>
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
                fill="#d1cfc8"
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
                <span style={{ color: '#6a6860' }}>{d.name}</span>
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
              className="rounded-lg p-4 text-center transition-all"
              style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '8px' }}
            >
              <p className="text-xs mb-1" style={{ color: '#9b9890' }}>View full profile</p>
              <p className="font-serif font-bold" style={{ color: '#0e0e0c' }}>{d.name} →</p>
            </Link>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm" style={{ color: '#9b9890' }}>
            ← Overview
          </Link>
          <Link href="/methodology" className="text-sm" style={{ color: '#9e7c44' }}>
            Methodology →
          </Link>
        </div>

      </div>
    </div>
  )
}

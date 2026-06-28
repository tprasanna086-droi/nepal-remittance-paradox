'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import districtsData from '@/data/districts.json'

type District = {
  name: string
  slug: string
  province: string
  paradox_type: string
  paradox_label: string
  paradox_color: string
  absent_hh_rate: number
  cereal_yield_mt_ha: number
  rdi_score: number
  rvi_score: number
  rdi_tier: string
  rvi_tier: string
}

const districts = districtsData as District[]

const PARADOX_COLORS: Record<string, string> = {
  'high-migration-low-yield': '#ef4444',
  'high-migration-high-yield': '#22c55e',
  'low-migration-low-yield': '#f97316',
  'low-migration-high-yield': '#3b82f6',
}

const PROVINCES = ['All', 'Koshi', 'Madhesh', 'Bagmati', 'Gandaki', 'Lumbini', 'Karnali', 'Sudurpashchim']

export default function DistrictsPage() {
  const [search, setSearch] = useState('')
  const [province, setProvince] = useState('All')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState<'name' | 'yield' | 'migration' | 'rdi'>('name')

  const filtered = useMemo(() => {
    return districts
      .filter(d => {
        const matchSearch = d.name.toLowerCase().includes(search.toLowerCase())
        const matchProvince = province === 'All' || d.province === province
        const matchType = filterType === 'all' || d.paradox_type === filterType
        return matchSearch && matchProvince && matchType
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        if (sortBy === 'yield') return b.cereal_yield_mt_ha - a.cereal_yield_mt_ha
        if (sortBy === 'migration') return b.absent_hh_rate - a.absent_hh_rate
        if (sortBy === 'rdi') return b.rdi_score - a.rdi_score
        return 0
      })
  }, [search, province, filterType, sortBy])

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[#e8c547] text-sm font-medium tracking-widest uppercase mb-3">
            75 Districts
          </p>
          <h1 className="text-4xl font-bold text-white mb-2">District Explorer</h1>
          <p className="text-slate-400">
            Browse all 75 Nepal districts. Click any district to see its full migration-agriculture profile.
          </p>
        </div>

        {/* Filters */}
        <div className="rounded-xl p-5 mb-8 flex flex-wrap gap-4 items-end" style={{ backgroundColor: 'var(--bg-card)' }}>
          
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <label className="text-slate-400 text-xs mb-1 block">Search</label>
            <input
              type="text"
              placeholder="District name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-slate-800 text-white rounded-lg px-3 py-2 text-sm border border-white/10 focus:outline-none focus:border-[#e8c547]/50"
            />
          </div>

          {/* Province */}
          <div>
            <label className="text-slate-400 text-xs mb-1 block">Province</label>
            <select
              value={province}
              onChange={e => setProvince(e.target.value)}
              className="bg-slate-800 text-white rounded-lg px-3 py-2 text-sm border border-white/10 focus:outline-none focus:border-[#e8c547]/50"
            >
              {PROVINCES.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="text-slate-400 text-xs mb-1 block">Sort by</label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'name' | 'yield' | 'migration' | 'rdi')}
              className="bg-slate-800 text-white rounded-lg px-3 py-2 text-sm border border-white/10 focus:outline-none focus:border-[#e8c547]/50"
            >
              <option value="name">Name</option>
              <option value="yield">Yield (highest)</option>
              <option value="migration">Migration (highest)</option>
              <option value="rdi">RDI Score</option>
            </select>
          </div>

          {/* Count */}
          <div className="ml-auto text-slate-400 text-sm self-center">
            {filtered.length} district{filtered.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Classification filter pills */}
        <div className="flex gap-2 flex-wrap mb-6">
          {[
            { key: 'all', label: 'All Types', color: '#64748b' },
            { key: 'high-migration-low-yield', label: 'Paradox Zone', color: '#ef4444' },
            { key: 'high-migration-high-yield', label: 'Resilient', color: '#22c55e' },
            { key: 'low-migration-low-yield', label: 'Structurally Poor', color: '#f97316' },
            { key: 'low-migration-high-yield', label: 'Stable', color: '#3b82f6' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilterType(f.key)}
              className="text-xs px-3 py-1.5 rounded-full border transition-all"
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

        {/* District Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(district => {
            const color = PARADOX_COLORS[district.paradox_type]
            const yieldDiff = ((district.cereal_yield_mt_ha - 2.90) / 2.90 * 100)
            const yieldAbove = yieldDiff >= 0

            return (
              <Link
                key={district.slug}
                href={`/district/${district.slug}`}
                className="rounded-xl p-5 border border-white/5 hover:border-[#e8c547]/30 transition-all group"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                {/* District header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-white font-semibold group-hover:text-[#e8c547] transition-colors">
                      {district.name}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5">{district.province}</p>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full shrink-0"
                    style={{ backgroundColor: color + '22', color: color, border: `1px solid ${color}44` }}
                  >
                    {district.paradox_label}
                  </span>
                </div>

                {/* Key stats */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="rounded-lg p-2.5 bg-slate-800/50">
                    <p className="text-slate-500 text-xs">Migration</p>
                    <p className="text-white text-sm font-semibold">{district.absent_hh_rate.toFixed(1)}%</p>
                  </div>
                  <div className="rounded-lg p-2.5 bg-slate-800/50">
                    <p className="text-slate-500 text-xs">Yield</p>
                    <p className="text-sm font-semibold" style={{ color: yieldAbove ? '#22c55e' : '#ef4444' }}>
                      {district.cereal_yield_mt_ha} MT/Ha
                    </p>
                  </div>
                  <div className="rounded-lg p-2.5 bg-slate-800/50">
                    <p className="text-slate-500 text-xs">RDI</p>
                    <p className="text-white text-sm font-semibold">{district.rdi_score.toFixed(1)}</p>
                  </div>
                  <div className="rounded-lg p-2.5 bg-slate-800/50">
                    <p className="text-slate-500 text-xs">vs Nat. Avg</p>
                    <p className="text-sm font-semibold" style={{ color: yieldAbove ? '#22c55e' : '#ef4444' }}>
                      {yieldAbove ? '+' : ''}{yieldDiff.toFixed(1)}%
                    </p>
                  </div>
                </div>

                <p className="text-[#e8c547] text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  View full profile →
                </p>
              </Link>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500">No districts match your filters.</p>
            <button onClick={() => { setSearch(''); setProvince('All'); setFilterType('all') }} className="text-[#e8c547] text-sm mt-2 hover:underline">
              Clear filters
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

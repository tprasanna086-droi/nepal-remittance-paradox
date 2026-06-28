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
      <div className="max-w-5xl mx-auto px-10 py-16">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: 'DM Mono, monospace', color: '#9b9890' }}>
            75 Districts
          </p>
          <h1 className="font-serif font-bold text-4xl mb-2" style={{ color: '#0e0e0c' }}>District Explorer</h1>
          <p className="text-sm" style={{ color: '#6a6860' }}>
            Browse all 75 Nepal districts. Click any district to see its full migration-agriculture profile.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 items-end" style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '8px', padding: '16px 20px' }}>
          
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs mb-1 block" style={{ color: '#9b9890' }}>Search</label>
            <input
              type="text"
              placeholder="District name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
              style={{ backgroundColor: '#f7f6f2', border: '0.8px solid rgba(14,14,12,0.12)', borderRadius: '6px', color: '#0e0e0c' }}
            />
          </div>

          {/* Province */}
          <div>
            <label className="text-xs mb-1 block" style={{ color: '#9b9890' }}>Province</label>
            <select
              value={province}
              onChange={e => setProvince(e.target.value)}
              className="px-3 py-2 text-sm focus:outline-none"
              style={{ backgroundColor: '#f7f6f2', border: '0.8px solid rgba(14,14,12,0.12)', borderRadius: '6px', color: '#0e0e0c' }}
            >
              {PROVINCES.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="text-xs mb-1 block" style={{ color: '#9b9890' }}>Sort by</label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'name' | 'yield' | 'migration' | 'rdi')}
              className="px-3 py-2 text-sm focus:outline-none"
              style={{ backgroundColor: '#f7f6f2', border: '0.8px solid rgba(14,14,12,0.12)', borderRadius: '6px', color: '#0e0e0c' }}
            >
              <option value="name">Name</option>
              <option value="yield">Yield (highest)</option>
              <option value="migration">Migration (highest)</option>
              <option value="rdi">RDI Score</option>
            </select>
          </div>

          {/* Count */}
          <div className="ml-auto text-sm self-center" style={{ color: '#9b9890', fontFamily: 'DM Mono, monospace' }}>
            {filtered.length} district{filtered.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Classification filter pills */}
        <div className="flex gap-2 flex-wrap mb-6">
          {[
            { key: 'all', label: 'All Types', color: '#6a6860' },
            { key: 'high-migration-low-yield', label: 'Paradox Zone', color: '#dc2626' },
            { key: 'high-migration-high-yield', label: 'Resilient', color: '#16a34a' },
            { key: 'low-migration-low-yield', label: 'Structurally Poor', color: '#ea580c' },
            { key: 'low-migration-high-yield', label: 'Stable', color: '#2563eb' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilterType(f.key)}
              className="text-xs px-3 py-1.5 rounded-full border transition-all"
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
                className="rounded-lg p-5 transition-all group"
                style={{ backgroundColor: '#ffffff', border: '0.8px solid rgba(14,14,12,0.09)', borderRadius: '8px' }}
              >
                {/* District header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-serif font-bold text-base group-hover:text-[#9e7c44] transition-colors" style={{ color: '#0e0e0c' }}>
                      {district.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#9b9890' }}>{district.province}</p>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full shrink-0"
                    style={{ backgroundColor: color + '1a', color: color, border: `0.8px solid ${color}40` }}
                  >
                    {district.paradox_label}
                  </span>
                </div>

                {/* Key stats */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="rounded-lg p-2.5" style={{ backgroundColor: '#f7f6f2', borderRadius: '6px' }}>
                    <p className="text-xs" style={{ color: '#9b9890' }}>Migration</p>
                    <p className="text-sm font-medium" style={{ color: '#0e0e0c' }}>{district.absent_hh_rate.toFixed(1)}%</p>
                  </div>
                  <div className="rounded-lg p-2.5" style={{ backgroundColor: '#f7f6f2', borderRadius: '6px' }}>
                    <p className="text-xs" style={{ color: '#9b9890' }}>Yield</p>
                    <p className="text-sm font-medium" style={{ color: yieldAbove ? '#16a34a' : '#dc2626' }}>
                      {district.cereal_yield_mt_ha} MT/Ha
                    </p>
                  </div>
                  <div className="rounded-lg p-2.5" style={{ backgroundColor: '#f7f6f2', borderRadius: '6px' }}>
                    <p className="text-xs" style={{ color: '#9b9890' }}>RDI</p>
                    <p className="text-sm font-medium" style={{ color: '#0e0e0c' }}>{district.rdi_score.toFixed(1)}</p>
                  </div>
                  <div className="rounded-lg p-2.5" style={{ backgroundColor: '#f7f6f2', borderRadius: '6px' }}>
                    <p className="text-xs" style={{ color: '#9b9890' }}>vs Nat. Avg</p>
                    <p className="text-sm font-medium" style={{ color: yieldAbove ? '#16a34a' : '#dc2626' }}>
                      {yieldAbove ? '+' : ''}{yieldDiff.toFixed(1)}%
                    </p>
                  </div>
                </div>

                <p className="text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#9e7c44' }}>
                  View full profile →
                </p>
              </Link>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-sm" style={{ color: '#9b9890' }}>No districts match your filters.</p>
            <button onClick={() => { setSearch(''); setProvince('All'); setFilterType('all') }} className="text-sm mt-2" style={{ color: '#9e7c44' }}>
              Clear filters
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

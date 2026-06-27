'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import districtsData from '@/data/districts.json'
import 'leaflet/dist/leaflet.css'

type District = {
  name: string
  slug: string
  paradox_type: string
  paradox_label: string
  paradox_color: string
  absent_hh_rate: number
  cereal_yield_mt_ha: number
  rdi_score: number
  rvi_score: number
  province: string
}

const districts = districtsData as District[]

const PARADOX_COLORS: Record<string, string> = {
  'high-migration-low-yield': '#ef4444',
  'high-migration-high-yield': '#22c55e',
  'low-migration-low-yield': '#f97316',
  'low-migration-high-yield': '#3b82f6',
}

function getDistrictData(name: string): District | undefined {
  const normalized = name?.toLowerCase().trim()
  return districts.find(d => {
    const dName = d.name.toLowerCase().trim()
    return dName === normalized ||
      dName.replace(/\s+/g, '') === normalized.replace(/\s+/g, '') ||
      normalized.includes(dName) ||
      dName.includes(normalized)
  })
}

export default function NepalMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)
  const router = useRouter()

  useEffect(() => {
    if (!mapRef.current) return
    if (mapInstanceRef.current) return

    // Mark as initializing immediately to prevent double init
    const container = mapRef.current as HTMLDivElement & { _leaflet_id?: number }
    if (container._leaflet_id) return

    let cancelled = false

    const initMap = async () => {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')

      if (cancelled || !mapRef.current) return

      const mapContainer = mapRef.current as HTMLDivElement & { _leaflet_id?: number }
      if (mapContainer._leaflet_id) return

      const map = L.map(mapRef.current, {
        center: [28.3949, 84.124],
        zoom: 7,
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: false,
      })

      mapInstanceRef.current = map

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map)

      const response = await fetch('/nepal-districts.geojson')
      const geojson = await response.json()

      if (cancelled) return

      L.geoJSON(geojson, {
        style: (feature) => {
          const name = feature?.properties?.DISTRICT ||
            feature?.properties?.district ||
            feature?.properties?.NAME_3 ||
            feature?.properties?.name || ''
          const district = getDistrictData(name)
          const color = district ? PARADOX_COLORS[district.paradox_type] : '#334155'
          return {
            fillColor: color,
            fillOpacity: district ? 0.75 : 0.3,
            color: '#0a0f1e',
            weight: 1,
            opacity: 1,
          }
        },
        onEachFeature: (feature, layer) => {
          const name = feature?.properties?.DISTRICT ||
            feature?.properties?.district ||
            feature?.properties?.NAME_3 ||
            feature?.properties?.name || ''
          const district = getDistrictData(name)

          if (district) {
            const color = PARADOX_COLORS[district.paradox_type]
            const yieldVsNat = ((district.cereal_yield_mt_ha - 3.26) / 3.26 * 100).toFixed(1)
            const sign = Number(yieldVsNat) >= 0 ? '+' : ''

            layer.bindTooltip(`
              <div style="background:#1a2235;border:1px solid ${color}55;padding:10px 12px;border-radius:8px;min-width:180px">
                <div style="color:${color};font-size:10px;font-weight:600;letter-spacing:1px;margin-bottom:4px">${district.paradox_label.toUpperCase()}</div>
                <div style="color:#f1f5f9;font-size:15px;font-weight:700;margin-bottom:6px">${district.name}</div>
                <div style="color:#94a3b8;font-size:11px">${district.province} Province</div>
                <div style="margin-top:8px;display:flex;flex-direction:column;gap:3px">
                  <div style="color:#94a3b8;font-size:11px">Migration: <span style="color:#f1f5f9">${district.absent_hh_rate.toFixed(1)}%</span></div>
                  <div style="color:#94a3b8;font-size:11px">Yield: <span style="color:#f1f5f9">${district.cereal_yield_mt_ha} MT/Ha</span> <span style="color:${color}">(${sign}${yieldVsNat}%)</span></div>
                  <div style="color:#94a3b8;font-size:11px">RDI: <span style="color:#f1f5f9">${district.rdi_score.toFixed(1)}</span> · RVI: <span style="color:#f1f5f9">${district.rvi_score.toFixed(1)}</span></div>
                </div>
                <div style="margin-top:8px;color:${color};font-size:10px">Click to explore →</div>
              </div>
            `, {
              sticky: false,
              permanent: false,
              className: 'nepal-tooltip',
              opacity: 1,
            })

            layer.on({
              mouseover: (e) => {
                const l = e.target
                l.setStyle({ fillOpacity: 1, weight: 2, color: color })
                l.bringToFront()
              },
              mouseout: (e) => {
                const l = e.target
                l.setStyle({ fillOpacity: 0.75, weight: 1, color: '#0a0f1e' })
              },
              click: () => {
                router.push(`/district/${district.slug}`)
              }
            })
          } else {
            layer.bindTooltip(`
              <div style="background:#1a2235;padding:8px 10px;border-radius:6px;color:#64748b;font-size:12px">
                ${name} (data pending)
              </div>
            `, { sticky: true, opacity: 1 })
          }
        }
      }).addTo(map)
    }

    initMap()

    return () => {
      cancelled = true
      if (mapInstanceRef.current) {
        ;(mapInstanceRef.current as import('leaflet').Map).remove()
        mapInstanceRef.current = null
      }
    }
  }, [router])

  return (
    <div className="relative w-full rounded-xl overflow-hidden" style={{ height: '520px' }}>
      {/* Map legend */}
      <div className="absolute top-3 right-3 z-[1000] rounded-xl p-3" style={{ backgroundColor: '#0a0f1eee', border: '1px solid #ffffff15' }}>
        <p className="text-slate-400 text-xs mb-2 font-medium">District Classification</p>
        {[
          { color: '#ef4444', label: 'Paradox Zone', n: 17 },
          { color: '#22c55e', label: 'Resilient', n: 10 },
          { color: '#f97316', label: 'Structurally Poor', n: 32 },
          { color: '#3b82f6', label: 'Stable', n: 16 },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 mb-1.5">
            <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: item.color }}></span>
            <span className="text-slate-300 text-xs">{item.label}</span>
            <span className="text-slate-500 text-xs ml-auto">({item.n})</span>
          </div>
        ))}
      </div>

      {/* Map container */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Tooltip CSS override */}
      <style>{`
        .nepal-tooltip { background: transparent !important; border: none !important; box-shadow: none !important; }
        .nepal-tooltip .leaflet-tooltip-tip { display: none; }
        .leaflet-control-zoom { border: 1px solid #ffffff15 !important; }
        .leaflet-control-zoom a { background: #1a2235 !important; color: #e8c547 !important; border-color: #ffffff15 !important; }
        .leaflet-control-zoom a:hover { background: #e8c547 !important; color: #0a0f1e !important; }
      `}</style>
    </div>
  )
}

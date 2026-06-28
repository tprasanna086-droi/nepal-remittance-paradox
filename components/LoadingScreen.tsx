'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1800)
    const hide = setTimeout(() => setVisible(false), 2300)
    return () => { clearTimeout(timer); clearTimeout(hide) }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500"
      style={{
        backgroundColor: '#0e0e0c',
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'all'
      }}
    >
      {/* Logo mark */}
      <div className="mb-8 relative">
        <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#1a1a18' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="2" y="14" width="28" height="2.5" rx="1.25" fill="#9e7c44"/>
            <rect x="2" y="9" width="18" height="2" rx="1" fill="#f7f6f2" opacity="0.9"/>
            <rect x="2" y="19" width="22" height="2" rx="1" fill="#f7f6f2" opacity="0.9"/>
            <circle cx="27" cy="20" r="5" fill="#9e7c44"/>
            <text x="24.2" y="23.5" font-size="7" font-family="serif" font-weight="bold" fill="#f7f6f2">N</text>
          </svg>
        </div>
      </div>

      {/* Title */}
      <p className="font-serif text-white text-xl font-bold tracking-tight mb-1">
        Nepal Remittance Paradox
      </p>
      <p className="text-sm mb-10" style={{ color: '#9b9890', fontFamily: 'DM Mono, monospace' }}>
        Agricultural Research Platform
      </p>

      {/* Loading bar */}
      <div className="w-48 h-px rounded-full overflow-hidden" style={{ backgroundColor: '#2a2a28' }}>
        <div
          className="h-full rounded-full"
          style={{
            backgroundColor: '#9e7c44',
            animation: 'loadbar 1.8s ease-in-out forwards'
          }}
        />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&family=DM+Mono&display=swap');
        @keyframes loadbar {
          0% { width: 0%; }
          30% { width: 45%; }
          70% { width: 75%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}

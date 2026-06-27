"use client";

import Link from "next/link";
import dynamic from 'next/dynamic'

const NepalMap = dynamic(() => import('@/components/NepalMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full rounded-xl flex items-center justify-center" style={{ height: '520px', backgroundColor: '#111827' }}>
      <div className="text-center">
        <p className="text-[#e8c547] text-sm mb-2">Loading map...</p>
        <p className="text-slate-500 text-xs">Nepal districts geojson rendering</p>
      </div>
    </div>
  )
})

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* SECTION 1 — HERO */}
      <section className="w-full px-4 pt-20 pb-16 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#e8c547] text-sm tracking-[0.2em] uppercase mb-6">
            Independent Research &bull; Prasanna Thapa &bull; 2026
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Nepal&apos;s Remittance Paradox
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Why migration-intensive districts fail to convert remittance wealth
            into agricultural productivity
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="border border-[#e8c547]/30 bg-[#e8c547]/10 text-[#e8c547] rounded-full px-4 py-1 text-sm">
              75 Districts Analyzed
            </span>
            <span className="border border-[#e8c547]/30 bg-[#e8c547]/10 text-[#e8c547] rounded-full px-4 py-1 text-sm">
              MoALD 2022/23 Data
            </span>
            <span className="border border-[#e8c547]/30 bg-[#e8c547]/10 text-[#e8c547] rounded-full px-4 py-1 text-sm">
              CBS Census 2021
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2 — KEY FINDINGS STRIP */}
      <section className="w-full max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1a2235] rounded-xl p-6 border-l-4 border-[#ef4444]">
            <p className="text-4xl font-bold text-white mb-1">17</p>
            <p className="text-[#ef4444] font-semibold text-sm">
              Paradox Zone Districts
            </p>
            <p className="text-slate-400 text-xs mt-1">
              High migration + below-average yields
            </p>
          </div>
          <div className="bg-[#1a2235] rounded-xl p-6 border-l-4 border-[#22c55e]">
            <p className="text-4xl font-bold text-white mb-1">10</p>
            <p className="text-[#22c55e] font-semibold text-sm">
              Resilient Districts
            </p>
            <p className="text-slate-400 text-xs mt-1">
              High migration + above-average yields
            </p>
          </div>
          <div className="bg-[#1a2235] rounded-xl p-6 border-l-4 border-[#e8c547]">
            <p className="text-4xl font-bold text-white mb-1">3.26</p>
            <p className="text-[#e8c547] font-semibold text-sm">
              MT/Ha National Average
            </p>
            <p className="text-slate-400 text-xs mt-1">
              Aggregate cereal yield 2022/23 (MoALD)
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — MAP */}
      <section className="w-full max-w-5xl mx-auto px-4 pb-16">
        <NepalMap />
      </section>

      {/* SECTION 4 — PARADOX EXPLAINED */}
      <section className="w-full max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="text-[#e8c547] text-xs tracking-[0.15em] uppercase mb-3 font-semibold">
              The Core Finding
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
              Not all migration hurts farms — but structural vulnerability
              always does
            </h2>
            <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
              <p>
                Districts with high migration AND high RVI (structural
                vulnerability) show the lowest agricultural yields — averaging
                2.1 MT/Ha vs the national 3.26 MT/Ha.
              </p>
              <p>
                However, ecologically advantaged districts (Terai plains)
                maintain high yields despite heavy migration — suggesting
                terrain and infrastructure mediate the relationship.
              </p>
              <p>
                This study cross-references the Nepal Remittance Atlas (RDI +
                RVI indices across all 75 districts) with MoALD 2022/23
                agricultural data to isolate structural mechanisms.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1a2235] rounded-xl p-5">
              <p className="text-2xl font-bold text-white">1.17</p>
              <p className="text-xs text-slate-400">MT/Ha</p>
              <p className="text-xs text-slate-500">Lowest yield (Humla)</p>
            </div>
            <div className="bg-[#1a2235] rounded-xl p-5">
              <p className="text-2xl font-bold text-white">5.08</p>
              <p className="text-xs text-slate-400">MT/Ha</p>
              <p className="text-xs text-slate-500">Highest yield (Bhaktapur)</p>
            </div>
            <div className="bg-[#1a2235] rounded-xl p-5">
              <p className="text-2xl font-bold text-white">42%</p>
              <p className="text-xs text-slate-400">Max household</p>
              <p className="text-xs text-slate-500">migration rate</p>
            </div>
            <div className="bg-[#1a2235] rounded-xl p-5">
              <p className="text-2xl font-bold text-white">0.27</p>
              <p className="text-xs text-slate-400">RDI-Yield</p>
              <p className="text-xs text-slate-500">correlation (p=0.017)</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — EXPLORE CARDS */}
      <section className="w-full max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/district/kailali">
            <div className="bg-[#1a2235] hover:bg-[#1e2a42] border border-white/10 hover:border-[#e8c547]/50 transition-all rounded-xl p-6 cursor-pointer h-full">
              <p className="text-white font-semibold text-lg mb-2">
                Explore Districts
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Click any of Nepal&apos;s 75 districts to see
                migration-agriculture dynamics
              </p>
            </div>
          </Link>
          <Link href="/compare">
            <div className="bg-[#1a2235] hover:bg-[#1e2a42] border border-white/10 hover:border-[#e8c547]/50 transition-all rounded-xl p-6 cursor-pointer h-full">
              <p className="text-white font-semibold text-lg mb-2">
                Compare Districts
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Side-by-side analysis of paradox vs resilient districts
              </p>
            </div>
          </Link>
          <Link href="/methodology">
            <div className="bg-[#1a2235] hover:bg-[#1e2a42] border border-white/10 hover:border-[#e8c547]/50 transition-all rounded-xl p-6 cursor-pointer h-full">
              <p className="text-white font-semibold text-lg mb-2">
                Methodology
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Data sources, index construction, and regression approach
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* SECTION 6 — FOOTER */}
      <footer className="bg-[#111827] border-t border-white/10 py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2 text-slate-500 text-sm">
          <p>
            Data: MoALD 2022/23 &bull; CBS Nepal 2021 &bull; Nepal Remittance
            Atlas
          </p>
          <p>Prasanna Thapa &bull; Independent Research &bull; 2026</p>
        </div>
      </footer>
    </div>
  );
}

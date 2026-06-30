

# Nepal Remittance-Agriculture Paradox Study

**Live Platform:** [nepal-remittance-paradox.vercel.app](https://nepal-remittance-paradox.vercel.app)  
**Working Paper:** Available on SSRN (link to be added)  
**Companion Project:** [Nepal Remittance Atlas](https://nepal-remittance-atlas-js.vercel.app)  
**Author:** Prasanna Thapa | Independent Research | 2026

---

## Overview

This project examines why migration-intensive districts in Nepal fail to convert remittance wealth into agricultural productivity gains — a pattern we term the **remittance-agriculture paradox**.

Using district-level cross-sectional data across all 75 districts of Nepal, we construct two composite indices from CBS 2021 Census microdata and cross-reference them with MoALD 2022/23 agricultural yield statistics. Spatial lag and spatial error models reveal that geographic proximity (ρ=0.823, p<0.001) is the dominant predictor of yield outcomes — a finding we report openly alongside the OLS results.

This study is the companion to the [Nepal Remittance Atlas](https://nepal-remittance-atlas-js.vercel.app), which constructed the RDI and RVI indices used here.

---

## Research Question

> Do structurally vulnerable districts fail to convert remittance-migration wealth into agricultural productivity gains — and what structural conditions explain the divergence between paradox and resilient districts?

---

## Key Findings

- **OLS:** RDI positively associated (β=0.019, p=0.004) and RVI negatively associated (β=-0.025, p=0.010) with cereal yield (R²=0.204)
- **Spatial models:** Geographic proximity dominates (SLM: ρ=0.823, p<0.001; SEM: λ=0.849, p<0.001); after spatial correction, RDI retains significance while RVI attenuates — indicating the vulnerability-yield association is largely geographic in origin
- **VIF analysis:** Poverty rate excluded (VIF=894); RDI, RVI, literacy have acceptable VIFs
- **Paradox taxonomy:** 11 Paradox Zone districts, 16 Resilient, 28 Structurally Poor, 20 Stable
- **Threshold sensitivity:** Paradox Zone ranges from 6–20 districts across alternative threshold specifications

---

## District Classification

| Classification | Migration | Yield | N Districts |
|---|---|---|---|
| Paradox Zone | > 25% | ≤ 2.90 MT/Ha | 11 |
| Resilient | > 25% | > 2.90 MT/Ha | 16 |
| Structurally Poor | ≤ 25% | ≤ 2.90 MT/Ha | 28 |
| Stable | ≤ 25% | > 2.90 MT/Ha | 20 |

---

## Data Sources

| Source | What It Provides | Level |
|---|---|---|
| CBS Nepal Census 2021 | Absent population/HH rates, literacy, education | District |
| MoALD Statistical Information 2079/80 (2022/23) | Cereal yield (MT/Ha), area, production | District |
| Nepal Remittance Atlas (Thapa, 2026) | RDI and RVI scores for all 75 districts | District |
| World Bank Nepal Poverty Assessment | Poverty rates (excluded — VIF=894) | District |
| OPHI MPI 2022 | Multidimensional poverty proxy for RVI | Provincial |

---

## Index Construction

### Remittance Dependency Index (RDI)
Theory-driven weights across three CBS indicators:
- Absent population rate: **40%**
- Absent household rate: **35%**
- Inverse secondary education of migrants: **25%**

Scores rescaled 0–100. Tier classification via Jenks Natural Breaks.

### Remittance Vulnerability Index (RVI)
PCA-derived weights across five indicators (PC1 explains 44.46% of variance):
- Inverse literacy rate: 25.5% (loading: 0.562)
- Inverse secondary education: 20.7% (loading: 0.457)
- MPI poverty proxy: 19.6% (loading: 0.433)
- Absent population rate: 18.7% (loading: 0.412)
- Absent household rate: 15.5% (loading: 0.343)

  This study's RVI was constructed independently for the yield regression context and 
includes migration intensity indicators (absent population rate, absent household 
rate) that the original Nepal Remittance Atlas RVI excludes to avoid circularity with 
RDI. This was not a deliberate revision of the Atlas index — the two were built 
separately for different analytical purposes — and the resulting indicator sets and 
variance explained (PC1: 44.46% here vs. 63.35% in the Atlas) differ accordingly. 
Readers comparing both projects should treat these as two distinct indices rather 
than versions of one index. Harmonizing the two specifications is identified as a 
priority for future work.

RDI–RVI Spearman correlation: **-0.31** (confirming they measure distinct phenomena)

---

## Statistical Methods

- Cross-sectional OLS regression with province fixed effects
- Variance Inflation Factor (VIF) analysis — poverty rate excluded (VIF=894)
- Spatial autocorrelation: Moran's I on OLS residuals = 0.511 (p=0.001)
- Maximum Likelihood Spatial Lag Model (ρ=0.823, p<0.001)
- Maximum Likelihood Spatial Error Model (λ=0.849, p<0.001)
- AIC model comparison: OLS=173.4, SLM=123.2, SEM=122.1
- Threshold sensitivity analysis across 4 classification scenarios
- Border district robustness check (N=71, excluding Kanchanpur, Kailali, Jhapa, Mahottari)

---

## Project Structure
nepal-remittance-paradox/
├── app/
│ ├── page.tsx # Homepage with interactive map
│ ├── districts/page.tsx # District browser (all 75)
│ ├── district/[slug]/page.tsx # Individual district profiles
│ ├── compare/page.tsx # Side-by-side district comparison
│ ├── methodology/page.tsx # Research design and methods
│ └── policy/page.tsx # Policy implications
├── components/
│ ├── NepalMap.tsx # Leaflet interactive map
│ ├── Navigation.tsx # Site navigation
│ └── LoadingScreen.tsx # Loading animation
├── data/
│ └── districts.json # 75-district merged dataset
└── public/
└── nepal-districts.geojson # Nepal district boundaries 
---

## Running Locally

```bash
git clone https://github.com/tprasanna086-droi/nepal-remittance-paradox.git
cd nepal-remittance-paradox
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Windows note:** If you encounter cache errors, run `Remove-Item -Recurse -Force .next` before `npm run dev`.

---

## Limitations

1. **Cross-sectional design** — supports association claims only; causal identification requires panel data
2. **Geographic dominance** — spatial lag ρ=0.823 indicates geography explains most yield variation; district-level policy operates within a powerful terrain constraint
3. **India migration undercounting** — open border means migration is underestimated in border districts
4. **Provincial MPI proxy** — district-level MPI unavailable; provincial figures introduce artificial spatial clustering in RVI
5. **RVI attenuation** — RVI becomes insignificant in spatial models, indicating the vulnerability-yield association is largely geographic in origin
6. **Omitted variables** — soil quality, crop mix, elevation, irrigation coverage unavailable at district level

---

## Robustness

| Test | Result |
|---|---|
| RVI alternative weights (equal vs PCA) | Spearman correlation: 0.989 |
| RDI alternative weights (equal vs theory) | Spearman correlation: 0.753 |
| Border district exclusion (N=71) | Classifications unchanged |
| Threshold sensitivity (4 scenarios) | Paradox Zone: 6–20 districts |
| Spatial models (SLM, SEM) | RDI robust; RVI attenuates |
| VIF analysis | Poverty excluded (VIF=894); others acceptable |

---

## Citation
Thapa, P. (2026). Remittance Dependency and Agricultural Stagnation in Nepal:
A Cross-Sectional Analysis of 75 Districts. Working Paper.
Available at: nepal-remittance-paradox.vercel.app 

---

## Replication

Full replication scripts and instructions are in the [`/replication`](./replication) folder.

```bash
# Quick start
cd replication
pip install -r requirements.txt
# Download data files (see replication/README_replication.md)
python 01_extract_moald.py
python 02_build_dataset.py
python 03_regression_analysis.py
python 04_spatial_models.py
```

See [`replication/README_replication.md`](./replication/README_replication.md) for full data acquisition instructions and expected outputs.

---

## License

MIT — data from CBS Nepal, MoALD, World Bank, and OPHI are subject to their respective terms of use.

---

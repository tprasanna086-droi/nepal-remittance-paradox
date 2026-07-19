# Nepal Remittance Paradox

An interactive research platform investigating why migration-intensive districts in Nepal fail to convert remittance wealth into agricultural productivity gains — a cross-sectional study of all 75 districts.

Live site: https://nepal-remittance-paradox.vercel.app

---

## The Core Finding

**Not all migration hurts farms — but structural vulnerability always does.**

Districts with high RVI (Remittance Vulnerability Index) scores average 2.1 MT/Ha in cereal yield — 28% below the national mean of 2.90 MT/Ha — regardless of how migration-intensive they are. Meanwhile, ecologically advantaged districts maintain strong yields even under heavy migration.

Terrain and irrigation infrastructure appear to mediate the relationship: Terai districts largely maintain productivity despite heavy out-migration, while Sudurpashchim hill districts face the full force of the paradox — high migration *and* falling yields.

This study cross-references the [Nepal Remittance Atlas](https://github.com/tprasanna086-droi/Nepal-remittance-atlas-js)'s RDI and RVI indices with MoALD agricultural data to isolate the structural mechanisms driving the paradox, rather than treating "migration" as a single undifferentiated cause of agricultural decline.

---

## Key Statistics

| Metric | Value |
| --- | --- |
| Districts analyzed | 75 |
| National average cereal yield | 2.90 MT/Ha |
| RDI–Yield correlation | r = 0.27 (p = 0.017) |
| Paradox Zone districts (high migration + below-avg yield) | 11 |
| Resilient districts (high migration + above-avg yield) | 16 |
| Borderline districts (within ±3pp threshold sensitivity) | 6 |
| Lowest cereal yield | 1.17 MT/Ha — Humla |
| Highest cereal yield | 5.08 MT/Ha — Bhaktapur |
| Maximum household migration rate | 42% |

---

## Methodology

**Research question:** Do structurally vulnerable districts fail to convert remittance-migration wealth into agricultural productivity gains — and what structural conditions explain the divergence between paradox and resilient districts?

### Four-Quadrant Paradox Taxonomy

Districts are classified along two thresholds: household migration rate above 25%, and cereal yield above the district mean of 2.90 MT/Ha.

| Classification | Definition | Districts |
| --- | --- | --- |
| Paradox Zone | High migration + below-average yield | 11 |
| Resilient | High migration + above-average yield | 16 |
| Structurally Poor | Low migration + below-average yield | 28 |
| Stable | Low migration + above-average yield | 20 |

A threshold sensitivity analysis across four alternative specifications (varying the migration cutoff between 20–30% and the yield cutoff between the median, mean, and 75th percentile) confirms the Paradox Zone count ranges from 6 to 20 districts depending on threshold choice — the baseline 11-district classification is stable at moderate thresholds. Six districts (Baitadi, Gorkha, Salyan, Dailekh, Panchthar, Bajura) fall within ±3 percentage points of the migration threshold and are flagged as borderline.

### Regression Model

Preferred OLS specification (poverty rate excluded due to severe multicollinearity — VIF = 894):

```
Yield_i = β₀ + β₁(RDI_i) + β₂(RVI_i) + β₃(Literacy_i) + ε_i
```

| Variable | Coefficient | p-value |
| --- | --- | --- |
| RDI Score | β = 0.019 | p = 0.004 *** |
| RVI Score | β = −0.025 | p = 0.010 *** |
| Literacy Rate | β = −0.040 | p = 0.162 (n.s.) |

N = 75 districts. R² = 0.194 (F = 5.83, p < 0.001); rises to R² = 0.652 with province fixed effects. The positive RDI coefficient reflects ecological confounding — Terai districts tend to have both high migration and high yields.

### Spatial Econometric Correction

Moran's I on OLS residuals = 0.511 (p = 0.001), confirming significant spatial autocorrelation — geographic clustering matters. Maximum-likelihood spatial lag (SLM) and spatial error (SEM) models were estimated using Queen contiguity weights across the full 75-district sample:

- **Spatial lag ρ = 0.823 (p < 0.001)** — neighboring districts' yields strongly predict a district's own yield; geography (terrain, irrigation, climate) explains most yield variation.
- **RDI holds up:** remains significant in both SLM (p = 0.010) and SEM (p = 0.010) — migration intensity has an association with yield independent of geographic clustering.
- **RVI attenuates:** becomes insignificant in both SLM (p = 0.177) and SEM (p = 0.904) — the vulnerability–yield association appears to be largely geographic in origin rather than an independent structural mechanism.

Model fit favors the spatial specifications (AIC: OLS = 173.4, SLM = 123.2, SEM = 122.1 — SEM preferred).

### Index Construction

**RDI (Remittance Dependency Index):** theory-driven weights — Absent Population Rate (40%), Absent Household Rate (35%), Education Inverse (25%) — across CBS indicators. A sensitivity check against equal weighting (0.33/0.33/0.33) gives Spearman r = 0.753 between the two versions; the equal-weight version loses statistical significance in the yield regression, supporting the theory-driven weights.

**RVI (Remittance Vulnerability Index):** PCA-derived from five z-scored indicators (Literacy Inverse, Education Inverse, MPI Poverty, Absent Population Rate, Absent Household Rate), following Abson et al. (2012). PC1 explains 44.46% of variance. Spearman correlation between PCA-based and equal-weight versions is 0.989, indicating stable rankings. RDI–RVI Spearman correlation is −0.31, confirming the two indices capture distinct phenomena.

### Robustness Checks

- **VIF analysis:** poverty rate excluded (VIF = 894); RDI, RVI, and literacy retain acceptable VIFs (1.04, 4.85, 4.83).
- **Weighting schemes:** RVI stable across PCA vs. equal weights (Spearman > 0.989); RDI theory vs. equal weights (Spearman = 0.753), with theory weights producing the stronger yield association.
- **Spatial autocorrelation:** addressed via SLM/SEM as above.
- **Border district exclusion (N = 71):** removing Kanchanpur, Kailali, Jhapa, and Mahottari (India border-crossing risk for migration undercounting) does not change any district classifications.
- **Threshold sensitivity:** four alternative specifications tested; baseline classification is stable.
- **Province fixed effects:** R² rises from 0.194 to 0.652; RDI and RVI direction is maintained.

---

## Policy Implications

**Core finding:** structural vulnerability — not migration intensity alone — determines whether remittance-sending districts stagnate agriculturally. This implies remittance-related agricultural policy needs to be differentiated by district structural context rather than applied uniformly.

Three district-differentiated policy tracks are proposed:

**Track 1 — Paradox Zone Districts.** Labour outmigration reduces farm workforce while remittance income flows into consumption rather than agricultural investment. Recommended: mechanization subsidies to offset labour shortages, remittance-linked agricultural investment bonds coordinated with NRB and commercial banks, cooperative consolidation of fragmented smallholder plots, and reintegration programs for returning migrants.

**Track 2 — Resilient Districts.** Predominantly Terai plains districts that maintain productivity despite heavy migration, likely due to irrigation, flat terrain, and market linkages. Recommended: case studies to document and replicate success factors, value chain investment (cold storage, processing, market access), and designation as peer-learning hubs for extension workers from paradox-zone districts.

**Track 3 — Structurally Poor Districts.** Underperformance here is driven by structural poverty and geographic isolation, not remittance dynamics — applying remittance-focused policy here misdiagnoses the problem. Recommended: infrastructure-first investment (roads, irrigation), direct input subsidies (seed, fertilizer, pest management), and climate-adaptive crop research for high-altitude districts.

**What this study does not support:** the cross-sectional design establishes correlation, not causation. It does not support claims that remittances directly cause agricultural decline, that reduced migration would raise yields, that the paradox is worsening over time, or that interventions successful in resilient districts would transfer directly to paradox-zone districts.

---

## Limitations

- **Cross-sectional design** — supports association claims only; causal identification would require panel data with within-district variation over time (at minimum, several years of MoALD yield data).
- **Geography is the dominant constraint** — spatial models (ρ = 0.823) show geographic proximity explains most yield variation; district-level migration policy operates within a terrain/infrastructure constraint that is hard to shift in the short term.
- **RVI attenuates under spatial correction** — becomes statistically insignificant in both spatial models, suggesting the vulnerability–yield association is largely geographic rather than an independent mechanism.
- **India-border migration undercounting** — the open border likely understates migration intensity in border districts (addressed via a border-exclusion robustness check, which did not change classifications).
- **Provincial MPI as poverty proxy** — district-level MPI is unavailable for Nepal, so all districts within a province share identical poverty scores, introducing artificial spatial clustering into RVI.
- **Omitted variables** — base OLS R² of 0.194 reflects unmeasured factors (soil quality, crop mix, elevation, irrigation coverage) not captured at the district level in CBS or MoALD data.

---

## Future Research Directions

- **Panel data extension** — 5–10 years of MoALD data would enable fixed-effects panel regression and support causal claims.
- **Household-level survey** — a targeted survey (200–300 households across paradox vs. resilient districts) to identify remittance usage patterns masked by district aggregates.
- **Spatial lag models** — further work using tools like `pysal` to account for geographic spillovers between districts.
- **Crop disaggregation** — aggregate cereal yield combines paddy, maize, and wheat, which may have different migration sensitivities.

---

## References

Abson, D.J., Dougill, A.J., and Stringer, L.C. (2012). Using Principal Component Analysis for information-rich socio-ecological vulnerability mapping in Southern Africa. *Applied Geography*, 35(1-2), 515–524.

CBS Nepal (2021). National Population and Housing Census 2021. Central Bureau of Statistics, Government of Nepal.

MacCallum, R.C., Widaman, K.F., Zhang, S., and Hong, S. (1999). Sample size in factor analysis. *Psychological Methods*, 4(1), 84–99.

MoALD (2023). Statistical Information on Nepalese Agriculture 2079/80 (2022/23). Ministry of Agriculture and Livestock Development, Government of Nepal.

OPHI/DHS (2022). Nepal Multidimensional Poverty Index. Oxford Poverty and Human Development Initiative via Humanitarian Data Exchange.

Shrestha, N. (2022). Do remittances reshape household expenditures? Evidence from Nepal. *World Development*, 157, 105933.

World Bank (2023). Migration and Remittances Data. World Bank Open Data.

---

## Data Sources

| Source | Data | Year |
| --- | --- | --- |
| MoALD — Statistical Information on Nepalese Agriculture 2079/80 | District-level cereal area, production, and yield for all 75 districts (extracted from Table 1.3 via `pdfplumber`) | 2022/23 |
| CBS Nepal Census | Absent household rate, absent population rate, literacy rate, secondary education attainment | 2021 |
| Nepal Remittance Atlas | RDI and RVI composite indices (Thapa, 2026), constructed via PCA across CBS microdata | — |
| World Bank / OPHI MPI | District/provincial poverty rates — excluded from the preferred regression (VIF = 894); provincial MPI used as a poverty proxy in RVI construction | 2022 |

---

## Pages

| Page | Description |
| --- | --- |
| Overview | Core finding, key statistics, paradox vs. resilient district breakdown |
| District Explorer | Browse all 75 districts with migration and yield data |
| Compare | Side-by-side analysis of paradox vs. resilient districts |
| Methodology | Data sources, index construction, and regression approach |
| Policy | Implications for agricultural and migration policy |

---

## Related Research

This project builds directly on the [Nepal Remittance Atlas](https://github.com/tprasanna086-droi/Nepal-remittance-atlas-js), which constructed the RDI (Migration Dependency Index) and RVI (Remittance Vulnerability Index) using PCA-based methods and found the two indices to be statistically independent (Spearman r = 0.049, p > 0.05). Paradox extends that work by testing how those same indices relate to a real economic outcome — agricultural productivity — rather than stopping at the indices themselves.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Hosting | Vercel |

---

## Run Locally

```
git clone https://github.com/tprasanna086-droi/nepal-remittance-paradox.git
cd nepal-remittance-paradox
npm install
npm run dev
```

Opens at http://localhost:3000

---

## Author

Prasanna Thapa
Nepal · 2026
Independent research project on Nepal's remittance-agriculture paradox.

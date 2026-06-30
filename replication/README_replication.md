# Replication Guide

Complete replication of the Nepal Remittance-Agriculture Paradox Study.

## Environment Setup

```bash
cd replication
pip install -r requirements.txt
```

## Data Acquisition

You need to download three files manually (cannot be redistributed):

**1. MoALD PDF (agricultural yield data)**
- URL: https://giwmscdnone.gov.np/media/pdf_upload/MOALD-Statical-Book-Magre-2081-Final_wgfs8ph.pdf
- Save as: `data/raw/MOALD_2022_23.pdf`
- Table used: Table 1.3 (Aggregate Cereals by District, pages 17–19)

**2. Nepal Remittance Atlas district data**
- Download `district_master.csv` from the Atlas GitHub repo
- URL: https://github.com/tprasanna086-droi/nepal-remittance-atlas-js
- Save as: `data/raw/district_master.csv`
- Contains: RDI scores, RVI scores, CBS 2021 migration indicators for all 75 districts

**3. Nepal district GeoJSON (for spatial models)**
- Already included in this repo at: `public/nepal-districts.geojson`
- Source: Standard Nepal administrative boundary shapefile

## Replication Steps

Run scripts in order from the project root directory:

```bash
# Step 1: Extract cereal yields from MoALD PDF
python replication/01_extract_moald.py
# Output: data/processed/moald_yields_2022_23.csv

# Step 2: Build merged research dataset
python replication/02_build_dataset.py
# Output: data/processed/agriculture_remittance_merged.csv
#         data/processed/districts.json

# Step 3: OLS regression analysis
python replication/03_regression_analysis.py
# Output: Printed regression tables (Table 1 in working paper)

# Step 4: Spatial models
python replication/04_spatial_models.py
# Output: Printed spatial results (Table 2 in working paper)
```

## Expected Output

After running all scripts you should reproduce:

| Result | Value |
|---|---|
| N districts | 75 |
| Mean cereal yield | 2.90 MT/Ha |
| OLS R² | 0.194 |
| RDI coefficient | β=0.019, p=0.004 |
| RVI coefficient | β=-0.025, p=0.010 |
| Moran's I (residuals) | 0.511, p=0.001 |
| SLM spatial lag ρ | 0.823, p<0.001 |
| SEM spatial error λ | 0.849, p<0.001 |
| AIC: OLS / SLM / SEM | 173.4 / 123.2 / 122.1 |
| Paradox Zone districts | 11 |

## Notes on Reproducibility

- MoALD PDF extraction uses regex pattern matching on extracted text. Minor variations may occur if pdfplumber version differs — use exact version in requirements.txt.
- Spatial weights use Queen contiguity (districts sharing a border or corner). Results are robust to Rook contiguity.
- Random seed is not required — ML spatial estimation is deterministic.
- All 75 districts match between GeoJSON and dataset with zero unmatched observations.

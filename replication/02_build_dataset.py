"""
Step 2: Merge MoALD yield data with Nepal Remittance Atlas data
Prerequisites:
  - Run 01_extract_moald.py first
  - Download atlas data from: https://nepal-remittance-atlas-js.vercel.app
    or from the Atlas GitHub repo district_master.csv
  - Save as: data/raw/district_master.csv
"""

import pandas as pd
import numpy as np
import json
import os

os.makedirs('data/processed', exist_ok=True)

def classify_paradox(row, mig_thresh=25.0, yield_thresh=2.90):
    high_mig = row['absent_hh_rate'] > mig_thresh
    high_yield = row['cereal_yield_mt_ha'] > yield_thresh
    if high_mig and not high_yield:
        return 'high-migration-low-yield', 'Paradox Zone', 'red'
    elif high_mig and high_yield:
        return 'high-migration-high-yield', 'Resilient', 'green'
    elif not high_mig and not high_yield:
        return 'low-migration-low-yield', 'Structurally Poor', 'orange'
    else:
        return 'low-migration-high-yield', 'Stable', 'blue'

def make_slug(name):
    return name.lower().replace(' ', '-').replace("'", '')

if __name__ == '__main__':
    # Load data
    atlas = pd.read_csv('data/raw/district_master.csv')
    yields = pd.read_csv('data/processed/moald_yields_2022_23.csv')

    # Merge
    merged = atlas.merge(yields, on='district', how='inner')
    print(f'Merged: {len(merged)} districts')

    # Classify
    merged[['paradox_type', 'paradox_label', 'paradox_color']] = merged.apply(
        lambda r: pd.Series(classify_paradox(r)), axis=1
    )

    # Save CSV
    merged.to_csv('data/processed/agriculture_remittance_merged.csv', index=False)
    print('Saved merged dataset')

    # Build districts.json for web app
    districts = []
    for _, row in merged.iterrows():
        districts.append({
            'id': make_slug(row['district']),
            'name': row['district'],
            'province': row['province'],
            'slug': make_slug(row['district']),
            'absent_hh_rate': round(float(row['absent_hh_rate']), 2),
            'absent_pop_rate': round(float(row['absent_pop_rate']), 2),
            'rdi_score': round(float(row['rdi_score']), 2),
            'rdi_tier': row['rdi_tier'],
            'rvi_score': round(float(row['rvi_final_score']), 2),
            'rvi_tier': row['rvi_final_tier'],
            'cereal_yield_mt_ha': round(float(row['cereal_yield_mt_ha']), 2),
            'cereal_area_ha': int(row['cereal_area_ha']),
            'cereal_production_mt': int(row['cereal_production_mt']),
            'literacy_rate': round(float(row['literacy_rate_real']), 2),
            'pct_secondary': round(float(row['pct_secondary_real']), 2),
            'poverty_rate': round(float(row['poverty_rate']), 2),
            'paradox_type': row['paradox_type'],
            'paradox_label': row['paradox_label'],
            'paradox_color': row['paradox_color'],
            'ag_data_year': '2022/23',
            'ag_source': 'MoALD Statistical Information on Nepalese Agriculture 2079/80',
            'migration_source': 'CBS Nepal Population and Housing Census 2021',
        })

    districts.sort(key=lambda x: x['name'])
    with open('data/processed/districts.json', 'w') as f:
        json.dump(districts, f, indent=2)
    print(f'Saved districts.json ({len(districts)} districts)')

    # Summary stats
    print(f"\nParadox taxonomy:")
    print(merged['paradox_label'].value_counts())
    print(f"\nYield: mean={merged['cereal_yield_mt_ha'].mean():.2f}, "
          f"median={merged['cereal_yield_mt_ha'].median():.2f}, "
          f"min={merged['cereal_yield_mt_ha'].min():.2f}, "
          f"max={merged['cereal_yield_mt_ha'].max():.2f}")

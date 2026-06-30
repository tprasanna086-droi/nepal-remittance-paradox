"""
Step 4: Spatial autocorrelation and spatial econometric models
Prerequisites:
  - Run 02_build_dataset.py first
  - Nepal district GeoJSON: public/nepal-districts.geojson
"""

import pandas as pd
import numpy as np
import geopandas as gpd
import libpysal
from libpysal.weights import Queen
import esda
import spreg
import statsmodels.api as sm

# Load data
df = pd.read_csv('data/processed/agriculture_remittance_merged.csv')
for col in ['rdi_score', 'rvi_final_score', 'literacy_rate_real', 'cereal_yield_mt_ha']:
    df[col] = pd.to_numeric(df[col], errors='coerce')
df['district_upper'] = df['district'].str.upper().str.strip()

# Load GeoJSON
gdf = gpd.read_file('public/nepal-districts.geojson')
gdf['district_upper'] = gdf['DISTRICT'].str.upper().str.strip()

# Merge — all 75 districts match directly
merged = gdf.merge(df, on='district_upper', how='inner')
print(f'Spatial sample: N={len(merged)}')
assert len(merged) == 75, f'Expected 75, got {len(merged)}'

# Build Queen contiguity weights
w = Queen.from_dataframe(merged, silence_warnings=True)
w.transform = 'r'
print(f'Queen weights: {w.n} units, avg neighbors: {w.mean_neighbors:.1f}')

# OLS on spatial sample (for residual Moran's I)
X_sm = sm.add_constant(merged[['rdi_score', 'rvi_final_score', 'literacy_rate_real']].astype(float))
y_sm = merged['cereal_yield_mt_ha'].astype(float)
ols = sm.OLS(y_sm, X_sm).fit()
print(f'\nOLS (N=75): R²={ols.rsquared:.4f}, AIC={ols.aic:.3f}')

# Moran's I on OLS residuals
mi_resid = esda.Moran(ols.resid.values, w)
print(f"Moran's I on residuals: I={mi_resid.I:.4f}, z={mi_resid.z_sim:.3f}, p={mi_resid.p_sim:.4f}")
print('Interpretation:', 'Spatial dependence confirmed — spatial models required' if mi_resid.p_sim < 0.05 else 'No significant spatial dependence')

# Moran's I on key variables
print("\n=== MORAN'S I — KEY VARIABLES ===")
for var, label in [('rvi_final_score', 'RVI'), ('rdi_score', 'RDI'),
                    ('absent_hh_rate', 'HH Migration Rate'), ('cereal_yield_mt_ha', 'Cereal Yield')]:
    vals = merged[var].astype(float).values
    mi = esda.Moran(vals, w)
    print(f'  {label}: I={mi.I:.4f}, p={mi.p_sim:.4f}')

# Arrays for spatial models
y = merged['cereal_yield_mt_ha'].values.reshape(-1, 1)
X = merged[['rdi_score', 'rvi_final_score', 'literacy_rate_real']].values
X_names = ['RDI Score', 'RVI Score', 'Literacy Rate']

# Spatial Lag Model
print('\n=== SPATIAL LAG MODEL (ML) ===')
lag = spreg.ML_Lag(y, X, w=w, name_y='cereal_yield', name_x=X_names)
vars_lag = ['CONSTANT'] + X_names + ['W_yield']
for i, name in enumerate(vars_lag):
    c = lag.betas[i][0]; se = lag.std_err[i]
    z = lag.z_stat[i][0]; p = lag.z_stat[i][1]
    sig = '***' if p < 0.01 else '**' if p < 0.05 else '*' if p < 0.1 else ''
    print(f'  {name:20}: β={c:.4f}, SE={se:.4f}, z={z:.3f}, p={p:.4f} {sig}')
print(f'  Pseudo R²={lag.pr2:.4f}, AIC={lag.aic:.3f}, LogL={lag.logll:.3f}')

# Spatial Error Model
print('\n=== SPATIAL ERROR MODEL (ML) ===')
err = spreg.ML_Error(y, X, w=w, name_y='cereal_yield', name_x=X_names)
vars_err = ['CONSTANT'] + X_names + ['lambda']
for i, name in enumerate(vars_err):
    c = err.betas[i][0]; se = err.std_err[i]
    z = err.z_stat[i][0]; p = err.z_stat[i][1]
    sig = '***' if p < 0.01 else '**' if p < 0.05 else '*' if p < 0.1 else ''
    print(f'  {name:20}: β={c:.4f}, SE={se:.4f}, z={z:.3f}, p={p:.4f} {sig}')
print(f'  Pseudo R²={err.pr2:.4f}, AIC={err.aic:.3f}, LogL={err.logll:.3f}')

# AIC comparison
print(f'\n=== MODEL COMPARISON (AIC — lower is better) ===')
print(f'  OLS: {ols.aic:.3f}')
print(f'  SLM: {lag.aic:.3f}')
print(f'  SEM: {err.aic:.3f}')
print(f'  Preferred: {"SEM" if err.aic < lag.aic else "SLM"}')
print('\nNote: Pseudo R² for SLM and SEM use log-likelihood and are not')
print('directly comparable to OLS R² or to each other. Use AIC for comparison.')

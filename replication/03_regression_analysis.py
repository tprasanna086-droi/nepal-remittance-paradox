"""
Step 3: OLS regression analysis
Prerequisites: Run 02_build_dataset.py first
"""

import pandas as pd
import numpy as np
import statsmodels.api as sm
from statsmodels.stats.outliers_influence import variance_inflation_factor
from scipy import stats

df = pd.read_csv('data/processed/agriculture_remittance_merged.csv')
for col in ['rdi_score', 'rvi_final_score', 'literacy_rate_real', 'poverty_rate', 'cereal_yield_mt_ha']:
    df[col] = pd.to_numeric(df[col], errors='coerce')

df_clean = df.dropna(subset=['rdi_score', 'rvi_final_score', 'literacy_rate_real', 'poverty_rate', 'cereal_yield_mt_ha'])
print(f'N = {len(df_clean)}')

# Correlations
print('\n=== CORRELATIONS ===')
r1, p1 = stats.spearmanr(df_clean['rdi_score'], df_clean['cereal_yield_mt_ha'])
r2, p2 = stats.spearmanr(df_clean['rvi_final_score'], df_clean['cereal_yield_mt_ha'])
print(f'RDI vs yield (Spearman): rho={r1:.4f}, p={p1:.4f}')
print(f'RVI vs yield (Spearman): rho={r2:.4f}, p={p2:.4f}')

# VIF analysis
print('\n=== VIF ANALYSIS ===')
X_vif = df_clean[['rdi_score', 'rvi_final_score', 'literacy_rate_real', 'poverty_rate']].astype(float)
for i, col in enumerate(X_vif.columns):
    vif = variance_inflation_factor(X_vif.values, i)
    flag = ' *** SEVERE MULTICOLLINEARITY' if vif > 100 else (' * elevated' if vif > 5 else '')
    print(f'  {col}: VIF={vif:.2f}{flag}')

# Preferred specification (poverty excluded)
print('\n=== PREFERRED OLS (poverty excluded due to VIF=894) ===')
X = sm.add_constant(df_clean[['rdi_score', 'rvi_final_score', 'literacy_rate_real']].astype(float))
y = df_clean['cereal_yield_mt_ha'].astype(float)
model = sm.OLS(y, X).fit()
print(f'R²={model.rsquared:.4f}, Adj-R²={model.rsquared_adj:.4f}')
print(f'F={model.fvalue:.3f}, p={model.f_pvalue:.4f}, N={int(model.nobs)}')
print(f'AIC={model.aic:.3f}')
for var in ['rdi_score', 'rvi_final_score', 'literacy_rate_real']:
    c = model.params[var]; se = model.bse[var]; p = model.pvalues[var]
    sig = '***' if p < 0.01 else '**' if p < 0.05 else '*' if p < 0.1 else ''
    print(f'  {var}: β={c:.4f}, SE={se:.4f}, p={p:.4f} {sig}')

# Province FE
print('\n=== WITH PROVINCE FIXED EFFECTS ===')
prov_dum = pd.get_dummies(df_clean['province'], drop_first=True).astype(float)
X_fe = pd.concat([
    df_clean[['rdi_score', 'rvi_final_score', 'literacy_rate_real']].astype(float).reset_index(drop=True),
    prov_dum.reset_index(drop=True)
], axis=1)
X_fe_const = sm.add_constant(X_fe)
model_fe = sm.OLS(y.reset_index(drop=True), X_fe_const).fit()
print(f'R²={model_fe.rsquared:.4f}, F={model_fe.fvalue:.3f}, p={model_fe.f_pvalue:.4f}')
for var in ['rdi_score', 'rvi_final_score', 'literacy_rate_real']:
    c = model_fe.params[var]; se = model_fe.bse[var]; p = model_fe.pvalues[var]
    sig = '***' if p < 0.01 else '**' if p < 0.05 else '*' if p < 0.1 else ''
    print(f'  {var}: β={c:.4f}, SE={se:.4f}, p={p:.4f} {sig}')

# Border district robustness
print('\n=== BORDER DISTRICT ROBUSTNESS (N=71) ===')
border = ['Kanchanpur', 'Kailali', 'Jhapa', 'Mahottari']
df_nb = df_clean[~df_clean['district'].isin(border)]
X_nb = sm.add_constant(df_nb[['rdi_score', 'rvi_final_score', 'literacy_rate_real']].astype(float))
y_nb = df_nb['cereal_yield_mt_ha'].astype(float)
m_nb = sm.OLS(y_nb, X_nb).fit()
print(f'N={len(df_nb)}, R²={m_nb.rsquared:.4f}, F={m_nb.fvalue:.3f}')
for var in ['rdi_score', 'rvi_final_score', 'literacy_rate_real']:
    c = m_nb.params[var]; se = m_nb.bse[var]; p = m_nb.pvalues[var]
    sig = '***' if p < 0.01 else '**' if p < 0.05 else '*' if p < 0.1 else ''
    print(f'  {var}: β={c:.4f}, SE={se:.4f}, p={p:.4f} {sig}')

# Threshold sensitivity
print('\n=== THRESHOLD SENSITIVITY ===')
scenarios = [
    (20, df['cereal_yield_mt_ha'].median(), '>20%', 'Median'),
    (25, df['cereal_yield_mt_ha'].mean(), '>25% (baseline)', 'Mean'),
    (30, df['cereal_yield_mt_ha'].mean(), '>30%', 'Mean'),
    (25, df['cereal_yield_mt_ha'].quantile(0.75), '>25%', '75th pct'),
]
print(f"{'Migration':>15} {'Yield':>15} {'Paradox':>10} {'Resilient':>10} {'Struct Poor':>12} {'Stable':>8}")
for mt, yt, ml, yl in scenarios:
    pz = len(df[(df['absent_hh_rate'] > mt) & (df['cereal_yield_mt_ha'] <= yt)])
    rs = len(df[(df['absent_hh_rate'] > mt) & (df['cereal_yield_mt_ha'] > yt)])
    sp = len(df[(df['absent_hh_rate'] <= mt) & (df['cereal_yield_mt_ha'] <= yt)])
    st = len(df[(df['absent_hh_rate'] <= mt) & (df['cereal_yield_mt_ha'] > yt)])
    print(f'{ml:>15} {yl:>15} {pz:>10} {rs:>10} {sp:>12} {st:>8}')

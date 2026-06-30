"""
Step 1: Extract district-level cereal yield data from MoALD PDF
Source: MoALD Statistical Information on Nepalese Agriculture 2079/80 (2022/23)
Download from: https://giwmscdnone.gov.np/media/pdf_upload/MOALD-Statical-Book-Magre-2081-Final_wgfs8ph.pdf
Save the PDF as: data/raw/MOALD_2022_23.pdf
"""

import pdfplumber
import re
import pandas as pd
import os

os.makedirs('data/raw', exist_ok=True)
os.makedirs('data/processed', exist_ok=True)

PDF_PATH = 'data/raw/MOALD_2022_23.pdf'

# Table 1.3 spans pages 17-19 (0-indexed: 16-18)
# Contains aggregate cereal yield by district

def extract_cereal_yields(pdf_path):
    ag_data = []
    with pdfplumber.open(pdf_path) as pdf:
        for i in [16, 17, 18]:
            page = pdf.pages[i]
            text = page.extract_text()
            for line in text.split('\n'):
                line = line.strip()
                m = re.match(
                    r'^([A-Z]+)\s+([A-Z][A-Z\s]+?)\s+([\d,]+)\s+([\d,]+)\s+([\d.]+)$',
                    line
                )
                if m:
                    province = m.group(1).strip()
                    district = m.group(2).strip()
                    area = int(m.group(3).replace(',', ''))
                    production = int(m.group(4).replace(',', ''))
                    yield_val = float(m.group(5))
                    if 'SUBTOTAL' not in district and province not in ['N', 'NEPAL']:
                        ag_data.append({
                            'district_ag': district,
                            'cereal_area_ha': area,
                            'cereal_production_mt': production,
                            'cereal_yield_mt_ha': yield_val,
                        })
    return pd.DataFrame(ag_data)

# Handle split districts (post-2015 constitution)
# Nawalparasi East + West -> Nawalparasi
# Rukum East + West -> Rukum
SPLIT_PARTNERS = {
    'NAWALPARASI WEST': 'NAWALPARASI EAST',
    'RUKUM WEST': 'RUKUM EAST',
}

NAME_MAP = {
    'TAPLEJUNG': 'Taplejung', 'SANKHUWASABHA': 'Sankhuwasabha',
    'SOLUKHUMBU': 'Solukhumbu', 'PANCHTHAR': 'Panchthar',
    'ILLAM': 'Ilam', 'TERHATHUM': 'Tehrathum',
    'DHANKUTA': 'Dhankuta', 'BHOJPUR': 'Bhojpur',
    'KHOTANG': 'Khotang', 'OKHALDHUNGA': 'Okhaldhunga',
    'UDAYAPUR': 'Udayapur', 'JHAPA': 'Jhapa',
    'MORANG': 'Morang', 'SUNSARI': 'Sunsari',
    'SAPTARI': 'Saptari', 'SIRAHA': 'Siraha',
    'DHANUSHA': 'Dhanusa', 'MAHOTTARI': 'Mahottari',
    'SARLAHI': 'Sarlahi', 'RAUTAHAT': 'Rautahat',
    'BARA': 'Bara', 'PARSA': 'Parsa',
    'DOLAKHA': 'Dolakha', 'SINDHUPALCHOK': 'Sindhupalchok',
    'RASUWA': 'Rasuwa', 'RAMECHAP': 'Ramechhap',
    'SINDHULI': 'Sindhuli', 'KAVRE': 'Kavre',
    'BHAKTAPUR': 'Bhaktapur', 'LALITPUR': 'Lalitpur',
    'KATHMANDU': 'Kathmandu', 'NUWAKOT': 'Nuwakot',
    'DHADING': 'Dhading', 'MAKWANPUR': 'Makwanpur',
    'CHITWAN': 'Chitwan', 'MANANG': 'Manang',
    'MUSTANG': 'Mustang', 'GORKHA': 'Gorkha',
    'LAMJUNG': 'Lamjung', 'TANAHU': 'Tanahu',
    'KASKI': 'Kaski', 'PARBAT': 'Parbat',
    'SYANGJA': 'Syangja', 'MYAGDI': 'Myagdi',
    'BAGLUNG': 'Baglung', 'NAWALPARASI EAST': 'Nawalparasi',
    'PALPA': 'Palpa', 'GULMI': 'Gulmi',
    'ARGHAKHANCHI': 'Arghakhanchi', 'RUPANDEHI': 'Rupandehi',
    'KAPILBASTU': 'Kapilbastu', 'DANG': 'Dang',
    'BANKE': 'Banke', 'BARDIYA': 'Bardiya',
    'RUKUM EAST': 'Rukum', 'PYUTHAN': 'Pyuthan',
    'ROLPA': 'Rolpa', 'DOLPA': 'Dolpa',
    'MUGU': 'Mugu', 'HUMLA': 'Humla',
    'JUMLA': 'Jumla', 'KALIKOT': 'Kalikot',
    'SALYAN': 'Salyan', 'JAJARKOT': 'Jajarkot',
    'DAILEKH': 'Dailekh', 'SURKHET': 'Surkhet',
    'BAJURA': 'Bajura', 'BAJHANG': 'Bajhang',
    'DARCHULA': 'Darchula', 'ACHHAM': 'Achham',
    'DOTI': 'Doti', 'BAITADI': 'Baitadi',
    'DADELDHURA': 'Dadeldhura', 'KAILALI': 'Kailali',
    'KANCHANPUR': 'Kanchanpur',
}

if __name__ == '__main__':
    print('Extracting cereal yield data from MoALD PDF...')
    df = extract_cereal_yields(PDF_PATH)

    # Merge split districts
    split_acc = {}
    final_rows = []
    for _, row in df.iterrows():
        name = row['district_ag']
        partner = SPLIT_PARTNERS.get(name)
        if partner:
            if partner not in split_acc:
                split_acc[partner] = {'area': 0, 'prod': 0}
            split_acc[partner]['area'] += row['cereal_area_ha']
            split_acc[partner]['prod'] += row['cereal_production_mt']
        else:
            if name not in split_acc:
                split_acc[name] = {'area': 0, 'prod': 0}
            split_acc[name]['area'] += row['cereal_area_ha']
            split_acc[name]['prod'] += row['cereal_production_mt']

    records = []
    for ag_name, vals in split_acc.items():
        atlas_name = NAME_MAP.get(ag_name)
        if atlas_name and vals['area'] > 0:
            records.append({
                'district': atlas_name,
                'cereal_area_ha': vals['area'],
                'cereal_production_mt': vals['prod'],
                'cereal_yield_mt_ha': round(vals['prod'] / vals['area'], 2),
                'ag_data_year': '2022/23',
                'ag_source': 'MoALD Statistical Information on Nepalese Agriculture 2079/80',
            })

    out = pd.DataFrame(records).sort_values('district').reset_index(drop=True)
    out.to_csv('data/processed/moald_yields_2022_23.csv', index=False)
    print(f'Saved {len(out)} districts to data/processed/moald_yields_2022_23.csv')

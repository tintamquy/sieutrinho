# Re-examine doc to find station markers
content = open(r'D:\Projects\sieutrinho\100_Diem_Neo_Co_The.doc', encoding='utf-8').read()

import re

rows = re.findall(r'<tr[^>]*>(.*?)</tr>', content, re.IGNORECASE | re.DOTALL)
print(f'Total table rows: {len(rows)}')
print('=' * 60)

for i, r in enumerate(rows):
    cols = re.findall(r'<td[^>]*>(.*?)</td>', r, re.IGNORECASE | re.DOTALL)
    cols_clean = []
    for c in cols:
        t = re.sub(r'<[^>]+>', ' ', c).replace('&nbsp;', ' ')
        t = re.sub(r'\s+', ' ', t).strip()
        cols_clean.append(t)
    
    has_colspan = 'colspan' in r.lower()
    
    if cols_clean:
        prefix = "[COLSPAN] " if has_colspan else f"Row {i:3d}: "
        # Print all rows
        print(prefix + ' | '.join([c[:60] for c in cols_clean]))

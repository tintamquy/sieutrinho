import re, json, sys
sys.stdout.reconfigure(encoding='utf-8')

content = open(r'D:\Projects\sieutrinho\100_Diem_Neo_Co_The.doc', encoding='utf-8').read()

# Strategy: split by <table> blocks.
# Before each table is a paragraph with the station name.
# Find all <p>/<h*> texts and <table> blocks in document order.

# Tokenize: find all paragraphs and tables in order
tokens = []
pos = 0

# Find all block-level elements: p, h1-h6, table
pattern = re.compile(r'(<(?:p|h[1-6]|table)[^>]*>.*?</(?:p|h[1-6]|table)>)', re.IGNORECASE | re.DOTALL)

for m in pattern.finditer(content):
    tag_match = re.match(r'<(p|h[1-6]|table)', m.group(0), re.IGNORECASE)
    tag = tag_match.group(1).lower() if tag_match else ''
    text = re.sub(r'<[^>]+>', ' ', m.group(0)).replace('&nbsp;', ' ')
    text = re.sub(r'\s+', ' ', text).strip()
    tokens.append((tag, text, m.group(0)))

print(f"Total tokens: {len(tokens)}")

# Print all non-table tokens (paragraph/heading)
for i, (tag, text, raw) in enumerate(tokens):
    if tag != 'table' and text:
        print(f"[{tag.upper()}] {text[:100]}")

# Now parse with station context
all_data = []
current_station_name = ''
current_station_id = 0

for tag, text, raw in tokens:
    if tag == 'table':
        # Parse rows of this table
        rows = re.findall(r'<tr[^>]*>(.*?)</tr>', raw, re.IGNORECASE | re.DOTALL)
        for r in rows:
            cols = re.findall(r'<td[^>]*>(.*?)</td>', r, re.IGNORECASE | re.DOTALL)
            cols_clean = []
            for c in cols:
                t = re.sub(r'<[^>]+>', ' ', c).replace('&nbsp;', ' ')
                t = re.sub(r'\s+', ' ', t).strip()
                cols_clean.append(t)
            cols_clean = [c for c in cols_clean if c]
            if cols_clean and cols_clean[0].isdigit():
                stt = int(cols_clean[0])
                if 1 <= stt <= 100:
                    num = str(stt - 1).zfill(2)
                    anchor = cols_clean[1] if len(cols_clean) > 1 else ''
                    desc = cols_clean[2] if len(cols_clean) > 2 else ''
                    all_data.append({
                        'num': num,
                        'stt': stt,
                        'anchor': anchor,
                        'description': desc,
                        'station_name': current_station_name,
                        'station_id': current_station_id,
                    })
    elif tag in ('p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
        # Check if this is a station heading (contains Trạm or station-like keyword)
        t_up = text.upper()
        if 'TR' in t_up and ('M' in t_up) and len(text) > 3 and len(text) < 200:
            current_station_id += 1
            current_station_name = text
            print(f"  -> Station {current_station_id}: {text[:80]}")

print(f"\nTotal data items: {len(all_data)}")

# Show station mapping
stations_seen = {}
for item in all_data:
    sid = item['station_id']
    if sid not in stations_seen:
        stations_seen[sid] = {'name': item['station_name'], 'nums': []}
    stations_seen[sid]['nums'].append(item['num'])

print("\nStations:")
for sid, info in sorted(stations_seen.items()):
    nums = info['nums']
    print(f"  Station {sid}: '{info['name']}' -> {nums[0]}-{nums[-1]} ({len(nums)} items)")

# Save
with open(r'D:\Projects\sieutrinho\body_anchors_with_stations.json', 'w', encoding='utf-8') as f:
    json.dump(all_data, f, ensure_ascii=False, indent=2)
print("\nSaved!")

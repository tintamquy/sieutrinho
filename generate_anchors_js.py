import json, re

# Colors for each station (10 stations)
COLORS = ['#4f46e5','#7c3aed','#059669','#d97706','#dc2626','#0891b2','#65a30d','#e11d48','#7c2d12','#6b7280']

# Load the parsed data with correct stations from doc
data = json.load(open(r'D:\Projects\sieutrinho\body_anchors_with_stations.json', encoding='utf-8'))

# Get unique stations (ordered by first appearance)
seen_ids = []
stations_raw = {}
for item in data:
    sid = item['station_id']
    if sid not in seen_ids:
        seen_ids.append(sid)
        stations_raw[sid] = {'name': item['station_name'], 'items': []}
    stations_raw[sid]['items'].append(item)

# seen_ids starts at 2 (intro paragraph got id=1), real stations are 2..11
# Map them to 1..10
station_list = []
for i, sid in enumerate(seen_ids):
    info = stations_raw[sid]
    items = info['items']
    nums = [int(it['num']) for it in items]
    real_id = i + 1  # 1-indexed
    
    # Extract emoji from the station name (first char might be emoji)
    name = info['name']
    # Get emoji if present (first 2 chars)
    emoji = ''
    for ch in name[:3]:
        if ord(ch) > 127:
            emoji = ch
            break
    if not emoji:
        emoji = '📍'
    
    station_list.append({
        'id': real_id,
        'name': name,
        'emoji': emoji,
        'color': COLORS[i % len(COLORS)],
        'range': [min(nums), max(nums)],
        'items': items
    })

# Build JS
lines = []
lines.append('// ===== BODY ANCHORS DATA (Memory Palace on Body) =====')
lines.append('// 100 diem neo co the tu 00 den 99')
lines.append('// Ten Tram chinh xac tu file 100_Diem_Neo_Co_The.doc')
lines.append('')

# BODY_ANCHOR_STATIONS
lines.append('const BODY_ANCHOR_STATIONS = [')
for st in station_list:
    name_escaped = st['name'].replace("'", "\\'")
    emoji = st['emoji']
    lines.append(f"    {{ id: {st['id']}, name: '{name_escaped}', range: [{st['range'][0]}, {st['range'][1]}], emoji: '{emoji}', color: '{st['color']}' }},")
lines.append('];')
lines.append('')

# BODY_ANCHORS
lines.append('const BODY_ANCHORS = {')
# Sort all items by num
all_items = sorted(data, key=lambda x: int(x['num']))
for item in all_items:
    num = item['num']
    anchor = item['anchor'].replace("'", "\\'")
    desc = item['description'].replace("'", "\\'")
    # Find which real station this item belongs to
    real_station_id = 0
    for i, sid in enumerate(seen_ids):
        if item['station_id'] == sid:
            real_station_id = i + 1
            break
    lines.append(f"    '{num}': {{ anchor: '{anchor}', description: '{desc}', station: {real_station_id} }},")
lines.append('};')
lines.append('')
lines.append("function getBodyAnchor(code) { return BODY_ANCHORS[code] || null; }")
lines.append("function getStation(code) {")
lines.append("    const anchor = BODY_ANCHORS[code];")
lines.append("    if (!anchor) return null;")
lines.append("    return BODY_ANCHOR_STATIONS.find(s => s.id === anchor.station) || null;")
lines.append("}")

output = '\n'.join(lines)
open(r'D:\Projects\sieutrinho\body-anchors-data.js', 'w', encoding='utf-8').write(output)

# Write summary to log file (UTF-8)
log = []
log.append(f'Total items: {len(all_items)}')
log.append(f'Stations ({len(station_list)}):')
for st in station_list:
    log.append(f"  Tram {st['id']} ({st['range'][0]:02d}-{st['range'][1]:02d}): {st['name']}")
log.append('')
log.append('First 5 items:')
for item in all_items[:5]:
    log.append(f"  {item['num']}: {item['anchor']} | {item['description'][:50]}")
log.append('Last 5 items:')
for item in all_items[-5:]:
    log.append(f"  {item['num']}: {item['anchor']} | {item['description'][:50]}")

open(r'D:\Projects\sieutrinho\generation_log.txt', 'w', encoding='utf-8').write('\n'.join(log))
print('Done! Check generation_log.txt and body-anchors-data.js')

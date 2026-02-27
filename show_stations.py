import json, sys
sys.stdout.reconfigure(encoding='utf-8')

data = json.load(open(r'D:\Projects\sieutrinho\body_anchors_with_stations.json', encoding='utf-8'))
stations = {}
for item in data:
    sid = item['station_id']
    if sid not in stations:
        stations[sid] = {'name': item['station_name'], 'nums': []}
    stations[sid]['nums'].append(item['num'])

result = []
for sid, info in sorted(stations.items()):
    nums = info['nums']
    result.append({
        'id': sid,
        'name': info['name'],
        'first': nums[0],
        'last': nums[-1],
        'count': len(nums)
    })

# Write to file
with open(r'D:\Projects\sieutrinho\stations_list.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

for r in result:
    print(f"Station {r['id']} ({r['first']}-{r['last']}, {r['count']} items): {r['name']}")

import json

# Read the parsed JSON (from the .doc file)
content = open(r'D:\Projects\sieutrinho\body_anchors_parsed.json', encoding='utf-8-sig').read()
data = json.loads(content)

# Print all items to verify exact data
print(f'Total items: {len(data)}')
for item in data:
    print(f"{item['num']} | {item['anchor']} | {item['description']}")

import urllib.request
import re
import json

queries = [
    "african+software+developer",
    "nigerian+tech",
    "black+software+engineer",
    "african+photographer",
    "african+office+team",
    "black+creative+director"
]

found_ids = set()
for q in queries:
    url = f"https://unsplash.com/napi/search/photos?query={q}&per_page=15"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            for r in data.get('results', []):
                pid = r.get('id')
                desc = r.get('alt_description') or r.get('description') or ''
                user = r.get('user', {}).get('name', '')
                loc = r.get('user', {}).get('location', '')
                img_url = r.get('urls', {}).get('regular', '')
                print(f"ID: {pid} | User: {user} ({loc}) | Desc: {desc[:60]} | URL: {img_url}")
    except Exception as e:
        print(f"Error for {q}: {e}")

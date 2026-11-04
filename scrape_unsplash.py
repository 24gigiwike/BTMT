import urllib.request
import re

queries = [
    "african-developer",
    "nigerian-office",
    "black-photographer",
    "african-creative",
    "black-business-team"
]

for q in queries:
    url = f"https://unsplash.com/s/photos/{q}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            # Look for photo IDs or image URLs in the html
            # e.g. https://images.unsplash.com/photo-[0-9a-f\-]+
            urls = re.findall(r'https://images\.unsplash\.com/photo-[0-9a-zA-Z\-]+', html)
            unique_urls = list(dict.fromkeys(urls))[:6]
            print(f"=== {q} ===")
            for u in unique_urls:
                print(u)
    except Exception as e:
        print(f"Error {q}: {e}")

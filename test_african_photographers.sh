mkdir -p public/assets/images/candidates

# Photos from WOCinTech Chat collection:
# photo-1573164713988-8665fc963095: verified Black female systems engineer at server racks
# Let's get other specific IDs from WOCinTech:
curl -s -L "https://images.unsplash.com/photo-1573164713619-24c711fe7878?auto=format&fit=crop&w=1200&q=80" -o public/assets/images/candidates/woc_1.jpg
curl -s -L "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1200&q=80" -o public/assets/images/candidates/woc_2.jpg
curl -s -L "https://images.unsplash.com/photo-1573166364524-d9dbfd8bbf83?auto=format&fit=crop&w=1200&q=80" -o public/assets/images/candidates/woc_3.jpg
curl -s -L "https://images.unsplash.com/photo-1573165231977-3f0e2780604a?auto=format&fit=crop&w=1200&q=80" -o public/assets/images/candidates/woc_4.jpg
curl -s -L "https://images.unsplash.com/photo-1573167101669-476636b96cea?auto=format&fit=crop&w=1200&q=80" -o public/assets/images/candidates/woc_5.jpg
curl -s -L "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=1200&q=80" -o public/assets/images/candidates/woc_6.jpg
curl -s -L "https://images.unsplash.com/photo-1573165853977-849567990104?auto=format&fit=crop&w=1200&q=80" -o public/assets/images/candidates/woc_7.jpg
curl -s -L "https://images.unsplash.com/photo-1573164713712-03790a178651?auto=format&fit=crop&w=1200&q=80" -o public/assets/images/candidates/woc_8.jpg

# Black / African business & developer photos:
curl -s -L "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" -o public/assets/images/candidates/team_9.jpg
curl -s -L "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=1200&q=80" -o public/assets/images/candidates/team_10.jpg
curl -s -L "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80" -o public/assets/images/candidates/team_11.jpg
curl -s -L "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&w=1200&q=80" -o public/assets/images/candidates/team_12.jpg

# Nigerian tech workspaces / developers:
curl -s -L "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=1200&q=80" -o public/assets/images/candidates/nig_13.jpg
curl -s -L "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80" -o public/assets/images/candidates/nig_14.jpg

ls -lh public/assets/images/candidates/

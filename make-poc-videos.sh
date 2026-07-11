#!/usr/bin/env bash
# Genereert de hover-preview-video's voor de PoC-kaarten: van elke live PoC-demo
# een screenshot van het bovenste stuk -> ffmpeg scrollt er 15s doorheen ("de
# start van navigeren op de pagina") -> videos/poc/<slug>.mp4 (muted, klein).
set -u
cd "$(dirname "$0")"
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
FFMPEG="/c/ffmpeg/ffmpeg-master-latest-win64-gpl/bin/ffmpeg"
SP="C:/Users/nicol/AppData/Local/Temp/claude/C--Users-nicol-Projects/7e22b6e7-b5d4-491a-89aa-a61b5ec11398/scratchpad/pocshots"
mkdir -p "$SP" videos/poc
BASE="https://cloesick.github.io/antwerp-poc-portfolio"
DUR=15
SLUGS="amaral bourgogne-wijnen floriplant harlekijn helios kikker-en-ko la-praline larose wit-zwart-deli"
for s in $SLUGS; do
  if [ -f "videos/poc/$s.mp4" ]; then echo "= $s (bestaat al)"; continue; fi
  echo ">> $s"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-first-run \
    --user-data-dir="$SP/cp-$s" --window-size=1280,2600 --virtual-time-budget=9000 \
    --screenshot="$SP/$s.png" "$BASE/$s/" 2>/dev/null
  if [ ! -s "$SP/$s.png" ]; then echo "   screenshot mislukt, skip"; continue; fi
  "$FFMPEG" -y -loop 1 -i "$SP/$s.png" -t $DUR -r 30 \
    -vf "crop=1280:720:0:'(t/$DUR)*(ih-720)',scale=960:540,format=yuv420p" \
    -c:v libx264 -preset veryfast -movflags +faststart "videos/poc/$s.mp4" >/dev/null 2>&1
  echo "   -> videos/poc/$s.mp4 ($(ls -la videos/poc/$s.mp4 2>/dev/null | awk '{print $5}') bytes)"
done
echo "KLAAR: $(ls videos/poc/*.mp4 2>/dev/null | wc -l)/9 video's"

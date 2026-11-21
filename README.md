# Firefly Hollow — Spot the Difference

An original spot-the-difference game: two near-identical hand-drawn SVG
pictures side by side, 10 hidden differences per chapter, across 3 chapters:

1. **Twilight Garden** (180s, gentle) — willow, pond, lanterns, one smug cat
2. **Ember Café** (150s, trickier) — rainy window, chalkboard menu, sleeping cat
3. **Starlight Observatory** (120s, sharp eyes) — telescope, ringed planet, comet

Click a difference on either picture to circle it in gold. Wrong clicks cost
points and break your combo; hints (3 per chapter) pulse a ring near a
remaining difference. Score, combo, countdown timer with time bonus, and
synthesized WebAudio sounds (no audio files). Keyboard: H hint, R restart,
1–3 chapters, M sound, Esc menu.

All art is original SVG drawn in code, all sound is synthesized in the
browser. No network requests, no external assets, no libraries.

## Play

Serve `game/` with any static server and open `index.html` in desktop Chrome,
for example:

```
cd game && python3 -m http.server 8080
```

## Entry

`main.ts` (Node 22) copies `game/` and `screenshots/` to `/output` and writes
`/output/dossier.json` with the vendored `vendor/makefun-game.ts` library.

SPDX-License-Identifier: MIT

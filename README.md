# Firefly Hollow — Spot the Difference

[![make.fun · best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/jonnn969/spot-difference-01/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/jonnn969/spot-difference-01/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)

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

---

<sub>Entered on [make.fun](https://make.fun/?ref=96035cfz&utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451) · AI agents build software for cash rewards</sub>

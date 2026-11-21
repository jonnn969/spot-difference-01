// Chapter 1 — Twilight Garden. A dusk garden with a willow, a pond, lanterns
// and one very smug cat. render(on) draws the scene; `on` is the set of
// difference ids that are ACTIVE in this panel (left panel: none, right: all).
import { s, glowDot, star, flower } from './scenes.js';

export const gardenScene = {
  id: 'garden',
  title: 'Twilight Garden',
  differences: [
    { id: 'moon', name: 'The moon', x: 472, y: 72, r: 36 },
    { id: 'lantern', name: 'The paper lantern', x: 150, y: 170, r: 26 },
    { id: 'mushroom', name: 'The mushroom spots', x: 95, y: 415, r: 30 },
    { id: 'butterfly', name: 'The butterfly', x: 300, y: 380, r: 26 },
    { id: 'cattail', name: "The cat's tail", x: 415, y: 285, r: 28 },
    { id: 'fish', name: 'The pond fish', x: 430, y: 428, r: 30 },
    { id: 'birdhouse', name: 'The birdhouse door', x: 505, y: 192, r: 24 },
    { id: 'tulip', name: 'The tulip', x: 210, y: 440, r: 24 },
    { id: 'firefly', name: 'The extra firefly', x: 150, y: 210, r: 18 },
    { id: 'stone', name: 'The stepping stone', x: 350, y: 472, r: 22 },
  ],

  render(on) {
    const has = (id) => on.has(id);
    let g = '';

    // --- Dusk sky -------------------------------------------------------
    g += `<defs><linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#232a52"/><stop offset=".55" stop-color="#7a5a9e"/>
      <stop offset="1" stop-color="#ff9e7d"/></linearGradient></defs>`;
    g += s('rect', { x: 0, y: 0, width: 560, height: 340, fill: 'url(#dusk)' });

    // Stars.
    [[40, 40], [110, 70], [200, 34], [290, 60], [360, 30], [520, 130], [90, 120], [330, 110], [250, 90]]
      .forEach(([x, y]) => { g += star(x, y, 4, '#ffe9b0'); });
    g += glowDot(60, 200, 2.5, '#ffe9b0') + glowDot(330, 150, 2.5, '#ffe9b0');

    // Moon: full, or a crescent when the difference is active.
    g += s('circle', { cx: 472, cy: 72, r: 34, fill: '#ffe9b0' });
    g += s('circle', { cx: 472, cy: 72, r: 30, fill: '#ffe9b0', opacity: 0.25 });
    if (has('moon')) g += s('circle', { cx: 486, cy: 62, r: 30, fill: '#4a3a72' });

    // --- Hills and pond ---------------------------------------------------
    g += s('path', { d: 'M 0 320 Q 140 270 280 310 T 560 300 L 560 500 L 0 500 Z', fill: '#3a7d5a' });
    g += s('path', { d: 'M 0 380 Q 180 340 340 375 T 560 365 L 560 500 L 0 500 Z', fill: '#2c6447' });
    g += s('ellipse', { cx: 430, cy: 432, rx: 108, ry: 44, fill: '#6fb7cf' });
    g += s('ellipse', { cx: 430, cy: 432, rx: 108, ry: 44, fill: 'none', stroke: '#a8d8e8', 'stroke-width': 2, opacity: 0.6 });
    g += s('path', { d: 'M 380 425 q 20 -6 40 0 M 420 442 q 20 -6 40 0', stroke: '#d6eef7', 'stroke-width': 2, fill: 'none', opacity: 0.8 });
    if (has('fish')) {
      g += s('ellipse', { cx: 430, cy: 428, rx: 13, ry: 6, fill: '#ff8c42' });
      g += s('polygon', { points: '417,428 406,421 406,435', fill: '#ff8c42' });
      g += s('circle', { cx: 438, cy: 426, r: 1.6, fill: '#1d1626' });
    }

    // --- Willow tree (left) ----------------------------------------------
    g += s('path', { d: 'M 78 340 C 70 280 62 230 58 165 C 56 150 74 148 76 162 C 82 220 92 280 96 340 Z', fill: '#5a4632' });
    g += s('path', { d: 'M 76 200 C 110 180 150 172 190 178 M 70 240 C 110 232 160 232 205 244', stroke: '#5a4632', 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' });
    [[60, 150, 42], [110, 165, 36], [165, 175, 30], [95, 205, 34], [150, 215, 28], [200, 205, 24], [45, 205, 26]]
      .forEach(([x, y, r]) => { g += s('circle', { cx: x, cy: y, r, fill: '#4c9a5f', opacity: 0.92 }); });
    [[85, 165, 20], [135, 190, 18], [180, 195, 15]]
      .forEach(([x, y, r]) => { g += s('circle', { cx: x, cy: y, r, fill: '#67b574', opacity: 0.9 }); });

    // Paper lantern hanging from the willow branch.
    const lanternLit = !has('lantern');
    g += s('line', { x1: 150, y1: 178, x2: 150, y2: 152, stroke: '#3a2c22', 'stroke-width': 2 });
    g += glowDot(150, 170, 6, '#ffd166', lanternLit ? 0.9 : 0);
    g += s('ellipse', { cx: 150, cy: 170, rx: 15, ry: 18, fill: lanternLit ? '#ffd166' : '#8a7f8e' });
    g += s('path', { d: 'M 138 162 h 24 M 138 170 h 24 M 138 178 h 24', stroke: lanternLit ? '#d99a2b' : '#6b6172', 'stroke-width': 1.5 });
    // Second lantern, always lit, smaller.
    g += s('line', { x1: 225, y1: 200, x2: 225, y2: 182, stroke: '#3a2c22', 'stroke-width': 2 });
    g += glowDot(225, 212, 5, '#ffd166');
    g += s('ellipse', { cx: 225, cy: 212, rx: 11, ry: 13, fill: '#ffd166' });

    // The extra firefly only exists in the changed picture.
    if (has('firefly')) g += glowDot(150, 210, 3, '#d8ff7a');
    g += glowDot(250, 300, 3, '#d8ff7a') + glowDot(330, 250, 2.5, '#d8ff7a') + glowDot(480, 330, 2.5, '#d8ff7a');

    // --- Fence and the smug cat -------------------------------------------
    g += s('path', { d: 'M 300 330 h 240 M 300 356 h 240', stroke: '#7a5c40', 'stroke-width': 6, 'stroke-linecap': 'round' });
    [315, 395, 475, 535].forEach((x) => { g += s('rect', { x: x - 4, y: 312, width: 8, height: 58, rx: 3, fill: '#8a6a48' }); });
    // Cat body sitting on the fence rail.
    g += s('ellipse', { cx: 395, cy: 312, rx: 20, ry: 17, fill: '#2b2338' });
    g += s('circle', { cx: 395, cy: 288, r: 13, fill: '#2b2338' });
    g += s('polygon', { points: '385,279 382,264 392,274', fill: '#2b2338' });
    g += s('polygon', { points: '405,279 408,264 398,274', fill: '#2b2338' });
    g += s('circle', { cx: 390, cy: 287, r: 1.8, fill: '#ffd166' }) + s('circle', { cx: 400, cy: 287, r: 1.8, fill: '#ffd166' });
    // Tail: curled up, or drooping down when the difference is active.
    g += has('cattail')
      ? s('path', { d: 'M 414 322 q 16 6 12 22 q -3 12 -14 10', stroke: '#2b2338', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' })
      : s('path', { d: 'M 414 318 q 18 -8 16 -24 q -1 -10 -12 -8', stroke: '#2b2338', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });

    // --- Birdhouse on its pole --------------------------------------------
    g += s('rect', { x: 501, y: 205, width: 7, height: 110, fill: '#6b4a2f' });
    g += s('polygon', { points: '480,180 530,180 505,158', fill: '#a03d2d' });
    g += s('rect', { x: 484, y: 180, width: 42, height: 34, rx: 3, fill: '#c98d5a' });
    g += has('birdhouse')
      ? s('circle', { cx: 505, cy: 196, r: 6.5, fill: '#c98d5a' }) + s('circle', { cx: 505, cy: 196, r: 1.8, fill: '#6b4a2f' })
      : s('circle', { cx: 505, cy: 196, r: 6.5, fill: '#1d1626' });

    // --- Mushrooms (bottom left) -------------------------------------------
    g += s('rect', { x: 88, y: 428, width: 12, height: 26, rx: 5, fill: '#f3ead8' });
    g += s('path', { d: 'M 62 432 Q 94 396 126 432 Q 94 442 62 432 Z', fill: '#d94f3d' });
    g += s('circle', { cx: 82, cy: 418, r: 4, fill: '#fff' }) + s('circle', { cx: 106, cy: 414, r: 3.5, fill: '#fff' });
    if (!has('mushroom')) g += s('circle', { cx: 95, cy: 424, r: 3, fill: '#fff' });
    g += s('rect', { x: 132, y: 438, width: 9, height: 18, rx: 4, fill: '#f3ead8' });
    g += s('path', { d: 'M 114 441 Q 136 420 158 441 Q 136 448 114 441 Z', fill: '#e8734a' });
    g += s('circle', { cx: 128, cy: 434, r: 2.5, fill: '#fff' }) + s('circle', { cx: 144, cy: 432, r: 2.5, fill: '#fff' });

    // --- Path stones and flowers -------------------------------------------
    [[250, 470], [300, 455], [400, 458]].forEach(([x, y]) => {
      g += s('ellipse', { cx: x, cy: y, rx: 20, ry: 8, fill: '#b9b3a4' });
    });
    if (!has('stone')) g += s('ellipse', { cx: 350, cy: 472, rx: 20, ry: 8, fill: '#b9b3a4' });

    g += flower(210, 440, has('tulip') ? '#9b5de5' : '#e4572e', '#ffd166');
    g += flower(165, 458, '#f4849b', '#fff3b0');
    g += flower(262, 452, '#fff3b0', '#e4572e');
    g += flower(455, 468, '#f4849b', '#fff3b0');
    g += flower(505, 452, '#fff3b0', '#e4572e');

    // --- Butterfly ----------------------------------------------------------
    const wing = has('butterfly') ? '#f4842b' : '#5aa9e6';
    g += s('ellipse', { cx: 290, cy: 372, rx: 12, ry: 16, fill: wing, transform: 'rotate(-24 300 380)' });
    g += s('ellipse', { cx: 310, cy: 372, rx: 12, ry: 16, fill: wing, transform: 'rotate(24 300 380)' });
    g += s('ellipse', { cx: 293, cy: 390, rx: 8, ry: 11, fill: wing, transform: 'rotate(-18 300 388)' });
    g += s('ellipse', { cx: 307, cy: 390, rx: 8, ry: 11, fill: wing, transform: 'rotate(18 300 388)' });
    g += s('ellipse', { cx: 300, cy: 381, rx: 3.5, ry: 12, fill: '#2b2338' });
    g += s('path', { d: 'M 298 370 q -4 -8 -9 -10 M 302 370 q 4 -8 9 -10', stroke: '#2b2338', 'stroke-width': 1.5, fill: 'none' });

    // Grass tufts.
    [[40, 470], [180, 480], [330, 486], [530, 480], [120, 490]].forEach(([x, y]) => {
      g += s('path', { d: `M ${x} ${y} l -4 -12 M ${x} ${y} l 0 -14 M ${x} ${y} l 4 -12`, stroke: '#67b574', 'stroke-width': 2, fill: 'none', 'stroke-linecap': 'round' });
    });
    return g;
  },
};

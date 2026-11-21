// Chapter 2 — Ember Café. A warm little café on a rainy night: chalkboard menu,
// wall clock, pendant lamps, a sleeping cat and a table set for one.
import { s, glowDot, star } from './scenes.js';

export const cafeScene = {
  id: 'cafe',
  title: 'Ember Café',
  differences: [
    { id: 'clock', name: 'The wall clock', x: 455, y: 110, r: 30 },
    { id: 'chalk', name: 'The latte price', x: 305, y: 120, r: 30 },
    { id: 'steam', name: 'The cup steam', x: 215, y: 355, r: 22 },
    { id: 'lamp', name: 'The pendant lamp', x: 340, y: 75, r: 24 },
    { id: 'cattail', name: "The cat's tail", x: 350, y: 395, r: 24 },
    { id: 'pastry', name: 'The pastries', x: 165, y: 385, r: 26 },
    { id: 'plant', name: 'The little plant', x: 395, y: 295, r: 24 },
    { id: 'rain', name: 'The rain', x: 110, y: 160, r: 30 },
    { id: 'book', name: 'The book spine', x: 510, y: 120, r: 22 },
    { id: 'spoon', name: 'The spoon', x: 250, y: 410, r: 18 },
  ],

  render(on) {
    const has = (id) => on.has(id);
    let g = '';

    // --- Room shell ---------------------------------------------------------
    g += s('rect', { x: 0, y: 0, width: 560, height: 365, fill: '#f3e2c7' });
    g += s('rect', { x: 0, y: 365, width: 560, height: 135, fill: '#8a6a48' });
    [390, 415, 440, 465, 490].forEach((y) => {
      g += s('line', { x1: 0, y1: y, x2: 560, y2: y, stroke: '#6b4a2f', 'stroke-width': 2, opacity: 0.5 });
    });
    g += s('rect', { x: 0, y: 360, width: 560, height: 8, fill: '#5a3d24' });

    // --- Window with the rainy street ---------------------------------------
    g += s('rect', { x: 28, y: 58, width: 168, height: 208, rx: 6, fill: '#3a2c22' });
    g += s('rect', { x: 38, y: 68, width: 148, height: 188, fill: '#1e2a52' });
    g += s('circle', { cx: 160, cy: 100, r: 18, fill: '#ffe9b0' });
    [[60, 90], [90, 80], [120, 110], [70, 130], [150, 150]].forEach(([x, y]) => { g += star(x, y, 3, '#ffe9b0'); });
    // Streetlamp glow outside.
    g += glowDot(80, 210, 8, '#ffd166');
    g += s('rect', { x: 76, y: 210, width: 4, height: 46, fill: '#2b2338' });
    g += s('circle', { cx: 78, cy: 206, r: 7, fill: '#ffd166' });
    // Rain streaks only in the changed picture.
    if (has('rain')) {
      [[55, 120], [75, 100], [100, 140], [130, 95], [155, 125], [95, 170], [140, 175], [65, 180]]
        .forEach(([x, y]) => { g += s('line', { x1: x, y1: y, x2: x - 5, y2: y + 16, stroke: '#a8d8e8', 'stroke-width': 2, opacity: 0.8, 'stroke-linecap': 'round' }); });
    }
    g += s('line', { x1: 112, y1: 68, x2: 112, y2: 256, stroke: '#3a2c22', 'stroke-width': 5 });
    g += s('line', { x1: 38, y1: 162, x2: 186, y2: 162, stroke: '#3a2c22', 'stroke-width': 5 });
    g += s('rect', { x: 20, y: 266, width: 184, height: 12, rx: 4, fill: '#6b4a2f' });

    // --- Chalkboard menu ------------------------------------------------------
    g += s('rect', { x: 228, y: 66, width: 156, height: 118, rx: 8, fill: '#2f3d33' });
    g += s('rect', { x: 228, y: 66, width: 156, height: 118, rx: 8, fill: 'none', stroke: '#8a6a48', 'stroke-width': 5 });
    g += s('text', { x: 306, y: 96, 'text-anchor': 'middle', fill: '#f3ead8', 'font-size': 17, 'font-family': 'Georgia, serif', 'font-weight': 'bold' }, 'MENU');
    g += s('text', { x: 246, y: 126, fill: '#f3ead8', 'font-size': 14, 'font-family': 'Georgia, serif' }, 'LATTE');
    g += s('text', { x: 366, y: 126, 'text-anchor': 'end', fill: '#f3ead8', 'font-size': 14, 'font-family': 'Georgia, serif' }, has('chalk') ? '35' : '25');
    g += s('text', { x: 246, y: 152, fill: '#f3ead8', 'font-size': 14, 'font-family': 'Georgia, serif' }, 'MOCHA');
    g += s('text', { x: 366, y: 152, 'text-anchor': 'end', fill: '#f3ead8', 'font-size': 14, 'font-family': 'Georgia, serif' }, '30');
    g += s('text', { x: 246, y: 174, fill: '#ffd166', 'font-size': 12, 'font-family': 'Georgia, serif', 'font-style': 'italic' }, 'fresh pie today!');

    // --- Wall clock: 3:00, or 4:30 when the difference is active -------------
    g += s('circle', { cx: 455, cy: 110, r: 30, fill: '#fff8e8', stroke: '#3a2c22', 'stroke-width': 4 });
    [[455, 84], [481, 110], [455, 136], [429, 110]].forEach(([x, y]) => {
      g += s('circle', { cx: x, cy: y, r: 2.5, fill: '#3a2c22' });
    });
    if (has('clock')) {
      g += s('line', { x1: 455, y1: 110, x2: 455, y2: 134, stroke: '#3a2c22', 'stroke-width': 3, 'stroke-linecap': 'round' });
      g += s('line', { x1: 455, y1: 110, x2: 472, y2: 120, stroke: '#3a2c22', 'stroke-width': 4, 'stroke-linecap': 'round' });
    } else {
      g += s('line', { x1: 455, y1: 110, x2: 455, y2: 86, stroke: '#3a2c22', 'stroke-width': 3, 'stroke-linecap': 'round' });
      g += s('line', { x1: 455, y1: 110, x2: 477, y2: 110, stroke: '#3a2c22', 'stroke-width': 4, 'stroke-linecap': 'round' });
    }
    g += s('circle', { cx: 455, cy: 110, r: 3, fill: '#d94f3d' });

    // --- Bookshelf --------------------------------------------------------------
    g += s('rect', { x: 462, y: 160, width: 86, height: 120, fill: '#6b4a2f' });
    [178, 218, 258].forEach((y) => { g += s('rect', { x: 466, y, width: 78, height: 5, fill: '#8a6a48' }); });
    const books = [
      [470, 168, '#d94f3d'], [482, 166, '#5aa9e6'], [494, 169, '#e8b64c'],
      [506, 167, has('book') ? '#3e9e5c' : '#d94f3d'], [518, 168, '#9b5de5'], [530, 167, '#67b574'],
    ];
    books.forEach(([x, y, c]) => { g += s('rect', { x, y: y - 6, width: 10, height: 20, rx: 1.5, fill: c }); });
    g += s('rect', { x: 472, y: 196, width: 26, height: 20, rx: 2, fill: '#5aa9e6', transform: 'rotate(-12 485 206)' });
    g += s('rect', { x: 500, y: 200, width: 34, height: 16, rx: 2, fill: '#e8b64c' });
    g += s('circle', { cx: 528, cy: 240, r: 9, fill: '#f4849b' });

    // --- Pendant lamps ------------------------------------------------------------
    [[270, true], [340, !has('lamp')]].forEach(([x, lit]) => {
      g += s('line', { x1: x, y1: 0, x2: x, y2: 52, stroke: '#3a2c22', 'stroke-width': 2.5 });
      g += glowDot(x, 74, 7, '#ffd166', lit ? 0.9 : 0);
      g += s('path', { d: `M ${x - 14} 56 L ${x + 14} 56 L ${x + 8} 74 L ${x - 8} 74 Z`, fill: lit ? '#d99a2b' : '#6b6172' });
      g += s('circle', { cx: x, cy: 78, r: 5, fill: lit ? '#fff3b0' : '#8a7f8e' });
    });

    // --- Counter with espresso machine ----------------------------------------------
    g += s('rect', { x: 400, y: 330, width: 160, height: 130, fill: '#7a5c40' });
    g += s('rect', { x: 400, y: 330, width: 160, height: 12, fill: '#a97e52' });
    g += s('rect', { x: 420, y: 268, width: 70, height: 62, rx: 6, fill: '#3a2c22' });
    g += s('rect', { x: 432, y: 280, width: 46, height: 18, rx: 3, fill: '#8a7f8e' });
    g += s('circle', { cx: 455, cy: 314, r: 5, fill: '#d94f3d' });
    g += s('rect', { x: 500, y: 292, width: 34, height: 38, rx: 4, fill: '#e8b64c' });
    g += s('rect', { x: 500, y: 292, width: 34, height: 10, rx: 4, fill: '#d99a2b' });
    // Little plant on the counter: a bloom, or a closed bud.
    g += s('rect', { x: 388, y: 306, width: 18, height: 24, rx: 3, fill: '#d94f3d' });
    g += s('path', { d: 'M 397 306 q -2 -14 0 -22', stroke: '#3e7d4e', 'stroke-width': 2.5, fill: 'none' });
    if (has('plant')) {
      g += s('circle', { cx: 397, cy: 280, r: 5, fill: '#67b574' });
    } else {
      g += s('circle', { cx: 391, cy: 280, r: 4, fill: '#f4849b' }) + s('circle', { cx: 403, cy: 280, r: 4, fill: '#f4849b' })
        + s('circle', { cx: 397, cy: 275, r: 4, fill: '#f4849b' }) + s('circle', { cx: 397, cy: 281, r: 3, fill: '#ffd166' });
    }

    // --- Round table: cup, pastries, spoon ------------------------------------------
    g += s('ellipse', { cx: 200, cy: 462, rx: 118, ry: 24, fill: '#a03d2d' });
    g += s('ellipse', { cx: 200, cy: 456, rx: 118, ry: 22, fill: '#c9563f' });
    g += s('rect', { x: 192, y: 478, width: 16, height: 16, fill: '#6b4a2f' });
    // Plate of pastries: three, or two when the difference is active.
    g += s('ellipse', { cx: 165, cy: 392, rx: 42, ry: 10, fill: '#f3ead8' });
    const pastryXs = has('pastry') ? [152, 178] : [145, 165, 185];
    pastryXs.forEach((x) => {
      g += s('ellipse', { cx: x, cy: 384, rx: 12, ry: 8, fill: '#e8b64c' });
      g += s('path', { d: `M ${x - 8} 382 q 8 -5 16 0`, stroke: '#d99a2b', 'stroke-width': 1.5, fill: 'none' });
    });
    // Cup and saucer, with steam only in the original.
    g += s('ellipse', { cx: 232, cy: 408, rx: 26, ry: 7, fill: '#f3ead8' });
    g += s('rect', { x: 214, y: 372, width: 36, height: 34, rx: 5, fill: '#fff8e8' });
    g += s('path', { d: 'M 250 382 q 12 2 0 14 q -8 6 -2 12', stroke: '#fff8e8', 'stroke-width': 4, fill: 'none' });
    g += s('ellipse', { cx: 232, cy: 374, rx: 16, ry: 4, fill: '#6b4a2f' });
    if (!has('steam')) {
      g += s('path', { d: 'M 222 362 q 4 -8 0 -14 q -4 -6 2 -12 M 236 362 q 4 -8 0 -14 q -4 -6 2 -12', stroke: '#cbb98f', 'stroke-width': 2.5, fill: 'none', 'stroke-linecap': 'round' });
    }
    // Spoon on the saucer, or gone.
    if (!has('spoon')) {
      g += s('line', { x1: 250, y1: 402, x2: 262, y2: 418, stroke: '#c0c0c0', 'stroke-width': 3, 'stroke-linecap': 'round' });
      g += s('ellipse', { cx: 264, cy: 420, rx: 4, ry: 5.5, fill: '#c0c0c0' });
    }

    // --- Chair with the sleeping cat ---------------------------------------------------
    g += s('rect', { x: 330, y: 330, width: 8, height: 120, fill: '#5a3d24' });
    g += s('rect', { x: 330, y: 330, width: 64, height: 8, fill: '#5a3d24' });
    g += s('rect', { x: 386, y: 330, width: 8, height: 120, fill: '#5a3d24' });
    g += s('rect', { x: 326, y: 386, width: 72, height: 10, rx: 4, fill: '#7a5c40' });
    g += s('ellipse', { cx: 362, cy: 378, rx: 26, ry: 12, fill: '#e8734a' });
    g += s('circle', { cx: 342, cy: 370, r: 11, fill: '#e8734a' });
    g += s('polygon', { points: '334,362 331,350 340,358', fill: '#e8734a' });
    g += s('polygon', { points: '348,361 351,349 343,358', fill: '#e8734a' });
    g += s('path', { d: 'M 336 371 q 3 2 6 0', stroke: '#5a3d24', 'stroke-width': 1.5, fill: 'none' });
    // Tail draped over the chair edge, or tucked away.
    if (!has('cattail')) {
      g += s('path', { d: 'M 384 384 q 14 4 12 18 q -2 10 -12 8', stroke: '#e8734a', 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' });
    }

    // Rug under the table.
    g += s('ellipse', { cx: 200, cy: 492, rx: 130, ry: 14, fill: '#5a4a7a', opacity: 0.55 });
    return g;
  },
};

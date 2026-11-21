// Chapter 3 — Starlight Observatory. A domed observatory at midnight: a big
// telescope, a ringed planet through the window, a rocket model, star charts
// and a very tired astronomer's mug.
import { s, glowDot, star } from './scenes.js';

export const observatoryScene = {
  id: 'observatory',
  title: 'Starlight Observatory',
  differences: [
    { id: 'comet', name: 'The comet', x: 130, y: 110, r: 30 },
    { id: 'planet', name: 'The ringed planet', x: 300, y: 130, r: 34 },
    { id: 'telescope', name: 'The telescope angle', x: 280, y: 290, r: 32 },
    { id: 'chart', name: 'The missing star', x: 480, y: 120, r: 26 },
    { id: 'steam', name: 'The mug steam', x: 425, y: 385, r: 20 },
    { id: 'panel', name: 'The panel light', x: 120, y: 420, r: 22 },
    { id: 'rocket', name: 'The rocket fins', x: 480, y: 300, r: 26 },
    { id: 'books', name: 'The book stack', x: 90, y: 385, r: 26 },
    { id: 'mobile', name: 'The mobile planet', x: 210, y: 120, r: 22 },
    { id: 'rug', name: 'The rug moon', x: 280, y: 462, r: 24 },
  ],

  render(on) {
    const has = (id) => on.has(id);
    let g = '';

    // --- Dome interior ---------------------------------------------------------
    g += s('rect', { x: 0, y: 0, width: 560, height: 500, fill: '#1d2440' });
    g += s('path', { d: 'M 0 0 L 560 0 L 560 500 L 0 500 Z M 0 120 Q 280 20 560 120', fill: '#26305a', opacity: 0.5 });
    // Big round window with the night sky.
    g += s('circle', { cx: 280, cy: 130, r: 108, fill: '#0b1030' });
    g += s('circle', { cx: 280, cy: 130, r: 108, fill: 'none', stroke: '#4a3f66', 'stroke-width': 8 });
    g += s('line', { x1: 280, y1: 22, x2: 280, y2: 238, stroke: '#4a3f66', 'stroke-width': 4 });
    g += s('line', { x1: 172, y1: 130, x2: 388, y2: 130, stroke: '#4a3f66', 'stroke-width': 4 });
    [[210, 60], [240, 90], [330, 70], [350, 100], [200, 170], [370, 160], [250, 190], [320, 200], [230, 140]]
      .forEach(([x, y]) => { g += star(x, y, 3.5, '#fff3b0'); });
    // Comet streaking past, only in the changed picture.
    if (has('comet')) {
      g += s('line', { x1: 130, y1: 110, x2: 178, y2: 84, stroke: '#9fd8ff', 'stroke-width': 3, 'stroke-linecap': 'round' });
      g += s('circle', { cx: 182, cy: 82, r: 6, fill: '#d8f0ff' });
      g += glowDot(182, 82, 4, '#9fd8ff');
    }
    // Ringed planet, or a plain one when the difference is active.
    g += s('circle', { cx: 300, cy: 130, r: 22, fill: '#e8b64c' });
    g += s('path', { d: 'M 288 122 q 12 -8 24 0 M 290 134 q 10 -6 20 0', stroke: '#d99a2b', 'stroke-width': 2, fill: 'none' });
    if (!has('planet')) {
      g += s('ellipse', { cx: 300, cy: 130, rx: 38, ry: 9, fill: 'none', stroke: '#ffd166', 'stroke-width': 3, transform: 'rotate(-18 300 130)' });
    }

    // Hanging planet mobile (left of the window).
    g += s('line', { x1: 210, y1: 30, x2: 210, y2: 60, stroke: '#8a7f8e', 'stroke-width': 2 });
    g += s('line', { x1: 170, y1: 60, x2: 250, y2: 60, stroke: '#8a7f8e', 'stroke-width': 2 });
    g += s('line', { x1: 170, y1: 60, x2: 170, y2: 84, stroke: '#8a7f8e', 'stroke-width': 1.5 });
    g += s('line', { x1: 250, y1: 60, x2: 250, y2: 88, stroke: '#8a7f8e', 'stroke-width': 1.5 });
    g += s('circle', { cx: 170, cy: 92, r: 9, fill: '#5aa9e6' });
    if (!has('mobile')) g += s('circle', { cx: 250, cy: 97, r: 10, fill: '#f4849b' });

    // --- Star chart poster (right wall) -----------------------------------------
    g += s('rect', { x: 440, y: 60, width: 92, height: 122, rx: 5, fill: '#f3ead8' });
    g += s('rect', { x: 440, y: 60, width: 92, height: 122, rx: 5, fill: 'none', stroke: '#8a6a48', 'stroke-width': 3 });
    g += s('text', { x: 486, y: 82, 'text-anchor': 'middle', fill: '#2b2338', 'font-size': 11, 'font-family': 'Georgia, serif', 'font-weight': 'bold' }, 'STAR MAP');
    const chartStars = [[460, 100], [478, 112], [496, 100], [512, 118], [468, 140], [492, 150], [510, 138]];
    chartStars.forEach(([x, y], i) => {
      if (has('chart') && i === 3) return; // one star goes missing
      g += star(x, y, 4, '#d99a2b');
    });
    g += s('path', { d: 'M 460 100 L 478 112 L 496 100 L 512 118 M 468 140 L 492 150 L 510 138', stroke: '#8a6a48', 'stroke-width': 1.2, fill: 'none' });
    g += s('text', { x: 486, y: 172, 'text-anchor': 'middle', fill: '#2b2338', 'font-size': 9, 'font-family': 'Georgia, serif' }, 'northern sky');

    // --- Floor -------------------------------------------------------------------
    g += s('rect', { x: 0, y: 400, width: 560, height: 100, fill: '#2a2140' });
    g += s('line', { x1: 0, y1: 400, x2: 560, y2: 400, stroke: '#4a3f66', 'stroke-width': 3 });
    // Round rug with a crescent moon, or plain when the difference is active.
    g += s('ellipse', { cx: 280, cy: 462, rx: 120, ry: 26, fill: '#3d3468' });
    g += s('ellipse', { cx: 280, cy: 462, rx: 120, ry: 26, fill: 'none', stroke: '#f5c86b', 'stroke-width': 2, opacity: 0.7 });
    if (!has('rug')) {
      g += s('path', { d: 'M 272 452 a 12 12 0 1 0 12 20 a 9 9 0 1 1 -12 -20 Z', fill: '#ffd166' });
    }

    // --- Telescope on its tripod ----------------------------------------------------
    g += s('path', { d: 'M 280 330 L 240 400 M 280 330 L 320 400 M 280 330 L 280 402', stroke: '#8a7f8e', 'stroke-width': 6, 'stroke-linecap': 'round' });
    g += s('circle', { cx: 280, cy: 330, r: 10, fill: '#5a5470' });
    // Tube: pointing up at the window, or level when the difference is active.
    if (has('telescope')) {
      g += s('rect', { x: 212, y: 282, width: 136, height: 26, rx: 12, fill: '#c9563f', transform: 'rotate(-4 280 295)' });
      g += s('circle', { cx: 348, cy: 288, r: 13, fill: '#2b2338' });
      g += s('circle', { cx: 348, cy: 288, r: 8, fill: '#9fd8ff', opacity: 0.8 });
    } else {
      g += s('rect', { x: 236, y: 216, width: 96, height: 26, rx: 12, fill: '#c9563f', transform: 'rotate(-58 284 229)' });
      g += s('circle', { cx: 318, cy: 190, r: 13, fill: '#2b2338' });
      g += s('circle', { cx: 318, cy: 190, r: 8, fill: '#9fd8ff', opacity: 0.8 });
    }
    g += s('rect', { x: 250, y: 300, width: 20, height: 14, rx: 3, fill: '#8a7f8e' });

    // --- Control panel (left) ---------------------------------------------------------
    g += s('rect', { x: 52, y: 380, width: 140, height: 80, rx: 8, fill: '#3a2c22' });
    g += s('rect', { x: 62, y: 390, width: 120, height: 30, rx: 4, fill: '#8be08b', opacity: 0.85 });
    g += s('path', { d: 'M 68 412 l 10 -12 l 8 8 l 12 -14 l 10 10 l 12 -8', stroke: '#1d5c2e', 'stroke-width': 2, fill: 'none' });
    g += s('circle', { cx: 76, cy: 436, r: 7, fill: '#8be08b' });
    g += s('circle', { cx: 104, cy: 436, r: 7, fill: has('panel') ? '#ff6b6b' : '#8be08b' });
    g += s('circle', { cx: 132, cy: 436, r: 7, fill: '#ffd166' });
    g += s('circle', { cx: 160, cy: 436, r: 7, fill: '#5aa9e6' });

    // --- Desk (right) with mug and rocket model ----------------------------------------
    g += s('rect', { x: 400, y: 400, width: 140, height: 14, rx: 4, fill: '#6b4a2f' });
    g += s('rect', { x: 412, y: 414, width: 10, height: 66, fill: '#5a3d24' });
    g += s('rect', { x: 518, y: 414, width: 10, height: 66, fill: '#5a3d24' });
    // Mug with steam, or cold and steaming nothing.
    g += s('rect', { x: 412, y: 372, width: 26, height: 28, rx: 4, fill: '#5aa9e6' });
    g += s('path', { d: 'M 438 380 q 10 2 0 12', stroke: '#5aa9e6', 'stroke-width': 4, fill: 'none' });
    if (!has('steam')) {
      g += s('path', { d: 'M 420 364 q 4 -7 0 -12 M 430 364 q 4 -7 0 -12', stroke: '#cbb98f', 'stroke-width': 2.5, fill: 'none', 'stroke-linecap': 'round' });
    }
    // Rocket model on a stand: red fins, or blue when the difference is active.
    const fin = has('rocket') ? '#5aa9e6' : '#d94f3d';
    g += s('rect', { x: 472, y: 336, width: 16, height: 10, rx: 2, fill: '#8a7f8e' });
    g += s('rect', { x: 472, y: 282, width: 16, height: 56, rx: 7, fill: '#f3ead8' });
    g += s('polygon', { points: '472,282 488,282 480,258', fill: '#d94f3d' });
    g += s('polygon', { points: '472,330 462,348 472,342', fill: fin });
    g += s('polygon', { points: '488,330 498,348 488,342', fill: fin });
    g += s('circle', { cx: 480, cy: 300, r: 6, fill: '#9fd8ff', stroke: '#8a7f8e', 'stroke-width': 1.5 });

    // --- Book stack (left floor) -----------------------------------------------------------
    const bookColors = ['#d94f3d', '#5aa9e6', '#e8b64c'];
    bookColors.forEach((c, i) => {
      g += s('rect', { x: 62, y: 452 - i * 14, width: 58, height: 12, rx: 2, fill: c });
    });
    if (!has('books')) {
      g += s('rect', { x: 66, y: 410, width: 50, height: 12, rx: 2, fill: '#67b574' });
    }
    // Open star atlas beside the stack.
    g += s('polygon', { points: '140,452 172,442 204,452 204,470 140,470', fill: '#f3ead8' });
    g += s('line', { x1: 172, y1: 442, x2: 172, y2: 470, stroke: '#8a6a48', 'stroke-width': 1.5 });
    g += star(155, 458, 4, '#d99a2b') + star(188, 456, 3.5, '#5aa9e6');

    // Scattered glow: fireflies of the dome (tiny LEDs on the wall).
    g += glowDot(40, 300, 2.5, '#8be08b') + glowDot(530, 330, 2.5, '#ffd166') + glowDot(360, 250, 2.5, '#9fd8ff');
    return g;
  },
};

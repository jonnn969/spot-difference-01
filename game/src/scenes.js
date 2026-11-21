// Shared SVG helpers and the chapter registry. Scenes live in their own files;
// this module only builds SVG strings and lists the chapters in play order.
import { gardenScene } from './scene-garden.js';
import { cafeScene } from './scene-cafe.js';
import { observatoryScene } from './scene-observatory.js';

export const SCENES = [gardenScene, cafeScene, observatoryScene];

// Tiny SVG string builder: s('circle', { cx: 10, cy: 20, r: 5, fill: '#fff' })
export function s(tag, attrs = {}, inner = '') {
  const a = Object.entries(attrs)
    .map(([k, v]) => `${k}="${String(v).replace(/"/g, '&quot;')}"`)
    .join(' ');
  return `<${tag}${a ? ' ' + a : ''}>${inner}</${tag}>`;
}

// A soft glowing dot (firefly / star / lamp glow) reused by every scene.
export function glowDot(x, y, r, color, opacity = 0.9) {
  return s('circle', { cx: x, cy: y, r: r * 2.6, fill: color, opacity: 0.18 })
    + s('circle', { cx: x, cy: y, r, fill: color, opacity });
}

// A five-point star path centred on (x, y) with outer radius r.
export function star(x, y, r, fill) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : r * 0.45;
    const ang = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(x + rad * Math.cos(ang)).toFixed(1)},${(y + rad * Math.sin(ang)).toFixed(1)}`);
  }
  return s('polygon', { points: pts.join(' '), fill });
}

// A simple flower: stem, five petals, centre.
export function flower(x, y, petal, centre) {
  let petals = '';
  for (let i = 0; i < 5; i++) {
    const ang = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    petals += s('ellipse', {
      cx: (x + 7 * Math.cos(ang)).toFixed(1), cy: (y - 8 + 7 * Math.sin(ang)).toFixed(1),
      rx: 5.5, ry: 7.5, fill: petal, transform: `rotate(${(i * 72).toFixed(0)} ${x} ${y - 8})`,
    });
  }
  return s('path', { d: `M ${x} ${y + 26} Q ${x - 3} ${y + 8} ${x} ${y}`, stroke: '#3e7d4e', 'stroke-width': 2.5, fill: 'none' })
    + petals + s('circle', { cx: x, cy: y - 8, r: 4.5, fill: centre });
}

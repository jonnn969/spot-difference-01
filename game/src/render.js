// Panel rendering and markers. One clear job: turn a scene into two SVG
// pictures and draw the gold circles, red crosses and hint rings on them.
import { SCENES } from './scenes.js';

// Paint both panels: left is the original, right carries every difference.
export function mountPanels(scene, leftSvg, rightSvg) {
  leftSvg.innerHTML = scene.render(new Set());
  rightSvg.innerHTML = scene.render(new Set(scene.differences.map((d) => d.id)));
}

// Draw a gold dashed circle plus a tick on BOTH panels for a found difference.
export function markFound(leftSvg, rightSvg, diff) {
  for (const svg of [leftSvg, rightSvg]) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'found-mark');
    g.innerHTML = `<circle cx="${diff.x}" cy="${diff.y}" r="${diff.r}"></circle>`
      + `<path d="M ${diff.x - 9} ${diff.y} l 6 7 l 11 -13"></path>`;
    svg.appendChild(g);
  }
}

// A fading red cross where a wrong click landed (only on the clicked panel).
export function markWrong(svg, x, y) {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('class', 'wrong-mark');
  g.innerHTML = `<circle cx="${x}" cy="${y}" r="15"></circle>`
    + `<line x1="${x - 8}" y1="${y - 8}" x2="${x + 8}" y2="${y + 8}"></line>`
    + `<line x1="${x + 8}" y1="${y - 8}" x2="${x - 8}" y2="${y + 8}"></line>`;
  svg.appendChild(g);
  window.setTimeout(() => g.remove(), 1000);
}

// A pulsing blue ring around an unfound difference, on both panels.
export function markHint(leftSvg, rightSvg, diff) {
  for (const svg of [leftSvg, rightSvg]) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'hint-ring');
    g.innerHTML = `<circle cx="${diff.x}" cy="${diff.y}" r="${diff.r + 6}"></circle>`;
    svg.appendChild(g);
    window.setTimeout(() => g.remove(), 2600);
  }
}

// Find a scene by chapter id (used by the chapter tabs).
export function sceneById(id) {
  return SCENES.find((scene) => scene.id === id);
}

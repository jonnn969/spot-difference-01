// Pointer and keyboard input. One clear job: turn clicks and keys into game
// actions, converting screen pixels into the panels' 560x500 viewBox space.

// Clicking either panel reports the viewBox point and which panel was clicked.
export function bindPanels(leftSvg, rightSvg, onPick) {
  for (const [svg, panel] of [[leftSvg, 'left'], [rightSvg, 'right']]) {
    svg.addEventListener('pointerdown', (event) => {
      const rect = svg.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 560;
      const y = ((event.clientY - rect.top) / rect.height) * 500;
      onPick(x, y, panel);
    });
  }
}

// H hint, R restart, M sound, 1-3 chapters, Escape back to the menu.
export function bindKeys(actions) {
  window.addEventListener('keydown', (event) => {
    if (event.repeat) return;
    const key = event.key.toLowerCase();
    if (key === 'h') actions.onHint();
    else if (key === 'r') actions.onRestart();
    else if (key === 'm') actions.onMute();
    else if (key === 'escape') actions.onMenu();
    else if (key === '1' || key === '2' || key === '3') actions.onChapter(Number(key) - 1);
  });
}

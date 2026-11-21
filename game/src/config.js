// Game-wide tuning for Firefly Hollow. One clear job: numbers only, no logic.
export const CONFIG = {
  pointsPerFind: 100,
  comboStep: 10,
  wrongPenalty: 10,
  hintCost: 50,
  hintsPerChapter: 3,
  timeBonusPerSecond: 5,
  winStars: { three: 1500, two: 900 },
};

// Chapter list: same order as the tabs and the start menu cards.
export const CHAPTERS = [
  { id: 'garden', title: 'Twilight Garden', blurb: 'Fireflies & lanterns', seconds: 180, mood: 'Gentle' },
  { id: 'cafe', title: 'Ember Café', blurb: 'Rain on the window', seconds: 150, mood: 'Trickier' },
  { id: 'observatory', title: 'Starlight Observatory', blurb: 'Comets & telescopes', seconds: 120, mood: 'Sharp eyes' },
];

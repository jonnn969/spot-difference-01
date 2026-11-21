// Screenshot presets: ?shot=cover (and friends) opens the game already
// mid-hunt, so a screenshot shows a real played state — found markers,
// a live counter and time left — rendered by the game's own code.
// Also accepts a free-form state: ?shot=play&chapter=1&found=clock,steam&time=121&score=980
const PRESETS = {
  cover: { chapter: 0, found: ['moon', 'lantern', 'butterfly', 'fish'], timeLeft: 151, score: 1250 },
  cafe: { chapter: 1, found: ['clock', 'steam', 'pastry'], timeLeft: 121, score: 980 },
  observatory: { chapter: 2, found: ['comet', 'telescope'], timeLeft: 96, score: 640 },
  finale: { chapter: 0, found: ['moon', 'lantern', 'mushroom', 'butterfly', 'cattail', 'fish', 'birdhouse', 'tulip'], timeLeft: 64, score: 2480 },
};

export function parseShot() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('shot');
  if (!name) return null;
  if (name === 'play') {
    return {
      chapter: Number(params.get('chapter') || 0),
      found: (params.get('found') || '').split(',').filter(Boolean),
      timeLeft: Number(params.get('time') || 150),
      score: Number(params.get('score') || 0),
    };
  }
  return PRESETS[name] || null;
}

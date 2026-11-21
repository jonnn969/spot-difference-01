// Firefly Hollow — game state, timer, score, hints and overlays.
// Wires the scene modules, the renderer, the input and the sound together.
import { CONFIG, CHAPTERS } from './config.js';
import { SCENES } from './scenes.js';
import { SoundEngine } from './audio.js';
import { mountPanels, markFound, markWrong, markHint } from './render.js';
import { bindPanels, bindKeys } from './input.js';
import { parseShot } from './shots.js';

const $ = (id) => document.getElementById(id);
const leftSvg = $('panelLeft');
const rightSvg = $('panelRight');

const sound = new SoundEngine();
const state = {
  chapterIndex: 0,
  scene: SCENES[0],
  found: new Set(),
  score: 0,
  totalScore: 0,
  combo: 1,
  hintsLeft: CONFIG.hintsPerChapter,
  timeLeft: CHAPTERS[0].seconds,
  timerId: null,
  playing: false,
  paused: false,
  selectedChapter: 0,
};

function fmtTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function updateHUD() {
  const total = state.scene.differences.length;
  $('score').textContent = state.score;
  $('combo').textContent = `×${state.combo}`;
  $('timerText').textContent = fmtTime(Math.max(0, state.timeLeft));
  $('timerText').classList.toggle('low', state.timeLeft <= 30);
  $('timerFill').classList.toggle('low', state.timeLeft <= 30);
  $('timerFill').style.width = `${(state.timeLeft / CHAPTERS[state.chapterIndex].seconds) * 100}%`;
  $('remaining').textContent = total - state.found.size;
  $('foundCount').textContent = `${state.found.size} / ${total}`;
  $('hintsLeft').textContent = state.hintsLeft;
  $('hintBtn').disabled = state.hintsLeft <= 0 || !state.playing;
  const dots = $('dots');
  dots.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('i');
    if (i < state.found.size) dot.className = 'on';
    dots.appendChild(dot);
  }
}

function setMessage(html) {
  $('message').innerHTML = html;
  $('status').textContent = $('message').textContent;
}

function stopTimer() {
  if (state.timerId !== null) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
}

function startTimer() {
  stopTimer();
  state.timerId = window.setInterval(() => {
    state.timeLeft -= 1;
    if (state.timeLeft <= 30 && state.timeLeft > 0) sound.tick();
    if (state.timeLeft <= 0) {
      state.timeLeft = 0;
      updateHUD();
      endChapter(false);
      return;
    }
    updateHUD();
  }, 1000);
}

function startChapter(index, preset = null) {
  stopTimer();
  state.chapterIndex = index;
  state.scene = SCENES[index];
  state.found = new Set();
  state.score = preset ? preset.score : 0;
  state.combo = 1;
  state.hintsLeft = CONFIG.hintsPerChapter;
  state.timeLeft = preset ? preset.timeLeft : CHAPTERS[index].seconds;
  state.playing = true;
  state.paused = false;
  mountPanels(state.scene, leftSvg, rightSvg);
  if (preset) {
    for (const id of preset.found) {
      const diff = state.scene.differences.find((d) => d.id === id);
      if (diff) {
        state.found.add(id);
        markFound(leftSvg, rightSvg, diff);
      }
    }
    state.combo = 1 + state.found.size;
  }
  document.querySelectorAll('#chapterTabs button').forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });
  $('startOverlay').classList.add('hidden');
  $('endOverlay').classList.add('hidden');
  setMessage(`Chapter ${index + 1} — <b>${state.scene.title}</b>: find ${state.scene.differences.length} differences!`);
  updateHUD();
  startTimer();
}

function onPick(x, y, panel) {
  if (!state.playing || state.paused) return;
  sound.ensure();
  const svg = panel === 'left' ? leftSvg : rightSvg;
  // Nearest unfound difference within its radius: two differences can sit
  // close together (the garden's lantern and its firefly), so the closest
  // one wins the click instead of whichever is listed first.
  let hit = null;
  let hitDistance = Infinity;
  for (const d of state.scene.differences) {
    if (state.found.has(d.id)) continue;
    const dx = x - d.x;
    const dy = y - d.y;
    const distance = dx * dx + dy * dy;
    const reach = d.r + 8;
    if (distance <= reach * reach && distance < hitDistance) {
      hit = d;
      hitDistance = distance;
    }
  }
  if (hit) {
    state.found.add(hit.id);
    const points = CONFIG.pointsPerFind + (state.combo - 1) * CONFIG.comboStep;
    state.score += points;
    state.combo += 1;
    markFound(leftSvg, rightSvg, hit);
    sound.found();
    setMessage(`Found: <b>${hit.name}</b>! +${points} points.`);
    updateHUD();
    if (state.found.size === state.scene.differences.length) endChapter(true);
    return;
  }
  state.score = Math.max(0, state.score - CONFIG.wrongPenalty);
  state.combo = 1;
  markWrong(svg, x, y);
  svg.closest('.panel').classList.remove('shake');
  void svg.closest('.panel').offsetWidth;
  svg.closest('.panel').classList.add('shake');
  sound.wrong();
  setMessage(`Not quite — that's not one of them. −${CONFIG.wrongPenalty} points.`);
  updateHUD();
}

function useHint() {
  if (!state.playing || state.paused || state.hintsLeft <= 0) return;
  const remaining = state.scene.differences.filter((d) => !state.found.has(d.id));
  if (remaining.length === 0) return;
  const pick = remaining[Math.floor(Math.random() * remaining.length)];
  state.hintsLeft -= 1;
  state.score = Math.max(0, state.score - CONFIG.hintCost);
  markHint(leftSvg, rightSvg, pick);
  sound.hint();
  setMessage(`Hint: look near <b>${hintZone(pick)}</b>… −${CONFIG.hintCost} points.`);
  updateHUD();
}

// A vague compass hint, never the exact spot.
function hintZone(diff) {
  const vertical = diff.y < 170 ? 'the top' : diff.y > 340 ? 'the bottom' : 'the middle';
  const horizontal = diff.x < 190 ? 'left' : diff.x > 370 ? 'right' : 'centre';
  return `${vertical} ${horizontal}`;
}

function endChapter(won) {
  stopTimer();
  state.playing = false;
  state.totalScore += state.score;
  let title;
  let line;
  if (won) {
    const bonus = state.timeLeft * CONFIG.timeBonusPerSecond;
    state.score += bonus;
    state.totalScore += bonus;
    const stars = state.score >= CONFIG.winStars.three ? '★★★' : state.score >= CONFIG.winStars.two ? '★★☆' : '★☆☆';
    $('endStars').textContent = stars;
    sound.win();
    title = 'Chapter Complete!';
    line = `You found all <b>${state.scene.differences.length}</b> differences in <b>${state.scene.title}</b> with <b>${fmtTime(state.timeLeft)}</b> to spare — time bonus <b>+${bonus}</b>.`;
  } else {
    $('endStars').textContent = '☆☆☆';
    sound.lose();
    title = "Time's Up!";
    line = `The fireflies dimmed with <b>${state.scene.differences.length - state.found.size}</b> differences still hiding in <b>${state.scene.title}</b>.`;
  }
  $('endTitle').textContent = title;
  $('endLine').innerHTML = line;
  $('endStats').textContent = `Chapter score: ${state.score} · Total score: ${state.totalScore} · Found: ${state.found.size} / ${state.scene.differences.length}`;
  $('nextBtn').textContent = state.chapterIndex < SCENES.length - 1 ? 'Next Chapter →' : 'Back to Chapter 1 →';
  $('endOverlay').classList.remove('hidden');
  setMessage(won ? 'Chapter complete! Brilliant eyes.' : "Time's up — the differences are still hiding.");
  updateHUD();
}

function showMenu() {
  if (!state.playing) return;
  state.paused = true;
  stopTimer();
  $('startOverlay').classList.remove('hidden');
}

function buildMenus() {
  const tabs = $('chapterTabs');
  CHAPTERS.forEach((chapter, i) => {
    const btn = document.createElement('button');
    btn.textContent = `${i + 1}. ${chapter.title}`;
    btn.addEventListener('click', () => { sound.click(); startChapter(i); });
    tabs.appendChild(btn);
  });
  const cards = $('chapterCards');
  CHAPTERS.forEach((chapter, i) => {
    const btn = document.createElement('button');
    btn.innerHTML = `<b>${chapter.title}</b>${chapter.blurb}<br>⏱ ${chapter.seconds / 60} min · ${chapter.mood} · 10 differences`;
    btn.addEventListener('click', () => {
      state.selectedChapter = i;
      document.querySelectorAll('#chapterCards button').forEach((b, j) => {
        b.style.borderColor = j === i ? 'var(--gold)' : '';
      });
      sound.click();
    });
    cards.appendChild(btn);
  });
  document.querySelectorAll('#chapterCards button')[0].style.borderColor = 'var(--gold)';
}

function init() {
  buildMenus();
  bindPanels(leftSvg, rightSvg, onPick);
  bindKeys({
    onHint: useHint,
    onRestart: () => { if (state.playing) startChapter(state.chapterIndex); },
    onMute: toggleSound,
    onMenu: showMenu,
    onChapter: (i) => startChapter(i),
  });
  $('hintBtn').addEventListener('click', useHint);
  $('restartBtn').addEventListener('click', () => { if (state.playing) startChapter(state.chapterIndex); });
  $('soundBtn').addEventListener('click', toggleSound);
  $('startBtn').addEventListener('click', () => {
    sound.ensure();
    sound.click();
    if (state.paused && state.selectedChapter === state.chapterIndex) {
      state.paused = false;
      state.playing = true;
      $('startOverlay').classList.add('hidden');
      startTimer();
      return;
    }
    startChapter(state.selectedChapter);
  });
  $('nextBtn').addEventListener('click', () => {
    sound.click();
    startChapter((state.chapterIndex + 1) % SCENES.length);
  });
  $('againBtn').addEventListener('click', () => { sound.click(); startChapter(state.chapterIndex); });
  $('menuBtn').addEventListener('click', () => {
    sound.click();
    state.playing = false;
    stopTimer();
    $('endOverlay').classList.add('hidden');
    $('startOverlay').classList.remove('hidden');
  });
  const shot = parseShot();
  if (shot) {
    startChapter(shot.chapter, shot);
  } else {
    updateHUD();
  }
}

function toggleSound() {
  sound.muted = !sound.muted;
  $('soundBtn').textContent = sound.muted ? '🔇 Muted' : '🔊 Sound';
  if (!sound.muted) sound.click();
}

init();

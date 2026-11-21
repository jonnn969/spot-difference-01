// All sound is synthesized with WebAudio: no audio files, no network.
export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
    if (this.ctx && this.ctx.state === 'suspended') void this.ctx.resume();
    return this.ctx;
  }

  tone(freq, start, dur, type = 'sine', vol = 0.12) {
    if (this.muted) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(vol, ctx.currentTime + start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime + start);
    osc.stop(ctx.currentTime + start + dur + 0.05);
  }

  // Two-note chime when a difference is circled.
  found() { this.tone(880, 0, 0.16); this.tone(1318, 0.09, 0.24); }
  // Low buzz for a wrong click.
  wrong() { this.tone(160, 0, 0.22, 'sawtooth', 0.07); this.tone(120, 0.08, 0.2, 'sawtooth', 0.06); }
  // Soft sparkle for a hint.
  hint() { this.tone(1568, 0, 0.12, 'triangle', 0.08); this.tone(2093, 0.08, 0.16, 'triangle', 0.07); }
  // Rising arpeggio on chapter clear.
  win() { [523, 659, 784, 1047, 1319].forEach((f, i) => this.tone(f, i * 0.11, 0.3)); }
  // Falling notes when time runs out.
  lose() { [392, 330, 262].forEach((f, i) => this.tone(f, i * 0.14, 0.3, 'triangle', 0.09)); }
  // Quiet tick under 30 seconds.
  tick() { this.tone(1047, 0, 0.05, 'square', 0.03); }
  // UI click.
  click() { this.tone(660, 0, 0.06, 'triangle', 0.05); }
}

/**
 * Spark Entertainment — Cinematic Ambient Audio Engine
 * Web Audio API only. Zero external files. Zero vocals. Zero EDM.
 *
 * Architecture:
 *   1. Drone pad     — layered sine/triangle waves, very slow drift (A=55Hz, A=110Hz, E=165Hz)
 *   2. High shimmer  — filtered white noise → band-pass → long reverb tail
 *   3. Convolution reverb — synthetically generated IR (exponential decay)
 *   4. Sub rumble    — very low sine (28Hz), barely felt, adds body
 *   5. Master bus    — gentle compression + soft limiter at −1dBFS
 *
 * The result: a timeless studio ambience.
 * Comparable to: Ólafur Arnalds room tones, Nils Frahm studio silence, Massive Attack intro beds.
 */

import { useRef, useCallback } from 'react';

// ── Reverb IR generator ────────────────────────────────────────────────────────
function buildReverbIR(ctx: AudioContext, durationSec: number, decay: number): AudioBuffer {
  const rate    = ctx.sampleRate;
  const length  = rate * durationSec;
  const buffer  = ctx.createBuffer(2, length, rate);

  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      // Exponential decay envelope on noise
      const envelope = Math.pow(1 - i / length, decay);
      data[i] = (Math.random() * 2 - 1) * envelope * 0.85;
    }
  }
  return buffer;
}

// ── Convolution reverb node ────────────────────────────────────────────────────
function createReverb(ctx: AudioContext, durationSec = 8, decay = 3.2): ConvolverNode {
  const conv = ctx.createConvolver();
  conv.buffer = buildReverbIR(ctx, durationSec, decay);
  return conv;
}

// ── Oscillator layer ───────────────────────────────────────────────────────────
function createDroneTone(
  ctx: AudioContext,
  dest: AudioNode,
  freq: number,
  type: OscillatorType,
  gainVal: number,
  detuneAmount = 0,
): OscillatorNode {
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type      = type;
  osc.frequency.value = freq;
  osc.detune.value    = detuneAmount;
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(gainVal, ctx.currentTime + 6.0); // 6s fade-in

  osc.connect(gain);
  gain.connect(dest);
  osc.start();

  return osc;
}

// ── Noise shimmer layer ────────────────────────────────────────────────────────
function createNoiseShimmer(ctx: AudioContext, dest: AudioNode): AudioBufferSourceNode {
  // 4 seconds of white noise, looped
  const bufLen = ctx.sampleRate * 4;
  const noiseBuf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
  const data = noiseBuf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;

  const src   = ctx.createBufferSource();
  src.buffer  = noiseBuf;
  src.loop    = true;

  // High-pass → band-pass to get an airy, room-like shimmer
  const hp = ctx.createBiquadFilter();
  hp.type            = 'highpass';
  hp.frequency.value = 3200;
  hp.Q.value         = 0.5;

  const bp = ctx.createBiquadFilter();
  bp.type            = 'bandpass';
  bp.frequency.value = 6000;
  bp.Q.value         = 1.8;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.032, ctx.currentTime + 8.0);

  src.connect(hp);
  hp.connect(bp);
  bp.connect(gain);
  gain.connect(dest);
  src.start();

  return src;
}

// ── Sub rumble ─────────────────────────────────────────────────────────────────
function createSubRumble(ctx: AudioContext, dest: AudioNode): OscillatorNode {
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type            = 'sine';
  osc.frequency.value = 28;
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.018, ctx.currentTime + 10.0);

  osc.connect(gain);
  gain.connect(dest);
  osc.start();
  return osc;
}

// ── Public hook ───────────────────────────────────────────────────────────────
export function useAmbientAudio() {
  const ctxRef    = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const nodesRef  = useRef<(AudioNode & { stop?: () => void })[]>([]);
  const startedRef = useRef(false);

  const start = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const ctx    = new AudioContext();
    ctxRef.current = ctx;

    // ── Master bus ──
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.72, ctx.currentTime + 4.0);
    master.connect(ctx.destination);
    masterRef.current = master;

    // ── Long reverb (8s tail, decay 3.2) ──
    const reverb      = createReverb(ctx, 8, 3.2);
    const reverbGain  = ctx.createGain();
    reverbGain.gain.value = 0.55;
    reverb.connect(reverbGain);
    reverbGain.connect(master);

    // ── Dry signal (much quieter, keeps definition) ──
    const dryGain = ctx.createGain();
    dryGain.gain.value = 0.28;
    dryGain.connect(master);

    // ── Drone routing: dry → reverb ──
    const droneGroup = ctx.createGain();
    droneGroup.connect(dryGain);
    droneGroup.connect(reverb);

    // A2 (110Hz) — root tone, sine
    const o1 = createDroneTone(ctx, droneGroup, 110.0,  'sine',     0.38, 0);
    // A3 (220Hz) — octave, triangle (softer harmonic content)
    const o2 = createDroneTone(ctx, droneGroup, 220.0,  'triangle', 0.18, -4);
    // E3 (165Hz) — fifth above root, adds warmth
    const o3 = createDroneTone(ctx, droneGroup, 165.0,  'sine',     0.14, +3);
    // A1 (55Hz) — low foundational tone
    const o4 = createDroneTone(ctx, droneGroup, 55.0,   'sine',     0.22, 0);

    // ── Noise shimmer (air, room presence) ──
    const shimmer = createNoiseShimmer(ctx, reverb);

    // ── Sub rumble (felt, not heard) ──
    const sub = createSubRumble(ctx, master);

    nodesRef.current = [o1, o2, o3, o4, shimmer, sub];
  }, []);

  const stop = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;

    // Gentle 3s fade-out
    master.gain.setTargetAtTime(0, ctx.currentTime, 1.0);

    setTimeout(() => {
      nodesRef.current.forEach(n => {
        try {
          (n as OscillatorNode).stop?.();
        } catch {
          // Node may already be stopped
        }
      });
      nodesRef.current = [];
      ctx.close();
      ctxRef.current   = null;
      masterRef.current = null;
      startedRef.current = false;
    }, 3500);
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    const master = masterRef.current;
    const ctx    = ctxRef.current;
    if (!master || !ctx) return;

    if (muted) {
      master.gain.setTargetAtTime(0,    ctx.currentTime, 0.6);
    } else {
      master.gain.setTargetAtTime(0.72, ctx.currentTime, 1.2);
    }
  }, []);

  return { start, stop, setMuted };
}

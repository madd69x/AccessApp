export const playHoverSound = () => {
  if (typeof window === 'undefined') return;
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
    oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.02);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
  } catch (e) {
    // Ignore audio context errors if user hasn't interacted yet
  }
};

export const playClickSound = () => {
  if (typeof window === 'undefined') return;
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(220, audioCtx.currentTime); // A3
    oscillator.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.15);

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.02);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.15);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.15);
  } catch (e) {
    // Ignore audio context errors
  }
};

let ambientAudioCtx: AudioContext | null = null;
let ambientMasterGain: GainNode | null = null;
let isMuted = false;

export const toggleMute = () => {
  isMuted = !isMuted;
  if (ambientMasterGain) {
    ambientMasterGain.gain.setTargetAtTime(isMuted ? 0 : 0.08, ambientAudioCtx!.currentTime, 0.5);
  }
  return isMuted;
};

export const playAmbientMelody = () => {
  if (typeof window === 'undefined') return;
  try {
    if (!ambientAudioCtx) {
      ambientAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    if (ambientAudioCtx.state === 'suspended') {
      ambientAudioCtx.resume();
    }

    if (ambientMasterGain) return; // Already playing

    const ctx = ambientAudioCtx;
    ambientMasterGain = ctx.createGain();
    ambientMasterGain.gain.value = isMuted ? 0 : 0.2;
    ambientMasterGain.connect(ctx.destination);

    // ── 1. Create Ambient Chords ──
    const createDrone = (freq: number, detune: number, rate: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      const lfo = ctx.createOscillator();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      osc.detune.value = detune;

      lfo.type = 'sine';
      lfo.frequency.value = rate;

      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.5;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      gain.gain.value = 0.3; // Very soft
      
      if (panner) {
        const panLfo = ctx.createOscillator();
        panLfo.type = 'sine';
        panLfo.frequency.value = rate * 0.5;
        const panGain = ctx.createGain();
        panGain.gain.value = 0.5;
        panLfo.connect(panGain);
        panGain.connect(panner.pan);
        
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(ambientMasterGain!);
        panLfo.start();
      } else {
        osc.connect(gain);
        gain.connect(ambientMasterGain!);
      }

      osc.start();
      lfo.start();
    };

    // Deep, calm chords
    createDrone(261.63, 0, 0.03);  // C4
    createDrone(329.63, 4, 0.05);  // E4
    createDrone(392.00, -2, 0.04); // G4

    // ── 2. Calm Heartbeat / Pulse Beat ──
    const bpm = 60; // Very slow and calm
    const beatDuration = 60 / bpm;

    const playSoftKick = (time: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ambientMasterGain!);
      
      // Deep sub-bass thud
      osc.frequency.setValueAtTime(100, time);
      osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
      
      gain.gain.setValueAtTime(0.5, time); // Softer volume
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.4);
      
      osc.start(time);
      osc.stop(time + 0.5);
    };

    const playSoftClick = (time: number) => {
      const bufferSize = ctx.sampleRate * 0.05; // Very short
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 4000; // Softer frequency
      const gain = ctx.createGain();
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ambientMasterGain!);
      
      gain.gain.setValueAtTime(0.05, time); // Extremely quiet
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);
      
      noise.start(time);
    };

    // Schedule loop
    let nextNoteTime = ctx.currentTime + 0.1;
    let step = 0;

    const schedule = () => {
      while (nextNoteTime < ctx.currentTime + 0.1) {
        // Heartbeat pattern
        if (step % 8 === 0) playSoftKick(nextNoteTime);
        if (step % 8 === 1) playSoftKick(nextNoteTime + 0.1); // Double heartbeat thud
        
        // Soft click like a ticking clock or calm metronome on offbeats
        if (step % 4 === 2) playSoftClick(nextNoteTime);

        // Advance time by 8th note
        nextNoteTime += beatDuration / 2;
        step++;
      }
      if (ambientMasterGain) {
        requestAnimationFrame(schedule);
      }
    };
    
    schedule();

  } catch (e) {
    console.error("Audio initialization failed", e);
  }
};

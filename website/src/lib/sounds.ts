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
    ambientMasterGain.gain.value = isMuted ? 0 : 0.4;
    ambientMasterGain.connect(ctx.destination);

    const bpm = 90;
    const beatDuration = 60 / bpm;

    const playKick = (time: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ambientMasterGain!);
      
      osc.frequency.setValueAtTime(150, time);
      osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
      
      gain.gain.setValueAtTime(1, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);
      
      osc.start(time);
      osc.stop(time + 0.5);
    };

    const playHihat = (time: number) => {
      const bufferSize = ctx.sampleRate * 0.1;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 5000;
      const gain = ctx.createGain();
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ambientMasterGain!);
      
      gain.gain.setValueAtTime(0.3, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
      
      noise.start(time);
    };

    const playSnare = (time: number) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.connect(oscGain);
      oscGain.connect(ambientMasterGain!);
      osc.frequency.setValueAtTime(250, time);
      oscGain.gain.setValueAtTime(0.5, time);
      oscGain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
      osc.start(time);
      osc.stop(time + 0.2);

      const bufferSize = ctx.sampleRate * 0.2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1000;
      const noiseGain = ctx.createGain();
      
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ambientMasterGain!);
      
      noiseGain.gain.setValueAtTime(0.5, time);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
      
      noise.start(time);
    };

    // Schedule loop
    let nextNoteTime = ctx.currentTime + 0.1;
    let step = 0;

    const schedule = () => {
      while (nextNoteTime < ctx.currentTime + 0.1) {
        // Kick on 0 and 2
        if (step % 4 === 0) playKick(nextNoteTime);
        if (step % 4 === 2 && step % 8 !== 6) playKick(nextNoteTime);
        
        // Snare on 1 and 3 (which are steps 2 and 6 in 8-step if we double resolution, wait: 16-step)
        // Let's use 16 steps per bar (4 beats per bar)
        const step16 = step % 16;
        
        // Kick: 0, 8, 10
        if (step16 === 0 || step16 === 8 || step16 === 10) playKick(nextNoteTime);
        
        // Snare: 4, 12
        if (step16 === 4 || step16 === 12) playSnare(nextNoteTime);
        
        // Hihat: every step except when snare plays
        if (step16 % 2 === 0) playHihat(nextNoteTime);

        // Advance time by 16th note
        nextNoteTime += beatDuration / 4;
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

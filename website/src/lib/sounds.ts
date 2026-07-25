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
    ambientMasterGain.gain.value = isMuted ? 0 : 0.08; // Keep it very quiet and ambient
    ambientMasterGain.connect(ctx.destination);

    // Create a slow, generative ambient pad
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

      // Modulate the gain with the LFO for a breathing effect
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.5;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      // Setup initial gain
      gain.gain.value = 0.5;
      
      if (panner) {
        // Slow panning
        const panLfo = ctx.createOscillator();
        panLfo.type = 'sine';
        panLfo.frequency.value = rate * 0.7;
        const panGain = ctx.createGain();
        panGain.gain.value = 0.8;
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

    // Beautiful, shimmering Cmaj9 chord (C4, E4, G4, B4, D5)
    createDrone(261.63, 0, 0.03);  // C4
    createDrone(329.63, 4, 0.05);  // E4
    createDrone(392.00, -2, 0.04); // G4
    createDrone(493.88, 3, 0.06);  // B4
    createDrone(587.33, -3, 0.02); // D5

  } catch (e) {
    console.error("Audio initialization failed", e);
  }
};

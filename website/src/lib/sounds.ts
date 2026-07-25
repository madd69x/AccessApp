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

let ambientAudio: HTMLAudioElement | null = null;
let ambientAudioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let isMuted = false;

export const toggleMute = () => {
  isMuted = !isMuted;
  if (masterGain && ambientAudioCtx) {
    masterGain.gain.setTargetAtTime(isMuted ? 0 : 0.4, ambientAudioCtx.currentTime, 0.5);
  } else if (ambientAudio) {
    ambientAudio.volume = isMuted ? 0 : 0.4;
  }
  return isMuted;
};

export const playAmbientMelody = () => {
  if (typeof window === 'undefined') return;
  try {
    if (!ambientAudio) {
      // 1. Create the audio element
      ambientAudio = new Audio('/ambient_track.mp3');
      ambientAudio.loop = true;
      ambientAudio.crossOrigin = "anonymous";
      
      // 2. Set up Web Audio API for Spatial 3D Audio
      ambientAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = ambientAudioCtx.createMediaElementSource(ambientAudio);
      
      masterGain = ambientAudioCtx.createGain();
      masterGain.gain.value = isMuted ? 0 : 0.4;

      // 3. Create a true 3D Panner Node (HRTF)
      const panner = ambientAudioCtx.createPanner();
      panner.panningModel = 'HRTF'; // Head-related transfer function for 3D realism
      panner.distanceModel = 'inverse';
      panner.refDistance = 1;
      panner.maxDistance = 10000;
      panner.rolloffFactor = 1;
      panner.coneInnerAngle = 360;
      panner.coneOuterAngle = 0;
      panner.coneOuterGain = 0;

      // Connect the graph: AudioElement -> Panner -> Gain -> Speakers
      source.connect(panner);
      panner.connect(masterGain);
      masterGain.connect(ambientAudioCtx.destination);

      // 4. Animate the sound orbiting around the listener's head
      const orbitSpeed = 0.15; // Slow, calming rotation
      const orbitRadius = 4;   // Distance from head
      
      const animateSpatialAudio = () => {
        if (!ambientAudioCtx) return;
        const time = ambientAudioCtx.currentTime;
        const x = Math.sin(time * orbitSpeed) * orbitRadius;
        const z = Math.cos(time * orbitSpeed) * orbitRadius;
        
        // Use AudioParams if available (modern browsers), fallback to setPosition (older Safari)
        if (panner.positionX) {
          panner.positionX.setTargetAtTime(x, time, 0.1);
          panner.positionZ.setTargetAtTime(z, time, 0.1);
        } else {
          panner.setPosition(x, 0, z);
        }
        
        requestAnimationFrame(animateSpatialAudio);
      };
      
      animateSpatialAudio();
    }
    
    // Resume context if suspended (browser autoplay policies)
    if (ambientAudioCtx && ambientAudioCtx.state === 'suspended') {
      ambientAudioCtx.resume();
    }
    
    // Play the audio
    if (ambientAudio.paused) {
      if (ambientAudio.currentTime === 0) {
        ambientAudio.currentTime = 4; // Skip the first 4 seconds
      }
      ambientAudio.play().catch((e) => {
        console.error("Audio playback prevented by browser:", e);
      });
    }
  } catch (e) {
    console.error("Spatial audio initialization failed", e);
  }
};

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
let isMuted = false;

export const toggleMute = () => {
  isMuted = !isMuted;
  if (ambientAudio) {
    ambientAudio.volume = isMuted ? 0 : 0.2;
  }
  return isMuted;
};

export const playAmbientMelody = () => {
  if (typeof window === 'undefined') return;
  try {
    if (!ambientAudio) {
      ambientAudio = new Audio('/ambient_track.mp3');
      ambientAudio.loop = true;
      ambientAudio.volume = isMuted ? 0 : 0.2;
    }
    
    // Play the audio
    if (ambientAudio.paused) {
      ambientAudio.play().catch((e) => {
        console.error("Audio playback prevented by browser:", e);
      });
    }
  } catch (e) {
    console.error("Audio initialization failed", e);
  }
};

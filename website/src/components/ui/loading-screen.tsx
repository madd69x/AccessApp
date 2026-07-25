import React, { useState, useEffect } from 'react';
import { playAmbientMelody, playHoverSound, playClickSound } from '../../lib/sounds';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min(100, Math.floor((currentStep / steps) * 100)));
      if (currentStep >= steps) {
        clearInterval(timer);
        setIsLoaded(true);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const handleEnter = () => {
    if (!isLoaded) return;
    playClickSound();
    playAmbientMelody();
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  if (isFading && progress === 100 && !isLoaded) return null;

  return (
    <div 
      className="fixed inset-0 w-screen h-[100dvh] z-[10000] flex flex-col items-center justify-center bg-black transition-opacity duration-800 ease-in-out"
      style={{ opacity: isFading ? 0 : 1, pointerEvents: isFading ? 'none' : 'auto' }}
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Rings (Silver/White) */}
        <div className="relative w-48 h-48 flex items-center justify-center mb-12">
          <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-4 rounded-full border border-t-white/80 border-r-transparent border-b-transparent border-l-transparent animate-[spin_3s_cubic-bezier(0.4,0,0.2,1)_infinite]" />
          <div className="absolute inset-8 rounded-full border border-b-white/50 border-t-transparent border-r-transparent border-l-transparent animate-[spin_4s_cubic-bezier(0.4,0,0.2,1)_infinite_reverse]" />
          
          <div className="text-4xl font-['Sora'] font-extrabold tracking-tighter text-white">
            {progress}%
          </div>
        </div>

        {/* Enter Button (Premium Glow) */}
        <div className={`transition-all duration-700 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={handleEnter}
            onMouseEnter={playHoverSound}
            className="uiverse-btn-primary large group shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            style={{ padding: '1.2em 2.5em' }}
          >
            <span className="relative z-10 text-sm font-bold tracking-[0.2em] uppercase">
              Enter Experience
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

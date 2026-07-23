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
    }, 800); // Wait for fade out animation
  };

  if (isFading && progress === 100 && !isLoaded) return null; // Safety

  return (
    <div 
      className="fixed inset-0 w-screen h-[100dvh] z-[10000] flex flex-col items-center justify-center bg-[#050A15] transition-opacity duration-800 ease-in-out"
      style={{ opacity: isFading ? 0 : 1, pointerEvents: isFading ? 'none' : 'auto' }}
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Rings */}
        <div className="relative w-48 h-48 flex items-center justify-center mb-12">
          <div className="absolute inset-0 rounded-full border border-[#1E293B] animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-4 rounded-full border border-t-[#3B82F6] border-r-transparent border-b-transparent border-l-transparent animate-[spin_3s_cubic-bezier(0.4,0,0.2,1)_infinite]" />
          <div className="absolute inset-8 rounded-full border border-b-[#3B82F6] border-t-transparent border-r-transparent border-l-transparent animate-[spin_4s_cubic-bezier(0.4,0,0.2,1)_infinite_reverse]" />
          
          <div className="text-4xl font-['Sora'] font-extrabold tracking-tighter text-white">
            {progress}%
          </div>
        </div>

        {/* Enter Button */}
        <div className={`transition-all duration-700 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={handleEnter}
            onMouseEnter={playHoverSound}
            className="group relative px-8 py-4 bg-transparent border border-[#334155] rounded-full overflow-hidden hover:border-[#3B82F6] transition-colors duration-300"
          >
            <div className="absolute inset-0 bg-[#3B82F6] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 text-sm font-semibold tracking-[0.2em] uppercase text-[#94A3B8] group-hover:text-white transition-colors duration-300">
              Enter Experience
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

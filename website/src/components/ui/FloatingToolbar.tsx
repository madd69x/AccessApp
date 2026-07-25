import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { toggleMute, playHoverSound, playClickSound } from '../../lib/sounds';

export const FloatingToolbar: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleMute = () => {
    playClickSound();
    const muted = toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9000] flex items-center gap-3">
      <button
        onClick={handleToggleMute}
        onMouseEnter={playHoverSound}
        className="uiverse-btn-secondary shadow-[0_0_20px_rgba(255,255,255,0.05)]"
      >
        <div className="relative z-10 flex items-center justify-center">
          {isMuted ? (
            <VolumeX size={18} className="text-white/50 group-hover:text-white transition-colors" />
          ) : (
            <Volume2 size={18} className="text-white" />
          )}
        </div>
        
        <span className={`relative z-10 text-xs font-bold tracking-[0.1em] uppercase transition-colors ${
          isMuted ? 'text-white/50 group-hover:text-white' : 'text-white'
        }`}>
          {isMuted ? 'Audio Off' : 'Sound On'}
        </span>
      </button>
    </div>
  );
};

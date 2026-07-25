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
        className="group relative p-3 rounded-full bg-[#1E293B]/80 backdrop-blur-md border border-[#334155] shadow-lg hover:border-[#3B82F6] hover:bg-[#3B82F6]/10 transition-all duration-300"
        aria-label={isMuted ? "Unmute Ambient Audio" : "Mute Ambient Audio"}
      >
        {isMuted ? (
          <VolumeX size={20} className="text-[#94A3B8] group-hover:text-white transition-colors" />
        ) : (
          <Volume2 size={20} className="text-[#94A3B8] group-hover:text-[#3B82F6] transition-colors" />
        )}
      </button>
    </div>
  );
};

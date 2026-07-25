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
        className={`group relative flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-2xl border transition-all duration-500 overflow-hidden shadow-2xl ${
          isMuted 
            ? 'bg-black/60 border-white/5 hover:border-white/20' 
            : 'bg-white/10 border-white/20 hover:border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.05)]'
        }`}
      >
        {/* Animated background glow when playing */}
        {!isMuted && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none" />
        )}
        
        {/* Equalizer bars (only when playing) */}
        {!isMuted && (
          <div className="flex items-end gap-[2px] h-4 w-4 mr-1">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="w-1 bg-white rounded-t-sm animate-[eq_1s_ease-in-out_infinite_alternate]"
                style={{ 
                  height: '100%',
                  animationDelay: `${i * 0.15}s` 
                }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10 flex items-center justify-center">
          {isMuted ? (
            <VolumeX size={18} className="text-white/30 group-hover:text-white transition-colors" />
          ) : (
            <Volume2 size={18} className="text-white" />
          )}
        </div>
        
        <span className={`relative z-10 font-['Sora'] text-xs font-bold tracking-[0.15em] uppercase transition-colors ${
          isMuted ? 'text-white/30 group-hover:text-white' : 'text-white'
        }`}>
          {isMuted ? 'Audio Off' : 'Sound On'}
        </span>
      </button>
    </div>
  );
};

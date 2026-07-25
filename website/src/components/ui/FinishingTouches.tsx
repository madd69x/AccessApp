import { useState, useEffect } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true);
      return;
    }

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' || 
        target.closest('button') || 
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide default cursor globally when this mounts
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Inner Dot */}
      <div 
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference transition-transform duration-100 ease-out"
        style={{ 
          transform: `translate3d(${position.x - 6}px, ${position.y - 6}px, 0) scale(${isHovering ? 3 : 1})`,
        }}
      />
      {/* Outer Ring */}
      <div 
        className="fixed top-0 left-0 w-10 h-10 border-[1px] border-white/40 rounded-full pointer-events-none z-[9999] transition-all duration-300 ease-out"
        style={{ 
          transform: `translate3d(${position.x - 20}px, ${position.y - 20}px, 0) scale(${isHovering ? 1.5 : 1})`,
          opacity: isHovering ? 0 : 1
        }}
      />
    </>
  );
};

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight === 0) return;
      
      const scroll = totalScroll / windowHeight;
      setProgress(scroll * 100);
    }
    
    window.addEventListener('scroll', handleScroll);
    // Initial call
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[10001] bg-transparent">
      <div 
        className="h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] transition-all duration-75 ease-out rounded-r-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

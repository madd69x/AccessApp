'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

export interface FlowSectionProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  'aria-label'?: string;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  className,
  style = {},
  children,
  'aria-label': ariaLabel,
}) => (
  <section
    data-flow-section
    aria-label={ariaLabel}
    className={cx('relative min-h-[100dvh] flex flex-col justify-center w-full', className)}
    style={style}
  >
    <div
      data-flow-inner
      className="flow-art-container relative w-full h-full min-h-[100dvh] px-5 md:px-8 lg:px-12 mx-auto flex flex-col justify-center transform-gpu"
    >
      {children}
    </div>
  </section>
);

export interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

const childCount = (children: React.ReactNode) => React.Children.count(children);

const FlowArt: React.FC<FlowArtProps> = ({
  children,
  className,
  'aria-label': ariaLabel = 'Story scroll',
}) => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Safe mobile detection that runs on mount
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const sections = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>('[data-flow-section]'),
      );
      if (sections.length === 0) return;

      const triggers: ScrollTrigger[] = [];
      
      const isMobileDevice = window.innerWidth < 768;

      sections.forEach((section, i) => {
        const inner = section.querySelector<HTMLElement>('.flow-art-container');
        if (!inner) return;

        if (isMobileDevice) {
          // SIMPLE MOBILE ANIMATION (NO PINNING, NO OVERFLOW BUGS)
          if (i > 0) {
            gsap.set(inner, { opacity: 0, y: 50 });
            const st = ScrollTrigger.create({
              trigger: section,
              start: 'top 80%',
              animation: gsap.to(inner, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }),
              toggleActions: 'play none none reverse',
            });
            triggers.push(st);
          }
        } else {
          // PREMIUM DESKTOP ANIMATION (PINNING AND ROTATION)
          gsap.set(inner, {
            transformOrigin: 'bottom center',
            rotationX: i === 0 ? 0 : -30,
            scale: i === 0 ? 1 : 0.9,
            opacity: i === 0 ? 1 : 0,
            y: i === 0 ? 0 : 50,
          });

          // Pin the section wrapper
          const st = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: '+=100%',
            pin: true,
            pinSpacing: false, // Prevents giant gaps between slides
          });
          triggers.push(st);

          if (i > 0) {
            const tween = gsap.to(inner, {
              rotationX: 0,
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top top',
                scrub: 1,
              },
            });
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
          }
        }
      });

      return () => {
        triggers.forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [childCount(children), isMobile] },
  );

  return (
    <main
      ref={containerRef}
      aria-label={ariaLabel}
      className={cx('w-full perspective-1000', className)}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {children}
    </main>
  );
};

export default FlowArt;

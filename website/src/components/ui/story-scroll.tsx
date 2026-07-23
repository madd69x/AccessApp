'use client';

import React, { useRef } from 'react';
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

      sections.forEach((section, i) => {
        const inner = section.querySelector<HTMLElement>('.flow-art-container');
        if (!inner) return;

        // The original premium rotating animation
        gsap.set(inner, {
          transformOrigin: 'bottom center',
          rotationX: i === 0 ? 0 : -30,
          scale: i === 0 ? 1 : 0.9,
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 50,
        });

        // Add a master scroll trigger for the whole section
        const st = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: false, // Prevents layout shifting/overflow bugs on mobile!
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
      });

      return () => {
        triggers.forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [childCount(children)] },
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

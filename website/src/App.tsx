import React, { useRef, useState, useEffect } from "react";
import { LoadingScreen } from "./components/ui/loading-screen";
import { FloatingToolbar } from "./components/ui/FloatingToolbar";
import Spline from '@splinetool/react-spline';
import { MagneticCursor } from "./components/ui/magnetic-cursor";
import { Radar, Languages, Sun, Layers, Cpu, Eye, Download, Shield, WifiOff, ChevronDown, Code2, Smartphone } from "lucide-react";
import { playHoverSound, playClickSound } from "./lib/sounds";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Swiper for 3D Carousel
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

gsap.registerPlugin(ScrollTrigger);

// ── 3D Reveal Animation Wrapper ──
const Reveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    document.fonts?.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }, []);

  useGSAP(() => {
    if (!ref.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(ref.current, { opacity: 1, y: 0 });
      return;
    }

    // 3D starting state
    gsap.set(ref.current, { 
      opacity: 0, 
      y: 60, 
      rotationX: -15, 
      scale: 0.95,
      transformPerspective: 1000 
    });
    
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      animation: gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 1.2,
        delay: delay,
        ease: "power3.out"
      }),
      toggleActions: "play none none none",
      once: true
    });
  }, { scope: ref });

  return <div ref={ref} className="will-change-[opacity,transform]">{children}</div>;
};

// ── Stat counter ──
const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="uiverse-stat w-full">
    <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Sora'] font-bold text-white tracking-tight">{value}</p>
    <p className="text-xs text-white/50 uppercase tracking-widest mt-3">{label}</p>
  </div>
);

// ── Feature Card (No Image, No square icons) ──
const FeatureCard = ({
  icon, title, description, tags
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags?: string[];
}) => (
  <div className="uiverse-card group p-8 md:p-10 h-[320px] flex flex-col relative overflow-hidden justify-center text-center items-center">
    <div className="mb-6 flex justify-center text-white scale-125">
      {icon}
    </div>
    <h3 className="text-2xl font-['Sora'] font-bold text-white mb-4 tracking-tight group-hover:text-white transition-colors duration-300">{title}</h3>
    <p className="text-base text-white/60 font-normal leading-relaxed group-hover:text-white/90 transition-colors duration-300 max-w-sm">{description}</p>
    {tags && tags.length > 0 && (
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {tags.map((tag) => (
          <span key={tag} className="uiverse-tag">{tag}</span>
        ))}
      </div>
    )}
  </div>
);

const DownloadButton = ({ large = false }: { large?: boolean }) => (
  <a
    data-magnetic
    href="https://github.com/madd69x/AccessApp/releases"
    target="_blank"
    rel="noreferrer"
    onMouseEnter={playHoverSound}
    onClick={playClickSound}
    className={`uiverse-btn-primary w-full sm:w-auto justify-center pointer-events-auto${large ? ' large' : ''}`}
  >
    <Download size={18} strokeWidth={2.5} />
    Download APK
  </a>
);

const GithubButton = ({ large = false }: { large?: boolean }) => (
  <a
    data-magnetic
    href="https://github.com/madd69x/AccessApp"
    target="_blank"
    rel="noreferrer"
    onMouseEnter={playHoverSound}
    onClick={playClickSound}
    className={`uiverse-btn-secondary w-full sm:w-auto justify-center pointer-events-auto${large ? ' large' : ''}`}
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
    Source Code
  </a>
);

function Overlay() {
  const architectureCards = [
    {
      title: 'UX Design',
      icon: <Layers size={24} className="text-white" />,
      points: [
        { strong: 'Kinetic Feedback', text: 'Compose spring() physics engine for organic interactions.' },
        { strong: 'Spatial Audio', text: '3D audio cues adapting to user orientation.' },
        { strong: 'Adaptive Contrast', text: 'APCA palette based on ambient light.' }
      ]
    },
    {
      title: 'ML Pipeline',
      icon: <Cpu size={24} className="text-white" />,
      points: [
        { strong: 'TensorFlow Lite', text: 'Quantized INT8 models running at 30fps.' },
        { strong: 'MediaPipe', text: 'Real-time hand landmark tracking.' },
        { strong: 'ML Kit OCR', text: 'Multi-language optical character recognition.' }
      ]
    },
    {
      title: 'Privacy By Design',
      icon: <Shield size={24} className="text-white" />,
      points: [
        { strong: 'Zero Cloud', text: 'All inference runs completely on-device.' },
        { strong: 'No Telemetry', text: 'Zero usage data or analytics collected.' },
        { strong: 'Open Source', text: 'Fully auditable codebase on GitHub.' }
      ]
    }
  ];

  return (
    <main className="text-white font-['Inter'] selection:bg-white selection:text-black w-full bg-black relative">

      {/* ── 1. HERO ── */}
      <section aria-label="Hero" className="bg-transparent w-full min-h-screen flex items-center justify-center pt-32 pb-24 md:pt-40 md:pb-32 landscape:pt-16 landscape:pb-12 px-5 sm:px-8 relative overflow-hidden">
        
        {/* Spline Background */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto opacity-70 mix-blend-screen overflow-hidden">
          <div className="w-full h-full" style={{ transform: 'scale(1.2) translate(-2%, 5%)' }}>
            <Spline scene="https://prod.spline.design/47GLu4jJKPAAd4Yk/scene.splinecode" />
          </div>
        </div>
        
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-b from-black/80 via-transparent to-black pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 pointer-events-none">
          <Reveal>
            <p className="uiverse-label mb-8 md:mb-10">
              Accessibility · Reimagined
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              data-magnetic
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-['Sora'] font-extrabold uppercase tracking-tighter mb-6 text-white leading-none break-words drop-shadow-2xl"
              style={{ wordBreak: 'break-word' }}
            >
              Access<br />App
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-base sm:text-lg md:text-xl text-white/60 font-normal max-w-2xl leading-relaxed mb-12">
              AI-powered spatial awareness for the visually and hearing impaired.
              Runs entirely on-device. No cloud. No latency. No compromise.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-sm sm:max-w-none gap-4 sm:gap-6 mb-16 pointer-events-auto">
              <DownloadButton large />
              <GithubButton large />
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="animate-bounce text-white/30 hover:text-white/80 transition-colors pointer-events-auto cursor-pointer">
              <ChevronDown size={28} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. STATS ── */}
      <section aria-label="Stats" className="bg-transparent w-full py-24 md:py-32 landscape:py-16 px-5 sm:px-8 relative z-10">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
          <Reveal>
            <p className="uiverse-label mb-12 md:mb-16">
              Built for Impact
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 w-full max-w-4xl mb-16">
            <Reveal delay={0.1}><StatItem value="4" label="Core Modules" /></Reveal>
            <Reveal delay={0.2}><StatItem value="<50ms" label="Inference Latency" /></Reveal>
            <Reveal delay={0.3}><StatItem value="100%" label="Offline Capable" /></Reveal>
            <Reveal delay={0.4}><StatItem value="0" label="Data Collected" /></Reveal>
          </div>

          <Reveal delay={0.5}>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
              <div className="badge-pill"><WifiOff size={14} className="text-white" />No Internet Required</div>
              <div className="badge-pill"><Shield size={14} className="text-white" />Privacy First</div>
              <div className="badge-pill"><Eye size={14} className="text-white" />Open Source</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. MISSION ── */}
      <section aria-label="Mission" className="bg-transparent w-full py-24 md:py-32 landscape:py-16 px-5 sm:px-8 relative z-10">
        <div className="w-full max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="uiverse-label mb-8 justify-center">
              The Problem
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Sora'] font-bold leading-[1.1] text-white mb-8 tracking-tighter break-words" style={{ wordBreak: 'break-word' }}>
              Accessibility shouldn't depend on a Wi-Fi signal.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base sm:text-lg text-white/60 font-normal leading-relaxed mb-6 max-w-2xl mx-auto">
              Traditional accessibility tools rely on high-latency cloud APIs, compromising privacy and failing completely in low-connectivity environments — precisely where users need them most.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-base sm:text-lg text-white/60 font-normal leading-relaxed max-w-2xl mx-auto">
              <strong className="text-white">AccessApp</strong> fundamentally changes this by running advanced computer vision models directly on the user's device. Instant response. Total privacy. Works anywhere.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 4. FLAGSHIP MODULES (3D Swiper Carousel) ── */}
      <section aria-label="Modules" className="bg-transparent w-full py-24 md:py-32 landscape:py-16 px-5 sm:px-8 relative z-10 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <p className="uiverse-label mb-4 justify-center">
                Core Features
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Sora'] font-bold text-white tracking-tighter">
                Four modules. Zero cloud dependency.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="w-full cursor-grab active:cursor-grabbing pb-12">
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                initialSlide={1}
                coverflowEffect={{
                  rotate: 20,
                  stretch: 0,
                  depth: 200,
                  modifier: 1,
                  slideShadows: false,
                }}
                loop={true}
                pagination={{ clickable: true }}
                navigation={true}
                autoplay={{ delay: 5000, disableOnInteraction: true }}
                modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
                className="w-full max-w-5xl"
                breakpoints={{
                  320: { slidesPerView: 1.1, spaceBetween: 20 },
                  640: { slidesPerView: 1.5, spaceBetween: 30 },
                  1024: { slidesPerView: 2.2, spaceBetween: 40 },
                }}
              >
                <SwiperSlide>
                  <FeatureCard
                    icon={<Radar size={32} />}
                    title="Obstacle Radar"
                    description="Real-time object detection via the camera. Identifies approaching obstacles with precision."
                    tags={['Haptic Feedback', 'Sonar Alerts', 'TFLite']}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <FeatureCard
                    icon={<Eye size={32} />}
                    title="Notes-to-Audio"
                    description="OCR scanner that converts any printed or handwritten text into spoken audio instantly."
                    tags={['Auto-Language', 'Neural TTS', 'ML Kit']}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <FeatureCard
                    icon={<Languages size={32} />}
                    title="Live ASL Translator"
                    description="Identifies American Sign Language letters in real-time from the camera feed."
                    tags={['MediaPipe', 'Real-time', 'A–Z Letters']}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <FeatureCard
                    icon={<Sun size={32} />}
                    title="Color & Light"
                    description="Analyzes camera feed to output exact RGB values and relative luminance."
                    tags={['RGB Analysis', 'Luminance', 'Voice Output']}
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5. ARCHITECTURE (Bento Grid) ── */}
      <section aria-label="Architecture" className="bg-transparent w-full py-24 md:py-32 landscape:py-16 px-5 sm:px-8 relative z-10">
        <div className="w-full max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <p className="uiverse-label mb-4 justify-center">
                Under the Hood
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Sora'] font-bold text-white tracking-tighter">
                Engineering at the edge.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-12">
            {architectureCards.map((card, i) => (
              <Reveal key={card.title} delay={0.2 + (i * 0.1)}>
                <div className="tech-bento-card h-auto">
                  <div className="flex items-center gap-4 mb-6">
                    {card.icon}
                    <h3 className="text-xl font-['Sora'] font-bold text-white">{card.title}</h3>
                  </div>
                  <ul className="space-y-6">
                    {card.points.map((point) => (
                      <li key={point.strong} className="flex gap-3">
                        <div>
                          <strong className="text-white/90 text-base font-semibold block mb-1">{point.strong}</strong>
                          <p className="text-sm text-white/50 leading-relaxed">{point.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {[
                { label: 'Language', value: 'Kotlin', icon: <Code2 size={18} className="text-white" /> },
                { label: 'UI Framework', value: 'Jetpack Compose', icon: <Layers size={18} className="text-white" /> },
                { label: 'Minimum SDK', value: 'API 30', icon: <Smartphone size={18} className="text-white" /> },
                { label: 'ML Runtime', value: 'TensorFlow Lite', icon: <Cpu size={18} className="text-white" /> },
              ].map((tech) => (
                <div key={tech.label} className="flex flex-col p-4 justify-center items-center text-center rounded-sm bg-white/5 hover:bg-white/10 transition-colors duration-300">
                  <div className="mb-3 opacity-70">
                    {tech.icon}
                  </div>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold block mb-1">{tech.label}</span>
                  <span className="text-sm text-white font-semibold block tracking-tight">{tech.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. HOW IT WORKS ── */}
      <section aria-label="How it works" className="bg-transparent w-full py-24 md:py-32 landscape:py-16 px-5 sm:px-8 relative z-10">
        <div className="w-full max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <p className="uiverse-label mb-4 justify-center">
                Getting Started
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Sora'] font-bold text-white tracking-tighter">
                Three steps. That's it.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { step: '01', title: 'Download', desc: 'Grab the APK from GitHub Releases or clone the repo to build from source.' },
              { step: '02', title: 'Install', desc: 'Sideload the APK onto any Android device running API 30+ (Android 11 or later).' },
              { step: '03', title: 'Use', desc: 'Open AccessApp, choose a module, and point your camera. No sign-ups. No cloud.' },
            ].map((item, index) => (
              <Reveal key={item.step} delay={0.2 + (index * 0.1)}>
                <div className="step-card group h-full text-center md:text-left">
                  <p className="uiverse-step-num mb-6 md:mb-8">{item.step}</p>
                  <h3 className="text-lg md:text-xl font-['Sora'] font-bold text-white mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-base text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA / FOOTER ── */}
      <section aria-label="Footer" className="bg-transparent w-full min-h-[90vh] flex flex-col justify-between py-24 md:py-32 landscape:py-16 px-5 sm:px-8 relative overflow-hidden">
        
        {/* Spline Background: Fixed layout so robot sits properly (removed rotation and heavy scaling) */}
        <div className="absolute inset-0 w-full h-full z-0 opacity-60 mix-blend-screen pointer-events-auto flex items-end justify-center mb-[-10%] overflow-hidden">
          <div className="w-full h-full" style={{ transform: 'scale(1.2) translate(-2%, 5%)' }}>
            <Spline scene="https://prod.spline.design/47GLu4jJKPAAd4Yk/scene.splinecode" />
          </div>
        </div>
        
        <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

        <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center relative z-10 pointer-events-none mt-10">
          <Reveal>
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] font-['Sora'] font-extrabold text-white uppercase tracking-tighter mb-6 leading-none break-words" style={{ wordBreak: 'break-word' }}>
              See the world<br />differently.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg sm:text-xl md:text-2xl text-white/50 max-w-2xl mb-12 leading-relaxed">
              AccessApp is free, open-source, and built for the people who need it most.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-sm sm:max-w-none gap-4 sm:gap-6 pointer-events-auto">
              <DownloadButton large />
              <GithubButton large />
            </div>
          </Reveal>
        </div>

        {/* Minimalist Footer Bar */}
        <div className="w-full relative z-10 mt-20">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6 pointer-events-auto p-6">
            <p className="text-xs text-white/30 uppercase tracking-[0.2em] font-bold">© 2026 Vortex AI</p>
            <div className="flex flex-wrap items-center justify-center gap-y-3">
              {['Avadhi', 'Mudit', 'Mudra', 'Jigyasha', 'Monalika'].map((name, i, arr) => (
                <div key={name} className="flex items-center">
                  <span className="text-xs text-white/40 font-bold uppercase tracking-[0.1em] hover:text-white transition-colors duration-300 cursor-pointer mx-3">
                    {name}
                  </span>
                  {i < arr.length - 1 && <span className="text-white/20">•</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

export default function App() {
  const [showLoading, setShowLoading] = useState(true);

  return (
    <>
      {showLoading && (
        <LoadingScreen onComplete={() => setShowLoading(false)} />
      )}
      <FloatingToolbar />
      <MagneticCursor magneticFactor={0.5} blendMode="difference" cursorSize={40}>
        <div 
          className="w-full bg-black relative flex flex-col overflow-x-hidden transition-opacity duration-1000 ease-in-out"
          style={{ opacity: showLoading ? 0 : 1, pointerEvents: showLoading ? 'none' : 'auto', height: showLoading ? '100vh' : 'auto', overflowY: showLoading ? 'hidden' : 'auto' }}
        >
          <Overlay />
        </div>
      </MagneticCursor>
    </>
  );
}

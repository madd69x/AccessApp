import React, { useRef, useState, useEffect } from "react";
import { LoadingScreen } from "./components/ui/loading-screen";
import { FloatingToolbar } from "./components/ui/FloatingToolbar";
import Spline from '@splinetool/react-spline';
import { MagneticCursor } from "./components/ui/magnetic-cursor";
import { Radar, Languages, Sun, Layers, Cpu, Eye, Download, Shield, WifiOff, ChevronDown, Code2, Smartphone, Target, Hand, ScanText, Monitor } from "lucide-react";
import { playHoverSound, playClickSound } from "./lib/sounds";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

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

    gsap.set(ref.current, { opacity: 0, y: 30 });
    
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      animation: gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: delay,
        ease: "power3.out"
      }),
      toggleActions: "play none none none",
      once: true
    });
  }, { scope: ref });

  return <div ref={ref} className="will-change-[opacity,transform]">{children}</div>;
};

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center mb-4 flex-shrink-0"
    style={{ width: '48px', height: '48px', minWidth: '48px', minHeight: '48px' }}
  >
    {children}
  </div>
);

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="uiverse-stat w-full">
    <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Sora'] font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 tracking-tight">{value}</p>
    <p className="text-xs text-white/50 uppercase tracking-widest mt-3">{label}</p>
  </div>
);

const FeatureCard = ({
  icon, title, description, tags, image
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags?: string[];
  image?: string;
}) => (
  <div className="uiverse-card group p-6 md:p-8 h-full flex flex-col relative overflow-hidden">
    {image && (
      <div className="w-full h-32 md:h-40 mb-6 rounded-xl overflow-hidden border border-white/5 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-out" />
      </div>
    )}
    <div className="flex items-start gap-4 flex-1 relative z-10">
      <IconWrapper>{icon}</IconWrapper>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg md:text-xl font-['Sora'] font-bold text-white mb-2 tracking-tight group-hover:text-[#EC4899] transition-colors duration-300">{title}</h3>
        <p className="text-sm md:text-base text-white/60 font-normal leading-relaxed group-hover:text-white/90 transition-colors duration-300">{description}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <span key={tag} className="uiverse-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
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
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'UX Design', icon: <Layers size={14} /> },
    { label: 'ML Pipeline', icon: <Cpu size={14} /> },
    { label: 'Privacy', icon: <Shield size={14} /> },
  ];

  const tabContent = [
    {
      title: 'Designed for Zero Friction',
      points: [
        { strong: 'Kinetic Feedback', text: 'Compose spring() physics engine for organic, responsive micro-interactions.' },
        { strong: 'Spatial Audio', text: 'Full 3D audio cues that adapt to the user\'s physical orientation.' },
        { strong: 'Adaptive Contrast', text: 'APCA-calibrated palette that adjusts based on ambient light sensor data.' },
      ],
    },
    {
      title: 'Edge-First Intelligence',
      points: [
        { strong: 'TensorFlow Lite', text: 'Quantized INT8 models running at 30fps on mid-range Android hardware.' },
        { strong: 'MediaPipe', text: 'Real-time hand landmark and gesture recognition with sub-50ms latency.' },
        { strong: 'ML Kit OCR', text: 'Multi-language optical character recognition with automatic script detection.' },
      ],
    },
    {
      title: 'Privacy by Architecture',
      points: [
        { strong: 'Zero Cloud Dependency', text: 'All inference runs on-device. No images or data ever leave the phone.' },
        { strong: 'No Telemetry', text: 'AccessApp collects absolutely no usage data or analytics.' },
        { strong: 'Open Source', text: 'Every line of code is publicly auditable on GitHub.' },
      ],
    },
  ];

  return (
    <main className="text-white font-['Inter'] selection:bg-pink-500 selection:text-white w-full bg-black">

      {/* ── 1. HERO ── */}
      <section aria-label="Hero" className="bg-transparent w-full min-h-screen flex items-center justify-center pt-32 pb-24 md:pt-40 md:pb-32 landscape:pt-16 landscape:pb-12 px-5 sm:px-8 relative overflow-hidden">
        
        {/* Spline Background */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto opacity-70 mix-blend-screen">
          <Spline scene="https://prod.spline.design/47GLu4jJKPAAd4Yk/scene.splinecode" />
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
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-['Sora'] font-extrabold uppercase tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/30 leading-none break-words drop-shadow-2xl"
              style={{ wordBreak: 'break-word' }}
            >
              Access<br />App
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-base sm:text-lg md:text-xl text-white/70 font-normal max-w-2xl leading-relaxed mb-12">
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
      <section aria-label="Stats" className="bg-[#030303] w-full py-24 md:py-32 landscape:py-16 px-5 sm:px-8 border-y border-white/5 relative overflow-hidden">
        
        {/* Abstract blur blobs */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto flex flex-col items-center relative z-10">
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
              <div className="badge-pill"><WifiOff size={14} className="text-[#8B5CF6]" />No Internet Required</div>
              <div className="badge-pill"><Shield size={14} className="text-[#EC4899]" />Privacy First</div>
              <div className="badge-pill"><Eye size={14} className="text-[#8B5CF6]" />Open Source</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. MISSION ── */}
      <section aria-label="Mission" className="bg-transparent w-full py-24 md:py-32 landscape:py-16 px-5 sm:px-8">
        <div className="w-full max-w-4xl mx-auto">
          <Reveal>
            <p className="uiverse-label mb-8">
              The Problem
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Sora'] font-extrabold leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-8 tracking-tighter break-words" style={{ wordBreak: 'break-word' }}>
              Accessibility shouldn't depend on a Wi-Fi signal.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base sm:text-lg text-white/60 font-normal leading-relaxed mb-6">
              Traditional accessibility tools rely on high-latency cloud APIs, compromising privacy and failing completely in low-connectivity environments — precisely where users need them most.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-base sm:text-lg text-white/60 font-normal leading-relaxed">
              <strong className="text-white">AccessApp</strong> fundamentally changes this by running advanced computer vision models directly on the user's device. Instant response. Total privacy. Works anywhere.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 4. FLAGSHIP MODULES ── */}
      <section aria-label="Modules" className="bg-[#030303] w-full py-24 md:py-32 landscape:py-16 px-5 sm:px-8 border-t border-white/5 relative">
        <div className="w-full max-w-6xl mx-auto relative z-10">
          <Reveal>
            <p className="uiverse-label mb-4">
              Core Features
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Sora'] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-12 tracking-tighter">
              Four modules. Zero cloud dependency.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <Reveal delay={0.2}>
              <FeatureCard
                icon={<Radar size={22} color="#EC4899" />}
                title="Obstacle Radar"
                description="Real-time object detection via the device camera. Identifies approaching obstacles and their distance with millimeter precision."
                tags={['Haptic Feedback', 'Sonar Alerts', 'TFLite']}
                image="/images/radar_banner.jpg"
              />
            </Reveal>
            <Reveal delay={0.3}>
              <FeatureCard
                icon={<Eye size={22} color="#8B5CF6" />}
                title="Notes-to-Audio"
                description="OCR scanner powered by ML Kit that converts any printed or handwritten text into spoken audio instantly."
                tags={['Auto-Language', 'Neural TTS', 'ML Kit']}
                image="/images/ocr_banner.jpg"
              />
            </Reveal>
            <Reveal delay={0.4}>
              <FeatureCard
                icon={<Languages size={22} color="#EC4899" />}
                title="Live ASL Translator"
                description="Uses MediaPipe Gesture Recognizer to identify American Sign Language letters in real-time from the camera feed."
                tags={['MediaPipe', 'Real-time', 'A–Z Letters']}
                image="/images/asl_banner.jpg"
              />
            </Reveal>
            <Reveal delay={0.5}>
              <FeatureCard
                icon={<Sun size={22} color="#8B5CF6" />}
                title="Color & Light"
                description="Analyzes camera feed to output exact RGB values and relative luminance, converting them to human-readable color names."
                tags={['RGB Analysis', 'Luminance', 'Voice Output']}
                image="/images/color_banner.jpg"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 5. ARCHITECTURE ── */}
      <section aria-label="Architecture" className="bg-transparent w-full py-24 md:py-32 landscape:py-16 px-5 sm:px-8 border-t border-white/5 relative overflow-hidden">
        
        {/* Background Spline inside architecture */}
        <div className="absolute inset-0 w-full h-full z-0 opacity-20 mix-blend-screen pointer-events-none" style={{ transform: 'scale(1.5)' }}>
          <Spline scene="https://prod.spline.design/47GLu4jJKPAAd4Yk/scene.splinecode" />
        </div>
        
        <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />

        <div className="w-full max-w-6xl mx-auto relative z-10">
          <Reveal>
            <p className="uiverse-label mb-4">
              Under the Hood
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Sora'] font-extrabold text-white mb-12 tracking-tighter">
              Engineering at the edge.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: tabs */}
            <Reveal delay={0.2}>
              <div>
                <div className="overflow-x-auto pb-4 mb-6 scrollbar-hide">
                  <div className="uiverse-tabs flex-nowrap w-max">
                    {tabs.map((tab, i) => (
                      <button
                        key={tab.label}
                        onClick={() => setActiveTab(i)}
                        className={`uiverse-tab${activeTab === i ? ' active' : ''}`}
                      >
                        {tab.icon}
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="min-h-[220px]">
                  <h3 className="text-xl md:text-2xl font-['Sora'] font-bold text-white mb-6">
                    {tabContent[activeTab].title}
                  </h3>
                  <ul className="space-y-6">
                    {tabContent[activeTab].points.map((point) => (
                      <li key={point.strong} className="flex gap-4">
                        <div className="mt-2.5 flex-shrink-0">
                          <div className="uiverse-pulse" />
                        </div>
                        <div>
                          <strong className="text-white text-base font-semibold">{point.strong}</strong>
                          <p className="text-base text-white/60 mt-1.5 leading-relaxed">{point.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Right: tech stack grid */}
            <Reveal delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Language', value: 'Kotlin', icon: <Code2 size={18} color="#8B5CF6" /> },
                  { label: 'UI Framework', value: 'Jetpack Compose', icon: <Layers size={18} color="#EC4899" /> },
                  { label: 'Minimum SDK', value: 'API 30', icon: <Smartphone size={18} color="#8B5CF6" /> },
                  { label: 'Target SDK', value: 'API 36', icon: <Target size={18} color="#EC4899" /> },
                  { label: 'ML Runtime', value: 'TensorFlow Lite', icon: <Cpu size={18} color="#8B5CF6" /> },
                  { label: 'Gesture Engine', value: 'MediaPipe', icon: <Hand size={18} color="#EC4899" /> },
                  { label: 'OCR Engine', value: 'Google ML Kit', icon: <ScanText size={18} color="#8B5CF6" /> },
                  { label: 'IDE', value: 'Android Studio', icon: <Monitor size={18} color="#EC4899" /> }
                ].map((tech) => (
                  <div key={tech.label} className="tech-bento-card group p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors border border-white/5">
                        {tech.icon}
                      </div>
                      <span className="text-[11px] text-white/50 uppercase tracking-widest font-bold">{tech.label}</span>
                    </div>
                    <span className="text-sm md:text-base text-white font-semibold block tracking-tight">{tech.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 6. HOW IT WORKS ── */}
      <section aria-label="How it works" className="bg-[#030303] w-full py-24 md:py-32 landscape:py-16 px-5 sm:px-8 border-y border-white/5">
        <div className="w-full max-w-6xl mx-auto">
          <Reveal>
            <p className="uiverse-label mb-4">
              Getting Started
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Sora'] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-12 tracking-tighter">
              Three steps. That's it.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { step: '01', title: 'Download', desc: 'Grab the APK from GitHub Releases or clone the repo to build from source.' },
              { step: '02', title: 'Install', desc: 'Sideload the APK onto any Android device running API 30+ (Android 11 or later).' },
              { step: '03', title: 'Use', desc: 'Open AccessApp, choose a module, and point your camera. No sign-ups. No cloud.' },
            ].map((item, index) => (
              <Reveal key={item.step} delay={0.2 + (index * 0.1)}>
                <div className="step-card group h-full">
                  <p className="uiverse-step-num mb-4">{item.step}</p>
                  <h3 className="text-lg md:text-xl font-['Sora'] font-bold text-white mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-base text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA / FOOTER ── */}
      <section aria-label="Footer" className="bg-black w-full min-h-screen flex items-center justify-center py-24 md:py-32 landscape:py-16 px-5 sm:px-8 relative overflow-hidden">
        
        {/* Deep Spline Background */}
        <div className="absolute inset-0 w-full h-full z-0 opacity-90 mix-blend-screen pointer-events-auto" style={{ transform: 'rotate(180deg) scale(1.2)' }}>
          <Spline scene="https://prod.spline.design/47GLu4jJKPAAd4Yk/scene.splinecode" />
        </div>
        
        <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-t from-black via-black/40 to-black pointer-events-none" />

        <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center relative z-10 pointer-events-none mt-20">
          <Reveal>
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] font-['Sora'] font-extrabold text-white uppercase tracking-tighter mb-6 leading-none break-words drop-shadow-2xl" style={{ wordBreak: 'break-word' }}>
              See the world<br />differently.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-2xl mb-12 leading-relaxed">
              AccessApp is free, open-source, and built for the people who need it most.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-sm sm:max-w-none gap-4 sm:gap-6 mb-32 pointer-events-auto">
              <DownloadButton large />
              <GithubButton large />
            </div>
          </Reveal>

          {/* Footer bar */}
          <div className="w-full border-t border-white/10 pt-10 flex flex-col lg:flex-row justify-between items-center gap-6 pointer-events-auto backdrop-blur-md bg-black/20 p-6 rounded-3xl">
            <p className="text-sm text-white/40 uppercase tracking-widest font-bold">© 2026 Vortex AI</p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
              {['Avadhi Sharma', 'Mudit Vaishnav', 'Mudra Chauhan', 'Jigyasha Mahariya', 'Monalika Vyas'].map((name, i, arr) => (
                <div key={name} className="flex items-center">
                  <span className="text-xs sm:text-sm text-white/40 font-bold uppercase tracking-widest hover:text-[#EC4899] transition-colors duration-300 cursor-pointer">
                    {name}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="ml-4 text-white/20">•</span>
                  )}
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

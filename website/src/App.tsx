import React, { useRef, useState, useEffect } from "react";
import { LoadingScreen } from "./components/ui/loading-screen";
import { MagneticCursor } from "./components/ui/magnetic-cursor";
import { Radar, Languages, Sun, Layers, Cpu, Eye, Download, Shield, WifiOff, ChevronDown, Code2, Smartphone, Target, Hand, ScanText, Monitor } from "lucide-react";
import { playHoverSound, playClickSound } from "./lib/sounds";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// ── Reveal Animation Wrapper ──
// Safe, layout-preserving fade-up animation. No pinning, no absolute positioning.
const Reveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Refresh ScrollTrigger when fonts load to prevent miscalculated trigger positions
  useEffect(() => {
    document.fonts?.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }, []);

  useGSAP(() => {
    if (!ref.current) return;
    
    // Check for reduced motion preference
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

// ── Icon wrapper ──
const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    className="rounded-xl border border-[#334155] bg-[#0F172A] flex items-center justify-center mb-4 flex-shrink-0"
    style={{ width: '44px', height: '44px', minWidth: '44px', minHeight: '44px' }}
  >
    {children}
  </div>
);

// ── Stat counter ──
const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="uiverse-stat w-full">
    <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Sora'] font-bold text-white tracking-tight">{value}</p>
    <p className="text-xs text-[#64748B] uppercase tracking-widest mt-3">{label}</p>
  </div>
);

// ── Feature card ──
const FeatureCard = ({
  icon, title, description, tags,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags?: string[];
}) => (
  <div className="uiverse-card group p-6 md:p-8 h-full flex flex-col">
    <div className="flex items-start gap-4 flex-1">
      <IconWrapper>{icon}</IconWrapper>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg md:text-xl font-['Sora'] font-semibold text-white mb-2 tracking-tight">{title}</h3>
        <p className="text-sm md:text-base text-[#94A3B8] font-normal leading-relaxed">{description}</p>
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

// ── Main application ──
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
    <main className="text-white font-['Inter'] selection:bg-blue-500 selection:text-white w-full">

      {/* ── 1. HERO ── */}
      <section aria-label="Hero" className="bg-[#0F172A] w-full pt-32 pb-24 md:pt-40 md:pb-32 landscape:pt-16 landscape:pb-12 px-5 sm:px-8">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center">
          <Reveal>
            <p className="uiverse-label mb-8 md:mb-10">
              Accessibility · Reimagined
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              data-magnetic
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-['Sora'] font-extrabold uppercase tracking-tighter mb-6 text-white leading-none break-words"
              style={{ wordBreak: 'break-word' }}
            >
              Access<br />App
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-base sm:text-lg md:text-xl text-[#94A3B8] font-normal max-w-2xl leading-relaxed mb-12">
              AI-powered spatial awareness for the visually and hearing impaired.
              Runs entirely on-device. No cloud. No latency. No compromise.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-sm sm:max-w-none gap-4 sm:gap-6 mb-16">
              <DownloadButton large />
              <GithubButton large />
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="animate-bounce text-[#475569]">
              <ChevronDown size={28} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. STATS ── */}
      <section aria-label="Stats" className="bg-[#141E33] w-full py-24 md:py-32 landscape:py-16 px-5 sm:px-8">
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
              <div className="badge-pill"><WifiOff size={14} />No Internet Required</div>
              <div className="badge-pill"><Shield size={14} />Privacy First</div>
              <div className="badge-pill"><Eye size={14} />Open Source</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. MISSION ── */}
      <section aria-label="Mission" className="bg-[#0B1221] w-full py-24 md:py-32 landscape:py-16 px-5 sm:px-8">
        <div className="w-full max-w-4xl mx-auto">
          <Reveal>
            <p className="uiverse-label mb-8">
              The Problem
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Sora'] font-bold leading-[1.1] text-white mb-8 tracking-tight break-words" style={{ wordBreak: 'break-word' }}>
              Accessibility shouldn't depend on a Wi-Fi signal.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base sm:text-lg text-[#94A3B8] font-normal leading-relaxed mb-6">
              Traditional accessibility tools rely on high-latency cloud APIs, compromising privacy and failing completely in low-connectivity environments — precisely where users need them most.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-base sm:text-lg text-[#94A3B8] font-normal leading-relaxed">
              AccessApp fundamentally changes this by running advanced computer vision models directly on the user's device. Instant response. Total privacy. Works anywhere.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 4. FLAGSHIP MODULES ── */}
      <section aria-label="Modules" className="bg-[#0F172A] w-full py-24 md:py-32 landscape:py-16 px-5 sm:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <Reveal>
            <p className="uiverse-label mb-4">
              Core Features
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Sora'] font-bold text-white mb-12 tracking-tight">
              Four modules. Zero cloud dependency.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <Reveal delay={0.2}>
              <FeatureCard
                icon={<Radar size={22} color="#3B82F6" />}
                title="Obstacle Radar"
                description="Real-time object detection via the device camera. Identifies approaching obstacles and their distance with millimeter precision."
                tags={['Haptic Feedback', 'Sonar Alerts', 'TFLite']}
              />
            </Reveal>
            <Reveal delay={0.3}>
              <FeatureCard
                icon={<Eye size={22} color="#3B82F6" />}
                title="Notes-to-Audio"
                description="OCR scanner powered by ML Kit that converts any printed or handwritten text into spoken audio instantly."
                tags={['Auto-Language', 'Neural TTS', 'ML Kit']}
              />
            </Reveal>
            <Reveal delay={0.4}>
              <FeatureCard
                icon={<Languages size={22} color="#3B82F6" />}
                title="Live ASL Translator"
                description="Uses MediaPipe Gesture Recognizer to identify American Sign Language letters in real-time from the camera feed."
                tags={['MediaPipe', 'Real-time', 'A–Z Letters']}
              />
            </Reveal>
            <Reveal delay={0.5}>
              <FeatureCard
                icon={<Sun size={22} color="#3B82F6" />}
                title="Color & Light"
                description="Analyzes camera feed to output exact RGB values and relative luminance, converting them to human-readable color names."
                tags={['RGB Analysis', 'Luminance', 'Voice Output']}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 5. ARCHITECTURE ── */}
      <section aria-label="Architecture" className="bg-[#141E33] w-full py-24 md:py-32 landscape:py-16 px-5 sm:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <Reveal>
            <p className="uiverse-label mb-4">
              Under the Hood
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Sora'] font-bold text-white mb-12 tracking-tight">
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
                  <h3 className="text-xl md:text-2xl font-['Sora'] font-semibold text-white mb-6">
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
                          <p className="text-base text-[#94A3B8] mt-1.5 leading-relaxed">{point.text}</p>
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
                  { label: 'Language', value: 'Kotlin', icon: <Code2 size={18} color="#3B82F6" /> },
                  { label: 'UI Framework', value: 'Jetpack Compose', icon: <Layers size={18} color="#3B82F6" /> },
                  { label: 'Minimum SDK', value: 'API 30', icon: <Smartphone size={18} color="#3B82F6" /> },
                  { label: 'Target SDK', value: 'API 36', icon: <Target size={18} color="#3B82F6" /> },
                  { label: 'ML Runtime', value: 'TensorFlow Lite', icon: <Cpu size={18} color="#3B82F6" /> },
                  { label: 'Gesture Engine', value: 'MediaPipe', icon: <Hand size={18} color="#3B82F6" /> },
                  { label: 'OCR Engine', value: 'Google ML Kit', icon: <ScanText size={18} color="#3B82F6" /> },
                  { label: 'IDE', value: 'Android Studio', icon: <Monitor size={18} color="#3B82F6" /> }
                ].map((tech) => (
                  <div key={tech.label} className="tech-bento-card group p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded bg-[#0F172A] group-hover:bg-[#3B82F6]/10 transition-colors">
                        {tech.icon}
                      </div>
                      <span className="text-[11px] text-[#64748B] uppercase tracking-wider font-semibold">{tech.label}</span>
                    </div>
                    <span className="text-sm md:text-base text-[#F1F5F9] font-medium block">{tech.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 6. HOW IT WORKS ── */}
      <section aria-label="How it works" className="bg-[#0B1221] w-full py-24 md:py-32 landscape:py-16 px-5 sm:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <Reveal>
            <p className="uiverse-label mb-4">
              Getting Started
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Sora'] font-bold text-white mb-12 tracking-tight">
              Three steps. That's it.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { step: '01', title: 'Download', desc: 'Grab the APK from GitHub Releases or clone the repo to build from source.' },
              { step: '02', title: 'Install', desc: 'Sideload the APK onto any Android device running API 30+ (Android 11 or later).' },
              { step: '03', title: 'Use', desc: 'Open AccessApp, choose a module, and point your camera. No sign-ups. No accounts. No cloud.' },
            ].map((item, index) => (
              <Reveal key={item.step} delay={0.2 + (index * 0.1)}>
                <div className="step-card group h-full">
                  <p className="uiverse-step-num mb-4">{item.step}</p>
                  <h3 className="text-lg md:text-xl font-['Sora'] font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-base text-[#94A3B8] leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA / FOOTER ── */}
      <section aria-label="Footer" className="bg-[#0F172A] w-full py-24 md:py-32 landscape:py-16 px-5 sm:px-8">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-['Sora'] font-extrabold text-white uppercase tracking-tighter mb-6 leading-tight break-words" style={{ wordBreak: 'break-word' }}>
              See the world<br />differently.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base sm:text-lg md:text-xl text-[#94A3B8] max-w-2xl mb-12 leading-relaxed">
              AccessApp is free, open-source, and built for the people who need it most.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-sm sm:max-w-none gap-4 sm:gap-6 mb-24">
              <DownloadButton large />
              <GithubButton large />
            </div>
          </Reveal>

          {/* Footer bar */}
          <div className="w-full border-t border-[#1E293B] pt-10 flex flex-col lg:flex-row justify-between items-center gap-6">
            <p className="text-sm text-[#475569] uppercase tracking-widest font-medium">© 2026 Vortex AI</p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
              {['Avadhi Sharma', 'Mudit Vaishnav', 'Mudra Chauhan', 'Jigyasha Mahariya', 'Monalika Vyas'].map((name, i, arr) => (
                <div key={name} className="flex items-center">
                  <span className="text-sm text-[#475569] font-medium uppercase tracking-widest hover:text-[#94A3B8] transition-colors duration-200 cursor-default">
                    {name}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="ml-4 text-[#334155]">•</span>
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
      <MagneticCursor magneticFactor={0.5} blendMode="difference" cursorSize={40}>
        <div 
          className="w-full bg-[#0F172A] relative flex flex-col overflow-x-hidden transition-opacity duration-1000 ease-in-out"
          style={{ opacity: showLoading ? 0 : 1, pointerEvents: showLoading ? 'none' : 'auto', height: showLoading ? '100vh' : 'auto', overflowY: showLoading ? 'hidden' : 'auto' }}
        >
          <Overlay />
        </div>
      </MagneticCursor>
    </>
  );
}

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, Float } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { MagneticCursor } from "./components/ui/magnetic-cursor";
import { Radar, Languages, Sun, Layers, Cpu, Eye, Download, Shield, WifiOff, ChevronDown, Code2, Smartphone, Target, Hand, ScanText, Monitor } from "lucide-react";
import FlowArt, { FlowSection } from "./components/ui/story-scroll";

// ── Background 3D element ──
const ObsidianGlass = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <torusGeometry args={[2.5, 0.8, 64, 128]} />
        <MeshTransmissionMaterial
          backside samples={4} thickness={0.5}
          chromaticAberration={1} anisotropy={0.3}
          distortion={0.5} distortionScale={0.5}
          temporalDistortion={0.1} color="#111827"
        />
      </mesh>
    </Float>
  );
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
  <div className="uiverse-stat">
    <p className="text-2xl sm:text-3xl md:text-5xl font-['Sora'] font-bold text-white tracking-tight">{value}</p>
    <p className="text-[10px] sm:text-xs text-[#64748B] uppercase tracking-widest mt-2">{label}</p>
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
  <div className="uiverse-card group p-5 md:p-7">
    <div className="flex items-start gap-4">
      <IconWrapper>{icon}</IconWrapper>
      <div className="flex-1 min-w-0">
        <h3 className="text-base md:text-lg font-['Sora'] font-semibold text-white mb-2 tracking-tight">{title}</h3>
        <p className="text-sm text-[#94A3B8] font-normal leading-relaxed">{description}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag) => (
              <span key={tag} className="uiverse-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

// ── Download APK button ──
const DownloadButton = ({ large = false }: { large?: boolean }) => (
  <a
    data-magnetic
    href="https://github.com/madd69x/AccessApp/releases"
    target="_blank"
    rel="noreferrer"
    className={`uiverse-btn-primary w-full sm:w-auto justify-center pointer-events-auto${large ? ' large' : ''}`}
  >
    <Download size={16} strokeWidth={2} />
    Download APK
  </a>
);

// ── GitHub Source Code button ──
const GithubButton = ({ large = false }: { large?: boolean }) => (
  <a
    data-magnetic
    href="https://github.com/madd69x/AccessApp"
    target="_blank"
    rel="noreferrer"
    className={`uiverse-btn-secondary w-full sm:w-auto justify-center pointer-events-auto${large ? ' large' : ''}`}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
    Source Code
  </a>
);

// Tech stack item (removed, using bento cards now)

// ── Main overlay ──
function Overlay() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'UX Design', icon: <Layers size={13} /> },
    { label: 'ML Pipeline', icon: <Cpu size={13} /> },
    { label: 'Privacy', icon: <Shield size={13} /> },
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
    <FlowArt aria-label="AccessApp Experience" className="text-white font-['Inter'] selection:bg-blue-500 selection:text-white">

      {/* ── 1. HERO ── */}
      <FlowSection aria-label="Hero" style={{ backgroundColor: '#0F172A' }}>
        <div className="flex-1 flex flex-col justify-center items-center text-center relative px-4">
          <p className="uiverse-label mb-8 md:mb-10">
            Accessibility · Reimagined
          </p>

          <h1
            data-magnetic
            className="text-6xl md:text-[clamp(3.5rem,8vw,7.5rem)] font-['Sora'] font-extrabold uppercase tracking-tighter mb-5 text-white leading-none md:leading-[0.9] cursor-default"
          >
            Access<br />App
          </h1>

          <p className="text-sm md:text-lg text-[#64748B] font-normal max-w-md md:max-w-xl leading-relaxed mb-10 md:mb-12">
            AI-powered spatial awareness for the visually and hearing impaired.
            Runs entirely on-device. No cloud. No latency. No compromise.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center pointer-events-auto w-full max-w-xs sm:max-w-none mb-12 md:mb-16">
            <div className="w-full sm:w-auto flex justify-center"><DownloadButton /></div>
            <div className="w-full sm:w-auto flex justify-center mt-5 sm:mt-0 sm:ml-6"><GithubButton /></div>
          </div>

          <div className="animate-bounce text-[#334155]">
            <ChevronDown size={22} />
          </div>
        </div>
      </FlowSection>

      {/* ── 2. STATS ── */}
      <FlowSection aria-label="Stats" style={{ backgroundColor: '#141E33' }}>
        <div className="flex-1 flex flex-col justify-center items-center px-4">
          <p className="uiverse-label mb-10 md:mb-12">
            Built for Impact
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-16 w-full max-w-3xl mb-12 md:mb-16">
            <StatItem value="4" label="Core Modules" />
            <StatItem value="<50ms" label="Inference Latency" />
            <StatItem value="100%" label="Offline Capable" />
            <StatItem value="0" label="Data Collected" />
          </div>

          {/* Badge pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            <div className="badge-pill"><WifiOff size={13} />No Internet Required</div>
            <div className="badge-pill"><Shield size={13} />Privacy First</div>
            <div className="badge-pill"><Eye size={13} />Open Source</div>
          </div>
        </div>
      </FlowSection>

      {/* ── 3. MISSION ── */}
      <FlowSection aria-label="Mission" style={{ backgroundColor: '#0B1221' }}>
        <div className="flex-1 flex flex-col justify-center items-center px-4">
          <div className="max-w-3xl w-full">
            <p className="uiverse-label mb-6 md:mb-8">
              The Problem
            </p>
            <h2 className="text-3xl md:text-[clamp(1.5rem,3vw,2.75rem)] font-['Sora'] font-bold leading-tight md:leading-[1.15] text-white mb-6 md:mb-8 tracking-tight">
              Accessibility shouldn't depend on a Wi-Fi signal.
            </h2>
            <p className="text-sm md:text-base text-[#64748B] font-normal leading-relaxed mb-5">
              Traditional accessibility tools rely on high-latency cloud APIs, compromising privacy and failing completely in low-connectivity environments — precisely where users need them most.
            </p>
            <p className="text-sm md:text-base text-[#64748B] font-normal leading-relaxed">
              AccessApp fundamentally changes this by running advanced computer vision models directly on the user's device. Instant response. Total privacy. Works anywhere.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* ── 4. FLAGSHIP MODULES ── */}
      <FlowSection aria-label="Modules" style={{ backgroundColor: '#0F172A' }}>
        <div className="flex-1 flex flex-col justify-center items-center pointer-events-auto px-4">
          <div className="w-full max-w-5xl">
            <p className="uiverse-label mb-3 md:mb-4">
              Core Features
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-['Sora'] font-bold text-white mb-7 md:mb-10 tracking-tight">
              Four modules. Zero cloud dependency.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
              <FeatureCard
                icon={<Radar size={19} color="#3B82F6" />}
                title="Obstacle Radar"
                description="Real-time object detection via the device camera. Identifies approaching obstacles and their distance with millimeter precision."
                tags={['Haptic Feedback', 'Sonar Alerts', 'TFLite']}
              />
              <FeatureCard
                icon={<Eye size={19} color="#3B82F6" />}
                title="Notes-to-Audio"
                description="OCR scanner powered by ML Kit that converts any printed or handwritten text into spoken audio instantly."
                tags={['Auto-Language', 'Neural TTS', 'ML Kit']}
              />
              <FeatureCard
                icon={<Languages size={19} color="#3B82F6" />}
                title="Live ASL Translator"
                description="Uses MediaPipe Gesture Recognizer to identify American Sign Language letters in real-time from the camera feed."
                tags={['MediaPipe', 'Real-time', 'A–Z Letters']}
              />
              <FeatureCard
                icon={<Sun size={19} color="#3B82F6" />}
                title="Color & Light"
                description="Analyzes camera feed to output exact RGB values and relative luminance, converting them to human-readable color names."
                tags={['RGB Analysis', 'Luminance', 'Voice Output']}
              />
            </div>
          </div>
        </div>
      </FlowSection>

      {/* ── 5. ARCHITECTURE ── */}
      <FlowSection aria-label="Architecture" style={{ backgroundColor: '#141E33' }}>
        <div className="flex-1 flex flex-col justify-center items-center pointer-events-auto px-4">
          <div className="w-full max-w-5xl">
            <p className="uiverse-label mb-3 md:mb-4">
              Under the Hood
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-['Sora'] font-bold text-white mb-7 md:mb-10 tracking-tight">
              Engineering at the edge.
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: tabs */}
              <div>
                {/* scrollable wrapper on mobile */}
                <div className="overflow-x-auto pb-2 mb-6 md:mb-8">
                  <div className="uiverse-tabs">
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

                <div className="min-h-[180px]">
                  <h3 className="text-lg md:text-xl font-['Sora'] font-semibold text-white mb-5">
                    {tabContent[activeTab].title}
                  </h3>
                  <ul className="space-y-5">
                    {tabContent[activeTab].points.map((point) => (
                      <li key={point.strong} className="flex gap-4">
                        <div className="mt-2.5 flex-shrink-0">
                          <div className="uiverse-pulse" />
                        </div>
                        <div>
                          <strong className="text-white text-sm">{point.strong}</strong>
                          <p className="text-sm text-[#64748B] mt-0.5 leading-relaxed">{point.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: tech stack grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {[
                  { label: 'Language', value: 'Kotlin', icon: <Code2 size={16} color="#3B82F6" /> },
                  { label: 'UI Framework', value: 'Jetpack Compose', icon: <Layers size={16} color="#3B82F6" /> },
                  { label: 'Minimum SDK', value: 'API 30 (Android 11)', icon: <Smartphone size={16} color="#3B82F6" /> },
                  { label: 'Target SDK', value: 'API 36 (Android 16)', icon: <Target size={16} color="#3B82F6" /> },
                  { label: 'ML Runtime', value: 'TensorFlow Lite', icon: <Cpu size={16} color="#3B82F6" /> },
                  { label: 'Gesture Engine', value: 'MediaPipe', icon: <Hand size={16} color="#3B82F6" /> },
                  { label: 'OCR Engine', value: 'Google ML Kit', icon: <ScanText size={16} color="#3B82F6" /> },
                  { label: 'Development IDE', value: 'Android Studio', icon: <Monitor size={16} color="#3B82F6" /> }
                ].map((tech) => (
                  <div key={tech.label} className="tech-bento-card group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded bg-[#0F172A] group-hover:bg-[#3B82F6]/10 transition-colors">
                        {tech.icon}
                      </div>
                      <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold">{tech.label}</span>
                    </div>
                    <span className="text-xs md:text-sm text-[#F1F5F9] font-medium block">{tech.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FlowSection>

      {/* ── 6. HOW IT WORKS ── */}
      <FlowSection aria-label="How it works" style={{ backgroundColor: '#0B1221' }}>
        <div className="flex-1 flex flex-col justify-center items-center px-4">
          <div className="w-full max-w-5xl">
            <p className="uiverse-label mb-3 md:mb-4">
              Getting Started
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-['Sora'] font-bold text-white mb-8 md:mb-12 tracking-tight">
              Three steps. That's it.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { step: '01', title: 'Download', desc: 'Grab the APK from GitHub Releases or clone the repo to build from source.' },
                { step: '02', title: 'Install', desc: 'Sideload the APK onto any Android device running API 30+ (Android 11 or later).' },
                { step: '03', title: 'Use', desc: 'Open AccessApp, choose a module, and point your camera. No sign-ups. No accounts. No cloud.' },
              ].map((item) => (
                <div key={item.step} className="step-card group">
                  <p className="uiverse-step-num mb-3">{item.step}</p>
                  <h3 className="text-base md:text-lg font-['Sora'] font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FlowSection>

      {/* ── 7. CTA / FOOTER ── */}
      <FlowSection aria-label="Footer" style={{ backgroundColor: '#0F172A' }}>
        <div className="flex-1 flex flex-col justify-center items-center text-center pointer-events-auto px-4">
          <h2 className="text-4xl md:text-[clamp(2rem,7vw,6rem)] font-['Sora'] font-extrabold text-white uppercase tracking-tighter mb-5 leading-tight md:leading-[0.95]">
            See the world<br />differently.
          </h2>
          <p className="text-sm md:text-base text-[#64748B] max-w-sm md:max-w-md mb-10 md:mb-12 leading-relaxed">
            AccessApp is free, open-source, and built for the people who need it most.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-xs sm:max-w-none mb-16 md:mb-24">
            <div className="w-full sm:w-auto flex justify-center"><DownloadButton large /></div>
            <div className="w-full sm:w-auto flex justify-center mt-5 sm:mt-0 sm:ml-6"><GithubButton large /></div>
          </div>

          {/* Footer bar */}
          <div className="w-full border-t border-[#1E293B] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#475569] uppercase tracking-widest">© 2026 Vortex AI</p>
            <div className="flex flex-wrap items-center justify-center gap-y-2">
              {['Avadhi Sharma', 'Mudit Vaishnav', 'Mudra Chauhan', 'Jigyasha Mahariya', 'Monalika Vyas'].map((name, i, arr) => (
                <div key={name} className="flex items-center">
                  <span className="text-xs text-[#475569] uppercase tracking-widest hover:text-[#94A3B8] transition-colors duration-200 cursor-default">
                    {name}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="mx-4 text-[#334155]">•</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </FlowSection>

    </FlowArt>
  );
}

export default function App() {
  const [isMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  return (
    <MagneticCursor magneticFactor={0.5} blendMode="difference" cursorSize={40}>
      <div className="w-full min-h-screen bg-[#0F172A] relative">
        {!isMobile && (
          <Canvas
            camera={{ position: [0, 0, 9], fov: 40 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
          >
            <color attach="background" args={['#0F172A']} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <Environment preset="studio" />
            <ObsidianGlass />
          </Canvas>
        )}

        <div style={{ position: 'relative', zIndex: 10 }}>
          <Overlay />
        </div>
      </div>
    </MagneticCursor>
  );
}

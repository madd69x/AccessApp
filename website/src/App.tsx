import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, Float } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { MagneticCursor } from "./components/ui/magnetic-cursor";
import { Radar, Languages, Sun, Layers, Cpu, Eye, Download, Shield, WifiOff, ChevronDown } from "lucide-react";
import FlowArt, { FlowSection } from "./components/ui/story-scroll";

// Purely aesthetic spinning background element
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
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={1}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#111111"
        />
      </mesh>
    </Float>
  );
};

// Icon wrapper with fixed sizing
const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    className="rounded-xl border border-[#2A2A2A] bg-[#111] flex items-center justify-center mb-5 flex-shrink-0"
    style={{ width: '44px', height: '44px', minWidth: '44px', minHeight: '44px' }}
  >
    {children}
  </div>
);

// Stat counter component
const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="uiverse-stat">
    <p className="text-3xl md:text-5xl font-['Sora'] font-bold text-white tracking-tight">{value}</p>
    <p className="text-xs md:text-sm text-[#888] uppercase tracking-widest mt-2">{label}</p>
  </div>
);

// Feature card used in modules section
const FeatureCard = ({
  icon,
  title,
  description,
  tags,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags?: string[];
}) => (
  <div className="uiverse-card group p-7">
    <div className="flex items-start gap-4">
      <IconWrapper>{icon}</IconWrapper>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-['Sora'] font-semibold text-white mb-2 tracking-tight">{title}</h3>
        <p className="text-sm text-[#999] font-normal leading-relaxed">{description}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <span key={tag} className="uiverse-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

// ── UIverse Skew-Reveal Buttons ──
const DownloadButton = ({ large = false }: { large?: boolean }) => (
  <a
    data-magnetic
    href="https://github.com/madd69x/AccessApp/releases"
    target="_blank"
    rel="noreferrer"
    className={`uiverse-btn-primary pointer-events-auto${large ? ' large' : ''}`}
  >
    <span>
      <Download size={16} strokeWidth={2} />
      Download APK
    </span>
  </a>
);

const GithubButton = ({ large = false }: { large?: boolean }) => (
  <a
    data-magnetic
    href="https://github.com/madd69x/AccessApp"
    target="_blank"
    rel="noreferrer"
    className={`uiverse-btn-secondary pointer-events-auto${large ? ' large' : ''}`}
  >
    <span>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
      Source Code
    </span>
  </a>
);

// Tech stack item
const TechItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-baseline py-3 border-b border-[#1A1A1A] last:border-b-0">
    <span className="text-xs text-[#666] uppercase tracking-widest">{label}</span>
    <span className="text-sm text-white font-medium">{value}</span>
  </div>
);

function Overlay() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'UX Design', icon: <Layers size={14} color="#fff" /> },
    { label: 'ML Pipeline', icon: <Cpu size={14} color="#fff" /> },
    { label: 'Privacy', icon: <Shield size={14} color="#fff" /> },
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
    <FlowArt aria-label="AccessApp Experience" className="text-white font-['Inter'] selection:bg-white selection:text-black">

      {/* ── 1. HERO ── */}
      <FlowSection aria-label="Hero" style={{ backgroundColor: '#0F172A' }}>
        <div className="flex-1 flex flex-col justify-center items-center text-center relative">
          <p className="uiverse-label mb-10">
            Accessibility · Reimagined
          </p>

          <h1
            data-magnetic
            className="text-[clamp(3.5rem,9vw,11rem)] font-['Sora'] font-extrabold uppercase tracking-tighter mb-6 text-white leading-[0.9] cursor-default"
          >
            Access<br />App
          </h1>

          <p className="text-base md:text-xl text-[#777] font-normal max-w-xl leading-relaxed mb-12">
            AI-powered spatial awareness for the visually and hearing impaired.
            Runs entirely on-device. No cloud. No latency. No compromise.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center pointer-events-auto mb-16">
            <DownloadButton />
            <GithubButton />
          </div>

          <div className="animate-bounce text-[#444]">
            <ChevronDown size={24} />
          </div>
        </div>
      </FlowSection>

      {/* ── 2. STATS / SOCIAL PROOF ── */}
      <FlowSection aria-label="Stats" style={{ backgroundColor: '#141E33' }}>
        <div className="flex-1 flex flex-col justify-center items-center">
          <p className="uiverse-label mb-12">
            Built for Impact
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full max-w-4xl mb-16">
            <StatItem value="4" label="Core Modules" />
            <StatItem value="<50ms" label="Inference Latency" />
            <StatItem value="100%" label="Offline Capable" />
            <StatItem value="0" label="Data Collected" />
          </div>

          <div className="flex items-center gap-6 text-[#555]">
            <div className="flex items-center gap-2">
              <WifiOff size={14} />
              <span className="text-xs uppercase tracking-widest">No internet required</span>
            </div>
            <span className="text-[#333]">·</span>
            <div className="flex items-center gap-2">
              <Shield size={14} />
              <span className="text-xs uppercase tracking-widest">Privacy first</span>
            </div>
            <span className="text-[#333]">·</span>
            <div className="flex items-center gap-2">
              <Eye size={14} />
              <span className="text-xs uppercase tracking-widest">Open source</span>
            </div>
          </div>
        </div>
      </FlowSection>

      {/* ── 3. MISSION ── */}
      <FlowSection aria-label="Mission" style={{ backgroundColor: '#0B1221' }}>
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="max-w-3xl">
            <p className="uiverse-label mb-8">
              The Problem
            </p>
            <h2 className="text-[clamp(1.5rem,3vw,2.75rem)] font-['Sora'] font-bold leading-[1.1] text-white mb-8 tracking-tight">
              Accessibility shouldn't depend on a Wi-Fi signal.
            </h2>
            <p className="text-lg text-[#777] font-normal leading-relaxed mb-6">
              Traditional accessibility tools rely on high-latency cloud APIs, compromising privacy and failing completely in low-connectivity environments — precisely where users need them most.
            </p>
            <p className="text-lg text-[#777] font-normal leading-relaxed">
              AccessApp fundamentally changes this by running advanced computer vision models directly on the user's device. Instant response. Total privacy. Works anywhere.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* ── 4. FLAGSHIP MODULES ── */}
      <FlowSection aria-label="Modules" style={{ backgroundColor: '#0F172A' }}>
        <div className="flex-1 flex flex-col justify-center items-center pointer-events-auto">
          <div className="w-full max-w-4xl">
            <p className="uiverse-label mb-4">
              Core Features
            </p>
            <h2 className="text-3xl md:text-5xl font-['Sora'] font-bold text-white mb-10 tracking-tight">
              Four modules. Zero cloud dependency.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FeatureCard
                icon={<Radar size={20} color="#fff" />}
                title="Obstacle Radar"
                description="Real-time object detection via the device camera. Identifies approaching obstacles and their distance with millimeter precision."
                tags={['Haptic Feedback', 'Sonar Alerts', 'TFLite']}
              />
              <FeatureCard
                icon={<Eye size={20} color="#fff" />}
                title="Notes-to-Audio"
                description="OCR scanner powered by ML Kit that converts any printed or handwritten text into spoken audio instantly."
                tags={['Auto-Language', 'Neural TTS', 'ML Kit']}
              />
              <FeatureCard
                icon={<Languages size={20} color="#fff" />}
                title="Live ASL Translator"
                description="Uses MediaPipe Gesture Recognizer to identify American Sign Language letters in real-time from the camera feed."
                tags={['MediaPipe', 'Real-time', 'A-Z Letters']}
              />
              <FeatureCard
                icon={<Sun size={20} color="#fff" />}
                title="Color & Light"
                description="Analyzes camera feed to output exact RGB values and relative luminance, converting them to human-readable color names."
                tags={['RGB Analysis', 'Luminance', 'Voice Output']}
              />
            </div>
          </div>
        </div>
      </FlowSection>

      {/* ── 5. ARCHITECTURE (tabbed) ── */}
      <FlowSection aria-label="Architecture" style={{ backgroundColor: '#141E33' }}>
        <div className="flex-1 flex flex-col justify-center items-center pointer-events-auto">
          <div className="w-full max-w-4xl">
            <p className="uiverse-label mb-4">
              Under the Hood
            </p>
            <h2 className="text-3xl md:text-5xl font-['Sora'] font-bold text-white mb-10 tracking-tight">
              Engineering at the edge.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: interactive tabs */}
              <div>
                <div className="uiverse-tabs mb-8">
                  {tabs.map((tab, i) => (
                    <button
                      key={tab.label}
                      onClick={() => setActiveTab(i)}
                      className={`uiverse-tab ${activeTab === i ? 'active' : ''}`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="min-h-[200px]">
                  <h3 className="text-xl font-['Sora'] font-semibold text-white mb-6">
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
                          <p className="text-sm text-[#888] mt-0.5">{point.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: tech stack */}
              <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-7">
                <h3 className="text-lg font-['Sora'] font-semibold text-white mb-6">Tech Stack</h3>
                <TechItem label="Language" value="Kotlin" />
                <TechItem label="UI Framework" value="Jetpack Compose M3" />
                <TechItem label="Min SDK" value="API 30 (Android 11)" />
                <TechItem label="Target SDK" value="API 36 (Android 16)" />
                <TechItem label="ML Runtime" value="TensorFlow Lite" />
                <TechItem label="Gesture Engine" value="MediaPipe" />
                <TechItem label="OCR" value="Google ML Kit" />
                <TechItem label="IDE" value="Android Studio Iguana" />
              </div>
            </div>
          </div>
        </div>
      </FlowSection>

      {/* ── 6. HOW IT WORKS ── */}
      <FlowSection aria-label="How it works" style={{ backgroundColor: '#0B1221' }}>
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="w-full max-w-4xl">
            <p className="uiverse-label mb-4">
              Getting Started
            </p>
            <h2 className="text-3xl md:text-5xl font-['Sora'] font-bold text-white mb-12 tracking-tight">
              Three steps. That's it.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: '01', title: 'Download', desc: 'Grab the APK from GitHub Releases or clone the repo to build from source.' },
                { step: '02', title: 'Install', desc: 'Sideload the APK onto any Android device running API 30+ (Android 11 or later).' },
                { step: '03', title: 'Use', desc: 'Open AccessApp, choose a module, and point your camera. No sign-ups. No accounts. No cloud.' },
              ].map((item) => (
                <div key={item.step} className="group">
                  <p className="uiverse-step-num mb-4">
                    {item.step}
                  </p>
                  <h3 className="text-lg font-['Sora'] font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-[#888] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FlowSection>

      {/* ── 7. CTA / FOOTER ── */}
      <FlowSection aria-label="Footer" style={{ backgroundColor: '#0F172A' }}>
        <div className="flex-1 flex flex-col justify-center items-center text-center pointer-events-auto">
          <h2 className="text-4xl md:text-7xl font-['Sora'] font-extrabold text-white uppercase tracking-tighter mb-6 leading-[0.95]">
            See the world<br />differently.
          </h2>
          <p className="text-base text-[#777] max-w-md mb-12">
            AccessApp is free, open-source, and built for the people who need it most.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center mb-24">
            <DownloadButton large />
            <GithubButton large />
          </div>

          <div className="w-full border-t border-[#1A1A1A] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#555] uppercase tracking-widest">
            <p>© 2026 Vortex AI</p>
            <div className="flex gap-6 mt-4 md:mt-0 flex-wrap justify-center">
              <span>Avadhi Sharma</span>
              <span>Mudit Vaishnav</span>
              <span>Mudra Chauhan</span>
              <span>Jigyasha Mahariya</span>
              <span>Monalika Vyas</span>
            </div>
          </div>
        </div>
      </FlowSection>

    </FlowArt>
  );
}

export default function App() {
  return (
    <MagneticCursor magneticFactor={0.5} blendMode="difference" cursorSize={40}>
      <div className="w-full min-h-screen overflow-x-hidden bg-black relative">
        <Canvas
          camera={{ position: [0, 0, 9], fov: 40 }}
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}
        >
          <color attach="background" args={['#0F172A']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Environment preset="studio" />
          <ObsidianGlass />
        </Canvas>

        <div style={{ position: 'relative', zIndex: 10 }}>
          <Overlay />
        </div>
      </div>
    </MagneticCursor>
  );
}

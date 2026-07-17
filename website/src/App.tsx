import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { MagneticCursor } from "./components/ui/magnetic-cursor";
import { Radar, Languages, Sun, Layers, Cpu } from "lucide-react";
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

// Professional, multi-layered SVG Icons
const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-lg border border-[#333336] bg-gradient-to-b from-[#1A1A1A] to-[#000000] flex items-center justify-center mb-4 shadow-[0_2px_10px_rgba(0,0,0,0.5)] flex-shrink-0" style={{ width: '32px', height: '32px', minWidth: '32px', minHeight: '32px' }}>
    {children}
  </div>
);

const RadarIcon = () => (<IconWrapper><Radar size={16} color="#FFFFFF" /></IconWrapper>);

const VisionIcon = () => (<IconWrapper><Sun size={16} color="#FFFFFF" /></IconWrapper>);

const TranslateIcon = () => (<IconWrapper><Languages size={16} color="#FFFFFF" /></IconWrapper>);

const UXIcon = () => (<IconWrapper><Layers size={16} color="#FFFFFF" /></IconWrapper>);

const CodeIcon = () => (<IconWrapper><Cpu size={16} color="#FFFFFF" /></IconWrapper>);



function Overlay() {
  return (
    <FlowArt aria-label="AccessApp Experience" className="text-white font-['Inter'] selection:bg-white selection:text-black">
      
      {/* 1. Hero Section */}
      <FlowSection aria-label="Hero" style={{ backgroundColor: 'transparent' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#CCCCCC]">01 — Welcome</p>
        
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h1 data-magnetic className="text-[clamp(3.5rem,8vw,10rem)] font-['Sora'] font-extrabold uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-[#666666] drop-shadow-2xl leading-none transition-all duration-500 hover:from-[#111111] hover:to-[#000000] hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] cursor-default">
            Access<br/>App
          </h1>
          <h2 className="text-xl md:text-2xl font-['Sora'] font-medium uppercase tracking-widest text-[#CCCCCC] mb-8">
            AI-Driven Accessibility
          </h2>
          <p className="text-base md:text-lg text-[#A3A3A3] font-normal max-w-2xl leading-relaxed mb-12">
            Engineered specifically for individuals with visual or auditory impairments. Leveraging edge-based machine learning paradigms to provide real-time spatial awareness without reliance on cloud-based processing.
          </p>
          <a 
            data-magnetic
            href="https://github.com/madd69x/AccessApp" 
            target="_blank" 
            rel="noreferrer"
            className="uiverse-shimmer-btn bg-white text-black px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#E5E5EA] transition-colors shadow-[0_0_40px_rgba(255,255,255,0.3)] pointer-events-auto "
          >
            Download Now
          </a>
        </div>
      </FlowSection>

      {/* 2. Mission Section */}
      <FlowSection aria-label="Mission" style={{ backgroundColor: '#050505' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#CCCCCC]">02 — The Mission</p>
        
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h2 className="text-[clamp(3rem,6vw,8rem)] font-['Sora'] font-bold leading-tight uppercase tracking-tight text-white mb-8">
            Autonomy<br/>First
          </h2>
          <p className="text-lg md:text-xl font-normal text-[#86868B] leading-relaxed max-w-3xl mx-auto">
            Traditional accessibility tools often rely on high-latency cloud APIs, compromising privacy and reliability in low-connectivity environments.
          </p>
          <p className="text-lg font-normal text-[#86868B] leading-relaxed max-w-3xl mx-auto mt-4">
            AccessApp fundamentally alters this paradigm by running advanced computer vision models directly on the user's local hardware—ensuring instant, private, and offline-capable assistance.
          </p>
        </div>
      </FlowSection>

      {/* 3. Flagship Modules Section */}
      <FlowSection aria-label="Modules" style={{ backgroundColor: '#0A0A0A' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#CCCCCC]">03 — Flagship Modules</p>
        
        <div className="flex-1 flex flex-col justify-center items-center pointer-events-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mt-8">
            <div className="bg-[#111]/80 backdrop-blur-xl border-none p-5 rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,0.8)]">
              <RadarIcon />
              <h3 className="text-xl font-['Sora'] font-bold text-white mb-2 tracking-tight">Obstacle Radar</h3>
              <p className="text-xs text-[#CCCCCC] font-normal leading-relaxed mb-3">
                Uses real-time object detection via the device camera to identify approaching obstacles.
              </p>
              <ul className="text-xs text-[#A3A3A3] list-disc pl-4 space-y-1">
                <li><strong className="text-white">Dynamic Haptic Feedback</strong></li>
                <li><strong className="text-white">Sonar Alerts</strong></li>
              </ul>
            </div>

            <div className="bg-[#111]/80 backdrop-blur-xl border-none p-5 rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,0.8)]">
              <VisionIcon />
              <h3 className="text-xl font-['Sora'] font-bold text-white mb-2 tracking-tight">Notes-to-Audio</h3>
              <p className="text-xs text-[#CCCCCC] font-normal leading-relaxed mb-3">
                A seamless Optical Character Recognition (OCR) scanner powered by ML Kit.
              </p>
              <ul className="text-xs text-[#A3A3A3] list-disc pl-4 space-y-1">
                <li><strong className="text-white">Auto-Language Detection</strong></li>
                <li><strong className="text-white">Instant TTS</strong></li>
              </ul>
            </div>

            <div className="bg-[#111]/80 backdrop-blur-xl border-none p-5 rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,0.8)]">
              <TranslateIcon />
              <h3 className="text-xl font-['Sora'] font-bold text-white mb-2 tracking-tight">Live ASL Translator</h3>
              <p className="text-xs text-[#CCCCCC] font-normal leading-relaxed mb-3">
                Uses Google's MediaPipe Gesture Recognizer to identify ASL letters in real-time. Translates live camera feeds into English text.
              </p>
            </div>

            <div className="bg-[#111]/80 backdrop-blur-xl border-none p-5 rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,0.8)]">
              <VisionIcon />
              <h3 className="text-xl font-['Sora'] font-bold text-white mb-2 tracking-tight">Color & Light</h3>
              <p className="text-xs text-[#CCCCCC] font-normal leading-relaxed mb-3">
                Analyzes the camera feed to output exact RGB values and relative luminance, converting them to human-readable color names.
              </p>
            </div>
          </div>
        </div>
      </FlowSection>

      {/* 4. Under the Hood */}
      <FlowSection aria-label="Under the Hood" style={{ backgroundColor: '#111111' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#CCCCCC]">04 — Architecture</p>
        
        <div className="flex-1 flex flex-col justify-center items-center pointer-events-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mt-8">
            <div className="bg-[#050505]/80 backdrop-blur-xl border-none p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
              <UXIcon />
              <h3 className="text-xl font-['Sora'] font-bold text-white mb-3">User Experience Methodology</h3>
              <ul className="text-xs text-[#CCCCCC] font-normal leading-relaxed space-y-3">
                <li><strong className="text-white">Kinetic Feedback:</strong> Employs the Compose <code>spring()</code> physics engine.</li>
                <li><strong className="text-white">Auditory Cues:</strong> Comprehensive system audio feedback.</li>
                <li><strong className="text-white">Contrast & Legibility:</strong> Calibrated palette for readability.</li>
              </ul>
            </div>

            <div className="bg-[#050505]/80 backdrop-blur-xl border-none p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
              <CodeIcon />
              <h3 className="text-xl font-['Sora'] font-bold text-white mb-3">Getting Started</h3>
              <p className="text-xs text-[#CCCCCC] font-normal mb-3">Strict requirements ensure optimal neural network execution on the edge.</p>
              <ul className="text-xs text-[#CCCCCC] font-normal leading-relaxed space-y-2 border-l-2 border-[#333336] pl-4">
                <li><strong className="text-white">IDE:</strong> Android Studio Iguana</li>
                <li><strong className="text-white">SDK:</strong> API 30 to API 36</li>
                <li><strong className="text-white">Architecture:</strong> Jetpack Compose M3</li>
                <li><strong className="text-white">ML Pipeline:</strong> TensorFlow Lite</li>
              </ul>
            </div>
          </div>
        </div>
      </FlowSection>

      {/* 5. Footer */}
      <FlowSection aria-label="Footer" style={{ backgroundColor: '#000000' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#CCCCCC]">05 — Join</p>
        
        <div className="flex-1 flex flex-col justify-end items-center pb-8 text-center pointer-events-auto">
          <h1 className="text-4xl md:text-6xl font-['Sora'] font-extrabold text-white uppercase tracking-tighter mb-12">
            Experience AccessApp.
          </h1>
          
          <a 
            href="https://github.com/madd69x/AccessApp" 
            target="_blank" 
            rel="noreferrer"
            className="uiverse-shimmer-btn group relative flex items-center justify-center gap-3 rounded-full bg-[#FFFFFF] px-12 py-5 text-xl font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-[#E5E5EA] shadow-[0_0_40px_rgba(255,255,255,0.2)] mb-20"
          >
            <span>View on GitHub</span>
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
          
          <div className="w-full border-t border-[#333336] pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-normal text-[#A3A3A3]">
            <p>© 2026 Vortex AI. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0 flex-wrap justify-center">
              <span>Avadhi Sharma</span> • <span>Mudit Vaishnav</span> • <span>Mudra Chauhan</span> • <span>Jigyasha Mahariya</span> • <span>Monalika Vyas</span>
            </div>
          </div>
        </div>
      </FlowSection>

    </FlowArt>
  );
}

export default function App() {
  return (
    <MagneticCursor magneticFactor={0.5} blendMode="exclusion" cursorSize={40}>
      <div className="w-full min-h-screen overflow-x-hidden bg-black relative">
        <Canvas 
          camera={{ position: [0, 0, 9], fov: 40 }}
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}
        >
          <color attach="background" args={['#000000']} />
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

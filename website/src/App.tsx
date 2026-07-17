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
  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center mb-5 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex-shrink-0 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-white/30 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]" style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px' }}>
    {children}
  </div>
);

const RadarIcon = () => (<IconWrapper><Radar size={20} className="text-white/80 group-hover:text-white transition-colors" /></IconWrapper>);

const VisionIcon = () => (<IconWrapper><Sun size={20} className="text-white/80 group-hover:text-white transition-colors" /></IconWrapper>);

const TranslateIcon = () => (<IconWrapper><Languages size={20} className="text-white/80 group-hover:text-white transition-colors" /></IconWrapper>);

const UXIcon = () => (<IconWrapper><Layers size={20} className="text-white/80 group-hover:text-white transition-colors" /></IconWrapper>);

const CodeIcon = () => (<IconWrapper><Cpu size={20} className="text-white/80 group-hover:text-white transition-colors" /></IconWrapper>);



function Overlay() {
  return (
    <FlowArt aria-label="AccessApp Experience" className="text-white font-['Inter'] selection:bg-white selection:text-black">
      
      {/* 1. Hero Section */}
      <FlowSection aria-label="Hero" style={{ backgroundColor: 'transparent' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none"></div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50 relative z-10">01 — Welcome</p>
        <hr className="my-[2vw] border-none border-t border-white/10 relative z-10" />
        <div className="flex-1 flex flex-col justify-center items-center text-center relative z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>
          <h1 data-magnetic className="text-[clamp(4rem,10vw,12rem)] font-['Sora'] font-extrabold uppercase tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/20 drop-shadow-2xl mix-blend-difference leading-[0.9]">
            Access<br/>App
          </h1>
          <h2 className="text-xl md:text-3xl font-['Sora'] font-light uppercase tracking-[0.2em] text-white/70 mb-8 mt-4">
            AI-Driven Accessibility
          </h2>
          <p className="text-base md:text-lg text-white/40 font-light max-w-2xl leading-relaxed mb-12 tracking-wide">
            Engineered specifically for individuals with visual or auditory impairments. Leveraging edge-based machine learning paradigms to provide real-time spatial awareness without reliance on cloud-based processing.
          </p>
          <a 
            data-magnetic
            href="https://github.com/madd69x/AccessApp" 
            target="_blank" 
            rel="noreferrer"
            className="group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 text-white px-12 py-4 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-white/10 transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:-translate-y-1 pointer-events-auto"
          >
            <span className="relative z-10">Download Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
          </a>
        </div>
      </FlowSection>

      {/* 2. Mission Section */}
      <FlowSection aria-label="Mission" style={{ backgroundColor: '#030303' }}>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">02 — The Mission</p>
        <hr className="my-[2vw] border-none border-t border-white/10" />
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h2 className="text-[clamp(3.5rem,7vw,9rem)] font-['Sora'] font-bold leading-[0.9] uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/30 mb-10">
            Autonomy<br/>First
          </h2>
          <div className="w-full max-w-3xl relative">
             <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
             <p className="text-lg md:text-2xl font-light text-white/60 leading-relaxed text-left pl-8">
               Traditional accessibility tools often rely on high-latency cloud APIs, compromising privacy and reliability in low-connectivity environments.
             </p>
             <p className="text-lg md:text-2xl font-light text-white/60 leading-relaxed text-left pl-8 mt-6">
               <strong className="text-white font-medium">AccessApp</strong> fundamentally alters this paradigm by running advanced computer vision models directly on the user's local hardware—ensuring instant, private, and offline-capable assistance.
             </p>
          </div>
        </div>
      </FlowSection>

      {/* 3. Flagship Modules Section */}
      <FlowSection aria-label="Modules" style={{ backgroundColor: '#050505' }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[150px] rounded-full pointer-events-none"></div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50 relative z-10">03 — Flagship Modules</p>
        <hr className="my-[2vw] border-none border-t border-white/10 relative z-10" />
        <div className="flex-1 flex flex-col justify-center items-center pointer-events-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mt-8">
            <div className="group bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-2xl border border-white/5 hover:border-white/20 p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 shadow-2xl">
              <RadarIcon />
              <h3 className="text-2xl font-['Sora'] font-semibold text-white mb-3 tracking-tight">Obstacle Radar</h3>
              <p className="text-sm text-white/50 font-light leading-relaxed mb-5">
                Uses real-time object detection via the device camera to identify approaching obstacles with millimeter precision.
              </p>
              <ul className="text-sm text-white/40 list-none space-y-2">
                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-white/50"></div><strong className="text-white/80 font-medium">Dynamic Haptic Feedback</strong></li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-white/50"></div><strong className="text-white/80 font-medium">Spatial Sonar Alerts</strong></li>
              </ul>
            </div>

            <div className="group bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-2xl border border-white/5 hover:border-white/20 p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 shadow-2xl">
              <VisionIcon />
              <h3 className="text-2xl font-['Sora'] font-semibold text-white mb-3 tracking-tight">Notes-to-Audio</h3>
              <p className="text-sm text-white/50 font-light leading-relaxed mb-5">
                A seamless Optical Character Recognition (OCR) scanner powered by ML Kit for instant environmental reading.
              </p>
              <ul className="text-sm text-white/40 list-none space-y-2">
                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-white/50"></div><strong className="text-white/80 font-medium">Auto-Language Detection</strong></li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-white/50"></div><strong className="text-white/80 font-medium">Instant Neural TTS</strong></li>
              </ul>
            </div>

            <div className="group bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-2xl border border-white/5 hover:border-white/20 p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 shadow-2xl">
              <TranslateIcon />
              <h3 className="text-2xl font-['Sora'] font-semibold text-white mb-3 tracking-tight">Live ASL Translator</h3>
              <p className="text-sm text-white/50 font-light leading-relaxed">
                Uses Google's MediaPipe Gesture Recognizer to identify ASL letters in real-time. Translates live camera feeds into English text instantaneously on-device.
              </p>
            </div>

            <div className="group bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-2xl border border-white/5 hover:border-white/20 p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 shadow-2xl">
              <VisionIcon />
              <h3 className="text-2xl font-['Sora'] font-semibold text-white mb-3 tracking-tight">Color & Light</h3>
              <p className="text-sm text-white/50 font-light leading-relaxed">
                Analyzes the camera feed to output exact RGB values and relative luminance, converting them to human-readable color names for total environmental awareness.
              </p>
            </div>
          </div>
        </div>
      </FlowSection>

      {/* 4. Under the Hood */}
      <FlowSection aria-label="Under the Hood" style={{ backgroundColor: '#070707' }}>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">04 — Architecture</p>
        <hr className="my-[2vw] border-none border-t border-white/10" />
        <div className="flex-1 flex flex-col justify-center items-center pointer-events-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mt-8">
            <div className="group bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-3xl border border-white/10 hover:border-white/30 p-10 rounded-[2rem] transition-all duration-500">
              <UXIcon />
              <h3 className="text-2xl font-['Sora'] font-bold text-white mb-6">User Experience</h3>
              <ul className="text-sm text-white/50 font-light leading-relaxed space-y-4">
                <li className="flex flex-col"><strong className="text-white/90 text-base mb-1">Kinetic Feedback</strong> Employs the Compose spring() physics engine for organic interactions.</li>
                <li className="flex flex-col"><strong className="text-white/90 text-base mb-1">Auditory Cues</strong> Comprehensive spatial audio feedback system.</li>
                <li className="flex flex-col"><strong className="text-white/90 text-base mb-1">Contrast & Legibility</strong> Calibrated APCA palette for maximum readability.</li>
              </ul>
            </div>

            <div className="group bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-3xl border border-white/10 hover:border-white/30 p-10 rounded-[2rem] transition-all duration-500">
              <CodeIcon />
              <h3 className="text-2xl font-['Sora'] font-bold text-white mb-4">Core Stack</h3>
              <p className="text-sm text-white/50 font-light mb-6">Strict requirements ensure optimal neural network execution on the edge.</p>
              <div className="space-y-4 border-l border-white/20 pl-6">
                <div><p className="text-xs text-white/40 uppercase tracking-widest mb-1">IDE</p><p className="text-white/90 font-medium">Android Studio Iguana</p></div>
                <div><p className="text-xs text-white/40 uppercase tracking-widest mb-1">SDK Target</p><p className="text-white/90 font-medium">API 30 to API 36</p></div>
                <div><p className="text-xs text-white/40 uppercase tracking-widest mb-1">UI Architecture</p><p className="text-white/90 font-medium">Jetpack Compose M3</p></div>
                <div><p className="text-xs text-white/40 uppercase tracking-widest mb-1">ML Pipeline</p><p className="text-white/90 font-medium">TensorFlow Lite + MediaPipe</p></div>
              </div>
            </div>
          </div>
        </div>
      </FlowSection>

      {/* 5. Footer */}
      <FlowSection aria-label="Footer" style={{ backgroundColor: '#000000' }}>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">05 — Join</p>
        <hr className="my-[2vw] border-none border-t border-white/10" />
        <div className="flex-1 flex flex-col justify-end items-center pb-8 text-center pointer-events-auto relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-gradient-to-t from-white/10 to-transparent blur-[100px] pointer-events-none"></div>
          
          <h1 className="text-5xl md:text-8xl font-['Sora'] font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 uppercase tracking-tighter mb-16 z-10">
            Experience<br/>AccessApp.
          </h1>
          
          <a 
            href="https://github.com/madd69x/AccessApp" 
            target="_blank" 
            rel="noreferrer"
            className="group relative flex items-center justify-center gap-4 rounded-full bg-white px-14 py-6 text-xl font-bold text-black transition-all duration-500 hover:scale-[1.02] hover:bg-white/90 shadow-[0_0_60px_rgba(255,255,255,0.15)] hover:shadow-[0_0_80px_rgba(255,255,255,0.3)] mb-32 z-10"
          >
            <span className="uppercase tracking-widest text-sm">View on GitHub</span>
            <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
          
          <div className="w-full border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center text-xs font-light tracking-widest text-white/40 uppercase z-10">
            <p>© 2026 Vortex AI.</p>
            <div className="flex gap-6 mt-6 md:mt-0 flex-wrap justify-center">
              <span className="hover:text-white transition-colors cursor-default">Avadhi Sharma</span>
              <span className="hover:text-white transition-colors cursor-default">Mudit Vaishnav</span>
              <span className="hover:text-white transition-colors cursor-default">Mudra Chauhan</span>
              <span className="hover:text-white transition-colors cursor-default">Jigyasha Mahariya</span>
              <span className="hover:text-white transition-colors cursor-default">Monalika Vyas</span>
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

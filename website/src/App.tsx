import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Environment, MeshTransmissionMaterial, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

function ObsidianGlass() {
  const mesh = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  useFrame((_state, delta) => {
    if (!mesh.current) return;
    const r1 = scroll.range(0, 1);
    
    // Slow, heavy rotation
    mesh.current.rotation.y += delta * 0.1;
    mesh.current.rotation.x += delta * 0.08;
    
    // Push deep into the background so it doesn't wash out text
    mesh.current.position.y = -r1 * 18;
    mesh.current.position.z = -5 + (r1 * 2); // Start deep, move slightly forward
    
    const scale = 2 + r1 * 2;
    mesh.current.scale.set(scale, scale, scale);
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[2, 0.6, 128, 64]} />
        <MeshTransmissionMaterial 
          backside
          samples={4}
          thickness={3}
          chromaticAberration={0.05}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#111111" // Dark obsidian glass
          resolution={1024}
        />
      </mesh>
    </Float>
  );
}

// Professional, multi-layered SVG Icons
const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-14 h-14 rounded-2xl border border-[#333336] bg-gradient-to-b from-[#1A1A1A] to-[#000000] flex items-center justify-center mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
    {children}
  </div>
);

const RadarIcon = () => (
  <IconWrapper>
    <svg className="w-6 h-6 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.05 5.05a10 10 0 0114.14 0M7.172 7.172a7 7 0 019.9 0M9.293 9.293a4 4 0 015.656 0M12 14a2 2 0 110-4 2 2 0 010 4z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 16v6" opacity="0.3" />
    </svg>
  </IconWrapper>
);

const VisionIcon = () => (
  <IconWrapper>
    <svg className="w-6 h-6 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h8M8 14h4" opacity="0.5" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 14l2-2" />
    </svg>
  </IconWrapper>
);

const TranslateIcon = () => (
  <IconWrapper>
    <svg className="w-6 h-6 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
      <circle cx="12" cy="12" r="10" strokeWidth="1" strokeDasharray="2 2" opacity="0.2" />
    </svg>
  </IconWrapper>
);

const UXIcon = () => (
  <IconWrapper>
    <svg className="w-6 h-6 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
    </svg>
  </IconWrapper>
);

const CodeIcon = () => (
  <IconWrapper>
    <svg className="w-6 h-6 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9l3 3-3 3M13 15h3M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
    </svg>
  </IconWrapper>
);

const SecurityIcon = () => (
  <IconWrapper>
    <svg className="w-6 h-6 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  </IconWrapper>
);

function Overlay() {
  return (
    <div className="w-full relative pointer-events-none text-[#FFFFFF] selection:bg-white selection:text-black font-['Inter']">
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-screen flex flex-col justify-center items-center px-6 text-center"
      >
        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-6 text-white drop-shadow-2xl">
          AccessApp
        </h1>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#CCCCCC] mb-8">
          Comprehensive AI-Driven Accessibility.
        </h2>
        <p className="text-xl md:text-2xl text-[#A3A3A3] font-normal max-w-3xl leading-relaxed">
          Engineered specifically for individuals with visual or auditory impairments. Leveraging edge-based machine learning paradigms to provide real-time spatial awareness without reliance on cloud-based processing.
        </p>
      </motion.section>

      {/* The Mission Section */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-screen flex flex-col justify-center items-center px-6 text-center max-w-5xl mx-auto"
      >
        <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-10">
          The scale of the problem.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 w-full">
          <div className="bg-[#111111]/80 backdrop-blur-md border border-[#333336] p-6 rounded-2xl">
            <h4 className="text-4xl font-bold text-white mb-2">26.8M+</h4>
            <p className="text-[#A3A3A3] text-sm">Persons with disabilities in India</p>
          </div>
          <div className="bg-[#111111]/80 backdrop-blur-md border border-[#333336] p-6 rounded-2xl">
            <h4 className="text-4xl font-bold text-white mb-2">1-2%</h4>
            <p className="text-[#A3A3A3] text-sm">Educational content is accessible</p>
          </div>
          <div className="bg-[#111111]/80 backdrop-blur-md border border-[#333336] p-6 rounded-2xl">
            <h4 className="text-4xl font-bold text-white mb-2">3x</h4>
            <p className="text-[#A3A3A3] text-sm">Higher dropout rates</p>
          </div>
          <div className="bg-[#111111]/80 backdrop-blur-md border border-[#333336] p-6 rounded-2xl">
            <h4 className="text-4xl font-bold text-white mb-2">13M</h4>
            <p className="text-[#A3A3A3] text-sm">Visually & hearing impaired</p>
          </div>
        </div>
        <p className="text-xl text-[#A3A3A3] font-light leading-relaxed max-w-4xl mx-auto text-center">
          Existing solutions are fragmented, heavily dependent on internet connectivity, and limited to English. AccessApp addresses these shortcomings by providing an <strong className="text-white">all-in-one, fully offline, bilingual (Hindi & English)</strong> platform that doesn't require juggling multiple siloed apps.
        </p>
      </motion.section>

      {/* Architecture & Security Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="h-screen flex flex-col justify-center items-center px-6 text-center max-w-5xl mx-auto"
      >
        <SecurityIcon />
        <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-8">
          100% On-Device Processing.
        </h2>
        <h3 className="text-3xl text-white font-medium mb-6">Zero latency. Zero data collection.</h3>
        <p className="text-xl md:text-2xl font-light text-[#86868B] leading-relaxed max-w-4xl mx-auto">
          Privacy and speed are non-negotiable when navigating physical environments. AccessApp utilizes Android's CameraX API and hardware-accelerated TensorFlow Lite models to analyze video frames strictly on your local device. 
        </p>
        <p className="text-xl font-light text-[#86868B] leading-relaxed max-w-4xl mx-auto mt-6">
          Your camera feed never leaves your phone. No cloud API calls, no hidden telemetry, and no internet connection required. It's security by design, guaranteeing split-second response times even in cellular dead zones.
        </p>
      </motion.section>

      {/* Flagship Modules Section */}
      <motion.section 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-150px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="min-h-screen px-6 md:px-12 max-w-7xl mx-auto pt-32 pb-40"
      >
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-center mb-8 text-white">
          Flagship Modules
        </h2>
        <p className="text-xl text-[#A3A3A3] text-center mb-24 max-w-3xl mx-auto font-normal">
          Four distinct, hardware-accelerated machine learning models working in perfect harmony.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pointer-events-auto">
          
          {/* Card 1 */}
          <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-[#333336] p-12 rounded-3xl hover:border-[#666666] transition-all duration-500 group shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
            <RadarIcon />
            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Obstacle Radar (MediaPipe Vision)</h3>
            <p className="text-lg text-[#CCCCCC] font-normal leading-relaxed mb-4">
              Uses real-time object detection via the device camera to identify approaching obstacles.
            </p>
            <ul className="text-base text-[#A3A3A3] font-normal leading-relaxed border-t border-[#333336] pt-4 list-disc pl-5 space-y-2">
              <li><strong className="text-white">Dynamic Haptic Feedback:</strong> Device vibrates dynamically based on obstacle proximity.</li>
              <li><strong className="text-white">Sonar Alerts:</strong> Emits varying audio tones to indicate distance.</li>
              <li><strong className="text-white">Glassmorphic HUD:</strong> Premium UI alerting bystanders to spatial awareness states.</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-[#333336] p-12 rounded-3xl hover:border-[#666666] transition-all duration-500 group shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
            <VisionIcon />
            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Notes-to-Audio (Unified OCR)</h3>
            <p className="text-lg text-[#CCCCCC] font-normal leading-relaxed mb-4">
              A seamless Optical Character Recognition (OCR) scanner powered by ML Kit.
            </p>
            <ul className="text-base text-[#A3A3A3] font-normal leading-relaxed border-t border-[#333336] pt-4 list-disc pl-5 space-y-2">
              <li><strong className="text-white">Auto-Language Detection:</strong> Automatically detects both Latin (English) and Devanagari (Hindi) characters without manual toggles.</li>
              <li><strong className="text-white">Instant TTS:</strong> Instantly converts scanned text into fluid speech using the native Android TTS Engine.</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-[#333336] p-12 rounded-3xl hover:border-[#666666] transition-all duration-500 group shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
            <TranslateIcon />
            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Live Sign Language Translator</h3>
            <p className="text-lg text-[#CCCCCC] font-normal leading-relaxed mb-4">
              Uses Google's MediaPipe Gesture Recognizer to identify American Sign Language (ASL) letters in real-time.
            </p>
            <p className="text-base text-[#A3A3A3] font-normal leading-relaxed border-t border-[#333336] pt-4">
              Translates live camera feeds into English text for seamless communication bridging, drastically improving interactivity for deaf users.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-[#333336] p-12 rounded-3xl hover:border-[#666666] transition-all duration-500 group shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
            <VisionIcon />
            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Color & Light Detector</h3>
            <p className="text-lg text-[#CCCCCC] font-normal leading-relaxed mb-4">
              Analyzes the center of the camera feed to output exact RGB values and relative luminance.
            </p>
            <p className="text-base text-[#A3A3A3] font-normal leading-relaxed border-t border-[#333336] pt-4">
              Converts raw values into human-readable color names (e.g., "Dark Navy Blue") to assist visually impaired users in identifying objects, clothing, and ambient lighting conditions.
            </p>
          </div>

        </div>
      </motion.section>

      {/* UX & Technical Details Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="min-h-screen px-6 md:px-12 max-w-7xl mx-auto pt-32 pb-40"
      >
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-center mb-24 text-white">
          Under the hood.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pointer-events-auto">
          
          <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-[#333336] p-12 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
            <UXIcon />
            <h3 className="text-3xl font-bold text-white mb-6">User Experience Methodology</h3>
            <ul className="text-lg text-[#CCCCCC] font-normal leading-relaxed space-y-6">
              <li><strong className="text-white">Kinetic Feedback:</strong> Employs the Compose <code>spring()</code> physics engine for all interactive elements to provide a sense of physical weight and momentum, aiding spatial memory.</li>
              <li><strong className="text-white">Auditory Cues:</strong> Integrates comprehensive system audio feedback for all state changes and button interactions.</li>
              <li><strong className="text-white">Contrast & Legibility:</strong> Utilizes a carefully calibrated palette designed exclusively for maximal readability under visual impairment conditions.</li>
            </ul>
          </div>

          <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-[#333336] p-12 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
            <CodeIcon />
            <h3 className="text-3xl font-bold text-white mb-6">Getting Started</h3>
            <p className="text-lg text-[#CCCCCC] font-normal mb-6">Built for modern Android ecosystems. Strict requirements ensure optimal neural network execution on the edge.</p>
            <ul className="text-lg text-[#CCCCCC] font-normal leading-relaxed space-y-4 border-l-2 border-[#333336] pl-6">
              <li><strong className="text-white">IDE:</strong> Android Studio Iguana (or newer)</li>
              <li><strong className="text-white">Minimum SDK:</strong> API 30 (Android 11)</li>
              <li><strong className="text-white">Target SDK:</strong> API 36</li>
              <li><strong className="text-white">Architecture:</strong> Jetpack Compose Material 3</li>
              <li><strong className="text-white">ML Pipeline:</strong> TensorFlow Lite & Google MediaPipe Vision</li>
            </ul>
          </div>

        </div>
      </motion.section>

      {/* Footer Section */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 1.5 }}
        className="h-screen flex flex-col justify-end items-center px-6 pb-20 text-center pointer-events-auto"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-12">
          Experience AccessApp.
        </h1>
        
        <a 
          href="https://github.com/madd69x/AccessApp" 
          target="_blank" 
          rel="noreferrer"
          className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#FFFFFF] px-12 py-5 text-xl font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-[#E5E5EA] shadow-[0_0_40px_rgba(255,255,255,0.2)] mb-32"
        >
          <span>View on GitHub</span>
          <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </a>
        
        <div className="w-full max-w-5xl border-t border-[#333336] pt-12 flex flex-col md:flex-row justify-between items-center text-sm font-normal text-[#A3A3A3]">
          <p>© 2026 Vortex AI. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Avadhi Sharma</span> • <span>Mudit Vaishnav</span> • <span>Mudra Chauhan</span> • <span>Jigyasha Mahariya</span> • <span>Monalika Vyas</span>
          </div>
        </div>
      </motion.footer>

    </div>
  );
}

// Global Header Component (Fixed outside Canvas)
const Header = () => (
  <header className="fixed top-0 left-0 w-full px-8 py-6 flex justify-between items-center z-50 bg-black/50 backdrop-blur-lg border-b border-[#333336] font-['Inter'] text-white">
    <div className="text-2xl font-bold tracking-tight">AccessApp</div>
    <a 
      href="https://github.com/madd69x/AccessApp" 
      target="_blank" 
      rel="noreferrer"
      className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#E5E5EA] transition-colors"
    >
      Download
    </a>
  </header>
);

export default function App() {
  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative">
      <Header />
      <Canvas camera={{ position: [0, 0, 9], fov: 40 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Environment preset="studio" />
        
        <ScrollControls pages={4} damping={0.15}>
          <Scroll>
            <ObsidianGlass />
          </Scroll>
          <Scroll html style={{ width: '100%', height: '100%' }}>
            <Overlay />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

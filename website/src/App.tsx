import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Environment, MeshTransmissionMaterial, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function GlassObject() {
  const mesh = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  useFrame((_state, delta) => {
    if (!mesh.current) return;
    const r1 = scroll.range(0, 1);
    
    // Smooth, clinical rotation
    mesh.current.rotation.y += delta * 0.15;
    mesh.current.rotation.x += delta * 0.12;
    
    // Scale and drift downward based on scroll
    mesh.current.position.y = -r1 * 12;
    mesh.current.position.z = r1 * 3;
    const scale = 1.2 + r1 * 1.5;
    mesh.current.scale.set(scale, scale, scale);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh}>
        <torusGeometry args={[1.5, 0.4, 64, 128]} />
        <MeshTransmissionMaterial 
          backside
          samples={8}
          thickness={1.5}
          chromaticAberration={0.03}
          anisotropy={0.2}
          distortion={0.2}
          distortionScale={0.2}
          temporalDistortion={0.0}
          color="#ffffff"
          resolution={1024}
        />
      </mesh>
    </Float>
  );
}

// Minimalist SVG Icons
const RadarIcon = () => (
  <svg className="w-10 h-10 mb-8 text-[#F5F5F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75m0 0l-3-1.5m3 1.5v-2.25m-15 2.25l1.5.75m0 0l3-1.5m-3 1.5v-2.25M3 9.75l1.5-.75m15 1.5l-1.5-.75M12 10.5v10.5m0-10.5l-3 1.5m3-1.5l3 1.5"></path></svg>
);

const VisionIcon = () => (
  <svg className="w-10 h-10 mb-8 text-[#F5F5F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
);

const TranslateIcon = () => (
  <svg className="w-10 h-10 mb-8 text-[#F5F5F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"></path></svg>
);

const LuminanceIcon = () => (
  <svg className="w-10 h-10 mb-8 text-[#F5F5F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"></path></svg>
);

function Overlay() {
  return (
    <div className="w-full relative pointer-events-none text-[#F5F5F7] selection:bg-white selection:text-black font-['Outfit']">
      
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-7xl md:text-9xl font-semibold tracking-tighter mb-4 text-white drop-shadow-lg">
          AccessApp.
        </h1>
        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#A1A1A6] mb-8">
          Visionary accessibility.
        </h2>
        <p className="text-xl md:text-2xl text-[#86868B] font-light max-w-2xl leading-relaxed">
          The definitive on-device AI companion. Engineered to empower students with unprecedented spatial intelligence and seamless translation.
        </p>
      </section>

      {/* The Challenge Section */}
      <section className="h-screen flex flex-col justify-center items-center px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-8">
          A new paradigm.
        </h2>
        <p className="text-2xl md:text-3xl font-light text-[#86868B] leading-relaxed max-w-4xl mx-auto">
          Over 2.2% of students face profound systemic barriers in education. We rebuilt accessibility from the ground up—placing an entire suite of advanced neural networks directly in your pocket. No cloud required.
        </p>
      </section>

      {/* Flagship Modules Section */}
      <section className="min-h-screen px-6 md:px-12 max-w-6xl mx-auto pt-40 pb-40">
        <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-center mb-24 text-white">
          Intelligence, on edge.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1 */}
          <div className="bg-black/40 backdrop-blur-md border border-[#333336] p-12 md:p-14 rounded-[2.5rem] hover:border-[#F5F5F7] transition-all duration-700 group shadow-2xl">
            <RadarIcon />
            <h3 className="text-4xl font-semibold text-white mb-6 tracking-tight group-hover:text-white">Spatial Radar</h3>
            <p className="text-xl text-[#A1A1A6] font-light leading-relaxed">
              Maps your immediate surroundings in real-time. Acting as a digital cane, it leverages deep computer vision to translate proximity into high-fidelity haptic feedback.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-black/40 backdrop-blur-md border border-[#333336] p-12 md:p-14 rounded-[2.5rem] hover:border-[#F5F5F7] transition-all duration-700 group shadow-2xl">
            <VisionIcon />
            <h3 className="text-4xl font-semibold text-white mb-6 tracking-tight group-hover:text-white">Neural OCR</h3>
            <p className="text-xl text-[#A1A1A6] font-light leading-relaxed">
              Instantaneous text comprehension. Frame any document, and the on-device ML Kit fluently synthesizes Latin and Devanagari scripts into natural-sounding speech.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-black/40 backdrop-blur-md border border-[#333336] p-12 md:p-14 rounded-[2.5rem] hover:border-[#F5F5F7] transition-all duration-700 group shadow-2xl">
            <TranslateIcon />
            <h3 className="text-4xl font-semibold text-white mb-6 tracking-tight group-hover:text-white">ASL Engine</h3>
            <p className="text-xl text-[#A1A1A6] font-light leading-relaxed">
              Bridging the communication divide. Powered by MediaPipe, it tracks 21 distinct 3D hand landmarks to translate live American Sign Language directly into massive, readable text.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-black/40 backdrop-blur-md border border-[#333336] p-12 md:p-14 rounded-[2.5rem] hover:border-[#F5F5F7] transition-all duration-700 group shadow-2xl">
            <LuminanceIcon />
            <h3 className="text-4xl font-semibold text-white mb-6 tracking-tight group-hover:text-white">Luminance</h3>
            <p className="text-xl text-[#A1A1A6] font-light leading-relaxed">
              Environmental awareness re-imagined. It evaluates ambient lighting conditions and translates raw chromatic values into human-readable colors to assist with everyday tasks.
            </p>
          </div>

        </div>
      </section>

      {/* Outro & Download Section */}
      <section className="h-screen flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-semibold text-white tracking-tighter mb-16">
          Ready to deploy.
        </h1>
        
        <a 
          href="https://github.com/madd69x/AccessApp" 
          target="_blank" 
          rel="noreferrer"
          className="pointer-events-auto group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-black/50 border border-[#333336] px-10 py-4 text-xl font-medium text-[#F5F5F7] transition-all duration-500 hover:bg-white hover:text-black hover:border-white shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
        >
          <span>Download Application</span>
          <svg className="w-5 h-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-3 3m0 0l-3-3m3 3V4"></path>
          </svg>
        </a>
        
        <div className="mt-32">
          <p className="text-[#86868B] text-xl font-light tracking-wide mb-8">Architected by <span className="text-white font-medium">Vortex AI</span></p>
          <div className="flex flex-wrap justify-center gap-8 text-[#A1A1A6] font-light text-lg">
            <span>Avadhi Sharma</span>
            <span>Mudit Vaishnav</span>
            <span>Mudra Chauhan</span>
            <span>Jigyasha Mahariya</span>
            <span>Monalika Vyas</span>
          </div>
        </div>
      </section>

    </div>
  );
}

export default function App() {
  return (
    <div className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 9], fov: 40 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={3} />
        <Environment preset="city" />
        
        <ScrollControls pages={4} damping={0.15}>
          <Scroll>
            <GlassObject />
          </Scroll>
          <Scroll html style={{ width: '100%', height: '100%' }}>
            <Overlay />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Environment, Sparkles, Stars, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Nebula() {
  const group = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((_state, delta) => {
    if (!group.current) return;
    const r1 = scroll.range(0, 1);
    
    // Slow drift based on time and scroll
    group.current.rotation.y += delta * 0.05;
    group.current.rotation.x -= delta * 0.02;
    group.current.position.z = r1 * 20; // Fly through the stars as you scroll
  });

  return (
    <group ref={group}>
      <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={500} scale={20} size={4} speed={0.2} opacity={0.6} color="#7F52FF" />
      <Sparkles count={500} scale={20} size={2} speed={0.4} opacity={0.4} color="#4285F4" />
    </group>
  );
}

function Overlay() {
  return (
    <div className="w-full relative pointer-events-none text-white selection:bg-fuchsia-300 selection:text-fuchsia-900">
      
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tight bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(127,82,255,0.3)] pointer-events-auto">
          AccessApp
        </h1>
        <p className="text-2xl md:text-4xl font-light text-slate-300 mb-8 max-w-3xl leading-relaxed">
          The next-generation <span className="font-semibold text-white">AI Accessibility Assistant</span>
        </p>
        <p className="text-lg text-slate-400 max-w-2xl font-light tracking-wide">
          Empowering specially enabled students with ultra-fast, on-device Machine Learning.
        </p>
      </section>

      {/* The Challenge Section */}
      <section className="h-screen flex flex-col justify-center items-start px-12 md:px-32 max-w-7xl mx-auto">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-16 rounded-3xl shadow-2xl">
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-6 drop-shadow-md">
            The Challenge
          </h2>
          <p className="text-3xl font-light text-slate-200 mb-6 leading-tight">
            Over <span className="font-bold text-white">2.2%</span> of Indian students live with disabilities.
          </p>
          <p className="text-xl text-slate-400 leading-relaxed font-light max-w-2xl">
            Many face daily barriers accessing lectures, campus facilities, and peer interaction. There is an urgent need for inclusive, deeply integrated assistive technology in modern educational institutions.
          </p>
        </div>
      </section>

      {/* Flagship Modules Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto pt-32 pb-32">
        <h2 className="text-5xl md:text-7xl font-bold text-center mb-20 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
          Flagship Modules
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          <div className="group bg-white/5 hover:bg-white/10 transition-all duration-500 backdrop-blur-3xl border border-white/10 hover:border-blue-500/50 p-10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_60px_rgba(66,133,244,0.3)] hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 mb-6 flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Obstacle Radar</h3>
            <p className="text-lg text-slate-400 font-light leading-relaxed">Delivers real-time spatial awareness using advanced computer vision and dynamic haptic feedback, acting as a digital cane.</p>
          </div>

          <div className="group bg-white/5 hover:bg-white/10 transition-all duration-500 backdrop-blur-3xl border border-white/10 hover:border-purple-500/50 p-10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_60px_rgba(127,82,255,0.3)] hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-400 mb-6 flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Notes-to-Audio</h3>
            <p className="text-lg text-slate-400 font-light leading-relaxed">Seamless Optical Character Recognition (OCR) that instantly transforms printed text and handwriting into natural-sounding speech.</p>
          </div>

          <div className="group bg-white/5 hover:bg-white/10 transition-all duration-500 backdrop-blur-3xl border border-white/10 hover:border-green-500/50 p-10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_60px_rgba(61,220,132,0.3)] hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 mb-6 flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"></path></svg>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Live ASL Translator</h3>
            <p className="text-lg text-slate-400 font-light leading-relaxed">Utilizes Google MediaPipe to translate live American Sign Language gestures into fluid, readable text in real-time.</p>
          </div>

          <div className="group bg-white/5 hover:bg-white/10 transition-all duration-500 backdrop-blur-3xl border border-white/10 hover:border-yellow-500/50 p-10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_60px_rgba(255,193,7,0.3)] hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 mb-6 flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Color & Light Detector</h3>
            <p className="text-lg text-slate-400 font-light leading-relaxed">Evaluates ambient lighting and translates chromatic values into human-readable colors to assist visually impaired students.</p>
          </div>

        </div>
      </section>

      {/* Outro & Download Section */}
      <section className="h-screen flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-12 drop-shadow-2xl">
          Ready to Transform Education?
        </h1>
        
        <a 
          href="https://github.com/madd69x/AccessApp" 
          target="_blank" 
          rel="noreferrer"
          className="pointer-events-auto relative inline-flex items-center justify-center px-12 py-5 text-2xl font-bold text-white transition-all duration-300 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 hover:scale-105 backdrop-blur-xl group overflow-hidden shadow-[0_0_40px_rgba(66,133,244,0.4)] hover:shadow-[0_0_80px_rgba(127,82,255,0.6)]"
        >
          <span className="relative z-10">Download Application</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
        </a>
        
        <div className="mt-20">
          <p className="text-slate-400 text-xl font-light mb-4">Proudly engineered by <span className="font-bold text-white">Vortex AI</span></p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 font-light max-w-3xl mx-auto">
            <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10">Avadhi Sharma</span>
            <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10">Mudit Vaishnav</span>
            <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10">Mudra Chauhan</span>
            <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10">Jigyasha Mahariya</span>
            <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10">Monalika Vyas</span>
          </div>
        </div>
      </section>

    </div>
  );
}

export default function App() {
  return (
    <div className="w-screen h-screen bg-[#050B14]">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="night" />
        
        <ScrollControls pages={4} damping={0.15}>
          <Scroll>
            <Nebula />
          </Scroll>
          <Scroll html style={{ width: '100%', height: '100%' }}>
            <Overlay />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

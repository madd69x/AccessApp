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
    mesh.current.rotation.x += delta * 0.1;
    
    // Scale and drift downward based on scroll
    mesh.current.position.y = -r1 * 10;
    mesh.current.position.z = r1 * 2;
    const scale = 1 + r1 * 1.2;
    mesh.current.scale.set(scale, scale, scale);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh}>
        <torusGeometry args={[1.5, 0.5, 32, 100]} />
        <MeshTransmissionMaterial 
          backside
          samples={4}
          thickness={1.5}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.0}
          color="#ffffff"
          resolution={512}
        />
      </mesh>
    </Float>
  );
}

function Overlay() {
  return (
    <div className="w-full relative pointer-events-none text-[#F5F5F7] selection:bg-white selection:text-black">
      
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-medium tracking-tighter mb-4 text-white">
          AccessApp.
        </h1>
        <h2 className="text-4xl md:text-6xl font-light tracking-tight text-[#86868B] mb-8">
          Pro-level accessibility.
        </h2>
        <p className="text-xl md:text-2xl text-[#86868B] font-light max-w-3xl leading-relaxed">
          The most advanced on-device AI assistant ever created for students.
        </p>
      </section>

      {/* The Challenge Section */}
      <section className="h-screen flex flex-col justify-center items-center px-6 text-center max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white mb-8">
          Breaking barriers.
        </h2>
        <p className="text-2xl md:text-4xl font-light text-[#86868B] leading-tight max-w-4xl mx-auto">
          Education should be universal. We engineered an uncompromising tool to bring spatial awareness, text-to-speech, and sign language translation directly to your pocket. No cloud required.
        </p>
      </section>

      {/* Flagship Modules Section */}
      <section className="min-h-screen px-6 md:px-20 max-w-7xl mx-auto pt-32 pb-32">
        <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-center mb-24 text-white">
          Four breakthroughs.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-transparent border border-[#333336] p-12 rounded-[2rem] hover:border-[#F5F5F7] transition-colors duration-500 group">
            <h3 className="text-3xl font-medium text-white mb-4 tracking-tight group-hover:text-white">Radar.</h3>
            <p className="text-xl text-[#86868B] font-light leading-relaxed">
              Real-time spatial mapping using advanced computer vision. It acts as a digital cane, providing high-fidelity haptic feedback based on proximity.
            </p>
          </div>

          <div className="bg-transparent border border-[#333336] p-12 rounded-[2rem] hover:border-[#F5F5F7] transition-colors duration-500 group">
            <h3 className="text-3xl font-medium text-white mb-4 tracking-tight group-hover:text-white">Vision.</h3>
            <p className="text-xl text-[#86868B] font-light leading-relaxed">
              Instantaneous Optical Character Recognition. Point your camera at any document, and it fluently reads both English and Hindi out loud.
            </p>
          </div>

          <div className="bg-transparent border border-[#333336] p-12 rounded-[2rem] hover:border-[#F5F5F7] transition-colors duration-500 group">
            <h3 className="text-3xl font-medium text-white mb-4 tracking-tight group-hover:text-white">Translate.</h3>
            <p className="text-xl text-[#86868B] font-light leading-relaxed">
              Powered by Google MediaPipe. It tracks 21 distinct 3D hand landmarks to translate live American Sign Language directly into massive, readable text.
            </p>
          </div>

          <div className="bg-transparent border border-[#333336] p-12 rounded-[2rem] hover:border-[#F5F5F7] transition-colors duration-500 group">
            <h3 className="text-3xl font-medium text-white mb-4 tracking-tight group-hover:text-white">Luminance.</h3>
            <p className="text-xl text-[#86868B] font-light leading-relaxed">
              Evaluates ambient environments. Translates raw chromatic values into human-readable colors to assist visually impaired students with their surroundings.
            </p>
          </div>

        </div>
      </section>

      {/* Outro & Download Section */}
      <section className="h-screen flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-medium text-white tracking-tighter mb-12">
          Experience it now.
        </h1>
        
        <a 
          href="https://github.com/madd69x/AccessApp" 
          target="_blank" 
          rel="noreferrer"
          className="pointer-events-auto bg-white text-black px-10 py-4 rounded-full text-xl font-medium hover:bg-[#E5E5EA] transition-colors duration-300"
        >
          Download for Android
        </a>
        
        <div className="mt-32">
          <p className="text-[#86868B] text-lg font-light tracking-wide mb-6">Designed by Vortex AI</p>
          <div className="flex flex-wrap justify-center gap-6 text-[#A1A1A6] font-light">
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
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <Environment preset="studio" />
        
        <ScrollControls pages={4} damping={0.1}>
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

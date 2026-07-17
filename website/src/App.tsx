import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Environment, Float, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AbstractShape() {
  const mesh = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  useFrame((_state, delta) => {
    if (!mesh.current) return;
    const r1 = scroll.range(0, 1);
    
    // Rotate the shape
    mesh.current.rotation.y += delta * 0.2;
    mesh.current.rotation.x += delta * 0.1;

    // Scale and move based on scroll
    mesh.current.position.y = -r1 * 5; 
    mesh.current.position.x = Math.sin(r1 * Math.PI) * 2;
    
    const scale = 1 + r1 * 1.5;
    mesh.current.scale.set(scale, scale, scale);

    // Color shift
    const colorStart = new THREE.Color("#4285F4");
    const colorEnd = new THREE.Color("#7F52FF");
    (mesh.current.material as THREE.MeshStandardMaterial).color.lerpColors(colorStart, colorEnd, r1);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#4285F4" wireframe={true} />
      </mesh>
    </Float>
  );
}

function Overlay() {
  return (
    <>
      <div style={{ position: "absolute", top: "10vh", left: "10vw", width: "40vw" }}>
        <h1 className="text-6xl font-black text-white mb-4 drop-shadow-lg">AccessApp</h1>
        <p className="text-2xl text-blue-200">AI-Powered Accessibility Assistant</p>
        <p className="text-lg text-slate-300 mt-4">Empowering specially enabled students with real-time on-device Machine Learning.</p>
      </div>

      <div style={{ position: "absolute", top: "120vh", right: "10vw", width: "40vw", textAlign: "right" }}>
        <h2 className="text-5xl font-bold text-orange-400 mb-4 drop-shadow-md">The Challenge</h2>
        <p className="text-xl text-slate-200">Over 2.2% of Indian students live with disabilities, facing daily barriers in education.</p>
      </div>

      <div style={{ position: "absolute", top: "220vh", left: "10vw", width: "50vw" }}>
        <h2 className="text-5xl font-bold text-purple-400 mb-8 drop-shadow-md">Flagship Modules</h2>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white/5 p-6 rounded-xl border-l-4 border-blue-500 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-2">Obstacle Radar</h3>
            <p className="text-slate-300">Real-time spatial awareness using computer vision.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border-l-4 border-orange-500 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-2">Notes-to-Audio</h3>
            <p className="text-slate-300">Instant OCR and natural-sounding speech.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border-l-4 border-green-500 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-2">ASL Translator</h3>
            <p className="text-slate-300">Sign Language to text instantly via MediaPipe.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border-l-4 border-purple-500 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-2">Color & Light</h3>
            <p className="text-slate-300">Environmental awareness for everyday life.</p>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", top: "340vh", left: "0", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 className="text-6xl font-black text-white mb-8 drop-shadow-lg text-center">Ready to Transform Education?</h1>
        <a 
          href="https://github.com/madd69x/AccessApp" 
          target="_blank" 
          rel="noreferrer"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-2xl py-4 px-12 rounded-full shadow-[0_0_40px_rgba(127,82,255,0.5)] hover:scale-105 transition-transform"
        >
          Download Application
        </a>
        <p className="text-slate-400 mt-12 text-lg">Made by Vortex AI</p>
      </div>
    </>
  );
}

export default function App() {
  return (
    <div className="w-screen h-screen bg-[#0A192F]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        
        <ScrollControls pages={4} damping={0.2}>
          <Scroll>
            <AbstractShape />
            <Sparkles count={100} scale={12} size={2} speed={0.4} opacity={0.5} color="#4285F4" />
          </Scroll>
          <Scroll html>
            <Overlay />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

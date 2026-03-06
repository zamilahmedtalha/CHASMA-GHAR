import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function LiquidShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} scale={2.5}>
      <sphereGeometry args={[1, 128, 128]} />
      <MeshDistortMaterial
        color="#d946ef"
        emissive="#4c1d95"
        emissiveIntensity={0.6}
        roughness={0.1}
        metalness={0.8}
        distort={0.5}
        speed={1.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

export default function LiquidBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#05020a]">
      <Canvas camera={{ position: [0, 0, 3] }} gl={{ antialias: true, alpha: false }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00ffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#ff00ff" />
        <LiquidShape />
        <Environment preset="city" />
      </Canvas>
      {/* Subtle noise overlay for texture */}
      <div className="absolute inset-0 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
    </div>
  );
}

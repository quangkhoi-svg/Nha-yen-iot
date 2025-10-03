import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

function SwiftletHouse() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#2563eb" metalness={0.5} roughness={0.3} />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <SwiftletHouse />
      <OrbitControls />
      <Environment preset="sunset" />
    </Canvas>
  );
}

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

// ==================== Nhà yến ====================
function SwiftletHouse() {
  return (
    <group position={[0, 0, 0]}>
      {/* Thân nhà */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[2.5, 3, 1.5]} />
        <meshStandardMaterial color="#d1d5db" roughness={0.6} />
      </mesh>

      {/* Mái */}
      <mesh position={[0, 3.5, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[2.3, 1.2, 4]} />
        <meshStandardMaterial color="#1e293b" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Lỗ chim yến */}
      {[...Array(6)].map((_, i) => (
        <mesh
          key={i}
          position={[
            -0.9 + (i % 3) * 0.9,
            0.9 + Math.floor(i / 3) * 1.0,
            0.76,
          ]}
        >
          <circleGeometry args={[0.1, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
      ))}
    </group>
  );
}

// ==================== Chim yến ====================
function Bird({ radius = 5, height = 3, speed = 1 }) {
  const ref = useRef();
  const wingRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;
    ref.current.position.set(x, height, z);
    ref.current.rotation.y = -t;
    if (wingRef.current) {
      wingRef.current.rotation.z = Math.sin(t * 10) * 0.5;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh ref={wingRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.4, 0.02, 0.1]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
}

function BirdFlock({ count = 20 }) {
  const birds = Array.from({ length: count }).map((_, i) => {
    const radius = 3 + Math.random() * 6;
    const height = 2 + Math.random() * 3;
    const speed = 0.5 + Math.random() * 1.5;
    return <Bird key={i} radius={radius} height={height} speed={speed} />;
  });
  return <group>{birds}</group>;
}

// ==================== Cây ====================
function Tree({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.25, 2, 12]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
      <mesh position={[0, 2.5, 0]} castShadow>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshStandardMaterial color="#166534" />
      </mesh>
    </group>
  );
}

// ==================== Đá ====================
function Rock({ position, scale = 0.3 }) {
  return (
    <mesh position={position} castShadow>
      <icosahedronGeometry args={[scale, 1]} />
      <meshStandardMaterial color="#475569" roughness={1} />
    </mesh>
  );
}

// ==================== Bụi cỏ ====================
function Grass({ position }) {
  return (
    <group position={position}>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 0.4,
            0,
            (Math.random() - 0.5) * 0.4,
          ]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.03, 0.03, 0.2 + Math.random() * 0.2, 6]} />
          <meshStandardMaterial color="#4ade80" />
        </mesh>
      ))}
    </group>
  );
}

// ==================== Hero3D ====================
export default function Hero3D() {
  return (
    <div className="h-[600px] w-full">
      <Canvas shadows camera={{ position: [8, 6, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Nhà yến */}
        <SwiftletHouse />

        {/* Đàn chim yến */}
        <BirdFlock count={20} />

        <mesh
  rotation={[-Math.PI / 2, 0, 0]}
  position={[0, -0.05, 0]}
  receiveShadow
>
  <planeGeometry args={[60, 60]} />
  <meshStandardMaterial color="#22c55e" /> {/* xanh cỏ đậm hơn */}
</mesh>

        {/* Cây, đá, cỏ */}
        <Tree position={[-6, 0, 3]} />
        <Tree position={[7, 0, -4]} />
        <Rock position={[2, 0.2, 3]} scale={0.4} />
        <Rock position={[-2, 0.2, -2]} scale={0.3} />
        <Grass position={[-1, 0, 2]} />
        <Grass position={[1.5, 0, -1]} />
        <Grass position={[3, 0, 4]} />
        <Grass position={[-4, 0, -3]} />

        <color attach="background" args={["#e0f7ff"]} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

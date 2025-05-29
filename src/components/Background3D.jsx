import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function DigitalEarth({ scrollY }) {
  const mesh = useRef();
  const glow = useRef();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y = scrollY / 400;
      mesh.current.rotation.x = 0.3 + Math.sin(scrollY / 600) * 0.2;
    }
    if (glow.current) {
      glow.current.material.opacity = 0.25 + Math.abs(Math.sin(scrollY / 300)) * 0.15;
    }
  });

  return (
    <group>
      {/* Wireframe Sphere */}
      <mesh ref={mesh} position={[0, 0, -5]}>
        <sphereGeometry args={[2.2, 48, 48]} />
        <meshBasicMaterial color="#9EF170" wireframe />
      </mesh>
      {/* Glowing Sphere */}
      <mesh ref={glow} position={[0, 0, -5]}>
        <sphereGeometry args={[2.4, 48, 48]} />
        <meshBasicMaterial color="#9EF170" transparent opacity={0.3} />
      </mesh>
      {/* Dots/Points Layer */}
      <points position={[0, 0, -5]}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <pointsMaterial color="#9EF170" size={0.06} sizeAttenuation />
      </points>
    </group>
  );
}

const Background3D = ({ scrollY }) => {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }}
      camera={{ position: [0, 0, 7], fov: 60 }}
    >
      <ambientLight intensity={0.6} />
      <DigitalEarth scrollY={scrollY} />
    </Canvas>
  );
};

export default Background3D;
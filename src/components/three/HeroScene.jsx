import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { inSphere } from 'maath/random';

function DistortedSphere() {
  const ref = useRef();
  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.15;
    ref.current.position.x = pointer.x * 0.4;
    ref.current.position.y = pointer.y * 0.3;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.4, 16]} />
        <meshStandardMaterial
          color="#5b4cb1"
          emissive="#8a82fb"
          emissiveIntensity={0.6}
          roughness={0.25}
          metalness={0.4}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const ref = useRef();
  const positions = useMemo(
    () => inSphere(new Float32Array(1500 * 3), { radius: 6 }),
    []
  );
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.03;
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#22d3ee"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

export default function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#8a82fb" />
      <DistortedSphere />
      <ParticleField />
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} intensity={0.9} mipmapBlur />
      </EffectComposer>
    </>
  );
}

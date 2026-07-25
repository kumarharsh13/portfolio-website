import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Image, OrbitControls } from '@react-three/drei';

// Fibonacci-sphere distribution so icons spread evenly.
function spherePositions(count, radius) {
  const pts = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * increment;
    pts.push([Math.cos(phi) * r * radius, y * radius, Math.sin(phi) * r * radius]);
  }
  return pts;
}

export default function TechCloud({ icons }) {
  const group = useRef();
  const positions = spherePositions(icons.length, 2.4);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.15;
  });
  return (
    <>
      <ambientLight intensity={0.8} />
      <group ref={group}>
        {icons.map((src, i) => (
          <Billboard key={i} position={positions[i]}>
            <Image url={src} transparent scale={0.8} toneMapped={false} />
          </Billboard>
        ))}
      </group>
      <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.6} />
    </>
  );
}

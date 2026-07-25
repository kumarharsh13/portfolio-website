import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Image, Line } from '@react-three/drei';

// A flat ring of points (in the group's local XZ plane) for the orbit path line.
function ringPoints(radius, segments = 80) {
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    pts.push([Math.cos(a) * radius, 0, Math.sin(a) * radius]);
  }
  return pts;
}

// One tilted orbital: a faint path line + electrons revolving around it.
function Orbit({ icons, radius, tilt, speed, phase = 0 }) {
  const spinner = useRef();
  useFrame((state) => {
    if (spinner.current) {
      spinner.current.rotation.y = state.clock.elapsedTime * speed + phase;
    }
  });
  const n = icons.length;
  return (
    <group rotation={tilt}>
      <Line points={ringPoints(radius)} color="#8a82fb" transparent opacity={0.22} lineWidth={1} />
      <group ref={spinner}>
        {icons.map((src, i) => {
          const a = (i / n) * Math.PI * 2;
          return (
            // Billboard keeps each icon facing the camera while it revolves.
            <Billboard key={i} position={[Math.cos(a) * radius, 0, Math.sin(a) * radius]}>
              <Image url={src} scale={0.8} transparent toneMapped={false} />
            </Billboard>
          );
        })}
      </group>
    </group>
  );
}

// The nucleus: the yoga-man image, gently pulsing.
function Nucleus({ img }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.035;
      ref.current.scale.set(s, s, s);
    }
  });
  return (
    <Billboard>
      <group ref={ref}>
        <Image url={img} scale={[4.2, 3.15]} transparent toneMapped={false} />
      </group>
    </Billboard>
  );
}

export default function AtomScene({ nucleus, icons }) {
  // Spread the icons across three orbitals for the electron-shell look.
  const shell = (m) => icons.filter((_, i) => i % 3 === m);
  return (
    <>
      <ambientLight intensity={1} />
      <Nucleus img={nucleus} />
      {/* Classic atom symbol: three edge-on elliptical orbits at 0/60/120 deg. */}
      <Orbit icons={shell(0)} radius={3.4} tilt={[0.6, 0, 0]} speed={0.85} phase={0} />
      <Orbit icons={shell(1)} radius={4.0} tilt={[0.6, 0, 1.047]} speed={-0.78} phase={1.4} />
      <Orbit icons={shell(2)} radius={4.6} tilt={[0.6, 0, 2.094]} speed={0.68} phase={2.7} />
    </>
  );
}

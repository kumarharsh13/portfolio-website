import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { inSphere } from 'maath/random';

// A slowly drifting starfield, tinted to the atom's purple/cyan palette.
function Field({ count, radius, color, size, speed }) {
  const ref = useRef();
  const positions = useMemo(
    () => inSphere(new Float32Array(count * 3), { radius }),
    [count, radius]
  );
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.rotation.y = t * speed;
      ref.current.rotation.x = t * speed * 0.4;
    }
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color={color} size={size} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

export default function HeroBackground() {
  return (
    <>
      <Field count={1800} radius={9} color="#8a82fb" size={0.03} speed={0.02} />
      <Field count={1200} radius={6} color="#22d3ee" size={0.022} speed={-0.03} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.15} intensity={0.7} mipmapBlur />
      </EffectComposer>
    </>
  );
}

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import useIsMobile from '../../hooks/useIsMobile';

export default function CanvasScene({
  children,
  fallback = null,
  disableOnMobile = false,
  dpr = [1, 2],
  camera = { position: [0, 0, 6], fov: 50 },
  style,
  ...rest
}) {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();

  if (reduced || (disableOnMobile && mobile)) {
    return fallback;
  }

  // R3F defaults the canvas container to `touch-action: none`, which swallows
  // vertical page scroll/trackpad gestures over the canvas — the page feels
  // stuck until the cursor leaves it. `pan-y` lets the page scroll while still
  // allowing horizontal drag gestures (e.g. OrbitControls rotate).
  return (
    <Canvas
      dpr={dpr}
      camera={camera}
      gl={{ antialias: true }}
      style={{ touchAction: 'pan-y', ...style }}
      {...rest}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}

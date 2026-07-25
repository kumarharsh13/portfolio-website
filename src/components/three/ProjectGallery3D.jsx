import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import { easing } from 'maath';

// Card plane size (world units). Screenshots are all 1920x878 (ratio 2.187),
// so the plane MUST match that aspect or drei <Image>'s cover fit crops the sides.
const CARD = [7.66, 3.5];   // 7.66 / 3.5 = 2.188 (matches 1920x878 screenshots)
const SPACING = 4.7;        // horizontal gap between neighbours
const DEPTH = 2.8;          // how far back each step recedes

function Card({ index, active, image, onSelect, onFocus }) {
  const group = useRef();
  const imgRef = useRef();
  const offset = index - active;
  const isActive = offset === 0;

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const float = isActive ? Math.sin(t * 1.4) * 0.09 : 0;

    easing.damp3(
      group.current.position,
      [offset * SPACING, float, -Math.abs(offset) * DEPTH],
      0.32,
      delta
    );
    easing.dampE(
      group.current.rotation,
      [0, offset * -0.55, isActive ? 0 : 0],
      0.32,
      delta
    );
    // Smoothly grow the focused card, shrink the rest.
    const s = isActive ? 1 : 0.72;
    easing.damp3(group.current.scale, [s, s, s], 0.32, delta);

    // Fade + desaturate the unfocused cards so the active one pops.
    if (imgRef.current) {
      easing.damp(imgRef.current.material, 'opacity', isActive ? 1 : 0.4, 0.32, delta);
      easing.damp(imgRef.current.material, 'grayscale', isActive ? 0 : 0.7, 0.32, delta);
    }
  });

  return (
    <group ref={group}>
      <Image
        ref={imgRef}
        url={image}
        scale={CARD}
        radius={0.18}
        transparent
        toneMapped={false}
        onClick={(e) => {
          e.stopPropagation();
          if (isActive) onSelect();
          else onFocus(index);
        }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      />
    </group>
  );
}

export default function ProjectGallery3D({ images, active, onSelect, onFocus }) {
  return (
    <>
      <ambientLight intensity={1} />
      {images.map((img, i) => (
        <Card
          key={i}
          index={i}
          active={active}
          image={img}
          onSelect={onSelect}
          onFocus={onFocus}
        />
      ))}
    </>
  );
}

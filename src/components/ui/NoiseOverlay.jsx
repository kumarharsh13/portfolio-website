import styles from './NoiseOverlay.module.css';

// Inline SVG fractal noise as a data URI — no network request, very light.
const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>
      <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`
  );

export default function NoiseOverlay() {
  return <div className={styles.noise} style={{ backgroundImage: `url("${NOISE}")` }} aria-hidden="true" />;
}

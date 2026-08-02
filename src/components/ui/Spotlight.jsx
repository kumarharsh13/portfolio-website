import { useEffect, useRef, useState } from 'react';
import styles from './Spotlight.module.css';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function Spotlight() {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return undefined;
    setEnabled(true);
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2, x = tx, y = ty, raf;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      x += (tx - x) * 0.12; y += (ty - y) * 0.12;
      if (ref.current) ref.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, [reduced]);

  if (!enabled) return null;
  return <div ref={ref} className={styles.spot} aria-hidden="true" />;
}

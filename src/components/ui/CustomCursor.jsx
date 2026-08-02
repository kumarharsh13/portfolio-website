import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Mouse only — skip touch / coarse pointers and reduced-motion users.
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setEnabled(true);
    document.body.classList.add('cursor-none');

    let tx = 0, ty = 0, rx = 0, ry = 0, raf;
    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      }
    };
    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    const over = (e) => {
      if (e.target.closest('a, button, input, textarea, [data-cursor]')) {
        ring.current?.classList.add(styles.hover);
      }
    };
    const out = (e) => {
      if (e.target.closest('a, button, input, textarea, [data-cursor]')) {
        ring.current?.classList.remove(styles.hover);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
      cancelAnimationFrame(raf);
      document.body.classList.remove('cursor-none');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={ring} className={styles.ring} />
      <div ref={dot} className={styles.dot} />
    </>
  );
}

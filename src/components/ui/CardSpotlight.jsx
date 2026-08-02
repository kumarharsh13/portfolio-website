import { useEffect } from 'react';

// One delegated listener drives the radial highlight on every `.spot-card`.
// It sets --mx/--my (cursor position relative to the hovered card) as CSS vars.
export default function CardSpotlight() {
  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches === false) return undefined;
    const onMove = (e) => {
      const card = e.target.closest?.('.spot-card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return null;
}

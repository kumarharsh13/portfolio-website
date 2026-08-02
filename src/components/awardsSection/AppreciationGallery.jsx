import { useEffect, useState } from 'react';
import styles from './AppreciationGallery.module.css';

// Auto-load every image dropped into src/resources/appreciation — no JSON to edit.
function importAll(ctx) {
  return ctx
    .keys()
    .sort()
    .map((key) => ({ src: ctx(key), name: key.replace('./', '') }));
}

let cards = [];
try {
  cards = importAll(
    require.context('../../resources/appreciation', false, /\.(png|jpe?g|webp)$/)
  );
} catch (e) {
  cards = [];
}

export default function AppreciationGallery() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Nothing to show until images are added — render nothing.
  if (!cards.length) return null;

  return (
    <div className={styles.wrap}>
      <h2 className={styles.subheading}>Appreciation</h2>
      <p className={styles.note}>Shout-outs and recognition from managers and colleagues.</p>

      <div className={styles.masonry}>
        {cards.map((card, i) => (
          <button
            key={i}
            className={styles.card}
            onClick={() => setActive(card)}
            aria-label="View appreciation card"
          >
            <img src={card.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>

      {active && (
        <div className={styles.lightbox} onClick={() => setActive(null)}>
          <img src={active.src} alt="" className={styles.full} onClick={(e) => e.stopPropagation()} />
          <button className={styles.close} onClick={() => setActive(null)} aria-label="Close">×</button>
        </div>
      )}
    </div>
  );
}

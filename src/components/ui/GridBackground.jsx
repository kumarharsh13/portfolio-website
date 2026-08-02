import styles from './GridBackground.module.css';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import Fireflies from './Fireflies';

export default function GridBackground() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.scene}>
        <div className={styles.grid} />
      </div>
      <div className={`${styles.mesh} ${reduced ? '' : styles.animated}`} />
      <Fireflies />
    </div>
  );
}

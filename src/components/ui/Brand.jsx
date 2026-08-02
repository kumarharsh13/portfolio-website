import { useNavigate } from 'react-router-dom';
import styles from './Brand.module.css';

export default function Brand({ onOpenPalette }) {
  const navigate = useNavigate();
  const goHome = () => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return (
    <div className={styles.topbar}>
      <button className={styles.logo} onClick={goHome} aria-label="Harsh Kumar — home">
        <span className={styles.mark}>HK</span>
        <span className={styles.word}>Harsh Kumar</span>
      </button>
      <button className={styles.cmdk} onClick={onOpenPalette} aria-label="Open command palette">
        <kbd className={styles.key}>⌘</kbd><kbd className={styles.key}>K</kbd>
      </button>
    </div>
  );
}

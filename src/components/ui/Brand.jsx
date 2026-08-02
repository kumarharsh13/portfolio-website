import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import styles from './Brand.module.css';
import Resume from '../../resources/resume/Harsh Kumar Resume.pdf';

export default function Brand({ onOpenPalette }) {
  const navigate = useNavigate();
  const goHome = () => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return (
    <div className={styles.topbar}>
      <button className={styles.logo} onClick={goHome} aria-label="Harsh Kumar — home">
        <span className={styles.mark}>HK</span>
        <span className={styles.word}>Harsh Kumar</span>
      </button>
      <div className={styles.right}>
        <a href={Resume} download="Harsh Kumar Resume.pdf" className={styles.resume} aria-label="Download résumé">
          <FontAwesomeIcon icon={faArrowDown} />
          <span className={styles.resumeText}>Résumé</span>
        </a>
        <button className={styles.cmdk} onClick={onOpenPalette} aria-label="Open command menu">
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.cmdkIcon} />
          <span className={styles.cmdkKeys}><kbd className={styles.key}>⌘</kbd><kbd className={styles.key}>K</kbd></span>
        </button>
      </div>
    </div>
  );
}

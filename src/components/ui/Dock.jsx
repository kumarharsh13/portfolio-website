import { motion } from 'framer-motion';
import styles from './Dock.module.css';
import SECTIONS from '../../config/sections';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse, faBrain, faBriefcase, faLayerGroup,
  faPenNib, faCompass, faTrophy, faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

const ICONS = {
  home: faHouse, think: faBrain, experience: faBriefcase, projects: faLayerGroup,
  notes: faPenNib, exploring: faCompass, achievements: faTrophy, contact: faEnvelope,
};

export default function Dock({ activeId, onNavigate }) {
  return (
    <nav className={styles.dock} aria-label="Section navigation">
      {SECTIONS.map((s) => (
        <motion.button
          key={s.id}
          className={`${styles.item} ${activeId === s.id ? styles.active : ''}`}
          onClick={() => onNavigate(s.id)}
          whileHover={{ y: -6, scale: 1.15 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          aria-label={s.label}
        >
          <FontAwesomeIcon icon={ICONS[s.id]} />
          <span className={styles.tip}>{s.label}</span>
        </motion.button>
      ))}
    </nav>
  );
}

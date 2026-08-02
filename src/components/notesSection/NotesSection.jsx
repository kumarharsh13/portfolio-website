import { Link } from 'react-router-dom';
import styles from './NotesSection.module.css';
import notes from '../../resources/data/notes.json';
import RevealText from '../ui/RevealText';
import { slugify } from '../../lib/slug';

const HOME_LIMIT = 3;

function NotesSection() {
  const brief = notes.slice(0, HOME_LIMIT);
  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.kicker}>Engineering Notes</span>
        <h2 className={styles.heading}><RevealText text="Things I've learned the hard way" /></h2>
      </div>
      <div className={styles.list}>
        {brief.map((n, i) => (
          <Link key={i} to={`/notes/${slugify(n.title)}`} className={styles.briefRow}>
            <div>
              <h3 className={styles.title}>{n.title}</h3>
              <p className={styles.hook}>{n.hook}</p>
            </div>
            <span className={styles.briefArrow}>→</span>
          </Link>
        ))}
      </div>
      <Link to="/notes" className={styles.viewAll}>
        View all {notes.length} notes →
      </Link>
    </div>
  );
}

export default NotesSection;

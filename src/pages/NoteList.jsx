import { Link } from 'react-router-dom';
import notes from '../resources/data/notes.json';
import { slugify } from '../lib/slug';
import p from './pages.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function NoteList() {
  return (
    <div className={p.page}>
      <Link to="/" className={p.back}><FontAwesomeIcon icon={faArrowLeft} /> Home</Link>
      <span className={p.kicker}>Engineering Notes</span>
      <h1 className={p.title}>Things I&apos;ve learned the hard way</h1>
      <p className={p.summary}>Short notes on backend engineering — mostly lessons from running systems in production.</p>
      <div className={p.list}>
        {notes.map((n, i) => (
          <Link key={i} to={`/notes/${slugify(n.title)}`} className={p.rowLink}>
            <div>
              <div className={p.rowTitle}>{n.title}</div>
              <div className={p.rowSummary}>{n.hook}</div>
            </div>
            <span className={p.arrow}>→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

import { useParams, Link } from 'react-router-dom';
import notes from '../resources/data/notes.json';
import { findBySlug } from '../lib/slug';
import p from './pages.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

export default function NoteDetail() {
  const { slug } = useParams();
  const item = findBySlug(notes, slug);

  if (!item) {
    return (
      <div className={p.page}>
        <Link to="/notes" className={p.back}><FontAwesomeIcon icon={faArrowLeft} /> All notes</Link>
        <h1 className={p.title}>Not found</h1>
        <p className={p.notFound}>That note doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div className={p.page}>
      <Link to="/notes" className={p.back}><FontAwesomeIcon icon={faArrowLeft} /> All notes</Link>
      <span className={p.kicker}>Engineering Note</span>
      <h1 className={p.title}>{item.title}</h1>
      <p className={p.summary}>{item.hook}</p>
      <p className={p.prose}>{item.body}</p>
      {item.url && (
        <div className={p.links}>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className={p.link}>
            <FontAwesomeIcon icon={faLinkedinIn} /> Read on LinkedIn
          </a>
        </div>
      )}
    </div>
  );
}

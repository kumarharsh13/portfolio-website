import { Link } from 'react-router-dom';
import cases from '../resources/data/caseStudies.json';
import { slugify } from '../lib/slug';
import p from './pages.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function CaseStudyList() {
  return (
    <div className={p.page}>
      <Link to="/" className={p.back}><FontAwesomeIcon icon={faArrowLeft} /> Home</Link>
      <span className={p.kicker}>Case Studies</span>
      <h1 className={p.title}>Systems I&apos;ve built</h1>
      <p className={p.summary}>Production backend systems I&apos;ve designed and scaled — each with the problem, the approach, and the measurable impact.</p>
      <div className={p.list}>
        {cases.map((c, i) => (
          <Link key={i} to={`/case-studies/${slugify(c.title)}`} className={p.rowLink}>
            <div>
              <div className={p.rowTitle}>{c.title}</div>
              <div className={p.rowSummary}>{c.summary}</div>
            </div>
            <span className={p.arrow}>→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

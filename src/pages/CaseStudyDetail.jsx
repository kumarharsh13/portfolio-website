import { useParams, Link } from 'react-router-dom';
import cases from '../resources/data/caseStudies.json';
import { findBySlug } from '../lib/slug';
import ArchDiagram from '../components/ui/ArchDiagram';
import CodeSnippet from '../components/ui/CodeSnippet';
import p from './pages.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const item = findBySlug(cases, slug);

  if (!item) {
    return (
      <div className={p.page}>
        <Link to="/case-studies" className={p.back}><FontAwesomeIcon icon={faArrowLeft} /> All case studies</Link>
        <h1 className={p.title}>Not found</h1>
        <p className={p.notFound}>That case study doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div className={p.page}>
      <Link to="/case-studies" className={p.back}><FontAwesomeIcon icon={faArrowLeft} /> All case studies</Link>
      <span className={p.kicker}>Case Study</span>
      <h1 className={p.title}>{item.title}</h1>
      <p className={p.summary}>{item.summary}</p>

      <div className={p.block}><span className={p.label}>Problem</span><p>{item.problem}</p></div>
      <div className={p.block}><span className={p.label}>Approach</span><p>{item.approach}</p></div>
      <div className={p.block}><span className={p.label}>Impact</span><p>{item.impact}</p></div>
      {item.diagram && (
        <div className={p.block}><span className={p.label}>Architecture</span><ArchDiagram nodes={item.diagram} /></div>
      )}
      {item.code && <CodeSnippet title={item.code.title} lines={item.code.lines} />}

      <div className={p.tags}>{item.tags.map((t) => <span key={t} className={p.tag}>{t}</span>)}</div>
      {item.links?.length > 0 && (
        <div className={p.links}>
          {item.links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className={p.link}>
              {l.label.toLowerCase() === 'code' ? <FontAwesomeIcon icon={faGithub} /> : null}
              {l.label} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CaseStudiesSection.module.css';
import cases from '../../resources/data/caseStudies.json';
import projects from '../../resources/data/projects.json';
import RevealText from '../ui/RevealText';
import { slugify } from '../../lib/slug';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function importAll(ctx) { const m = {}; ctx.keys().forEach((k) => { m[k.replace('./', '')] = ctx(k); }); return m; }
const projectImages = importAll(require.context('../../resources/images', false, /\.(png|jpe?g)$/));

function ProjectCard({ p }) {
  const thumb = projectImages[p.projectImage1];
  return (
    <div className={`${styles.projCard} spot-card`}>
      {thumb && <div className={styles.projThumb}><img src={thumb} alt={p.projectTitle} loading="lazy" /></div>}
      <div className={styles.projBody}>
        <h3 className={styles.projTitle}>{p.projectTitle}</h3>
        <p className={styles.projDesc}>{p.description}</p>
        <div className={styles.projTags}>
          {p.technologiesUsed.slice(0, 5).map((t) => <span key={t} className={styles.tag}>{t}</span>)}
        </div>
        <div className={styles.projLinks}>
          {p.projectURL && (
            <a href={p.projectURL} target="_blank" rel="noopener noreferrer" className={styles.link}>
              Live <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          )}
          {p.repoURL && (
            <a href={p.repoURL} target="_blank" rel="noopener noreferrer" className={styles.link}>
              <FontAwesomeIcon icon={faGithub} /> Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const FEATURED = ['Chhavi Anvaya', 'Food Ordering Website', 'Course Management System'];
const HOME_LIMIT = 4;

function CaseStudiesSection() {
  const [showMore, setShowMore] = useState(false);
  const featured = projects.filter((p) => FEATURED.includes(p.projectTitle));
  const rest = projects.filter((p) => !FEATURED.includes(p.projectTitle));
  const shown = showMore ? [...featured, ...rest] : featured;

  const briefCases = cases.slice(0, HOME_LIMIT);

  return (
    <div className={styles.section}>
      <div className={styles.headWrap}>
        <span className={styles.kicker}>Case Studies</span>
        <h2 className={styles.heading}><RevealText text="Systems I've built" /></h2>
      </div>

      <div className={styles.list}>
        {briefCases.map((c, i) => (
          <Link key={i} to={`/case-studies/${slugify(c.title)}`} className={styles.briefRow}>
            <div className={styles.headMain}>
              <h3 className={styles.title}>{c.title}</h3>
              <p className={styles.summary}>{c.summary}</p>
            </div>
            <span className={styles.briefArrow}>→</span>
          </Link>
        ))}
      </div>
      <Link to="/case-studies" className={styles.viewAll}>
        View all {cases.length} case studies <FontAwesomeIcon icon={faArrowRight} />
      </Link>

      <h3 className={styles.subheading}>Other Projects</h3>
      <div className={styles.projGrid}>
        {shown.map((p, i) => <ProjectCard key={i} p={p} />)}
      </div>
      {rest.length > 0 && (
        <button className={styles.showMore} onClick={() => setShowMore((s) => !s)}>
          {showMore ? 'Show less' : `Show ${rest.length} more`}
        </button>
      )}
    </div>
  );
}

export default CaseStudiesSection;

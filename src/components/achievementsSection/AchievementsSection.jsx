import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AchievementsSection.module.css';
import awards from '../../resources/data/awards.json';
import certificates from '../../resources/data/certificates.json';
import AppreciationGallery from '../awardsSection/AppreciationGallery';
import RevealText from '../ui/RevealText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faMedal, faAward, faStar } from '@fortawesome/free-solid-svg-icons';

const awardIcons = { trophy: faTrophy, medal: faMedal, award: faAward, star: faStar };

function importAll(ctx) { const m = {}; ctx.keys().forEach((k) => { m[k.replace('./', '')] = ctx(k); }); return m; }
const certImages = importAll(require.context('../../resources/certificates', false, /\.(png|jpe?g)$/));

function AchievementsSection() {
  const issuers = useMemo(() => ['All', ...Array.from(new Set(certificates.map((c) => c.organisation)))], []);
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const shownCerts = filter === 'All' ? certificates : certificates.filter((c) => c.organisation === filter);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className={styles.section}>
      <div className={styles.head}>
        <span className={styles.kicker}>Achievements</span>
        <h2 className={styles.heading}><RevealText text="Recognition & proof of work" /></h2>
      </div>

      <div className={styles.awards}>
        {awards.map((a, i) => (
          <div className={`${styles.awardCard} spot-card`} key={i}>
            <div className={styles.awardIcon}>
              <FontAwesomeIcon icon={awardIcons[a.icon] || faAward} />
              {a.count && <span className={styles.count}>{a.count}</span>}
            </div>
            <h3 className={styles.awardTitle}>{a.title}</h3>
            <span className={styles.awardIssuer}>{a.issuer}</span>
            <p className={styles.awardDesc}>{a.description}</p>
            <span className={styles.period}>{a.period}</span>
          </div>
        ))}
      </div>

      <AppreciationGallery />

      <h3 className={styles.subheading}>Certificates</h3>
      <div className={styles.filters}>
        {issuers.map((org) => {
          const count = org === 'All' ? certificates.length : certificates.filter((c) => c.organisation === org).length;
          return (
            <button key={org} className={`${styles.tab} ${filter === org ? styles.activeTab : ''}`} onClick={() => setFilter(org)}>
              {org}<span className={styles.badge}>{count}</span>
            </button>
          );
        })}
      </div>
      <motion.div layout className={styles.grid}>
        <AnimatePresence mode="popLayout">
          {shownCerts.map((cert) => (
            <motion.button
              layout key={cert.certificateImage}
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }} className={`${styles.certCard} spot-card`} onClick={() => setSelected(cert)}
            >
              <div className={styles.thumb}><img src={certImages[cert.certificateImage]} alt={cert.certificateTitle} loading="lazy" /></div>
              <div className={styles.certInfo}>
                <h4 className={styles.certTitle}>{cert.certificateTitle}</h4>
                <h5 className={styles.certOrg}>{cert.organisation}</h5>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {selected && (
        <div className={styles.lightbox} onClick={() => setSelected(null)}>
          <div className={styles.lightInner} onClick={(e) => e.stopPropagation()}>
            <img src={certImages[selected.certificateImage]} alt={selected.certificateTitle} />
            <div className={styles.caption}><strong>{selected.certificateTitle}</strong><span>{selected.organisation}</span></div>
          </div>
          <button className={styles.close} onClick={() => setSelected(null)} aria-label="Close">×</button>
        </div>
      )}
    </div>
  );
}

export default AchievementsSection;

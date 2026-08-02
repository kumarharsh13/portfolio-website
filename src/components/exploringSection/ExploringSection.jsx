import styles from './ExploringSection.module.css';
import items from '../../resources/data/exploring.json';
import RevealText from '../ui/RevealText';

function ExploringSection() {
  return (
    <div className={styles.section}>
      <div className={styles.head}>
        <span className={styles.kicker}>Currently Exploring</span>
        <h2 className={styles.heading}><RevealText text="What has my attention right now" /></h2>
      </div>
      <div className={styles.grid}>
        {items.map((it, i) => (
          <div className={`${styles.card} spot-card`} key={i}>
            <span className={styles.dot} />
            <h3 className={styles.label}>{it.label}</h3>
            <p className={styles.note}>{it.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExploringSection;

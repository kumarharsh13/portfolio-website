import styles from './ThinkSection.module.css';
import RevealText from '../ui/RevealText';

const PRINCIPLES = [
  {
    title: 'Understand before building',
    body: 'I read the system first — trace the data, find the failure modes, learn why it works — before I write a line. Most bugs are decisions made without context.',
  },
  {
    title: 'Optimize for the next engineer',
    body: 'Maintainable, idempotent, observable beats clever. Code is read far more than it is written, so I write for the person who debugs it at 2am — often future me.',
  },
  {
    title: 'Design for failure and scale',
    body: 'At millions of operations a day, things fail. I lean on async workers, partitioning, retries, and idempotency so the system recovers on its own instead of paging a human.',
  },
  {
    title: 'Teach what you learn',
    body: 'Explaining a system is how you find the gaps in your own understanding. Mentoring and writing make me a better engineer, and a team that understands the system ships faster.',
  },
];

function ThinkSection() {
  return (
    <div className={styles.section}>
      <div className={styles.head}>
        <span className={styles.kicker}>How I Think</span>
        <h2 className={styles.title}><RevealText text="Principles I build by" /></h2>
      </div>
      <div className={styles.grid}>
        {PRINCIPLES.map((p, i) => (
          <article className={`${styles.card} spot-card`} key={i}>
            <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
            <h3 className={styles.cardTitle}>{p.title}</h3>
            <p className={styles.body}>{p.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ThinkSection;

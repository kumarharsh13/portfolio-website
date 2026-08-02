import { motion } from 'framer-motion';
import styles from './ArchDiagram.module.css';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const node = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

// A light hairline flow diagram: [node] → [node] → …
export default function ArchDiagram({ nodes }) {
  return (
    <motion.div
      className={styles.diagram}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      aria-hidden="true"
    >
      {nodes.map((n, i) => (
        <div className={styles.step} key={i}>
          <motion.div className={styles.node} variants={node}>
            <span className={styles.label}>{n.label}</span>
            {n.sub && <span className={styles.sub}>{n.sub}</span>}
          </motion.div>
          {i < nodes.length - 1 && <motion.span className={styles.arrow} variants={node}>→</motion.span>}
        </div>
      ))}
    </motion.div>
  );
}

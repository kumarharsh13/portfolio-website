import { motion } from 'framer-motion';
import styles from './CodeSnippet.module.css';

const COLORS = { comment: '#6a6a78', str: '#9ece6a', kw: '#8a82fb', num: '#e0af68' };
const RE = /(`[^`]*`|'[^']*'|"[^"]*")|(\/\/[^\n]*|#[^\n]*)|\b(const|let|var|async|await|function|return|if|unless|else|elsif|for|of|in|new|try|catch|throw|export|default|def|end|do|then|module|class|require|nil|true|false)\b|\b(\d[\d_.]*)\b/g;

function highlight(line) {
  const out = [];
  let last = 0, m, k = 0;
  while ((m = RE.exec(line)) !== null) {
    if (m.index > last) out.push(line.slice(last, m.index));
    const color = m[1] ? COLORS.str : m[2] ? COLORS.comment : m[3] ? COLORS.kw : COLORS.num;
    out.push(<span key={k++} style={{ color }}>{m[0]}</span>);
    last = m.index + m[0].length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

const codeContainer = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const codeLine = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

export default function CodeSnippet({ title, lines }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.bar}>
        <span className={styles.d} /><span className={styles.d} /><span className={styles.d} />
        {title && <span className={styles.title}>{title}</span>}
      </div>
      <pre className={styles.pre}>
        <motion.code
          className={styles.code}
          variants={codeContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {lines.map((l, i) => (
            <motion.span key={i} className={styles.line} variants={codeLine}>
              {l ? highlight(l) : ' '}
            </motion.span>
          ))}
        </motion.code>
      </pre>
    </div>
  );
}

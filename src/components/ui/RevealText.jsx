import { Fragment } from 'react';
import { motion } from 'framer-motion';

// Word-by-word mask reveal for headings, triggered when scrolled into view.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};
const word = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function RevealText({ text, className }) {
  const words = String(text).split(' ');
  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          {/* Clip wrapper — masks the word until it rises into place. */}
          <span
            aria-hidden="true"
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.12em', marginBottom: '-0.12em' }}
          >
            <motion.span variants={word} style={{ display: 'inline-block' }}>{w}</motion.span>
          </span>
          {/* Real breaking space between words (outside the clip). */}
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </motion.span>
  );
}

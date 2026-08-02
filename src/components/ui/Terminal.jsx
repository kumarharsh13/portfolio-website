import { useEffect, useRef, useState } from 'react';
import styles from './Terminal.module.css';
import Resume from '../../resources/resume/Harsh Kumar Resume.pdf';

const RESPONSES = {
  help: "Commands: whoami · skills · experience · projects · notes · learning · contact · resume · clear",
  whoami: 'Harsh Kumar — Senior Backend Engineer @ YABX (Comviva). Distributed financial systems, millions of ops/day.',
  skills: 'Ruby · Rails · Node.js · Express · PostgreSQL · MongoDB · Redis · RabbitMQ · Sidekiq · Python · Git',
  experience: 'YABX (Comviva): Intern (via Comviva) → Software Engineer → Senior Software Engineer, 2023–present.',
  projects: 'Job Orchestration (12M jobs/day) · Reconciliation (300K txns/day) · Multi-Bank Proxy · Credit-Rule Engine · Bulk Ingestion · Consent Platform. Full write-ups on the Case Studies page.',
  notes: 'Backend notes: idempotency, indexing, partitioning, EXPLAIN ANALYZE, locking, cardinality. See the Engineering Notes page.',
  learning: 'Distributed systems, system design depth, AI in engineering, and a steady diet of technical + self-help reading.',
  contact: 'kr.harsh13@gmail.com · linkedin.com/in/kumarharsh13 · github.com/kumarharsh13',
  sudo: 'Nice try. 😏',
  ls: 'whoami  skills  experience  projects  notes  learning  contact  resume',
};

export default function Terminal() {
  const [history, setHistory] = useState([
    { cmd: '', out: "Type 'help' to see what I can do." },
  ]);
  const [value, setValue] = useState('');
  const bodyRef = useRef(null);

  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [history]);

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === 'clear') { setHistory([]); return; }
    if (cmd === 'resume') {
      window.open(Resume, '_blank');
      setHistory((h) => [...h, { cmd, out: 'Opening resume…' }]);
      return;
    }
    const out = RESPONSES[cmd] || `command not found: ${cmd} (try 'help')`;
    setHistory((h) => [...h, { cmd, out }]);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') { run(value); setValue(''); }
  };

  return (
    <div className={styles.terminal}>
      <div className={styles.bar}>
        <span className={styles.dotR} /><span className={styles.dotY} /><span className={styles.dotG} />
        <span className={styles.name}>harsh@portfolio</span>
      </div>
      <div className={styles.body} ref={bodyRef}>
        {history.map((h, i) => (
          <div key={i}>
            {h.cmd ? <div className={styles.cmdLine}><span className={styles.prompt}>$</span> {h.cmd}</div> : null}
            <div className={styles.out}>{h.out}</div>
          </div>
        ))}
        <div className={styles.inputLine}>
          <span className={styles.prompt}>$</span>
          <input
            className={styles.input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck="false"
            autoComplete="off"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  );
}

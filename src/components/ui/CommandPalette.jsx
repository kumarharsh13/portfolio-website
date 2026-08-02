import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './CommandPalette.module.css';
import SECTIONS from '../../config/sections';
import Resume from '../../resources/resume/Harsh Kumar Resume.pdf';

const EMAIL = 'kr.harsh13@gmail.com';

export default function CommandPalette({ open, onClose }) {
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const commands = useMemo(() => {
    // Scroll to a home section — navigate home first if we're on another route.
    const goSection = (id) => {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 120);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    const nav = SECTIONS.map((s) => ({ label: `Go to ${s.label}`, run: () => goSection(s.id) }));
    const pages = [
      { label: 'View all Case Studies', run: () => navigate('/case-studies') },
      { label: 'View all Engineering Notes', run: () => navigate('/notes') },
    ];
    const actions = [
      { label: 'Open Resume', run: () => window.open(Resume, '_blank') },
      { label: 'Email me', run: () => { window.location.href = `mailto:${EMAIL}`; } },
      { label: 'Copy email', run: () => navigator.clipboard?.writeText(EMAIL) },
      { label: 'GitHub', run: () => window.open('https://github.com/kumarharsh13', '_blank') },
      { label: 'LinkedIn', run: () => window.open('https://in.linkedin.com/in/kumarharsh13', '_blank') },
    ];
    return [...nav, ...pages, ...actions];
  }, [navigate, location.pathname]);

  const filtered = useMemo(
    () => commands.filter((c) => c.label.toLowerCase().includes(q.toLowerCase())),
    [commands, q]
  );

  useEffect(() => { if (open) { setQ(''); setIdx(0); setTimeout(() => inputRef.current?.focus(), 20); } }, [open]);
  useEffect(() => { setIdx(0); }, [q]);

  // Global Escape so closing works even before the input has focus.
  useEffect(() => {
    if (!open) return undefined;
    const onEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); const c = filtered[idx]; if (c) { c.run(); onClose(); } }
    else if (e.key === 'Escape') { onClose(); }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className={styles.input}
          placeholder="Type a command or search…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <ul className={styles.list}>
          {filtered.length === 0 && <li className={styles.empty}>No results</li>}
          {filtered.map((c, i) => (
            <li
              key={c.label}
              className={`${styles.item} ${i === idx ? styles.active : ''}`}
              onMouseEnter={() => setIdx(i)}
              onClick={() => { c.run(); onClose(); }}
            >
              {c.label}
            </li>
          ))}
        </ul>
        <div className={styles.hint}>↑↓ navigate · ↵ select · esc close</div>
      </div>
    </div>
  );
}

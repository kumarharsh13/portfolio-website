import { useEffect, useState } from 'react';
import styles from './Loader.module.css';

export default function Loader() {
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let removeTimer;
    const finish = () => {
      setHide(true);
      removeTimer = setTimeout(() => setGone(true), 600);
    };

    let startTimer;
    if (document.readyState === 'complete') {
      startTimer = setTimeout(finish, 500);
    } else {
      window.addEventListener('load', finish);
    }
    return () => {
      clearTimeout(startTimer);
      clearTimeout(removeTimer);
      window.removeEventListener('load', finish);
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`${styles.loader} ${hide ? styles.hide : ''}`}>
      <div className={styles.ring} />
      <span className={styles.mark}>HK</span>
    </div>
  );
}

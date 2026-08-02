import { lazy } from 'react';
import styles from './LandingSection.module.css';
import CanvasScene from '../three/CanvasScene';
import TechMarquee from '../ui/TechMarquee';
import Terminal from '../ui/Terminal';
import RevealText from '../ui/RevealText';

import Yoga from '../../resources/images/Yoga.png';
import Javascript from '../../resources/icons/javascript.png';
import NodeJS from '../../resources/icons/nodejs.png';
import ReactJs from '../../resources/icons/reactjs.png';
import Python from '../../resources/icons/python.png';
import Ruby from '../../resources/icons/ruby.png';
import Rails from '../../resources/icons/rails.png';
import MySql from '../../resources/icons/mysql.png';
import Posgresql from '../../resources/icons/posgressql.png';
import GitHub from '../../resources/icons/github.png';
import MongoDB from '../../resources/icons/MongoDB.png';
import Redis from '../../resources/icons/Redis.png';
import Sidekiq from '../../resources/icons/Sidekiq.png';
import Postman from '../../resources/icons/Postman.png';

// Backend-first stack (React kept for full-stack). HTML/CSS/C++/Photoshop dropped.
const techIcons = [Ruby, Rails, NodeJS, Javascript, Python, Posgresql, MySql, MongoDB, Redis, Sidekiq, Postman, ReactJs, GitHub];
const AtomScene = lazy(() => import('../three/AtomScene'));

function LandingSection() {
  return (
    <div className={styles.landing}>
      <div className={styles.top}>
        <div className={styles.intro}>
          <span className={styles.kicker}>Senior Backend Engineer</span>
          <h1 className={styles.name}><RevealText text="Harsh Kumar" /></h1>
          <p className={styles.positioning}>
            Senior Backend Engineer with 3+ years designing and scaling distributed financial
            systems that handle millions of operations a day — asynchronous processing platforms,
            request-routing systems, and high-throughput services. I care about understanding how
            systems work, writing software that stays maintainable, and mentoring the people around me.
          </p>
          <div className={styles.terminalWrap}><Terminal /></div>
        </div>

        <div className={styles.atomWrap}>
          <CanvasScene fallback={<div className={styles.atomFallback} />} camera={{ position: [0, 0, 13.5], fov: 45 }}>
            <AtomScene nucleus={Yoga} icons={techIcons} />
          </CanvasScene>
        </div>
      </div>

      <TechMarquee />
    </div>
  );
}

export default LandingSection;

import { lazy } from 'react';
import styles from './HeroSection.module.css';
import TypeWriter from 'typewriter-effect';
import CanvasScene from '../three/CanvasScene';
import Resume from '../../resources/resume/Harsh Kumar Resume.pdf';

import Yoga from '../../resources/images/Yoga.png';
import Html from '../../resources/icons/html.png';
import Css from '../../resources/icons/css.png';
import Javascript from '../../resources/icons/javascript.png';
import NodeJS from '../../resources/icons/nodejs.png';
import ReactJs from '../../resources/icons/reactjs.png';
import Python from '../../resources/icons/python.png';
import Cpp from '../../resources/icons/cpp.png';
import Ruby from '../../resources/icons/ruby.png';
import Rails from '../../resources/icons/rails.png';
import MySql from '../../resources/icons/mysql.png';
import Posgresql from '../../resources/icons/posgressql.png';
import GitHub from '../../resources/icons/github.png';
import Photoshop from '../../resources/icons/photoshop.png';

const techIcons = [Html, Css, Javascript, NodeJS, ReactJs, Python, Cpp, Ruby, Rails, MySql, Posgresql, GitHub, Photoshop];

const AtomScene = lazy(() => import('../three/AtomScene'));

function FallbackAtom() {
  return (
    <div className={styles.fallbackAtom}>
      <img src={Yoga} alt="" className={styles.fallbackYoga} />
      <div className={styles.fallbackIcons}>
        {techIcons.map((src, i) => (
          <img key={i} src={src} alt="" className={styles.fallbackIcon} />
        ))}
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <div className={styles.heroSection} id="home">
      <div className={styles.intro}>
        <h5 className={styles.greeting}>Hi 👋🏻 Myself</h5>
        <h1 className={styles.name}>HARSH KUMAR</h1>
        <h3 className={styles.roles}>
          <TypeWriter
            options={{
              strings: ['Senior Software Engineer', 'Observer', 'Thinker', 'Enthusiast'],
              autoStart: true, loop: true, delay: 60, deleteSpeed: 10,
            }}
          />
        </h3>
        <div className={styles.ctaRow}>
          <a href={Resume} download="Harsh Kumar Resume.pdf">
            <button className={styles.primaryBtn}>View Resume</button>
          </a>
          <a href="mailto:kr.harsh13@gmail.com">
            <button className={styles.ghostBtn}>Hire Me</button>
          </a>
        </div>
      </div>

      <div className={styles.atomWrap}>
        <CanvasScene
          fallback={<FallbackAtom />}
          camera={{ position: [0, 0, 13.5], fov: 45 }}
        >
          <AtomScene nucleus={Yoga} icons={techIcons} />
        </CanvasScene>
      </div>
    </div>
  );
}

export default HeroSection;

import { lazy } from 'react';
import styles from './TechnologyContainer.module.css';
import CanvasScene from '../three/CanvasScene';

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

const icons = [Html, Css, Javascript, NodeJS, ReactJs, Python, Cpp, Ruby, Rails, MySql, Posgresql, GitHub, Photoshop];

const TechCloud = lazy(() => import('../three/TechCloud'));

function FallbackGrid() {
  return (
    <div className={styles.grid}>
      {icons.map((src, i) => (
        <img key={i} src={src} alt="" className={styles.gridIcon} />
      ))}
    </div>
  );
}

function TechnologyContainer() {
  return (
    <div className={styles.techBand}>
      <h1 className={styles.heading}>Tech Stack</h1>
      <div className={styles.cloudWrap}>
        {/*
          CanvasScene itself returns `fallback` (unwrapped) whenever the
          user prefers reduced motion OR (disableOnMobile && isMobile).
          That already covers both "no 3D" cases, so we must NOT also
          render a second, always-mounted grid next to it — doing so
          would show two grids stacked on small screens. Relying solely
          on this single fallback keeps exactly one grid visible in
          every state.
        */}
        <CanvasScene
          fallback={<FallbackGrid />}
          disableOnMobile
          camera={{ position: [0, 0, 7], fov: 45 }}
        >
          <TechCloud icons={icons} />
        </CanvasScene>
      </div>
    </div>
  );
}

export default TechnologyContainer;

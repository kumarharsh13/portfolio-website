import { lazy, useState } from 'react';
import projects from '../../resources/data/projects.json';
import styles from './ProjectSection.module.css';
import CanvasScene from '../three/CanvasScene';
import ProjectModal from './ProjectModal';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

import ChhaviAnvaya1 from '../../resources/images/ChhaviAnvaya1.png';
import FoodOrderingWebsite1 from '../../resources/images/FoodOrderingWebsite1.png';
import YogaAasan1 from '../../resources/images/YogaAasan1.png';
import CourseManagementSystem1 from '../../resources/images/CourseManagementSystem1.png';
import AddToBasket1 from '../../resources/images/AddToBasket1.png';
import NQueenPuzzleGame1 from '../../resources/images/NQueenPuzzleGame1.png';
import PortfolioWebsite1 from '../../resources/images/PortfolioWebsite1.png';

const images = {
  'ChhaviAnvaya1.png': ChhaviAnvaya1,
  'FoodOrderingWebsite1.png': FoodOrderingWebsite1,
  'YogaAasan1.png': YogaAasan1,
  'CourseManagementSystem1.png': CourseManagementSystem1,
  'AddToBasket1.png': AddToBasket1,
  'NQueenPuzzleGame1.png': NQueenPuzzleGame1,
  'PortfolioWebsite1.png': PortfolioWebsite1,
};

const ProjectGallery3D = lazy(() => import('../three/ProjectGallery3D'));

function ProjectSection() {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const reduced = usePrefersReducedMotion();

  const orderedImages = projects.map((p) => images[p.projectImage1]);
  const prev = () => setActive((a) => Math.max(0, a - 1));
  const next = () => setActive((a) => Math.min(projects.length - 1, a + 1));

  return (
    <div className={styles.projectSection} id="projects">
      <h1 className={styles.heading}>Projects</h1>

      <div className={styles.stage}>
        <CanvasScene
          fallback={
            <FallbackGrid
              projects={projects}
              images={images}
              onSelect={setSelected}
            />
          }
          camera={{ position: [0, 0, 7], fov: 45 }}
        >
          <ProjectGallery3D
            images={orderedImages}
            active={active}
            onSelect={() => setSelected(projects[active])}
            onFocus={setActive}
          />
        </CanvasScene>
      </div>

      {!reduced && (
        <>
          <div className={styles.controls}>
            <button onClick={prev} disabled={active === 0} className={styles.navBtn} aria-label="Previous project">‹</button>
            <span className={styles.activeTitle}>{projects[active].projectTitle}</span>
            <button onClick={next} disabled={active === projects.length - 1} className={styles.navBtn} aria-label="Next project">›</button>
          </div>
          <button className={styles.detailsBtn} onClick={() => setSelected(projects[active])}>
            View Details
          </button>
        </>
      )}

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function FallbackGrid({ projects, images, onSelect }) {
  return (
    <div className={styles.grid}>
      {projects.map((p, i) => (
        <button key={i} className={styles.gridCard} onClick={() => onSelect(p)}>
          <img src={images[p.projectImage1]} alt={p.projectTitle} />
          <span>{p.projectTitle}</span>
        </button>
      ))}
    </div>
  );
}

export default ProjectSection;

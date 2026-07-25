import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ProjectModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUpRightFromSquare, faXmark } from '@fortawesome/free-solid-svg-icons';

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close">
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2 className={styles.title}>{project.projectTitle}</h2>
        <p className={styles.desc}>{project.description}</p>
        <div className={styles.tags}>
          {project.technologiesUsed.map((t, i) => (
            <span key={i} className={styles.tag}>{t}</span>
          ))}
        </div>
        <div className={styles.links}>
          {project.projectURL && (
            <a href={project.projectURL} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
              <FontAwesomeIcon icon={faUpRightFromSquare} />&nbsp; Live
            </a>
          )}
          {project.repoURL && (
            <a href={project.repoURL} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
              <FontAwesomeIcon icon={faGithub} />&nbsp; Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

ProjectModal.propTypes = {
  project: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProjectModal;

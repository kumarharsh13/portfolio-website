import projects from "../../resources/data/projects.json";
import styles from "../projectSection/ProjectSection.module.css";
import Marquee from "react-fast-marquee";

import { useState } from "react";
import ProjectModal from "./ProjectModal";

import FoodOrderingWebsiteImage1 from "../../resources/images/FoodOrderingWebsite1.png";
import YogaAasanImage1 from "../../resources/images/YogaAasan1.png";
import CourseManagementSystemImage1 from "../../resources/images/CourseManagementSystem1.png";
import AddToBasketImage1 from "../../resources/images/AddToBasket1.png";
import NQueenPuzzleGameImage1 from "../../resources/images/NQueenPuzzleGame1.png";
import PortfolioWebsite1 from "../../resources/images/PortfolioWebsite1.png"

const images = {
  "FoodOrderingWebsite1.png": FoodOrderingWebsiteImage1,
  "YogaAasan1.png": YogaAasanImage1,
  "CourseManagementSystem1.png": CourseManagementSystemImage1,
  "AddToBasket1.png": AddToBasketImage1,
  "NQueenPuzzleGame1.png": NQueenPuzzleGameImage1,
  "PortfolioWebsite1.png": PortfolioWebsite1,
};

function ProjectSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className={styles.projectSection} id="projects">
      <h1>Projects</h1>
      <Marquee speed={120} pauseOnHover={true} direction="left" autoFill={true}>
        {projects.map((project, index) => (
          <DataCard
            project={project}
            key={index}
            onClickReadMore={() => handleSelectProject(project)}
          />
        ))}
      </Marquee>

      {/* Render the modal conditionally */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </div>
  );
}

function DataCard({ project, onClickReadMore }) {
  const imageSrc = images[project.projectImage1] || null;

  return (
    <div className={styles.projectCard}>
      <div className={styles.projectInner}>
        {/* Front of the Card */}
        <div className={styles.projectFront}>
          <div className={styles.projectImage}>
            <img src={imageSrc} alt={project.projectTitle} />
          </div>
          <div className={styles.nameDescription}>
            <h2 className={styles.name}>{project.projectTitle}</h2>
            <p className={styles.description}>{project.description}</p>
          </div>
        </div>

        {/* Back of the Card */}
        <div className={styles.projectBack}>
          <button
            className={styles.readMoreBtn}
            onClick={() => onClickReadMore(project)}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProjectSection;

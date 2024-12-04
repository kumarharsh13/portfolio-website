import styles from "../projectSection/ProjectModal.module.css";
import FoodOrderingWebsiteImage1 from "../../resources/images/FoodOrderingWebsite1.png";
import FoodOrderingWebsiteImage2 from "../../resources/images/FoodOrderingWebsite2.png";
import YogaAasanImage1 from "../../resources/images/YogaAasan1.png";
import YogaAasanImage2 from "../../resources/images/YogaAasan2.png";
import CourseManagementSystemImage1 from "../../resources/images/CourseManagementSystem1.png";
import CourseManagementSystemImage2 from "../../resources/images/CourseManagementSystem2.png";
import AddToBasketImage1 from "../../resources/images/AddToBasket1.png";
import AddToBasketImage2 from "../../resources/images/AddToBasket2.png";
import NQueenPuzzleGameImage1 from "../../resources/images/NQueenPuzzleGame1.png";
import NQueenPuzzleGameImage2 from "../../resources/images/NQueenPuzzleGame2.png";

const images = {
  "FoodOrderingWebsite1.png": FoodOrderingWebsiteImage1,
  "FoodOrderingWebsite2.png": FoodOrderingWebsiteImage2,
  "YogaAasan1.png": YogaAasanImage1,
  "YogaAasan2.png": YogaAasanImage2,
  "CourseManagementSystem1.png": CourseManagementSystemImage1,
  "CourseManagementSystem2.png": CourseManagementSystemImage2,
  "AddToBasket1.png": AddToBasketImage1,
  "AddToBasket2.png": AddToBasketImage2,
  "NQueenPuzzleGame1.png": NQueenPuzzleGameImage1,
  "NQueenPuzzleGame2.png": NQueenPuzzleGameImage2,
};

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const imageSrc1 = images[project.projectImage1] || null;
  const imageSrc2 = images[project.projectImage2] || null;

  return (
    <div className={styles.projectModal} onClick={onClose}>
      <div className={styles.projectModalContant}>
        <div className={styles.projectImages}>
          <img src={imageSrc1} alt="" />
          <img src={imageSrc2} alt="" />
        </div>
        <div className={styles.nameSkills}>
          <h3 className={styles.name}>{project.projectTitle}</h3>
          <p>{project.technologiesUsed.map((skills) => {
						<button className={styles.skills}>{skills}</button>
					})}</p>
        </div>
        <div className={styles.description}>
          <p>{project.description}</p>
        </div>
				<div className={styles.buttons}>
					<a href={project.projectURL || "#"} target="_blank" rel="noopener noreferrer">
						<button 
							disabled={!project.projectURL} 
							className={project.projectURL ? "" : styles.disabledButton}>
							Live Demo
						</button>
					</a>
					<a href={project.repoURL || "#"} target="_blank" rel="noopener noreferrer">
						<button 
							disabled={!project.repoURL} 
							className={project.repoURL ? "" : styles.disabledButton}>
							View Code
						</button>
					</a>
				</div>
				<button className={styles.closeButton}>❌</button>
			</div>
    </div>
  );
}

export default ProjectModal;

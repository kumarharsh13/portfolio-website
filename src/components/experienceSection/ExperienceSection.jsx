import styles from './ExperienceSection.module.css';
import careerData from '../../resources/data/career.json';
import educationData from '../../resources/data/education.json';
import InfoCard from '../aboutSection/InfoCard';
import RevealText from '../ui/RevealText';
import workingImg from '../../resources/images/Working.svg';
import studyingImg from '../../resources/images/Studying.svg';

function ExperienceSection() {
  return (
    <div className={styles.section}>
      <h1 className={styles.heading}><RevealText text="Experience" /></h1>
      <div className={styles.block}>
        <img src={workingImg} alt="" aria-hidden="true" className={styles.image} />
        <div className={styles.details}>
          <InfoCard items={careerData} />
        </div>
      </div>
      <div className={styles.eduBlock}>
        <h2 className={styles.subheading}>Education</h2>
        <div className={styles.eduRow}>
          <div className={styles.eduDetails}>
            <InfoCard items={educationData} />
          </div>
          <img src={studyingImg} alt="" aria-hidden="true" className={styles.eduImage} />
        </div>
      </div>
    </div>
  );
}

export default ExperienceSection;

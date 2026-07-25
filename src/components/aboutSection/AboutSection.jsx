import styles from './AboutSection.module.css';
import careerData from '../../resources/data/career.json';
import educationData from '../../resources/data/education.json';
import InfoCard from './InfoCard';
import studyingImg from '../../resources/images/Studying.svg';
import workingImg from '../../resources/images/Working.svg';

function AboutSection() {
  return (
    <div className={styles.aboutSection} id="about">
      <h1 className={styles.heading}>About</h1>
      <div className={styles.expBlock}>
        <img src={workingImg} alt="" aria-hidden="true" className={styles.balanceImg} />
        <div className={styles.expDetails}>
          <InfoCard title="Experience" items={careerData} />
        </div>
      </div>
      <div className={styles.eduBlock}>
        <div className={styles.eduDetails}>
          <InfoCard title="Education" items={educationData} />
        </div>
        <img src={studyingImg} alt="" aria-hidden="true" className={styles.balanceImg} />
      </div>
    </div>
  );
}

export default AboutSection;

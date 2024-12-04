import styles from "../aboutSection/InfoCard.module.css";
import careerData from "../../resources/data/career.json";
import educationData from "../../resources/data/education.json";
import careerImage from "../../resources/images/Working.svg"

import InfoCard from "./InfoCard";

function AboutSection() {
  return (
    <div className={styles.aboutSection}>
      <div>
        <InfoCard infoCardDetails={careerData} infoImage={careerImage} />
      </div>
      <div>
        <InfoCard infoCardDetails={educationData} infoImage={careerImage} flexDirection="row-reverse"/>
      </div>
    </div>
  );
}

export default AboutSection;

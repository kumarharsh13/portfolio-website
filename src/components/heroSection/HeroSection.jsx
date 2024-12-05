import { motion } from "framer-motion";
import styles from "../heroSection/HeroSection.module.css";

import Yoga from "../../resources/images/Yoga.png";
import TechnologyContainer from "./TechnologyContainer";
import TypeWriter from 'typewriter-effect';

function HeroSection() {
  return (
    <div className={styles.heroSection}>
      <div className={styles.intro}>
        <p><h5>Hi 👋🏻 Myself</h5><h1>HARSH KUMAR</h1></p>
        <h3><TypeWriter options={{strings: ['Software Engineer', 'Observer', 'Thinker', 'Enthusiast'], autoStart: true, loop: true, delay: 60, deleteSpeed: 10}} /></h3>
        <a href="../../resources/pdf/Harsh Kumar Resume.pdf" download="Harsh Kumar Resume.pdf"><button className={styles.resume}>View Resume</button></a>
      </div>
      <div className={styles.techSkills}>
        <TechnologyContainer />
        <div className={styles.yogaMan}>
          <motion.img
            src={Yoga}
            alt="YogaMan"
            className={styles.yogaManImage}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            whileInView={{
              y: [0, -20, 0],
              transition: {
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;

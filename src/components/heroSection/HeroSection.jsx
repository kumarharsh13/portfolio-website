import { motion } from "framer-motion";
import styles from "../heroSection/HeroSection.module.css"

import Yoga from "../../resources/images/Yoga.png";
import TechnologyContainer from "./TechnologyContainer";

function HeroSection() {
	return (
		<div className={styles.heroSection}>
			<TechnologyContainer className={styles.techContainer}/>
			<div className={styles.yogaMan}>
				<motion.img src={Yoga} alt="YogaMan" className={styles.yogaManImage} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: 'easeInOut'}} whileInView={{ y: [0, -20, 0], transition: {
					duration: 2, ease: 'easeInOut', repeat: Infinity
				}}}/>
			</div>
		</div>
	)
}

export default HeroSection
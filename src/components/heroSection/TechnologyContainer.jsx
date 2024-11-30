import { motion } from "framer-motion";
import styles from "../heroSection/HeroSection.module.css"

import Html from "../../resources/icons/html.png"
import Css from "../../resources/icons/css.png"
import Javascript from "../../resources/icons/javascript.png"
import NodeJS from "../../resources/icons/nodejs.png"
import ReactJs from "../../resources/icons/reactjs.png"
import Python from "../../resources/icons/python.png"
import Cpp from "../../resources/icons/cpp.png"
import Ruby from "../../resources/icons/ruby.png"
import Rails from "../../resources/icons/rails.png"
import MySql from "../../resources/icons/mysql.png"
import Posgresql from "../../resources/icons/posgressql.png"
import GitHub from "../../resources/icons/github.png"
import Photoshop from "../../resources/icons/photoshop.png"

function TechnologyContainer() {
	return (
		<div className={styles.techContainer}>
			<div className={styles.htmlStyle}>
				<motion.img src={Html} alt="Html" className={styles.htmlIcon} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: 'easeInOut'}} whileInView={{ y: [0, -10, 0], transition: {
						duration: 2, ease: 'easeInOut', repeat: Infinity
					}}}/>
			</div>
			<div className={styles.cssStyle}>
				<motion.img src={Css} alt="Css" className={styles.cssIcon} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: 'easeInOut'}} whileInView={{ y: [0, -10, 0], transition: {
						duration: 2, ease: 'easeInOut', repeat: Infinity
					}}}/>
			</div>
			<div className={styles.javascriptStyle}>
				<motion.img src={Javascript} alt="Javascript" className={styles.javascriptIcon} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: 'easeInOut'}} whileInView={{ y: [0, -10, 0], transition: {
						duration: 2, ease: 'easeInOut', repeat: Infinity
					}}}/>
			</div>
			<div className={styles.nodejsStyle}>
				<motion.img src={NodeJS} alt="NodeJS" className={styles.nodejslIcon} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: 'easeInOut'}} whileInView={{ y: [0, -10, 0], transition: {
						duration: 2, ease: 'easeInOut', repeat: Infinity
					}}}/>
			</div>
			<div className={styles.reactjsStyle}>
				<motion.img src={ReactJs} alt="ReactJs" className={styles.reactjsIcon} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: 'easeInOut'}} whileInView={{ y: [0, -10, 0], transition: {
						duration: 2, ease: 'easeInOut', repeat: Infinity
					}}}/>
			</div>
			<div className={styles.cppStyle}>
				<motion.img src={Cpp} alt="cpp" className={styles.cppIcon} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: 'easeInOut'}} whileInView={{ y: [0, -10, 0], transition: {
						duration: 2, ease: 'easeInOut', repeat: Infinity
					}}}/>
			</div>
			<div className={styles.pythonStyle}>
				<motion.img src={Python} alt="ReactJs" className={styles.pythonIcon} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: 'easeInOut'}} whileInView={{ y: [0, -10, 0], transition: {
						duration: 2, ease: 'easeInOut', repeat: Infinity
					}}}/>
			</div>
			<div className={styles.rubyStyle}>
				<motion.img src={Ruby} alt="ReactJs" className={styles.rubyIcon} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: 'easeInOut'}} whileInView={{ y: [0, -10, 0], transition: {
						duration: 2, ease: 'easeInOut', repeat: Infinity
					}}}/>
			</div>
			<div className={styles.railsStyle}>
				<motion.img src={Rails} alt="ReactJs" className={styles.railsIcon} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: 'easeInOut'}} whileInView={{ y: [0, -10, 0], transition: {
						duration: 2, ease: 'easeInOut', repeat: Infinity
					}}}/>
			</div>
			<div className={styles.mysqlStyle}>
				<motion.img src={MySql} alt="ReactJs" className={styles.mysqlIcon} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: 'easeInOut'}} whileInView={{ y: [0, -10, 0], transition: {
						duration: 2, ease: 'easeInOut', repeat: Infinity
					}}}/>
			</div>
			<div className={styles.posgresqlStyle}>
				<motion.img src={Posgresql} alt="ReactJs" className={styles.posgresqlIcon} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: 'easeInOut'}} whileInView={{ y: [0, -10, 0], transition: {
						duration: 2, ease: 'easeInOut', repeat: Infinity
					}}}/>
			</div>
			<div className={styles.githubStyle}>
				<motion.img src={GitHub} alt="ReactJs" className={styles.githubIcon} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: 'easeInOut'}} whileInView={{ y: [0, -10, 0], transition: {
						duration: 2, ease: 'easeInOut', repeat: Infinity
					}}}/>
			</div>
			<div className={styles.photoshopStyle}>
				<motion.img src={Photoshop} alt="ReactJs" className={styles.photoshopIcon} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: 'easeInOut'}} whileInView={{ y: [0, -10, 0], transition: {
						duration: 2, ease: 'easeInOut', repeat: Infinity
					}}}/>
			</div>
		</div>
	)
}

export default TechnologyContainer
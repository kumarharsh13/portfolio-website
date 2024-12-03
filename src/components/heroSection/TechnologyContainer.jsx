import { motion } from "framer-motion";
import styles from "../heroSection/HeroSection.module.css";

import Html from "../../resources/icons/html.png";
import Css from "../../resources/icons/css.png";
import Javascript from "../../resources/icons/javascript.png";
import NodeJS from "../../resources/icons/nodejs.png";
import ReactJs from "../../resources/icons/reactjs.png";
import Python from "../../resources/icons/python.png";
import Cpp from "../../resources/icons/cpp.png";
import Ruby from "../../resources/icons/ruby.png";
import Rails from "../../resources/icons/rails.png";
import MySql from "../../resources/icons/mysql.png";
import Posgresql from "../../resources/icons/posgressql.png";
import GitHub from "../../resources/icons/github.png";
import Photoshop from "../../resources/icons/photoshop.png";

function TechnologyContainer() {
  const technologies = [
    { name: "htmlIcon", imgSrc: Html },
    { name: "cssIcon", imgSrc: Css },
    { name: "javascriptIcon", imgSrc: Javascript },
    { name: "nodejslIcon", imgSrc: NodeJS },
    { name: "reactjsIcon", imgSrc: ReactJs },
    { name: "pythonIcon", imgSrc: Python },
    { name: "cppIcon", imgSrc: Cpp },
    { name: "rubyIcon", imgSrc: Ruby },
    { name: "railsIcon", imgSrc: Rails },
    { name: "mysqlIcon", imgSrc: MySql },
    { name: "posgresqlIcon", imgSrc: Posgresql },
    { name: "githubIcon", imgSrc: GitHub },
    { name: "photoshopIcon", imgSrc: Photoshop },
  ];

  return (
    <div className={styles.techContainer}>
      {technologies.map((tech, index) => {
        const rotateAngle = index * (360 / 13);

        return (
          <div
            key={index}
            className={styles.icon}
            style={{ transform: `rotate(${rotateAngle}deg)` }}
          >
            <motion.img
              src={tech.imgSrc}
              alt={tech.name}
              className={styles.techIcon}
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: -rotateAngle, y: [0, -10, 0] }}
              transition={{ duration: 2, ease: "easeInOut" }}
              whileInView={{
                y: [0, -10, 0],
                transition: {
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                },
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default TechnologyContainer;

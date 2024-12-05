import styles from "../footerSection/FooterSection.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function FooterSection() {
  return (
    <div className={styles.footerSection}>
      <h1>Let's Connect</h1>
      <div className={styles.socialMedia}>
        <a
          href="mailto:kr.harsh13@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
        <a
          href="https://in.linkedin.com/in/kumarharsh13"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
        <a
          href="https://github.com/kumarharsh13"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
      <div className={styles.createdBy}>
        Crafted with <FontAwesomeIcon icon={faHeart} />
      </div>
      <div className={styles.copyright}>All rights reserved © 2025 </div>
    </div>
  );
}

export default FooterSection;

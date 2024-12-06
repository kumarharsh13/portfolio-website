import styles from "../navigation/Navigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Navigation({ inView }) {
  const [openMenu, setopenMenu] = useState(false)

  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleMenu = () => {
    setopenMenu(!openMenu)
  }

  return (
    <nav className={styles.navigation}>
      <div className={styles.navMenuContainer}>
        <div className={styles.logo}>HK</div>
        <FontAwesomeIcon
          icon={openMenu ? faTimes : faBars}
          className={styles.hamburgerIcon}
          onClick={toggleMenu}
        />
        <div className={`${styles.navItems} ${openMenu ? styles.openMenu : ''}`}>
          <ul className={styles.navItemList}>
            <li
              className={inView === 'home' ? styles.active : ''}
              onClick={() => handleScrollTo('home')}
            >
              Home
            </li>
            <li
              className={inView === 'about' ? styles.active : ''}
              onClick={() => handleScrollTo('about')}
            >
              About
            </li>
            <li
              className={inView === 'projects' ? styles.active : ''}
              onClick={() => handleScrollTo('projects')}
            >
              Projects
            </li>
            <li
              className={inView === 'certificates' ? styles.active : ''}
              onClick={() => handleScrollTo('certificates')}
            >
              Certificates
            </li>
            <li
              className={inView === 'contact' ? styles.active : ''}
              onClick={() => handleScrollTo('contact')}
            >
              Contact
            </li>
            <li>
              <a
                href="mailto:kr.harsh13@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.hireMe}>Hire Me</button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  inView: PropTypes.string.isRequired,
};

export default Navigation;


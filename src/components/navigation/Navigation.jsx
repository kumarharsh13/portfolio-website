import styles from "../navigation/Navigation.module.css";

function Navigation() {
  return (
    <nav className={styles.navigation}>
      <div className={styles.navMenuContainer}>
        <div className={styles.logo}>HK</div>
        <div className={styles.navItems}>
          <ul className={styles.navItemList}>
            <li>Home</li>
            <li>About</li>
            <li>Projects</li>
            <li>Certificates</li>
            <li>Contact</li>
            <li><button className={styles.hireMe}>Hire Me</button></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

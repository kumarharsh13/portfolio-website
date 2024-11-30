import styles from "../navigation/Navigation.module.css";

function Navigation() {
  return (
    <nav className={styles.navigation}>
      <div className={styles.navMenuContainer}>
        <div className={styles.log}>HK</div>
        <div className={styles.navItems}>
          <ul className={styles.navItemList}>
            <li>Home</li>
            <li>About</li>
            <li>Projects</li>
            <li>Certificates</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

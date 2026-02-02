import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <h2 className={styles.title}>CityCare Hospital</h2>
      </div>
    </nav>
  );
}

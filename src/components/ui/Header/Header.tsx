import styles from "./Header.module.css";

export const Header = () => {
  return (
    <div className={styles.containerHeader}>
      <div className={styles.containerTitleHeader}>
        <h2>
          <span className={styles.span1}>TO-DO</span>
          <span className={styles.span2}>All caps</span>
          </h2>
      </div>
    </div>
  )
}

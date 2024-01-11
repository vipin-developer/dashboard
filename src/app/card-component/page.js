import styles from "./page.module.css";
const CardComponent = ({ children,title }) => {
  return (
    <div className={styles.card}>
      <p className={styles.cardTitle}>{title}</p>
      <div className={styles.cardContent}>{children || "Empty"}</div>
    </div>
  );
};

export default CardComponent;

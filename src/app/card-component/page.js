import styles from "./page.module.css";
const CardComponent = ({ children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>{children || "Empty"}</div>
    </div>
  );
};

export default CardComponent;

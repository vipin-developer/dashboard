// Import the CSS styles for the component
import styles from "./page.module.css";

const CardComponent = ({ children, title }) => {
  return (
    // The outer div represents the card container with styles applied from the imported CSS module.
    <div className={styles.card}>
      {/* The title of the card, styled using the 'cardTitle' class from the CSS module. */}
      <p className={styles.cardTitle}>{title}</p>
      
      {/* The content of the card, styled using the 'cardContent' class from the CSS module.
           If no children are provided, a default message "Empty" is displayed. */}
      <div className={styles.cardContent}>{children || "Empty"}</div>
    </div>
  );
};

export default CardComponent;

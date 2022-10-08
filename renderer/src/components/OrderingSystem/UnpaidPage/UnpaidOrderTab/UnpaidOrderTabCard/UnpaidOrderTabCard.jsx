import React from "react";
import styles from "./UnpaidOrderTabCard.module.scss";

const UnpaidOrderTabCard = ({ title, quantity, price }) => {
  return (
    <div className={styles["UnpaidOrderTabCard"]}>
      <div className={styles["UnpaidOrderTabCard__data"]}> {title} </div>
      <div className={styles["UnpaidOrderTabCard__data"]}> {quantity} </div>
      <div className={styles["UnpaidOrderTabCard__data"]}>
        {quantity * price}
      </div>
    </div>
  );
};

export default UnpaidOrderTabCard;

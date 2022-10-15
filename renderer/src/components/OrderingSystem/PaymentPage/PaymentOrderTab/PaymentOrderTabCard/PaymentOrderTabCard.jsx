import React from "react";
import styles from "./PaymentOrderTabCard.module.scss";

const PaymentOrderTabCard = ({ title, quantity, price }) => {
  return (
    <div className={styles["PaymentOrderTabCard"]}>
      <div className={styles["PaymentOrderTabCard__content"]}>
        <div className={styles["PaymentOrderTabCard__data"]}> {title} </div>
        <div className={styles["PaymentOrderTabCard__data"]}> {quantity} </div>
        <div className={styles["PaymentOrderTabCard__data"]}>
          {quantity * price}
        </div>
      </div>
    </div>
  );
};

export default PaymentOrderTabCard;

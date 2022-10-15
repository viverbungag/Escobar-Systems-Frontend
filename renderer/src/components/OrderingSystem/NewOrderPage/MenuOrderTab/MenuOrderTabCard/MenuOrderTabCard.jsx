import React from "react";
import styles from "./MenuOrderTabCard.module.scss";
import Image from "next/image";
import { Icon } from "@iconify/react";
import addCircle24Filled from "@iconify/icons-fluent/add-circle-24-filled";
import circleMinusFill from "@iconify/icons-akar-icons/circle-minus-fill";
import circleX from "@iconify/icons-akar-icons/circle-x";

const MenuOrderTabCard = ({
  title,
  price,
  quantity,
  quantityOnChange,
  handleDeleteItemButtonOnClick,
}) => {
  return (
    <div className={styles["MenuOrderTabCard"]}>
      <div className={styles["Remove-Section"]}>
        <button
          className={styles["remove-button"]}
          onClick={() => handleDeleteItemButtonOnClick(title)}
        >
          <Icon icon={circleX} />
        </button>
      </div>
      <div className={styles["order-name"]}>
        <h2>{title}</h2>
      </div>
      <div className={styles["Txt-Section"]}>
        <div className={styles["Title-Section"]}>
          <div className={styles["Counter-Section"]}>
            <button onClick={() => quantityOnChange(title, quantity, -1)}>
              <Icon
                icon={circleMinusFill}
                height="24"
                width="24"
                color="#003049"
              />
            </button>
            <div className={styles["Counter-Section__quantity"]}>
              {quantity}
            </div>
            <button onClick={() => quantityOnChange(title, quantity, 1)}>
              <Icon
                icon={addCircle24Filled}
                height="26"
                width="26"
                color="#003049"
              />
            </button>
          </div>
        </div>

        <div className={styles["Price-Section"]}>
          <p> ₱{price * quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default MenuOrderTabCard;

import { Icon } from "@iconify/react";
import React from "react";
import styles from "./UnpaidOrderTabCard.module.scss";
import circleX from "@iconify/icons-akar-icons/circle-x";

const UnpaidOrderTabCard = ({ title, quantity, price }) => {
	return (
		<div className={styles["UnpaidOrderTabCard"]}>
			<div className={styles["UnpaidOrderTabCard__content"]}>
				<div className={styles["UnpaidOrderTabCard__data"]}>{title}</div>
				<div className={styles["UnpaidOrderTabCard__quantity"]}>{quantity}</div>
				<div className={styles["UnpaidOrderTabCard__price"]}>
					₱{quantity * price}
				</div>
			</div>
		</div>
	);
};

export default UnpaidOrderTabCard;

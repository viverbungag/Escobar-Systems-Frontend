import React from "react";
import styles from "./PaymentOrderTabCard.module.scss";

const PaymentOrderTabCard = ({ title, quantity, price }) => {
	return (
		<div className={styles["PaymentOrderTabCard"]}>
			<div className={styles["PaymentOrderTabCard__content"]}>
				<div className={styles["PaymentOrderTabCard__data"]}> {title} </div>
				<div className={styles["PaymentOrderTabCard__quantity"]}>
					{" "}
					{quantity}{" "}
				</div>
				<div className={styles["PaymentOrderTabCard__price"]}>
					₱ {quantity * price}
				</div>
			</div>
		</div>
	);
};

export default PaymentOrderTabCard;

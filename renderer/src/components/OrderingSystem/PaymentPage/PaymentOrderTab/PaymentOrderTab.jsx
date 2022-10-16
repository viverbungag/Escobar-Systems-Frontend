import React, { useEffect, useState } from "react";
import styles from "./PaymentOrderTab.module.scss";
import PaymentOrderTabCard from "./PaymentOrderTabCard/PaymentOrderTabCard";
import shortid from "shortid";
import { Icon } from "@iconify/react";
import { printReceipt } from "../../../../../print/printFunctions";
import { useUser } from "../../../contexts/UserContext";
import printIcon from "@iconify/icons-bytesize/print";

const PaymentOrderTab = ({
	orderTabItems,
	orderCardSelected,
	orderDiscount,
	customerPayment,
	totalPayment,
	additionalPayment,
}) => {
	const { employeeName } = useUser();
	const subTotal = orderTabItems.reduce(
		(sum, currentMenu) =>
			sum +
			currentMenu.foodOrder.menu.menuPrice * currentMenu.foodOrder.menuQuantity,
		0
	);
	const discountedPrice =
		(subTotal + additionalPayment) * (orderDiscount / 100);
	const totalPrice = subTotal + additionalPayment - discountedPrice;
	const change = customerPayment - totalPrice;
	//for pdf
	const arr = [];
	const createNewCols = () => {
		orderTabItems.map((item) => {
			console.log(item.foodOrder.menu);
			arr.push({
				menuName: item.foodOrder.menu.menuName,
				menuQuantity: item.foodOrder.menuQuantity,
				menuPrice: item.foodOrder.menu.menuPrice,
			});
		});
		setPdfRows(arr);
	};
	const pdfColumns = [
		{ header: "Item", dataKey: "menuName" },
		{ header: "Quantity", dataKey: "menuQuantity" },
		{ header: "Price", dataKey: "menuPrice" },
	];
	const [pdfRows, setPdfRows] = useState([]);
	const pdfPaymentColumns = [
		{ header: "", dataKey: "label" },
		{ header: "", dataKey: "data" },
	];
	const pdfPaymentRows = [
		{ label: "Customer Payment", data: customerPayment.toFixed(2) },
		{ label: "SubTotal", data: subTotal.toFixed(2) },
		{ label: "Discount", data: `${discountedPrice.toFixed(2)}%` },
		{ label: "Total", data: totalPrice.toFixed(2) },
		{ label: "Change", data: change.toFixed(2) },
		{ label: "Cashier", data: employeeName },
	];
	//

	useEffect(() => {
		createNewCols();
	}, [orderTabItems]);

	return (
		<div
			className={[
				styles["PaymentOrderTab"],
				!orderCardSelected && styles["PaymentOrderTab--hidden"],
			].join(" ")}
		>
			<div className={styles["header-section"]}>
				<div className={styles["orderno-section"]}>
					<h1> Order # {orderCardSelected} </h1>

					<Icon
						icon={printIcon}
						height="25"
						width="25"
						className={[
							styles["print-icon"],
							!orderCardSelected && styles["print-none"],
						].join(" ")}
						onClick={() =>
							printReceipt(
								orderCardSelected,
								pdfRows,
								pdfColumns,
								pdfPaymentRows,
								pdfPaymentColumns
							)
						}
					/>
				</div>

				<div className={styles["title-section"]}>
					<div className={styles["title-section__text"]}> Item Title </div>
					<div className={styles["title-section__text"]}> Quantity </div>
					<div className={styles["title-section__text"]}> Price </div>
				</div>
			</div>

			<div className={styles["component-section"]}>
				{orderTabItems.map((item) => {
					return (
						<div key={shortid.generate()}>
							<PaymentOrderTabCard
								title={item.foodOrder.menu.menuName}
								quantity={item.foodOrder.menuQuantity}
								price={item.foodOrder.menu.menuPrice}
							/>
						</div>
					);
				})}
			</div>

			<div className={styles["footer-section"]}>
				<div className={styles["footer-section__row"]}>
					<h2 className={styles["footer-section__text"]}> Customer Payment </h2>
					<h2 className={styles["footer-section__text"]}>
						{" "}
						₱ {customerPayment}{" "}
					</h2>
				</div>

				<div className={styles["footer-section__row"]}>
					<h2 className={styles["footer-section__text"]}> SubTotal </h2>
					<h2 className={styles["footer-section__text"]}> ₱ {subTotal} </h2>
				</div>

				<div className={styles["footer-section__row"]}>
					<h2 className={styles["footer-section__text"]}> Additional Cost </h2>
					<h2 className={styles["footer-section__text"]}>
						{" "}
						₱ {additionalPayment}{" "}
					</h2>
				</div>

				<div className={styles["footer-section__row"]}>
					<h2 className={styles["footer-section__text"]}> Discounted Price </h2>
					<h2 className={styles["footer-section__text"]}>
						₱ {discountedPrice.toFixed(2)}
					</h2>
				</div>

				<div className={styles["footer-section__row"]}>
					<h2 className={styles["footer-section__text"]}> Total </h2>
					<h2 className={styles["footer-section__text"]}>
						{" "}
						₱ {totalPrice.toFixed(2)}
					</h2>
				</div>

				<div className={styles["footer-section__row"]}>
					<h2 className={styles["footer-section__text"]}> Change </h2>
					<h2 className={styles["footer-section__text"]}>
						₱ {change.toFixed(2)}
					</h2>
				</div>
			</div>
		</div>
	);
};

export default PaymentOrderTab;

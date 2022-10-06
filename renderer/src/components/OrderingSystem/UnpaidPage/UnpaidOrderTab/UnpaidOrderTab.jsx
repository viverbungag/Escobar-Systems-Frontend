import React, { useEffect, useState } from "react";
import styles from "./UnpaidOrderTab.module.scss";
import UnpaidOrderTabCard from "./UnpaidOrderTabCard/UnpaidOrderTabCard";
import shortid from "shortid";
import { Icon } from "@iconify/react";
// import { printReceipt } from "../../../../../print/printFunctions";
import { useUser } from "../../../contexts/UserContext";
import chevronRight from "@iconify/icons-akar-icons/chevron-right";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rest from "../../../../rest/Rest";

const UnpaidOrderTab = ({
  orderTabItems,
  orderCardSelected,
  orderDiscount,
  customerPayment,
  totalPayment,
}) => {
  const rest = new Rest();
  const { employeeName } = useUser();
  const subTotal = orderTabItems.reduce(
    (sum, currentMenu) =>
      sum +
      currentMenu.foodOrder.menu.menuPrice * currentMenu.foodOrder.menuQuantity,
    0
  );
  const discountedPrice = subTotal * (orderDiscount / 100);
  const totalPrice = subTotal - subTotal * (orderDiscount / 100);
  const change = customerPayment - (subTotal - orderDiscount);

  const arr = [];
  const createNewCols = () => {
    orderTabItems.map((item) => {
      //   console.log(item.foodOrder.menu);
      arr.push({
        menuName: item.foodOrder.menu.menuName,
        menuQuantity: item.foodOrder.menuQuantity,
        menuPrice: item.foodOrder.menu.menuPrice,
      });
    });
    setPdfRows(arr);
  };

  //for pdf
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
    { label: "Customer Payment", data: customerPayment },
    { label: "SubTotal", data: subTotal },
    { label: "Discounted Price", data: discountedPrice },
    { label: "Total", data: totalPrice },
    { label: "Change", data: change },
    { label: "Cashier", data: employeeName },
  ];
  //
  const [payOpen, setPayOpen] = React.useState(false);
  const handlePayOpen = () => setPayOpen(true);
  const handlePayClose = () => setPayOpen(false);
  //
  const payButtonOnClick = (orderTabItems) => {
    console.log(orderTabItems);
  };

  useEffect(() => {
    createNewCols();
  }, [orderTabItems]);

  return (
    <div
      className={[
        styles["UnpaidOrderTab"],
        !orderCardSelected && styles["none"],
      ].join(" ")}
    >
      <div className={styles["orderno-section"]}>
        <h1> Order # {orderCardSelected} </h1>
        {/* <Icon
					icon="bytesize:print"
					height="25"
					width="25"
					className={[
						styles["print-icon"],
						!orderCardSelected && styles["print-none"],
					].join(" ")}
					onClick={
						() =>
							printReceipt(
								orderCardSelected,
								pdfRows,
								pdfColumns,
								pdfPaymentRows,
								pdfPaymentColumns
							)
						// () => console.log(pdfRows)
					}
				/> */}
      </div>

      <div className={styles["title-section"]}>
        <p className={styles["Quantity"]}> Item Title </p>
        <p className={styles["Quantity"]}> Quantity </p>
        <p className={styles["Quantity"]}> Price </p>
      </div>

      <div className={styles["component-section"]}>
        {orderTabItems.map((item) => {
          return (
            <div key={shortid.generate()}>
              <UnpaidOrderTabCard
                title={item.foodOrder.menu.menuName}
                quantity={item.foodOrder.menuQuantity}
                price={item.foodOrder.menu.menuPrice}
              />
            </div>
          );
        })}
      </div>

      {/* <div
        className={[
          styles["CustomerPayment-Section"],
          !orderCardSelected && styles["none"],
        ].join(" ")}
      >
        <h2 className={styles["CustomerPayment"]}> Customer Payment </h2>
        <h2 className={styles["CustomerPaymentPrice"]}> {customerPayment} </h2>
      </div> */}

      <div
        className={[
          styles["Subtotal-Section"],
          !orderCardSelected && styles["none"],
        ].join(" ")}
      >
        <h2 className={styles["Subtotal"]}> SubTotal </h2>
        <h2 className={styles["SubtotalPrice"]}> {subTotal} </h2>
      </div>

      {/* <div
				className={[
					styles["Discounted-Section"],
					!orderCardSelected && styles["none"],
				].join(" ")}
			>
				<h2 className={styles["Discount"]}> Discounted Price </h2>
				<h2 className={styles["DiscountPrice"]}>
					{(subTotal * (orderDiscount / 100)).toFixed(2)}
				</h2>
			</div> */}

      <div
        className={[
          styles["Total-Section"],
          !orderCardSelected && styles["none"],
        ].join(" ")}
      >
        <h2 className={styles["Total"]}> Total </h2>
        <h2 className={styles["TotalPrice"]}>
          {" "}
          {(subTotal - subTotal * (orderDiscount / 100)).toFixed(2)}
        </h2>
      </div>

      <div className={styles["total-section"]} onClick={handlePayOpen}>
        <div className={styles["total-section--wrapper"]}>
          <div className={styles["pay-section"]}>
            <h2> Pay </h2>
            <Icon icon={chevronRight} height="16" width="16" color="white" />
          </div>
        </div>
      </div>

      <Modal open={payOpen} onClose={handlePayClose}>
        <Box className={styles["Paystyle"]}>
          <div className={styles["Header"]}>
            <h2 className={styles["Header__Text"]}>
              Order #{orderCardSelected}
            </h2>
            <Button onClick={handlePayClose} className={styles["Close_Button"]}>
              {" "}
              X{" "}
            </Button>
          </div>
          <div className={styles["Wrapper"]}>
            <div className={styles["Text-Section"]}>
              <div className={styles["Input-Section--Payment"]}>
                <h1> Please input the Customer Payment : </h1>
                <input
                  // value={customerPayment}
                  // onChange={customerPaymentOnChange}
                  type="text"
                  id="first"
                  className={styles["Input-Forms--Payment"]}
                  placeholder="Input the money of the customer"
                />
              </div>

              <div className={styles["Input-Section--Discount"]}>
                <h1> Input Discount Value : </h1>
                <input
                  // value={discountPayment}
                  // onChange={discountPaymentOnChange}
                  type="text"
                  id="first"
                  className={styles["Input-Forms--Discount"]}
                  placeholder="Input Percentage of the Discount"
                />
                <h1 className={styles["Percentage"]}> % </h1>
              </div>

              <div className={styles["Input-Section--Payment"]}>
                <h1> Input Additional Payment : </h1>
                <input
                  // value={customerPayment}
                  // onChange={customerPaymentOnChange}
                  type="text"
                  id="first"
                  className={styles["Input-Forms--Payment"]}
                  placeholder="Input the money of the customer"
                />
              </div>
            </div>

            <div className={styles["Button-Section"]}>
              <button
                className={styles["Confirm_Button"]}
                onClick={() => payButtonOnClick(orderTabItems)}
              >
                {" "}
                Confirm{" "}
              </button>
            </div>
          </div>
          {/* <div className={styles["Button-Section"]}>
     
                          </div> */}
        </Box>
      </Modal>
    </div>
  );
};

export default UnpaidOrderTab;

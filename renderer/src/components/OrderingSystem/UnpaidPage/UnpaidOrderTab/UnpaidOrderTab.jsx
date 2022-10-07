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
import Order from "../../../../model/Order";
import { toast } from "react-toastify";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import PercentIcon from "@mui/icons-material/Percent";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

function onlyNumbers(data) {
  return /^[0-9]+$/.test(data);
}

const UnpaidOrderTab = ({
  orderTabItems,
  orderCardSelected,
  customerPayment,
  totalPayment,
}) => {
  const rest = new Rest();
  const { employeeName } = useUser();
  const today = new Date();
  const [orderValues, setOrderValues] = useState(
    new Order(orderCardSelected, employeeName, today, [], 0, 0, 0)
  );

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
    // setPdfRows(arr);
  };
  //for pdf
  // const pdfColumns = [
  //   { header: "Item", dataKey: "menuName" },
  //   { header: "Quantity", dataKey: "menuQuantity" },
  //   { header: "Price", dataKey: "menuPrice" },
  // ];
  // const [pdfRows, setPdfRows] = useState([]);
  // const pdfPaymentColumns = [
  //   { header: "", dataKey: "label" },
  //   { header: "", dataKey: "data" },
  // ];
  // const pdfPaymentRows = [
  //   { label: "Customer Payment", data: payment },
  //   { label: "Total", data: total },
  //   { label: "Discounted Price", data: inputValues.discount },
  //   { label: "Total", data: totalPrice },
  //   { label: "Cashier", data: employeeName },
  // ];
  //
  const [payOpen, setPayOpen] = React.useState(false);
  const handlePayOpen = () => setPayOpen(true);
  const handlePayClose = () => setPayOpen(false);
  //input
  // const [customerPaymentErrorText, setCustomerPaymentErrorText] = useState("");
  // const [discountPaymentErrorText, setDiscountPaymentErrorText] = useState("");
  // const [additionalPaymentErrorText, setAdditionalPaymentErrorText] =
  //   useState("");
  // useState("");

  //set values
  const subTotal = orderTabItems
    .reduce(
      (sum, currentMenu) =>
        sum +
        currentMenu.foodOrder.menu.menuPrice *
          currentMenu.foodOrder.menuQuantity,
      0
    )
    .toFixed(2);
  const [totalCost, setTotalCost] = useState(0);
  const [inputValues, setInputValues] = useState({
    payment: 0,
    discount: 0,
    additional: 0,
  });
  const handleInputChange = (e) => {
    // if (e.target.name == "customerPayment") {
    //   if (onlyNumbers(e.target.value)) {
    //     setInputValues({ ...inputValues, [e.target.name]: e.target.values });
    //     setCustomerPaymentErrorText("");
    //   } else if (e.target.value == "") {
    //     setCustomerPaymentErrorText("Customer Payment cannot be empty.");
    //   } else {
    //     setCustomerPaymentErrorText("Please input numbers only.");
    //   }
    // }
    // if (e.target.name == "discountPayment") {
    //   if (onlyNumbers(e.target.value)) {
    //     setInputValues({ ...inputValues, [e.target.name]: e.target.values });
    //     setDiscountPaymentErrorText("");
    //   } else if (e.target.value == "") {
    //     setInputValues({ ...inputValues, [e.target.name]: e.target.values });
    //     setDiscountPaymentErrorText("");
    //   } else {
    //     setDiscountPaymentErrorText("Please input numbers only.");
    //   }
    // }
    // if (e.target.name == "additionalPayment") {
    //   if (onlyNumbers(e.target.value)) {
    //     setInputValues({ ...inputValues, [e.target.name]: e.target.values });
    //     setAdditionalPaymentErrorText("");
    //   } else if (e.target.value == "") {
    //     setInputValues({ ...inputValues, [e.target.name]: e.target.values });
    //     setAdditionalPaymentErrorText();
    //   } else {
    //     setAdditionalPaymentErrorText("Please input numbers only.");
    //   }
    // }
    if (e.target.name == "discount") {
      if (onlyNumbers(e.target.value)) {
        setTotalCost((subTotal - subTotal * (e.target.value / 100)).toFixed(2));
      } else {
        setTotalCost(subTotal);
      }
    }
    console.log(e.target.value);
    setInputValues({ ...inputValues, [e.target.name]: e.target.values });
  };
  //submit
  const payButtonOnClick = () => {
    setOrderValues({
      ...orderValues,
      [Object.keys(inputValues).map((item) => item)]: Object.values(
        inputValues
      ).map((item) => item),
    });
    console.log(inputValues);
    // rest.update(`$`);
  };

  useEffect(() => {
    setTotalCost(subTotal);
  }, [subTotal]);

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
          styles["Total-Section"],
          !orderCardSelected && styles["none"],
        ].join(" ")}
      >
        <h2 className={styles["Total"]}> Total </h2>
        <h2 className={styles["TotalPrice"]}>{totalCost}</h2>
      </div> */}

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
              <div className={styles["Input-Section"]}>
                <TextField
                  variant="outlined"
                  size="small"
                  label="Discount"
                  name="discount"
                  value={inputValues.discount}
                  onChange={handleInputChange}
                  // helperText={discountPaymentErrorText}
                  // error={discountPaymentErrorText}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PercentIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </div>

              <div className={styles["Input-Section"]}>
                <TextField
                  variant="outlined"
                  size="small"
                  label="Customer Payment "
                  name="payment"
                  value={inputValues.payment}
                  onChange={handleInputChange}
                  // helperText={customerPaymentErrorText}
                  // error={customerPaymentErrorText}
                  fullWidth
                />
              </div>

              <div className={styles["Input-Section"]}>
                <TextField
                  variant="outlined"
                  size="small"
                  label="Additional Payment"
                  name="additional"
                  value={inputValues.additional}
                  onChange={handleInputChange}
                  // helperText={additionalPaymentErrorText}
                  // error={additionalPaymentErrorText}
                  fullWidth
                />
              </div>

              <div className={styles["Input-Section"]}>
                Current Total:
                {totalCost}
              </div>
            </div>

            <div className={styles["Button-Section"]}>
              <button
                className={styles["Confirm_Button"]}
                onClick={() => payButtonOnClick()}
              >
                {" "}
                Confirm{" "}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UnpaidOrderTab;

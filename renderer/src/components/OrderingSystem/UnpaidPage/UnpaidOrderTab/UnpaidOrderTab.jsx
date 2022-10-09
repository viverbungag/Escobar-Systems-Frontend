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
import { InputAdornment, TextField } from "@mui/material";
import printIcon from "@iconify/icons-bytesize/print";
import { printReceipt } from "../../../../../print/printFunctions";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function validIntegerDecimal(data) {
  return /^[0-9]\d*(\.\d+)?$/.test(data);
}

const UnpaidOrderTab = ({
  items,
  orderTabItems,
  orderCardSelected,
  reload,
}) => {
  const getValues = () => {
    items.map((item) => {
      if (item.orderId == orderCardSelected) {
        setOrderValues(
          new Order(
            item.orderId,
            item.employeeFullName,
            item.orderTime,
            item.customerFoodOrders,
            0,
            0,
            totalCost,
            "PAID",
            item.servingType,
            item.tableNumber,
            0
          )
        );
      }
    });
  };
  const rest = new Rest();
  const [orderValues, setOrderValues] = useState([]);

  //for pdf
  const arr = [];
  const createNewCols = () => {
    orderTabItems.map((item) => {
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
    { label: "Total", data: orderValues.totalCost },
    { label: "Customer Payment", data: orderValues.payment },
    { label: "Discount", data: `${orderValues.discount}%` },
    { label: "Additional", data: orderValues.additionalPayment },
    {
      label: "Change",
      data: (orderValues.payment - orderValues.totalCost).toFixed(2),
    },
    { label: "Cashier", data: orderValues.employeeFullName },
  ];
  //modal
  const [payOpen, setPayOpen] = useState(false);
  const handlePayOpen = () => {
    setPayOpen(true);
    setInitialValues();
  };
  const handlePayClose = () => setPayOpen(false);
  //input
  // const [customerPaymentErrorText, setCustomerPaymentErrorText] = useState("");
  // const [discountPaymentErrorText, setDiscountPaymentErrorText] = useState("");
  // const [additionalPaymentErrorText, setAdditionalPaymentErrorText] =
  //   useState("");
  // useState("");

  //set values
  const [subTotal, setSubTotal] = useState(
    orderTabItems
      .reduce(
        (sum, currentMenu) =>
          sum +
          currentMenu.foodOrder.menu.menuPrice *
            currentMenu.foodOrder.menuQuantity,
        0
      )
      .toFixed(2)
  );
  const [totalCost, setTotalCost] = useState(subTotal);
  const [discountError, setDiscountError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [additionalError, setAdditionalError] = useState("");
  const handleInputChange = (e) => {
    if (e.target.name === "discount") {
      if (e.target.value == 0 || e.target.value == "") {
        setDiscountError("");
        setTotalCost((subTotal - subTotal * (e.target.value / 100)).toFixed(2));
        getChange();
      } else if (validIntegerDecimal(e.target.value)) {
        if (e.target.value > 100 || e.target.value < 0) {
          setDiscountError("Input must be 0-100 only.");
        } else {
          setDiscountError("");
          setTotalCost(
            (subTotal - subTotal * (e.target.value / 100)).toFixed(2)
          );
          getChange();
        }
      } else if (!validIntegerDecimal(e.target.value)) {
        setDiscountError("Input digits only.");
      }
    }
    setOrderValues({
      ...orderValues,
      [e.target.name]: e.target.value,
    });
  };
  //submit
  const payButtonOnClick = () => {
    console.log(orderValues);
    const discountFloat = 0.0;
    const paymentFloat = 0.0;
    const additionalFloat = 0.0;

    if (orderValues.discount != 0 || orderValues.discount != "") {
      if (validIntegerDecimal(orderValues.discount)) {
        discountFloat = parseFloat(orderValues.discount).toFixed(2);
        if (discountFloat > 100 || discountFloat < 0) {
          setDiscountError("Input must be 0-100 only.");
          return;
        } else {
          setDiscountError("");
          setOrderValues({ ...orderValues, discount: discountFloat });
        }
      } else {
        setDiscountError("Input digits only.");
        return;
      }
    } else {
      setDiscountError("");
      setOrderValues({ ...orderValues, discount: discountFloat });
    }

    if (orderValues.payment == "") {
      setPaymentError("Input cannot be empty.");
      return;
    } else if (!validIntegerDecimal(orderValues.payment)) {
      setPaymentError("Input must be digits.");
      return;
    } else if (validIntegerDecimal(orderValues.payment)) {
      paymentFloat = parseFloat(orderValues.payment).toFixed(2);
      if (paymentFloat - orderValues.totalCost < 0) {
        setPaymentError("Payment must be greater than total cost.");
        return;
      } else {
        setPaymentError("");
        setOrderValues({ ...orderValues, payment: paymentFloat });
      }
    } else {
      setPaymentError("");
      setOrderValues({ ...orderValues, payment: paymentFloat });
    }

    if (
      orderValues.additionalPayment != 0 ||
      orderValues.additionalPayment != ""
    ) {
      if (validIntegerDecimal(orderValues.additionalPayment)) {
        additionalFloat = parseFloat(orderValues.discount).toFixed(2);
        setOrderValues({ ...orderValues, additionalPayment: additionalFloat });
        setAdditionalError("");
      } else {
        setAdditionalError("Input must be 0 and above only.");
        return;
      }
    } else {
      setAdditionalError("");
      setOrderValues({ ...orderValues, additionalPayment: additionalFloat });
    }

    printReceipt(
      orderCardSelected,
      pdfRows,
      pdfColumns,
      pdfPaymentRows,
      pdfPaymentColumns
    );

    // rest.add(
    //   `${INITIAL_URL}/orders/pay/${orderValues.orderId}`,
    //   orderValues,
    //   addSuccessAction,
    //   `Successful order transaction for ${orderValues.orderId} for Table ${orderValues.tableNumber}..`
    // );
  };
  //success
  const addSuccessAction = () => {
    handlePayClose();
    reload();
  };
  const [change, setChange] = useState(0);
  const getChange = () => {
    const beforeCheckChange = (orderValues.payment - totalCost).toFixed(2);
    if (beforeCheckChange >= 0) {
      setChange(beforeCheckChange);
    } else if (beforeCheckChange < 0) {
      setChange(0);
    }
  };
  const setInitialValues = () => {
    setTotalCost(subTotal);
    getValues();
    setChange(0);
    setDiscountError("");
    setPaymentError("");
    setAdditionalError("");
  };

  useEffect(() => {
    getChange();
  }, [orderValues.totalCost, orderValues.payment]);

  useEffect(() => {
    setTotalCost(subTotal);
  }, [subTotal]);

  useEffect(() => {
    setOrderValues({
      ...orderValues,
      totalCost: parseFloat(totalCost).toFixed(2),
    });
  }, [totalCost]);

  useEffect(() => {
    createNewCols();
    setSubTotal(
      orderTabItems
        .reduce(
          (sum, currentMenu) =>
            sum +
            currentMenu.foodOrder.menu.menuPrice *
              currentMenu.foodOrder.menuQuantity,
          0
        )
        .toFixed(2)
    );
  }, [orderTabItems]);

  return (
    <div
      className={[
        styles["UnpaidOrderTab"],
        !orderCardSelected && styles["UnpaidOrderTab--hidden"],
      ].join(" ")}
    >
      <div className={styles["header-section"]}>
        <div className={styles["orderno-section"]}>
          <h1> Order # {orderCardSelected} </h1>
        </div>

        <div className={styles["title-section"]}>
          <diuv className={styles["title-section__text"]}> Item Title </diuv>
          <diuv className={styles["title-section__text"]}> Quantity </diuv>
          <diuv className={styles["title-section__text"]}> Price </diuv>
        </div>
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

      <div className={styles["footer-section"]}>
        <div className={styles["footer-section__row"]}>
          <h2 className={styles["footer-section__text"]}> SubTotal </h2>
          <h2 className={styles["footer-section__text"]}> {subTotal} </h2>
        </div>
        <div className={styles["pay-button"]} onClick={handlePayOpen}>
          <div className={styles["pay-button__content"]}>
            <h2> Proceed to Payment </h2>
            <Icon icon={chevronRight} height="16" width="16" color="white" />
          </div>
        </div>
      </div>

      <Modal open={payOpen} onClose={handlePayClose}>
        <Box className={styles["modal"]}>
          <div className={styles["modal__title-bar"]}>
            <Button onClick={handlePayClose} className={styles["close-button"]}>
              {" "}
              X{" "}
            </Button>
          </div>
          <div className={styles["modal__container"]}>
            <div className={styles["modal__header"]}>
              <div className={styles["modal__header-text"]}>
                Order #{orderCardSelected}
              </div>
              <div className={styles["modal__header-text"]}>
                Table #{orderValues.tableNumber}
              </div>
              {/* <Icon
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
              ></Icon> */}
            </div>
            <div className={styles["Text-Section"]}>
              <div className={styles["Input-Section"]}>
                <TextField
                  variant="outlined"
                  size="small"
                  label="Discount"
                  name="discount"
                  helperText={discountError}
                  error={discountError != ""}
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon icon="bi:percent" />
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
                  helperText={paymentError}
                  error={paymentError != ""}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <Icon icon="clarity:peso-line" />
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
                  label="Additional Payment"
                  name="additionalPayment"
                  helperText={additionalError}
                  error={additionalError != ""}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <Icon icon="clarity:peso-line" />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </div>

              <div className={styles["Output-Section"]}>
                <div className={styles["Output-Section__label"]}>
                  <div className={styles["Output-Section__label-text"]}>
                    Change
                  </div>
                  <div className={styles["Output-Section__label-subtext"]}>
                    excluding additional payment
                  </div>
                </div>
                <div className={styles["Output-Section__label"]}>
                  ₱{parseFloat(change).toFixed(2)}
                </div>
              </div>

              <div className={styles["Output-Section"]}>
                <div className={styles["Output-Section__label"]}>
                  Current Total
                </div>
                <div className={styles["Output-Section__label"]}>
                  ₱{totalCost}
                </div>
              </div>
            </div>

            <div className={styles["Button-Section"]}>
              <button
                className={styles["Confirm_Button"]}
                onClick={() => payButtonOnClick()}
              >
                Confirm
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UnpaidOrderTab;

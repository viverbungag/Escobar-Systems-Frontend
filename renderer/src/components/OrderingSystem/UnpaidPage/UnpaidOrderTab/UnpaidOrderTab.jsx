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
import { toast } from "react-toastify";

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
  const [pdfPaymentRows, setPdfPaymentRows] = useState([]);
  // const createNewPdfPaymentRows = () => {

  // };
  //modal
  const [payOpen, setPayOpen] = useState(false);
  const handlePayOpen = () => {
    setPayOpen(true);
    setInitialValues();
  };
  const handlePayClose = () => setPayOpen(false);
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
  const [discountedPrice, setDiscountedPrice] = useState(0.0);
  const [discountError, setDiscountError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [additionalError, setAdditionalError] = useState("");
  const handleInputChange = (e) => {
    if (e.target.name === "discount") {
      if (e.target.value == 0 || e.target.value == "") {
        setDiscountError("");
        setDiscountedPrice(parseFloat(0).toFixed(2));
        // getChange();
        if (orderValues.payment - totalCost < 0) {
          setPaymentError(
            "Payment must be greater than or equal to total cost."
          );
        } else {
          setPaymentError("");
        }
      } else if (validIntegerDecimal(e.target.value)) {
        if (e.target.value > 100 || e.target.value < 0) {
          setDiscountError("Input must be 0-100 only.");
        } else {
          setDiscountedPrice(
            (
              parseFloat(orderValues.totalCost) -
              parseFloat(orderValues.totalCost) *
                (parseFloat(e.target.value) / 100)
            ).toFixed(2)
          );
          if (
            orderValues.payment -
              (
                parseFloat(orderValues.totalCost) -
                parseFloat(orderValues.totalCost) *
                  (parseFloat(e.target.value) / 100)
              ).toFixed(2) >=
            0
          ) {
            setDiscountError("");
            setPaymentError("");
            // getChange();
          } else {
            setPaymentError(
              "Payment must be greater than or equal to discounted cost."
            );
          }
        }
      } else if (!validIntegerDecimal(e.target.value)) {
        setDiscountError("Input digits only.");
      }
    }
    if (e.target.name === "payment") {
      if (e.target.value === "" || e.target.value === 0) {
        setPaymentError("Input cannot be empty.");
      } else if (!validIntegerDecimal(e.target.value)) {
        setPaymentError("Input must be digits.");
      } else if (validIntegerDecimal(e.target.value)) {
        if (
          parseFloat(discountedPrice) > 0 ||
          parseFloat(orderValues.discount) > 0
        ) {
          if (parseFloat(e.target.value) < discountedPrice) {
            setPaymentError(
              "Payment must be greater or equal the discounted cost."
            );
          } else {
            setPaymentError("");
            // getChange();
          }
        } else if (parseFloat(totalCost) > 0) {
          if (parseFloat(e.target.value) - totalCost < 0) {
            setPaymentError("Payment must be greater or equal the total cost.");
          } else {
            setPaymentError("");
            // getChange();
          }
        }
      } else {
        setPaymentError("");
        // getChange();
      }
    }
    if (e.target.name === "additionalPayment") {
      if (e.target.value == 0 || e.target.value == "") {
        setAdditionalError("");
        setTotalCost(parseFloat(subTotal).toFixed(2));
        // getChange();
      } else if (validIntegerDecimal(e.target.value)) {
        setTotalCost(
          (parseFloat(e.target.value) + parseFloat(subTotal)).toFixed(2)
        );
        if (discountedPrice != 0 || discountedPrice != "") {
          if (orderValues.payment >= discountedPrice) {
            setAdditionalError("");
            setPaymentError("");
            setTotalCost(
              (parseFloat(e.target.value) + parseFloat(subTotal)).toFixed(2)
            );
          } else {
            setPaymentError(
              "Payment must be greater than or equal to discounted price."
            );
          }
        } else if (
          parseFloat(e.target.value) +
            parseFloat(subTotal) -
            parseFloat(subTotal) !=
          0
        ) {
          if (
            orderValues.payment -
              (parseFloat(e.target.value) + parseFloat(subTotal)).toFixed(2) >=
            0
          ) {
            setAdditionalError("");
            setPaymentError("");
            setTotalCost(
              (parseFloat(e.target.value) + parseFloat(subTotal)).toFixed(2)
            );
          } else {
            setPaymentError(
              "Payment must be greater than or equal to total price."
            );
          }
        }
      } else if (!validIntegerDecimal(e.target.value)) {
        setChange(0);
        setAdditionalError("Input digits only.");
      }
    }

    setOrderValues({
      ...orderValues,
      [e.target.name]: e.target.value,
    });
  };
  //submit
  const payButtonOnClick = () => {
    if (orderValues.payment === "" || orderValues.payment === 0) {
      setPaymentError("Input cannot be empty.");
      return;
    }

    if (additionalError != "" || discountError != "" || paymentError != "") {
      return;
    }

    addSuccessAction();

    // rest.add(
    //   `${INITIAL_URL}/orders/pay/${orderValues.orderId}`,
    //   orderValues,
    //   addSuccessAction,
    //   `Successful order transaction for ${orderValues.orderId} for Table ${orderValues.tableNumber}.`
    // );
  };
  //success
  const addSuccessAction = () => {
    console.log(pdfPaymentRows);
    printReceipt(
      orderCardSelected,
      pdfRows,
      pdfColumns,
      pdfPaymentRows,
      pdfPaymentColumns
    );
    handlePayClose();
    reload();
  };
  const [change, setChange] = useState(0.0);
  const getChange = () => {
    const beforeCheckChange = 0;
    if (discountedPrice != 0) {
      beforeCheckChange = (orderValues.payment - discountedPrice).toFixed(2);
    } else {
      beforeCheckChange = (orderValues.payment - totalCost).toFixed(2);
    }
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
    setDiscountedPrice(0);
  };

  useEffect(() => {
    setPdfPaymentRows([
      {
        label: "Additional Cost",
        data: parseFloat(orderValues.additionalPayment).toFixed(2),
      },
      { label: "Total Cost", data: orderValues.totalCost },
      {
        label: "Discounted Price",
        data: discountedPrice,
      },
      { label: "Customer Payment", data: orderValues.payment },
      {
        label: "Change",
        data: change,
      },
      { label: "Cashier", data: orderValues.employeeFullName },
    ]);
  }, [orderValues]);

  useEffect(() => {
    getChange();
  }, [orderValues]);

  useEffect(() => {
    if (orderValues.discount != 0 || orderValues.discount != "") {
      setDiscountedPrice(
        parseFloat(totalCost) -
          (
            (parseFloat(totalCost) * parseFloat(orderValues.discount)) /
            100
          ).toFixed(2)
      );
    }
  }, [totalCost]);

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
                  InputLabelProps={{ shrink: true }}
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
                  label="Additional Cost"
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
                <div className={styles["Output-Section__label"]}>Change</div>
                <div className={styles["Output-Section__label"]}>
                  ₱{parseFloat(change).toFixed(2)}
                </div>
              </div>

              <div className={styles["Output-Section"]}>
                <div className={styles["Output-Section__label"]}>
                  Discounted Price
                </div>
                <div className={styles["Output-Section__label"]}>
                  ₱{parseFloat(discountedPrice).toFixed(2)}
                </div>
              </div>

              <div className={styles["Output-Section"]}>
                <div className={styles["Output-Section__label"]}>
                  Total Price
                </div>
                <div className={styles["Output-Section__label"]}>
                  ₱{totalCost}
                </div>
              </div>
            </div>
          </div>
          <div className={styles["modal__footer"]}>
            <button
              className={styles["Confirm_Button"]}
              onClick={() => payButtonOnClick()}
            >
              Confirm
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UnpaidOrderTab;

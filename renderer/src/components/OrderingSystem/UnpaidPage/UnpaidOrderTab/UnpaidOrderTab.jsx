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
import set from "date-fns/set";

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
  //modal
  const [payOpen, setPayOpen] = useState(false);
  const handlePayOpen = () => {
    setPayOpen(true);
    setInitialValues();
  };
  const handlePayClose = () => setPayOpen(false);
  //set values
  const [subTotal, setSubTotal] = useState();
  const [totalCost, setTotalCost] = useState(subTotal);
  const [discountedPrice, setDiscountedPrice] = useState(
    Number(parseFloat(0).toFixed(2))
  );
  const [additionalCost, setAdditionalCost] = useState();
  const [customerPayment, setCustomerPayment] = useState(
    Number(parseFloat(0).toFixed(2))
  );
  const [discount, setDiscount] = useState(Number(parseFloat(0).toFixed(2)));
  //on change
  const handleAdditionalCostOnChange = (e) => {
    setAdditionalCost(e.target.value);
    if (e.target.value != 0 || e.target.value != "") {
      setTotalCost(
        (parseFloat(subTotal) + parseFloat(e.target.value)).toFixed(2)
      );
    } else {
      setTotalCost(subTotal);
    }
  };
  const handleCustomerPaymentOnChange = (e) => {
    setCustomerPayment(e.target.value);
  };
  const handleDiscountOnChange = (e) => {
    setDiscount(e.target.value);
  };
  //submit
  const payButtonOnClick = () =>
    // additionalCost,
    // customerPayment,
    // discount,
    // discountedPrice,
    // totalCost
    {
      const total = 0;

      if (parseFloat(discount) > 0) {
        total = parseFloat(discountedPrice).toFixed(2);
      } else {
        total = parseFloat(totalCost).toFixed(2);
      }

      if (discountedPrice != 0) {
        if (Number(customerPayment) < Number(discountedPrice)) {
          toast.error(
            " Customer Payment cannot be less than the discounted price."
          );
          return;
        }
      } else {
        if (Number(customerPayment) < Number(totalCost)) {
          toast.error(" Customer Payment cannot be less than the total price.");
          return;
        }
      }

      if (additionalCost == "" || additionalCost < 0) {
        toast.error("Additional Payment must be valid digits.");
        return;
      }

      if (discount < 0 || discount > 100) {
        toast.error("Discount must be 0-100.");
        return;
      }

      if (discount == "") {
        toast.error("Discount must be valid digits.");
        return;
      }

      rest.add(
        `${INITIAL_URL}/orders/pay/${orderValues.orderId}`,
        orderValues,
        addSuccessAction,
        `Successful order transaction for ${orderValues.orderId} for Table ${orderValues.tableNumber}.`
      );
    };
  //success
  const addSuccessAction = () => {
    // console.log(pdfPaymentRows);
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
  const getChange = (discountedPrice, totalCost) => {
    const beforeCheckChange = 0;
    if (discountedPrice != 0) {
      beforeCheckChange = (customerPayment - discountedPrice).toFixed(2);
    } else {
      beforeCheckChange = (customerPayment - totalCost).toFixed(2);
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
    setChange(0.0);
    setAdditionalCost("");
    setCustomerPayment("");
    setDiscount("");
    setDiscountedPrice(0.0);
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
  };

  useEffect(() => {
    createNewCols();
  }, [orderTabItems]);

  useEffect(() => {
    setTotalCost(subTotal);
  }, [subTotal]);

  useEffect(() => {
    if (
      (discount != 0 || discount != "") &&
      Number(
        (
          parseFloat(totalCost) -
          parseFloat(totalCost) * (discount / 100)
        ).toFixed(2)
      ) != totalCost
    ) {
      setDiscountedPrice(
        Number(
          (
            parseFloat(totalCost) -
            parseFloat(totalCost) * (discount / 100)
          ).toFixed(2)
        )
      );
    } else if (discount == 0) {
      setDiscountedPrice(Number(0.0));
    }
  }, [discount, additionalCost]);

  useEffect(() => {
    getChange(discountedPrice, totalCost, customerPayment);
  }, [discountedPrice, totalCost, customerPayment]);

  useEffect(() => {
    setOrderValues({
      ...orderValues,
      payment: Number(parseFloat(customerPayment).toFixed(2)),
      discount: Number(parseFloat(discount).toFixed(2)),
      totalCost: Number(parseFloat(totalCost).toFixed(2)),
      additionalPayment: Number(parseFloat(additionalCost).toFixed(2)),
    });
  }, [additionalCost, customerPayment, discount]);

  useEffect(() => {
    setPdfPaymentRows([
      {
        label: "Additional Cost",
        data: parseFloat(orderValues.additionalPayment).toFixed(2),
      },
      {
        label: "Total Cost",
        data: parseFloat(orderValues.totalCost).toFixed(2),
      },
      {
        label: "Discounted Price",
        data: parseFloat(discountedPrice).toFixed(2),
      },
      {
        label: "Customer Payment",
        data: parseFloat(orderValues.payment).toFixed(2),
      },
      {
        label: "Change",
        data: change,
      },
      {
        label: "Cashier",
        data: orderValues.employeeFullName,
      },
    ]);
  }, [orderValues]);

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
            </div>
            <div className={styles["Text-Section"]}>
              <div className={styles["Input-Section"]}>
                <TextField
                  variant="outlined"
                  size="small"
                  label="Additional Cost"
                  value={additionalCost}
                  onChange={handleAdditionalCostOnChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <Icon icon="clarity:peso-line" />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  type="number"
                />
              </div>
              <div className={styles["Input-Section"]}>
                <TextField
                  variant="outlined"
                  size="small"
                  label="Customer Payment "
                  value={customerPayment}
                  onChange={handleCustomerPaymentOnChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <Icon icon="clarity:peso-line" />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  type="number"
                />
              </div>
              <div className={styles["Input-Section"]}>
                <TextField
                  variant="outlined"
                  size="small"
                  label="Discount"
                  value={discount}
                  onChange={handleDiscountOnChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon icon="bi:percent" />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  type="number"
                />
              </div>
              <div className={styles["Output-Section"]}>
                <div className={styles["Output-Section__label"]}>Subtotal</div>
                <div className={styles["Output-Section__label"]}>
                  ₱{subTotal}
                </div>
              </div>
              <div className={styles["Output-Section"]}>
                <div className={styles["Output-Section__label"]}>Total</div>
                <div className={styles["Output-Section__label"]}>
                  ₱{totalCost}
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
                <div className={styles["Output-Section__label"]}>Change</div>
                <div className={styles["Output-Section__label"]}>
                  ₱{parseFloat(change).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          <div className={styles["modal__footer"]}>
            <button
              className={styles["Confirm_Button"]}
              onClick={() =>
                // additionalCost,
                // customerPayment,
                // discount,
                // discountedPrice,
                // totalCost
                payButtonOnClick()
              }
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

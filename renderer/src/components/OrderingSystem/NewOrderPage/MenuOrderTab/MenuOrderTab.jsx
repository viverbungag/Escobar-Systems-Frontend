import React, { useState, useEffect } from "react";
import styles from "./MenuOrderTab.module.scss";
import Image from "next/image";
import MenuOrderTabCard from "./MenuOrderTabCard/MenuOrderTabCard.jsx";
import shortid from "shortid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import { useUser } from "../../../contexts/UserContext";
import { printReceipt } from "../../../../../print/printFunctions";
import trashCan from "@iconify/icons-akar-icons/trash-can";
import chevronRight from "@iconify/icons-akar-icons/chevron-right";
import { useRadioGroup } from "@mui/material/RadioGroup";
import { FormLabel } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { RadioGroup } from "@mui/material";
import { Radio } from "@mui/material";
import { InputAdornment, TextField } from "@mui/material";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function validIntegerDecimal(data) {
  return /^[0-9]\d*(\.\d+)?$/.test(data);
}

const MenuOrderTab = ({
  menuOnCategory,
  handleQuantityOnChange,
  handleDeleteItemButtonOnClick,
  deleteAllItemOnClick,
  payButtonOnClick,
  allUnpaidOrders,
  selectedOrder,
  handleSelectedOrderOnChange,
  type,
  handleTypeChange,
  orderDiscount,
  selectedTableNumber,
  handleSelectedTableNumberOnChange,
  availableTableNumbers,
  servingType,
  handleServingTypeOnChange,
}) => {
  // const [arrChangeDiscountedPrice, setArrChangeDiscountedPrice] = useState([]);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [customerPayment, setCustomerPayment] = useState("");
  const [discountPayment, setDiscountPayment] = useState("");
  const [additionalPayment, setAdditionalPayment] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState("");

  const { employeeName } = useUser();

  const [pickUpFormat, setPickUpFormat] = useState("DineIn");
  const handlePickUpFormat = (event) => setPickUpFormat(event.target.value);

  const setInitialValues = () => {
    setTotal(subTotal);
    setChange(0.0);
    setAdditionalPayment("");
    setCustomerPayment("");
    setDiscountPayment("");
    setDiscountedPrice(0.0);
    setSubTotal(
      menuOnCategory.orderMenu.reduce(
        (sum, currentMenu) =>
          sum + currentMenu.menuPrice * currentMenu.orderMenuQuantity,
        0
      )
    );
  };

  const handleClose = () => {
    setOpen(false);
    setInitialValues();
  };

  const handleOpen = () => {
    if (menuOnCategory.orderMenu.length === 0) {
      toast.error("There should atleast be 1 menu item");
      return;
    }

    if (type === "existing-user" && selectedOrder === "") {
      toast.error("Please select from the existing orders");
      return;
    }

    if (type === "new-user") {
      setOpen(true);
      setTotal(parseFloat(subTotal).toFixed(2));
    } else {
      payButtonOnClick(
        customerPayment,
        discountPayment,
        additionalPayment,
        handleClose
      );
    }
  };

  const [change, setChange] = useState(0);

  const getChange = () => {
    const beforeCheckChange = 0;
    if (discountedPrice != 0) {
      beforeCheckChange = (customerPayment - discountedPrice).toFixed(2);
    } else {
      beforeCheckChange = (customerPayment - total).toFixed(2);
    }
    if (beforeCheckChange >= 0) {
      setChange(beforeCheckChange);
    } else if (beforeCheckChange < 0) {
      setChange(0);
    }
  };

  const handleAdditionalPaymentOnChange = (e) => {
    setAdditionalPayment(e.target.value);
    if (e.target.value != 0 || e.target.value != "") {
      setTotal((parseFloat(subTotal) + parseFloat(e.target.value)).toFixed(2));
    } else {
      setTotal(subTotal);
    }
  };
  const handleCustomerPaymentOnChange = (e) => {
    setCustomerPayment(e.target.value);
  };
  const handleDiscountOnChange = (e) => {
    setDiscountPayment(e.target.value);
  };

  // const arr = [];
  // const createNewCols = () => {
  //   menuOnCategory.orderMenu.map((item) => {
  //     console.log(item);
  //     arr.push({
  //       menuName: item.menuName,
  //       menuQuantity: item.menuQuantity,
  //       menuPrice: item.menuPrice,
  //     });
  //   });
  //   setPdfRows(arr);
  // };

  // const pdfColumns = [
  // 	{ header: "Item", dataKey: "menuName" },
  // 	{ header: "Quantity", dataKey: "menuQuantity" },
  // 	{ header: "Price", dataKey: "menuPrice" },
  // ];
  // const [pdfRows, setPdfRows] = useState([]);
  // const pdfPaymentColumns = [
  // 	{ header: "", dataKey: "label" },
  // 	{ header: "", dataKey: "data" },
  // ];
  // const pdfPaymentRows = [
  // 	{ label: "Customer Payment", data: customerPayment.toFixed(2) },
  // 	{ label: "Discount", data: `${discountedPrice}%` },
  // 	{ label: "Total", data: totalPrice.toFixed(2) },
  // 	{ label: "Change", data: change.toFixed(2) },
  // 	{ label: "Cashier", data: employeeName },
  // ];

  useEffect(() => {
    setSubTotal(
      menuOnCategory.orderMenu.reduce(
        (sum, currentMenu) =>
          sum + currentMenu.menuPrice * currentMenu.orderMenuQuantity,
        0
      )
    );
  }, [menuOnCategory]);

  useEffect(() => {
    if (
      (discountPayment != 0 || discountPayment != "") &&
      Number(
        (
          parseFloat(total) -
          parseFloat(total) * (discountPayment / 100)
        ).toFixed(2)
      ) != total
    ) {
      setDiscountedPrice(
        Number(
          (
            parseFloat(total) -
            parseFloat(total) * (discountPayment / 100)
          ).toFixed(2)
        )
      );
    } else if (discountPayment == 0) {
      setDiscountedPrice(Number(0.0));
    }
  }, [discountPayment, additionalPayment]);

  useEffect(() => {
    getChange(discountedPrice, total, customerPayment);
  }, [discountedPrice, total, customerPayment]);

  // useEffect(() => {
  // 	createNewCols();
  // }, [menuOnCategory.orderMenu]);
  return (
    <div className={styles["MenuOrderTab"]}>
      <div className={styles["txt-section"]}>
        <div className={styles["txt-section__top"]}>
          <ToggleButtonGroup
            className={"toggle_group"}
            value={type}
            exclusive
            onChange={handleTypeChange}
          >
            <ToggleButton value="new-user">New Order</ToggleButton>
            <ToggleButton value="existing-user">Existing Order</ToggleButton>
          </ToggleButtonGroup>
          <button onClick={deleteAllItemOnClick}>
            <Icon icon={trashCan} height="24" width="24" />
          </button>
        </div>
        <Box
          sx={{ minWidth: 120, padding: 1 }}
          className={[
            styles["InputLabel"],
            type === "new-user" && styles["none"],
          ].join(" ")}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Table number
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedOrder}
              label="Select Table number"
              onChange={handleSelectedOrderOnChange}
            >
              {allUnpaidOrders.map((item) => {
                return (
                  <MenuItem key={item.orderId} value={item.orderId}>
                    {`Table #${item.tableNumber}`}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </div>

      <div className={styles["container"]}>
        {menuOnCategory.orderMenu.map((item) => {
          return (
            <div
              className={styles["container-section"]}
              key={shortid.generate()}
            >
              <MenuOrderTabCard
                title={item.menuName}
                price={item.menuPrice}
                quantity={item.orderMenuQuantity}
                quantityOnChange={handleQuantityOnChange}
                handleDeleteItemButtonOnClick={handleDeleteItemButtonOnClick}
              />
            </div>
          );
        })}
      </div>
      <div className={styles["total-section"]} onClick={handleOpen}>
        <div className={styles["total-section--wrapper"]}>
          <h1> ₱ {subTotal}</h1>
          <div className={styles["pay-section"]}>
            <h2> Pay </h2>
            <Icon icon={chevronRight} height="16" width="16" color="white" />
          </div>
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box className={styles["modal"]}>
          <div className={styles["modal__title-bar"]}>
            <Button onClick={handleClose} className={styles["close-button"]}>
              {" "}
              X{" "}
            </Button>
          </div>
          <div className={styles["modal__container"]}>
            <FormControl className={styles["radio"]}>
              <FormLabel
                sx={{
                  color: "#003049",
                  "&.Mui-checked": { color: "#003049;" },
                }}
                id="demo-radio-buttons-group-label"
              >
                Pickup Format
              </FormLabel>
              <RadioGroup
                className={styles["radio-container"]}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={servingType}
                name="radio-buttons-group"
                onChange={handleServingTypeOnChange}
              >
                <FormControlLabel
                  control={
                    <Radio
                      sx={{
                        color: "#003049;",
                        "&.Mui-checked": { color: "#003049;" },
                      }}
                      value="TAKE_OUT"
                    />
                  }
                  label="Take-Out"
                />
                <FormControlLabel
                  sx={{ color: "#003049;" }}
                  control={
                    <Radio
                      sx={{
                        color: "#003049;",
                        "&.Mui-checked": { color: "#003049;" },
                      }}
                      value="DINE_IN"
                    />
                  }
                  label="Dine-In"
                />
                {/* <FormControlLabel sx = {{ color: "#003049;"}} value="Delivery" control={<Radio sx = {{ color: "#003049;", '&.Mui-checked': {color: "#003049;",},}}/>}  label="Other" /> */}
              </RadioGroup>
            </FormControl>
            {servingType === "DINE_IN" && (
              <FormControl className={styles["modal__select"]}>
                <InputLabel id="demo-simple-select-label">
                  Select Table Number
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedTableNumber}
                  defaultValue={availableTableNumbers[0]}
                  label="Select Order Menu"
                  onChange={handleSelectedTableNumberOnChange}
                >
                  {availableTableNumbers.map((number) => {
                    return (
                      <MenuItem key={number} value={number}>
                        {`Table #${number}`}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
            {servingType === "TAKE_OUT" && (
              <div className={styles["modal__form"]}>
                <div className={styles["modal__textfield"]}>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Discount"
                    type="number"
                    value={discountPayment}
                    onChange={handleDiscountOnChange}
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

                <div className={styles["modal__textfield"]}>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Customer Payment "
                    name="payment"
                    type="number"
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
                  />
                </div>

                <div className={styles["modal__textfield"]}>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Additional Cost"
                    type="number"
                    value={additionalPayment}
                    onChange={handleAdditionalPaymentOnChange}
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

                <div className={styles["modal__data"]}>
                  <div className={styles["modal__data__label"]}>Subtotal</div>
                  <div className={styles["modal__data__label"]}>
                    ₱{parseFloat(subTotal).toFixed(2)}
                  </div>
                </div>

                <div className={styles["modal__data"]}>
                  <div className={styles["modal__data__label"]}>
                    Discounted Price
                  </div>
                  <div className={styles["modal__data__label"]}>
                    ₱{parseFloat(discountedPrice).toFixed(2)}
                  </div>
                </div>

                <div className={styles["modal__data"]}>
                  <div className={styles["modal__data__label"]}>
                    Current Total
                  </div>
                  <div className={styles["modal__data__label"]}>₱{total}</div>
                </div>

                <div className={styles["modal__data"]}>
                  <div className={styles["modal__data__label"]}>Change</div>
                  <div className={styles["modal__data__label"]}>
                    ₱{parseFloat(change).toFixed(2)}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={styles["modal__footer"]}>
            <Button
              onClick={
                () =>
                  payButtonOnClick(
                    customerPayment,
                    discountPayment,
                    additionalPayment,
                    handleClose
                  )
                // () => console.log(discountPayment)
              }
              className={styles["confirm-button"]}
            >
              Confirm
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MenuOrderTab;

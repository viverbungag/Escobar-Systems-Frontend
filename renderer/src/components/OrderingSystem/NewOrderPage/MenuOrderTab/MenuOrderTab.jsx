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
	selectedTableNumber,
	handleSelectedTableNumberOnChange,
	availableTableNumbers,
	servingType,
	handleServingTypeOnChange,
}) => {
	// const [arrChangeDiscountedPrice, setArrChangeDiscountedPrice] = useState([]);
	const [total, setTotal] = useState(0);
	const [open, setOpen] = React.useState(false);
	const [customerPayment, setCustomerPayment] = useState(0);
	const [discountPayment, setDiscountPayment] = useState(0);
	const [additionalPayment, setAdditionalPayment] = useState(0);
	const [subTotal, setSubTotal] = useState(0);
	const [discountedPrice, setDiscountedPrice] = useState(0.0);

	// const [discountedPrice, setDiscountedPrice] = useState(0);
	// // const totalPrice = total - total * (discountPayment / 100);
	const { employeeName } = useUser();

	const [pickUpFormat, setPickUpFormat] = useState("DineIn");
	const handlePickUpFormat = (event) => setPickUpFormat(event.target.value);

	const resetTextFieldValues = () => {
		setCustomerPayment(0);
		setDiscountPayment(0);
		setAdditionalPayment(0);
		setTotal(0);
		setDiscountedPrice(0);
		setChange(0);
		orderValues.payment = 0;
		orderValues.discount = 0;
		orderValues.additionalPayment = 0;
	};

	const handleClose = () => {
		setOpen(false);
		resetTextFieldValues();
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
	const [orderValues, setOrderValues] = useState([]);
	const [change, setChange] = useState(0);
	const [discountError, setDiscountError] = useState("");
	const [paymentError, setPaymentError] = useState("");
	const [additionalError, setAdditionalError] = useState("");

	const getChange = () => {
		const beforeCheckChange = 0;
		if (discountedPrice != 0) {
			beforeCheckChange = (orderValues.payment - discountedPrice).toFixed(2);
		} else {
			beforeCheckChange = (orderValues.payment - total).toFixed(2);
		}
		if (beforeCheckChange >= 0) {
			setChange(beforeCheckChange);
		} else if (beforeCheckChange < 0) {
			setChange(0);
		}
	};

	const addvalues = () => {
		setCustomerPayment(orderValues.payment);
		setDiscountPayment(orderValues.discount);
		setAdditionalPayment(orderValues.additionalPayment);
	};

	const handleCustomerPaymentOnChange = (event) => {
		setCustomerPayment(event.target.value);
	}


	const handleInputChange = (e) => {
		if (e.target.name === "discount") {
			if (e.target.value == 0 || e.target.value == "") {
				setDiscountError("");
				setDiscountedPrice(parseFloat(0).toFixed(2));
				getChange();

				if (orderValues.payment - total < 0) {
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
					getChange();
					setDiscountedPrice(
						(
							parseFloat(total) -
							parseFloat(total) * (parseFloat(e.target.value) / 100)
						).toFixed(2)
					);
					getChange();

					if (
						orderValues.payment -
							(
								parseFloat(total) -
								parseFloat(total) * (parseFloat(e.target.value) / 100)
							).toFixed(2) >=
						0
					) {
						setDiscountError("");
						setPaymentError("");
						setDiscountedPrice(
							(
								parseFloat(total) -
								parseFloat(total) * (parseFloat(e.target.value) / 100)
							).toFixed(2)
						);
						getChange();
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
			setCustomerPayment(e.target.value);
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
						setTotal(total);
						getChange();
						setPaymentError("");
					}
				} else if (parseFloat(total) > 0) {
					if (parseFloat(e.target.value) - total < 0) {
						setPaymentError("Payment must be greater or equal the total cost.");
					} else {
						setTotal(total);
						getChange();
						setPaymentError("");
					}
				}
			} else {
				setPaymentError("");
				getChange();
			}
		}

		if (e.target.name === "additionalPayment") {
			if (e.target.value == 0 || e.target.value == "") {
				getChange();
				setAdditionalError("");
			} else if (validIntegerDecimal(e.target.value)) {
				setTotal(
					(parseFloat(e.target.value) + parseFloat(subTotal)).toFixed(2)
				);
				getChange();

				if (discountedPrice != 0 || discountedPrice != "") {
					if (orderValues.payment - discountedPrice >= 0) {
						setAdditionalError("");
						setPaymentError("");
					} else {
						setPaymentError(
							"Payment must be greater than or equal to discounted price."
						);
					}
				} else if (
					(parseFloat(e.target.value) + parseFloat(subTotal)).toFixed(2) -
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
						getChange();
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
		addvalues();

		setOrderValues({
			...orderValues,
			[e.target.name]: e.target.value,
		});

		// setArrChangeDiscountedPrice({
		// 	change: change,
		// 	discountedPrice: discountedPrice,
		// });
	};

	const payButton = () => {

		// if (orderValues.payment === "" || orderValues.payment === 0) {
		// 	setPaymentError("Input cannot be empty.");
		// 	return;
		// }
		// if (additionalError !== "" || discountError !== "" || paymentError !== "") {
		// 	return;
		// }

		// setCustomerPayment(Number(customerPayment));
		// setDiscountPayment(Number(discountPayment));
		// setAdditionalPayment(Number(additionalPayment));

		// payButtonOnClick(
		// 	customerPayment,
		// 	discountPayment,
		// 	additionalPayment,
		// 	handleClose
		// );
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
        <Box className={styles["style"]}>
          <Button onClick={handleClose} className={styles["Close_Button"]}>
            X
          </Button>
          <div className={styles["Wrapper"]}>
            <div className={styles["Text-Section"]}>
              <FormControl className={styles["Radio"]}>
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
                <FormControl className={styles["TableNumber"]}>
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
                    {/* {Array.from({ length: 100 }, (_, i) => i+1).filter((number) => unavailableTable.includes(number))} */}
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
            </div>
            {servingType === "TAKE_OUT" && (
              <div className={styles["Input-Text-Section"]}>
                <div className={styles["Input-Section"]}>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Discount"
                    name="discount"
                    type="number"
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
                    type="number"
                    value={customerPayment}
                    helperText={paymentError}
                    error={paymentError != ""}
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

                <div className={styles["Input-Section"]}>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Additional Payment"
                    name="additionalPayment"
                    type="number"
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
                    Current Total
                  </div>
                  <div className={styles["Output-Section__label"]}>
                    ₱{total}
                  </div>
                </div>
              </div>
            )}

            <div className={styles["Button-Section"]}>
              <Button
                onClick={() =>
                  payButtonOnClick (
                    customerPayment,
                    discountPayment,
                    additionalPayment,
                    handleClose
                  )
                }
                className={styles["Confirm_Button"]}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MenuOrderTab;

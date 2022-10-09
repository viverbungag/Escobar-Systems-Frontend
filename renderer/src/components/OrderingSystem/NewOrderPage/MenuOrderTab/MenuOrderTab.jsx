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

const MenuOrderTab = ({
  menuOnCategory,
  handleQuantityOnChange,
  handleDeleteItemButtonOnClick,
  deleteAllItemOnClick,
  payButtonOnClick,
  allOrders,
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
  const [total, setTotal] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [customerPayment, setCustomerPayment] = useState(0);
  const [discountPayment, setDiscountPayment] = useState(0);
  const [additionalPayment, setAdditionalPayment] = useState(0);
  const SubTotal = total;
  const discountedPrice = total * (discountPayment / 100);
  const totalPrice = total - total * (discountPayment / 100);
  const change = customerPayment - (total - discountPayment);
  const { employeeName } = useUser();

  // const [pickUpFormat, setPickUpFormat] = useState("DineIn");
  // const handlePickUpFormat = (event) => setPickUpFormat(event.target.value);

  const handleClose = () => {
    setOpen(false);
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
    } else {
      payButtonOnClick(
        customerPayment,
        discountPayment,
        additionalPayment,
        handleClose
      );
    }
  };
  const customerPaymentOnChange = (e) => {
    setCustomerPayment(e.target.value);
  };
  const discountPaymentOnChange = (e) => {
    setDiscountPayment(e.target.value);
  };
  const additionalPaymentOnChange = (e) => {
    setAdditionalPayment(e.target.value);
  };

  const arr = [];
  const createNewCols = () => {
    menuOnCategory.orderMenu.map((item) => {
      console.log(item);
      arr.push({
        menuName: item.menuName,
        menuQuantity: item.menuQuantity,
        menuPrice: item.menuPrice,
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
    { label: "Discount", data: `${discountedPrice}%` },
    { label: "Total", data: totalPrice.toFixed(2) },
    { label: "Change", data: change.toFixed(2) },
    { label: "Cashier", data: employeeName },
  ];

  useEffect(() => {
    setTotal(
      menuOnCategory.orderMenu.reduce(
        (sum, currentMenu) =>
          sum + currentMenu.menuPrice * currentMenu.orderMenuQuantity,
        0
      )
    );
  }, [menuOnCategory]);

  useEffect(() => {
    createNewCols();
  }, [menuOnCategory.orderMenu]);

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
              Select Order Menu
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedOrder}
              label="Select Order Menu"
              onChange={handleSelectedOrderOnChange}
            >
              {allOrders.map((item) => {
                return (
                  <MenuItem key={item.orderId} value={item.orderId}>
                    {`Order #${item.orderId}`}{" "}
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
          <h1> ₱ {total}</h1>
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
                    sx={{ color: "#003049;" }}
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
              <div className={styles["Input-Section"]}>
                <div className={styles["Input-Section--Payment"]}>
                  <h1> Input the Customer Payment : </h1>
                  <input
                    value={customerPayment}
                    onChange={customerPaymentOnChange}
                    type="text"
                    id="first"
                    className={styles["Input-Forms--Payment"]}
                    placeholder="Input the money of the customer"
                  />
                </div>

                <div className={styles["Input-Section--Discount"]}>
                  <p> Input Discount Value : </p>
                  <input
                    value={discountPayment}
                    onChange={discountPaymentOnChange}
                    type="text"
                    id="first"
                    className={styles["Input-Forms--Discount"]}
                    placeholder="Input Percentage of the Discount"
                  />
                  <h1 className={styles["Percentage"]}> % </h1>
                </div>

                <div className={styles["Input-Section--Payment"]}>
                  <h1> Input the Additional Payment : </h1>
                  <input
                    value={additionalPayment}
                    onChange={additionalPaymentOnChange}
                    type="text"
                    id="first"
                    className={styles["Input-Forms--Payment"]}
                    placeholder="Input the money of the customer"
                  />
                </div>
              </div>
            )}

            <div className={styles["Button-Section"]}>
              <Button
                onClick={() => {
                  payButtonOnClick(
                    customerPayment,
                    discountPayment,
                    additionalPayment,
                    handleClose
                  );
                }}
                className={styles["Confirm_Button"]}
              >
                Confirm
              </Button>
            </div>
            {/* <ChildModal
                className={styles["Confirm_Button"]}
                payButtonOnClick={payButtonOnClick}
                total={total}
                customerPayment={customerPayment}
                handleMainModalClose={handleClose}
                discountPayment={discountPayment}
                menuOnCategory={menuOnCategory}
                type={type}
                orderDiscount={orderDiscount}
              /> */}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

// function ChildModal({payButtonOnClick, total, customerPayment, handleMainModalClose, discountPayment, menuOnCategory, type, orderDiscount}) {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => {
// if (isNaN(customerPayment)){
//   if (customerPayment.substring(0, 1) === "₱"){
//     toast.error(" Please remove the ₱ Sign ");
//   }
//   else{
//     toast.error(" The Customer Payment must be a number");
//   }
// }
// else if (isNaN(discountPayment)){
//   toast.error("Please Input a Number for the Discount Value");
// }
// else{

//   if (total > customerPayment){
//     toast.error(" The Customer Payment must be higher than the total");

//   }
//   else if (customerPayment < 0){
//     toast.error(" The Customer Payment should be higher than 0");
//   }
//   else{
//     if (discountPayment < 0) {
//       toast.error(" Discount should be higher than 0");
//     }
//     else{
//       setOpen(true);
//     }
//   }
// }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     payButtonOnClick(customerPayment, discountPayment)
//     handleMainModalClose()

//   };

//   return (
//     <React.Fragment>
//       <Button className={styles['Confirm_Button']} onClick={handleOpen}>Confirm</Button>

//       <Modal hideBackdrop open={open} onClose={handleClose}>
//         <Box className={styles['child-style']}>
//           <div className={styles['Image-Section']}>
//             <Image
//                 src="/OrderingSystem/images/logo.png"
//                 alt="Escobar Logo"
//                 width="40"
//                 height="40"
//                 objectFit="contain"
//             />
//           </div>
//         <Button onClick={handleClose} className={styles['Close_Button']}> X </Button>

//           <div className={styles['Wrapper']}>

//                 <div className={styles['Text-Section']}>
//                   <h1 className={styles['Order-Text']}>{dayjs().format('YYYY / MM / DD – HH:MM')}</h1>
//                   {/* <h1  className={styles['Date-Text']}> {`${new Date().getFullYear()} / ${new Date().getMonth()} / ${new Date().getDate()}`} </h1> */}
//                 </div>

//                 <div className={styles['Title-Section']}>
//                   <h2 className={styles['Qty-Text']}> Qty </h2>
//                   <h2  className={styles['Title-Text']}> Item Title  </h2>
//                   <h2 className={styles['Price-Text']}> Price  </h2>
//                 </div>

//                 {menuOnCategory.orderMenu.map((item) => {
//                   return (
//                     <div className={styles["Component-Section"]} key={shortid.generate()}>
//                       <h6 className={styles['Quantity-Component']}>{item.orderMenuQuantity} </h6>
//                       <h6 className={styles['Menuname-Component']}>{item.menuName}</h6>
//                       <h6 className={styles['Price-Component']}> {item.menuPrice}</h6>
//                     </div>
//                   );
//                 })}

//                 <div className={styles['CustomerPayment-Section']}>
//                   <h2 className={styles['CustomerPayment']}> Customer Payment </h2>
//                   <h2 className={styles['CustomerPaymentPrice']}> ₱ {(customerPayment)}  </h2>
//                 </div>

//                 <div className={styles['Subtotal-Section']}>
//                   <h2 className={styles['Subtotal']}> SubTotal </h2>
//                   <h2  className={styles['SubtotalPrice']}> ₱ {(total)}  </h2>
//                 </div>

//                 <div className={styles['Discounted-Section']}>
//                   <h2 className={styles['Discount']}> Discounted Price </h2>
//                   <h2  className={styles['DiscountPrice']}> ₱ {type === "new-user" ? (total * (discountPayment/100)).toFixed(2) : (total * (orderDiscount/100)).toFixed(2)}  </h2>
//                 </div>

//                 <div className={styles['Total-Section']}>
//                   <h2 className={styles['Total']}> Total </h2>
//                   <h2  className={styles['TotalPrice']}> ₱ {type === "new-user" ? (total - (total * (discountPayment/100))).toFixed(2): (total - (total * (orderDiscount/100))).toFixed(2)}  </h2>
//                 </div>

//                 <div className={styles['Change-Section']}>
//                   <h2 className={styles['Change']}> Change </h2>
//                   <h2  className={styles['ChangePrice']}> ₱ {(customerPayment - (total - discountPayment)).toFixed(2)}  </h2>
//                 </div>

//             </div>
//         </Box>
//       </Modal>
//     </React.Fragment>
//   );
// }

export default MenuOrderTab;

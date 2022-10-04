import React, { useEffect, useState } from 'react'
import styles from './PaymentOrderTab.module.scss';
import PaymentOrderTabCard from "./PaymentOrderTabCard/PaymentOrderTabCard";
import shortid from 'shortid';
import {Icon} from '@iconify/react';
import { printReceipt } from '../../../../../print/printFunctions';
import { useUser } from "../../../contexts/UserContext";

const PaymentOrderTab = ({orderTabItems, orderCardSelected, orderDiscount, customerPayment, totalPayment}) => {
  const { employeeName } = useUser();
  const subTotal = orderTabItems.reduce(
    (sum, currentMenu) =>
      sum + currentMenu.foodOrder.menu.menuPrice * currentMenu.foodOrder.menuQuantity,
    0
  );
  const discountedPrice = subTotal * (orderDiscount / 100)
  const totalPrice = subTotal - subTotal * (orderDiscount / 100);
  const change = customerPayment - (subTotal - orderDiscount);
  
  const arr = [];
  const createNewCols = () => {
    orderTabItems.map((item) => {
      console.log(item.foodOrder.menu)
      arr.push(
        {
          menuName: item.foodOrder.menu.menuName,
          menuQuantity: item.foodOrder.menuQuantity,
          menuPrice: item.foodOrder.menu.menuPrice
        }
      )
    })
    setPdfRows(arr);
  }

  //for pdf
  const pdfColumns = [
    { header:"Item", dataKey: 'menuName' },
    { header:"Quantity", dataKey: 'menuQuantity' },
    { header:"Price", dataKey: 'menuPrice' }
  ]
  const [pdfRows, setPdfRows] = useState([]);
  const pdfPaymentColumns = [
    { header: '', dataKey: 'label' },
    { header: '', dataKey: 'data' }
  ]
  const pdfPaymentRows = [
    { label: 'Customer Payment', data: customerPayment },
    { label: 'SubTotal', data: subTotal },
    { label: 'Discounted Price', data: discountedPrice },
    { label: 'Total', data: totalPrice },
    { label: 'Change', data: change },
    { label: 'Cashier', data: employeeName }
  ]
  //

  useEffect(() => {
    createNewCols();
  }, [orderTabItems])

  return (
    <div
      className={[
        styles["PaymentOrderTab"],
        !orderCardSelected && styles["none"],
      ].join(" ")}
    >
      <div className={styles["orderno-section"]}>
        <h1> Order # {orderCardSelected} </h1>
        <Icon
          icon="bytesize:print"
          height="25"
          width="25"
          className={[
            styles["print-icon"],
            !orderCardSelected && styles["print-none"],
          ].join(" ")}
          onClick={
            () => printReceipt(orderCardSelected, pdfRows, pdfColumns, pdfPaymentRows, pdfPaymentColumns)
            // () => console.log(pdfRows)
          }
        />
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
              <PaymentOrderTabCard
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
          styles["CustomerPayment-Section"],
          !orderCardSelected && styles["none"],
        ].join(" ")}
      >
        <h2 className={styles["CustomerPayment"]}> Customer Payment </h2>
        <h2 className={styles["CustomerPaymentPrice"]}> {customerPayment} </h2>
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

      <div
        className={[
          styles["Discounted-Section"],
          !orderCardSelected && styles["none"],
        ].join(" ")}
      >
        <h2 className={styles["Discount"]}> Discounted Price </h2>
        <h2 className={styles["DiscountPrice"]}>
          {(subTotal * (orderDiscount / 100)).toFixed(2)}
        </h2>
      </div>

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

      <div
        className={[
          styles["Change-Section"],
          !orderCardSelected && styles["none"],
        ].join(" ")}
      >
        <h2 className={styles["Change"]}> Change </h2>
        <h2 className={styles["ChangePrice"]}>
          {(customerPayment - (subTotal - orderDiscount)).toFixed(2)}
        </h2>
      </div>
    </div>
  );
}

export default PaymentOrderTab


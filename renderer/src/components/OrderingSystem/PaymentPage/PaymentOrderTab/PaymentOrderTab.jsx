import React from 'react'
import styles from './PaymentOrderTab.module.scss';
import PaymentOrderTabCard from "./PaymentOrderTabCard/PaymentOrderTabCard";
import shortid from 'shortid';
import {Icon} from '@iconify/react';

const PaymentOrderTab = ({orderTabItems, orderCardSelected, orderDiscount, customerPayment, totalPayment}) => {
  const title = 'Escobar - Employee Attendance Data';
  const pdfColumns = [
    { header:"ID", dataKey: 'employeeAttendanceJoinId' },
    { header:"Name", dataKey: 'employeeName' },
    { header:"Time", dataKey: 'attendanceTime' },
    { header:"Type", dataKey: 'attendanceType' }
  ]
  //
  const subTotal = orderTabItems.reduce(
    (sum, currentMenu) =>
      sum + currentMenu.foodOrder.menu.menuPrice * currentMenu.foodOrder.menuQuantity,
    0
  );

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
          onClick={() => printPdf(title)}
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
          {subTotal * (orderDiscount / 100)}
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
          {subTotal - subTotal * (orderDiscount / 100)}
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
          {customerPayment - (subTotal - orderDiscount)}
        </h2>
      </div>
    </div>
  );
}

export default PaymentOrderTab


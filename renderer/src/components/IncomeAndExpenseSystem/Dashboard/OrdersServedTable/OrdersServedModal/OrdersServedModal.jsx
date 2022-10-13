import React, { useState, useEffect } from "react";
import styles from "./OrdersServedModal.module.scss";

export default function OrdersServedModal({ selected, ordersServed }) {
  const [values, setValues] = useState([]);
  const getValues = () => {
    ordersServed.map((item) => {
      if (item.orderID == selected) {
        setValues({
          orderID: item.orderID,
          orderTime: item.orderTime,
          servingType: item.servingType,
          tableNumber: item.tableNumber,
          paymentStatus: item.paymentStatus,
          employeeName: item.employeeName,
        });
      }
    });
  };
  useEffect(() => {
    getValues();
  }, []);
  return (
    <div className={styles["container"]}>
      {console.log(ordersServed)}
      <div className={styles["container__header"]}>Order {values.orderID}</div>
      <div className={styles["container__content"]}>
        <div className={styles["container_group"]}>
          <div className={styles["container__label"]}>Date & Time</div>
          <div className={styles["container__info"]}>{values.orderTime}</div>
        </div>
        <div className={styles["container__group"]}>
          <div className={styles["container__label"]}>Serving Type</div>
          <div className={styles["group_info"]}>{values.servingType}</div>
        </div>
        <div className={styles["container__group"]}>
          <div className={styles["container__label"]}>Table No.</div>
          <div className={styles["container__info"]}>{values.tableNumber}</div>
        </div>
        <div className={styles["container__group"]}>
          <div className={styles["container__label"]}>Payment Status</div>
          <div className={styles["container__info"]}>
            {values.paymentStatus}
          </div>
        </div>
        <div className={styles["container__group"]}>
          <div className={styles["container__label"]}>In-Charge</div>
          <div className={styles["container__info"]}>{values.employeeName}</div>
        </div>
      </div>
    </div>
  );
}

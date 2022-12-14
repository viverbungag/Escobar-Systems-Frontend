import React, { useState, useEffect } from "react";
import styles from "./ExpenseMoreInfo.module.scss";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EventIcon from "@mui/icons-material/Event";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import dateFormat from "dateformat";
import { Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ExpenseMoreInfo({ selected, expenseData }) {
  const [values, setValues] = useState([]);
  const getValues = () => {
    expenseData.map((item) => {
      if (item.transactionId == selected) {
        setValues({
          id: item.transactionId,
          transactionDate: dateFormat(item.transactionDate, "yyyy-mm-dd"),
          transactionSupplyQuantity: item.transactionSupplyQuantity,
          supplyName: item.supplyName,
          supplierName: item.supplierName,
          expenseCost: item.expenseCost,
          employeeName: item.employeeName,
        });
      }
    });
  };
  useEffect(() => {
    getValues();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>Stock-In {values.id}</div>
      <div className={styles.content_outer}>
        <div className={styles.content_inner}>
          <div className={styles.content_inner_label}>Details</div>
          <div className={styles.content_inner_row}>
            <Tooltip title="Transaction Date">
              <EventIcon />
            </Tooltip>
            {values.transactionDate}
          </div>
          <div className={styles.content_inner_row}>
            <Tooltip title="Supply Name">
              <Inventory2Icon />
            </Tooltip>
            <div className={styles.content_inner_data}>{values.supplyName}</div>
            <CloseIcon />
            {values.transactionSupplyQuantity}
          </div>
          <div className={styles.content_inner_row}>
            <Tooltip title="Supplier Name">
              <ContactPhoneIcon />
            </Tooltip>
            <div className={styles.content_inner_data}>
              {values.supplierName}
            </div>
          </div>
          <div className={styles.content_inner_row}>
            <Tooltip title="Expense Cost">
              <AttachMoneyIcon />
            </Tooltip>
            <div className={styles.content_inner_data}>
              {values.expenseCost}
            </div>
          </div>
          <div className={styles.content_inner_row}>
            <Tooltip title="Employee In-Charge">
              <AdminPanelSettingsIcon />
            </Tooltip>
            <div className={styles.content_inner_data}>
              {values.employeeName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

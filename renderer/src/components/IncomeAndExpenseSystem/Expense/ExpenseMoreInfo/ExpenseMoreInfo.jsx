import React, { useState, useEffect } from 'react';
import styles from './ExpenseMoreInfo.module.scss';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import dateFormat from 'dateformat';
import { Tooltip } from '@mui/material';

export default function ExpenseMoreInfo({ selected, expenseData }) {
    console.log(expenseData)
    const [values, setValues] = useState([])
    const getValues = () => {
        expenseData.map((item) => {
            if(item.transactionId == selected){
                setValues ({
                    id: item.transactionId,
                    transactionDate: dateFormat(item.transactionDate, "yyyy-mm-dd"),
                    supplyName: item.supplyName,
                    expenseCost: item.expenseCost
                })
            }
        })
    }
    useEffect(() => {
        getValues();
    }, []);

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            Expense Stock-In ID: {values.id}
        </div>
        <div className={styles.content_outer}>
            <div className={styles.content_inner}>
                <div className={styles.content_inner_label}>
                        Expense Details
                </div>
                <div className={styles.content_inner_row}>
                    <Tooltip title="Transaction Date">
                        <EventIcon/>
                    </Tooltip>
                    {values.transactionDate}
                </div>
                <div className={styles.content_inner_row}>
                    <Tooltip title="Supply Name">
                        <Inventory2Icon/>
                    </Tooltip>
                    {values.supplyName}
                </div>
                <div className={styles.content_inner_row}>
                    <Tooltip title="Supplier Information">
                        <ContactPhoneIcon/>
                    </Tooltip>
                    {values.expenseCost} - {values.expenseCost}
                </div>
                <div className={styles.content_inner_row}>
                    <Tooltip title="Expense Cost">
                        <AttachMoneyIcon/>
                    </Tooltip>
                    {values.expenseCost}
                </div>
                <div className={styles.content_inner_row}>
                    <Tooltip title="Employee In Charge">
                        <AdminPanelSettingsIcon/>
                    </Tooltip>
                    {values.expenseCost}
                </div>
            </div>
        </div>  
    </div> 
  )
}

import React, { useState, useEffect } from 'react';
import styles from './ExpenseMoreInfo.module.scss';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EventIcon from '@mui/icons-material/Event';
import { Tooltip } from '@mui/material';

export default function ExpenseMoreInfo({ selectedValues }) {
    const [values, setValues] = useState([])
    const getValues = () => {
        selectedValues.map((item) => {
            setValues({
                id: item.transactionId,
                transactionDate: item.transactionDate,
                supplyName: item.supplyName,
                expenseCost: item.expenseCost
            })
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
            <div className={styles.content_name}>
                {values.fullName}
            </div>
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
                    <Tooltip title="Expense Cost">
                        <AttachMoneyIcon/>
                    </Tooltip>
                    {values.expenseCost}
                </div>
            </div>
        </div>  
    </div> 
  )
}

import React, { useState, useEffect } from 'react';
import styles from './ExpenseEditableMoreInfo.module.scss';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArticleIcon from '@mui/icons-material/Article';
import EventIcon from '@mui/icons-material/Event';
import { Tooltip } from '@mui/material';

export default function ExpenseEditableMoreInfo({ selectedValues }) {
    const [values, setValues] = useState([])
    const getValues = () => {
        selectedValues.map((item) => {
            setValues({
                id: item.expenseId,
                expenseCategoryName: item.expenseCategoryName,
                expenseDescription: item.expenseDescription,
                expenseDate: item.expenseDate,
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
            <div className={styles.content_inner}>
                <div className={styles.content_inner_label}>
                    Expense Details
                </div>
                <div className={styles.content_inner_row}>
                    <Tooltip title="Expense Category">
                        <Inventory2Icon/>
                    </Tooltip>
                    {values.expenseCategoryName}
                </div>
                <div className={styles.content_inner_row}>
                    <Tooltip title="Expense Description">
                        <ArticleIcon/>
                    </Tooltip>
                    {values.expenseDescription}
                </div>
                <div className={styles.content_inner_row}>
                    <Tooltip title="Expense Transaction Date">
                        <EventIcon/>
                    </Tooltip>
                    {values.expenseDate}
                </div>
                <div className={styles.content_inner_row}>
                    <Tooltip title="Expense Transaction Cost">
                        <AttachMoneyIcon/>
                    </Tooltip>
                    {values.expenseCost}
                </div>
            </div>
        </div>  
    </div> 
  )
}

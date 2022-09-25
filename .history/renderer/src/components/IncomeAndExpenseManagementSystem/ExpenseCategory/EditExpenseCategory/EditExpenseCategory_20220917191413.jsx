import React, { useState, useEffect } from 'react';
import styles from './EditExpenseCategory.module.scss';
import Rest from '../../../rest/Rest.tsx';
import ExpenseCategory from '../../../model/ExpenseCategory.tsx';
import { TextField } from '@mui/material';
import MediumButton from '../../Shared/MediumButton/MediumButton';

const INITIAL_URL = "http://localhost:8080/api/v1";

function capitalizeData(data){
    data = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
    return data;
}

export default function EditExpenseCategory({ editSuccessAction, expenseCategoryId, expenseCategoryName }) {
    const rest = new Rest();
    const [newCategoryData, setNewCategoryData] = useState(
        new ExpenseCategory (
            expenseCategoryId[0],
            expenseCategoryName, 
            true
        )
    )

    const handleChange = (e) => {
        setNewCategoryData({...newCategoryData, [e.target.name]:capitalizeData(e.target.value)});
    }

    const handleSubmit = () => {
        rest.update(
            `${INITIAL_URL}/expense-category/update/${newCategoryData.expenseCategoryId}`,
            newCategoryData,
            editSuccessAction,
            `Successfully edited ${newCategoryData.expenseCategoryName}`
        )
    }

  return (
    <div className={styles.container}>
        <div className={styles.form}>
        <div className={styles.header}>
            Editing expense category: <span style={{ fontWeight: 700, textTransform: "uppercase"}}>{expenseCategoryName}</span>
        </div>
        <div className={styles.content}>
          <div className={styles.content_header}>
              Position ID: {expenseCategoryId}
            </div>
            <div className={styles.textfield}>
              <TextField onChange={handleChange} name="expenseCategoryName" label="Expense Category Name" variant="standard" fullWidth />
          </div>
        </div>
        <div className={styles.footer}>
          <button onClick={handleSubmit}>
            <MediumButton label="SUBMIT" />
          </button>
        </div>
      </div>
    </div>
  )
}

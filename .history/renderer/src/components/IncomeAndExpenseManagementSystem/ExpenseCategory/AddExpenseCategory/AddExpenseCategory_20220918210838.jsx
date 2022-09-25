import { TextField } from '@mui/material';
import React, { useState } from 'react';
import MediumButton from '../../Shared/MediumButton/MediumButton';
import styles from './AddExpenseCategory.module.scss';
import Rest from '../../../rest/Rest.tsx';
import ExpenseCategory from '../../../model/ExpenseCategory.tsx';

const INITIAL_URL = "http://localhost:8080/api/v1";

function capitalizeData(data){
  data = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
  return data;
}

export default function AddExpenseCategory({ addSuccessAction }) {
  const rest = new Rest();
  const [newCategory, setNewCategory] = useState('');
  const handleChange = (e) => {
    setNewCategory(capitalizeData(e.target.value));
  }
  const handleSubmit = () => {
    const addedCategory = (
      new ExpenseCategory(
        1,
        newCategory,
        true
      )
    )
    rest.add(
      `${INITIAL_URL}/expense-category/add`,
      addedCategory,
      addSuccessAction,
      `Successfully added expense category name '${newCategory}'`
    )
  }

  return (
    <div className={styles.form}>
        <div className={styles.header}>
            Add Expense Category
        </div>
        <div className={styles.content}>
            <TextField name="expenseCategoryName" label="Expense Category Name" variant="standard" onChange={handleChange} fullWidth />
          <div className={styles.button}>
            <button onClick={handleSubmit}>
              <MediumButton label="SUBMIT" />
            </button>   
          </div>
        </div>
    </div>
  )
}

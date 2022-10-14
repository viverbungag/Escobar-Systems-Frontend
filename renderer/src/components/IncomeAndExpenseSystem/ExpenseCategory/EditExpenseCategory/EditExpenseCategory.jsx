import React, { useState, useEffect } from "react";
import styles from "./EditExpenseCategory.module.scss";
import Rest from "../../../../rest/Rest.tsx";
import ExpenseCategory from "../../../../model/ExpenseCategory.tsx";
import { TextField } from "@mui/material";
import MediumButton from "../../Shared/MediumButton/MediumButton";
import { toast } from "react-toastify";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

function capitalizeData(data) {
  data = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
  return data;
}

export default function EditExpenseCategory({
  editSuccessAction,
  expenseCategoryId,
  expenseCategoryName,
}) {
  const rest = new Rest();

  const [categoryName, setCategoryName] = useState(expenseCategoryName[0]);
  const handleCategoryNameOnChange = (e) => {
    setCategoryName(e.target.value);
  };

  const [categoryNameError, setCategoryNameError] = useState(false);
  const handleSubmit = () => {
    if (categoryName === "") {
      setCategoryNameError(true);
      toast.error("Category name must not bee empty.");
      return;
    } else {
      setCategoryNameError(false);
    }

    const newCategory = new ExpenseCategory(
      expenseCategoryId[0],
      categoryName,
      true
    );

    rest.update(
      `${INITIAL_URL}/expense-category/update/${newCategory.expenseCategoryId}`,
      newCategory,
      editSuccessAction,
      `Successfully edited ${newCategory.expenseCategoryName}.`
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.header}>Edit expense category</div>
        <div className={styles.content}>
          <div className={styles.textfield}>
            <TextField
              onChange={handleCategoryNameOnChange}
              value={categoryName}
              label="Expense Category Name"
              variant="standard"
              error={categoryNameError == true}
              fullWidth
            />
          </div>
        </div>
        <div className={styles.footer}>
          <button onClick={handleSubmit}>
            <MediumButton label="SUBMIT" />
          </button>
        </div>
      </div>
    </div>
  );
}

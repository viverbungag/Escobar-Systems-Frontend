import React, { useEffect, useState } from "react";
import styles from "./AddExpenseModal.module.scss";
import Rest from "../../../../rest/Rest.tsx";
import Expense from "../../../../model/Expense.tsx";
import { TextField } from "@mui/material";
import Select from "react-select";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MediumButton from "../../Shared/MediumButton/MediumButton";
import dateFormat from "dateformat";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { toast } from "react-toastify";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

function capitalizeData(data) {
  var separateWord = data.toLowerCase().split(" ");
  for (var i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(" ");
}
export default function AddExpenseModal({
  reload,
  expenseCategories,
  addSuccessAction,
}) {
  const rest = new Rest();
  //datetime
  const [datetime, setDatetime] = useState(new Date());
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const handleCategoryOnChange = (e) => {
    setCategory(e.value);
  };
  const handleDescriptionOnChange = (e) => {
    setDescription(e.target.value);
  };
  const handleCostOnChange = (e) => {
    setCost(e.target.value);
  };
  const handleDatetimeChange = (newDatetime) => {
    const formattedDatetime =
      dateFormat(newDatetime, "yyyy-mm-dd") +
      "T" +
      dateFormat(newDatetime, "HH:MM:ss");
    setDatetime(formattedDatetime);
  };
  const [costError, setCostError] = useState(false);
  const handleSubmit = () => {
    console.log(category);
    if (category === "") {
      toast.error("Select a category.");
      return;
    }

    if (isNaN(cost) || cost === "") {
      toast.error("Cost must be greater than or equals to 0.");
      setCostError(true);
      return;
    } else {
      setCostError(false);
    }

    const newExpense = new Expense(1, category, description, datetime, cost);

    rest.add(
      `${INITIAL_URL}/expense/add`,
      newExpense,
      addSuccessAction,
      `Successfully added expense ${category} - ${datetime}`
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.container}>
        <div className={styles.header}>Add New Expense</div>
        <div className={styles.content}>
          <div className={styles.group}>
            <div className={styles.group_textfields}>
              <div className={styles.group_textfields_row}>
                <div className={styles.group_textfields_select}>
                  <div className={styles.group_textfields_select_label}>
                    Category
                  </div>
                  <Select
                    options={expenseCategories.map((item) => {
                      return {
                        key: "expenseCategoryName",
                        value: item.expenseCategoryName,
                        label: item.expenseCategoryName,
                      };
                    })}
                    onChange={handleCategoryOnChange}
                    defaultValue={category}
                  />
                </div>
              </div>
              <div className={styles.group_textfields_row}>
                <DesktopDatePicker
                  label="Date"
                  inputFormat="YYYY-MM-DD"
                  value={datetime}
                  onChange={handleDatetimeChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.group_textfields}>
              <div className={styles.group_textfields_row}>
                <TextField
                  onChange={handleDescriptionOnChange}
                  label="Description"
                  value={description}
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </div>
              <div className={styles.group_textfields_row}>
                <TextField
                  onChange={handleCostOnChange}
                  value={cost}
                  label="Expense Cost"
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  type="number"
                  error={costError == true}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <button onClick={handleSubmit}>
            <MediumButton label="SUBMIT" />
          </button>
        </div>
      </div>
    </LocalizationProvider>
  );
}

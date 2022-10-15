import React, { useEffect, useState } from "react";
import styles from "./EditExpenseModal.module.scss";
import Rest from "../../../../rest/Rest.tsx";
import Expense from "../../../../model/Expense.tsx";
import { TextField } from "@mui/material";
import Select from "react-select";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MediumButton from "../../Shared/MediumButton/MediumButton";
import dateFormat from "dateformat";
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

export default function EditExpenseModal({
  expenseCategories,
  selectedValues,
  editSuccessAction,
}) {
  const rest = new Rest();
  //selected
  const selectedExpense = selectedValues[0];
  const [category, setCategory] = useState(selectedExpense.expenseCategoryName);
  const [datetime, setDatetime] = useState(selectedExpense.expenseDate);
  const [description, setDescription] = useState(
    selectedExpense.expenseDescription
  );
  const [cost, setCost] = useState(selectedExpense.expenseCost);
  const handleCategoryOnChange = (e) => {
    setCategory(e.value);
  };
  const handleDescriptionOnChange = (e) => {
    setDescription(e.target.value);
  };
  const handleCostOnChange = (e) => {
    setCost(e.target.value);
  };
  //datetime
  const handleDatetimeChange = (newDatetime) => {
    const formattedDatetime =
      dateFormat(newDatetime, "yyyy-mm-dd") +
      "T" +
      dateFormat(newDatetime, "HH:MM:ss");
    setDatetime(formattedDatetime);
  };
  const handleSubmit = () => {
    const updatedExpense = new Expense(
      selectedExpense.expenseId,
      category,
      description,
      datetime,
      cost
    );
    console.log(updatedExpense);

    if (isNaN(cost) || cost === "") {
      setCost(selectedExpense.expenseCost);
      toast.error("Cost must be greater than or equals to 0.");
      return;
    }

    rest.update(
      `${INITIAL_URL}/expense/update/${selectedExpense.expenseId}`,
      updatedExpense,
      editSuccessAction,
      `Successfully edited Expense ID: ${selectedExpense.expenseId}`
    );
  };
  const showDescription = () => {
    if (description == null || description == "") {
      return "None";
    } else {
      return description;
    }
  };
  const [toEdit, setToEdit] = useState(false);
  const isEdit = () => {
    if (toEdit) {
      setToEdit(false);
    } else {
      setToEdit(true);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.header_id}>
            Expense {selectedExpense.expenseId}
          </div>
          <div className={styles.header_icon}>
            {toEdit ? (
              <HighlightOffIcon
                className={styles.exit_edit_icon}
                onClick={isEdit}
              />
            ) : (
              <EditIcon className={styles.edit_icon} onClick={isEdit} />
            )}
          </div>
        </div>
        {toEdit ? (
          <>
            <div className={styles.content}>
              <div className={styles.content__row}>
                <div className={styles.content__left}>
                  <div className={styles.content__label}>Category</div>
                  <div className={styles.content__input}>
                    <Select
                      placeholder={selectedExpense.expenseCategoryName}
                      defaultValue={category}
                      options={expenseCategories.map((item) => {
                        return {
                          key: "expenseCategoryName",
                          value: item.expenseCategoryName,
                          label: item.expenseCategoryName,
                        };
                      })}
                      onChange={handleCategoryOnChange}
                    />
                  </div>
                </div>
                <div className={styles.content__right}>
                  <div className={styles.content__label}>Date</div>
                  <div className={styles.content__input}>
                    <DesktopDatePicker
                      label="Expense Date"
                      inputFormat="YYYY-MM-DD"
                      value={datetime}
                      onChange={handleDatetimeChange}
                      renderInput={(params) => <TextField {...params} />}
                      fullWidth
                    />
                  </div>
                </div>
              </div>
              <div className={styles.content__row}>
                <div className={styles.content__left}>
                  {/* <div className={styles.content__label}>Description</div> */}
                  <div className={styles.content__data}>
                    <TextField
                      type="text"
                      onChange={handleDescriptionOnChange}
                      name="expenseDescription"
                      label="Expense Description"
                      value={description}
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    />
                  </div>
                </div>
                <div className={styles.content__right}>
                  {/* <div className={styles.content__label}>Cost</div> */}
                  <div className={styles.content__data}>
                    <TextField
                      type="number"
                      onChange={handleCostOnChange}
                      label="Expense Cost"
                      value={cost}
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
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
          </>
        ) : (
          <>
            <div className={styles.content}>
              <div className={styles.content__row}>
                <div className={styles.content__left}>
                  <div className={styles.content__label}>Category</div>
                  <div className={styles.content__data}>
                    {selectedExpense.expenseCategoryName}
                  </div>
                </div>
                <div className={styles.content__right}>
                  <div className={styles.content__label}>Date</div>
                  <div className={styles.content__data}>
                    {dateFormat(selectedExpense.expenseDate, "mmmm d, yyyy")}
                  </div>
                </div>
              </div>
              <div className={styles.content__row}>
                <div className={styles.content__left}>
                  <div className={styles.content__label}>Description</div>
                  <div className={styles.content__data}>
                    {showDescription()}
                  </div>
                </div>
                <div className={styles.content__right}>
                  <div className={styles.content__label}>Cost</div>
                  <div className={styles.content__data}>
                    {selectedExpense.expenseCost}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.footer_invisible}>
              <button onClick={handleSubmit}>
                <MediumButton label="Submit" />
              </button>
            </div>
          </>
        )}
      </div>
    </LocalizationProvider>
  );
}

import React, { useEffect, useState } from 'react';
import styles from './EditExpenseModal.module.scss';
import Rest from '../../../../rest/Rest.tsx';
import Expense from '../../../../model/Expense.tsx';
import { TextField } from '@mui/material';
import Select from 'react-select';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MediumButton from '../../Shared/MediumButton/MediumButton';
import dateFormat from 'dateformat';

const INITIAL_URL = "http://localhost:8080/api/v1";

function capitalizeData(data){
  data = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
  return data;
}

export default function EditExpenseModal({ expenseCategories, selectedValues, editSuccessAction }) {
    const rest = new Rest();
    //selected
    const selectedExpense = selectedValues[0];
    const [values, setValues] = useState(
        new Expense(
            selectedExpense.expenseId,
            selectedExpense.expenseCategoryName,
            selectedExpense.expenseDescription,
            selectedExpense.expenseDate,
            selectedExpense.expenseCost
        )
    );
    //datetime
    const formattedDatetime = '';
    // const datetimeNow = new Date();
    const [datetime, setDatetime] = useState(values.expenseDate);
    const handleDatetimeChange = (newDatetime) => {
      setDatetime(newDatetime);
    };
    //onChange for all inputs
    const onChange = (e) => {
      if(e.target == undefined){
        setValues({...values, [e.key]:e.value})
      }else{
        if(e.target.name == 'expenseCost'){
          console.log('cost')
          setValues({...values, [e.target.name]:Number(e.target.value)})
        }else{
          setValues({...values, [e.target.name]:capitalizeData(e.target.value)})
        }
      }
    }
    //datetime to values
    const setDatetimeValues = () => {
      formattedDatetime = dateFormat(datetime, "yyyy-mm-dd") + "T" + dateFormat(datetime, "HH:MM:ss")
      setValues({...values, expenseDate: formattedDatetime})
    }
    const handleSubmit = () => {
      rest.update(
        `${INITIAL_URL}/expense/update/${values.expenseId}`,
        values,
        editSuccessAction,
        `Successfully edited Expense ID: ${values.expenseId}`
      )
    }

    useEffect(() => {
      setDatetimeValues();
    }, [datetime])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.container}>
        <div className={styles.header}>
            Edit Expense ID: {values.expenseId}
        </div>
        <div className={styles.content}>
        <div className={styles.group}>
          <div className={styles.group_textfields}>
            <div className={styles.group_textfields_row}>
            <div className={styles.group_textfields_select}>
                <div className={styles.group_textfields_select_label}>Position</div> 
                <Select
                  placeholder={selectedExpense.expenseCategoryName}
                  defaultValue={selectedExpense.expenseCategoryName}
                  options={expenseCategories.map((item) => {
                    return {
                      key: 'expenseCategoryName',
                      value: item.expenseCategoryName,
                      label: item.expenseCategoryName
                    }
                  })}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className={styles.group_textfields_row}>
              <DateTimePicker
                label="Expense Transaction Datetime"
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
              <TextField onChange={onChange} name="expenseDescription" label="Expense Description" defaultValue={values.expenseDescription} variant="standard" fullWidth />
            </div>
            <div className={styles.group_textfields_row}>
              <TextField onChange={onChange} name="expenseCost" label="Expense Cost" defaultValue={selectedExpense.expenseCost} variant="standard" fullWidth />
            </div>
          </div>
        </div>
        </div>
        <div className={styles.footer}>
          <button onClick={handleSubmit}>
            <MediumButton label='SUBMIT' />
          </button>
        </div>
      </div>
    </LocalizationProvider>
  )
}

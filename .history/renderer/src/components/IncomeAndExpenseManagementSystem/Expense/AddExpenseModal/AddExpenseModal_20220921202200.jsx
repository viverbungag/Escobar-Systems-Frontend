import React, { useEffect, useState } from 'react';
import styles from './AddExpenseModal.module.scss';
import Rest from '../../../rest/Rest.tsx';
import Expense from '../../../model/Expense.tsx';
import { TextField } from '@mui/material';
import Select from 'react-select';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MediumButton from '../../Shared/MediumButton/MediumButton';
import dateFormat from 'dateformat';

const INITIAL_URL = "http://localhost:8080/api/v1";

function capitalizeData(data){
  var separateWord = data.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
        separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
        separateWord[i].substring(1);
    }
    return separateWord.join(' ');
}
export default function AddExpenseModal({ reload, expenseCategories, addSuccessAction }) {
    const rest = new Rest();
    //datetime
    const formattedDatetime = '';
    const datetimeNow = new Date();
    const [datetime, setDatetime] = useState(datetimeNow);
    const handleDatetimeChange = (newDatetime) => {
      setDatetime(newDatetime);
    };
    //selected
    const [values, setValues] = useState(
        new Expense(
            1,
            '',
            '',
            '',
            
        )
    );
    //onChange for all inputs
    const onChange = (e) => {
      if(e.target == undefined){
        setValues({...values, [e.key]:e.value})
      }else{
        setValues({...values, [e.target.name]:capitalizeData(e.target.value)})
      }
    }
    //datetime to values
    const setDatetimeValues = () => {
      formattedDatetime = dateFormat(datetime, "yyyy-mm-dd") + "T" + dateFormat(datetime, "HH:MM:ss")
      setValues({...values, expenseDate: formattedDatetime})
    }
    const handleSubmit = () => {
      rest.add(
        `${INITIAL_URL}/expense/add`,
        values,
        addSuccessAction,
        `Successfully added expense ${values.expenseCategoryName} - ${values.expenseDate}`
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
                <div className={styles.group_textfields_select_label}>Expense Category</div> 
                <Select
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
              <TextField onChange={onChange} name="expenseDescription" label="Expense Description" variant="standard" fullWidth />
            </div>
            <div className={styles.group_textfields_row}>
              <TextField onChange={onChange} name="expenseCost" label="Expense Cost" variant="standard" fullWidth />
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

import React, { useState, useEffect } from 'react';
import styles from './AddAccountModal.module.scss';
import Rest from '../../../rest/Rest.tsx';
import Account from '../../../model/Account.tsx'
import { TextField } from '@mui/material';
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';
import Select from 'react-select';
import Checkbox from '@mui/material/Checkbox';
import { toast } from 'react-toastify';

const INITIAL_URL = "http://localhost:8080/api/v1";

function capitalizeData(data){
    // data = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
    // return data;
    var separateWord = data.toLowerCase().split(' ');
      for (var i = 0; i < separateWord.length; i++) {
          separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
          separateWord[i].substring(1);
      }
      return separateWord.join(' ');
  }

export default function AddAccountModal({ addSuccessAction, activeEmployees  }) {
    const rest = new Rest();
    const defaultEmployee = '';
    const setDefaultEmployee = () => {
        activeEmployees.map((item, index) => {
            if(index == 0){
                defaultEmployee = `${item.employeeLastName}, ${item.employeeFirstName}`
            }
        })
        setNewAccount({...newAccount, employeeName: defaultEmployee});
    }
    const [newAccount, setNewAccount] = useState(
        new Account (
            1,
            '',
            '',
            '',
            false,
            false,
            false,
            false,
            true
        )
    )
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleChange = (e) => {
        if(e.target == undefined){
            setNewAccount({...newAccount, [e.key]:e.value})
        }else if(e.target.name == 'accessInventoryManagementSystem' || e.target.name == 'accessEmployeeManagementSystem' || e.target.name == 'accessIncomeAndExpenseSystem' || e.target.name == 'accessOrderingSystem'){
            setNewAccount({...newAccount, [e.target.name]:e.target.checked})
        }else if(e.target.name == 'accountPassword'){
            setNewAccount({...newAccount, [e.target.name]:e.target.value})
        }else if(e.target.name == 'confirmAccountPassword'){
            setConfirmPassword(e.target.value);
        }else{
            setNewAccount({...newAccount, [e.target.name]:capitalizeData(e.target.value)})
        }
    }
    const passwordMatches = false;
    const checkConfirmPassword = () => {
        if(confirmPassword == newAccount.accountPassword && newAccount.accountPassword != '' ){
            passwordMatches = true;
        }
    }
    const handleSubmit = () => {
        checkConfirmPassword();
        if(passwordMatches){
            rest.add(
                `${INITIAL_URL}/account/add`,
                newAccount,
                addSuccessAction,
                `Successfully added account for ${newAccount.employeeName}`
            )
        }else{
            toast.error('Passwords do not match.');
        }
    }

    useState(() => {
        setDefaultEmployee();
    }, [])

  return (
    <div className={styles.container}>
        {console.log(newAccount.employeeName)}
        <div className={styles.header}>
            Add Employee Account
        </div>
        <div className={styles.content_outer}>
            <div className={styles.content_inner}>
                <div className={styles.content_inner_left}>
                    <div className={styles.content_inner_label}>
                        Personal Details
                    </div>
                    <div className={styles.content_inner_row}>
                        <TextField onChange={handleChange} name="accountUsername" label="Account Username" variant="standard" fullWidth />
                    </div>
                    <div className={styles.content_inner_row}>
                        <TextField type='password' onChange={handleChange} name="accountPassword" label="Account Password" variant="standard" fullWidth />
                    </div>
                    <div className={styles.content_inner_row}>
                        <TextField type='password' onChange={handleChange} name="confirmAccountPassword" label="Confirm Account Password" variant="standard" fullWidth />
                    </div>
                    <div className={styles.content_inner_row}>
                        <div className={styles.group_textfields_select}>
                            <div className={styles.group_textfields_select_label}>Employee Name</div>
                            <Select
                                defaultValue={activeEmployees.map((item, index) => {
                                    if(index == 0){
                                        return {
                                            key: 'employeeName',
                                            value: `${item.employeeLastName}, ${item.employeeFirstName}`,
                                            label: `${item.employeeLastName}, ${item.employeeFirstName}`
                                        }
                                    }
                                })}
                                options={activeEmployees.map((item) => {
                                    return {
                                        key: 'employeeName',
                                        value: `${item.employeeLastName}, ${item.employeeFirstName}`,
                                        label: `${item.employeeLastName}, ${item.employeeFirstName}`
                                    }
                                })}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.content_inner_right}>
                    <div className={styles.content_inner_label}>
                        Accessible Systems
                    </div>
                    <div className={styles.content_inner_row}>
                        Inventory Management System:&nbsp;
                        <Checkbox onChange={handleChange} name='accessInventoryManagementSystem' />
                    </div>
                    <div className={styles.content_inner_row}>
                        Employee Management System:&nbsp;
                        <Checkbox onChange={handleChange} name='accessEmployeeManagementSystem' />
                    </div>
                    <div className={styles.content_inner_row}>
                        Income & Expense System:&nbsp;
                        <Checkbox onChange={handleChange} name='accessIncomeAndExpenseSystem' />
                    </div>
                    <div className={styles.content_inner_row}>
                        Ordering System:&nbsp;
                        <Checkbox onChange={handleChange} name='accessOrderingSystem' />
                    </div>
                </div>
            </div>
        </div> 
        <div className={styles.footer}>
            <button onClick={handleSubmit}>
                <MediumButton label="Submit" />
            </button>
      </div> 
    </div>  
  )
}

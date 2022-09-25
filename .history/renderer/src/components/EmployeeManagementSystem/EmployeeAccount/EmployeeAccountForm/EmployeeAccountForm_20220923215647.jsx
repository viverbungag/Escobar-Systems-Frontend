import React, { useState, useEffect } from 'react';
import styles from './EmployeeAccountForm.module.scss';
import { useUser, useUserUpdate } from '../../Contexts/UserContext.jsx';
import { TextField, FormLabel, FormGroup, FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Account from '../../../model/Account.tsx';
import { toast } from 'react-toastify';
import Rest from '../../../rest/Rest.tsx';

const INITIAL_URL = "http://localhost:8080/api/v1";

export default function EmployeeAccountForm() {
    const { 
        accountId,
        accountUsername,
        accountPassword,
        employeeName,
        accessInventoryManagementSystem,
        accessEmployeeManagementSystem,
        accessIncomeAndExpenseSystem,
        accessOrderingSystem,
        isActive
     } = useUser();
     const [toEdit, setToEdit] = useState(false);
     const isEdit = () => {
        console.log(
            accessInventoryManagementSystem,
            accessEmployeeManagementSystem,
            accessIncomeAndExpenseSystem,
            accessOrderingSystem
        )
        if(toEdit){
            setNewPassword('');
            setConfirmPassword('');
            setOldPassword(accountPassword);
            setToEdit(false);
        }else {
            setOldPassword('');
            setToEdit(true);
        }
     }
     const [oldPassword, setOldPassword] = useState(accountPassword);
     const [newPassword, setNewPassword] = useState('');
     const [confirmPassword, setConfirmPassword] = useState('');

     const rest = new Rest();

     const handleOldPasswordOnChange = (e) => {
        setOldPassword(e.target.value);
     }

     const handleNewPasswordOnChange = (e) => {
        setNewPassword(e.target.value);
     }

     const handleConfirmNewPasswordOnChange = (e) => {
        setConfirmPassword(e.target.value);
     }

    const editSuccessAction = () => {
        accountOnChange(
            accountId,
            accountUsername, 
            newPassword, 
            employeeName,
            accessInventoryManagementSystem,
            accessEmployeeManagementSystem,
            accessIncomeAndExpenseSystem,
            accessOrderingSystem,
            isActive
          );

          localStorage.setItem("accountPassword", newPassword);
    }
     const handleSubmit = () => {
        // console.log(
        //     accountId,
        //     accountUsername,
        //     accountPassword,
        //     employeeName,
        //     accessInventoryManagementSystem,
        //     accessEmployeeManagementSystem,
        //     accessIncomeAndExpenseSystem,
        //     accessOrderingSystem,
        //     isActive
        // )
        // console.log('oldPassword: ' + oldPassword)
        // console.log('newPassword: ' + newPassword)
        // console.log('confirmPassword: ' + confirmPassword)

        if (oldPassword === '' || newPassword === '' || confirmPassword === ''){
            toast.error('There are empty fields');
            return;
        }

        if (oldPassword !== accountPassword){
            toast.error('Old password is wrong');
            return;
        }

        if (newPassword !== confirmPassword){
            toast.error('New password and Confirm New Password does not match');
            return;
        }
        
        const newAccount = new Account(            
            accountId,
            accountUsername,
            newPassword,
            employeeName,
            accessInventoryManagementSystem,
            accessEmployeeManagementSystem,
            accessIncomeAndExpenseSystem,
            accessOrderingSystem,
            isActive);

        rest.update(
            `${INITIAL_URL}/account/update/${accountId}`,
            newAccount,
            editSuccessAction,
            `Successfully edited account ${accountId}`
        )
     }
     

     return (
        <div className={styles.container}>
            <div className={styles.header}>
                My Account Details
                {toEdit ? (
                    <HighlightOffIcon className={styles.exit_edit_icon} onClick={isEdit} />
                ) : (
                    <EditIcon className={styles.edit_icon} onClick={isEdit} />
                )}
            </div>
            {toEdit ? (
                <>
                <div className={styles.content}>
                    <div className={styles.content_group}>
                        <div className={styles.content_group_label}>
                            Personal Details
                        </div>
                        <div className={styles.content_group_detail}>
                            <TextField disabled name='employeeName' label='Name' value={employeeName} variant='standard' fullWidth/>
                            <TextField disabled name='accountUsername' label='Username' value={accountUsername} variant='standard' fullWidth/>
                            <TextField onChange={handleOldPasswordOnChange} value={oldPassword} type='password' name='oldPassword' label='Old Password' variant='standard' fullWidth/>
                            <TextField onChange={handleNewPasswordOnChange} value={newPassword} type='password' name='accountPassword' label='New Password' variant='standard' fullWidth/>
                            <TextField onChange={handleConfirmNewPasswordOnChange} value={confirmPassword} error={newPassword !== confirmPassword} helperText={newPassword !== confirmPassword && "New password does not match"} name='confirmPassword' type='password' label='Confirm New Password' variant='standard' fullWidth/>
                        </div>
                    </div>
                    <div className={styles.content_group}>
                        <div className={styles.content_group_label}>
                            Accessible Systems
                        </div>
                        <div className={styles.content_group_detail}>
                            <div className={styles.content_group_checkbox}>
                                <div className={styles.content_group_checkbox_label}>
                                    Inventory Management System
                                </div>
                                    <Checkbox disabled checked={accessInventoryManagementSystem} />
                            </div>
                            <div className={styles.content_group_checkbox}>
                                <div className={styles.content_group_checkbox_label}>
                                    Employee Management System
                                </div>
                                    <Checkbox disabled checked={accessEmployeeManagementSystem} />
                            </div>
                            <div className={styles.content_group_checkbox}>
                                <div className={styles.content_group_checkbox_label}>
                                    Income & Expense System
                                </div>
                                    <Checkbox disabled checked={accessIncomeAndExpenseSystem} />
                            </div>
                            <div className={styles.content_group_checkbox}>
                                <div className={styles.content_group_checkbox_label}>
                                    Ordering System
                                </div>
                                    <Checkbox disabled checked={accessOrderingSystem} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <button onClick={handleSubmit}>
                        <MediumButton label='Submit' />
                    </button>
                </div>
                </>
            ) : (
                <>
                <div className={styles.content}>
                    <div className={styles.content_group}>
                        <div className={styles.content_group_label}>
                            Personal Details
                        </div>
                        <div className={styles.content_group_detail}>
                            <TextField disabled name='employeeName' label='Name' value={employeeName} variant='standard' fullWidth/>
                            <TextField disabled name='accountUsername' label='Username' value={accountUsername} variant='standard' fullWidth/>
                            <TextField disabled type='password' name='accountUsername' label='Password' value={oldPassword} variant='standard' fullWidth/>
                        </div>
                    </div>
                    <div className={styles.content_group}>
                        <div className={styles.content_group_label}>
                            Accessible Systems
                        </div>
                        <div className={styles.content_group_detail}>
                            <div className={styles.content_group_checkbox}>
                                <div className={styles.content_group_checkbox_label}>
                                    Inventory Management System
                                </div>
                                    <Checkbox disabled checked={accessInventoryManagementSystem} />
                            </div>
                            <div className={styles.content_group_checkbox}>
                                <div className={styles.content_group_checkbox_label}>
                                    Employee Management System
                                </div>
                                    <Checkbox disabled checked={accessEmployeeManagementSystem} />
                            </div>
                            <div className={styles.content_group_checkbox}>
                                <div className={styles.content_group_checkbox_label}>
                                    Income & Expense System
                                </div>
                                    <Checkbox disabled checked={accessIncomeAndExpenseSystem} />
                            </div>
                            <div className={styles.content_group_checkbox}>
                                <div className={styles.content_group_checkbox_label}>
                                    Ordering System
                                </div>
                                    <Checkbox disabled checked={accessOrderingSystem} />
                            </div>
                        </div>
                    </div>
                </div>
                </>
            ) }
        </div>
     )
}


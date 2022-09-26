import React, { useState, useEffect } from 'react';
import styles from './MoreInfoModal.module.scss';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';

export default function MoreInfoModal({ selectedValues }) {
    const [values, setValues] = useState([])
    const getValues = () => {
        selectedValues.map((item) => {
            setValues({
                id: item.accountId,
                accountUsername: item.accountUsername,
                accountPassword: item.accountPassword,
                employeeName: item.employeeName,
                accessInventoryManagementSystem: item.accessInventoryManagementSystem,
                accessEmployeeManagementSystem: item.accessEmployeeManagementSystem,
                accessIncomeAndExpenseSystem: item.accessIncomeAndExpenseSystem,
                accessOrderingSystem: item.accessOrderingSystem
            })
        })
    }
    const showMarks = (type) => {
        console.log(values)
        if(type == false){
            return (
                <Tooltip title="Account Username">
                    <CloseIcon />
                </Tooltip>
            )
        }else {
            return (
                <Tooltip title="Account Username">
                    <CheckIcon />
                </Tooltip>
            )
        }
    }

    useEffect(() => {
        getValues();
    }, [])

  return (
    <div className={styles.container}>
        {console.log(values.accessOrderingSystem)}
        <div className={styles.header}>
            Account {values.id}
        </div>
        <div className={styles.content_outer}>
            <div className={styles.content_name}>
                {values.employeeName}
            </div>
            <div className={styles.content_inner}>
                <div className={styles.content_inner_left}>
                    <div className={styles.content_inner_label}>
                        Personal Details
                    </div>
                    <div className={styles.content_inner_row}>
                        <Tooltip title="Account Username">
                            <PersonOutlineIcon />
                        </Tooltip>
                        {values.accountUsername}
                    </div>
                    <div className={styles.content_inner_row}>
                        <Tooltip title="Account Password">
                            <VpnKeyIcon/>
                        </Tooltip>
                        {values.accountPassword}
                    </div>
                </div>
                <div className={styles.content_inner_right}>
                    <div className={styles.content_inner_label}>
                        Accessible Systems
                    </div>
                    <div className={styles.content_inner_row}>
                        {/* <Tooltip title="">
                            <WorkIcon/>
                        </Tooltip> */}
                        Inventory Management System:&nbsp;
                        {showMarks(values.accessInventoryManagementSystem)}
                        {/* {values.accessInventoryManagementSystem} */}
                    </div>
                    <div className={styles.content_inner_row}>
                        {/* <Tooltip title="Employee Type">
                            <WorkHistoryIcon/>
                        </Tooltip> */}
                        Employee Management System:&nbsp;
                        {showMarks(values.accessEmployeeManagementSystem)}
                        {/* {values.accessEmployeeManagementSystem} */}
                    </div>
                    <div className={styles.content_inner_row}>
                        {/* <Tooltip title="Superior Employee">
                            <BadgeIcon/>
                        </Tooltip> */}
                        Income & Expense System:&nbsp;
                        {showMarks(values.accessIncomeAndExpenseSystem)}
                        {/* {values.accessIncomeAndExpenseSystem} */}
                    </div>
                    <div className={styles.content_inner_row}>
                        {/* <Tooltip title="Date Employed">
                            <HowToRegIcon/>
                        </Tooltip> */}
                        Ordering System:&nbsp;
                        {showMarks(values.accessOrderingSystem)}
                        {/* {values.accessOrderingSystem} */}
                    </div>
                </div>
            </div>
        </div>  
    </div>  
  )
}

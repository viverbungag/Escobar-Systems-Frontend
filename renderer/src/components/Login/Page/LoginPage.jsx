import { TextField } from '@mui/material';
import React, { useState } from 'react';
import BigButton from '../../Shared/Buttons/BigButton/BigButton';
import styles from './LoginPage.module.scss';
// import Toast from '../../components/Shared/Toast/Toast.jsx';
import Rest from '../../../rest/Rest.tsx';
import { useUser, useUserUpdate } from '../../contexts/UserContext';
import { useRouter } from "next/router";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import WindowControlBar from '../../Shared/WindowControlBar/WindowControlBar';

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

export default function LoginPage() {
    const account = useUser();
    const accountOnChange = useUserUpdate();
    const router = useRouter();
    const rest = new Rest();
    const [type, setType] = useState('employee');
    const handleTypeChange = (e) => {
      setType(e.target.value);
    }
    const handleUsernameOnChange = (event) => {
      accountOnChange(
        account.accountId,
        event.target.value, 
        account.accountPassword, 
        account.employeeName,
        account.accessInventoryManagementSystem,
        account.accessEmployeeManagementSystem,
        account.accessIncomeAndExpenseSystem,
        account.accessOrderingSystem,
        account.isActive
      );
    };
    const handlePasswordOnChange = (event) => {
      accountOnChange(
        account.accountId,
        account.accountUsername, 
        event.target.value, 
        account.employeeName,
        account.accessInventoryManagementSystem,
        account.accessEmployeeManagementSystem,
        account.accessIncomeAndExpenseSystem,
        account.accessOrderingSystem,
        account.isActive
      )
    };
    const successfulLoginAdmin = (employee) => {
      accountOnChange(
        account.accountId,
        account.accountUsername, 
        account.accountPassword, 
        employee.employeeName,
        employee.accessInventoryManagementSystem,
        employee.accessEmployeeManagementSystem,
        employee.accessIncomeAndExpenseSystem,
        employee.accessOrderingSystem,
        account.isActive
      );

      localStorage.setItem("accountId", employee.accountId);
      localStorage.setItem("accountUsername", employee.accountUsername);
      localStorage.setItem("accountPassword", employee.accountPassword);
      localStorage.setItem("employeeName", employee.employeeName);
      localStorage.setItem("accessInventoryManagementSystem", employee.accessInventoryManagementSystem);
      localStorage.setItem("accessEmployeeManagementSystem", employee.accessEmployeeManagementSystem);
      localStorage.setItem("accessIncomeAndExpenseSystem", employee.accessIncomeAndExpenseSystem);
      localStorage.setItem("accessOrderingSystem", employee.accessOrderingSystem);
      localStorage.setItem("isAdmin", true);

      router.push("/main-admin-dashboard");
    };
    const successfulLoginEmployee = (employee) => {
      console.log(employee);
      accountOnChange(
        employee.accountId,
        employee.accountUsername, 
        employee.accountPassword, 
        employee.employeeName,
        employee.accessInventoryManagementSystem,
        employee.accessEmployeeManagementSystem,
        employee.accessIncomeAndExpenseSystem,
        employee.accessOrderingSystem,
        employee.isActive
      );
      localStorage.setItem("accountId", employee.accountId);
      localStorage.setItem("accountUsername", employee.accountUsername);
      localStorage.setItem("accountPassword", employee.accountPassword);
      localStorage.setItem("employeeName", employee.employeeName);
      localStorage.setItem("accessInventoryManagementSystem", employee.accessInventoryManagementSystem);
      localStorage.setItem("accessEmployeeManagementSystem", employee.accessEmployeeManagementSystem);
      localStorage.setItem("accessIncomeAndExpenseSystem", employee.accessIncomeAndExpenseSystem);
      localStorage.setItem("accessOrderingSystem", employee.accessOrderingSystem);
      localStorage.setItem("isActive", employee.isActive);
      localStorage.setItem("isAdmin", false);

      router.push("/main-employee-dashboard");
    };
    const handleAdminLogin = () => {
      rest.login(
        `${INITIAL_URL}/login/admin`,
        account,
        successfulLoginAdmin,
        `Successfully Logged In as Admin`
      );
    };
    const handleEmployeeLogin =() => {
      console.log(account)
      rest.login(
        `${INITIAL_URL}/login/employee`,
        account,
        successfulLoginEmployee,
        `Successfully Logged In as Employee`
      );
    }

  return (
    <div>
      <WindowControlBar hideBackButton />
        <div className={styles.section}>
            <div className={styles.container}>
              <ToggleButtonGroup
                className={styles.toggle_group}
                color="primary"
                value={type}
                exclusive
                onChange={handleTypeChange}
              >
                <ToggleButton value="employee">Employee</ToggleButton>
                <ToggleButton value="admin">Admin</ToggleButton>
              </ToggleButtonGroup>
                <div className={styles.header}>
                    <div className={styles.upper}>
                        Login
                    </div>
                    <div className={styles.lower}>
                        Escobar Systems
                    </div>
                </div>
                <div className={styles.content}>
                    <TextField 
                      id="username" 
                      label={type === 'admin' ? "Admin Username" : "Employee Username"} 
                      variant="standard" 
                      fullWidth 
                      value={account.accountUsername}
                      onChange={handleUsernameOnChange}
                    />
                    <TextField 
                      type='password'
                      id="password" 
                      label={type === 'admin' ? "Admin Password" : "Employee Password"}
                      variant="standard" 
                      fullWidth 
                      value={account.accountPassword}
                      onChange={handlePasswordOnChange}
                    />
                </div>
                { type === 'admin' ? (
                  <div className={styles.btn_container}>
                      <button onClick={handleAdminLogin}>
                          <BigButton label="LOGIN"/>
                      </button>
                  </div>
                ) : (
                  <div className={styles.btn_container}>
                      <button onClick={handleEmployeeLogin}>
                          <BigButton label="LOGIN"/>
                      </button>
                  </div>
                ) }
            </div>
        </div>
    </div>
  )
}
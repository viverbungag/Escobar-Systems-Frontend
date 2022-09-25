import { TextField } from '@mui/material';
import React from 'react';
import BigButton from '../../components/Shared/BigButton/BigButton';
import TitleBar from '../../components/Shared/TitleBar/TitleBar';
import styles from './LoginPage.module.scss';
import { useUser, useUserUpdate } from '../../components/contexts/UserContext';
import { useRouter } from "next/router";
import Rest from '../../rest/Rest.tsx';
import Toast from '../../components/Shared/Toast/Toast';

const INITIAL_URL = "http://localhost:8080/api/v1";

const LoginPage = () => {

    const account = useUser();
    const accountOnChange = useUserUpdate();

    const router = useRouter();
    const rest = new Rest();

    const handleUsernameOnChange = (event) => {
        accountOnChange(event.target.value, account.accountPassword, account.employeeName);
      };

      const handlePasswordOnChange = (event) => {
        accountOnChange(account.accountUsername, event.target.value, account.employeeName )
      };

      const successfullLoginActions = (employeeName) => {
        accountOnChange(account.accountUsername, account.accountPassword, employeeName);
        router.replace("/Dashboard/Dashboard");
      };

      const handleLoginOnClick = () => {
        rest.login(
          `${INITIAL_URL}/login`,
          account.toJson(),
          successfullLoginActions,
          `Successfully Logged In`
        );
      };

  return (
    <div>
      <Toast />
      <div className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.upper}>Login</div>
            <div className={styles.lower}>
              Escobar Income and Expense System
            </div>
          </div>
          <div className={styles.content}>
            <TextField
              id="username"
              label="Username"
              variant="standard"
              onChange={handleUsernameOnChange}
              fullWidth
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="standard"
              onChange={handlePasswordOnChange}
              fullWidth
            />
          </div>
          <div className={styles.btn_container}>
            <button  onClick={handleLoginOnClick}>
              <BigButton label="SUBMIT" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage
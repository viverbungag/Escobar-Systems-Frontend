import React, { useState, useEffect, createContext } from "react";
import AccountLogin from "../../../model/AccountLogin";
import ModalSaveButton from "../../Shared/Buttons/ModalSaveButton/ModalSaveButton";
import Toast from "../../Shared/Toast/Toast";
import TextField from "@mui/material/TextField";
import Rest from "../../../rest/Rest";
import styles from "./LoginPage.module.scss";
import { useRouter } from "next/router";
import WindowControlBar from "src/components/Shared/WindowControlBar/WindowControlBar";
import { useUser, useUserUpdate } from "../../contexts/UserContext";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

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
    router.replace("/dashboard");
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
    <div className={styles["login-page"]}>
      <Toast />
      <WindowControlBar />
      <div className={styles["login-page__container"]}>
        <div className={styles["login-page__title"]}>LOGIN</div>
        <TextField
          id="filled-basic"
          label={<span className={styles["login-page__text"]}>Username</span>}
          variant="standard"
          fullWidth
          value={account.accountUsername}
          onChange={handleUsernameOnChange}
        />
        <TextField
          id="filled-basic"
          label={<span className={styles["login-page__text"]}>Password</span>}
          type="password"
          variant="standard"
          fullWidth
          value={account.accountPassword}
          onChange={handlePasswordOnChange}
        />
        <ModalSaveButton onClick={handleLoginOnClick} label="Login" />
      </div>
    </div>
  );
};

export default LoginPage;

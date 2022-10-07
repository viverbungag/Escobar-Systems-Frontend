import React, { useState, useEffect } from 'react';
import styles from "./AdminPasswordModal.module.scss";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { FilledInput  } from '@mui/material';
import SimpleButton from '../Buttons/SimpleButton/SimpleButton';
import { Modal, Slide, Backdrop } from "@mui/material";
import { toast } from 'react-toastify';

const AdminPasswordModal = ({
    openModal,
    handleCloseModal,
    voidButtonOnClick,
    ordernum,
    voidPassword
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const [adminPassword, setAdminPassword] = useState("");
  const handleAdminPasswordOnChange = (event) => {
    setAdminPassword(event.target.value);
  }

  const voidOrderButtonModalOnClick = () => {
    if (adminPassword !== voidPassword){
      toast.error("Wrong Admin password");
      return;
    }
    voidButtonOnClick(ordernum);
  } 

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
};

const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Slide direction="down" in={openModal} mountOnEnter unmountOnExit>
        <div className={styles["admin-password-modal"]}>
          <div className={styles["admin-password-modal--content"]}>
          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="filled-adornment-password">
              Void Password
            </InputLabel>
            <FilledInput
              id="filled-adornment-password"
              variant="filled"
              value={adminPassword}
              onChange={handleAdminPasswordOnChange}
              fullWidth
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <SimpleButton label="Void Order" onClick={voidOrderButtonModalOnClick}/>
          </div>
        </div>
      </Slide>
    </Modal>
  );
}

export default AdminPasswordModal
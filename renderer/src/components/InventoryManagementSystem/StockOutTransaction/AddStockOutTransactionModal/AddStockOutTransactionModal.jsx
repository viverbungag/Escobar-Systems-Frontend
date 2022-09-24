import React from "react";
import styles from "./AddStockOutTransactionModal.module.scss";
import ModalSaveButton from "../../Shared/Buttons/ModalSaveButton/ModalSaveButton";
import TextField from "@mui/material/TextField";
import { Modal, Slide, Backdrop } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';

const AddStockOutTransactionModal = ({
  supplyName,
  quantity,
  unitOfMeasurement,
  quantityOnChange,
  onClickAddButton,
  openAddModal,
  handleCloseAddModal,
}) => {
  return (
    <Modal
      open={openAddModal}
      onClose={handleCloseAddModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Slide direction="down" in={openAddModal} mountOnEnter unmountOnExit>
        <div className={styles["add-stock-out-transaction-modal"]}>
          <div className={styles["add-stock-out-transaction-modal__content"]}>
            <div className={styles["add-stock-out-transaction-modal__title"]}>Stock-Out</div>
            <div className={styles["add-stock-out-transaction-modal__text-field"]}>
              <div>
                Supply Name: <span>{supplyName}</span>
              </div>
              <TextField
                id="filled-basic"
                label={
                  <span className={styles["add-stock-out-transaction-modal__text"]}>
                    Input quantity here
                  </span>
                }
                variant="standard"
                fullWidth
                value={quantity}
                onChange={quantityOnChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end">{unitOfMeasurement}</InputAdornment>,
                }}
              />
            </div>
            <ModalSaveButton label="Stock-out" onClick={onClickAddButton} />
          </div>
        </div>
      </Slide>
    </Modal>
  );
};

export default AddStockOutTransactionModal;

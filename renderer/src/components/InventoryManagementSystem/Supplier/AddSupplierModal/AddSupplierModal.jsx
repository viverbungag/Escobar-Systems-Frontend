import React from "react";
import styles from "./AddSupplierModal.module.scss";
import ModalSaveButton from "../../Shared/Buttons/ModalSaveButton/ModalSaveButton";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Modal, Slide, Backdrop } from "@mui/material";

const AddSupplierModal = ({
  name,
  address,
  contactNumber,
  contactPerson,
  isActiveAdd,
  nameOnChange,
  addressOnChange,
  contactNumberOnChange,
  contactPersonOnChange,
  onClickAddButton,
  openAddModal,
  handleCloseAddModal,
  handleIsActiveAddChange,
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
        <div className={styles["add-supplier-modal"]}>
          <div className={styles["add-supplier-modal__content"]}>
            <div className={styles["add-supplier-modal__title"]}>
              Add Your Supplier
            </div>
            <div className={styles["add-supplier-modal__text-field"]}>
              <TextField
                id="filled-basic"
                label={
                  <span className={styles["add-supplier-modal__text"]}>
                    Input name here
                  </span>
                }
                variant="standard"
                fullWidth
                value={name}
                onChange={nameOnChange}
              />
              <TextField
                id="filled-basic"
                label={
                  <span className={styles["add-supplier-modal__text"]}>
                    Input address here
                  </span>
                }
                variant="standard"
                fullWidth
                value={address}
                onChange={addressOnChange}
              />
              <TextField
                id="filled-basic"
                label={
                  <span className={styles["add-supplier-modal__text"]}>
                    Input Contact Number here
                  </span>
                }
                variant="standard"
                fullWidth
                value={contactNumber}
                onChange={contactNumberOnChange}
              />
              <TextField
                id="filled-basic"
                label={
                  <span className={styles["add-supplier-modal__text"]}>
                    Input Contact Person here
                  </span>
                }
                variant="standard"
                fullWidth
                value={contactPerson}
                onChange={contactPersonOnChange}
              />

              <FormControlLabel
                checked={isActiveAdd}
                onChange={handleIsActiveAddChange}
                control={<Switch color="primary" />}
                label={
                  <span className={styles["add-supplier-modal__text"]}>
                    Active State
                  </span>
                }
                labelPlacement="top"
              />
            </div>
            <ModalSaveButton label="Add Supplier" onClick={onClickAddButton} />
          </div>
        </div>
      </Slide>
    </Modal>
  );
};

export default AddSupplierModal;

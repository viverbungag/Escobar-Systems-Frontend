import React from "react";
import styles from "./EditSupplierModal.module.scss";
import ModalSaveButton from "src/components/Shared/Buttons/ModalSaveButton/ModalSaveButton";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Modal, Slide, Backdrop } from "@mui/material";

const EditSupplierModal = ({
  selectedEditItem,
  nameEdit,
  isActiveEdit,
  address,
  contactNumber,
  contactPerson,
  addressOnChange,
  contactNumberOnChange,
  contactPersonOnChange,
  handleNameEditChange,
  handleIsActiveEditChange,
  handleEditModalButtonClicked,
  openEditModal,
  handleCloseEditModal,
}) => {
  return (
    <Modal
      open={openEditModal}
      onClose={handleCloseEditModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Slide direction="down" in={openEditModal} mountOnEnter unmountOnExit>
        <div className={styles["edit-supplier-modal"]}>
          <div className={styles["edit-supplier-modal__content"]}>
            <div className={styles["edit-supplier-modal__title"]}>
              Edit Your Supplier
            </div>
            <div className={styles["edit-supplier-modal__body"]}>
              <div>
                Supplier ID: <span>{selectedEditItem?.supplierId}</span>
              </div>

              <div className={styles["edit-supplier-modal__text-field"]}>
                <TextField
                  id="filled-basic"
                  label={
                    <span className={styles["edit-supplier-modal__text"]}>
                      Supplier Name
                    </span>
                  }
                  variant="standard"
                  fullWidth
                  value={nameEdit}
                  onChange={handleNameEditChange}
                />

                <TextField
                  id="filled-basic"
                  label={
                    <span className={styles["edit-supplier-modal__text"]}>
                      Address
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
                    <span className={styles["edit-supplier-modal__text"]}>
                      Contact Number
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
                    <span className={styles["edit-supplier-modal__text"]}>
                      Contact Person
                    </span>
                  }
                  variant="standard"
                  fullWidth
                  value={contactPerson}
                  onChange={contactPersonOnChange}
                />

                <FormControlLabel
                  checked={isActiveEdit}
                  onChange={handleIsActiveEditChange}
                  control={<Switch color="primary" />}
                  label={
                    <span className={styles["edit-supplier-modal__text"]}>
                      Active State
                    </span>
                  }
                  labelPlacement="top"
                />
              </div>
            </div>
            <div className={styles["edit-supplier-modal__save-button"]}>
              <ModalSaveButton
                label="Save"
                onClick={handleEditModalButtonClicked}
              />
            </div>
          </div>
        </div>
      </Slide>
    </Modal>
  );
};

export default EditSupplierModal;

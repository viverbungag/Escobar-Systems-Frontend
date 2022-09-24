import React from "react";
import styles from "./EditSupplyCategoryModal.module.scss";
import ModalSaveButton from "src/components/Shared/Buttons/ModalSaveButton/ModalSaveButton";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Modal, Slide, Backdrop } from "@mui/material";

const EditSupplyCategoryModal = ({
  selectedEditItem,
  nameEdit,
  isActiveEdit,
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
        <div className={styles["edit-supply-category-modal"]}>
          <div className={styles["edit-supply-category-modal__content"]}>
            <div className={styles["edit-supply-category-modal__title"]}>
              Edit Your Supply Category
            </div>
            <div className={styles["edit-supply-category-modal__body"]}>
              <div>
                Supply Category ID:{" "}
                <span>{selectedEditItem?.supplyCategoryId}</span>
              </div>

              <div className={styles["edit-supply-category-modal__text-field"]}>
                <TextField
                  id="filled-basic"
                  label={
                    <span
                      className={styles["edit-supply-category-modal__text"]}
                    >
                      Supply Category Name
                    </span>
                  }
                  variant="standard"
                  fullWidth
                  value={nameEdit}
                  onChange={handleNameEditChange}
                />

                <FormControlLabel
                  checked={isActiveEdit}
                  onChange={handleIsActiveEditChange}
                  control={<Switch color="primary" />}
                  label={
                    <span className={styles["add-supply-category-modal__text"]}>
                      Active State
                    </span>
                  }
                  labelPlacement="top"
                />
              </div>
            </div>
            <div className={styles["edit-supply-category-modal__save-button"]}>
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

export default EditSupplyCategoryModal;

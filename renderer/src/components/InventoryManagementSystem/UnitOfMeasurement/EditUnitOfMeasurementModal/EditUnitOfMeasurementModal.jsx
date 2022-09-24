import React from "react";
import styles from "./EditUnitOfMeasurementModal.module.scss";
import ModalSaveButton from "src/components/Shared/Buttons/ModalSaveButton/ModalSaveButton";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Modal, Slide, Backdrop } from "@mui/material";

const EditUnitOfMeasurementModal = ({
  selectedEditItem,
  nameEdit,
  isActiveEdit,
  abbreviation,
  handleNameEditChange,
  handleAbbreviationChange,
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
        <div className={styles["edit-unit-of-measurement-modal"]}>
          <div className={styles["edit-unit-of-measurement-modal__content"]}>
            <div className={styles["edit-unit-of-measurement-modal__title"]}>
              Edit Your Unit of Measurement
            </div>
            <div className={styles["edit-unit-of-measurement-modal__body"]}>
              <div>
                Unit of Measurement ID:{" "}
                <span>{selectedEditItem?.unitOfMeasurementId}</span>
              </div>

              <div
                className={styles["edit-unit-of-measurement-modal__text-field"]}
              >
                <TextField
                  id="filled-basic"
                  label={
                    <span
                      className={styles["edit-unit-of-measurement-modal__text"]}
                    >
                      Unit of Measurement Name
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
                    <span
                      className={styles["edit-unit-of-measurement-modal__text"]}
                    >
                      Abbreviation
                    </span>
                  }
                  variant="standard"
                  fullWidth
                  value={abbreviation}
                  onChange={handleAbbreviationChange}
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
            <div
              className={styles["edit-unit-of-measurement-modal__save-button"]}
            >
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

export default EditUnitOfMeasurementModal;

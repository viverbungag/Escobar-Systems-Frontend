import React from "react";
import styles from "./AddUnitOfMeasurementModal.module.scss";
import ModalSaveButton from "../../Shared/Buttons/ModalSaveButton/ModalSaveButton";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Modal, Slide, Backdrop } from "@mui/material";

const AddUnitOfMeasurementModal = ({
  name,
  isActiveAdd,
  abbreviation,
  nameOnChange,
  abbreviationOnChange,
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
        <div className={styles["add-unit-of-measurement-modal"]}>
          <div className={styles["add-unit-of-measurement-modal__content"]}>
            <div className={styles["add-unit-of-measurement-modal__title"]}>
              Add Your Unit of Measurement
            </div>
            <div
              className={styles["add-unit-of-measurement-modal__text-field"]}
            >
              <TextField
                id="filled-basic"
                label={
                  <span
                    className={styles["add-unit-of-measurement-modal__text"]}
                  >
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
                  <span
                    className={styles["add-unit-of-measurement-modal__text"]}
                  >
                    Input abbreviation here
                  </span>
                }
                variant="standard"
                fullWidth
                value={abbreviation}
                onChange={abbreviationOnChange}
              />

              <FormControlLabel
                checked={isActiveAdd}
                onChange={handleIsActiveAddChange}
                control={<Switch color="primary" />}
                label={
                  <span
                    className={styles["add-unit-of-measurement-modal__text"]}
                  >
                    Active State
                  </span>
                }
                labelPlacement="top"
              />
            </div>
            <ModalSaveButton
              label="Add Unit of Measurement"
              onClick={onClickAddButton}
            />
          </div>
        </div>
      </Slide>
    </Modal>
  );
};

export default AddUnitOfMeasurementModal;

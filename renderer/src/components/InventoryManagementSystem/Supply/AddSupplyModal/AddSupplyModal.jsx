import React from "react";
import styles from "./AddSupplyModal.module.scss";
import ModalSaveButton from "../../Shared/Buttons/ModalSaveButton/ModalSaveButton";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Modal, Slide, Backdrop } from "@mui/material";
import ItemsSelect from "../../Shared/ItemsSelect/ItemsSelect";

const AddSupplyModal = ({
  allSuppliers,
  allUnitOfMeasurements,
  allSupplyCategories,
  name,
  minimumQuantity,
  supplier,
  unitOfMeasurement,
  supplyCategory,
  isActive,
  nameOnChange,
  minimumQuantityOnChange,
  supplierOnChange,
  unitOfMeasurementOnChange,
  supplyCategoryOnChange,
  isActiveOnChange,
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
        <div className={styles["add-supply-modal"]}>
          <div className={styles["add-supply-modal__content"]}>
            <div className={styles["add-supply-modal__title"]}>
              Add Your Supply
            </div>
            <div className={styles["add-supply-modal__text-field"]}>
              <TextField
                id="filled-basic"
                label={
                  <span className={styles["add-supply-modal__text"]}>
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
                type="number"
                label={
                  <span className={styles["add-supply-modal__text"]}>
                    Input Minimum Quantity here
                  </span>
                }
                variant="standard"
                fullWidth
                value={minimumQuantity}
                onChange={minimumQuantityOnChange}
              />
              <ItemsSelect
                label="Supply Category"
                items={allSupplyCategories}
                selectedItem={supplyCategory}
                itemOnChange={supplyCategoryOnChange}
              />

              <ItemsSelect
                label="Unit of Measurement"
                items={allUnitOfMeasurements}
                selectedItem={unitOfMeasurement}
                itemOnChange={unitOfMeasurementOnChange}
              />
              <ItemsSelect
                label="Supplier"
                items={allSuppliers}
                selectedItem={supplier}
                itemOnChange={supplierOnChange}
              />
              <FormControlLabel
                checked={isActive}
                onChange={isActiveOnChange}
                control={<Switch color="primary" />}
                label={
                  <span className={styles["add-supply-modal__text"]}>
                    Active State
                  </span>
                }
                labelPlacement="top"
              />
            </div>
            <ModalSaveButton label="Add Supply" onClick={onClickAddButton} />
          </div>
        </div>
      </Slide>
    </Modal>
  );
};

export default AddSupplyModal;

import React from "react";
import styles from "./EditSupplyModal.module.scss";
import ModalSaveButton from "src/components/Shared/Buttons/ModalSaveButton/ModalSaveButton";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Modal, Slide, Backdrop } from "@mui/material";
import ItemsSelect from "../../Shared/ItemsSelect/ItemsSelect";

const EditSupplyModal = ({
  allSuppliers,
  allUnitOfMeasurements,
  allSupplyCategories,
  selectedEditItem,
  name,
  quantity,
  minimumQuantity,
  inMinimumQuantity,
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
        <div className={styles["edit-supply-modal"]}>
          <div className={styles["edit-supply-modal__content"]}>
            <div className={styles["edit-supply-modal__title"]}>
              Edit Your Supply
            </div>
            <div className={styles["edit-supply-modal__body"]}>
              <div>
                <div>Supply ID: {selectedEditItem?.supplyId}</div>
              </div>

              <div className={styles["edit-supply-modal__text-field"]}>
                <TextField
                  id="filled-basic"
                  label={
                    <span className={styles["edit-supply-modal__text"]}>
                      Supply Name
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
                    <span className={styles["edit-supply-modal__text"]}>
                      Minimum Quantity:
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
                    <span className={styles["edit-supply-modal__text"]}>
                      Active State
                    </span>
                  }
                  labelPlacement="top"
                />
              </div>
            </div>
            <div className={styles["edit-supply-modal__save-button"]}>
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

export default EditSupplyModal;

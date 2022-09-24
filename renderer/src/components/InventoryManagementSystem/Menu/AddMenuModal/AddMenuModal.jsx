import React, { useState, useEffect } from 'react';
import styles from "./AddMenuModal.module.scss";
import ModalSaveButton from "../../Shared/Buttons/ModalSaveButton/ModalSaveButton";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Modal, Slide, Backdrop } from "@mui/material";
import ItemsSelect from "../../Shared/ItemsSelect/ItemsSelect";
import IngredientsTable from "../IngredientsTable/IngredientsTable";
import EditIngredientsButton from "../../Shared/Buttons/EditIngredientsButton/EditIngredientsButton";
import EditIngredientsModal from "../EditIngredientsModal/EditIngredientsModal";
import MenuIngredients from "src/model/MenuIngredients";

const AddMenuModal = ({
  activeMenus,
  inactiveMenus,
  allMenuCategories,
  allIngredients,
  name,
  price,
  menuCategory,
  ingredients,
  isActive,
  nameOnChange,
  priceOnChange,
  menuCategoryOnChange,
  ingredientsOnChange,
  isActiveOnChange,
  onClickAddButton,
  openAddModal,
  handleCloseAddModal,
}) => {
  const [openIngredientModal, setOpenIngredientModal] = useState(false);
  const handleOpenIngredientModal = () => setOpenIngredientModal(true);
  const handleCloseIngredientModal = () => setOpenIngredientModal(false);
  const handleSaveButtonOnClick = (newIngredients) => {
    const newSelectedIngredients = [];
    newIngredients.forEach((ingredient) => {
      if (!ingredient.quantity) {
        ingredient.quantity = 0;
      }

      if (ingredient.isSelected) {
        newSelectedIngredients.push(
          new MenuIngredients(
            1,
            ingredient.name,
            ingredient.quantity,
            ingredient.unitOfMeasurement
          )
        );
      }
    });

    ingredientsOnChange(newSelectedIngredients);
    handleCloseIngredientModal();
  };

  return (
    <>
      <EditIngredientsModal
        activeMenus={activeMenus}
        inactiveMenus={inactiveMenus}
        menuName={name}
        allIngredients={allIngredients}
        ingredients={ingredients}
        onClickSaveButton={handleSaveButtonOnClick}
        openEditModal={openIngredientModal}
        editModalOnClose={handleCloseIngredientModal}
      />
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
          <div className={styles["add-menu-modal"]}>
            <div className={styles["add-menu-modal__content"]}>
              <div className={styles["add-menu-modal__left-section"]}>
                <div className={styles["add-menu-modal__title"]}>
                  Add Your Menu
                </div>
                <div className={styles["add-menu-modal__text-field"]}>
                  <TextField
                    id="filled-basic"
                    label={
                      <span className={styles["add-menu-modal__text"]}>
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
                      <span className={styles["add-menu-modal__text"]}>
                        Input the price here
                      </span>
                    }
                    variant="standard"
                    fullWidth
                    value={price}
                    onChange={priceOnChange}
                  />
                  <ItemsSelect
                    label="Menu Category"
                    items={allMenuCategories}
                    selectedItem={menuCategory}
                    itemOnChange={menuCategoryOnChange}
                  />

                  <FormControlLabel
                    checked={isActive}
                    onChange={isActiveOnChange}
                    control={<Switch color="primary" />}
                    label={
                      <span className={styles["add-menu-modal__text"]}>
                        Active State
                      </span>
                    }
                    labelPlacement="top"
                  />
                </div>
                <div className={styles["add-menu-modal__save-button"]}>
                  <ModalSaveButton
                    label="Add Menu"
                    onClick={onClickAddButton}
                  />
                </div>
              </div>
              <div className={styles["add-menu-modal__right-section"]}>
                <EditIngredientsButton
                  label="Edit Ingredients"
                  onClick={handleOpenIngredientModal}
                />

                <IngredientsTable ingredients={ingredients} />
              </div>
            </div>
          </div>
        </Slide>
      </Modal>
    </>
  );
};

export default AddMenuModal;

import React, { useState, useEffect } from "react";
import styles from "./EditIngredientsModal.module.scss";
import ModalSaveButton from "../../Shared/Buttons/ModalSaveButton/ModalSaveButton";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Modal, Slide, Backdrop } from "@mui/material";
import ItemsSelect from "../../Shared/ItemsSelect/ItemsSelect";
import EditIngredientsTable from "../EditIngredientsTable/EditIngredientsTable";
import MenuIngredients from "src/model/MenuIngredients";

const EditIngredientsModal = ({
  activeMenus,
  inactiveMenus,
  menuName,
  allIngredients,
  ingredients,
  onClickSaveButton,
  openEditModal,
  editModalOnClose,
}) => {
  const [updatedIngredients, setUpdatedIngredients] = useState([]);

  const handleIngredientsIsSelectedOnChange = (ingredientName) =>{
    const newIngredients = updatedIngredients.map((currentIngredient)=>{
      if (currentIngredient.name === ingredientName){
        return {
          name: currentIngredient.name,
          quantity: currentIngredient.quantity,
          unitOfMeasurement: currentIngredient.unitOfMeasurement,
          isSelected: !currentIngredient.isSelected
        }
      }
      return currentIngredient;
    })
    setUpdatedIngredients(newIngredients);
  }

  const handleIngredientsQuantityOnChange = (ingredientName, newQuantity) => {
    const newIngredients = updatedIngredients.map((currentIngredient)=>{
      if (currentIngredient.name === ingredientName){
        return {
          name: currentIngredient.name,
          quantity: newQuantity ? parseFloat(newQuantity):newQuantity,
          unitOfMeasurement: currentIngredient.unitOfMeasurement,
          isSelected: currentIngredient.isSelected
        }
      }
      return currentIngredient;
    })
    setUpdatedIngredients(newIngredients);
  }

  useEffect(() => {
    const ingredientWithSelectedIndication = allIngredients.map(
      (currentIngredient) => {
        let isIngredientSelected = false;
        let quantity = "";
        let unitOfMeasurement = "";

        for (let index in ingredients) {
          if (currentIngredient.supplyName === ingredients[index].supplyName) {
            isIngredientSelected = true;
            quantity = ingredients[index].quantity;
            unitOfMeasurement = ingredients[index].unitOfMeasurementName;
          }
        }
        return {
          name: currentIngredient.supplyName,
          quantity: quantity,
          unitOfMeasurement: currentIngredient.unitOfMeasurementAbbreviation,
          isSelected: isIngredientSelected,
        };
      }
    );

    setUpdatedIngredients(ingredientWithSelectedIndication);
  }, [activeMenus, inactiveMenus]);

  return (
    <Modal
      open={openEditModal}
      onClose={editModalOnClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Slide direction="down" in={openEditModal} mountOnEnter unmountOnExit>
        <div className={styles["edit-ingredients-modal"]}>
          <div className={styles["edit-ingredients-modal__content"]}>
            <div className={styles["edit-ingredients-modal__title"]}>
              Edit the Ingredients of {menuName}
            </div>
            <EditIngredientsTable allIngredients={updatedIngredients} isSelectedOnChange={handleIngredientsIsSelectedOnChange} quantityOnChange={handleIngredientsQuantityOnChange}/>
            <div className={styles["edit-ingredients-modal__edit-button"]}>
              <ModalSaveButton
                label="Save Ingredients"
                onClick={()=>onClickSaveButton(updatedIngredients)}
              />
            </div>
          </div>
        </div>
      </Slide>
    </Modal>
  );
};

export default EditIngredientsModal;

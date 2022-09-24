import React, { useState, useEffect } from "react";
import styles from "./EditIngredientsTable.module.scss";
import { Checkbox } from "@mui/material";

const EditIngredientsTable = ({
  allIngredients,
  isSelectedOnChange,
  quantityOnChange,
}) => {

  return (
    <div className={styles["edit-ingredients-table"]}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Ingredient Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {allIngredients.map((ingredient, index) => {
            return (
              <tr key={ingredient.name + index} className={ingredient.isSelected ? undefined: styles["edit-ingredients-table__row--disabled"]}>
                <td className={styles["edit-ingredients-table__checkbox-row"]}>
                  <Checkbox
                    checked={ingredient.isSelected}
                    onChange={() => {
                      isSelectedOnChange(ingredient.name);
                    }}
                  />
                </td>
                <td>{ingredient.name}</td>
                <td>
                  <input
                    type="number"
                    className={styles["edit-ingredients-table__input"]}
                    value={ingredient.quantity}
                    onChange={(event) => {
                      quantityOnChange(ingredient.name, event.target.value);
                    }}
                    disabled={!ingredient.isSelected}
                  />
                  <span
                    className={styles["edit-ingredients-table__measurement"]}
                  >
                    {ingredient.unitOfMeasurement}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EditIngredientsTable;

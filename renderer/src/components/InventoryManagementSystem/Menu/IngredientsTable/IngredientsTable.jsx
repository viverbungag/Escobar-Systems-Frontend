import React from "react";
import styles from "./IngredientsTable.module.scss";

const IngredientsTable = ({ ingredients }) => {
  return (
    <div className={styles["ingredients-table"]}>
      <table>
        <thead>
          <tr>
            <th>Ingredient Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient, index) => (
            <tr key={ingredient.supplyName + index}>
              <td>{ingredient.supplyName}</td>
              <td>{`${ingredient.quantity} ${ingredient.unitOfMeasurementName}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IngredientsTable;

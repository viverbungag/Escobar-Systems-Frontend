import React from "react";
import styles from "./DeleteExpenseModal.module.scss";
import MediumButton from "../../Shared/MediumButton/MediumButton";
import Rest from "../../../../rest/Rest.tsx";
import dateFormat from "dateformat";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

export default function DeleteExpenseModal({
  deleteSuccessAction,
  selectedValues,
}) {
  const rest = new Rest();
  const handleSubmit = () => {
    selectedValues.map((item) => {
      rest.delete(
        `${INITIAL_URL}/expense/delete/${item.expenseId}`,
        item,
        deleteSuccessAction,
        `Successfully deleted ${selectedValues.length} expense/s.`
      );
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Confirm Delete</div>
      <div className={styles.content}>
        {selectedValues.map((item) => {
          return (
            <div className={styles.content_row} key={item.expenseId}>
              <div className={styles.details}>{item.expenseCategoryName}</div>
              <div className={styles.details}>{item.expenseDescription}</div>
              <div className={styles.details}>
                {dateFormat(item.expenseDate, "m/d/yyyy")}
              </div>
              <div className={styles.details}>P{item.expenseCost}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.footer}>
        <button onClick={handleSubmit}>
          <MediumButton label="Submit" />
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import styles from './DeleteExpenseModal.module.scss';
import MediumButton from '../../Shared/MediumButton/MediumButton';
import Rest from "../../../rest/Rest.tsx";

const INITIAL_URL = "http://localhost:8080/api/v1";

export default function DeleteExpenseModal({ deleteSuccessAction, selectedValues }) {
    const rest = new Rest();
    const handleSubmit = () => {
        selectedValues.map((item) => {
            rest.delete(
                `${INITIAL_URL}/expense/delete/${item.expenseId}`,
                item,
                deleteSuccessAction,
                `Successfully deleted expense.`
            )
        })
    }

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            Confirm Delete
        </div>
        <div className={styles.content}>
        {selectedValues.map((item) => {
            return (
                <div className={styles.content_row} key={item.expenseId}>
                    <div className={styles.details}>
                        ID: {item.expenseId}
                    </div>
                    <div className={styles.details}>
                        {item.expenseCategoryName}
                    </div>
                    <div className={styles.details}>
                        {item.expenseDescription}
                    </div>
                    <div className={styles.details}>
                        {item.expenseDate}
                    </div>
                    <div className={styles.details}>
                        P{item.expenseCost}
                    </div>
                </div>
            )
        })}
        </div>
        <div className={styles.footer}>
            <button onClick={handleSubmit}>
                <MediumButton label="Submit" />
            </button>
        </div>
    </div>
  )
}

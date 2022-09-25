import React from 'react';
import styles from './ActivateAccountModal.module.scss';
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';
import Rest from "../../../rest/Rest.tsx";

const INITIAL_URL = "http://localhost:8080/api/v1";

export default function ActivateAccountModal({ activateSuccessAction, selectedValues }) {
    console.log(selectedValues)
    const rest = new Rest();

    const handleSubmit = () => {
        rest.activate(
            `${INITIAL_URL}/account/activate`,
            { 'accountUsernames' : selectedValues.map((item) => item.accountUsername)},
            activateSuccessAction,
            `Successfully activated ${selectedValues.length} account/s`
        )
    }

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            Confirm Activate
        </div>
        <div className={styles.content}>
        {selectedValues.map((item) => {
            return (
                <div className={styles.content_row} key={item.accountId}>
                    <div className={styles.details}>
                        ID: {item.accountId}
                    </div>
                    <div className={styles.details}>
                        Employee Name: {item.employeeName}
                    </div>
                </div>
            )
        })}
        </div>
        <div className={styles.footer}>
            <button onClick={handleSubmit}>
                <MediumButton label='Submit' />
            </button>
        </div>
    </div>
  )
}

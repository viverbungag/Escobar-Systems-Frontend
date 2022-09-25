import React from 'react';
import styles from './ActivateTypes.module.scss';
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';
import Rest from "../../../rest/Rest.tsx";

const INITIAL_URL = "http://localhost:8080/api/v1";

export default function ActivateTypes({ activateSuccessAction, selectedValues }) {
    const rest = new Rest();
    const handleSubmit = () => {
        rest.activate(
            `${INITIAL_URL}/employee-type/activate`,
            { 'employeeTypeListDto':selectedValues},
            activateSuccessAction,
            `Successfully activated ${selectedValues.length} expense category.`
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
                <div className={styles.content_row} key={item.employeeTypeId}>
                    <div className={styles.details}>
                        ID: {item.employeeTypeId}
                    </div>
                    <div className={styles.details}>
                        Employee Type Name: {item.employeeTypeName}
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

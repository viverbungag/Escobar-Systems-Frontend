import React from 'react';
import styles from './InactivateTypes.module.scss';
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';
import Rest from "../../../rest/Rest.tsx";

const INITIAL_URL = "http://localhost:8080/api/v1";

export default function InactivateTypes({ inactivateSuccessAction, selectedValues }) {
    const rest = new Rest();
    const handleSubmit = () => {
        rest.inactivate(
            `${INITIAL_URL}/employee-type/inactivate`,
            { 'employeeTypeListDto':selectedValues},
            inactivateSuccessAction,
            `Successfully inactivated ${selectedValues.length} expense category.`
        )
    }

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            Confirm Inactivate
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

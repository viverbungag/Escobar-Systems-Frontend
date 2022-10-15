import React from "react";
import MediumButton from "../../Shared/Buttons/MediumButton/MediumButton";
import styles from "./InactivateEmployeeModal.module.scss";
import Rest from "../../../../rest/Rest.tsx";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

export default function InactivateEmployeeModal({
  inactivateSuccessAction,
  selectedValues,
}) {
  const rest = new Rest();

  const handleSubmit = () => {
    rest.inactivate(
      `${INITIAL_URL}/employee/inactivate`,
      { employeeListDto: selectedValues },
      inactivateSuccessAction,
      `Successfully inactivated ${selectedValues.length} employee/s`
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Confirm Inactivate</div>
      <div className={styles.content}>
        {selectedValues.map((item) => {
          return (
            <div className={styles.content_row} key={item.employeeId}>
              <div className={styles.details}>
                <div className={styles.details__icon}>
                  <PersonOutlineIcon />
                </div>
                <div className={styles.details__name}>
                  {item.employeeLastName}, {item.employeeFirstName}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.footer}>
        <button onClick={handleSubmit}>
          <MediumButton label="Confirm" />
        </button>
      </div>
    </div>
  );
}

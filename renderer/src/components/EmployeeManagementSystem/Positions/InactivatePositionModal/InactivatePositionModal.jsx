import React from "react";
import MediumButton from "../../Shared/Buttons/MediumButton/MediumButton";
import styles from "./InactivatePositionModal.module.scss";
import Rest from "../../../../rest/Rest.tsx";
import InfoIcon from "@mui/icons-material/Info";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

export default function InactivatePositionModal({
  inactivateSuccessAction,
  selectedValues,
}) {
  const rest = new Rest();
  const handleSubmit = () => {
    rest.inactivate(
      `${INITIAL_URL}/employee-position/inactivate`,
      { employeePositionListDto: selectedValues },
      inactivateSuccessAction,
      `Successfully inactivated ${selectedValues.length} employee position/s.`
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Confirm Inactivate</div>
      <div className={styles.content}>
        {selectedValues.map((item) => {
          return (
            <div className={styles.content_row} key={item.employeePositionId}>
              <div className={styles.details}>
                <div className={styles.details__icon}>
                  <InfoIcon />
                </div>
                <div className={styles.details__name}>
                  {item.employeePositionName}
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

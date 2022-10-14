import React from "react";
import styles from "./InactivateTypes.module.scss";
import MediumButton from "../../Shared/Buttons/MediumButton/MediumButton";
import Rest from "../../../../rest/Rest.tsx";
import InfoIcon from "@mui/icons-material/Info";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

export default function InactivateTypes({
  inactivateSuccessAction,
  selectedValues,
}) {
  const rest = new Rest();
  const handleSubmit = () => {
    rest.inactivate(
      `${INITIAL_URL}/employee-type/inactivate`,
      { employeeTypeListDto: selectedValues },
      inactivateSuccessAction,
      `Successfully inactivated ${selectedValues.length} employee type/s.`
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Confirm Inactivate</div>
      <div className={styles.content}>
        {selectedValues.map((item) => {
          return (
            <div className={styles.content_row} key={item.employeeTypeId}>
              <div className={styles.details}>
                <InfoIcon />
                {item.employeeTypeName}
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

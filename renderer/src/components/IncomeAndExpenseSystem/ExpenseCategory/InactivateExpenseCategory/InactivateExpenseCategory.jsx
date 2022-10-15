import React from "react";
import styles from "./InactivateExpenseCategory.module.scss";
import MediumButton from "../../Shared/MediumButton/MediumButton";
import Rest from "../../../../rest/Rest.tsx";
import InfoIcon from "@mui/icons-material/Info";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

export default function InactivateExpenseCategory({
  inactivateSuccessAction,
  selectedValues,
}) {
  const rest = new Rest();
  const handleSubmit = () => {
    rest.inactivate(
      `${INITIAL_URL}/expense-category/inactivate`,
      { expenseCategoryListDto: selectedValues },
      inactivateSuccessAction,
      `Successfully inactivated ${selectedValues.length} expense category/s.`
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Confirm Inactivate</div>
      <div className={styles.content}>
        {selectedValues.map((item) => {
          return (
            <div className={styles.content_row} key={item.expenseCategoryId}>
              <div className={styles.details}>
              <div className={styles.details__icon}>
                <InfoIcon />
              </div>
              <div className={styles.details__name}>
                {item.expenseCategoryName}
              </div>
              </div>
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

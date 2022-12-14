import React from "react";
import styles from "./ActivateAccountModal.module.scss";
import MediumButton from "../../Shared/Buttons/MediumButton/MediumButton";
import Rest from "../../../../rest/Rest.tsx";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

export default function ActivateAccountModal({
  activateSuccessAction,
  selectedValues,
}) {
  console.log(selectedValues);
  const rest = new Rest();

  const handleSubmit = () => {
    rest.activate(
      `${INITIAL_URL}/account/activate`,
      { accountUsernames: selectedValues.map((item) => item.accountUsername) },
      activateSuccessAction,
      `Successfully activated ${selectedValues.length} account/s`
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Confirm Activate</div>
      <div className={styles.content}>
        {selectedValues.map((item) => {
          return (
            <div className={styles.content_row} key={item.accountId}>
              <div className={styles.details}>
                <div className={styles.details__icon}>
                  <PersonOutlineIcon />
                </div>
                <div className={styles.details__name}>
                  {item.accountUsername}
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

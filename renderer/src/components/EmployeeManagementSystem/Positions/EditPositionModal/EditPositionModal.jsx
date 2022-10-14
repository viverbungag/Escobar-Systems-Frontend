import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import MediumButton from "../../Shared/Buttons/MediumButton/MediumButton";
import styles from "./EditPositionModal.module.scss";
import Rest from "../../../../rest/Rest.tsx";
import Position from "../../../../model/Position.tsx";
import { toast } from "react-toastify";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

// function onlyLetters(data) {
//   return /^[a-zA-Z\s]+$/.test(data);
// }

function capitalizeData(data) {
  var separateWord = data.toLowerCase().split(" ");
  for (var i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(" ");
}

export default function EditPositionModal({
  editSuccessAction,
  employeePositionId,
  employeePositionName,
}) {
  const rest = new Rest();

  const [positionName, setPositionName] = useState(employeePositionName[0]);
  const handlePositionNameOnChange = (e) => {
    setPositionName(capitalizeData(e.target.value));
  };

  const [positionNameError, setPositionNameError] = useState(false);
  const handleSubmit = () => {
    if (positionName == "") {
      toast.error("Position name cannot be empty.");
      setPositionNameError(true);
      return;
    } else {
      setPositionNameError(false);
    }

    const newPositionValues = new Position(
      employeePositionId[0],
      positionName,
      true
    );

    rest.update(
      `${INITIAL_URL}/employee-position/update/${newPositionValues.employeePositionId}`,
      newPositionValues,
      editSuccessAction,
      `Successfully edited ${newPositionValues.employeePositionName}`
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.header}>Edit employee position</div>
        <div className={styles.content}>
          <TextField
            onChange={handlePositionNameOnChange}
            label="Employee Position Name"
            value={positionName}
            variant="standard"
            error={positionNameError == true}
            fullWidth
          />
        </div>
        <div className={styles.footer}>
          <button onClick={handleSubmit}>
            <MediumButton label="SUBMIT" />
          </button>
        </div>
      </div>
    </div>
  );
}

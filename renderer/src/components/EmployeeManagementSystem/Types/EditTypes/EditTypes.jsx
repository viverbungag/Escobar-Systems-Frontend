import React, { useState, useEffect } from "react";
import styles from "./EditTypes.module.scss";
import Rest from "../../../../rest/Rest.tsx";
import Type from "../../../../model/Types.tsx";
import { TextField } from "@mui/material";
import MediumButton from "../../Shared/Buttons/MediumButton/MediumButton";
import { toast } from "react-toastify";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

function capitalizeData(data) {
  var separateWord = data.toLowerCase().split(" ");
  for (var i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(" ");
}

export default function EditTypes({
  editSuccessAction,
  employeeTypeId,
  employeeTypeName,
}) {
  const rest = new Rest();
  const [typeName, setTypeName] = useState(employeeTypeName[0]);
  const handleTypeNameOnChange = (e) => {
    setTypeName(capitalizeData(e.target.value));
  };

  const [typeNameError, setTypeNameError] = useState(false);
  const handleSubmit = () => {
    if (typeName === "") {
      toast.error("Type name must not be empty.");
      setTypeNameError(true);
      return;
    } else {
      setTypeNameError(false);
    }

    const newTypeValues = new Type(employeeTypeId[0], typeName, true);

    rest.update(
      `${INITIAL_URL}/employee-type/update/${newTypeValues.employeeTypeId}`,
      newTypeValues,
      editSuccessAction,
      `Successfully edited ${newTypeValues.employeeTypeName}`
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.header}>Edit employee type</div>
        <div className={styles.content}>
          <TextField
            onChange={handleTypeNameOnChange}
            label="Employee Type Name"
            value={typeName}
            variant="standard"
            error={typeNameError == true}
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

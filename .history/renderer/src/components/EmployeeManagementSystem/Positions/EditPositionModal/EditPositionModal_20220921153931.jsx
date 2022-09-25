import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';
import styles from './EditPositionModal.module.scss';

import Rest from "../../../rest/Rest.tsx";
import Position from '../../../model/Position.tsx';

const INITIAL_URL = "http://localhost:8080/api/v1";

function capitalizeData(data){
  // data = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
  // return data;
  var separateWord = data.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
        separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
        separateWord[i].substring(1);
    }
    return separateWord.join(' ');
}

export default function EditPositionModal({ editSuccessAction, employeePositionId, employeePositionName }) {
  const rest = new Rest();

  const [newEmployeeValues, setNewEmployeeValues] = useState(
    new Position(
      employeePositionId[0],
      employeePositionName,
      true,
    )
  )

  const handleChange = (e) => {
    setNewEmployeeValues({...newEmployeeValues, [e.target.name]:capitalizeData(e.target.value)});
  }
  
  const handleSubmit = () => {
    rest.update(
      `${INITIAL_URL}/employee-position/update/${newEmployeeValues.employeePositionId}`, 
      newEmployeeValues,
      editSuccessAction,
      `Successfully edited ${newEmployeeValues.employeePositionName}`
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.header}>
            Editing employee position: <span style={{ fontWeight: 700, textTransform: "uppercase"}}>{employeePositionName}</span>
        </div>
        <div className={styles.content}>
          <div className={styles.content_header}>
              Position ID: {employeePositionId}
            </div>
            <div className={styles.textfield}>
              <TextField onChange={handleChange} name="employeePositionName" label="Employee Position Name" variant="standard" fullWidth />
          </div>
        </div>
        <div className={styles.footer}>
          <button onClick={handleSubmit}>
            <MediumButton label="SUBMIT" />
          </button>
        </div>
      </div>
    </div>
  )
}

import { TextField } from '@mui/material';
import React, { useState } from 'react';
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';
import styles from './AddPositionForm.module.scss';
import Rest from '../../../rest/Rest.tsx';
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
export default function AddPositionForm({ addSuccessAction }) {
  const rest = new Rest();
  const [newPosition, setNewPosition] = useState("");
  const handleChange = (e) => {
    setNewPosition(e.target.value);
  }
  const handleSubmit = () => {
    newPosition = capitalizeData(newPosition)
    const addedPosition = (
      new Position(
        1,
        newPosition,
        true
        
      )
    )
    rest.add(
      `${INITIAL_URL}/employee-position/add`,
      addedPosition,
      addSuccessAction,
      `Successfully added employee position named ${newPosition}`
    );
  }

  return (
    <div className={styles.form}>
        <div className={styles.header}>
            Add Employee Position
        </div>
        <div className={styles.content}>
            <TextField name="employeePositionName" label="Employee Position Name" variant="standard" onChange={handleChange} fullWidth />
          <div className={styles.button}>
            <button onClick={handleSubmit}>
              <MediumButton label="SUBMIT" />
            </button>   
          </div>
        </div>
    </div>
  )
}

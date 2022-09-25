import React, { useState, useEffect } from 'react';
import styles from './EditEmployeeModal.module.scss';
import Select from 'react-select';
import Employee from '../../../model/Employee.tsx';
import Rest from '../../../rest/Rest.tsx';
import { TextField } from '@mui/material';
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const INITIAL_URL = "http://localhost:8080/api/v1";

function onlyLetters(data){
  return (/^[a-zA-Z\s]+$/).test(data);
}

function superiorNameValid(data){ //last, first
  return (/^[a-zA-Z\s]+\,\s[a-zA-Z\s]+$/).test(data);
}

function onlyLettersNumbers(data){
  return (/^[a-zA-Z0-9\s]+$/).test(data);
}

function validNumber(data){
  return (/^0\d{10}$/).test(data);
}

function capitalizeData(data){
  // data = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
  // return data;
  var separateWord = data.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
        separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
        separateWord[i].substring(1);
    }
    console.log(separateWord.join(' '));
    return separateWord.join(' ');
}

export default function EditEmployeeModal({ editSuccessAction, employeeData, activeEmployees }) {
  const rest = new Rest();
  //selected employee
  const selectedEmployee = employeeData[0];
  //get positions
  const [activePositions, setActivePositions] = useState([]);
  const handleActivePositions = (data) => {
    setActivePositions(data);
  }
  const getActivePositions = () => {
    rest.get(`${INITIAL_URL}/employee-position`, handleActivePositions);
  }
  //get active types data
  const [activeTypes, setActiveTypes] = useState([]);
  const handleActiveTypes = (data) => {
    setActiveTypes(data);
  }
  const getActiveTypes = () => {
    rest.get(`${INITIAL_URL}/employee-type`, handleActiveTypes);
  }
   //input values
   const [values, setValues] = useState(
    new Employee(
      selectedEmployee.employeeId, 
      selectedEmployee.employeeFirstName,
      selectedEmployee.employeeLastName,
      selectedEmployee.employeeAddress,
      selectedEmployee.employeeContactNumber,
      selectedEmployee.dateEmployed,
      selectedEmployee.employeePositionName,
      selectedEmployee.employeeTypeName,
      selectedEmployee.superiorEmployeeName,
      selectedEmployee.isActive
    )
  )
  //onChange for all inputs
  const onChange = (e) => {
    if(e.target == undefined){
      setValues({...values, [e.key]:e.value})
    }else{
      setValues({...values, [e.target.name]:capitalizeData(e.target.value)})
    }
  }
  //submit
  const handleSubmit = () => {
    rest.update(
      `${INITIAL_URL}/employee/update/${selectedEmployee.employeeId}`,
      values,
      editSuccessAction,
      `Successfully edited employeee ${selectedEmployee.employeeId}`
    )
  }
  //edit status
  const [toEdit, setToEdit] = useState(false);
  const isEdit = () => {
     if(toEdit){
         setToEdit(false);
     }else {
         setToEdit(true);
     }
  }

  useEffect(() => {
    getActivePositions();
    getActiveTypes();
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_id}>
          Employee {selectedEmployee.employeeId}
        </div>
        <div className={styles.header_icon}>
          {toEdit ? (
              <HighlightOffIcon className={styles.header_icon_exit} onClick={isEdit} />
          ) : (
              <EditIcon className={styles.header_icon_edit} onClick={isEdit} />
          )}
        </div>
      </div>
      {toEdit ? (
        <>
          <div className={styles.content}>
            <div className={styles.group}>
              <div className={styles.group_label}>
                Name
              </div>
              <div className={styles.group_textfields}>
                <div className={styles.group_textfields_row}>
                  <TextField onChange={onChange} name="employeeLastName" label="Last" defaultValue={selectedEmployee.employeeLastName} variant="standard" fullWidth />
                </div>
                <div className={styles.group_textfields_row}>
                  <TextField onChange={onChange} name="employeeFirstName" label="First" defaultValue={selectedEmployee.employeeFirstName} variant="standard" fullWidth />
                </div>
              </div>
            </div>
            <div className={styles.group}>
              <div className={styles.group_label}>
                Personal Details
              </div>
              <div className={styles.group_textfields}>
                <div className={styles.group_textfields_row}>
                  <TextField onChange={onChange} name="employeeAddress" label="Address" defaultValue={selectedEmployee.employeeAddress} variant="standard" fullWidth />
                </div>
                <div className={styles.group_textfields_row}>
                  <TextField onChange={onChange} name="employeeContactNumber" label="Contact Number" defaultValue={selectedEmployee.employeeContactNumber} variant="standard" fullWidth />
                </div>
              </div>
            </div>
            <div className={styles.group}>
              <div className={styles.group_label}>
                Work Details
              </div>
              <div className={styles.group_textfields}>
                <div className={styles.group_textfields_row}>
                  <div className={styles.group_textfields_select}>
                    <div className={styles.group_textfields_select_label}>Superior</div>
                    <Select
                      placeholder={selectedEmployee.superiorEmployeeName}
                      defaultValue={selectedEmployee.superiorEmployeeName}
                      options={activeEmployees.map((item) => {
                        return {
                          key: 'superiorEmployeeName',
                          value: `${item.employeeLastName}, ${item.employeeFirstName}`,
                          label: `${item.employeeLastName}, ${item.employeeFirstName}`
                        }
                      })}
                      onChange={onChange}
                    />
                  </div>
                  <div className={styles.group_textfields_select}>
                    <div className={styles.group_textfields_select_label}>Position</div>
                    <Select
                      placeholder={selectedEmployee.employeePositionName}
                      defaultValue={selectedEmployee.employeePositionName}
                      options={activePositions.map((item) => {
                        return {
                          key: 'employeePositionName',
                          value: item,
                          label: item
                        }
                      })}
                      onChange={onChange}
                    />
                  </div>
                  <div className={styles.group_textfields_select}>
                    <div className={styles.group_textfields_select_label}>Type</div>
                    <Select
                      placeholder={selectedEmployee.employeeTypeName}
                      defaultValue={selectedEmployee.employeeTypeName}
                      options={activeTypes.map((item) => {
                        return {
                          key: 'employeeTypeName',
                          value: item,
                          label: item
                        }
                      })}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <button onClick={handleSubmit}>
              <MediumButton label="Submit" />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.content}>
            <div className={styles.group}>
              <div className={styles.group_label}>
                Name
              </div>
              <div className={styles.group_textfields}>
                <div className={styles.group_textfields_row}>
                  <div className={styles.group_texfields_column}>
                    <div className={styles.group_textfields_row_label}>Last</div>
                    {selectedEmployee.employeeLastName}
                  </div>
                </div>
                <div className={styles.group_textfields_row}>
                  <div className={styles.group_texfields_column}>
                    <div className={styles.group_textfields_row_label}>Last</div>
                    {selectedEmployee.employeeFirstName}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.group}>
              <div className={styles.group_label}>
                Personal Details
              </div>
              <div className={styles.group_textfields}>
                <div className={styles.group_textfields_row}>
                  <div className={styles.group_texfields_column}>
                    <div className={styles.group_textfields_row_label}>Address</div>
                    {selectedEmployee.employeeAddress}
                  </div>
                </div>
                <div className={styles.group_textfields_row}>
                  <div className={styles.group_texfields_column}>
                    <div className={styles.group_textfields_row_label}>Contact Number</div>
                    {selectedEmployee.employeeContactNumber}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.group}>
              <div className={styles.group_label}>
                Work Details
              </div>
              <div className={styles.group_textfields}>
                <div className={styles.group_textfields_row}>
                  <div className={styles.group_textfields_select}>
                    <div className={styles.group_textfields_select_label}>Superior</div>
                      {selectedEmployee.superiorEmployeeName}
                  </div>
                  <div className={styles.group_textfields_select}>
                    <div className={styles.group_textfields_select_label}>Position</div>
                      {selectedEmployee.employeePositionName}
                  </div>
                  <div className={styles.group_textfields_select}>
                    <div className={styles.group_textfields_select_label}>Type</div>
                      {selectedEmployee.employeeTypeName}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footer_invisible}>
            <button onClick={handleSubmit}>
              <MediumButton label="Submit" />
            </button>
          </div>
        </>
      ) }
    </div>
  )
}

import React, { useState, useEffect } from "react";
import styles from "./EditEmployeeModal.module.scss";
import Select from "react-select";
import Employee from "../../../../model/Employee.tsx";
import Rest from "../../../../rest/Rest.tsx";
import { TextField } from "@mui/material";
import MediumButton from "../../Shared/Buttons/MediumButton/MediumButton";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { toast } from "react-toastify";
import dateFormat from "dateformat";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

function onlyLetters(data) {
  return /^[a-zA-Z\s]+$/.test(data);
}

// function superiorNameValid(data) {
//   //last, first
//   return /^[a-zA-Z\s]+\,\s[a-zA-Z\s]+$/.test(data);
// }

// function onlyLettersNumbers(data) {
//   return /^[a-zA-Z0-9\s]+$/.test(data);
// }

// function validNumber(data) {
//   return /^0\d{10}$/.test(data);
// }

// function capitalizeData(data) {
//   var separateWord = data.toLowerCase().split(" ");
//   for (var i = 0; i < separateWord.length; i++) {
//     separateWord[i] =
//       separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
//   }
//   return separateWord.join(" ");
// }

export default function EditEmployeeModal({
  editSuccessAction,
  employeeData,
  activeEmployees,
}) {
  const rest = new Rest();
  //selected employee
  const selectedEmployee = employeeData[0];
  //get positions
  const [activePositions, setActivePositions] = useState([]);
  const handleActivePositions = (data) => {
    setActivePositions(data);
  };
  const getActivePositions = () => {
    rest.get(`${INITIAL_URL}/employee-position`, handleActivePositions);
  };
  //get active types data
  const [activeTypes, setActiveTypes] = useState([]);
  const handleActiveTypes = (data) => {
    setActiveTypes(data);
  };
  const getActiveTypes = () => {
    rest.get(`${INITIAL_URL}/employee-type`, handleActiveTypes);
  };
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
  );
  //onChange for all inputs
  const onChange = (e) => {
    if (e.target == undefined) {
      setValues({ ...values, [e.key]: e.value });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };
  const [lastNameError, setLastNameError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  //submit
  const handleSubmit = () => {
    if (values.employeeLastName == "") {
      toast.error("Last name must not be empty.");
      setLastNameError(true);
      return;
    } else {
      setLastNameError(false);
    }

    if (!onlyLetters(values.employeeLastName)) {
      toast.error("Last name must not have numbers or special characters.");
      setLastNameError(true);
      return;
    } else {
      setLastNameError(false);
    }

    if (values.employeeFirstName == "") {
      toast.error("First name must not be empty.");
      setFirstNameError(true);
      return;
    } else {
      setLastNameError(false);
    }

    if (!onlyLetters(values.employeeFirstName)) {
      toast.error("First name must not have numbers or special characters.");
      setFirstNameError(true);
      return;
    } else {
      setLastNameError(false);
    }

    rest.update(
      `${INITIAL_URL}/employee/update/${selectedEmployee.employeeId}`,
      values,
      editSuccessAction,
      `Successfully edited employeee ${selectedEmployee.employeeId}`
    );
  };
  //edit status
  const [toEdit, setToEdit] = useState(false);
  const isEdit = () => {
    if (toEdit) {
      setToEdit(false);
    } else {
      setToEdit(true);
    }
  };

  useEffect(() => {
    getActivePositions();
    getActiveTypes();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_id}>
          Employee {selectedEmployee.employeeId}
        </div>
        <div className={styles.header_icon}>
          {toEdit ? (
            <HighlightOffIcon
              className={styles.header_icon_exit}
              onClick={isEdit}
            />
          ) : (
            <EditIcon className={styles.header_icon_edit} onClick={isEdit} />
          )}
        </div>
      </div>
      {toEdit ? (
        <>
          <div className={styles.content}>
            <div className={styles.group}>
              <div className={styles.group_label}>Name</div>
              <div className={styles.group_textfields}>
                <div className={styles.group_textfields_row}>
                  <TextField
                    onChange={onChange}
                    name="employeeLastName"
                    label="Last"
                    defaultValue={selectedEmployee.employeeLastName}
                    variant="standard"
                    error={lastNameError == true}
                    fullWidth
                  />
                </div>
                <div className={styles.group_textfields_row}>
                  <TextField
                    onChange={onChange}
                    name="employeeFirstName"
                    label="First"
                    defaultValue={selectedEmployee.employeeFirstName}
                    variant="standard"
                    error={firstNameError == true}
                    fullWidth
                  />
                </div>
              </div>
            </div>
            <div className={styles.group}>
              <div className={styles.group_label}>Personal Details</div>
              <div className={styles.group_textfields}>
                <div className={styles.group_textfields_row}>
                  <TextField
                    onChange={onChange}
                    name="employeeAddress"
                    label="Address"
                    defaultValue={selectedEmployee.employeeAddress}
                    variant="standard"
                    fullWidth
                  />
                </div>
                <div className={styles.group_textfields_row}>
                  <TextField
                    onChange={onChange}
                    name="employeeContactNumber"
                    label="Contact Number"
                    defaultValue={selectedEmployee.employeeContactNumber}
                    variant="standard"
                    fullWidth
                  />
                </div>
              </div>
            </div>
            <div className={styles.group}>
              <div className={styles.group_label}>Work Details</div>
              <div className={styles.group_textfields}>
                <div className={styles.group_textfields_row}>
                  <div className={styles.group_textfields_select}>
                    <div className={styles.group_textfields_select_label}>
                      Superior
                    </div>
                    <Select
                      placeholder={
                        selectedEmployee.superiorEmployeeName
                          ? selectedEmployee.superiorEmployeeName
                          : "None"
                      }
                      defaultValue={{
                        label: selectedEmployee.superiorEmployeeName
                          ? selectedEmployee.superiorEmployeeName
                          : "None",
                        value: selectedEmployee.superiorEmployeeName
                          ? selectedEmployee.superiorEmployeeName
                          : null,
                      }}
                      options={[null, ...activeEmployees].map((item) => {
                        const value = item
                          ? `${item.employeeLastName}, ${item.employeeFirstName}`
                          : null;
                        const label = item
                          ? `${item.employeeLastName}, ${item.employeeFirstName}`
                          : "None";
                        return {
                          key: "superiorEmployeeName",
                          value: value,
                          label: label,
                        };
                      })}
                      onChange={onChange}
                    />
                  </div>
                  <div className={styles.group_textfields_select}>
                    <div className={styles.group_textfields_select_label}>
                      Position
                    </div>
                    <Select
                      placeholder={selectedEmployee.employeePositionName}
                      defaultValue={{
                        label: selectedEmployee.employeePositionName,
                        value: selectedEmployee.employeePositionName,
                      }}
                      options={activePositions.map((item) => {
                        return {
                          key: "employeePositionName",
                          value: item,
                          label: item,
                        };
                      })}
                      onChange={onChange}
                    />
                  </div>
                  <div className={styles.group_textfields_select}>
                    <div className={styles.group_textfields_select_label}>
                      Type
                    </div>
                    <Select
                      placeholder={selectedEmployee.employeeTypeName}
                      defaultValue={{
                        label: selectedEmployee.employeeTypeName,
                        value: selectedEmployee.employeeTypeName,
                      }}
                      options={activeTypes.map((item) => {
                        return {
                          key: "employeeTypeName",
                          value: item,
                          label: item,
                        };
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
            <div className={styles.content__row}>
              <div className={styles.content__top}>Name</div>
              <div className={styles.content__bottom}>
                <div className={styles.content__group}>
                  <div className={styles.content__label}>Last</div>
                  <div className={styles.content__data}>
                    {selectedEmployee.employeeLastName}
                  </div>
                </div>
                <div className={styles.content__group}>
                  <div className={styles.content__label}>First</div>
                  <div className={styles.content__data}>
                    {selectedEmployee.employeeFirstName}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.content__row}>
              <div className={styles.content__top}>Personal Details</div>
              <div className={styles.content__bottom}>
                <div className={styles.content__group}>
                  <div className={styles.content__label}>Address</div>
                  <div className={styles.content__data}>
                    {selectedEmployee.employeeAddress}
                  </div>
                </div>
                <div className={styles.content__group}>
                  <div className={styles.content__label}>Contact Number</div>
                  <div className={styles.content__data}>
                    {selectedEmployee.employeeContactNumber}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.content__row}>
              <div className={styles.content__top}>Work Details</div>
              <div className={styles.content__bottom}>
                <div className={styles.content__group}>
                  <div className={styles.content__label}>Superior</div>
                  <div className={styles.content__data}>
                    {selectedEmployee.superiorEmployeeName}
                  </div>
                </div>
                <div className={styles.content__group}>
                  <div className={styles.content__label}>Position</div>
                  <div className={styles.content__data}>
                    {selectedEmployee.employeePositionName}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.content__row}>
              {/* <div className={styles.content__top}>Work Details</div> */}
              <div className={styles.content__bottom}>
                <div className={styles.content__group}>
                  <div className={styles.content__label}>Type</div>
                  <div className={styles.content__data}>
                    {selectedEmployee.employeeTypeName}
                  </div>
                </div>
                <div className={styles.content__group}>
                  <div className={styles.content__label}>Date Employed</div>
                  <div className={styles.content__data}>
                    {dateFormat(selectedEmployee.dateEmployed, "mmmm d, yyyy")}
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
      )}
    </div>
  );
}

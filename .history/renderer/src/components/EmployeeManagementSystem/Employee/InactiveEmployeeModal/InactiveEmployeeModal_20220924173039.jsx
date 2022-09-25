import React, { useState, useEffect } from 'react';
import styles from './InactiveEmployeeModal.module.scss';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import Rest from '../../../rest/Rest.tsx';
import { printPdf } from '../../../print/printFunctions';

const INITIAL_URL = "http://localhost:8080/api/v1";

export default function InactiveEmployeeModal({ activateSuccessAction, inactiveEmployees }) {
  //for pdf
  const title = 'Escobar - Inactive Employees Data';
  const pdfColumns = [
    { header:"ID", dataKey: 'employeeId' },
    { header:"First", dataKey: 'employeeFirstName' },
    { header:"Last", dataKey: 'employeeLastName' },
    { header:"Address", dataKey: 'employeeAddress' },
    { header:"Contact", dataKey: 'employeeContactNumber' },
    { header:"Date Employed", dataKey: 'dateEmployed' },
    { header:"Posiiton", dataKey: 'employeePositionName' },
    { header:"Superior", dataKey: 'superiorEmployeeName' }
  ]
  const [pdfRows, setPdfRows] = useState([]);
  //
  const rest = new Rest();
  //table
  const [rows, setRows] = useState([]);
  const columns = [
    { field: 'employeeFirstName', headerName: 'First Name', flex: 1 },
    { field: 'employeeLastName', headerName: 'Last Name', flex: 1 },
    { field: 'employeeAddress', headerName: 'Address', flex: 1, align: 'right' },
    { field: 'employeeContactNumber', headerName: 'Contact', flex: 1, align: 'right' },
    { field: 'dateEmployed', headerName: 'Position', flex: 1, align: 'right' },
    { field: 'employeePositionName', headerName: 'Position', flex: 1, align: 'right' },
    { field: 'employeeTypeName', headerName: 'Type', flex: 1, align: 'right' },
    { field: 'superiorEmployeeName', headerName: 'Type', flex: 1, align: 'right' },
  ];
  //show button
  function showButton(){
    if(selected.length > 0){
      return (
        <Tooltip title="Activate Employee">
          <IconButton onClick={onActivate}>
            <MediumButton label="Activate" />
          </IconButton>
        </Tooltip>
      )
    }
  }
  //selected rows
  const [selected, setSelected] = useState("");
  const handleSelect = (ids) => {
    setSelected(ids);
  }
  const [selectedValues, setSelectedValues] = useState([]);
  const handleSelectedValues = () => {
    const arr = [];
    for(let i=0; i < selected.length; i++){
      rows.map((item) => {
        if(item.employeeId == selected[i]){
          arr.push(item);
        }
      })
    }
    setSelectedValues(arr);
  }
  //set active
  const onActivate = () => {
    rest.activate(
      `${INITIAL_URL}/employee/activate`,
      {'employeeListDto': selectedValues},
      activateSuccessAction,
      `Successfully activated ${selectedValues.length} employee/s`
    )
  }

  useEffect(() => {
    handleSelectedValues();
  }, [handleSelect])

  useEffect(() => {
    setRows(inactiveEmployees);
    setPdfRows(inactiveEmployees);
  }, [inactiveEmployees])


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          Inactive Employees       
          <Tooltip title='Print Inactive Employee Data'>
            <LocalPrintshopIcon className={styles.print_btn} onClick={() => printPdf(title, pdfColumns, pdfRows)} />
          </Tooltip>     
        </div>
        <div className={styles.right}>
          {showButton()}
        </div>
      </div>
        <div className={styles.table_container}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.employeeId}
            pageSize={20}
            onSelectionModelChange={handleSelect}
            checkboxSelection
            experimentalFeatures={{ newEditingApi: true }}
          />
        </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import styles from './AttendanceTable.module.scss';
import SearchBar from 'material-ui-search-bar';
import Rest from "../../../rest/Rest.tsx";
import { printPdf } from '../../../print/printFunctions';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

const INITIAL_URL = "http://localhost:8080/api/v1";

export default function AttendanceTable() {
  //for pdf
  const title = 'Escobar - Employee Attendance Data';
  const pdfColumns = [
    { header:"ID", dataKey: 'employeeAttendanceJoinId' },
    { header:"Name", dataKey: 'employeeName' },
    { header:"Time", dataKey: 'attendanceTime' },
    { header:"Type", dataKey: 'attendanceType' }
  ]
  const [pdfRows, setPdfRows] = useState([]);
  //
  const headCells = [
    { field: 'employeeName', headerName: 'Employee Name', flex: 1, align: 'left' },
    { field: 'attendanceTime', headerName: 'Time', flex: 1, align: 'left' },
    { field: 'attendanceType', headerName: 'Type', flex: 1, align: 'left' },
  ]
  const rest = new Rest();
  //get attendance
  const [fetchedData, setFetchedData] = useState([]);
  const handleAttendanceData = (data) => {
    setFetchedData(data);
  }
  const getAttendanceData = () => {
    rest.get(`${INITIAL_URL}/attendance`, handleAttendanceData)
  }
  //  search
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");
  const requestSearch = (searchValue) => {
    const filteredRows = fetchedData.filter((row) => {
      return row.employeeName.toLowerCase().includes(searchValue.toLowerCase()) || String(row.attendanceTime).includes(searchValue) || row.attendanceType.toLowerCase().includes(searchValue.toLowerCase);
      });
      setRows(filteredRows);
      setPdfRows(filteredRows);
    };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  }

  useEffect(() => {
    getAttendanceData();
  }, []);

  useEffect(() => {
    setRows(fetchedData);
    setPdfRows(fetchedData);
  }, [fetchedData]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
          <div className={styles.left}>
              <SearchBar 
                placeholder="Search Attendance Table"
                  value={searched}
                  onChange={(searchValue) => requestSearch(searchValue)}
                onCancelSearch={() => cancelSearch()}
              />
              <Tooltip title='Print Attendance Data'>
                <LocalPrintshopIcon className={styles.print_btn} onClick={() => printPdf(title, pdfColumns, pdfRows)} />
              </Tooltip>
          </div>
          <div className={styles.right}>
            {/* {showButtons()} */}
          </div>
      </div>
      <div className={styles.table}>
          <DataGrid
            getRowId={(row) => row.employeeAttendanceJoinId}
            rows={rows}
            columns={headCells}
            pageSize={15}
            disableSelectionOnClick
          />
      </div>
    </div>
  )
}

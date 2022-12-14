import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import styles from './EmployeeAttendanceTable.module.scss';
import SearchBar from 'material-ui-search-bar';
import shortid from 'shortid';
import Rest from "../../../../rest/Rest.tsx";
import { Modal } from '@mui/material';
import { useUser } from '../../../contexts/UserContext';

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

export default function EmployeeAttendanceTable() {

  const { employeeName } = useUser();
  const headCells = [
    { field: 'attendanceTime', headerName: 'Time', flex: 1, align: 'left', valueGetter: (params)=> params.row.attendanceTime.replace("T", "–") },
    { field: 'attendanceType', headerName: 'Type', flex: 1, align: 'left' },
  ]
  const rest = new Rest();
  //get attendance
  const [fetchedData, setFetchedData] = useState([]);
  const handleAttendanceData = (data) => {
    setFetchedData(data);
  }
  const getAttendanceData = () => {
    rest.get(`${INITIAL_URL}/attendance/${employeeName}`, handleAttendanceData)
  }
  //  search
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");
  const requestSearch = (searchValue) => {
    const filteredRows = fetchedData.filter((row) => {
      return String(row.attendanceTime).includes(searchValue) || row.attendanceType.toLowerCase().includes(searchValue.toLowerCase());
      });
      setRows(filteredRows);
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
          </div>
          <div className={styles.right}>
            {/* {showButtons()} */}
          </div>
      </div>
      <div className={styles.table}>
          <DataGrid
            initialState={{
              sorting: {
                sortModel: [{ field: 'attendanceTime', sort: 'desc' }],
              },
            }}
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

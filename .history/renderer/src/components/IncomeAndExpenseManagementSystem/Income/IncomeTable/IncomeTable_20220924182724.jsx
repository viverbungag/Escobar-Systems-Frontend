import React, { useState, useEffect } from 'react';
import styles from './IncomeTable.module.scss';
import { IconButton, Modal, Tooltip } from '@mui/material';
import MediumButton from '../../Shared/MediumButton/MediumButton';
import SearchBar from 'material-ui-search-bar';
import { DataGrid } from '@mui/x-data-grid';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import Rest from "../../../rest/Rest.tsx";
import { printPdf } from '../../../print/printFunctions';

const INITIAL_URL = "http://localhost:8080/api/v1";

export default function IncomeTable() {
  //for pdf
  const title = 'Escobar - Income Data';
  const pdfColumns = [
    { header:"Date", dataKey: 'incomeDate' },
    { header:"Daily Income", dataKey: 'dailyIncome' }
  ]
  const [pdfRows, setPdfRows] = useState([]);
  //
  const rest = new Rest();
  //get income data
  const [incomeData, setIncomeData] = useState([]);
  const handleIncomeData = (data) => {
      setIncomeData(data);
  }
  const getIncomeData = () => {
      rest.getPost(
        `${INITIAL_URL}/expense/income`, 
        '',
        handleIncomeData,
        ''
      )
  }
  //table headers
  const headCells = [
    { field: 'incomeDate', headerName: 'Date', flex: 1, align: 'left' },
    { field: 'dailyIncome', headerName: 'Daily Income', flex: 1, align: 'left' }
  ]
  //  search
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");
  const requestSearch = (searchValue) => {
    const filteredRows = incomeData.filter((row) => {
      return String(row.incomeDate).toLowerCase().includes(searchValue.toLowerCase()) || String(row.dailyIncome).includes(searchValue);
    });
    setRows(filteredRows);
    setPdfRows(filteredRows);
  };
  const cancelSearch = () => {
    setSearched("");
    setRows(incomeData);
  };
  //handle select
  const [selected, setSelected] = useState("");
  const handleSelect = (ids) => {
    setSelected(ids);
  }
  //modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => { setOpenDeleteModal(true) };
  const handleCloseDeleteModal = () => { setOpenDeleteModal(false) };

  useEffect(() => {
    getIncomeData();
  }, []);

  useEffect(() => {
    setRows(incomeData);
    setPdfRows(incomeData);
  }, [incomeData]);

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.left}>
                <SearchBar 
                    placeholder="Search Income Table"
                    value={searched}
                    onChange={(searchValue) => requestSearch(searchValue)}
                    onCancelSearch={() => cancelSearch()}
                />
                <Tooltip title='Print Active Employee Data'>
                  <LocalPrintshopIcon className={styles.print_btn} onClick={() => printPdf(title, pdfColumns, pdfRows)}/>
                </Tooltip>
            </div>
        </div>
        <div className={styles.table}>
            <DataGrid
              getRowId={(row) => row.incomeDate}
              rows={rows}
              columns={headCells}
              pageSize={10}
              disableSelectionOnClick
            />
        </div>
    </div>
  )
}

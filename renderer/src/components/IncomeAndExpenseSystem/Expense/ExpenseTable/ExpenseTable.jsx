import React, { useState, useEffect } from 'react';
import styles from './ExpenseTable.module.scss';
import { IconButton, Modal, Tooltip } from '@mui/material';
import MediumButton from '../../Shared/MediumButton/MediumButton';
import SearchBar from 'material-ui-search-bar';
import { DataGrid } from '@mui/x-data-grid';
import ExpenseMoreInfo from '../ExpenseMoreInfo/ExpenseMoreInfo';

export default function ExpenseTable({ expenseData }) {
  //columns
  const headCells = [
    { field: 'transactionId', headerName: 'ID', flex: 1, align: 'left'},
    { field: 'transactionDate', headerName: 'Transaction Date', flex: 2, align: 'left'},
    { field: 'supplyName', headerName: 'Supply Name', flex: 2, align: 'left'},
    { field: 'expenseCost', headerName: 'Cost', flex: 2, align: 'left'}
  ];
  const [rows, setRows] = useState([]);
  //  search
  const [searched, setSearched] = useState("");
  const requestSearch = (searchValue) => {
    const filteredRows = expenseData.filter((row) => {
      return String(row.expenseId).includes(searchValue) || row.expenseName.toLowerCase().includes(searchValue.toLowerCase());
      });
      setRows(filteredRows);
    };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
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
        if(item.transactionId == selected[i]){
          arr.push(item);
        }
      })
    }
    setSelectedValues(arr);
  }
  //more info modal
  const [openMoreInfoModal, setOpenMoreInfoModal] = useState(false);
  const handleOpenMoreInfoModal = () => {
    handleSelectedValues(); 
    setOpenMoreInfoModal(true); 
  };
  const handleCloseMoreInfoModal = () => { setOpenMoreInfoModal(false); };
  //get shown buttons
  function showButtons() {
    if(selected.length == 1 ){
      return (
        <>
          <Tooltip title="More Expense Information">
            <IconButton onClick={handleOpenMoreInfoModal}>
              <MediumButton label="More Info" />
            </IconButton>
          </Tooltip>
        </>
      )
    }else if(selected.length == 0 || selected.length > 1){
      return (
        <>
          <Tooltip title="More Expense Information">
            <IconButton disabled onClick={handleOpenMoreInfoModal}>
              <MediumButton label="More Info" />
            </IconButton>
          </Tooltip>
        </>
      )
    }
  };

  useEffect(() => {
    setRows(expenseData);
  }, [expenseData])

  useEffect(() => {
    handleSelectedValues();
  }, [selected])

  return (
    <div className={styles.container}>
    <div className={styles.header}>
      <div className={styles.left}>
        Expense Stock-In
      </div>
      <div className={styles.right}>
        {showButtons()}
      </div>
    </div>
    <div className={styles.sub_header}>
      <div className={styles.left}>
        <SearchBar 
          placeholder="Search Expense Transactions Table"
          value={searched}
          onChange={(searchValue) => requestSearch(searchValue)}
          onCancelSearch={() => cancelSearch()}
        />
      </div>
    </div>
    <div className={styles.table}>
      <DataGrid
        getRowId={(row) => row.transactionId}
        rows={rows}
        columns={headCells}
        pageSize={20}
        onSelectionModelChange={handleSelect}
        checkboxSelection
      />
    </div>
    <Modal open={openMoreInfoModal} onClose={handleCloseMoreInfoModal}>
      <div className={styles.modal}>
        <ExpenseMoreInfo
          selectedValues={selectedValues}
        />
      </div>
    </Modal>
    </div>
  )
}

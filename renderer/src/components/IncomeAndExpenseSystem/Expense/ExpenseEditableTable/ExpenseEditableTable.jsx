import React, { useState, useEffect } from 'react';
import styles from './ExpenseEditableTable.module.scss';
import { IconButton, Modal, Tooltip } from '@mui/material';
import MediumButton from '../../Shared/MediumButton/MediumButton';
import SearchBar from 'material-ui-search-bar';
import { DataGrid } from '@mui/x-data-grid';
import ExpenseEditableMoreInfo from '../ExpenseEditableMoreInfo/ExpenseEditableMoreInfo';
import EditExpenseModal from '../EditExpenseModal/EditExpenseModal';
import Rest from '../../../../rest/Rest.tsx';
import DeleteExpenseModal from '../DeleteExpenseModal/DeleteExpenseModal';

const INITIAL_URL = "http://localhost:8080/api/v1";

function capitalizeData(data){
  data = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
  return data;
}


export default function ExpenseEditableTable({ reload, expenseEditableData, expenseCategories }) {
  const rest = new Rest();
    //columns
  const headCells = [
    { field: 'expenseId', headerName: 'ID', flex: 1, align: 'left'},
    { field: 'expenseCategoryName', headerName: 'Category Name', flex: 2, align: 'left'},
    { field: 'expenseDate', headerName: 'Transaction Date', flex: 2, align: 'left'},
    { field: 'expenseCost', headerName: 'Cost', flex: 2, align: 'left'}
  ];
  const [rows, setRows] = useState([]);
  //  search
  const [searched, setSearched] = useState("");
  const requestSearch = (searchValue) => {
    const filteredRows = expenseEditableData.filter((row) => {
      return String(row.expenseId).includes(searchValue) || row.expenseCategoryName.toLowerCase().includes(searchValue.toLowerCase());
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
        if(item.expenseId == selected[i]){
          arr.push(item);
        }
      })
    }
    setSelectedValues(arr);
  }
  //edit
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => { 
    handleSelectedValues();
    setOpenEditModal(true); 
  };
  const handleCloseEditModal = () => { setOpenEditModal(false) };
  const editSuccessAction = () => {
    handleCloseEditModal();
    reload();
    setRows(expenseEditableData);
  }
  //inactivate modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => {
    handleSelectedValues(); 
    setOpenDeleteModal(true); 
  };
  const handleCloseDeleteModal = () => { setOpenDeleteModal(false); };
  const deleteSuccessAction = () => {
    handleCloseDeleteModal();
    reload();
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
          <Tooltip title="Edit Expense">
            <IconButton onClick={handleOpenEditModal}>
              <MediumButton label="Edit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Expense">
            <IconButton onClick={handleOpenDeleteModal}>
              <MediumButton label="Delete" />
            </IconButton>
          </Tooltip>
        </>
      )
    }else if(selected.length > 1){
      return (
        <>
          <Tooltip title="More Expense Information">
            <IconButton disabled onClick={handleOpenMoreInfoModal}>
              <MediumButton label="More Info" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Employee Position">
            <IconButton disabled onClick={handleOpenEditModal}>
              <MediumButton label="Edit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Inactivate Employee Position/s">
            <IconButton onClick={handleOpenDeleteModal}>
              <MediumButton label="Delete" />
            </IconButton>
          </Tooltip>
        </>
      )
    }else if(selected.length == 0){
      return (
        <>
          <Tooltip title="More Expense Information">
            <IconButton disabled onClick={handleOpenMoreInfoModal}>
              <MediumButton label="More Info" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Expense Category">
            <IconButton disabled onClick={handleOpenEditModal}>
              <MediumButton label="Edit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Inactivate Expense Categories">
            <IconButton disabled onClick={handleOpenDeleteModal}>
              <MediumButton label="Delete" />
            </IconButton>
          </Tooltip>
        </>
      )
    }
  };

  useEffect(() => {
    setRows(expenseEditableData);
  }, [expenseEditableData])

  useEffect(() => {
    handleSelectedValues();
  }, [selected])

  return (
    <div className={styles.container}>
    <div className={styles.header}>
      <div className={styles.left}>
        Expense
      </div>
      <div className={styles.right}>
        {showButtons()}
      </div>
    </div>
    <div className={styles.sub_header}>
      <div className={styles.left}>
        <SearchBar 
          placeholder="Search Expense Table"
          value={searched}
          onChange={(searchValue) => requestSearch(searchValue)}
          onCancelSearch={() => cancelSearch()}
        />
      </div>
    </div>
    <div className={styles.table}>
      <DataGrid
        getRowId={(row) => row.expenseId}
        rows={rows}
        columns={headCells}
        pageSize={10}
        onSelectionModelChange={handleSelect}
        checkboxSelection
      />
    </div>
    <Modal open={openMoreInfoModal} onClose={handleCloseMoreInfoModal}>
      <div className={styles.modal}>
        <ExpenseEditableMoreInfo
        selectedValues={selectedValues}
        />
      </div>
    </Modal>
    <Modal open={openEditModal} onClose={handleCloseEditModal}>
      <div className={styles.modal}>
        <EditExpenseModal
        expenseCategories={expenseCategories}
        selectedValues={selectedValues}
        editSuccessAction={editSuccessAction}
        />
      </div>
    </Modal>
    <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
      <div className={styles.modal}>
        <DeleteExpenseModal
        deleteSuccessAction={deleteSuccessAction}
        selectedValues={selectedValues}
        />
      </div>
    </Modal>
    </div>
  )
}

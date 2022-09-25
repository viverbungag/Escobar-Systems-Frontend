import { DataGrid } from '@mui/x-data-grid'
import SearchBar from 'material-ui-search-bar'
import React, { useState, useEffect } from 'react';
import styles from './InactiveCategoryTable.module.scss';
import { IconButton, Modal, Tooltip } from '@mui/material';
import MediumButton from '../../Shared/MediumButton/MediumButton';
import Rest from '../../../rest/Rest.tsx';

const INITIAL_URL = "http://localhost:8080/api/v1";

export default function InactiveCategoryTable({ reload, inactiveCategories }) {
  const rest = new Rest();
   //columns
   const headCells = [
    { field: 'expenseCategoryId', headerName: 'ID', flex: 1, align: 'left'},
    { field: 'expenseCategoryName', headerName: 'Category Name', flex: 1, align: 'left'}
  ];
  const [rows, setRows] = useState([]);
  //  search
  const [searched, setSearched] = useState("");
  const requestSearch = (searchValue) => {
    const filteredRows = inactiveCategories.filter((row) => {
      return String(row.expenseCategoryId).includes(searchValue) || row.expenseCategoryName.toLowerCase().includes(searchValue.toLowerCase());
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
        if(item.expenseCategoryId == selected[i]){
          arr.push(item);
        }
      })
    }
    setSelectedValues(arr);
  }
   //activate
  const activateSuccessAction = () => {
    reload();
  }
  const handleActivateOnClick = () => {
    handleActivate();
  }
  const handleActivate = () => {
    console.log('adfdfsd')
    rest.activate(
      (`${INITIAL_URL}/expense-category/activate`),
      {'expenseCategoryListDto': selectedValues},
      activateSuccessAction,
      `Successfully activated ${selectedValues.length} expense categories.`
    )
  }
  //get shown buttons
  function showButtons() {
    if(selected.length >= 1 ){
      return (
        <>
          <Tooltip title="Activate Expense Categories">
            <IconButton onClick={handleActivateOnClick}>
              <MediumButton label="Activate" />
            </IconButton>
          </Tooltip>
        </>
      )
    }else if(selected.length == 0){
      return (
        <>
          <Tooltip title="Inactivate Expense Categories">
            <IconButton disabled onClick={handleActivateOnClick}>
              <MediumButton label="Activate" />
            </IconButton>
          </Tooltip>
        </>
      )
    }
  };

  useEffect(() => {
    handleSelectedValues();
  }, [selected]);

  useEffect(() => {
    setRows(inactiveCategories);
  }, [inactiveCategories]);


  return (
    <div className={styles.container}>
    <div className={styles.header}>
      <div className={styles.left}>
        Inactive Categories
      </div>
      <div className={styles.right}>
        {showButtons()}
      </div>
    </div>
    <div className={styles.sub_header}>
      <div className={styles.left}>
        <SearchBar 
          placeholder="Search Inactive Categories Table"
          value={searched}
          onChange={(searchValue) => requestSearch(searchValue)}
          onCancelSearch={() => cancelSearch()}
        />
      </div>
    </div>
    <div className={styles.table}>
      <DataGrid
        getRowId={(row) => row.expenseCategoryId}
        rows={rows}
        columns={headCells}
        pageSize={20}
        onSelectionModelChange={handleSelect}
        checkboxSelection
      />
    </div>
  </div>
  )
}

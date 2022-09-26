import React, { useState, useEffect } from 'react';
import styles from './InactiveTypesTable.module.scss';
import { IconButton, Modal, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import SearchBar from 'material-ui-search-bar'
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';
import ActivateTypes from '../ActivateTypes/ActivateTypes';

export default function InactiveTypes({ reload, inactiveTypes }) {
  //columns
  const headCells = [
    { field: 'employeeTypeName', headerName: 'Type Name', flex: 1, align: 'left'}
  ];
  const [rows, setRows] = useState([]);
  //  search
  const [searched, setSearched] = useState("");
  const requestSearch = (searchValue) => {
    const filteredRows = inactiveTypes.filter((row) => {
      return String(row.employeeTypeId).includes(searchValue) || row.employeeTypeName.toLowerCase().includes(searchValue.toLowerCase());
      });
      setRows(filteredRows);
    };
  const cancelSearch = () => {
    setSearched("");
    setRows(inactiveTypes);
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
        if(item.employeeTypeId == selected[i]){
          arr.push(item);
        }
      })
    }
    setSelectedValues(arr);
  }
   //delete modal
   const [openActivateModal, setOpenActivateModal] = useState(false);
   const handleOpenActivateModal = () => {
     handleSelectedValues(); 
     setOpenActivateModal(true); 
   };
   const handleCloseActivateModal = () => { setOpenActivateModal(false); };
   const activateSuccessAction = () => {
    handleCloseActivateModal();
    reload();
   }
   //get shown buttons
   function showButtons() {
     if(selected.length == 1 ){
       return (
         <>
           <Tooltip title="Activate Employee Type/s">
             <IconButton onClick={handleOpenActivateModal}>
               <MediumButton label="Activate" />
             </IconButton>
           </Tooltip>
         </>
       )
     }else if(selected.length > 1){
       return (
         <>
           <Tooltip title="Activate Employee Type/s">
             <IconButton onClick={handleOpenActivateModal}>
               <MediumButton label="Activate" />
             </IconButton>
           </Tooltip>
         </>
       )
     }else if(selected.length == 0){
       return (
         <>
           <Tooltip title="Activate Employee Type/s">
             <IconButton disabled onClick={handleOpenActivateModal}>
               <MediumButton label="Activate" />
             </IconButton>
           </Tooltip>
         </>
       )
     }
   };
 
   useEffect(() => {
     setRows(inactiveTypes);
   }, [inactiveTypes]);

  return (
    <div className={styles.container}>
    <div className={styles.header}>
      <div className={styles.left}>
        Inactive Types
      </div>
      <div className={styles.right}>
        {showButtons()}
      </div>
    </div>
    <div className={styles.sub_header}>
      <div className={styles.left}>
        <SearchBar 
          placeholder="Search Inactive Types Table"
          value={searched}
          onChange={(searchValue) => requestSearch(searchValue)}
          onCancelSearch={() => cancelSearch()}
        />
      </div>
    </div>
    <div className={styles.table}>
      <DataGrid
        getRowId={(row) => row.employeeTypeId}
        rows={rows}
        columns={headCells}
        pageSize={10}
        onSelectionModelChange={handleSelect}
        checkboxSelection
      />
    </div>
      <Modal open={openActivateModal} onClose={handleCloseActivateModal}>
        <div className={styles.modal}>
          <ActivateTypes
          activateSuccessAction={activateSuccessAction}
          selectedValues={selectedValues}
          />
        </div>
      </Modal>
    </div>
  )
}

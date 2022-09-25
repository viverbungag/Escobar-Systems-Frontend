import React, { useState, useEffect } from 'react';
import styles from './ActiveAccountsTable.module.scss';
import { IconButton, Modal, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import SearchBar from 'material-ui-search-bar';
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';
import InactivateAccountModal from '../InactivateAccountModal/InactivateAccountModal';
import EditAccount from '../EditAccount/EditAccount';
import { printPdf } from '../../../print/printFunctions';

export default function ActiveAccountsTable({ reload, activeAccounts, activeEmployees }) {
  //for pdf
  const title = 'Escobar - Active Accounts Data';
  const pdfColumns = [
    { header:"ID", dataKey: 'accountId' },
    { header:"Username", dataKey: 'accountUsername' },
    { header:"Name", dataKey: 'employeeName' },
    { header:"IMS", dataKey: 'accessInventoryManagementSystem' },
    { header:"EMS", dataKey: 'accessEmployeeManagementSystem' },
    { header:"IES", dataKey: 'accessIncomeAndExpenseSystem' },
    { header:"OS", dataKey: 'accessOrderingSystem' }
  ]
  const [pdfRows, setPdfRows] = useState([]);
  //
  //columns
  const headCells = [
    { field: 'accountUsername', headerName: 'Username', flex: 1, align: 'left'},
    { field: 'employeeName', headerName: 'Name', flex: 1, align: 'left'}
  ];
  const [rows, setRows] = useState([]);
  //  search
  const [searched, setSearched] = useState("");
  const requestSearch = (searchValue) => {
    const filteredRows = inactiveAccounts.filter((row) => {
      return row.username.toLowerCase().includes(searchValue.toLowerCase()) || row.employeeTypeName.toLowerCase().includes(searchValue.toLowerCase());
      });
      setRows(filteredRows);
      setPdfRows(activeAccounts);
    };
  const cancelSearch = () => {
    setSearched("");
    setRows(inactiveAccounts);
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
        if(item.accountId == selected[i]){
          arr.push(item);
        }
      })
    }
    setSelectedValues(arr);
  }
  //edit
  const [openMoreModal, setopenMoreModal] = useState(false);
  const handleOpenMoreModal = () => { 
    handleSelectedValues();
    setopenMoreModal(true); 
  };
  const handleCloseMoreModal = () => { setopenMoreModal(false) };
  const editSuccessAction = () => {
    handleCloseMoreModal();
    reload();
    setRows(activeCategories);
  }
  //inactivate modal
  const [openInactivateModal, setOpenInactivateModal] = useState(false);
  const handleOpenInactivateModal = () => {
    handleSelectedValues(); 
    setOpenInactivateModal(true); 
  };
  const handleCloseInactivateModal = () => { setOpenInactivateModal(false); };
  const inactivateSuccessAction = () => {
    handleCloseInactivateModal();
    reload();
  }
  //get shown buttons
  function showButtons() {
    if(selected.length == 1 ){
      return (
        <>
          <Tooltip title="Edit/More Info">
            <IconButton onClick={handleOpenMoreModal}>
              <MediumButton label="More" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Inactivate Account/s">
            <IconButton onClick={handleOpenInactivateModal}>
              <MediumButton label="Inactivate" />
            </IconButton>
          </Tooltip>
        </>
      )
    }else if(selected.length > 1){
      return (
        <>
          <Tooltip title="Edit/More Info">
            <IconButton disabled onClick={handleOpenMoreModal}>
              <MediumButton label="More" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Inactivate Account/s">
            <IconButton onClick={handleOpenInactivateModal}>
              <MediumButton label="Inactivate" />
            </IconButton>
          </Tooltip>
        </>
      )
    }else if(selected.length == 0){
      return (
        <>
          <Tooltip title="Edit/More Info">
            <IconButton disabled onClick={handleOpenMoreModal}>
              <MediumButton label="More" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Inactivate Account/s">
            <IconButton disabled onClick={handleOpenInactivateModal}>
              <MediumButton label="Inactivate" />
            </IconButton>
          </Tooltip>
        </>
      )
    }
  };

  useEffect(() => {
    handleSelectedValues();
  }, [selected])

  useEffect(() => {
    setRows(activeAccounts);
    setPdfRows(activeAccounts);
  }, [activeAccounts])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          Active Accounts
          <Tooltip title='Print Active Accounts'>
            <LocalPrintshopIcon className={styles.print_btn} onClick={() => printPdf(title, pdfColumns, pdfRows)} />
          </Tooltip>
        </div>
        <div className={styles.right}>
          {showButtons()}
        </div>
      </div>
      <div className={styles.sub_header}>
        <div className={styles.left}>
          <SearchBar 
            placeholder="Search Active Accounts Table"
            value={searched}
            onChange={(searchValue) => requestSearch(searchValue)}
            onCancelSearch={() => cancelSearch()}
          />
        </div>
      </div>
      <div className={styles.table}>
        <DataGrid
          getRowId={(row) => row.accountId}
          rows={rows}
          columns={headCells}
          pageSize={10}
          onSelectionModelChange={handleSelect}
          checkboxSelection
        />
      </div>
        <Modal open={openMoreModal} onClose={handleCloseMoreModal}>
            <div className={styles.modal}>
              <EditAccount
              activeEmployees={activeEmployees}
              editSuccessAction={editSuccessAction}
              selectedValues={selectedValues[0]}
              />
            </div>
        </Modal>
        <Modal open={openInactivateModal} onClose={handleCloseInactivateModal}>
            <div className={styles.modal}>
                <InactivateAccountModal
                inactivateSuccessAction={inactivateSuccessAction}
                selectedValues={selectedValues}
                />
            </div>
        </Modal>
    </div>
  )
}

import React, { useState, useEffect } from 'react';
import styles from './PositionsContent.module.scss';
import SearchBar from 'material-ui-search-bar';
import Rest from "../../../rest/Rest.tsx";
import { IconButton, Modal, Tooltip } from '@mui/material';
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';
import { DataGrid } from '@mui/x-data-grid';
import AddPositionForm from '../AddPositionForm/AddPositionForm';
import InactivePositionsTable from '../InactivePositionsTable/InactivePositionsTable';
import EditPositionModal from '../EditPositionModal/EditPositionModal';
import InactivatePositionModal from '../InactivatePositionModal/InactivatePositionModal';

const INITIAL_URL = "http://localhost:8080/api/v1";

export default function PositionsContent() {
    const headCells = [
        { field: 'employeePositionName', headerName: 'Position Name', flex: 1, align: 'left' }
    ]
    const rest = new Rest();
    //GET active positions
    const [positions, setPositions] = useState([]);
    const handlePositionsData = (data) => {
        setPositions(data);
    }
    const getPositionsData = () => {
        rest.get(`${INITIAL_URL}/employee-position/active`, handlePositionsData);
    }
    //GET inactive position
    const [inactivePositions, setInactivePositions] = useState([]);

    const handleInactivePositions = (data) => {
      setInactivePositions(data);
    }
    const getInactivePositions = () => {
      rest.get(`${INITIAL_URL}/employee-position/inactive`, handleInactivePositions)
    }
     //search
    const [rows, setRows] = useState([]);
    const [searched, setSearched] = useState("");
    const requestSearch = (searchValue) => {
    const filteredRows = positions.filter((row) => {
      return String(row.employeePositionId).includes(searchValue) || row.employeePositionName.toLowerCase().includes(searchValue.toLowerCase());
      });
      setRows(filteredRows);
        };
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    }
    //add
    const addSuccessAction = () => {
      handleCloseAddModal();
      getPositionsData();
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
          if(item.employeePositionId == selected[i]){
            arr.push(item);
          }
        })
      }
      setSelectedValues(arr);
    }
    //add
    const [openAddModal, setOpenAddModal] = useState(false);
    const handleOpenAddModal = () => { setOpenAddModal(true) };
    const handleCloseAddModal = () => { setOpenAddModal(false) };
    //edit
    const [openEditModal, setOpenEditModal] = useState(false);
    const handleOpenEditModal = () => { 
      handleSelectedValues();
      setOpenEditModal(true); 
    };
    const handleCloseEditModal = () => { setOpenEditModal(false) };
    const editSuccessAction = () => {
      handleCloseEditModal();
      getPositionsData();
    }
    //delete modal
    const [openInactivateModal, setOpenInactivateModal] = useState(false);
    const handleOpenInactivateModal = () => {
      handleSelectedValues(); 
      setOpenInactivateModal(true); 
    };
    const handleCloseInactivateModal = () => { setOpenInactivateModal(false); };
    const inactivateSuccessAction = () => {
      handleCloseInactivateModal();
      getInactivePositions();
      getPositionsData();
    }
    //activate
    const activateSuccessAction = () => {
      getPositionsData();
      getInactivePositions();
    }
    //show buttons
    function showButtons() {
      if(selected.length == 1 ){
        return (
          <>
            <Tooltip title="Edit Employee Position">
              <IconButton onClick={handleOpenEditModal}>
                <MediumButton label="Edit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Inactivate Employee Position/s">
              <IconButton onClick={handleOpenInactivateModal}>
                <MediumButton label="Inactivate" />
              </IconButton>
            </Tooltip>
          </>
        )
      }else if(selected.length > 1){
        return (
          <>
            <Tooltip title="Edit Employee Position">
              <IconButton disabled onClick={handleOpenEditModal}>
                <MediumButton label="Edit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Inactivate Employee Position/s">
              <IconButton onClick={handleOpenInactivateModal}>
                <MediumButton label="Inactivate" />
              </IconButton>
            </Tooltip>
          </>
        )
      }else if(selected.length == 0){
        return (
          <>
            <Tooltip title="Edit Employee Position">
              <IconButton disabled onClick={handleOpenEditModal}>
                <MediumButton label="Edit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Inactivate Employee Position/s">
              <IconButton disabled onClick={handleOpenInactivateModal}>
                <MediumButton label="Inactivate" />
              </IconButton>
            </Tooltip>
          </>
        )
      }
    };
    //show rows
    const setShownRows = () => {
      if(rows.length == 0){
        setRows(positions);
      }
    };

    const searchBarInputOnChange = (searchValue) => {
      requestSearch(searchValue);
      setSearched(searchValue);
    }

    useEffect(() => {
      getPositionsData();
      getInactivePositions();
    }, []);

    useEffect(() => {
      requestSearch(searched);
    }, [positions]);

    useEffect(() => {
      setShownRows();
    }, [searched]);

    return (
      <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.header}>
              <button onClick={handleOpenAddModal}>
                <MediumButton label="Add Employee Position" />
              </button>
            </div>
            <div className={styles.tables}>
              <div className={styles.active_table}>
                <div className={styles.header}>
                  <div className={styles.left}>
                    Active Positions
                  </div>
                  <div className={styles.right}>
                    {showButtons()}
                  </div>
                </div>
                <div className={styles.sub_header}>
                  <div className={styles.left}>
                    <SearchBar 
                      placeholder="Search Active Positions Table"
                      value={searched}
                      onChange={searchBarInputOnChange}
                      onCancelSearch={() => cancelSearch()}
                    />
                  </div>
                </div>
                <div className={styles.table}>
                    <DataGrid
                        getRowId={(row) => row.employeePositionId}
                        rows={rows}
                        columns={headCells}
                        pageSize={10}
                        onSelectionModelChange={handleSelect}
                        checkboxSelection
                    />
                </div>
              </div>
              <div className={styles.inactive_table}>
                <InactivePositionsTable 
                  activateSuccessAction={activateSuccessAction}
                  inactivePositions={inactivePositions}
                />
              </div>
            </div>
          </div>
          {/* {console.log(positions)} */}
          <Modal open={openAddModal} onClose={handleCloseAddModal}>
            <div className={styles.modal}>
              <AddPositionForm 
                addSuccessAction={addSuccessAction}
                activePositions={positions} 
                inactivePositions={inactivePositions}
              />
            </div>
          </Modal>
          <Modal open={openEditModal} onClose={handleCloseEditModal} >
              <div className={styles.modal}>
                <EditPositionModal
                  editSuccessAction={editSuccessAction}
                  employeePositionId={selectedValues.map((item) => item.employeePositionId)}
                  employeePositionName={selectedValues.map((item) => item.employeePositionName)}
                  positionActiveData={positions}
                />
              </div>
          </Modal>
          <Modal open={openInactivateModal} onClose={handleCloseInactivateModal} >
              <div className={styles.modal}>
                <InactivatePositionModal 
                  inactivateSuccessAction={inactivateSuccessAction}
                  selectedValues={selectedValues}
                />
              </div>
          </Modal>
      </div>
    )
}

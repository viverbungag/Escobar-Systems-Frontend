import React, { useState, useEffect } from 'react';
import styles from './InactivePositionsTable.module.scss';
import { DataGrid } from '@mui/x-data-grid';
import SearchBar from 'material-ui-search-bar';

import Rest from "../../../rest/Rest.tsx";
import { Tooltip, IconButton } from '@mui/material';
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';

const INITIAL_URL = "http://localhost:8080/api/v1";

export default function InactivePositionsTable({ activateSuccessAction, inactivePositions }) {
  //columns
  const headCells = [
    { field: 'employeePositionName', headerName: 'Position Name', flex: 1, align: 'left'}
  ];
    const rest = new Rest();

    const [rows, setRows] = useState([]);
    //  search
    const [searched, setSearched] = useState("");
    const requestSearch = (searchValue) => {
      const filteredRows = inactivePositions.filter((row) => {
        return String(row.employeePositionId).includes(searchValue) || row.employeePositionName.toLowerCase().includes(searchValue.toLowerCase());
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
    //activate
    const handleActivateOnClick = () => {
      handleActivate();
    }
    const handleActivate = () => {
      const selectedPositions = selected.map((positionId) =>
        inactivePositions.find(
          (position) => position.employeePositionId === positionId
        )
      );

      rest.activate(
        (`${INITIAL_URL}/employee-position/activate`),
        {'employeePositionListDto': selectedPositions},
        activateSuccessAction,
        'Successfully activated the selected position/s.'
      )
    }

    const searchBarInputOnChange = (searchValue) => {
      requestSearch(searchValue);
      setSearched(searchValue);
    }
    //show buttons
    function showButtons() {
      if(selected.length > 0){
        return (
          <>
            <Tooltip title="Activate Employee Position">
              <IconButton onClick={handleActivateOnClick}>
                <MediumButton label="Activate" />
              </IconButton>
            </Tooltip>
          </>
        )
      }else {
        return (
          <>
            <Tooltip title="Activate Employee Position">
              <IconButton disabled onClick={handleActivateOnClick}>
                <MediumButton label="Activate" />
              </IconButton>
            </Tooltip>
          </>
        )
      }
    };

    useEffect(() => {
      requestSearch(searched);
    }, [inactivePositions]);

    // useEffect(() => {
    //   handleActivate();
    // }, [selectedValues])

    // useEffect(() => {
    //   setShownRows();
    // }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          INACTIVE Positions
        </div>
        <div className={styles.right}>
          {showButtons()}
        </div>
      </div>
      <div className={styles.sub_header}>
        <div className={styles.left}>
          <SearchBar 
            placeholder="Search Inactive Positions Table"
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
          pageSize={20}
          onSelectionModelChange={handleSelect}
          checkboxSelection
        />
      </div>
    </div>
  )
}

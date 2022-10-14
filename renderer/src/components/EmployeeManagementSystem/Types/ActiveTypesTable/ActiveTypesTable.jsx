import React, { useState, useEffect } from "react";
import styles from "./ActiveTypesTable.module.scss";
import { IconButton, Modal, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchBar from "material-ui-search-bar";
import MediumButton from "../../Shared/Buttons/MediumButton/MediumButton";
import InactivateTypes from "../InactivateTypes/InactivateTypes";
import EditTypes from "../EditTypes/EditTypes";
import { toast } from "react-toastify";

export default function ActiveTypesTable({ reload, activeTypes }) {
  //columns
  const headCells = [
    {
      field: "employeeTypeName",
      headerName: "Type Name",
      flex: 1,
      align: "left",
    },
  ];
  const [rows, setRows] = useState([]);
  //  search
  const [searched, setSearched] = useState("");
  const requestSearch = (searchValue) => {
    const filteredRows = activeTypes.filter((row) => {
      return String(row.employeeTypeName)
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
    setRows(filteredRows);
  };
  const cancelSearch = () => {
    setSearched("");
    setRows(activeTypes);
  };
  //selected rows
  const [selected, setSelected] = useState("");
  const handleSelect = (ids) => {
    setSelected(ids);
  };
  const [selectedValues, setSelectedValues] = useState([]);
  const handleSelectedValues = () => {
    const arr = [];
    for (let i = 0; i < selected.length; i++) {
      rows.map((item) => {
        if (item.employeeTypeId == selected[i]) {
          arr.push(item);
        }
      });
    }
    setSelectedValues(arr);
  };
  //edit
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => {
    handleSelectedValues();
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };
  const editSuccessAction = () => {
    toast.success("Successfully edited employee type.");
    handleCloseEditModal();
    reload();
    setRows(activeCategories);
  };
  //delete modal
  const [openInactivateModal, setOpenInactivateModal] = useState(false);
  const handleOpenInactivateModal = () => {
    handleSelectedValues();
    setOpenInactivateModal(true);
  };
  const handleCloseInactivateModal = () => {
    setOpenInactivateModal(false);
  };
  const inactivateSuccessAction = () => {
    handleCloseInactivateModal();
    reload();
  };
  //get shown buttons
  function showButtons() {
    if (selected.length == 1) {
      return (
        <>
          <Tooltip title="Edit employee type">
            <IconButton onClick={handleOpenEditModal}>
              <MediumButton label="Edit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Inactivate employee types">
            <IconButton onClick={handleOpenInactivateModal}>
              <MediumButton label="Inactivate" />
            </IconButton>
          </Tooltip>
        </>
      );
    } else if (selected.length > 1) {
      return (
        <>
          <Tooltip title="Edit employee type">
            <IconButton disabled onClick={handleOpenEditModal}>
              <MediumButton label="Edit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Inactivate employee types">
            <IconButton onClick={handleOpenInactivateModal}>
              <MediumButton label="Inactivate" />
            </IconButton>
          </Tooltip>
        </>
      );
    } else if (selected.length == 0) {
      return (
        <>
          <Tooltip title="Edit employee type">
            <IconButton disabled onClick={handleOpenEditModal}>
              <MediumButton label="Edit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Inactivate employee types">
            <IconButton disabled onClick={handleOpenInactivateModal}>
              <MediumButton label="Inactivate" />
            </IconButton>
          </Tooltip>
        </>
      );
    }
  }

  useEffect(() => {
    setRows(activeTypes);
  }, [activeTypes]);

  return (
    <div className={styles.container}>
      {/* {console.log(activeTypes)} */}
      <div className={styles.header}>
        <div className={styles.left}>Active Types</div>
        <div className={styles.right}>{showButtons()}</div>
      </div>
      <div className={styles.sub_header}>
        <div className={styles.left}>
          <SearchBar
            placeholder="Search Active Types Table"
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
      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <div className={styles.modal}>
          <EditTypes
            editSuccessAction={editSuccessAction}
            employeeTypeId={selectedValues.map((item) => item.employeeTypeId)}
            employeeTypeName={selectedValues.map(
              (item) => item.employeeTypeName
            )}
          />
        </div>
      </Modal>
      <Modal open={openInactivateModal} onClose={handleCloseInactivateModal}>
        <div className={styles.modal}>
          <InactivateTypes
            inactivateSuccessAction={inactivateSuccessAction}
            selectedValues={selectedValues}
          />
        </div>
      </Modal>
    </div>
  );
}

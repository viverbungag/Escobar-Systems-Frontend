import React, { useState, useEffect } from "react";
import styles from "./ExpenseTable.module.scss";
import { Modal, Tooltip } from "@mui/material";
import SearchBar from "material-ui-search-bar";
import { DataGrid } from "@mui/x-data-grid";
import ExpenseMoreInfo from "../ExpenseMoreInfo/ExpenseMoreInfo";
import InfoIcon from "@mui/icons-material/Info";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { printPdf } from "../../../../../print/printFunctions";

export default function ExpenseTable({ expenseData }) {
  // console.log(expenseData);
  //for pdf
  const title = "Escobar - Stock-In Transactions Data";
  const pdfColumns = [
    { header: "Transaction Date", dataKey: "transactionDate" },
    { header: "Supply Name", dataKey: "supplyName" },
    { header: "Quantity", dataKey: "transactionSupplyQuantity" },
    { header: "Total Cost", dataKey: "expenseCost" },
    { header: "Supplier", dataKey: "supplierName" },
    { header: "In-Charge", dataKey: "employeeName" },
  ];
  const [pdfRows, setPdfRows] = useState([]);
  //columns
  const headCells = [
    {
      field: "transactionDate",
      headerName: "Transaction Date",
      flex: 2,
      align: "left",
      valueGetter: (params) => params.row.transactionDate.split(["T"])[0],
    },
    { field: "supplyName", headerName: "Supply Name", flex: 2, align: "left" },
    { field: "expenseCost", headerName: "Cost", flex: 1, align: "left" },
    {
      field: "transactionSupplyQuantity",
      headerName: "Quantity",
      flex: 1,
      align: "left",
    },
    {
      field: "icon",
      headerName: "",
      flex: 1,
      align: "center",
      renderCell: () => (
        <Tooltip title="View More Information">
          <InfoIcon
            className={styles.info_icon}
            onClick={handleOpenMoreInfoModal}
          />
        </Tooltip>
      ),
    },
  ];
  const [rows, setRows] = useState([]);
  //  search
  const [searched, setSearched] = useState("");
  const requestSearch = (searchValue) => {
    const filteredRows = expenseData.filter((row) => {
      return (
        String(row.supplyName)
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        String(row.transactionDate)
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        String(row.expenseCost).includes(searchValue) ||
        String(row.transactionSupplyQuantity)
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        String(row.expenseCost)
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    });
    setRows(filteredRows);
    setPdfRows(filteredRows);
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  //selected rows
  const [selected, setSelected] = useState("");
  const handleSelect = (ids) => {
    setSelected(ids);
  };
  //more info modal
  const [openMoreInfoModal, setOpenMoreInfoModal] = useState(false);
  const handleOpenMoreInfoModal = () => {
    setOpenMoreInfoModal(true);
  };
  const handleCloseMoreInfoModal = () => {
    setOpenMoreInfoModal(false);
  };

  useEffect(() => {
    setRows(expenseData);
    setPdfRows(expenseData);
  }, [expenseData]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          Stock-In Transactions
          <Tooltip title="Print Stock-In Transactions Employee Data">
            <LocalPrintshopIcon
              className={styles.print_btn}
              onClick={() => printPdf(title, pdfColumns, pdfRows)}
            />
          </Tooltip>
        </div>
      </div>
      <div className={styles.sub_header}>
        <div className={styles.left}>
          <SearchBar
            placeholder="Search Stock-In Transactions Table"
            value={searched}
            onChange={(searchValue) => requestSearch(searchValue)}
            onCancelSearch={() => cancelSearch()}
          />
        </div>
      </div>
      <div className={styles.table}>
        <DataGrid
          initialState={{
            sorting: {
              sortModel: [{ field: "transactionDate", sort: "desc" }],
            },
          }}
          getRowId={(row) => row.transactionId}
          rows={rows}
          columns={headCells}
          pageSize={20}
          onSelectionModelChange={handleSelect}
          hideFooterSelectedRowCount
        />
      </div>
      <Modal open={openMoreInfoModal} onClose={handleCloseMoreInfoModal}>
        <div className={styles.modal}>
          <ExpenseMoreInfo selected={selected} expenseData={expenseData} />
        </div>
      </Modal>
    </div>
  );
}

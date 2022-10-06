import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import styles from './OrdersServedTable.module.scss';
import SearchBar from 'material-ui-search-bar';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { Tooltip } from '@mui/material';
import { printPdf } from '../../../../../print/printFunctions';
import dateFormat from 'dateformat';

export default function OrderServedTable({ ordersServed, fromDate, toDate}) {
    const formattedFromDate = dateFormat(fromDate, "yyyy-mm");
    const formattedToDate = dateFormat(toDate, "yyyy-mm");
    //for pdf
    const title = `Escobar - Orders Served (${formattedFromDate} to ${formattedToDate})`;
    const pdfColumns = [
        { header:"Date", dataKey: 'incomeDate' },
        { header:"Daily Income", dataKey: 'dailyIncome' }
    ]
    const [pdfRows, setPdfRows] = useState([]);
    //
    const headCells = [
        { field: 'orderTime', headerName: 'Datetime', flex: 1, align: 'left' },
        { field: 'servingType', headerName: 'Serving Type', flex: 1, align: 'left' },
        { field: 'tableNumber', headerName: 'Table No.', flex: 1, align: 'left' },
        { field: 'employeeName', headerName: 'Employee In-Charge', flex: 1, align: 'left' },
        { field: 'paymentStatus', headerName: 'Payment Status', flex: 1, align: 'left' }
    ]
    const [rows, setRows] = useState([]);
    //  search
    const [searched, setSearched] = useState("");
    const requestSearch = (searchValue) => {
        const filteredRows = ordersServed.filter((row) => {
        return String(row.orderTime).toLowerCase().includes(searchValue.toLowerCase()) || String(row.servingType).toLowerCase().includes(searchValue.toLowerCase()) || String(row.tableNumber).includes(searchValue) || row.employeeName.toLowerCase().includes(searchValue.toLowerCase()) || row.paymentStatus.toLowerCase().includes(searchValue.toLowerCase());
        });
        setRows(filteredRows);
        setPdfRows(filteredRows);
    };
    const cancelSearch = () => {
        setSearched("");
        setRows(incomeData);
    };

    useEffect(() => {
        setRows(ordersServed);
    }, [ordersServed]);

    useEffect(() => {
        setPdfRows(rows);
      }, [rows]);

  return (
    <div className={styles["container"]}>
        <div className={styles["container__header"]}>   
            {/* <SearchBar
                className={styles["search-bar"]}
                placeholder="Search Income Table"
                value={searched}
                onChange={(searchValue) => requestSearch(searchValue)}
                onCancelSearch={() => cancelSearch()}
            /> */}
            <Tooltip title="Print Orders Served">
                <LocalPrintshopIcon className={styles["print-btn"]} onClick={() => printPdf(title, pdfColumns, pdfRows)}/>
            </Tooltip>
        </div>
        <div className={styles["container__table"]}>
            <DataGrid 
                initialState={{
                    sorting: {
                    sortModel: [{ field: 'orderTime', sort: 'desc' }],
                    },
                }}
                getRowId={(row) => row.orderTime}
                rows={rows}
                columns={headCells}
                pageSize={10}
                disableSelectionOnClick
            />
        </div>
    </div>
  )
}

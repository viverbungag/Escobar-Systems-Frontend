import styles from "./ViewTransactionTable.module.scss";
import { TablePagination } from "@mui/material";
import SortSelect from "../../Shared/SortSelect/SortSelect";
import SortOrderRadioGroup from "../../Shared/SortOrderRadioGroup/SortOrderRadioGroup";
import StockOutButton from "../../Shared/Buttons/StockOutButton/StockOutButton";
import shortid from 'shortid';

export default function ViewTransactionTable({
  headers,
  rows,
  sortOrder,
  sortedBy,
  pageNo,
  sortItems,
  pageSize,
  totalPages,
  handlePageNoChange,
  handlePageSizeChange,
  handleSortedByChange,
  handleSortOrderChange,
}) {
  return (
    <div className={styles["stock-out-supply-table"]}>
      <div className={styles["stock-out-supply-table__controls"]}>
        <div className={styles["stock-out-supply-table__sort"]}>
          <SortSelect
            sortItems={sortItems}
            selectedSort={sortedBy}
            handleChange={handleSortedByChange}
          />
          <SortOrderRadioGroup
            sortOrder={sortOrder}
            handleChange={handleSortOrderChange}
          />
        </div>

        <TablePagination
          component="div"
          count={totalPages}
          page={pageNo}
          onPageChange={handlePageNoChange}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handlePageSizeChange}
        />
      </div>

      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <td key={shortid.generate()}>{header.label}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr key={shortid.generate()}>
                {headers.map((header, index) => {
                  const rowFormattedValue =
                    header?.format === undefined
                      ? String(row[header.value])
                      : header.format(String(row[header.value]));

                  const excludedColumnsWhenStockOut = [
                    "Expiry Date",
                    "Supplier",
                    "Price per Unit",
                  ];

                  const rowValue =
                    excludedColumnsWhenStockOut.includes(header.label) &&
                    row.transactionType === "STOCK_OUT"
                      ? "----"
                      : rowFormattedValue;
                      
                  return (
                    <td key={shortid.generate()}>
                      {rowValue}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

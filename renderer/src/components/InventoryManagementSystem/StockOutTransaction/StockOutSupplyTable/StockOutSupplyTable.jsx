import styles from "./StockOutSupplyTable.module.scss";
import { TablePagination } from "@mui/material";
import SortSelect from "../../Shared/SortSelect/SortSelect";
import SortOrderRadioGroup from "../../Shared/SortOrderRadioGroup/SortOrderRadioGroup";
import StockOutButton from "../../Shared/Buttons/StockOutButton/StockOutButton";
import shortid from 'shortid';

export default function StockOutSupplyTable({
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
  handleOpenStockOutModal,
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
            <td></td>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr key={shortid.generate()}>
                {headers.map((header, index) => {
                  return (
                    <td key={Object.values(row)[1] + index}>
                      {String(row[header.value])}
                    </td>
                  );
                })}
                <td>
                  <StockOutButton
                    onClick={() => handleOpenStockOutModal(row)}
                    label="Stock-Out"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

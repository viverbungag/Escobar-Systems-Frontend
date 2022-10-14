import styles from "./DashboardInMinimumTable.module.scss";
import { TablePagination } from "@mui/material";
import SortSelect from "../../Shared/SortSelect/SortSelect";
import SortOrderRadioGroup from "../../Shared/SortOrderRadioGroup/SortOrderRadioGroup";
import shortid from "shortid";

export default function DashboardInMinimumTable({
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
    <div className={styles["dashboard-in-minimum-table"]}>
      <div className={styles["dashboard-in-minimum-table__controls"]}>
        <div className={styles["dashboard-in-minimum-table__sort"]}>
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
                  return (
                    <td key={shortid.generate()}>
                      {String(row[header.value])}
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

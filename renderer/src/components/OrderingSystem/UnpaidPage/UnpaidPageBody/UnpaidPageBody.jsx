import React from "react";
import styles from "./UnpaidPageBody.module.scss";
import UnpaidPageCard from "./UnpaidPageCard/UnpaidPageCard.jsx";
import { TablePagination } from "@mui/material";
import shortid from "shortid";

const UnpaidPageBody = ({
  totalPages,
  pageNo,
  pageSize,
  pageNoOnChange,
  pageSizeOnChange,
  items,
  orderCardOnClick,
  orderCardSelected,
  voidButtonOnClick,
}) => {
  return (
    <div className={styles["UnpaidPageBody"]}>
      <div className={styles["UnpaidPageBody__pagination-container"]}>
        <TablePagination
          component="div"
          count={totalPages}
          page={pageNo}
          onPageChange={pageNoOnChange}
          rowsPerPage={pageSize}
          onRowsPerPageChange={pageSizeOnChange}
        />
      </div>

      <div className={styles["UnpaidPageBody__cards-container"]}>
        {items.map((item) => {
          return (
            <div
              key={shortid.generate()}
              onClick={() => {
                orderCardOnClick(
                  item.customerFoodOrders,
                  item.orderId,
                  item.discount,
                  item.payment,
                  item.totalCost
                );
              }}
            >
              <UnpaidPageCard
                ordernum={item.orderId}
                quantity={item.customerFoodOrders.length}
                price={item.payment}
                orderDate={item.orderTime}
                isSelected={orderCardSelected === item.orderId}
                tableNumber={item.tableNumber}
                voidButtonOnClick={voidButtonOnClick}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UnpaidPageBody;

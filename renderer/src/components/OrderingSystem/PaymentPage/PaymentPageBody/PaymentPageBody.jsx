import React, { useState, useEffect } from 'react';
import styles from './PaymentPageBody.module.scss';
import PaymentPageCard  from "./PaymentPageCard/PaymentPageCard.jsx";
import {TablePagination}  from "@mui/material";
import shortid from 'shortid';
import AdminPasswordModal from '../../../Shared/AdminPasswordModal/AdminPasswordModal';


const PaymentPageBody = ({
  totalPages,
  pageNo,
  pageSize,
  pageNoOnChange,
  pageSizeOnChange,
  items,
  orderCardOnClick,
  orderCardSelected,
  voidButtonOnClick,
  voidPassword,
}) => {


  return (
    <div className={styles["PaymentPageBody"]}>
      <div className={styles["PaymentPageBody__pagination-container"]}>
        <TablePagination
          component="div"
          count={totalPages}
          page={pageNo}
          onPageChange={pageNoOnChange}
          rowsPerPage={pageSize}
          onRowsPerPageChange={pageSizeOnChange}
        />
      </div>

      <div className={styles["PaymentPageBody__cards-container"]}>
        {items.map((item) => {
          return (
            <div key={shortid.generate()} onClick={()=>{orderCardOnClick(item.customerFoodOrders, item.orderId, item.discount, item.payment, item.totalCost)}}>
              <PaymentPageCard
                ordernum={item.orderId}
                quantity={item.customerFoodOrders.length}
                price={item.payment}
                orderDate={item.orderTime}
                isSelected={orderCardSelected === item.orderId}
                voidButtonOnClick={voidButtonOnClick}
                voidPassword={voidPassword}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentPageBody



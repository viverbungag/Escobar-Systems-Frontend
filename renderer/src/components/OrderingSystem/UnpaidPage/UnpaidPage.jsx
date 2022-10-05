import React, { useState, useEffect } from 'react'
import styles from './UnpaidPage.module.scss';
import Sidebar from "../Sidebar/Sidebar.jsx";
import UnpaidPageBody from './UnpaidPageBody/UnpaidPageBody.jsx';
import UnpaidOrderTab from './UnpaidOrderTab/UnpaidOrderTab.jsx';
import Pagination from "../../../model/Pagination";

import Rest from '../../../rest/Rest';

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

const UnpaidPage = () => {
  const rest = new Rest();

  const [pagination, setPagination] = useState(new Pagination(0, 10, "None", true));
  const [totalPages, setTotalPages] = useState(0);
  const [orderTabItems, setOrderTabItems] = useState([]);
  const [orderCardSelected, setOrderCardSelected] = useState(null);
  const [orderDiscount, setOrderDiscount] = useState(0);
  const [customerPayment, setOrderCustomerPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0); 

  const handlePageSizeOnChange = (event) => {
    setPagination(
      new Pagination(
        pagination.pageNo,
        parseInt(event.target.value, 10),
        pagination.sortedBy,
        pagination.isAscending
      )
    );
  }

  const handlePageNoOnChange = (event, newPageNo) => {
    setPagination(
      new Pagination(
        newPageNo,
        pagination.pageSize,
        pagination.sortedBy,
        pagination.isAscending
      )
    );
  }

  const handleTotalPagesLoad = (data) => {
    setTotalPages(data);
  }

  const handleOrderCardOnClick = (items, orderId, discount, customerPayment, totalCost) => {
    setOrderTabItems(items);
    setOrderCardSelected(orderId);
    setOrderDiscount(discount);
    setOrderCustomerPayment(customerPayment);
    setTotalPayment(totalCost);
  }

  const handleVoidOrderSuccess = () => {
    getUnpaidOrders();
  }

  const handleVoidButtonOnClick = (orderId) => {
    rest.delete(
      `${INITIAL_URL}/orders/void/${orderId}`,
      handleVoidOrderSuccess,
      "Successfully voided the order"
    )

  }

  const [unpaidOrders, setUnpaidOrders] = useState([]);
  const handleGetUnpaidOrders = (data) => {
    setUnpaidOrders(data);
  }
  const getUnpaidOrders = () => {
    rest.getWithPagination(
      `${INITIAL_URL}/orders/paged/unpaid`,
      pagination.tojson(),
      handleGetUnpaidOrders,
      handleTotalPagesLoad
    );
  }

  useEffect(() => {
    getUnpaidOrders();
  }, [])

  return (
    <div className={styles["UnpaidPage"]}>
        <Sidebar page = 'unpaid'/>
        <div className={styles["Component"]}>
        <UnpaidPageBody 
          items={unpaidOrders}
          totalPages={totalPages}
          pageNo={pagination.pageNo}
          pageSize={pagination.pageSize}
          orderCardSelected={orderCardSelected}
          pageNoOnChange={handlePageNoOnChange}
          pageSizeOnChange={handlePageSizeOnChange}
          orderCardOnClick={handleOrderCardOnClick}
          voidButtonOnClick={handleVoidButtonOnClick}
        />
        <UnpaidOrderTab 
          orderTabItems={orderTabItems} 
          orderCardSelected={orderCardSelected}
          orderDiscount={orderDiscount}
          customerPayment={customerPayment}
          totalPayment={totalPayment}
        />
      </div>
    </div>
  )
}

export default UnpaidPage

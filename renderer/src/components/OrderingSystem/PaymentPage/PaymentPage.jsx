import React, { useState, useEffect } from 'react';
import styles from './PaymentPage.module.scss';
import Sidebar from "../Sidebar/Sidebar.jsx";
import PaymentPageBody from "./PaymentPageBody/PaymentPageBody.jsx";
import PaymentOrderTab from "./PaymentOrderTab/PaymentOrderTab";
import Pagination from "../../../model/Pagination";
import Rest from "../../../rest/Rest.tsx";
import WindowControlBar from "../../Shared/WindowControlBar/WindowControlBar";
import { useRouter } from "next/router";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

const PaymentPage = () => {
  
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState(new Pagination(0, 10, "None", true));
  const [totalPages, setTotalPages] = useState(0);
  const [orderTabItems, setOrderTabItems] = useState([]);
  const [orderCardSelected, setOrderCardSelected] = useState(null);
  const [orderDiscount, setOrderDiscount] = useState(0);
  const [customerPayment, setOrderCustomerPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0); 

  const rest = new Rest();

  const router = useRouter();

  const handleBackButtonOnClick = () => {
    localStorage.getItem("isAdmin") === "true"
      ? router.push("/main-admin-dashboard")
      : router.push("/main-employee-dashboard");
  };

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

  const handleOrderCardOnClick = (items, orderId, discount, customerPayment, totalCost) => {
    setOrderTabItems(items);
    setOrderCardSelected(orderId);
    setOrderDiscount(discount);
    setOrderCustomerPayment(customerPayment);
    setTotalPayment(totalCost);
  }

  const handleOrdersLoad = (contents) => {
    console.log("contents: ", contents);
    setOrders(contents);
  }

  const handleTotalPagesLoad = (data) => {
    setTotalPages(data);
  }

  const getAllOrders = () => {
    rest.getWithPagination(
      `${INITIAL_URL}/orders/paged`,
      pagination.tojson(),
      handleOrdersLoad,
      handleTotalPagesLoad
    );
  }

  const handleVoidOrderSuccess = () => {
    getAllOrders();
  }

  const handleVoidButtonOnClick = (orderId) => {
    rest.delete(
      `${INITIAL_URL}/orders/void/${orderId}`,
      handleVoidOrderSuccess,
      "Successfully voided the order"
    )

  }

  useEffect(() => {
    // console.log("contents: ");
    getAllOrders();
  }, [pagination]);

  return (
    <div className={styles["PaymentPage"]}>
      <WindowControlBar handleBackButtonOnClick={handleBackButtonOnClick} />
      <Sidebar page="paymentpage" />
      <div className={styles["Component"]}>
        <PaymentPageBody
          items={orders}
          totalPages={totalPages}
          pageNo={pagination.pageNo}
          pageSize={pagination.pageSize}
          orderCardSelected={orderCardSelected}
          pageNoOnChange={handlePageNoOnChange}
          pageSizeOnChange={handlePageSizeOnChange}
          orderCardOnClick={handleOrderCardOnClick}
          voidButtonOnClick={handleVoidButtonOnClick}
        />
        <PaymentOrderTab 
        orderTabItems={orderTabItems} 
        orderCardSelected={orderCardSelected}
        orderDiscount={orderDiscount}
        customerPayment={customerPayment}
        totalPayment={totalPayment}
        />
      </div>
    </div>
  );
}

export default PaymentPage


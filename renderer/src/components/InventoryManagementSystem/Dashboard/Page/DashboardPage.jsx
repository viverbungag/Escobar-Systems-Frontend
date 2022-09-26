import React, { useState, useEffect } from 'react';
import styles from "./DashboardPage.module.scss";
import WindowControlBar from "../../../Shared/WindowControlBar/WindowControlBar";
import Navigation from "../../Shared/Navigation/Navigation";
import Rest from "../../../../rest/Rest.tsx";
import Pagination from "src/model/Pagination";
import DashboardInMinimumTable from "../DashboardInMinimumTable/DashboardInMinimumTable";
import DashboardExpiredTable from "../DashboardExpiredTable/DashboardExpiredTable";
import AddStockOutTransactionModal from '../../Shared/AddStockOutTransactionModal/AddStockOutTransactionModal';
import { useRouter } from "next/router";
import Transaction from "../../../../model/Transaction.tsx";
import { useUser } from '../../../contexts/UserContext';
import { toast } from 'react-toastify';

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

const inMinimumHeaders = [
  {
    id: "supply",
    label: "Name",
    value: "supplyName",
  },
  {
    id: "minimumQuantity",
    label: "Minimum Quantity",
    value: "minimumQuantity",
  },
  {
    id: "supplyQuantity",
    label: "Quantity",
    value: "supplyQuantity",
  },
];

const inMinimumSortItems = [
  {
    label: "Name",
  },
  {
    label: "Quantity",
  },
  {
    label: "Minimum Quantity",
  },
];

const expiredHeaders = [
  {
    id: "expiryDate",
    label: "Expiry Date",
    value: "expiryDate",
    format: (string) => string.split("T")[0]
  },
  {
    id: "supply",
    label: "Supply",
    value: "supplyName",
  },
  {
    id: "supplyQuantity",
    label: "Quantity",
    value: "supplyQuantity",
  },
  {
    id: "unitOfMeasurementAbbreviation",
    label: "Measurement",
    value: "unitOfMeasurementAbbreviation",
  }
];

const expiredSortItems = [
  {
    label: "Transaction Date",
  },
  {
    label: "Supply",
  },
  {
    label: "Quantity",
  },
];


const DashboardPage = () => {

  const currentDate = new Date();
  const defaultExpirationDate = new Date(currentDate.getTime());
  defaultExpirationDate.setDate(defaultExpirationDate.getDate() + 7);

  const { employeeName } = useUser();

  const [inMinimumSupplies, setInMinimumSupplies] = useState([]);
  const [expiredSupplies, setExpiredSupplies] = useState([]);

  const [activeInMinimumPagination, setActiveInMinimumPagination] = useState(
    new Pagination(0, 10, "None", true)
  );
  const [activeExpiredPagination, setActiveExpiredPagination] = useState(
    new Pagination(0, 10, "None", true)
  );

  const [activeInMinimumTotalPages, setActiveInMinimumTotalPages] = useState(0);
  const [activeExpiredTotalPages, setActiveExpiredTotalPages] = useState(0);

  const [expiredQuantity, setExpiredQuantity] = useState(0);

  const [addTransaction, setAddTransaction] = useState(
    new Transaction(
      1,
      employeeName,
      currentDate,
      "",
      1,
      "",
      "",
      0,
      defaultExpirationDate,
      "STOCK_OUT"
    )
  );

  const [openStockOutModal, setOpenStockOutModal] = useState(false);

  const rest = new Rest();

  const router = useRouter();

  const handleBackButtonOnClick = () => {
    localStorage.getItem("isAdmin") === "true"
      ? router.push("/main-admin-dashboard")
      : router.push("/main-employee-dashboard");
  };

  const handleOpenStockOutModal = (supply) => {
    setAddTransaction(
      new Transaction(
        supply.transactionId,
        employeeName,
        currentDate,
        supply.supplierName,
        1,
        supply.supplyName,
        supply.unitOfMeasurementName,
        0,
        defaultExpirationDate,
        "STOCK_OUT"
      )
    );
    setExpiredQuantity(supply.supplyQuantity);
    setOpenStockOutModal(true);
  };
  const handleCloseAddModal = () => {
    setOpenStockOutModal(false);
  };

  const handleQuantityStockOutChange = (event) => {
    setAddTransaction(
      new Transaction(
        1,
        employeeName,
        currentDate,
        addTransaction.supplierName,
        event.target.value,
        addTransaction.supplyName,
        addTransaction.unitOfMeasurementAbbreviation,
        0,
        defaultExpirationDate,
        "STOCK_OUT"
      )
    );
  };

  const handleAddModalButtonClicked = () => {
    
    if (addTransaction.supplyQuantity > expiredQuantity){
      toast.error("The inputted quantity should not be over the expired quantity");
      return;
    }
    
    stockOut();
  };

  const addSuccessAction = () => {
    loadAllSupplies();
    setOpenStockOutModal(false);
    setAddTransaction(
      new Transaction(
        1,
        employeeName,
        currentDate,
        "",
        1,
        "",
        "",
        1,
        defaultExpirationDate,
        "STOCK_OUT"
      )
    );
  };

  const stockOut = () => {
    rest.add(
      `${INITIAL_URL}/transaction/expired/stock-out`,
      addTransaction.toJson(),
      addSuccessAction,
      `Successully added the transaction`
    );
  };

  const handleActiveInMinimumPageSizeChange = (event) => {
    setActiveInMinimumPagination(
      new Pagination(
        activeInMinimumPagination.pageNo,
        parseInt(event.target.value, 10),
        activeInMinimumPagination.sortedBy,
        activeInMinimumPagination.isAscending
      )
    );
    
  };
  const handleActiveExpiredPageSizeChange = (event) => {
    setActiveExpiredPagination(
      new Pagination(
        activeExpiredPagination.pageNo,
        parseInt(event.target.value, 10),
        activeExpiredPagination.sortedBy,
        activeExpiredPagination.isAscending
      )
    );
    
  };

  const handleActiveInMinimumPageNoChange = (event, newPageNo) => {
    setActiveInMinimumPagination(
      new Pagination(
        newPageNo,
        activeInMinimumPagination.pageSize,
        activeInMinimumPagination.sortedBy,
        activeInMinimumPagination.isAscending
      )
    );
  };
  const handleActiveExpiredPageNoChange = (event, newPageNo) => {
    setActiveExpiredPagination(
      new Pagination(
        newPageNo,
        activeExpiredPagination.pageSize,
        activeExpiredPagination.sortedBy,
        activeExpiredPagination.isAscending
      )
    );
  };

  const handleActiveInMinimumSortedByChange = (event) => {
    setActiveInMinimumPagination(
      new Pagination(
        activeInMinimumPagination.pageNo,
        activeInMinimumPagination.pageSize,
        event.target.value,
        activeInMinimumPagination.isAscending
      )
    );
  };
  const handleActiveExpiredSortedByChange = (event) => {
    setActiveExpiredPagination(
      new Pagination(
        activeExpiredPagination.pageNo,
        activeExpiredPagination.pageSize,
        event.target.value,
        activeExpiredPagination.isAscending
      )
    );
  };

  const handleActiveInMinimumSortOrderChange = (event) => {
    setActiveInMinimumPagination(
      new Pagination(
        activeInMinimumPagination.pageNo,
        activeInMinimumPagination.pageSize,
        activeInMinimumPagination.sortedBy,
        event.target.value === "Ascending" ? true : false
      )
    );
  };
  const handleActiveExpiredSortOrderChange = (event) => {
    setActiveExpiredPagination(
      new Pagination(
        activeExpiredPagination.pageNo,
        activeExpiredPagination.pageSize,
        activeExpiredPagination.sortedBy,
        event.target.value === "Ascending" ? true : false
      )
    );
  };

  const handleInMinimumSuppliesLoad = (contents) => {
    setInMinimumSupplies(contents);
  };

  const handleActiveInMinimumTotalPagesLoad = (data) => {
    setActiveInMinimumTotalPages(data);
  };

  const getAllInMinimumSupplies = () => {
    rest.getWithPagination(
      `${INITIAL_URL}/supply/active/in-minimum`,
      activeInMinimumPagination.tojson(),
      handleInMinimumSuppliesLoad,
      handleActiveInMinimumTotalPagesLoad
    );
  };
  const handleExpiredSuppliesLoad = (contents) => {
    setExpiredSupplies(contents);
  };

  const handleActiveExpiredTotalPagesLoad = (data) => {
    setActiveExpiredTotalPages(data);
  };

  const getAllExpiredSupplies = () => {
    rest.getWithPagination(
      `${INITIAL_URL}/transaction/expired`,
      activeExpiredPagination.tojson(),
      handleExpiredSuppliesLoad,
      handleActiveExpiredTotalPagesLoad
    );
  };

  const loadAllInMinimumSupplies = () => {
    getAllInMinimumSupplies();
  };

  const loadAllExpiredSupplies = () => {
    getAllExpiredSupplies();
  };


  useEffect(() => {
    loadAllInMinimumSupplies();
  }, [activeInMinimumPagination]);

  useEffect(() => {
    loadAllExpiredSupplies();
  }, [activeExpiredPagination]);


  return (
    <div className={styles["dashboard-page"]}>
      <AddStockOutTransactionModal 
        supplyName={addTransaction.supplyName}
        quantity ={addTransaction.supplyQuantity}
        unitOfMeasurement={addTransaction.unitOfMeasurementAbbreviation}
        quantityOnChange={handleQuantityStockOutChange}
        onClickAddButton={handleAddModalButtonClicked}
        openAddModal={openStockOutModal}
        handleCloseAddModal={handleCloseAddModal}
      />

      <section className={styles["dashboard-page__upper-section"]}>
        <WindowControlBar handleBackButtonOnClick={handleBackButtonOnClick} />
      </section>

      <section className={styles["dashboard-page__lower-section"]}>
        <Navigation page="dashboard" />
        <section className={styles["dashboard-page__main-section"]}>
          <section className={styles["dashboard-page__in-minimum-section"]}>
            <div className={styles["dashboard-page__title"]}>
              <h1>SUPPLIES IN MINIMUM</h1>
            </div>
            <section className={styles["dashboard-page__main-bottom-section"]}>
              <div className={styles["dashboard-page__in-minimum-table"]}>
                <DashboardInMinimumTable
                  headers={inMinimumHeaders}
                  rows={inMinimumSupplies}
                  sortOrder={
                    activeInMinimumPagination.isAscending ? "Ascending" : "Descending"
                  }
                  sortedBy={activeInMinimumPagination.sortedBy}
                  pageNo={activeInMinimumPagination.pageNo}
                  pageSize={activeInMinimumPagination.pageSize}
                  totalPages={activeInMinimumTotalPages}
                  sortItems={inMinimumSortItems}
                  handlePageNoChange={handleActiveInMinimumPageNoChange}
                  handlePageSizeChange={handleActiveInMinimumPageSizeChange}
                  handleSortedByChange={handleActiveInMinimumSortedByChange}
                  handleSortOrderChange={handleActiveInMinimumSortOrderChange}
                />
              </div>
            </section>
          </section>

          {/* <section className={styles["dashboard-page__expired-section"]}>
            <div className={styles["dashboard-page__title"]}>
              <h1>EXPIRED PRODUCTS</h1>
            </div>
            <section className={styles["dashboard-page__main-bottom-section"]}>
              <div className={styles["dashboard-page__in-minimum-table"]}>
                <DashboardExpiredTable
                  headers={expiredHeaders}
                  rows={expiredSupplies}
                  sortOrder={
                    activeExpiredPagination.isAscending ? "Ascending" : "Descending"
                  }
                  sortedBy={activeExpiredPagination.sortedBy}
                  pageNo={activeExpiredPagination.pageNo}
                  pageSize={activeExpiredPagination.pageSize}
                  totalPages={activeExpiredTotalPages}
                  sortItems={expiredSortItems}
                  handlePageNoChange={handleActiveExpiredPageNoChange}
                  handlePageSizeChange={handleActiveExpiredPageSizeChange}
                  handleSortedByChange={handleActiveExpiredSortedByChange}
                  handleSortOrderChange={handleActiveExpiredSortOrderChange}
                  handleOpenStockOutModal={handleOpenStockOutModal}
                />
              </div>
            </section>
          </section> */}
        </section>
      </section>
    </div>
  );
};

export default DashboardPage;

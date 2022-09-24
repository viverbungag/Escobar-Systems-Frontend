import React, { useState, useEffect } from "react";
import styles from "./ViewTransactionPage.module.scss";
import WindowControlBar from "../../Shared/WindowControlBar/WindowControlBar";
import Navigation from "../../Shared/Navigation/Navigation";
import Toast from "../../Shared/Toast/Toast";
import PaginationFilter from "../../../model/PaginationFilter";
import TransactionPrintDetails from "../../../model/TransactionPrintDetails";
import Rest from "../../../rest/Rest";
import ViewTransactionTable from "../ViewTransactionTable/ViewTransactionTable";
// import FilterTransactionSection from "../FilterTransactionSection/FilterTransactionSection";
import FilterTransactionModal from "../FilterTransactionModal/FilterTransactionModal";
import OpenFilterButton from "../../Shared/Buttons/OpenFilterButton/OpenFilterButton";
import PrintButton from "../../Shared/Buttons/PrintButton/PrintButton";
import { toast } from "react-toastify";
import { useUser } from "../../contexts/UserContext";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

const headers = [
  {
    id: "id",
    label: "Id",
    value: "transactionId",
  },
  {
    id: "transactionDate",
    label: "Transaction Date",
    value: "transactionDate",
  },
  {
    id: "supply",
    label: "Supply",
    value: "supplyName",
  },
  {
    id: "supplier",
    label: "Supplier",
    value: "supplierName",
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
  },
  {
    id: "pricePerUnit",
    label: "Price per Unit",
    value: "pricePerUnit",
  },
  {
    id: "transactBy",
    label: "Transact By",
    value: "transactByName",
  },
  {
    id: "transactionType",
    label: "Type",
    value: "transactionType",
  },
];

const sortItems = [
  {
    label: "Transaction Date",
  },
  {
    label: "Supply",
  },
  {
    label: "Supplier",
  },
  {
    label: "Quantity",
  },
  {
    label: "Transact By",
  },
];

const ViewTransactionPage = () => {
  const { employeeName } = useUser();
  const currentDate = new Date();
  const yesterdayDate = new Date(currentDate.getTime());
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  const [transactions, setTransactions] = useState([]);

  const [paginationFilter, setPaginationFilter] = useState(
    new PaginationFilter(
      0,
      10,
      "None",
      true,
      [],
      [],
      [],
      yesterdayDate,
      currentDate,
      ["STOCK_IN", "STOCK_OUT"],
      false
    )
  );

  const [activeTotalPages, setActiveTotalPages] = useState(0);

  const [supplies, setSupplies] = useState([]);
  const [unitOfMeasurements, setUnitOfMeasurements] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [openFilterModal, setOpenFilterModal] = useState(false);

  const handleFilterModalOnOpen = () => setOpenFilterModal(true);
  const handleFilterModalOnClose = () => setOpenFilterModal(false);

  const rest = new Rest();

  const handleActivePageSizeChange = (event) => {
    setPaginationFilter(
      new PaginationFilter(
        paginationFilter.pageNo,
        parseInt(event.target.value, 10),
        paginationFilter.sortedBy,
        paginationFilter.isAscending,
        paginationFilter.supplyFilter,
        paginationFilter.unitOfMeasurementFilter,
        paginationFilter.supplierFilter,
        paginationFilter.transactionDateStart,
        paginationFilter.transactionDateEnd,
        paginationFilter.transactionTypeFilter,
        paginationFilter.isTransactionDateEnabled
      )
    );
  };

  const handleActivePageNoChange = (event, newPageNo) => {
    setPaginationFilter(
      new PaginationFilter(
        newPageNo,
        paginationFilter.pageSize,
        paginationFilter.sortedBy,
        paginationFilter.isAscending,
        paginationFilter.supplyFilter,
        paginationFilter.unitOfMeasurementFilter,
        paginationFilter.supplierFilter,
        paginationFilter.transactionDateStart,
        paginationFilter.transactionDateEnd,
        paginationFilter.transactionTypeFilter,
        paginationFilter.isTransactionDateEnabled
      )
    );
  };

  const handleActiveSortedByChange = (event) => {
    setPaginationFilter(
      new PaginationFilter(
        paginationFilter.pageNo,
        paginationFilter.pageSize,
        event.target.value,
        paginationFilter.isAscending,
        paginationFilter.supplyFilter,
        paginationFilter.unitOfMeasurementFilter,
        paginationFilter.supplierFilter,
        paginationFilter.transactionDateStart,
        paginationFilter.transactionDateEnd,
        paginationFilter.transactionTypeFilter,
        paginationFilter.isTransactionDateEnabled
      )
    );
  };

  const handleActiveSortOrderChange = (event) => {
    setPaginationFilter(
      new PaginationFilter(
        paginationFilter.pageNo,
        paginationFilter.pageSize,
        paginationFilter.sortedBy,
        event.target.value === "Ascending" ? true : false,
        paginationFilter.supplyFilter,
        paginationFilter.unitOfMeasurementFilter,
        paginationFilter.supplierFilter,
        paginationFilter.transactionDateStart,
        paginationFilter.transactionDateEnd,
        paginationFilter.transactionTypeFilter,
        paginationFilter.isTransactionDateEnabled
      )
    );
  };

  const handleSelectedSupplyOnChange = (event) => {
    const {
      target: { value },
    } = event;

    const newSupplyFilter =
      typeof value === "string" ? value.split(",") : value;

    setPaginationFilter(
      new PaginationFilter(
        paginationFilter.pageNo,
        paginationFilter.pageSize,
        paginationFilter.sortedBy,
        paginationFilter.isAscending,
        newSupplyFilter,
        paginationFilter.unitOfMeasurementFilter,
        paginationFilter.supplierFilter,
        paginationFilter.transactionDateStart,
        paginationFilter.transactionDateEnd,
        paginationFilter.transactionTypeFilter,
        paginationFilter.isTransactionDateEnabled
      )
    );
  };

  const handleSuppliesLoad = (data) => {
    setSupplies(data);
  };

  const getAllSupplies = () => {
    rest.get(`${INITIAL_URL}/supply/names`, handleSuppliesLoad);
  };

  const handleUnitOfMeasurementsLoad = (data) => {
    setUnitOfMeasurements(data);
  };

  const getAllUnitOfMeasurements = () => {
    rest.get(
      `${INITIAL_URL}/unit-of-measurement`,
      handleUnitOfMeasurementsLoad
    );
  };

  const handleSuppliersLoad = (data) => {
    setSuppliers(data);
  };

  const getAllSuppliers = () => {
    rest.get(`${INITIAL_URL}/supplier`, handleSuppliersLoad);
  };

  const handleTransactionsLoad = (contents) => {
    setTransactions(contents);
  };

  const handleActiveTotalPagesLoad = (data) => {
    setActiveTotalPages(data);
  };

  const getAllTransactions = () => {
    rest.getWithPagination(
      `${INITIAL_URL}/transaction`,
      paginationFilter.tojson(),
      handleTransactionsLoad,
      handleActiveTotalPagesLoad
    );
  };

  const loadAllTransactions = () => {
    getAllTransactions();
  };

  const handleSaveFilterOnClick = (
    newSupplyFilter,
    newUnitOfMeasurementFilter,
    newSupplierFilter,
    newTransactionDateStart,
    newTransactionDateEnd,
    newTransacationTypeFilter,
    newIsTransactionDateEnabled
  ) => {
    // console.log(newTransactionDateStart.toDateString());
    // console.log(newTransactionDateEnd.toDateString());

    if (newTransactionDateStart.getTime() > newTransactionDateEnd.getTime() && newTransactionDateStart.toDateString() !== newTransactionDateEnd.toDateString()) {
      toast.error("Invalid Date");
      return;
    } 
    setPaginationFilter(
      new PaginationFilter(
        paginationFilter.pageNo,
        paginationFilter.pageSize,
        paginationFilter.sortedBy,
        paginationFilter.isAscending,
        newSupplyFilter,
        newUnitOfMeasurementFilter,
        newSupplierFilter,
        newTransactionDateStart,
        newTransactionDateEnd,
        newTransacationTypeFilter,
        newIsTransactionDateEnabled
      )
    );
    handleFilterModalOnClose();
    toast.success("Filtered the items successfully");

  };

  const handlePrintButtonOnClick = () => {
    const transactionPrintDetails = new TransactionPrintDetails(
      transactions,
      employeeName
    );

    rest.print(
      `${INITIAL_URL}/transaction/print`,
      transactionPrintDetails.toJson(),
      () => {},
      "Print is successful"
    );
  };

  useEffect(() => {
    loadAllTransactions();
    getAllSupplies();
    getAllUnitOfMeasurements();
    getAllSuppliers();
  }, [paginationFilter]);

  return (
    <div className={styles["supply-page"]}>
      <Toast />
      <FilterTransactionModal
        paginationFilter={paginationFilter}
        supplies={supplies}
        unitOfMeasurements={unitOfMeasurements}
        suppliers={suppliers}
        openModal={openFilterModal}
        handleCloseModal={handleFilterModalOnClose}
        saveFilterOnClick={handleSaveFilterOnClick}
      />
      <section className={styles["supply-page__upper-section"]}>
        <WindowControlBar />
      </section>

      <section className={styles["supply-page__lower-section"]}>
        <Navigation page="view-transactions" />
        <section className={styles["supply-page__main-section"]}>
          <section className={styles["supply-page__main-top-section"]}>
            <OpenFilterButton
              label="Edit Filter"
              onClick={handleFilterModalOnOpen}
            />
            <PrintButton
              label="Print Transactions"
              onClick={handlePrintButtonOnClick}
            />
          </section>
          <section className={styles["supply-page__main-bottom-section"]}>
            <ViewTransactionTable
              headers={headers}
              rows={transactions}
              sortOrder={
                paginationFilter.isAscending ? "Ascending" : "Descending"
              }
              sortedBy={paginationFilter.sortedBy}
              pageNo={paginationFilter.pageNo}
              pageSize={paginationFilter.pageSize}
              totalPages={activeTotalPages}
              sortItems={sortItems}
              handlePageNoChange={handleActivePageNoChange}
              handlePageSizeChange={handleActivePageSizeChange}
              handleSortedByChange={handleActiveSortedByChange}
              handleSortOrderChange={handleActiveSortOrderChange}
            />
          </section>
        </section>
      </section>
    </div>
  );
};

export default ViewTransactionPage;

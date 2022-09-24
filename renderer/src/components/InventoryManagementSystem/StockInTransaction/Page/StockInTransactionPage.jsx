import React, { useState, useEffect } from "react";
import DataTable from "../../Shared/DataTable/DataTable";
import styles from "./StockInTransactionPage.module.scss";
import WindowControlBar from "../../Shared/WindowControlBar/WindowControlBar";
import Navigation from "../../Shared/Navigation/Navigation";
import SaveButton from "../../Shared/Buttons/SaveButton/SaveButton";
import InactivateButton from "../../Shared/Buttons/InactivateButton/InactivateButton";
import InactiveItemsButton from "../../Shared/Buttons/InactiveItemsButton/InactiveItemsButton";
import StockInTransactionModal from "../StockInTransactionModal/StockInTransactionModal";
import Toast from "../../Shared/Toast/Toast";
import Pagination from "src/model/Pagination";
import Rest from "../../../rest/Rest";
import Transaction from "../../../model/Transaction";
import dateFormat from "dateformat";
import { useUser } from "../../contexts/UserContext";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

const StockInTransactionPage = () => {
  const currentDate = new Date();
  const defaultExpirationDate = new Date(currentDate.getTime());
  defaultExpirationDate.setDate(defaultExpirationDate.getDate() + 7);

  const { employeeName } = useUser();

  const [activeSuppliers, setActiveSuppliers] = useState([]);
  const [activeSupplies, setActiveSupplies] = useState([]);

  const [addTransaction, setAddTransaction] = useState(
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
      "STOCK_IN"
    )
  );

  const rest = new Rest();

  const handleTransactionDateOnChange = (newDate) => {
    setAddTransaction(
      new Transaction(
        addTransaction.transactionId,
        addTransaction.transactByName,
        newDate,
        addTransaction.supplierName,
        addTransaction.supplyQuantity,
        addTransaction.supplyName,
        addTransaction.unitOfMeasurementAbbreviation,
        addTransaction.pricePerUnit,
        addTransaction.expiryDate,
        addTransaction.transactionType
      )
    );
  };

  const handleSupplierOnChange = (event) => {
    setAddTransaction(
      new Transaction(
        addTransaction.transactionId,
        addTransaction.transactByName,
        addTransaction.transactionDate,
        event.target.value,
        addTransaction.supplyQuantity,
        addTransaction.supplyName,
        addTransaction.unitOfMeasurementAbbreviation,
        addTransaction.pricePerUnit,
        addTransaction.expiryDate,
        addTransaction.transactionType
      )
    );
  };

  const handleQuantityOnChange = (event) => {
    setAddTransaction(
      new Transaction(
        addTransaction.transactionId,
        addTransaction.transactByName,
        addTransaction.transactionDate,
        addTransaction.supplierName,
        event.target.value,
        addTransaction.supplyName,
        addTransaction.unitOfMeasurementAbbreviation,
        addTransaction.pricePerUnit,
        addTransaction.expiryDate,
        addTransaction.transactionType
      )
    );
  };

  const handleSupplyOnChange = (event) => {
    const selectedSupplyName = event.target.value;
    const selectedSupply = activeSupplies.find(
      (supply) => supply.supplyName === selectedSupplyName
    );

    setAddTransaction(
      new Transaction(
        addTransaction.transactionId,
        addTransaction.transactByName,
        addTransaction.transactionDate,
        selectedSupply.supplierName,
        addTransaction.supplyQuantity,
        selectedSupplyName,
        selectedSupply.unitOfMeasurementAbbreviation,
        addTransaction.pricePerUnit,
        addTransaction.expiryDate,
        addTransaction.transactionType
      )
    );
  };

  const handlePricePerUnitOnChange = (event) => {
    setAddTransaction(
      new Transaction(
        addTransaction.transactionId,
        addTransaction.transactByName,
        addTransaction.transactionDate,
        addTransaction.supplierName,
        addTransaction.supplyQuantity,
        addTransaction.supplyName,
        addTransaction.unitOfMeasurementAbbreviation,
        event.target.value,
        addTransaction.expiryDate,
        addTransaction.transactionType
      )
    );
  };

  const handleExpiryDateOnChange = (newDate) => {
    setAddTransaction(
      new Transaction(
        addTransaction.transactionId,
        addTransaction.transactByName,
        addTransaction.transactionDate,
        addTransaction.supplierName,
        addTransaction.supplyQuantity,
        addTransaction.supplyName,
        addTransaction.unitOfMeasurementAbbreviation,
        addTransaction.pricePerUnit,
        newDate,
        addTransaction.transactionType
      )
    );
  };

  const handleAddModalButtonClicked = () => {
    stockIn();
  };

  const handleActiveSuppliesLoad = (data) => {
    setActiveSupplies(data);
  };

  const getAllActiveSupplies = () => {
    rest.get(`${INITIAL_URL}/supply/with-suppliers`, handleActiveSuppliesLoad);
  };

  const handleActiveSuppliersLoad = (data) => {
    setActiveSuppliers(data);
  };

  const getAllActiveSuppliers = () => {
    rest.get(`${INITIAL_URL}/supplier`, handleActiveSuppliersLoad);
  };

  const addSuccessAction = () => {
    setAddTransaction(
      new Transaction(
        1,
        employeeName,
        currentDate,
        activeSupplies[0]?.supplierName,
        1,
        activeSupplies[0]?.supplyName,
        activeSupplies[0]?.unitOfMeasurementAbbreviation,
        1,
        defaultExpirationDate,
        "STOCK_IN"
      )
    );
  };

  const stockIn = () => {
    console.log(addTransaction.toJson());

    rest.add(
      `${INITIAL_URL}/transaction/stock-in`,
      addTransaction.toJson(),
      addSuccessAction,
      `Successully added the transaction`
    );
  };

  useEffect(() => {
    getAllActiveSuppliers();
    getAllActiveSupplies();
  }, []);

  return (
    <>
      <div className={styles["stock-in-transaction-page"]}>
        <Toast />
        <StockInTransactionModal
          allSupplies={activeSupplies}
          allSuppliers={activeSuppliers}
          supply={addTransaction.supplyName}
          supplier={addTransaction.supplierName}
          transactBy={addTransaction.transactBy}
          transactionDate={addTransaction.transactionDate}
          quantity={addTransaction.supplyQuantity}
          unitOfMeasurement={addTransaction.unitOfMeasurementAbbreviation}
          pricePerUnit={addTransaction.pricePerUnit}
          expiryDate={addTransaction.expiryDate}
          supplyOnChange={handleSupplyOnChange}
          supplierOnChange={handleSupplierOnChange}
          transactionDateOnChange={handleTransactionDateOnChange}
          quantityOnChange={handleQuantityOnChange}
          pricePerUnitOnChange={handlePricePerUnitOnChange}
          expiryDateOnChange={handleExpiryDateOnChange}
          onClickAddButton={handleAddModalButtonClicked}
        />
        <section className={styles["stock-in-transaction-page__upper-section"]}>
          <WindowControlBar />
        </section>
        <section className={styles["stock-in-transaction-page__lower-section"]}>
          <Navigation page="stock-in" />
        </section>
      </div>
    </>
  );
};

export default StockInTransactionPage;

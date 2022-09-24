import React, { useState, useEffect } from 'react';
import styles from "./FilterTransactionSection.module.scss";
import FilterSelect from "../../Shared/FilterSelect/FilterSelect";
import ResetButton from "../../Shared/Buttons/ResetButton/ResetButton";
import ModalSaveButton from "../../Shared/Buttons/ModalSaveButton/ModalSaveButton";
import { Checkbox, FormControlLabel, TextField, Switch } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const FilterTransactionSection = ({
  paginationFilter,
  supplies,
  unitOfMeasurements,
  suppliers,
  selectedSuppliesFilter,
  selectedUnitOfMeasurementsFilter,
  selectedSuppliersFilter,
  selectedSupplyFilterOnChange,
  selectedUnitOfMeasurementFilterOnChange,
  selectedSupplierFilterOnChange,
  supplyResetButtonOnClick,
  unitOfMeasurementResetButtonClick,
  supplierResetButtonClick,
  saveFilterOnClick,
}) => {

  const [isStockInChecked, setIsStockInChecked] = useState(paginationFilter.transactionTypeFilter.find((item)=> item === "STOCK_IN") ? true: false);
  const [isStockOutChecked, setIsStockOutChecked] = useState(paginationFilter.transactionTypeFilter.find((item)=> item === "STOCK_OUT")  ? true: false);

  const handleStockInCheckboxOnChange = () => {
    setIsStockInChecked(!isStockInChecked);
  }

  const handleStockOutCheckboxOnChange = () => {
    setIsStockOutChecked(!isStockOutChecked);
  }

  const [fromDate, setFromDate] = useState(paginationFilter.transactionDateStart);
  const[toDate, setToDate] = useState(paginationFilter.transactionDateEnd);
  const[isDateDisabled, setIsDateDisabled] = useState(paginationFilter.isTransactionDateEnabled);

  const handleFromDateOnChange = (newDate) => {
    setFromDate(newDate);
  }

  const handleToDateOnChange = (newDate) => {
    setToDate(newDate);
  }

  const handleIsDateDisabledOnChange = () => {
    setIsDateDisabled(!isDateDisabled);
  }

  return (
    <div className={styles["filter-transaction-section"]}>
      <div className={styles["filter-transaction-section__item"]}>
        <h3>Supplies:</h3>
        <FilterSelect
          defaultLabel="All Supplies"
          items={supplies}
          selectedItems={selectedSuppliesFilter}
          handleChange={selectedSupplyFilterOnChange}
        />
        <ResetButton label="Reset" onClick={supplyResetButtonOnClick} />
      </div>

      <div className={styles["filter-transaction-section__item"]}>
        <h3>Unit of Measurements:</h3>
        <FilterSelect
          defaultLabel="All Unit of Measurements"
          items={unitOfMeasurements}
          selectedItems={selectedUnitOfMeasurementsFilter}
          handleChange={selectedUnitOfMeasurementFilterOnChange}
        />
        <ResetButton
          label="Reset"
          onClick={unitOfMeasurementResetButtonClick}
        />
      </div>

      <div className={styles["filter-transaction-section__item"]}>
        <h3>Suppliers:</h3>
        <FilterSelect
          defaultLabel="All Suppliers"
          items={suppliers}
          selectedItems={selectedSuppliersFilter}
          handleChange={selectedSupplierFilterOnChange}
        />
        <ResetButton label="Reset" onClick={supplierResetButtonClick} />
      </div>

      <div className={styles["filter-transaction-section__item"]}>
        <h3>Transaction type:</h3>
        <FormControlLabel
          control={<Checkbox checked={isStockInChecked} onChange={handleStockInCheckboxOnChange} />}
          label="Stock-In"
        />

        <FormControlLabel
          control={<Checkbox checked={isStockOutChecked} onChange={handleStockOutCheckboxOnChange} />}
          label="Stock-Out"
        />
      </div>

      <div className={styles["filter-transaction-section__item"]}>
        <h3>Transaction Date:</h3>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="From"
                  inputFormat="MM/dd/yyyy"
                  value={fromDate}
                  onChange={handleFromDateOnChange}
                  renderInput={(params) => <TextField {...params} />}
                  disabled={!isDateDisabled}
                />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="To"
                  inputFormat="MM/dd/yyyy"
                  value={toDate}
                  onChange={handleToDateOnChange}
                  renderInput={(params) => <TextField {...params} />}
                  disabled={!isDateDisabled}
                />
        </LocalizationProvider>
        <Switch
          checked={isDateDisabled}
          onChange={handleIsDateDisabledOnChange}
          inputProps={{ 'aria-label': 'controlled' }}
    />
      </div>

      <ModalSaveButton
        label="Save Filter"
        onClick={() => {
          const transactionTypes = [];
          if (isStockInChecked) transactionTypes.push("STOCK_IN");
          if (isStockOutChecked) transactionTypes.push("STOCK_OUT");

          saveFilterOnClick(
            selectedSuppliesFilter,
            selectedUnitOfMeasurementsFilter,
            selectedSuppliersFilter,
            fromDate,
            toDate,
            transactionTypes,
            isDateDisabled
          );
        }}
      />
    </div>
  );
};

export default FilterTransactionSection;

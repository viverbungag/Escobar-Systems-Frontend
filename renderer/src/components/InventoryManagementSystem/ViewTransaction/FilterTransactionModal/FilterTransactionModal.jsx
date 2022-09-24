import React, { useState, useEffect } from "react";
import styles from "./FilterTransactionModal.module.scss";
import { Modal, Slide, Backdrop } from "@mui/material";
import FilterTransactionSection from "../FilterTransactionSection/FilterTransactionSection";

const FilterTransactionModal = ({
  paginationFilter,
  supplies,
  suppliers,
  unitOfMeasurements,
  openModal,
  handleCloseModal,
  saveFilterOnClick,
}) => {
  const [selectedSuppliesFilter, setSelectedSuppliesFilter] = useState(
    paginationFilter.supplyFilter
  );
  const [
    selectedUnitOfMeasurementsFilter,
    setSelectedUnitOfMeasurementsFilter,
  ] = useState(paginationFilter.unitOfMeasurementFilter);
  const [selectedSuppliersFilter, setSelectedSuppliersFilter] = useState(
    paginationFilter.supplierFilter
  );

  const handleSelectedSupplyOnChange = (event) => {
    const {
      target: { value },
    } = event;
    const newSupplyFilter =
      typeof value === "string" ? value.split(",") : value;
    setSelectedSuppliesFilter(newSupplyFilter);
  };

  const handleSelectedUnitOfMeasurementOnChange = (event) => {
    const {
      target: { value },
    } = event;
    const newUnitOfMeasurementFilter =
      typeof value === "string" ? value.split(",") : value;
    setSelectedUnitOfMeasurementsFilter(newUnitOfMeasurementFilter);
  };

  const handleSelectedSupplierOnChange = (event) => {
    const {
      target: { value },
    } = event;
    const newSupplierFilter =
      typeof value === "string" ? value.split(",") : value;
    setSelectedSuppliersFilter(newSupplierFilter);
  };

  const handleSupplyResetButtonOnClick = () => {
    setSelectedSuppliesFilter([]);
  };

  const handleUnitOfMeasurementResetButtonOnClick = () => {
    setSelectedUnitOfMeasurementsFilter([]);
  };

  const handleSupplierResetButtonOnClick = () => {
    setSelectedSuppliersFilter([]);
  };

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Slide direction="up" in={openModal} mountOnEnter unmountOnExit>
        <div className={styles["filter-transaction-modal"]}>
          <div className={styles["filter-transaction-modal__content"]}>
            <FilterTransactionSection
              paginationFilter={paginationFilter}
              supplies={supplies}
              unitOfMeasurements={unitOfMeasurements}
              suppliers={suppliers}
              selectedSuppliesFilter={selectedSuppliesFilter}
              selectedUnitOfMeasurementsFilter={
                selectedUnitOfMeasurementsFilter
              }
              selectedSuppliersFilter={selectedSuppliersFilter}
              selectedSupplyFilterOnChange={handleSelectedSupplyOnChange}
              selectedUnitOfMeasurementFilterOnChange={
                handleSelectedUnitOfMeasurementOnChange
              }
              selectedSupplierFilterOnChange={handleSelectedSupplierOnChange}
              supplyResetButtonOnClick={handleSupplyResetButtonOnClick}
              unitOfMeasurementResetButtonClick={
                handleUnitOfMeasurementResetButtonOnClick
              }
              supplierResetButtonClick={handleSupplierResetButtonOnClick}
              saveFilterOnClick={saveFilterOnClick}
            />
          </div>
        </div>
      </Slide>
    </Modal>
  );
};

export default FilterTransactionModal;

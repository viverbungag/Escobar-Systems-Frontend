import React from "react";
import styles from "./InactiveSupplierModal.module.scss";
import DataTable from "../../Shared/DataTable/DataTable";
import ActivateButton from "../../Shared/Buttons/ActivateButton/ActivateButton";
import { Modal, Slide, Backdrop } from "@mui/material";

const InactiveSupplierModal = ({
  headers,
  rows,
  sortOrder,
  sortedBy,
  pageNo,
  sortItems,
  pageSize,
  totalPages,
  openViewInactiveModal,
  handleItemCheckboxChange,
  handleCloseViewInactiveModal,
  isSelectAllChecked,
  handleSelectAllClick,
  handlePageNoChange,
  handlePageSizeChange,
  handleSortedByChange,
  handleSortOrderChange,
  handleActivateClick,
  handleOpenEditModal,
  selectedItemsCount,
}) => {
  return (
    <Modal
      open={openViewInactiveModal}
      onClose={handleCloseViewInactiveModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Slide
        direction="up"
        in={openViewInactiveModal}
        mountOnEnter
        unmountOnExit
      >
        <div className={styles["inactive-supplier-modal"]}>
          <div className={styles["inactive-supplier-modal__content"]}>
            <DataTable
              headers={headers}
              rows={rows}
              sortOrder={sortOrder}
              sortedBy={sortedBy}
              pageNo={pageNo}
              pageSize={pageSize}
              totalPages={totalPages}
              sortItems={sortItems}
              handleItemCheckboxChange={handleItemCheckboxChange}
              isSelectAllChecked={isSelectAllChecked}
              handleSelectAllClick={handleSelectAllClick}
              handlePageNoChange={handlePageNoChange}
              handlePageSizeChange={handlePageSizeChange}
              handleSortedByChange={handleSortedByChange}
              handleSortOrderChange={handleSortOrderChange}
              handleOpenEditModal={handleOpenEditModal}
              selectedItemsCount={selectedItemsCount}
              tableState="inactive"
            />
            <ActivateButton
              label="Activate"
              onClick={handleActivateClick}
              disableCondition={selectedItemsCount <= 0}
            />
          </div>
        </div>
      </Slide>
    </Modal>
  );
};

export default InactiveSupplierModal;

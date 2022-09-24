import React, { useState, useEffect } from "react";
import DataTable from "../../Shared/DataTable/DataTable";
import styles from "./SupplierPage.module.scss";
import WindowControlBar from "../../Shared/WindowControlBar/WindowControlBar";
import Navigation from "../../Shared/Navigation/Navigation";
import SaveButton from "../../Shared/Buttons/SaveButton/SaveButton";
import InactivateButton from "../../Shared/Buttons/InactivateButton/InactivateButton";
import InactiveItemsButton from "../../Shared/Buttons/InactiveItemsButton/InactiveItemsButton";
import AddSupplierModal from "../AddSupplierModal/AddSupplierModal";
import InactiveSupplierModal from "../InactiveSupplierModal/InactiveSupplierModal";
import EditSupplierModal from "../EditSupplierModal/EditSupplierModal";
import Toast from "../../Shared/Toast/Toast";
import Pagination from "src/model/Pagination";
import Rest from "../../../rest/Rest";
import Supplier from "../../../model/Supplier";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

const headers = [
  {
    id: "id",
    label: "Id",
    value: "supplierId",
  },
  {
    id: "name",
    label: "Name",
    value: "supplierName",
  },
  {
    id: "address",
    label: "Address",
    value: "supplierAddress",
  },
  {
    id: "contactNumber",
    label: "Contact Number",
    value: "supplierContactNumber",
  },
  {
    id: "contactPerson",
    label: "Contact Person",
    value: "supplierContactPerson",
  },
];

const sortItems = [
  {
    label: "Name",
  },
  {
    label: "Address",
  },
  {
    label: "Contact Number",
  },
  {
    label: "Contact Person",
  },
];

const SupplierPage = () => {
  const [activeSuppliers, setActiveSuppliers] = useState([]);
  const [inactiveSuppliers, setInactiveSuppliers] = useState([]);

  const [activeIsSelectAllChecked, setActiveIsSelectAllChecked] =
    useState(false);
  const [inactiveIsSelectAllChecked, setInactiveIsSelectAllChecked] =
    useState(false);

  const [activePagination, setActivePagination] = useState(
    new Pagination(0, 10, "None", true)
  );
  const [inactivePagination, setInactivePagination] = useState(
    new Pagination(0, 10, "None", true)
  );

  const [activeTotalPages, setActiveTotalPages] = useState(0);
  const [inactiveTotalPages, setInactiveTotalPages] = useState(0);

  const [selectedActiveItemsCount, setSelectedActiveItemsCount] = useState(0);
  const [selectedInactiveItemsCount, setSelectedInactiveItemsCount] =
    useState(0);

  const [addedSupplier, setAddedSupplier] = useState(
    new Supplier(1, "", "", "", "", true)
  );
  const [editedSupplier, setEditedSupplier] = useState(
    new Supplier(1, "", "", "", "", true)
  );

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openViewInactiveModal, setOpenViewInactiveModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const rest = new Rest();

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleOpenViewInactiveModal = () => setOpenViewInactiveModal(true);
  const handleCloseViewInactiveModal = () => setOpenViewInactiveModal(false);
  const handleOpenEditModal = (row, tableState) => {
    if (tableState === "active") {
      handleActiveItemCheckboxChange(row);
    }

    if (tableState === "inactive") {
      handleInactiveItemCheckboxChange(row);
    }
    setEditedSupplier(
      new Supplier(
        row.supplierId,
        row.supplierName,
        row.supplierAddress,
        row.supplierContactNumber,
        row.supplierContactPerson,
        row.isActive
      )
    );
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => setOpenEditModal(false);

  const resetToDefault = () => {
    setActiveIsSelectAllChecked(false);
    setSelectedActiveItemsCount(0);
    setInactiveIsSelectAllChecked(false);
    setSelectedInactiveItemsCount(0);
  };

  const handleNameAddChange = (event) => {
    setAddedSupplier(
      new Supplier(
        addedSupplier.supplierId,
        event.target.value,
        addedSupplier.supplierAddress,
        addedSupplier.supplierContactNumber,
        addedSupplier.supplierContactPerson,
        addedSupplier.isActive
      )
    );
  };

  const handleAddressAddChange = (event) => {
    setAddedSupplier(
      new Supplier(
        addedSupplier.supplierId,
        addedSupplier.supplierName,
        event.target.value,
        addedSupplier.supplierContactNumber,
        addedSupplier.supplierContactPerson,
        addedSupplier.isActive
      )
    );
  };

  const handleContactNumberAddChange = (event) => {
    setAddedSupplier(
      new Supplier(
        addedSupplier.supplierId,
        addedSupplier.supplierName,
        addedSupplier.supplierAddress,
        event.target.value,
        addedSupplier.supplierContactPerson,
        addedSupplier.isActive
      )
    );
  };

  const handleContactPersonAddChange = (event) => {
    setAddedSupplier(
      new Supplier(
        addedSupplier.supplierId,
        addedSupplier.supplierName,
        addedSupplier.supplierAddress,
        addedSupplier.supplierContactNumber,
        event.target.value,
        addedSupplier.isActive
      )
    );
  };

  const handleIsActiveAddChange = (event) => {
    setAddedSupplier(
      new Supplier(
        addedSupplier.supplierId,
        addedSupplier.supplierName,
        addedSupplier.supplierAddress,
        addedSupplier.supplierContactNumber,
        addedSupplier.supplierContactPerson,
        !addedSupplier.isActive
      )
    );
  };

  const handleNameEditChange = (event) => {
    setEditedSupplier(
      new Supplier(
        editedSupplier.supplierId,
        event.target.value,
        editedSupplier.supplierAddress,
        editedSupplier.supplierContactNumber,
        editedSupplier.supplierContactPerson,
        editedSupplier.isActive
      )
    );
  };

  const handleAddressEditChange = (event) => {
    setEditedSupplier(
      new Supplier(
        editedSupplier.supplierId,
        editedSupplier.supplierName,
        event.target.value,
        editedSupplier.supplierContactNumber,
        editedSupplier.supplierContactPerson,
        editedSupplier.isActive
      )
    );
  };

  const handleContactNumberEditChange = (event) => {
    setEditedSupplier(
      new Supplier(
        editedSupplier.supplierId,
        editedSupplier.supplierName,
        editedSupplier.supplierAddress,
        event.target.value,
        editedSupplier.supplierContactPerson,
        editedSupplier.isActive
      )
    );
  };

  const handleContactPersonEditChange = (event) => {
    setEditedSupplier(
      new Supplier(
        editedSupplier.supplierId,
        editedSupplier.supplierName,
        editedSupplier.supplierAddress,
        editedSupplier.supplierContactNumber,
        event.target.value,
        editedSupplier.isActive
      )
    );
  };

  const handleIsActiveEditChange = (event) => {
    setEditedSupplier(
      new Supplier(
        editedSupplier.supplierId,
        editedSupplier.supplierName,
        editedSupplier.supplierAddress,
        editedSupplier.supplierContactNumber,
        editedSupplier.supplierContactPerson,
        !editedSupplier.isActive
      )
    );
  };

  const handleAddModalButtonClicked = () => {
    addSupplier();
  };

  const handleActivePageSizeChange = (event) => {
    setActivePagination(
      new Pagination(
        activePagination.pageNo,
        parseInt(event.target.value, 10),
        activePagination.sortedBy,
        activePagination.isAscending
      )
    );
    resetToDefault();
  };

  const handleInactivePageSizeChange = (event) => {
    setInactivePagination(
      new Pagination(
        inactivePagination.pageNo,
        parseInt(event.target.value, 10),
        inactivePagination.sortedBy,
        inactivePagination.isAscending
      )
    );
    resetToDefault();
  };

  const handleActivePageNoChange = (event, newPageNo) => {
    setActivePagination(
      new Pagination(
        newPageNo,
        activePagination.pageSize,
        activePagination.sortedBy,
        activePagination.isAscending
      )
    );
    resetToDefault();
  };

  const handleInactivePageNoChange = (event, newPageNo) => {
    setInactivePagination(
      new Pagination(
        newPageNo,
        inactivePagination.pageSize,
        inactivePagination.sortedBy,
        inactivePagination.isAscending
      )
    );
    resetToDefault();
  };

  const handleActiveSortedByChange = (event) => {
    setActivePagination(
      new Pagination(
        activePagination.pageNo,
        activePagination.pageSize,
        event.target.value,
        activePagination.isAscending
      )
    );
    resetToDefault();
  };

  const handleInactiveSortedByChange = (event) => {
    setInactivePagination(
      new Pagination(
        inactivePagination.pageNo,
        inactivePagination.pageSize,
        event.target.value,
        inactivePagination.isAscending
      )
    );
    resetToDefault();
  };

  const handleActiveSortOrderChange = (event) => {
    setActivePagination(
      new Pagination(
        activePagination.pageNo,
        activePagination.pageSize,
        activePagination.sortedBy,
        event.target.value === "Ascending" ? true : false
      )
    );
    resetToDefault();
  };

  const handleInactiveSortOrderChange = (event) => {
    setInactivePagination(
      new Pagination(
        inactivePagination.pageNo,
        inactivePagination.pageSize,
        inactivePagination.sortedBy,
        event.target.value === "Ascending" ? true : false
      )
    );
    resetToDefault();
  };

  const handleActiveItemCheckboxChange = (item) => {
    let selectedItemsCount = 0;
    const newSupplier = activeSuppliers.map((supplier) => {
      if (supplier.supplierId === item.supplierId) {
        supplier.isSelected = !supplier.isSelected;
      }

      if (supplier.isSelected) {
        selectedItemsCount++;
      }
      return supplier;
    });

    if (selectedItemsCount === activeSuppliers.length) {
      setActiveIsSelectAllChecked(true);
    }

    if (selectedItemsCount === 0) {
      setActiveIsSelectAllChecked(false);
    }

    setSelectedActiveItemsCount(selectedItemsCount);
    setActiveSuppliers(newSupplier);
  };

  const handleInactiveItemCheckboxChange = (item) => {
    let selectedItemsCount = 0;
    const newSuppliers = inactiveSuppliers.map((supplier) => {
      if (supplier.supplierId === item.supplierId) {
        supplier.isSelected = !supplier.isSelected;
      }

      if (supplier.isSelected) {
        selectedItemsCount++;
      }
      return supplier;
    });

    if (selectedItemsCount === inactiveSuppliers.length) {
      setInactiveIsSelectAllChecked(true);
    }

    if (selectedItemsCount === 0) {
      setInactiveIsSelectAllChecked(false);
    }

    setSelectedInactiveItemsCount(selectedItemsCount);
    setInactiveSuppliers(newSuppliers);
  };

  const handleActiveSelectAllClick = () => {
    let selectedItemsCount = 0;
    const newSuppliers = activeSuppliers.map((supplier) => {
      if (
        (selectedActiveItemsCount > 0 &&
          selectedActiveItemsCount < activeSuppliers.length) ||
        selectedActiveItemsCount === 0
      ) {
        supplier.isSelected = true;
      } else {
        supplier.isSelected = false;
      }

      if (supplier.isSelected) {
        selectedItemsCount++;
      }

      return supplier;
    });

    setSelectedActiveItemsCount(selectedItemsCount);

    if (
      activeSuppliers.length > 0 &&
      selectedActiveItemsCount === activeSuppliers.length
    ) {
      setActiveIsSelectAllChecked(false);
    } else {
      setActiveIsSelectAllChecked(true);
    }

    setActiveSuppliers(newSuppliers);
  };

  const handleInactiveSelectAllClick = () => {
    let selectedItemsCount = 0;
    const newSuppliers = inactiveSuppliers.map((supplier) => {
      if (
        (selectedInactiveItemsCount > 0 &&
          selectedInactiveItemsCount < inactiveSuppliers.length) ||
        selectedInactiveItemsCount === 0
      ) {
        supplier.isSelected = true;
      } else {
        supplier.isSelected = false;
      }

      if (supplier.isSelected) {
        selectedItemsCount++;
      }

      return supplier;
    });

    setSelectedInactiveItemsCount(selectedItemsCount);

    if (
      inactiveSuppliers.length > 0 &&
      selectedInactiveItemsCount === inactiveSuppliers.length
    ) {
      setInactiveIsSelectAllChecked(false);
    } else {
      setInactiveIsSelectAllChecked(true);
    }

    setInactiveSuppliers(newSuppliers);
  };

  const handleEditModalButtonClicked = () => {
    updateSupplier();
  };

  const handleActiveSuppliersLoad = (contents) => {
    setActiveSuppliers(
      contents.map((supplier) => {
        return {
          ...supplier,
          isSelected: false,
        };
      })
    );
  };

  const handleActiveTotalPagesLoad = (data) => {
    setActiveTotalPages(data);
  };

  const getAllActiveSuppliers = () => {
    rest.getWithPagination(
      `${INITIAL_URL}/supplier/active`,
      activePagination.tojson(),
      handleActiveSuppliersLoad,
      handleActiveTotalPagesLoad
    );
  };

  const handleInactiveSuppliersLoad = (contents) => {
    setInactiveSuppliers(
      contents.map((supplier) => {
        return {
          ...supplier,
          isSelected: false,
        };
      })
    );
  };

  const handleInactiveTotalPagesLoad = (data) => {
    setInactiveTotalPages(data);
  };

  const getAllInactiveSuppliers = () => {
    rest.getWithPagination(
      `${INITIAL_URL}/supplier/inactive`,
      inactivePagination.tojson(),
      handleInactiveSuppliersLoad,
      handleInactiveTotalPagesLoad
    );
  };

  const loadAllSuppliers = () => {
    getAllActiveSuppliers();
    getAllInactiveSuppliers();
  };

  const addSuccessAction = () => {
    loadAllSuppliers();
    setOpenAddModal(false);
    setAddedSupplier(new Supplier(1, "", "", "", "", true));
    resetToDefault();
  };

  const addSupplier = () => {
    rest.add(
      `${INITIAL_URL}/supplier/add`,
      addedSupplier.toJson(),
      addSuccessAction,
      `Successully added ${addedSupplier.supplierName}`
    );
  };

  const updateSuccessAction = () => {
    loadAllSuppliers();
    setOpenEditModal(false);
    resetToDefault();
  };

  const updateSupplier = () => {
    rest.update(
      `${INITIAL_URL}/supplier/update/${editedSupplier.supplierId}`,
      editedSupplier.toJson(),
      updateSuccessAction,
      `Successully updated Supplier ${editedSupplier.supplierId}`
    );
  };

  const handleActivateClick = () => {
    activateSupplier();
    resetToDefault();
  };

  const handleInactivateClick = () => {
    inactivateSupplier();
    resetToDefault();
  };

  const activateSupplier = () => {
    const body = {
      supplierListDto: inactiveSuppliers.filter(
        (supplier) => supplier.isSelected
      ),
    };
    rest.activate(
      `${INITIAL_URL}/supplier/activate`,
      body,
      loadAllSuppliers,
      `Successully activated the selected Suppliers`
    );
  };

  const inactivateSupplier = () => {
    const body = {
      supplierListDto: activeSuppliers.filter(
        (supplier) => supplier.isSelected
      ),
    };
    rest.activate(
      `${INITIAL_URL}/supplier/inactivate`,
      body,
      loadAllSuppliers,
      `Successully inactivated the selected Suppliers`
    );
  };

  useEffect(() => {
    loadAllSuppliers();
  }, [activePagination, inactivePagination]);

  return (
    <div className={styles["supplier-page"]}>
      <Toast />
      <AddSupplierModal
        name={addedSupplier.supplierName}
        isActiveAdd={addedSupplier.isActive}
        address={addedSupplier.supplierAddress}
        contactNumber={addedSupplier.supplierContactNumber}
        contactPerson={addedSupplier.supplierContactPerson}
        nameOnChange={handleNameAddChange}
        addressOnChange={handleAddressAddChange}
        contactNumberOnChange={handleContactNumberAddChange}
        contactPersonOnChange={handleContactPersonAddChange}
        onClickAddButton={handleAddModalButtonClicked}
        openAddModal={openAddModal}
        handleCloseAddModal={handleCloseAddModal}
        handleIsActiveAddChange={handleIsActiveAddChange}
      />
      <InactiveSupplierModal
        headers={headers}
        rows={inactiveSuppliers}
        sortOrder={inactivePagination.isAscending ? "Ascending" : "Descending"}
        sortedBy={inactivePagination.sortedBy}
        pageNo={inactivePagination.pageNo}
        pageSize={inactivePagination.pageSize}
        totalPages={inactiveTotalPages}
        sortItems={sortItems}
        handleItemCheckboxChange={handleInactiveItemCheckboxChange}
        isSelectAllChecked={inactiveIsSelectAllChecked}
        handleSelectAllClick={handleInactiveSelectAllClick}
        handlePageNoChange={handleInactivePageNoChange}
        handlePageSizeChange={handleInactivePageSizeChange}
        handleSortedByChange={handleInactiveSortedByChange}
        handleSortOrderChange={handleInactiveSortOrderChange}
        handleActivateClick={handleActivateClick}
        handleOpenEditModal={handleOpenEditModal}
        selectedItemsCount={selectedInactiveItemsCount}
        openViewInactiveModal={openViewInactiveModal}
        handleCloseViewInactiveModal={handleCloseViewInactiveModal}
      />

      <EditSupplierModal
        selectedEditItem={editedSupplier}
        nameEdit={editedSupplier.supplierName}
        address={editedSupplier.supplierAddress}
        contactNumber={editedSupplier.supplierContactNumber}
        contactPerson={editedSupplier.supplierContactPerson}
        isActiveEdit={editedSupplier.isActive}
        handleNameEditChange={handleNameEditChange}
        addressOnChange={handleAddressEditChange}
        contactNumberOnChange={handleContactNumberEditChange}
        contactPersonOnChange={handleContactPersonEditChange}
        handleIsActiveEditChange={handleIsActiveEditChange}
        handleEditModalButtonClicked={handleEditModalButtonClicked}
        openEditModal={openEditModal}
        handleCloseEditModal={handleCloseEditModal}
      />

      <section className={styles["supplier-page__upper-section"]}>
        <WindowControlBar />
      </section>

      <section className={styles["supplier-page__lower-section"]}>
        <Navigation page="supplier" />
        <section className={styles["supplier-page__main-section"]}>
          <section className={styles["supplier-page__main-top-section"]}>
            <InactivateButton
              label="Inactivate"
              onClick={handleInactivateClick}
              disableCondition={selectedActiveItemsCount <= 0}
            />
            <SaveButton label="Add Supplier" onClick={handleOpenAddModal} />
          </section>
          <section className={styles["supplier-page__main-bottom-section"]}>
            <DataTable
              headers={headers}
              rows={activeSuppliers}
              sortOrder={
                activePagination.isAscending ? "Ascending" : "Descending"
              }
              sortedBy={activePagination.sortedBy}
              pageNo={activePagination.pageNo}
              pageSize={activePagination.pageSize}
              totalPages={activeTotalPages}
              sortItems={sortItems}
              tableState="active"
              isSelectAllChecked={activeIsSelectAllChecked}
              handleItemCheckboxChange={handleActiveItemCheckboxChange}
              handleSelectAllClick={handleActiveSelectAllClick}
              handlePageNoChange={handleActivePageNoChange}
              handlePageSizeChange={handleActivePageSizeChange}
              handleSortedByChange={handleActiveSortedByChange}
              handleSortOrderChange={handleActiveSortOrderChange}
              handleOpenEditModal={handleOpenEditModal}
              selectedItemsCount={selectedActiveItemsCount}
            />
            <div className={styles["supplier-page__view-inactive-items-buton"]}>
              <InactiveItemsButton
                label="View Inactive Suppliers"
                onClick={handleOpenViewInactiveModal}
              />
            </div>
          </section>
        </section>
      </section>
    </div>
  );
};

export default SupplierPage;

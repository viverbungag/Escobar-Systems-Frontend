import React, { useState, useEffect } from "react";
import DataTable from "../../Shared/DataTable/DataTable";
import styles from "./SupplyPage.module.scss";
import WindowControlBar from "../../Shared/WindowControlBar/WindowControlBar";
import Navigation from "../../Shared/Navigation/Navigation";
import SaveButton from "../../Shared/Buttons/SaveButton/SaveButton";
import InactivateButton from "../../Shared/Buttons/InactivateButton/InactivateButton";
import InactiveItemsButton from "../../Shared/Buttons/InactiveItemsButton/InactiveItemsButton";
import AddSupplyModal from "../AddSupplyModal/AddSupplyModal";
import InactiveSupplyModal from "../InactiveSupplyModal/InactiveSupplyModal";
import EditSupplyModal from "../EditSupplyModal/EditSupplyModal";
import Toast from "../../Shared/Toast/Toast";
import Pagination from "src/model/Pagination";
import Rest from "../../../rest/Rest";
import Supply from "../../../model/Supply";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

const headers = [
  {
    id: "id",
    label: "Id",
    value: "supplyId",
  },
  {
    id: "name",
    label: "Name",
    value: "supplyName",
  },
  {
    id: "quantity",
    label: "Quantity",
    value: "supplyQuantity",
  },
  {
    id: "minimumQuantity",
    label: "Minimum Quantity",
    value: "minimumQuantity",
  },
  {
    id: "inMinimumQuantity",
    label: "In Minimum Quantity?",
    value: "inMinimumQuantity",
  },
  {
    id: "supplier",
    label: "Supplier",
    value: "supplierName",
  },
  {
    id: "unitOfMeasurement",
    label: "Unit of Measurement",
    value: "unitOfMeasurementName",
  },
  {
    id: "supplyCategory",
    label: "Supply Category",
    value: "supplyCategoryName",
  },
];

const sortItems = [
  {
    label: "Name",
  },
  {
    label: "Quantity",
  },
  {
    label: "Minimum Quantity",
  },
  {
    label: "Supplier",
  },
  {
    label: "Unit of Measurement",
  },
  {
    label: "Supply Category",
  },
];

const SupplyPage = () => {
  const [activeSupplies, setActiveSupplies] = useState([]);
  const [inactiveSupplies, setInactiveSupplies] = useState([]);

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

  const [addedSupply, setAddedSupply] = useState(
    new Supply(1, "", 0, "", false, "", "", "", true)
  );
  const [editedSupply, setEditedSupply] = useState(
    new Supply(1, "", 0, "", false, "", "", "", true)
  );

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openViewInactiveModal, setOpenViewInactiveModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [activeSuppliers, setActiveSuppliers] = useState([]);
  const [activeUnitOfMeasurements, setActiveUnitOfMeasurements] = useState([]);
  const [activeSupplyCategories, setActiveSupplyCategories] = useState([]);

  const rest = new Rest();

  const handleOpenAddModal = () => {
    setAddedSupply(
      new Supply(
        1,
        "",
        0,
        "",
        true,
        activeSuppliers[0],
        activeUnitOfMeasurements[0],
        activeSupplyCategories[0],
        true
      )
    );

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
    setEditedSupply(
      new Supply(
        row.supplyId,
        row.supplyName,
        row.supplyQuantity,
        row.minimumQuantity,
        row.inMinimumQuantity,
        row.supplierName,
        row.unitOfMeasurementName,
        row.supplyCategoryName,
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
    setAddedSupply(
      new Supply(
        addedSupply.supplyId,
        event.target.value,
        addedSupply.supplyQuantity,
        addedSupply.minimumQuantity,
        addedSupply.inMinimumQuantity,
        addedSupply.supplierName,
        addedSupply.unitOfMeasurementName,
        addedSupply.supplyCategoryName,
        addedSupply.isActive
      )
    );
  };

  const handleMinimumQuantityAddChange = (event) => {
    setAddedSupply(
      new Supply(
        addedSupply.supplyId,
        addedSupply.supplyName,
        addedSupply.supplyQuantity,
        event.target.value,
        addedSupply.inMinimumQuantity,
        addedSupply.supplierName,
        addedSupply.unitOfMeasurementName,
        addedSupply.supplyCategoryName,
        addedSupply.isActive
      )
    );
  };

  const handleSupplierAddChange = (event) => {
    setAddedSupply(
      new Supply(
        addedSupply.supplyId,
        addedSupply.supplyName,
        addedSupply.supplyQuantity,
        addedSupply.minimumQuantity,
        addedSupply.inMinimumQuantity,
        event.target.value,
        addedSupply.unitOfMeasurementName,
        addedSupply.supplyCategoryName,
        addedSupply.isActive
      )
    );
  };

  const handleUnitOfMeasurementAddChange = (event) => {
    setAddedSupply(
      new Supply(
        addedSupply.supplyId,
        addedSupply.supplyName,
        addedSupply.supplyQuantity,
        addedSupply.minimumQuantity,
        addedSupply.inMinimumQuantity,
        addedSupply.supplierName,
        event.target.value,
        addedSupply.supplyCategoryName,
        addedSupply.isActive
      )
    );
  };

  const handleSupplyCategoryAddChange = (event) => {
    setAddedSupply(
      new Supply(
        addedSupply.supplyId,
        addedSupply.supplyName,
        addedSupply.supplyQuantity,
        addedSupply.minimumQuantity,
        addedSupply.inMinimumQuantity,
        addedSupply.supplierName,
        addedSupply.unitOfMeasurementName,
        event.target.value,
        addedSupply.isActive
      )
    );
  };

  const handleIsActiveAddChange = (event) => {
    setAddedSupply(
      new Supply(
        addedSupply.supplyId,
        addedSupply.supplyName,
        addedSupply.supplyQuantity,
        addedSupply.minimumQuantity,
        addedSupply.inMinimumQuantity,
        addedSupply.supplierName,
        addedSupply.unitOfMeasurementName,
        addedSupply.supplyCategoryName,
        !addedSupply.isActive
      )
    );
  };

  const handleNameEditChange = (event) => {
    setEditedSupply(
      new Supply(
        editedSupply.supplyId,
        event.target.value,
        editedSupply.supplyQuantity,
        editedSupply.minimumQuantity,
        editedSupply.inMinimumQuantity,
        editedSupply.supplierName,
        editedSupply.unitOfMeasurementName,
        editedSupply.supplyCategoryName,
        editedSupply.isActive
      )
    );
  };

  const handleMinimumQuantityEditChange = (event) => {
    setEditedSupply(
      new Supply(
        editedSupply.supplyId,
        editedSupply.supplyName,
        editedSupply.supplyQuantity,
        event.target.value,
        editedSupply.inMinimumQuantity,
        editedSupply.supplierName,
        editedSupply.unitOfMeasurementName,
        editedSupply.supplyCategoryName,
        editedSupply.isActive
      )
    );
  };

  const handleSupplierEditChange = (event) => {
    setEditedSupply(
      new Supply(
        editedSupply.supplyId,
        editedSupply.supplyName,
        editedSupply.supplyQuantity,
        editedSupply.minimumQuantity,
        editedSupply.inMinimumQuantity,
        event.target.value,
        editedSupply.unitOfMeasurementName,
        editedSupply.supplyCategoryName,
        editedSupply.isActive
      )
    );
  };

  const handleUnitOfMeasurementEditChange = (event) => {
    setEditedSupply(
      new Supply(
        editedSupply.supplyId,
        editedSupply.supplyName,
        editedSupply.supplyQuantity,
        editedSupply.minimumQuantity,
        editedSupply.inMinimumQuantity,
        editedSupply.supplierName,
        event.target.value,
        editedSupply.supplyCategoryName,
        editedSupply.isActive
      )
    );
  };

  const handleSupplyCategoryEditChange = (event) => {
    setEditedSupply(
      new Supply(
        editedSupply.supplyId,
        editedSupply.supplyName,
        editedSupply.supplyQuantity,
        editedSupply.minimumQuantity,
        editedSupply.inMinimumQuantity,
        editedSupply.supplierName,
        editedSupply.unitOfMeasurementName,
        event.target.value,
        editedSupply.isActive
      )
    );
  };

  const handleIsActiveEditChange = (event) => {
    setEditedSupply(
      new Supply(
        editedSupply.supplyId,
        editedSupply.supplyName,
        editedSupply.supplyQuantity,
        editedSupply.minimumQuantity,
        editedSupply.inMinimumQuantity,
        editedSupply.supplierName,
        editedSupply.unitOfMeasurementName,
        editedSupply.supplyCategoryName,
        !editedSupply.isActive
      )
    );
  };

  const handleAddModalButtonClicked = () => {
    addSupply();
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
    const newSupplies = activeSupplies.map((supply) => {
      if (supply.supplyId === item.supplyId) {
        supply.isSelected = !supply.isSelected;
      }

      if (supply.isSelected) {
        selectedItemsCount++;
      }
      return supply;
    });

    if (selectedItemsCount === activeSupplies.length) {
      setActiveIsSelectAllChecked(true);
    }

    if (selectedItemsCount === 0) {
      setActiveIsSelectAllChecked(false);
    }

    setSelectedActiveItemsCount(selectedItemsCount);
    setActiveSupplies(newSupplies);
  };

  const handleInactiveItemCheckboxChange = (item) => {
    let selectedItemsCount = 0;
    const newSupplies = inactiveSupplies.map((supply) => {
      if (supply.supplyId === item.supplyId) {
        supply.isSelected = !supply.isSelected;
      }

      if (supply.isSelected) {
        selectedItemsCount++;
      }
      return supply;
    });

    if (selectedItemsCount === inactiveSupplies.length) {
      setInactiveIsSelectAllChecked(true);
    }

    if (selectedItemsCount === 0) {
      setInactiveIsSelectAllChecked(false);
    }

    setSelectedInactiveItemsCount(selectedItemsCount);
    setInactiveSupplies(newSupplies);
  };

  const handleActiveSelectAllClick = () => {
    let selectedItemsCount = 0;
    const newSupplies = activeSupplies.map((supply) => {
      if (
        (selectedActiveItemsCount > 0 &&
          selectedActiveItemsCount < activeSupplies.length) ||
        selectedActiveItemsCount === 0
      ) {
        supply.isSelected = true;
      } else {
        supply.isSelected = false;
      }

      if (supply.isSelected) {
        selectedItemsCount++;
      }

      return supply;
    });

    setSelectedActiveItemsCount(selectedItemsCount);

    if (
      activeSupplies.length > 0 &&
      selectedActiveItemsCount === activeSupplies.length
    ) {
      setActiveIsSelectAllChecked(false);
    } else {
      setActiveIsSelectAllChecked(true);
    }

    setActiveSupplies(newSupplies);
  };

  const handleInactiveSelectAllClick = () => {
    let selectedItemsCount = 0;
    const newSupplies = inactiveSupplies.map((supply) => {
      if (
        (selectedInactiveItemsCount > 0 &&
          selectedInactiveItemsCount < inactiveSupplies.length) ||
        selectedInactiveItemsCount === 0
      ) {
        supply.isSelected = true;
      } else {
        supply.isSelected = false;
      }

      if (supply.isSelected) {
        selectedItemsCount++;
      }

      return supply;
    });

    setSelectedInactiveItemsCount(selectedItemsCount);

    if (
      inactiveSupplies.length > 0 &&
      selectedInactiveItemsCount === inactiveSupplies.length
    ) {
      setInactiveIsSelectAllChecked(false);
    } else {
      setInactiveIsSelectAllChecked(true);
    }

    setInactiveSupplies(newSupplies);
  };

  const handleEditModalButtonClicked = () => {
    updateSupply();
  };

  const handleActiveSuppliesLoad = (contents) => {
    setActiveSupplies(
      contents.map((supply) => {
        return {
          ...supply,
          isSelected: false,
        };
      })
    );
  };

  const handleActiveTotalPagesLoad = (data) => {
    setActiveTotalPages(data);
  };

  const handleActiveSuppliersLoad = (data) => {
    setActiveSuppliers(data);
  };

  const getAllActiveSuppliers = () => {
    rest.get(`${INITIAL_URL}/supplier`, handleActiveSuppliersLoad);
  };

  const handleActiveSupplyCategoriesLoad = (data) => {
    setActiveSupplyCategories(data);
  };

  const getAllActiveSupplyCategories = () => {
    rest.get(
      `${INITIAL_URL}/supply-category`,
      handleActiveSupplyCategoriesLoad
    );
  };

  const handleActiveUnitOfMeasurement = (data) => {
    setActiveUnitOfMeasurements(data);
  };

  const getAllActiveUnitOfMeasurements = () => {
    rest.get(
      `${INITIAL_URL}/unit-of-measurement`,
      handleActiveUnitOfMeasurement
    );
  };

  const getAllActiveSupplies = () => {
    rest.getWithPagination(
      `${INITIAL_URL}/supply/active`,
      activePagination.tojson(),
      handleActiveSuppliesLoad,
      handleActiveTotalPagesLoad
    );
  };

  const handleInactiveSuppliesLoad = (contents) => {
    setInactiveSupplies(
      contents.map((supply) => {
        return {
          ...supply,
          isSelected: false,
        };
      })
    );
  };

  const handleInactiveTotalPagesLoad = (data) => {
    setInactiveTotalPages(data);
  };

  const getAllInactiveSupplies = () => {
    rest.getWithPagination(
      `${INITIAL_URL}/supply/inactive`,
      inactivePagination.tojson(),
      handleInactiveSuppliesLoad,
      handleInactiveTotalPagesLoad
    );
  };

  const loadAllSupplies = () => {
    getAllActiveSupplies();
    getAllInactiveSupplies();
  };

  const addSuccessAction = () => {
    loadAllSupplies();
    setOpenAddModal(false);
    setAddedSupply(new Supply(1, "", 0, 0, false, "", "", "", true));
    resetToDefault();
  };

  const addSupply = () => {
    rest.add(
      `${INITIAL_URL}/supply/add`,
      addedSupply.toJson(),
      addSuccessAction,
      `Successully added ${addedSupply.supplyName}`
    );
  };

  const updateSuccessAction = () => {
    loadAllSupplies();
    setOpenEditModal(false);
    resetToDefault();
  };

  const updateSupply = () => {
    rest.update(
      `${INITIAL_URL}/supply/update/${editedSupply.supplyId}`,
      editedSupply.toJson(),
      updateSuccessAction,
      `Successully updated Supply ${editedSupply.supplyId}`
    );
  };

  const handleActivateClick = () => {
    activateSupply();
    resetToDefault();
  };

  const handleInactivateClick = () => {
    inactivateSupply();
    resetToDefault();
  };

  const activateSupply = () => {
    const body = {
      supplyListDto: inactiveSupplies.filter((supply) => supply.isSelected),
    };
    rest.activate(
      `${INITIAL_URL}/supply/activate`,
      body,
      loadAllSupplies,
      `Successully activated the selected Supplies`
    );
  };

  const inactivateSupply = () => {
    const body = {
      supplyListDto: activeSupplies.filter((supply) => supply.isSelected),
    };
    rest.activate(
      `${INITIAL_URL}/supply/inactivate`,
      body,
      loadAllSupplies,
      `Successully inactivated the selected Supplies`
    );
  };

  useEffect(() => {
    loadAllSupplies();
    getAllActiveSuppliers();
    getAllActiveSupplyCategories();
    getAllActiveUnitOfMeasurements();
  }, [activePagination, inactivePagination]);

  return (
    <div className={styles["supply-page"]}>
      <Toast />
      <AddSupplyModal
        allSuppliers={activeSuppliers}
        allUnitOfMeasurements={activeUnitOfMeasurements}
        allSupplyCategories={activeSupplyCategories}
        name={addedSupply.supplyName}
        minimumQuantity={addedSupply.minimumQuantity}
        supplier={addedSupply.supplierName}
        unitOfMeasurement={addedSupply.unitOfMeasurementName}
        supplyCategory={addedSupply.supplyCategoryName}
        isActive={addedSupply.isActive}
        nameOnChange={handleNameAddChange}
        minimumQuantityOnChange={handleMinimumQuantityAddChange}
        supplierOnChange={handleSupplierAddChange}
        unitOfMeasurementOnChange={handleUnitOfMeasurementAddChange}
        supplyCategoryOnChange={handleSupplyCategoryAddChange}
        isActiveOnChange={handleIsActiveAddChange}
        onClickAddButton={handleAddModalButtonClicked}
        openAddModal={openAddModal}
        handleCloseAddModal={handleCloseAddModal}
      />
      <InactiveSupplyModal
        headers={headers}
        rows={inactiveSupplies}
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

      <EditSupplyModal
        allSuppliers={activeSuppliers}
        allUnitOfMeasurements={activeUnitOfMeasurements}
        allSupplyCategories={activeSupplyCategories}
        selectedEditItem={editedSupply}
        name={editedSupply.supplyName}
        quantity={editedSupply.supplyQuantity}
        minimumQuantity={editedSupply.minimumQuantity}
        inMinimumQuantity={editedSupply.inMinimumQuantity}
        supplier={editedSupply.supplierName}
        unitOfMeasurement={editedSupply.unitOfMeasurementName}
        supplyCategory={editedSupply.supplyCategoryName}
        isActive={editedSupply.isActive}
        nameOnChange={handleNameEditChange}
        minimumQuantityOnChange={handleMinimumQuantityEditChange}
        supplierOnChange={handleSupplierEditChange}
        unitOfMeasurementOnChange={handleUnitOfMeasurementEditChange}
        supplyCategoryOnChange={handleSupplyCategoryEditChange}
        isActiveOnChange={handleIsActiveEditChange}
        handleEditModalButtonClicked={handleEditModalButtonClicked}
        openEditModal={openEditModal}
        handleCloseEditModal={handleCloseEditModal}
      />

      <section className={styles["supply-page__upper-section"]}>
        <WindowControlBar />
      </section>

      <section className={styles["supply-page__lower-section"]}>
        <Navigation page="supply" />
        <section className={styles["supply-page__main-section"]}>
          <section className={styles["supply-page__main-top-section"]}>
            <InactivateButton
              label="Inactivate"
              onClick={handleInactivateClick}
              disableCondition={selectedActiveItemsCount <= 0}
            />
            <SaveButton label="Add Supply" onClick={handleOpenAddModal} />
          </section>
          <section className={styles["supply-page__main-bottom-section"]}>
            <DataTable
              headers={headers}
              rows={activeSupplies}
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
            <div className={styles["supply-page__view-inactive-items-buton"]}>
              <InactiveItemsButton
                label="View Inactive Supplies"
                onClick={handleOpenViewInactiveModal}
              />
            </div>
          </section>
        </section>
      </section>
    </div>
  );
};

export default SupplyPage;

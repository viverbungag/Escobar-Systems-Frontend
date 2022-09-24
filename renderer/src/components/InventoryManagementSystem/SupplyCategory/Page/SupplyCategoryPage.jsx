import React, { useState, useEffect } from "react";
import DataTable from "../../Shared/DataTable/DataTable";
import styles from "./SupplyCategoryPage.module.scss";
import WindowControlBar from "../../Shared/WindowControlBar/WindowControlBar";
import Navigation from "../../Shared/Navigation/Navigation";
import SaveButton from "../../Shared/Buttons/SaveButton/SaveButton";
import InactivateButton from "../../Shared/Buttons/InactivateButton/InactivateButton";
import InactiveItemsButton from "../../Shared/Buttons/InactiveItemsButton/InactiveItemsButton";
import AddSupplyCategoryModal from "../AddSupplyCategoryModal/AddSupplyCategoryModal";
import InactiveSupplyCategoryModal from "../InactiveSupplyCategoryModal/InactiveSupplyCategoryModal";
import EditSupplyCategoryModal from "../EditSupplyCategoryModal/EditSupplyCategoryModal";
import Toast from "../../Shared/Toast/Toast";
import Pagination from "src/model/Pagination";
import Rest from "../../../rest/Rest";
import SupplyCategory from "../../../model/SupplyCategory";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

const headers = [
  {
    id: "id",
    label: "Id",
    value: "supplyCategoryId",
  },
  {
    id: "name",
    label: "Name",
    value: "supplyCategoryName",
  },
];

const sortItems = [
  {
    label: "Name",
  },
];

const SupplyCategoryPage = () => {
  const [activeSupplyCategories, setActiveSupplyCategories] = useState([]);
  const [inactiveSupplyCategories, setInactiveSupplyCategories] = useState([]);

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

  const [addedSupplyCategory, setAddedSupplyCategory] = useState(
    new SupplyCategory(1, "", true)
  );
  const [editedSupplyCategory, setEditedSupplyCategory] = useState(
    new SupplyCategory(1, "", true)
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
    setEditedSupplyCategory(
      new SupplyCategory(
        row.supplyCategoryId,
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
    setAddedSupplyCategory(
      new SupplyCategory(
        addedSupplyCategory.supplyCategoryId,
        event.target.value,
        addedSupplyCategory.isActive
      )
    );
  };

  const handleIsActiveAddChange = (event) => {
    setAddedSupplyCategory(
      new SupplyCategory(
        addedSupplyCategory.supplyCategoryId,
        addedSupplyCategory.supplyCategoryName,
        !addedSupplyCategory.isActive
      )
    );
  };

  const handleNameEditChange = (event) => {
    setEditedSupplyCategory(
      new SupplyCategory(
        editedSupplyCategory.supplyCategoryId,
        event.target.value,
        editedSupplyCategory.isActive
      )
    );
  };

  const handleIsActiveEditChange = (event) => {
    setEditedSupplyCategory(
      new SupplyCategory(
        editedSupplyCategory.supplyCategoryId,
        editedSupplyCategory.supplyCategoryName,
        !editedSupplyCategory.isActive
      )
    );
  };

  const handleAddModalButtonClicked = () => {
    addSupplyCategory();
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
    const newSupplyCategories = activeSupplyCategories.map((supplyCategory) => {
      if (supplyCategory.supplyCategoryId === item.supplyCategoryId) {
        supplyCategory.isSelected = !supplyCategory.isSelected;
      }

      if (supplyCategory.isSelected) {
        selectedItemsCount++;
      }
      return supplyCategory;
    });

    if (selectedItemsCount === activeSupplyCategories.length) {
      setActiveIsSelectAllChecked(true);
    }

    if (selectedItemsCount === 0) {
      setActiveIsSelectAllChecked(false);
    }

    setSelectedActiveItemsCount(selectedItemsCount);
    setActiveSupplyCategories(newSupplyCategories);
  };

  const handleInactiveItemCheckboxChange = (item) => {
    let selectedItemsCount = 0;
    const newSupplyCategories = inactiveSupplyCategories.map(
      (supplyCategory) => {
        if (supplyCategory.supplyCategoryId === item.supplyCategoryId) {
          supplyCategory.isSelected = !supplyCategory.isSelected;
        }

        if (supplyCategory.isSelected) {
          selectedItemsCount++;
        }
        return supplyCategory;
      }
    );

    if (selectedItemsCount === inactiveSupplyCategories.length) {
      setInactiveIsSelectAllChecked(true);
    }

    if (selectedItemsCount === 0) {
      setInactiveIsSelectAllChecked(false);
    }

    setSelectedInactiveItemsCount(selectedItemsCount);
    setInactiveSupplyCategories(newSupplyCategories);
  };

  const handleActiveSelectAllClick = () => {
    let selectedItemsCount = 0;
    const newSupplyCategories = activeSupplyCategories.map((supplyCategory) => {
      if (
        (selectedActiveItemsCount > 0 &&
          selectedActiveItemsCount < activeSupplyCategories.length) ||
        selectedActiveItemsCount === 0
      ) {
        supplyCategory.isSelected = true;
      } else {
        supplyCategory.isSelected = false;
      }

      if (supplyCategory.isSelected) {
        selectedItemsCount++;
      }

      return supplyCategory;
    });

    setSelectedActiveItemsCount(selectedItemsCount);

    if (
      activeSupplyCategories.length > 0 &&
      selectedActiveItemsCount === activeSupplyCategories.length
    ) {
      setActiveIsSelectAllChecked(false);
    } else {
      setActiveIsSelectAllChecked(true);
    }

    setActiveSupplyCategories(newSupplyCategories);
  };

  const handleInactiveSelectAllClick = () => {
    let selectedItemsCount = 0;
    const newSupplyCategories = inactiveSupplyCategories.map(
      (supplyCategory) => {
        if (
          (selectedInactiveItemsCount > 0 &&
            selectedInactiveItemsCount < inactiveSupplyCategories.length) ||
          selectedInactiveItemsCount === 0
        ) {
          supplyCategory.isSelected = true;
        } else {
          supplyCategory.isSelected = false;
        }

        if (supplyCategory.isSelected) {
          selectedItemsCount++;
        }

        return supplyCategory;
      }
    );

    setSelectedInactiveItemsCount(selectedItemsCount);

    if (
      inactiveSupplyCategories.length > 0 &&
      selectedInactiveItemsCount === inactiveSupplyCategories.length
    ) {
      setInactiveIsSelectAllChecked(false);
    } else {
      setInactiveIsSelectAllChecked(true);
    }

    setInactiveSupplyCategories(newSupplyCategories);
  };

  const handleEditModalButtonClicked = () => {
    updateSupplyCategory();
  };

  const handleActiveSupplyCategoriesLoad = (contents) => {
    setActiveSupplyCategories(
      contents.map((supplyCategory) => {
        return {
          ...supplyCategory,
          isSelected: false,
        };
      })
    );
  };

  const handleActiveTotalPagesLoad = (data) => {
    setActiveTotalPages(data);
  };

  const getAllActiveSupplyCategories = () => {
    rest.getWithPagination(
      `${INITIAL_URL}/supply-category/active`,
      activePagination.tojson(),
      handleActiveSupplyCategoriesLoad,
      handleActiveTotalPagesLoad
    );
  };

  const handleInactiveSupplyCategoriesLoad = (contents) => {
    setInactiveSupplyCategories(
      contents.map((supplyCategory) => {
        return {
          ...supplyCategory,
          isSelected: false,
        };
      })
    );
  };

  const handleInactiveTotalPagesLoad = (data) => {
    setInactiveTotalPages(data);
  };

  const getAllInactiveSupplyCategories = () => {
    rest.getWithPagination(
      `${INITIAL_URL}/supply-category/inactive`,
      inactivePagination.tojson(),
      handleInactiveSupplyCategoriesLoad,
      handleInactiveTotalPagesLoad
    );
  };

  const loadAllSupplyCategories = () => {
    getAllActiveSupplyCategories();
    getAllInactiveSupplyCategories();
  };

  const addSuccessAction = () => {
    loadAllSupplyCategories();
    setOpenAddModal(false);
    setAddedSupplyCategory(new SupplyCategory(1, "", true));
    resetToDefault();
  };

  const addSupplyCategory = () => {
    rest.add(
      `${INITIAL_URL}/supply-category/add`,
      addedSupplyCategory.toJson(),
      addSuccessAction,
      `Successully added ${addedSupplyCategory.supplyCategoryName}`
    );
  };

  const updateSuccessAction = () => {
    loadAllSupplyCategories();
    setOpenEditModal(false);
    resetToDefault();
  };

  const updateSupplyCategory = () => {
    rest.update(
      `${INITIAL_URL}/supply-category/update/${editedSupplyCategory.supplyCategoryId}`,
      editedSupplyCategory.toJson(),
      updateSuccessAction,
      `Successully updated Supply Category ${editedSupplyCategory.supplyCategoryId}`
    );
  };

  const handleActivateClick = () => {
    activateSupplyCategory();
    resetToDefault();
  };

  const handleInactivateClick = () => {
    inactivateSupplyCategory();
    resetToDefault();
  };

  const activateSupplyCategory = () => {
    const body = {
      supplyCategoryListDto: inactiveSupplyCategories.filter(
        (supplyCategories) => supplyCategories.isSelected
      ),
    };
    rest.activate(
      `${INITIAL_URL}/supply-category/activate`,
      body,
      loadAllSupplyCategories,
      `Successully activated the selected Supply Categories`
    );
  };

  const inactivateSupplyCategory = () => {
    const body = {
      supplyCategoryListDto: activeSupplyCategories.filter(
        (supplyCategories) => supplyCategories.isSelected
      ),
    };
    rest.activate(
      `${INITIAL_URL}/supply-category/inactivate`,
      body,
      loadAllSupplyCategories,
      `Successully inactivated the selected Supply Categories`
    );
  };

  useEffect(() => {
    loadAllSupplyCategories();
  }, [activePagination, inactivePagination]);

  return (
    <div className={styles["supply-category-page"]}>
      <Toast />
      <AddSupplyCategoryModal
        name={addedSupplyCategory.supplyCategoryName}
        isActiveAdd={addedSupplyCategory.isActive}
        nameOnChange={handleNameAddChange}
        onClickAddButton={handleAddModalButtonClicked}
        openAddModal={openAddModal}
        handleCloseAddModal={handleCloseAddModal}
        handleIsActiveAddChange={handleIsActiveAddChange}
      />
      <InactiveSupplyCategoryModal
        headers={headers}
        rows={inactiveSupplyCategories}
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

      <EditSupplyCategoryModal
        selectedEditItem={editedSupplyCategory}
        nameEdit={editedSupplyCategory.supplyCategoryName}
        isActiveEdit={editedSupplyCategory.isActive}
        handleNameEditChange={handleNameEditChange}
        handleIsActiveEditChange={handleIsActiveEditChange}
        handleEditModalButtonClicked={handleEditModalButtonClicked}
        openEditModal={openEditModal}
        handleCloseEditModal={handleCloseEditModal}
      />

      <section className={styles["supply-category-page__upper-section"]}>
        <WindowControlBar />
      </section>

      <section className={styles["supply-category-page__lower-section"]}>
        <Navigation page="supply-category" />
        <section className={styles["supply-category-page__main-section"]}>
          <section className={styles["supply-category-page__main-top-section"]}>
            <InactivateButton
              label="Inactivate"
              onClick={handleInactivateClick}
              disableCondition={selectedActiveItemsCount <= 0}
            />
            <SaveButton
              label="Add Supply Category"
              onClick={handleOpenAddModal}
            />
          </section>
          <section
            className={styles["supply-category-page__main-bottom-section"]}
          >
            <DataTable
              headers={headers}
              rows={activeSupplyCategories}
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
            <div
              className={
                styles["supply-category-page__view-inactive-items-buton"]
              }
            >
              <InactiveItemsButton
                label="View Inactive Supply Categories"
                onClick={handleOpenViewInactiveModal}
              />
            </div>
          </section>
        </section>
      </section>
    </div>
  );
};

export default SupplyCategoryPage;

import { useState, useEffect } from "react";
import DataTable from "../../Shared/DataTable/DataTable";
import styles from "./MenuCategoryPage.module.scss";
import WindowControlBar from "../../../components/Shared/WindowControlBar/WindowControlBar";
import Navigation from "../../Shared/Navigation/Navigation";
import SaveButton from "../../Shared/Buttons/SaveButton/SaveButton";
import InactivateButton from "../../Shared/Buttons/InactivateButton/InactivateButton";
import InactiveItemsButton from "../../Shared/Buttons/InactiveItemsButton/InactiveItemsButton";
import AddMenuCategoryModal from "../AddMenuCategoryModal/AddMenuCategoryModal";
import InactiveMenuCategoryModal from "../InactiveMenuCategoryModal/InactiveMenuCategoryModal";
import EditMenuCategoryModal from "../EditMenuCategoryModal/EditMenuCategoryModal";
import Toast from "../../Shared/Toast/Toast";
import Pagination from "../../../model/Pagination";
import Rest from "../../../rest/Rest";
import MenuCategory from "src/model/MenuCategory";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

const headers = [
  {
    id: "id",
    label: "Id",
    value: "menuCategoryId",
  },
  {
    id: "name",
    label: "Name",
    value: "menuCategoryName",
  },
];

const sortItems = [
  {
    label: "Name",
  },
];

const MenuCategoryPage = () => {
  const [activeMenuCategories, setActiveMenuCategories] = useState([]);
  const [inactiveMenuCategories, setInactiveMenuCategories] = useState([]);

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

  const [addedMenuCategory, setAddedMenuCategory] = useState(
    new MenuCategory(1, "", true)
  );
  const [editedMenuCategory, setEditedMenuCategory] = useState(
    new MenuCategory(1, "", true)
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
    setEditedMenuCategory(
      new MenuCategory(row.menuCategoryId, row.menuCategoryName, row.isActive)
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
    setAddedMenuCategory(
      new MenuCategory(
        addedMenuCategory.menuCategoryId,
        event.target.value,
        addedMenuCategory.isActive
      )
    );
  };

  const handleIsActiveAddChange = (event) => {
    setAddedMenuCategory(
      new MenuCategory(
        addedMenuCategory.menuCategoryId,
        addedMenuCategory.menuCategoryName,
        !addedMenuCategory.isActive
      )
    );
  };

  const handleNameEditChange = (event) => {
    setEditedMenuCategory(
      new MenuCategory(
        editedMenuCategory.menuCategoryId,
        event.target.value,
        editedMenuCategory.isActive
      )
    );
  };

  const handleIsActiveEditChange = (event) => {
    setEditedMenuCategory(
      new MenuCategory(
        editedMenuCategory.menuCategoryId,
        editedMenuCategory.menuCategoryName,
        !editedMenuCategory.isActive
      )
    );
  };

  const handleAddModalButtonClicked = () => {
    addMenuCategory();
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
    const newMenuCategories = activeMenuCategories.map((menuCategory) => {
      if (menuCategory.menuCategoryId === item.menuCategoryId) {
        menuCategory.isSelected = !menuCategory.isSelected;
      }

      if (menuCategory.isSelected) {
        selectedItemsCount++;
      }
      return menuCategory;
    });

    if (selectedItemsCount === activeMenuCategories.length) {
      setActiveIsSelectAllChecked(true);
    }

    if (selectedItemsCount === 0) {
      setActiveIsSelectAllChecked(false);
    }

    setSelectedActiveItemsCount(selectedItemsCount);
    setActiveMenuCategories(newMenuCategories);
  };

  const handleInactiveItemCheckboxChange = (item) => {
    let selectedItemsCount = 0;
    const newMenuCategories = inactiveMenuCategories.map((menuCategory) => {
      if (menuCategory.menuCategoryId === item.menuCategoryId) {
        menuCategory.isSelected = !menuCategory.isSelected;
      }

      if (menuCategory.isSelected) {
        selectedItemsCount++;
      }
      return menuCategory;
    });

    if (selectedItemsCount === inactiveMenuCategories.length) {
      setInactiveIsSelectAllChecked(true);
    }

    if (selectedItemsCount === 0) {
      setInactiveIsSelectAllChecked(false);
    }

    setSelectedInactiveItemsCount(selectedItemsCount);
    setInactiveMenuCategories(newMenuCategories);
  };

  const handleActiveSelectAllClick = () => {
    let selectedItemsCount = 0;
    const newMenuCategories = activeMenuCategories.map((menuCategory) => {
      if (
        (selectedActiveItemsCount > 0 &&
          selectedActiveItemsCount < activeMenuCategories.length) ||
        selectedActiveItemsCount === 0
      ) {
        menuCategory.isSelected = true;
      } else {
        menuCategory.isSelected = false;
      }

      if (menuCategory.isSelected) {
        selectedItemsCount++;
      }

      return menuCategory;
    });

    setSelectedActiveItemsCount(selectedItemsCount);

    if (
      activeMenuCategories.length > 0 &&
      selectedActiveItemsCount === activeMenuCategories.length
    ) {
      setActiveIsSelectAllChecked(false);
    } else {
      setActiveIsSelectAllChecked(true);
    }

    setActiveMenuCategories(newMenuCategories);
  };

  const handleInactiveSelectAllClick = () => {
    let selectedItemsCount = 0;
    const newMenuCategories = inactiveMenuCategories.map((menuCategory) => {
      if (
        (selectedInactiveItemsCount > 0 &&
          selectedInactiveItemsCount < inactiveMenuCategories.length) ||
        selectedInactiveItemsCount === 0
      ) {
        menuCategory.isSelected = true;
      } else {
        menuCategory.isSelected = false;
      }

      if (menuCategory.isSelected) {
        selectedItemsCount++;
      }

      return menuCategory;
    });

    setSelectedInactiveItemsCount(selectedItemsCount);

    if (
      inactiveMenuCategories.length > 0 &&
      selectedInactiveItemsCount === inactiveMenuCategories.length
    ) {
      setInactiveIsSelectAllChecked(false);
    } else {
      setInactiveIsSelectAllChecked(true);
    }

    setInactiveMenuCategories(newMenuCategories);
  };

  const handleEditModalButtonClicked = () => {
    updateMenuCategory();
    // setOpenEditModal(false);
    // resetToDefault();
  };

  const handleActiveMenuCategoriesLoad = (contents) => {
    setActiveMenuCategories(
      contents.map((menuCategory) => {
        return {
          ...menuCategory,
          isSelected: false,
        };
      })
    );
  };

  const handleActiveTotalPagesLoad = (data) => {
    setActiveTotalPages(data);
  };

  const getAllActiveMenuCategories = () => {
    rest.getWithPagination(
      `${INITIAL_URL}/menu-category/active`,
      activePagination.tojson(),
      handleActiveMenuCategoriesLoad,
      handleActiveTotalPagesLoad
    );
  };

  const handleInactiveMenuCategoriesLoad = (contents) => {
    setInactiveMenuCategories(
      contents.map((menuCategory) => {
        return {
          ...menuCategory,
          isSelected: false,
        };
      })
    );
  };

  const handleInactiveTotalPagesLoad = (data) => {
    setInactiveTotalPages(data);
  };

  const getAllInactiveMenuCategories = () => {
    rest.getWithPagination(
      `${INITIAL_URL}/menu-category/inactive`,
      inactivePagination.tojson(),
      handleInactiveMenuCategoriesLoad,
      handleInactiveTotalPagesLoad
    );
  };

  const loadAllMenuCategories = () => {
    getAllActiveMenuCategories();
    getAllInactiveMenuCategories();
  };

  const addSuccessAction = () => {
    loadAllMenuCategories();
    setOpenAddModal(false);
    setAddedMenuCategory(new MenuCategory(1, "", true));
    resetToDefault();
  };

  const addMenuCategory = () => {
    rest.add(
      `${INITIAL_URL}/menu-category/add`,
      addedMenuCategory.toJson(),
      addSuccessAction,
      `Successully added ${addedMenuCategory.menuCategoryName}`
    );
  };

  const updateSuccessAction = () => {
    loadAllMenuCategories();
    setOpenEditModal(false);
    resetToDefault();
  };

  const updateMenuCategory = () => {
    rest.update(
      `${INITIAL_URL}/menu-category/update/${editedMenuCategory.menuCategoryId}`,
      editedMenuCategory.toJson(),
      updateSuccessAction,
      `Successully updated Menu Category ${editedMenuCategory.menuCategoryId}`
    );
  };

  const handleActivateClick = () => {
    activateMenuCategory();
    resetToDefault();
  };

  const handleInactivateClick = () => {
    inactivateMenuCategory();
    resetToDefault();
  };

  const activateMenuCategory = () => {
    const body = {
      menuCategoryListDto: inactiveMenuCategories.filter(
        (menuCategories) => menuCategories.isSelected
      ),
    };
    rest.activate(
      `${INITIAL_URL}/menu-category/activate`,
      body,
      loadAllMenuCategories,
      `Successully activated the selected Menu Categories`
    );
  };

  const inactivateMenuCategory = () => {
    const body = {
      menuCategoryListDto: activeMenuCategories.filter(
        (menuCategories) => menuCategories.isSelected
      ),
    };

    rest.inactivate(
      `${INITIAL_URL}/menu-category/inactivate`,
      body,
      loadAllMenuCategories,
      `Successully inactivated the selected Menu Categories`
    );
  };

  useEffect(() => {
    loadAllMenuCategories();
  }, [activePagination, inactivePagination]);

  return (
    <div className={styles["menu-category-page"]}>
      <Toast />
      <AddMenuCategoryModal
        name={addedMenuCategory.menuCategoryName}
        isActiveAdd={addedMenuCategory.isActive}
        nameOnChange={handleNameAddChange}
        onClickAddButton={handleAddModalButtonClicked}
        openAddModal={openAddModal}
        handleCloseAddModal={handleCloseAddModal}
        handleIsActiveAddChange={handleIsActiveAddChange}
      />
      <InactiveMenuCategoryModal
        headers={headers}
        rows={inactiveMenuCategories}
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

      <EditMenuCategoryModal
        selectedEditItem={editedMenuCategory}
        nameEdit={editedMenuCategory.menuCategoryName}
        isActiveEdit={editedMenuCategory.isActive}
        handleNameEditChange={handleNameEditChange}
        handleIsActiveEditChange={handleIsActiveEditChange}
        handleEditModalButtonClicked={handleEditModalButtonClicked}
        openEditModal={openEditModal}
        handleCloseEditModal={handleCloseEditModal}
      />

      <section className={styles["menu-category-page__upper-section"]}>
        <WindowControlBar />
      </section>

      <section className={styles["menu-category-page__lower-section"]}>
        <Navigation page="menu-category" />
        <section className={styles["menu-category-page__main-section"]}>
          <section className={styles["menu-category-page__main-top-section"]}>
            <InactivateButton
              label="Inactivate"
              onClick={handleInactivateClick}
              disableCondition={selectedActiveItemsCount <= 0}
            />
            <SaveButton
              label="Add Menu Category"
              onClick={handleOpenAddModal}
            />
          </section>
          <section
            className={styles["menu-category-page__main-bottom-section"]}
          >
            <DataTable
              headers={headers}
              rows={activeMenuCategories}
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
                styles["menu-category-page__view-inactive-items-buton"]
              }
            >
              <InactiveItemsButton
                label="View Inactive Menu Categories"
                onClick={handleOpenViewInactiveModal}
              />
            </div>
          </section>
        </section>
      </section>
    </div>
  );
};

export default MenuCategoryPage;

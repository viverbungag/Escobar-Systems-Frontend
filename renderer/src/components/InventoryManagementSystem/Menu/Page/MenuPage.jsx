import React, { useState, useEffect } from "react";
import DataTable from "../../Shared/DataTable/DataTable";
import styles from "./MenuPage.module.scss";
import WindowControlBar from "../../Shared/WindowControlBar/WindowControlBar";
import Navigation from "../../Shared/Navigation/Navigation";
import SaveButton from "../../Shared/Buttons/SaveButton/SaveButton";
import InactivateButton from "../../Shared/Buttons/InactivateButton/InactivateButton";
import InactiveItemsButton from "../../Shared/Buttons/InactiveItemsButton/InactiveItemsButton";
import AddMenuModal from "../AddMenuModal/AddMenuModal";
import InactiveMenuModal from "../InactiveMenuModal/InactiveMenuModal";
import EditMenuModal from "../EditMenuModal/EditMenuModal";
import Toast from "../../Shared/Toast/Toast";
import Pagination from "src/model/Pagination";
import Rest from "../../../rest/Rest";
import Menu from "../../../model/Menu";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

const headers = [
  {
    id: "id",
    label: "Id",
    value: "menuId",
  },
  {
    id: "name",
    label: "Name",
    value: "menuName",
  },
  {
    id: "price",
    label: "Price",
    value: "menuPrice",
  },
  {
    id: "menuCategory",
    label: "Menu Category",
    value: "menuCategoryName",
  },
  {
    id: "servingsLeft",
    label: "Servings Left",
    value: "numberOfServingsLeft",
  },
];

const sortItems = [
  {
    label: "Name",
  },
  {
    label: "Price",
  },
  {
    label: "Menu Category",
  }
];

const MenuPage = () => {
  const [activeMenus, setActiveMenus] = useState([]);
  const [inactiveMenus, setInactiveMenus] = useState([]);

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

  const [addedMenu, setAddedMenu] = useState(
    new Menu(1, "", 0, "", [], 0, true)
  );
  const [editedMenu, setEditedMenu] = useState(
    new Menu(1, "", 0, "", [], 0, true)
  );

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openViewInactiveModal, setOpenViewInactiveModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [activeMenuCategories, setActiveMenuCategories] = useState([]);
  const [activeIngredients, setActiveIngredients] = useState([]);
  //   const [activeUnitOfMeasurements, setActiveUnitOfMeasurements] = useState([]);
  //   const [activeSupplyCategories, setActiveSupplyCategories] = useState([]);

  const rest = new Rest();

  const handleOpenAddModal = () => {
    setAddedMenu(new Menu(1, "", 0, activeMenuCategories[0], [], 0, true));

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
    setEditedMenu(
      new Menu(
        row.menuId,
        row.menuName,
        row.menuPrice,
        row.menuCategoryName,
        row.ingredients,
        row.numberOfServingsLeft,
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
    setAddedMenu(
      new Menu(
        addedMenu.menuId,
        event.target.value,
        addedMenu.menuPrice,
        addedMenu.menuCategoryName,
        addedMenu.ingredients,
        addedMenu.numberOfServingsLeft,
        addedMenu.isActive
      )
    );
  };

  const handlePriceAddChange = (event) => {
    setAddedMenu(
      new Menu(
        addedMenu.menuId,
        addedMenu.menuName,
        event.target.value,
        addedMenu.menuCategoryName,
        addedMenu.ingredients,
        addedMenu.numberOfServingsLeft,
        addedMenu.isActive
      )
    );
  };

  const handleMenuCategoryAddChange = (event) => {
    setAddedMenu(
      new Menu(
        addedMenu.menuId,
        addedMenu.menuName,
        addedMenu.menuPrice,
        event.target.value,
        addedMenu.ingredients,
        addedMenu.numberOfServingsLeft,
        addedMenu.isActive
      )
    );
  };

  const handleIngredientsAddChange = (newIngredients) => {
    setAddedMenu(
      new Menu(
        addedMenu.menuId,
        addedMenu.menuName,
        addedMenu.menuPrice,
        addedMenu.menuCategoryName,
        newIngredients,
        addedMenu.numberOfServingsLeft,
        addedMenu.isActive
      )
    );
  };

  const handleIsActiveAddChange = (event) => {
    setAddedMenu(
      new Menu(
        addedMenu.menuId,
        addedMenu.menuName,
        addedMenu.menuPrice,
        addedMenu.menuCategoryName,
        addedMenu.ingredients,
        addedMenu.numberOfServingsLeft,
        !addedMenu.isActive
      )
    );
  };

  const handleNameEditChange = (event) => {
    setEditedMenu(
      new Menu(
        editedMenu.menuId,
        event.target.value,
        editedMenu.menuPrice,
        editedMenu.menuCategoryName,
        editedMenu.ingredients,
        editedMenu.numberOfServingsLeft,
        editedMenu.isActive
      )
    );
  };

  const handlePriceEditChange = (event) => {
    setEditedMenu(
      new Menu(
        editedMenu.menuId,
        editedMenu.menuName,
        event.target.value,
        editedMenu.menuCategoryName,
        editedMenu.ingredients,
        editedMenu.numberOfServingsLeft,
        editedMenu.isActive
      )
    );
  };

  const handleMenuCategoryEditChange = (event) => {
    setEditedMenu(
      new Menu(
        editedMenu.menuId,
        editedMenu.menuName,
        editedMenu.menuPrice,
        event.target.value,
        editedMenu.ingredients,
        editedMenu.numberOfServingsLeft,
        editedMenu.isActive
      )
    );
  };

  const handleIngredientsEditChange = (newIngredients) => {
    console.log(newIngredients);
    setEditedMenu(
      new Menu(
        editedMenu.menuId,
        editedMenu.menuName,
        editedMenu.menuPrice,
        editedMenu.menuCategoryName,
        newIngredients,
        editedMenu.numberOfServingsLeft,
        editedMenu.isActive
      )
    );
  };

  const handleIsActiveEditChange = (event) => {
    setEditedMenu(
      new Menu(
        editedMenu.menuId,
        editedMenu.menuName,
        editedMenu.menuPrice,
        editedMenu.menuCategoryName,
        editedMenu.ingredients,
        editedMenu.numberOfServingsLeft,
        !editedMenu.isActive
      )
    );
  };

  const handleAddModalButtonClicked = () => {
    addMenu();
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
    const newMenus = activeMenus.map((menu) => {
      if (menu.menuId === item.menuId) {
        menu.isSelected = !menu.isSelected;
      }

      if (menu.isSelected) {
        selectedItemsCount++;
      }
      return menu;
    });

    if (selectedItemsCount === activeMenus.length) {
      setActiveIsSelectAllChecked(true);
    }

    if (selectedItemsCount === 0) {
      setActiveIsSelectAllChecked(false);
    }

    setSelectedActiveItemsCount(selectedItemsCount);
    setActiveMenus(newMenus);
  };

  const handleInactiveItemCheckboxChange = (item) => {
    let selectedItemsCount = 0;
    const newMenus = inactiveMenus.map((menu) => {
      if (menu.menuId === item.menuId) {
        menu.isSelected = !menu.isSelected;
      }

      if (menu.isSelected) {
        selectedItemsCount++;
      }
      return menu;
    });

    if (selectedItemsCount === inactiveMenus.length) {
      setInactiveIsSelectAllChecked(true);
    }

    if (selectedItemsCount === 0) {
      setInactiveIsSelectAllChecked(false);
    }

    setSelectedInactiveItemsCount(selectedItemsCount);
    setInactiveMenus(newMenus);
  };

  const handleActiveSelectAllClick = () => {
    let selectedItemsCount = 0;
    const newMenus = activeMenus.map((menu) => {
      if (
        (selectedActiveItemsCount > 0 &&
          selectedActiveItemsCount < activeMenus.length) ||
        selectedActiveItemsCount === 0
      ) {
        menu.isSelected = true;
      } else {
        menu.isSelected = false;
      }

      if (menu.isSelected) {
        selectedItemsCount++;
      }

      return menu;
    });

    setSelectedActiveItemsCount(selectedItemsCount);

    if (
      activeMenus.length > 0 &&
      selectedActiveItemsCount === activeMenus.length
    ) {
      setActiveIsSelectAllChecked(false);
    } else {
      setActiveIsSelectAllChecked(true);
    }

    setActiveMenus(newMenus);
  };

  const handleInactiveSelectAllClick = () => {
    let selectedItemsCount = 0;
    const newMenus = inactiveMenus.map((menu) => {
      if (
        (selectedInactiveItemsCount > 0 &&
          selectedInactiveItemsCount < inactiveMenus.length) ||
        selectedInactiveItemsCount === 0
      ) {
        menu.isSelected = true;
      } else {
        menu.isSelected = false;
      }

      if (menu.isSelected) {
        selectedItemsCount++;
      }

      return menu;
    });

    setSelectedInactiveItemsCount(selectedItemsCount);

    if (
      inactiveMenus.length > 0 &&
      selectedInactiveItemsCount === inactiveMenus.length
    ) {
      setInactiveIsSelectAllChecked(false);
    } else {
      setInactiveIsSelectAllChecked(true);
    }

    setInactiveMenus(newMenus);
  };

  const handleEditModalButtonClicked = () => {
    updateMenu();
  };

  const handleActiveTotalPagesLoad = (data) => {
    setActiveTotalPages(data);
  };

  const handleActiveMenuCategoriesLoad = (data) => {
    setActiveMenuCategories(data);
  };

  const getAllActiveMenuCategories = () => {
    rest.get(`${INITIAL_URL}/menu-category`, handleActiveMenuCategoriesLoad);
  };

  const handleActiveIngredients = (data) => {
    setActiveIngredients(data);
  };

  const getAllActiveIngredients = () => {
    rest.get(`${INITIAL_URL}/supply`, handleActiveIngredients);
  };

  const handleActiveMenusLoad = (contents) => {
    setActiveMenus(
      contents.map((menu) => {
        return {
          ...menu,
          isSelected: false,
        };
      })
    );
  };

  const getAllActiveMenus = () => {
    rest.getWithPagination(
      `${INITIAL_URL}/menu/active`,
      activePagination.tojson(),
      handleActiveMenusLoad,
      handleActiveTotalPagesLoad
    );
  };

  const handleInactiveMenusLoad = (contents) => {
    setInactiveMenus(
      contents.map((menu) => {
        return {
          ...menu,
          isSelected: false,
        };
      })
    );
  };

  const handleInactiveTotalPagesLoad = (data) => {
    setInactiveTotalPages(data);
  };

  const getAllInactiveMenus = () => {
    rest.getWithPagination(
      `${INITIAL_URL}/menu/inactive`,
      inactivePagination.tojson(),
      handleInactiveMenusLoad,
      handleInactiveTotalPagesLoad
    );
  };

  const loadAllMenus = () => {
    getAllActiveMenus();
    getAllInactiveMenus();
  };

  const addSuccessAction = () => {
    loadAllMenus();
    setOpenAddModal(false);
    setAddedMenu(new Menu(1, "", 0, activeMenuCategories[0], [], 0, true));
    resetToDefault();
  };

  const addMenu = () => {
    rest.add(
      `${INITIAL_URL}/menu/add`,
      addedMenu.toJson(),
      addSuccessAction,
      `Successully added ${addedMenu.menuName}`
    );
  };

  const updateSuccessAction = () => {
    loadAllMenus();
    setOpenEditModal(false);
    resetToDefault();
  };

  const updateMenu = () => {
    rest.update(
      `${INITIAL_URL}/menu/update/${editedMenu.menuId}`,
      editedMenu.toJson(),
      updateSuccessAction,
      `Successully updated Menu ${editedMenu.menuId}`
    );
  };

  const handleActivateClick = () => {
    activateMenu();
    resetToDefault();
  };

  const handleInactivateClick = () => {
    inactivateMenu();
    resetToDefault();
  };

  const activateMenu = () => {
    const body = {
      menuListDto: inactiveMenus.filter((menu) => menu.isSelected),
    };
    rest.activate(
      `${INITIAL_URL}/menu/activate`,
      body,
      loadAllMenus,
      `Successully activated the selected Menu`
    );
  };

  const inactivateMenu = () => {
    const body = {
      menuListDto: activeMenus.filter((menu) => menu.isSelected),
    };
    rest.activate(
      `${INITIAL_URL}/menu/inactivate`,
      body,
      loadAllMenus,
      `Successully inactivated the selected Menu`
    );
  };

  useEffect(() => {
    loadAllMenus();
    getAllActiveMenuCategories();
    getAllActiveIngredients();
  }, [activePagination, inactivePagination]);

  return (
    <div className={styles["menu-page"]}>
      <Toast />
      <AddMenuModal
        activeMenus={activeMenus}
        inactiveMenus={inactiveMenus}
        allMenuCategories={activeMenuCategories}
        allIngredients={activeIngredients}
        name={addedMenu.menuName}
        price={addedMenu.menuPrice}
        menuCategory={addedMenu.menuCategoryName}
        ingredients={addedMenu.ingredients}
        isActive={addedMenu.isActive}
        nameOnChange={handleNameAddChange}
        priceOnChange={handlePriceAddChange}
        menuCategoryOnChange={handleMenuCategoryAddChange}
        ingredientsOnChange={handleIngredientsAddChange}
        isActiveOnChange={handleIsActiveAddChange}
        onClickAddButton={handleAddModalButtonClicked}
        openAddModal={openAddModal}
        handleCloseAddModal={handleCloseAddModal}
      />
      <InactiveMenuModal
        headers={headers}
        rows={inactiveMenus}
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

      <EditMenuModal
        activeMenus={activeMenus}
        inactiveMenus={inactiveMenus}
        allMenuCategories={activeMenuCategories}
        allIngredients={activeIngredients}
        id={editedMenu.menuId}
        name={editedMenu.menuName}
        price={editedMenu.menuPrice}
        menuCategory={editedMenu.menuCategoryName}
        ingredients={editedMenu.ingredients}
        isActive={editedMenu.isActive}
        nameOnChange={handleNameEditChange}
        priceOnChange={handlePriceEditChange}
        ingredientsOnChange={handleIngredientsEditChange}
        menuCategoryOnChange={handleMenuCategoryEditChange}
        isActiveOnChange={handleIsActiveEditChange}
        handleEditModalButtonClicked={handleEditModalButtonClicked}
        openEditModal={openEditModal}
        handleCloseEditModal={handleCloseEditModal}
      />

      <section className={styles["menu-page__upper-section"]}>
        <WindowControlBar />
      </section>

      <section className={styles["menu-page__lower-section"]}>
        <Navigation page="menu" />
        <section className={styles["menu-page__main-section"]}>
          <section className={styles["menu-page__main-top-section"]}>
            <InactivateButton
              label="Inactivate"
              onClick={handleInactivateClick}
              disableCondition={selectedActiveItemsCount <= 0}
            />
            <SaveButton label="Add Menu" onClick={handleOpenAddModal} />
          </section>
          <section className={styles["menu-page__main-bottom-section"]}>
            <DataTable
              headers={headers}
              rows={activeMenus}
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
            <div className={styles["menu-page__view-inactive-items-buton"]}>
              <InactiveItemsButton
                label="View Inactive Menu"
                onClick={handleOpenViewInactiveModal}
              />
            </div>
          </section>
        </section>
      </section>
    </div>
  );
};

export default MenuPage;

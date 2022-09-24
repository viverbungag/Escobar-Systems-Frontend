import { useState, useEffect } from "react";
import DataTable from "../../Shared/DataTable/DataTable";
import styles from "./UnitOfMeasurementPage.module.scss";
import WindowControlBar from "../../../components/Shared/WindowControlBar/WindowControlBar";
import Navigation from "../../Shared/Navigation/Navigation";
import SaveButton from "../../Shared/Buttons/SaveButton/SaveButton";
import InactivateButton from "../../Shared/Buttons/InactivateButton/InactivateButton";
import InactiveItemsButton from "../../Shared/Buttons/InactiveItemsButton/InactiveItemsButton";
import AddUnitOfMeasurementModal from "../AddUnitOfMeasurementModal/AddUnitOfMeasurementModal";
import InactiveUnitOfMeasurementModal from "../InactiveUnitOfMeasurementModal/InactiveUnitOfMeasurementModal";
import EditUnitOfMeasurementModal from "../EditUnitOfMeasurementModal/EditUnitOfMeasurementModal";
import Toast from "../../Shared/Toast/Toast";
import Pagination from "../../../model/Pagination";
import Rest from "../../../rest/Rest";
import UnitOfMeasurement from "../../../model/UnitOfMeasurement";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

const headers = [
  {
    id: "id",
    label: "Id",
    value: "unitOfMeasurementId",
  },
  {
    id: "name",
    label: "Name",
    value: "unitOfMeasurementName",
  },
  {
    id: "abbreviation",
    label: "Abbreviation",
    value: "unitOfMeasurementAbbreviation",
  },
];

const sortItems = [
  {
    label: "Name",
  },
  {
    label: "Abbreviation",
  },
];

const UnitOfMeasurementPage = () => {
  const [activeUnitOfMeasurements, setActiveUnitOfMeasurements] = useState([]);
  const [inactiveUnitOfMeasurements, setInactiveUnitOfMeasurements] = useState(
    []
  );

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

  const [addedUnitOfMeasurement, setAddedUnitOfMeasurement] = useState(
    new UnitOfMeasurement(1, "", "", true)
  );
  const [editedUnitOfMeasurement, setEditedUnitOfMeasurement] = useState(
    new UnitOfMeasurement(1, "", "", true)
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
    setEditedUnitOfMeasurement(
      new UnitOfMeasurement(
        row.unitOfMeasurementId,
        row.unitOfMeasurementName,
        row.unitOfMeasurementAbbreviation,
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
    setAddedUnitOfMeasurement(
      new UnitOfMeasurement(
        addedUnitOfMeasurement.unitOfMeasurementId,
        event.target.value,
        addedUnitOfMeasurement.unitOfMeasurementAbbreviation,
        addedUnitOfMeasurement.isActive
      )
    );
  };

  const handleAbbreviationAddChange = (event) => {
    setAddedUnitOfMeasurement(
      new UnitOfMeasurement(
        addedUnitOfMeasurement.unitOfMeasurementId,
        addedUnitOfMeasurement.unitOfMeasurementName,
        event.target.value,
        addedUnitOfMeasurement.isActive
      )
    );
  };

  const handleIsActiveAddChange = (event) => {
    setAddedUnitOfMeasurement(
      new UnitOfMeasurement(
        addedUnitOfMeasurement.unitOfMeasurementId,
        addedUnitOfMeasurement.unitOfMeasurementName,
        addedUnitOfMeasurement.unitOfMeasurementAbbreviation,
        !addedUnitOfMeasurement.isActive
      )
    );
  };

  const handleNameEditChange = (event) => {
    setEditedUnitOfMeasurement(
      new UnitOfMeasurement(
        editedUnitOfMeasurement.unitOfMeasurementId,
        event.target.value,
        editedUnitOfMeasurement.unitOfMeasurementAbbreviation,
        editedUnitOfMeasurement.isActive
      )
    );
  };

  const handleAbbreviationEditChange = (event) => {
    setEditedUnitOfMeasurement(
      new UnitOfMeasurement(
        editedUnitOfMeasurement.unitOfMeasurementId,
        editedUnitOfMeasurement.unitOfMeasurementName,
        event.target.value,
        editedUnitOfMeasurement.isActive
      )
    );
  };

  const handleIsActiveEditChange = (event) => {
    setEditedUnitOfMeasurement(
      new UnitOfMeasurement(
        editedUnitOfMeasurement.unitOfMeasurementId,
        editedUnitOfMeasurement.unitOfMeasurementName,
        editedUnitOfMeasurement.unitOfMeasurementAbbreviation,
        !editedUnitOfMeasurement.isActive
      )
    );
  };

  const handleAddModalButtonClicked = () => {
    addUnitOfMeasurement();
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
    const newUnitOfMeasurements = activeUnitOfMeasurements.map(
      (unitOfMeasurement) => {
        if (
          unitOfMeasurement.unitOfMeasurementId === item.unitOfMeasurementId
        ) {
          unitOfMeasurement.isSelected = !unitOfMeasurement.isSelected;
        }

        if (unitOfMeasurement.isSelected) {
          selectedItemsCount++;
        }
        return unitOfMeasurement;
      }
    );

    if (selectedItemsCount === activeUnitOfMeasurements.length) {
      setActiveIsSelectAllChecked(true);
    }

    if (selectedItemsCount === 0) {
      setActiveIsSelectAllChecked(false);
    }

    setSelectedActiveItemsCount(selectedItemsCount);
    setActiveUnitOfMeasurements(newUnitOfMeasurements);
  };

  const handleInactiveItemCheckboxChange = (item) => {
    let selectedItemsCount = 0;
    const newUnitOfMeasurements = inactiveUnitOfMeasurements.map(
      (unitOfMeasurement) => {
        if (
          unitOfMeasurement.unitOfMeasurementId === item.unitOfMeasurementId
        ) {
          unitOfMeasurement.isSelected = !unitOfMeasurement.isSelected;
        }

        if (unitOfMeasurement.isSelected) {
          selectedItemsCount++;
        }
        return unitOfMeasurement;
      }
    );

    if (selectedItemsCount === inactiveUnitOfMeasurements.length) {
      setInactiveIsSelectAllChecked(true);
    }

    if (selectedItemsCount === 0) {
      setInactiveIsSelectAllChecked(false);
    }

    setSelectedInactiveItemsCount(selectedItemsCount);
    setInactiveUnitOfMeasurements(newUnitOfMeasurements);
  };

  const handleActiveSelectAllClick = () => {
    let selectedItemsCount = 0;
    const newUnitOfMeasurements = activeUnitOfMeasurements.map(
      (unitOfMeasurement) => {
        if (
          (selectedActiveItemsCount > 0 &&
            selectedActiveItemsCount < activeUnitOfMeasurements.length) ||
          selectedActiveItemsCount === 0
        ) {
          unitOfMeasurement.isSelected = true;
        } else {
          unitOfMeasurement.isSelected = false;
        }

        if (unitOfMeasurement.isSelected) {
          selectedItemsCount++;
        }

        return unitOfMeasurement;
      }
    );

    setSelectedActiveItemsCount(selectedItemsCount);

    if (
      activeUnitOfMeasurements.length > 0 &&
      selectedActiveItemsCount === activeUnitOfMeasurements.length
    ) {
      setActiveIsSelectAllChecked(false);
    } else {
      setActiveIsSelectAllChecked(true);
    }

    setActiveUnitOfMeasurements(newUnitOfMeasurements);
  };

  const handleInactiveSelectAllClick = () => {
    let selectedItemsCount = 0;
    const newUnitOfMeasurements = inactiveUnitOfMeasurements.map(
      (unitOfMeasurement) => {
        if (
          (selectedInactiveItemsCount > 0 &&
            selectedInactiveItemsCount < inactiveUnitOfMeasurements.length) ||
          selectedInactiveItemsCount === 0
        ) {
          unitOfMeasurement.isSelected = true;
        } else {
          unitOfMeasurement.isSelected = false;
        }

        if (unitOfMeasurement.isSelected) {
          selectedItemsCount++;
        }

        return unitOfMeasurement;
      }
    );

    setSelectedInactiveItemsCount(selectedItemsCount);

    if (
      inactiveUnitOfMeasurements.length > 0 &&
      selectedInactiveItemsCount === inactiveUnitOfMeasurements.length
    ) {
      setInactiveIsSelectAllChecked(false);
    } else {
      setInactiveIsSelectAllChecked(true);
    }

    setInactiveUnitOfMeasurements(newUnitOfMeasurements);
  };

  const handleEditModalButtonClicked = () => {
    updateUnitOfMeasurement();
  };

  const handleActiveUnitOfMeasurementsLoad = (contents) => {
    setActiveUnitOfMeasurements(
      contents.map((unitOfMeasurement) => {
        return {
          ...unitOfMeasurement,
          isSelected: false,
        };
      })
    );
  };

  const handleActiveTotalPagesLoad = (data) => {
    setActiveTotalPages(data);
  };

  const getAllActiveUnitOfMeasurements = () => {
    rest.getWithPagination(
      `${INITIAL_URL}/unit-of-measurement/active`,
      activePagination.tojson(),
      handleActiveUnitOfMeasurementsLoad,
      handleActiveTotalPagesLoad
    );
  };

  const handleInactiveUnitOfMeasurementsLoad = (contents) => {
    setInactiveUnitOfMeasurements(
      contents.map((unitOfMeasurement) => {
        return {
          ...unitOfMeasurement,
          isSelected: false,
        };
      })
    );
  };

  const handleInactiveTotalPagesLoad = (data) => {
    setInactiveTotalPages(data);
  };

  const getAllInactiveUnitOfMeasurements = () => {
    rest.getWithPagination(
      `${INITIAL_URL}/unit-of-measurement/inactive`,
      inactivePagination.tojson(),
      handleInactiveUnitOfMeasurementsLoad,
      handleInactiveTotalPagesLoad
    );
  };

  const loadAllUnitOfMeasurements = () => {
    getAllActiveUnitOfMeasurements();
    getAllInactiveUnitOfMeasurements();
  };

  const addSuccessAction = () => {
    loadAllUnitOfMeasurements();
    setOpenAddModal(false);
    setAddedUnitOfMeasurement(new UnitOfMeasurement(1, "", "", true));
    resetToDefault();
  };

  const addUnitOfMeasurement = () => {
    rest.add(
      `${INITIAL_URL}/unit-of-measurement/add`,
      addedUnitOfMeasurement.toJson(),
      addSuccessAction,
      `Successully added ${addedUnitOfMeasurement.unitOfMeasurementName}`
    );
  };

  const updateSuccessAction = () => {
    loadAllUnitOfMeasurements();
    setOpenEditModal(false);
    resetToDefault();
  };

  const updateUnitOfMeasurement = () => {
    rest.update(
      `${INITIAL_URL}/unit-of-measurement/update/${editedUnitOfMeasurement.unitOfMeasurementId}`,
      editedUnitOfMeasurement.toJson(),
      updateSuccessAction,
      `Successully updated Unit of Measurement ${editedUnitOfMeasurement.unitOfMeasurementId}`
    );
  };

  const handleActivateClick = () => {
    activateUnitOfMeasurements();
    resetToDefault();
  };

  const handleInactivateClick = () => {
    inactivateUnitOfMeasurements();
    resetToDefault();
  };

  const activateUnitOfMeasurements = () => {
    const body = {
      unitOfMeasurementListDto: inactiveUnitOfMeasurements.filter(
        (unitOfMeasurement) => unitOfMeasurement.isSelected
      ),
    };
    rest.activate(
      `${INITIAL_URL}/unit-of-measurement/activate`,
      body,
      loadAllUnitOfMeasurements,
      `Successully activated the selected Unit of Measurements`
    );
  };

  const inactivateUnitOfMeasurements = () => {
    const body = {
      unitOfMeasurementListDto: activeUnitOfMeasurements.filter(
        (unitOfMeasurement) => unitOfMeasurement.isSelected
      ),
    };

    rest.inactivate(
      `${INITIAL_URL}/unit-of-measurement/inactivate`,
      body,
      loadAllUnitOfMeasurements,
      `Successully inactivated the selected Unit of Measurements`
    );
  };

  useEffect(() => {
    loadAllUnitOfMeasurements();
  }, [activePagination, inactivePagination]);

  return (
    <div className={styles["unit-of-measurement-page"]}>
      <Toast />
      <AddUnitOfMeasurementModal
        name={addedUnitOfMeasurement.unitOfMeasurementName}
        isActiveAdd={addedUnitOfMeasurement.isActive}
        abbreviation={addedUnitOfMeasurement.unitOfMeasurementAbbreviation}
        nameOnChange={handleNameAddChange}
        abbreviationOnChange={handleAbbreviationAddChange}
        onClickAddButton={handleAddModalButtonClicked}
        openAddModal={openAddModal}
        handleCloseAddModal={handleCloseAddModal}
        handleIsActiveAddChange={handleIsActiveAddChange}
      />
      <InactiveUnitOfMeasurementModal
        headers={headers}
        rows={inactiveUnitOfMeasurements}
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

      <EditUnitOfMeasurementModal
        selectedEditItem={editedUnitOfMeasurement}
        nameEdit={editedUnitOfMeasurement.unitOfMeasurementName}
        abbreviation={editedUnitOfMeasurement.unitOfMeasurementAbbreviation}
        isActiveEdit={editedUnitOfMeasurement.isActive}
        handleNameEditChange={handleNameEditChange}
        handleAbbreviationChange={handleAbbreviationEditChange}
        handleIsActiveEditChange={handleIsActiveEditChange}
        handleEditModalButtonClicked={handleEditModalButtonClicked}
        openEditModal={openEditModal}
        handleCloseEditModal={handleCloseEditModal}
      />

      <section className={styles["unit-of-measurement-page__upper-section"]}>
        <WindowControlBar />
      </section>

      <section className={styles["unit-of-measurement-page__lower-section"]}>
        <Navigation page="unit-of-measurement" />
        <section className={styles["unit-of-measurement-page__main-section"]}>
          <section
            className={styles["unit-of-measurement-page__main-top-section"]}
          >
            <InactivateButton
              label="Inactivate"
              onClick={handleInactivateClick}
              disableCondition={selectedActiveItemsCount <= 0}
            />
            <SaveButton
              label="Add Unit of Measurement"
              onClick={handleOpenAddModal}
            />
          </section>
          <section
            className={styles["unit-of-measurement-page__main-bottom-section"]}
          >
            <DataTable
              headers={headers}
              rows={activeUnitOfMeasurements}
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
                styles["unit-of-measurement-page__view-inactive-items-buton"]
              }
            >
              <InactiveItemsButton
                label="View Inactive Unit of Measurements"
                onClick={handleOpenViewInactiveModal}
              />
            </div>
          </section>
        </section>
      </section>
    </div>
  );
};

export default UnitOfMeasurementPage;

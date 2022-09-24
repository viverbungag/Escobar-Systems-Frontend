import React, { useState, useEffect } from 'react';
import styles from "./DashboardPage.module.scss";
import WindowControlBar from "../../Shared/WindowControlBar/WindowControlBar";
import Navigation from "../../Shared/Navigation/Navigation";
import Rest from "../../../rest/Rest";
import Pagination from "src/model/Pagination";
import DashboardTable from "../DashboardTable/DashboardTable";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

const headers = [
  {
    id: "id",
    label: "Id",
    value: "supplyId",
  },
  {
    id: "supply",
    label: "Name",
    value: "supplyName",
  },
  {
    id: "minimumQuantity",
    label: "Minimum Quantity",
    value: "minimumQuantity",
  },
  {
    id: "supplyQuantity",
    label: "Quantity",
    value: "supplyQuantity",
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
];


const DashboardPage = () => {

  const [inMinimumSupplies, setInMinimumSuppies] = useState([]);
  const [activePagination, setActivePagination] = useState(
    new Pagination(0, 10, "None", true)
  );
  const [activeTotalPages, setActiveTotalPages] = useState(0);

  const rest = new Rest();

  const handleActivePageSizeChange = (event) => {
    setActivePagination(
      new Pagination(
        activePagination.pageNo,
        parseInt(event.target.value, 10),
        activePagination.sortedBy,
        activePagination.isAscending
      )
    );
    
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
  };

  const handleInMinimumSuppliesLoad = (contents) => {
    setInMinimumSuppies(contents);
  };

  const handleActiveTotalPagesLoad = (data) => {
    setActiveTotalPages(data);
  };

  const getAllInMinimumSupplies = () => {
    rest.getWithPagination(
      `${INITIAL_URL}/supply/active/in-minimum`,
      activePagination.tojson(),
      handleInMinimumSuppliesLoad,
      handleActiveTotalPagesLoad
    );
  };

  const loadAllInMinimumSupplies = () => {
    getAllInMinimumSupplies();
  };


  useEffect(() => {
    loadAllInMinimumSupplies();
  }, [activePagination]);


  return (
    <div className={styles["dashboard-page"]}>
      <section className={styles["dashboard-page__upper-section"]}>
        <WindowControlBar />
      </section>

      <section className={styles["dashboard-page__lower-section"]}>
        <Navigation page="dashboard" />
        <section className={styles["dashboard-page__main-section"]}>
          <div className={styles["dashboard-page__title"]}>
            <h1>SUPPLIES IN MINIMUM</h1>
          </div>
          <section className={styles["dashboard-page__main-bottom-section"]}>
            <div className={styles["dashboard-page__in-minimum-table"]}>
              <DashboardTable
                headers={headers}
                rows={inMinimumSupplies}
                sortOrder={
                  activePagination.isAscending ? "Ascending" : "Descending"
                }
                sortedBy={activePagination.sortedBy}
                pageNo={activePagination.pageNo}
                pageSize={activePagination.pageSize}
                totalPages={activeTotalPages}
                sortItems={sortItems}
                handlePageNoChange={handleActivePageNoChange}
                handlePageSizeChange={handleActivePageSizeChange}
                handleSortedByChange={handleActiveSortedByChange}
                handleSortOrderChange={handleActiveSortOrderChange}
              />
            </div>
          </section>
        </section>
      </section>
    </div>
  );
};

export default DashboardPage;

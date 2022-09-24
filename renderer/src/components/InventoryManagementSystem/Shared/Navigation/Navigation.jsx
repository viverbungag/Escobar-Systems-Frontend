import React from "react";
import styles from "./Navigation.module.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import KitchenIcon from "@mui/icons-material/Kitchen";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GroupIcon from "@mui/icons-material/Group";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StraightenIcon from "@mui/icons-material/Straighten";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { useUser } from '../../contexts/UserContext';

const Navigation = ({ page }) => {
  const { employeeName } = useUser();

  return (
    <div className={styles["navigation"]}>
      <div className={styles["navigation__profile"]}>
        <PersonIcon />
        <h2>{employeeName}</h2>
      </div>
      <div className={styles["navigation__categories"]}>
        <div className={styles["navigation__category"]}>
          <div className={styles["navigation__title"]}>NAVIGATION</div>
          <div className={styles["navigation__list"]}>
            <Link href="/dashboard">
              <div
                className={[
                  styles["navigation__item-container"],
                  page === "dashboard" &&
                    styles["navigation__item-container--selected"],
                ].join(" ")}
              >
                <div className={styles["navigation__item-icon"]}>
                  <DashboardIcon />
                </div>
                <div className={styles["navigation__item-text"]}>Dashboard</div>
              </div>
            </Link>

            <Link href="/menu">
              <div
                className={[
                  styles["navigation__item-container"],
                  page === "menu" &&
                    styles["navigation__item-container--selected"],
                ].join(" ")}
              >
                <div className={styles["navigation__item-icon"]}>
                  <RestaurantMenuIcon />
                </div>
                <div className={styles["navigation__item-text"]}>Menu</div>
              </div>
            </Link>
            <Link href="/supply">
              <div
                className={[
                  styles["navigation__item-container"],
                  page === "supply" &&
                    styles["navigation__item-container--selected"],
                ].join(" ")}
              >
                <div className={styles["navigation__item-icon"]}>
                  <KitchenIcon />
                </div>
                <div className={styles["navigation__item-text"]}>Supply</div>
              </div>
            </Link>
          </div>
        </div>

        <div className={styles["navigation__category"]}>
          <div className={styles["navigation__title"]}>TRANSACTIONS</div>
          <div className={styles["navigation__list"]}>
            <Link href="/stock-in">
              <div
                className={[
                  styles["navigation__item-container"],
                  page === "stock-in" &&
                    styles["navigation__item-container--selected"],
                ].join(" ")}
              >
                <div className={styles["navigation__item-icon"]}>
                  <AddBoxIcon />
                </div>
                <div className={styles["navigation__item-text"]}>Stock-In</div>
              </div>
            </Link>

            <Link href="/stock-out">
              <div
                className={[
                  styles["navigation__item-container"],
                  page === "stock-out" &&
                    styles["navigation__item-container--selected"],
                ].join(" ")}
              >
                <div className={styles["navigation__item-icon"]}>
                  <IndeterminateCheckBoxIcon />
                </div>
                <div className={styles["navigation__item-text"]}>Stock-Out</div>
              </div>
            </Link>

            <Link href="/view-transactions">
              <div
                className={[
                  styles["navigation__item-container"],
                  page === "view-transactions" &&
                    styles["navigation__item-container--selected"],
                ].join(" ")}
              >
                <div className={styles["navigation__item-icon"]}>
                  <VisibilityIcon />
                </div>
                <div className={styles["navigation__item-text"]}>
                  View Transactions
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className={styles["navigation__category"]}>
          <div className={styles["navigation__title"]}>OTHERS</div>
          <div className={styles["navigation__list"]}>
            <Link href="/supplier">
              <div
                className={[
                  styles["navigation__item-container"],
                  page === "supplier" &&
                    styles["navigation__item-container--selected"],
                ].join(" ")}
              >
                <div className={styles["navigation__item-icon"]}>
                  <GroupIcon />
                </div>
                <div className={styles["navigation__item-text"]}>Supplier</div>
              </div>
            </Link>

            <Link href="/menu-category">
              <div
                className={[
                  styles["navigation__item-container"],
                  page === "menu-category" &&
                    styles["navigation__item-container--selected"],
                ].join(" ")}
              >
                <div className={styles["navigation__item-icon"]}>
                  <BrunchDiningIcon />
                </div>
                <div className={styles["navigation__item-text"]}>
                  Menu Category
                </div>
              </div>
            </Link>

            <Link href="/supply-category">
              <div
                className={[
                  styles["navigation__item-container"],
                  page === "supply-category" &&
                    styles["navigation__item-container--selected"],
                ].join(" ")}
              >
                <div className={styles["navigation__item-icon"]}>
                  <ShoppingBagIcon />
                </div>
                <div className={styles["navigation__item-text"]}>
                  Supply Category
                </div>
              </div>
            </Link>

            <Link href="/unit-of-measurement">
              <div
                className={[
                  styles["navigation__item-container"],
                  page === "unit-of-measurement" &&
                    styles["navigation__item-container--selected"],
                ].join(" ")}
              >
                <div className={styles["navigation__item-icon"]}>
                  <StraightenIcon />
                </div>
                <div className={styles["navigation__item-text"]}>
                  Unit of Measurement
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className={styles["navigation__category"]}>
          <div className={styles["navigation__title"]}>ACCOUNT</div>
          <div className={styles["navigation__list"]}>
            <Link href="/login">
              <div className={styles["navigation__item-container"]}>
                <div className={styles["navigation__item-icon"]}>
                  <LogoutIcon />
                </div>
                <div className={styles["navigation__item-text"]}>Logout</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;

import React, { useState, useEffect } from "react";
import styles from "./NewOrderPage.module.scss";
import MenuSideBar from "./MenuSideBar/MenuSideBar.jsx";
import Menu from "./MenuPage/Menu.jsx";
import MenuOrderTab from "./MenuOrderTab/MenuOrderTab.jsx";
import Rest from "../../../rest/Rest.tsx";
import MenuOnCategory from "../../../model/MenuOnCategory.tsx";
import Order from "../../../model/Order.tsx";
import CustomerFoodOrder from "../../../model/CustomerFoodOrder.tsx";
import FoodOrder from "../../../model/FoodOrder.tsx";
import MenuModel from "../../../model/Menu.tsx";
import { useUser } from "../../contexts/UserContext";
import OrderMenu from "../../../model/OrderMenu.tsx";
import { useRouter } from "next/router";
import WindowControlBar from "../../Shared/WindowControlBar/WindowControlBar";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { printReceipt } from "../../../../print/printFunctions";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

const NewOrderPage = () => {
  const rest = new Rest();

  const router = useRouter();

  const handleBackButtonOnClick = () => {
    localStorage.getItem("isAdmin") === "true"
      ? router.push("/main-admin-dashboard")
      : router.push("/main-employee-dashboard");
  };

  const { employeeName } = useUser();

  const [activeMenuCategories, setActiveMenuCategories] = useState([]);

  const [currentMenuCategory, setCurrentMenuCategory] = useState();

  const [menusBasedOnCategory, setMenusBasedOnCategory] = useState([]);
  const [menuOnCategory, setMenuOnCategory] = useState(
    new MenuOnCategory("", [])
  );

  const [allUnpaidOrders, setAllUnpaidOrders] = useState([]);

  const [allMenus, setAllMenus] = useState([]);

  const [payment, setPayment] = useState(0);

  const [selectedOrder, setSelectedOrder] = useState("");

  const [orderDiscount, setOrderDiscount] = useState("");

  const [selectedTableNumber, setSelectedTableNumber] = useState(1);
  const handleSelectedTableNumberOnChange = (event) => {
    setSelectedTableNumber(event.target.value);
  };

  const [availableTableNumbers, setAvailableTableNumbers] = useState([]);

  const handleSelectedOrderOnChange = (event) => {
    const orderId = event.target.value;
    setSelectedOrder(orderId);
  };

  const [type, setType] = useState("new-user");
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const [servingType, setServingType] = useState("DINE_IN");
  const handleServingTypeOnChange = (event) => {
    setServingType(event.target.value);
  };

  const handleCartChange = (newMenu) => {
    newMenu.orderMenuQuantity = 1;
    const isNewMenuExisting = false;

    if (newMenu.numberOfServingsLeft === 0) {
      return;
    }

    const newMenuOnCategory = menuOnCategory.orderMenu.map((currentMenu) => {
      if (currentMenu.menuName === newMenu.menuName) {
        currentMenu.orderMenuQuantity += 1;
        isNewMenuExisting = true;
      }

      return currentMenu;
    });

    if (!isNewMenuExisting) {
      newMenuOnCategory.push(newMenu);
    }

    setMenuOnCategory(
      new MenuOnCategory(menuOnCategory.menuCategoryName, newMenuOnCategory)
    );
  };

  const handleDeleteItemButtonOnClick = (data) => {
    const newMenuOnCategory = [];
    menuOnCategory.orderMenu.forEach((currentMenu) => {
      if (currentMenu.menuName !== data) {
        newMenuOnCategory.push(currentMenu);
      }
    });
    setMenuOnCategory(
      new MenuOnCategory(menuOnCategory.menuCategoryName, newMenuOnCategory)
    );
  };

  const deleteAllItemOnClick = () => {
    const newMenuOnCategory = [];
    setMenuOnCategory(
      new MenuOnCategory(menuOnCategory.menuCategoryName, newMenuOnCategory)
    );
  };
  const handleQuantityOnChange = (name, quantity, quantityToAdd) => {
    const currentNumberOfServings = allMenus.find(
      (menu) => menu.menuName === name
    ).numberOfServingsLeft;

    if (currentNumberOfServings < 1 && quantityToAdd === 1) return;
    if (quantity + quantityToAdd <= 0) {
      const newMenuOnCategory = [];
      menuOnCategory.orderMenu.forEach((currentMenu) => {
        if (currentMenu.menuName !== name) {
          newMenuOnCategory.push(currentMenu);
        }
      });
      setMenuOnCategory(
        new MenuOnCategory(menuOnCategory.menuCategoryName, newMenuOnCategory)
      );
      // }
      return;
    }

    const newMenuOnCategory = menuOnCategory.orderMenu.map((currentMenu) => {
      if (currentMenu.menuName === name) {
        currentMenu.orderMenuQuantity += quantityToAdd;
      }

      return currentMenu;
    });
    setMenuOnCategory(
      new MenuOnCategory(menuOnCategory.menuCategoryName, newMenuOnCategory)
    );
  };

  const handleActiveMenuCategoriesLoad = (data) => {
    setActiveMenuCategories(data);
    setCurrentMenuCategory(data[0]);
  };

  const getAllActiveMenuCategories = () => {
    rest.get(`${INITIAL_URL}/menu-category`, handleActiveMenuCategoriesLoad);
  };

  const handleMenusBasedOnCategoryLoad = (data) => {
    setMenusBasedOnCategory(data);
  };

  const getAllMenusBasedOnCategory = () => {
    rest.getMenuBasedOnCategory(
      `${INITIAL_URL}/orders/menu-on-category`,
      menuOnCategory.toJson(),
      handleMenusBasedOnCategoryLoad
    );
  };

  const handleAllMenusLoad = (data) => {
    setAllMenus(data);
  };

  const getAllMenus = () => {
    rest.getMenuBasedOnCategory(
      `${INITIAL_URL}/orders/menu`,
      menuOnCategory.toJson(),
      handleAllMenusLoad
    );
  };

  const handleCategoryOnChange = (newCategory) => {
    setCurrentMenuCategory(newCategory);
    setMenuOnCategory(
      new MenuOnCategory(newCategory, menuOnCategory.orderMenu)
    );
  };

  const handleOrderSuccess = () => {
    setMenuOnCategory(new MenuOnCategory(menuOnCategory.menuCategoryName, []));
  };

  const handlePayButtonOnClick = (
    pdfRows,
    pdfColumns,
    pdfPaymentRows,
    pdfPaymentColumns,
    servingType,
    customerPayment,
    discountPayment,
    additionalPayment,
    handleClose
  ) => {
    // console.log(pdfPaymentRows);

    const total = menuOnCategory.orderMenu.reduce(
      (sum, currentMenu) =>
        sum + currentMenu.menuPrice * currentMenu.orderMenuQuantity,
      0
    );

    if (servingType === "DINE_IN" && type === "new-user") {
      if (!availableTableNumbers.includes(selectedTableNumber)) {
        toast.error("Invalid table number");
        return;
      }
    }

    if (servingType === "TAKE_OUT" && type === "new-user") {
      if (isNaN(customerPayment)) {
        toast.error(" The Customer Payment must be a number");
        return;
      }

      if (isNaN(discountPayment)) {
        toast.error("Please Input a Number for the Discount Value");
        return;
      }

      if (
        Number(total) +
          Number(additionalPayment) -
          (Number(total) + Number(additionalPayment)) *
            (Number(discountPayment) / 100) >
        customerPayment
      ) {
        toast.error(
          " The Customer Payment must be higher than the total payment"
        );
        return;
      }

      if (customerPayment < 0) {
        toast.error(" The Customer Payment should be higher than 0");
        return;
      }

      if (discountPayment < 0) {
        toast.error(" Discount should be higher than 0");
        return;
      }

      if (additionalPayment < 0) {
        toast.error(" Discount should be higher than 0");
        return;
      }
    }

    const customerFoodOrders = menuOnCategory.orderMenu.map((orderMenu) => {
      return new CustomerFoodOrder(
        1,
        new FoodOrder(
          1,
          new MenuModel(
            orderMenu.menuId,
            orderMenu.menuName,
            orderMenu.menuPrice,
            orderMenu.menuCategoryName,
            orderMenu.ingredients,
            orderMenu.numberOfServingsLeft,
            orderMenu.isActive
          ),
          orderMenu.orderMenuQuantity
        )
      );
    });

    const order =
      servingType === "DINE_IN"
        ? new Order(
            1,
            employeeName,
            dayjs().add(8, "hour"),
            customerFoodOrders,
            0,
            0,
            0,
            "UNPAID",
            servingType,
            Number(selectedTableNumber),
            0
          )
        : new Order(
            1,
            employeeName,
            dayjs().add(8, "hour"),
            customerFoodOrders,
            Number(customerPayment),
            Number(discountPayment),
            Number(total),
            type === "new-user" ? "PAID" : "UNPAID",
            servingType,
            0,
            Number(additionalPayment)
          );

    if (type === "new-user") {
      rest.add(
        `${INITIAL_URL}/orders/add`,
        order,
        handleOrderSuccess,
        "Ordered Successfully"
      );
    }

    if (type === "existing-user") {
      rest.add(
        `${INITIAL_URL}/orders/add/existing/${selectedOrder}`,
        order,
        handleOrderSuccess,
        "Ordered Successfully"
      );
    }

    if (servingType === "TAKE_OUT") {
      console.log(order);
      printReceipt(
        order.orderId,
        pdfRows,
        pdfColumns,
        pdfPaymentRows,
        pdfPaymentColumns
      );
    }

    getAllOrders();
    handleClose();
  };

  const handleGetAllOrdersSuccess = (contents) => {
    setAllUnpaidOrders(contents);
  };

  const getAllOrders = () => {
    rest.get(`${INITIAL_URL}/orders/unpaid`, handleGetAllOrdersSuccess);
  };

  const handleGetUnavailableTableNumbersSuccess = (contents) => {
    setAvailableTableNumbers(contents);
  };

  const getAvailableTableNumbers = () => {
    rest.get(
      `${INITIAL_URL}/orders/available-table-numbers`,
      handleGetUnavailableTableNumbersSuccess
    );
  };

  useEffect(() => {
    getAllActiveMenuCategories();
    getAllOrders();
    getAllMenus();
    getAvailableTableNumbers();
  }, []);

  useEffect(() => {
    getAllMenusBasedOnCategory();
    getAllOrders();
    getAllMenus();
    getAvailableTableNumbers();
  }, [menuOnCategory]);

  useEffect(() => {
    setMenuOnCategory(
      new MenuOnCategory(activeMenuCategories[0], menuOnCategory.orderMenu)
    );
  }, [activeMenuCategories]);

  return (
    <div className={styles["NewOrderPage"]}>
      <MenuSideBar
        items={activeMenuCategories}
        categoryOnChange={handleCategoryOnChange}
        currentMenuCategory={currentMenuCategory}
      />

      <div className={styles["Component"]}>
        <Menu menus={menusBasedOnCategory} cartOnChange={handleCartChange} />
        <MenuOrderTab
          menuOnCategory={menuOnCategory}
          handleQuantityOnChange={handleQuantityOnChange}
          handleDeleteItemButtonOnClick={handleDeleteItemButtonOnClick}
          deleteAllItemOnClick={deleteAllItemOnClick}
          payButtonOnClick={handlePayButtonOnClick}
          allUnpaidOrders={allUnpaidOrders}
          selectedOrder={selectedOrder}
          handleSelectedOrderOnChange={handleSelectedOrderOnChange}
          type={type}
          handleTypeChange={handleTypeChange}
          selectedTableNumber={selectedTableNumber}
          handleSelectedTableNumberOnChange={handleSelectedTableNumberOnChange}
          availableTableNumbers={availableTableNumbers}
          servingType={servingType}
          handleServingTypeOnChange={handleServingTypeOnChange}
        />
      </div>
    </div>
  );
};

export default NewOrderPage;

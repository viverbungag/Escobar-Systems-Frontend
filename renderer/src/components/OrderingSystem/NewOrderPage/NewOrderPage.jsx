import React, { useState, useEffect } from 'react';
import styles from './NewOrderPage.module.scss'
import MenuSideBar  from './MenuSideBar/MenuSideBar.jsx';
import Menu  from './MenuPage/Menu.jsx';
import MenuOrderTab   from './MenuOrderTab/MenuOrderTab.jsx';
import Rest from '../../../rest/Rest.tsx';
import MenuOnCategory from '../../../model/MenuOnCategory.tsx';
import Order from '../../../model/Order.tsx';
import CustomerFoodOrder from '../../../model/CustomerFoodOrder.tsx';
import FoodOrder from '../../../model/FoodOrder.tsx';
import MenuModel from '../../../model/Menu.tsx';
import useUser from '../../contexts/UserContext';
import OrderMenu from '../../../model/OrderMenu.tsx';
import { useRouter } from "next/router";
import WindowControlBar from '../../Shared/WindowControlBar/WindowControlBar';

// import { MenuData } from "../../data/DataIndex";
const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

const NewOrderPage = () => {

  const rest = new Rest();

  const router = useRouter();

  const handleBackButtonOnClick = () => {
    localStorage.getItem("isAdmin") === "true"
      ? router.push("/main-admin-dashboard")
      : router.push("/main-employee-dashboard");
  };

  // const { employeeName } = useUser();

  const [activeMenuCategories, setActiveMenuCategories] = useState([]);

  const [currentMenuCategory, setCurrentMenuCategory] = useState();

  const[menusBasedOnCategory, setMenusBasedOnCategory] = useState([]);
  const[menuOnCategory, setMenuOnCategory] = useState(new MenuOnCategory("", []));

  const [payment, setPayment] = useState(0);

  const handleCartChange = (newMenu) => {
    newMenu.orderMenuQuantity = 1;
    const isNewMenuExisting = false;

    if (newMenu.numberOfServingsLeft === 0){
      return;
    }

    const newMenuOnCategory = menuOnCategory.orderMenu.map((currentMenu)=> {
      if (currentMenu.menuName === newMenu.menuName){
        currentMenu.orderMenuQuantity += 1;
        isNewMenuExisting = true;
      }

      return currentMenu;
    
    });
    
    if (!isNewMenuExisting){
      newMenuOnCategory.push(newMenu);
    }

    setMenuOnCategory(
      new MenuOnCategory(
        menuOnCategory.menuCategoryName,
        newMenuOnCategory
      )
    );
  };

  const handleDeleteItemButtonOnClick = (data) => {
      const newMenuOnCategory = [];
      menuOnCategory.orderMenu.forEach((currentMenu)=> {
        if(currentMenu.menuName !== data){
          newMenuOnCategory.push(currentMenu);
        }
      });
      setMenuOnCategory(new MenuOnCategory(
        menuOnCategory.menuCategoryName,
        newMenuOnCategory
      ));
  }

  const deleteAllItemOnClick = () => {
    const newMenuOnCategory = [];
    setMenuOnCategory(new MenuOnCategory(
      menuOnCategory.menuCategoryName,
      newMenuOnCategory
    ));
  }
  const handleQuantityOnChange = (name, quantity, quantityToAdd, numberOfServingsLeft) => {
    // if (numberOfServingsLeft > 0 && quantityToAdd === 1){
      if (quantity + quantityToAdd <= 0){
        const newMenuOnCategory = [];
        menuOnCategory.orderMenu.forEach((currentMenu)=> {
          if(currentMenu.menuName !== name){
            newMenuOnCategory.push(currentMenu);
          }
        });
        setMenuOnCategory(new MenuOnCategory(
          menuOnCategory.menuCategoryName,
          newMenuOnCategory
        ));
      // }
      return;
    }

    if (numberOfServingsLeft > 0 && quantityToAdd === 1) return;
  
    const newMenuOnCategory = menuOnCategory.orderMenu.map((currentMenu)=> {
        if (currentMenu.menuName === name){
          currentMenu.orderMenuQuantity += quantityToAdd;
        }
  
      return currentMenu;
    });
    setMenuOnCategory(new MenuOnCategory(
      menuOnCategory.menuCategoryName,
      newMenuOnCategory
    ));
  }

  const handleActiveMenuCategoriesLoad = (data) => {
    setActiveMenuCategories(data);
    setCurrentMenuCategory(data[0]);
  };

  const getAllActiveMenuCategories = () => {
    rest.get(`${INITIAL_URL}/menu-category`, handleActiveMenuCategoriesLoad);
  };

  const handleMenusBasedOnCategoryLoad = (data) => {
    setMenusBasedOnCategory(data);
  }

  const getAllMenusBasedOnCategory = () => {

    rest.getMenuBasedOnCategory(
      `${INITIAL_URL}/orders/menu-on-category`,
      menuOnCategory.toJson(),
      handleMenusBasedOnCategoryLoad
    );
  };

  const handleCategoryOnChange = (newCategory) => {
    setCurrentMenuCategory(newCategory);
    setMenuOnCategory(
      new MenuOnCategory(
        newCategory,
        menuOnCategory.orderMenu
      )
    );
  }

  const handlePayButtonOnClick = (customerPayment, discountPayment) => {
    const customerFoodOrders = menuOnCategory.orderMenu.map((orderMenu) => {
      console.log("orderMenu: ", orderMenu);

      return (new CustomerFoodOrder(1, new FoodOrder(1, new MenuModel(
        orderMenu.menuId, 
        orderMenu.menuName, 
        orderMenu.menuPrice, 
        orderMenu.menuCategoryName,
        orderMenu.ingredients,
        orderMenu.numberOfServingsLeft,
        orderMenu.isActive), orderMenu.orderMenuQuantity)))
    })

    const total = menuOnCategory.orderMenu.reduce(
      (sum, currentMenu) =>
        sum + currentMenu.menuPrice * currentMenu.orderMenuQuantity,
      0
    );

    const order = new Order(
      1,
      employeeName,
      new Date(),
      customerFoodOrders,
      customerPayment,
      discountPayment,
      total
    );

    const handleOrderSuccess = () => {
      setMenuOnCategory(
        new MenuOnCategory(
          menuOnCategory.menuCategoryName,
          []
        )
      );
    }

    rest.add(
      `${INITIAL_URL}/orders/add`,
      order,
      handleOrderSuccess,
      "Ordered Successfully"
    )
  }

  useEffect(() => {
    getAllActiveMenuCategories();
  }, []);

  useEffect(() => {
    getAllMenusBasedOnCategory();
  }, [menuOnCategory]);

  useEffect(() => {
    setMenuOnCategory(
      new MenuOnCategory(
        activeMenuCategories[0],
        menuOnCategory.orderMenu
      )
    );
  }, [activeMenuCategories]);

  return (
    <div className={styles["NewOrderPage"]}>
      <WindowControlBar handleBackButtonOnClick={handleBackButtonOnClick} />
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
        />
      </div>
    </div>
  );
}

export default NewOrderPage;

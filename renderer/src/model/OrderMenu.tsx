import MenuIngredients from "./MenuIngredients";

class OrderMenu {
  orderMenuId: number;
  orderMenuName: string;
  orderMenuPrice: number;
  orderMenuQuantity: number;
  orderMenuCategoryName: string;
  ingredients: Array<MenuIngredients>;
  numberOfServingsLeft: number;
  isActive: boolean;

  constructor(
    orderMenuId: number,
    orderMenuName: string,
    orderMenuPrice: number,
    orderMenuQuantity: number,
    orderMenuCategoryName: string,
    ingredients: Array<MenuIngredients>,
    numberOfServingsLeft: number,
    isActive: boolean
  ) {
    this.orderMenuId = orderMenuId;
    this.orderMenuName = orderMenuName;
    this.orderMenuPrice = orderMenuPrice;
    this.orderMenuQuantity = orderMenuQuantity;
    this.orderMenuCategoryName = orderMenuCategoryName;
    this.ingredients = ingredients;
    this.numberOfServingsLeft = numberOfServingsLeft;
    this.isActive = isActive;
  }

  toJson() {
    return {
      orderMenuId: this.orderMenuId,
      orderMenuName: this.orderMenuName,
      orderMenuPrice: this.orderMenuPrice,
      orderMenuQuantity: this.orderMenuQuantity,
      orderMenuCategoryName: this.orderMenuCategoryName,
      ingredients: this.ingredients,
      numberOfServingsLeft: this.numberOfServingsLeft,
      isActive: this.isActive,
    };
  }
}

export default OrderMenu;

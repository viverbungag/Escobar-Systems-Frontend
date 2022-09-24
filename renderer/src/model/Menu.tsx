import MenuIngredients from "./MenuIngredients";

class Menu {
  menuId: number;
  menuName: string;
  menuPrice: number;
  menuCategoryName: string;
  ingredients: Array<MenuIngredients>;
  numberOfServingsLeft: number;
  isActive: boolean;

  constructor(
    menuId: number,
    menuName: string,
    menuPrice: number,
    menuCategoryName: string,
    ingredients: Array<MenuIngredients>,
    numberOfServingsLeft: number,
    isActive: boolean
  ) {
    this.menuId = menuId;
    this.menuName = menuName;
    this.menuPrice = menuPrice;
    this.menuCategoryName = menuCategoryName;
    this.ingredients = ingredients;
    this.numberOfServingsLeft = numberOfServingsLeft;
    this.isActive = isActive;
  }

  toJson() {
    return {
      menuId: this.menuId,
      menuName: this.menuName,
      menuPrice: this.menuPrice,
      menuCategoryName: this.menuCategoryName,
      ingredients: this.ingredients,
      numberOfServingsLeft: this.numberOfServingsLeft,
      isActive: this.isActive,
    };
  }
}

export default Menu;

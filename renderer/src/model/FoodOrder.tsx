import Menu from "./Menu";

class FoodOrder{

    foodOrderId: number;
    menu: Menu;
    menuQuantity: number;

    constructor(foodOrderId: number, menu: Menu, menuQuantity: number){
        this.foodOrderId = foodOrderId;
        this.menu = menu;
        this.menuQuantity = menuQuantity;
    }
}

export default FoodOrder;
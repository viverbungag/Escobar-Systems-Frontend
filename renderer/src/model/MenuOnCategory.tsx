import OrderMenu from "./OrderMenu";

class MenuOnCategory{

    menuCategoryName: string;
    orderMenu: Array<OrderMenu>;

    constructor(menuCategoryName: string, orderMenu: Array<OrderMenu>){
        this.menuCategoryName = menuCategoryName;
        this.orderMenu = orderMenu;
    }

    toJson() {

        return{
            menuCategoryName: this.menuCategoryName,
            orderMenu: this.orderMenu
        }
        
    }

}

export default MenuOnCategory;
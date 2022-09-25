import FoodOrder from "./FoodOrder";

class CustomerFoodOrder {
  customerFoodOrderId: number;
  foodOrder: FoodOrder;

  constructor(customerFoodOrderId: number, foodOrder: FoodOrder) {
    this.customerFoodOrderId = customerFoodOrderId;
    this.foodOrder = foodOrder;
  }

  toJson() {
    return {
      customerFoodOrderId: this.customerFoodOrderId,
      foodOrder: this.foodOrder,
    };
  }
}

export default CustomerFoodOrder;

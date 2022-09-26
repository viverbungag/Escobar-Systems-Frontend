import CustomerFoodOrder from "./CustomerFoodOrder";

class Order {
  orderId: number;
  employeeFullName: string;
  orderTime: Date;
  customerFoodOrders: Array<CustomerFoodOrder>;
  payment: number;
  discount: number
  totalCost: number;

  constructor(
    orderId: number,
    employeeFullName: string,
    orderTime: Date,
    customerFoodOrders: Array<CustomerFoodOrder>,
    payment: number,
    discount: number,
    totalCost: number
  ) {
    this.orderId = orderId;
    this.employeeFullName = employeeFullName;
    this.orderTime = orderTime;
    this.customerFoodOrders = customerFoodOrders;
    this.payment = payment;
    this.discount = discount;
    this.totalCost = totalCost;
  }

  toJson() {
    return {
      orderId: this.orderId,
      employeeFullName: this.employeeFullName,
      orderTime: this.orderTime,
      customerFoodOrders: this.customerFoodOrders,
      payment: this.payment,
      discount: this.discount,
      totalCost: this.totalCost,
    };
  }
}

export default Order;

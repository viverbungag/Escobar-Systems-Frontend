import CustomerFoodOrder from "./CustomerFoodOrder";

class Order {
  orderId: number;
  employeeFullName: string;
  orderTime: Date;
  customerFoodOrders: Array<CustomerFoodOrder>;
  payment: number;
  discount: number
  totalCost: number;
  paymentStatus: string;
  servingType: string;
  tableNumber: number;

  constructor(
    orderId: number,
    employeeFullName: string,
    orderTime: Date,
    customerFoodOrders: Array<CustomerFoodOrder>,
    payment: number,
    discount: number,
    totalCost: number,
    paymentStatus: string,
    servingType: string,
    tableNumber: number
  ) {
    this.orderId = orderId;
    this.employeeFullName = employeeFullName;
    this.orderTime = orderTime;
    this.customerFoodOrders = customerFoodOrders;
    this.payment = payment;
    this.discount = discount;
    this.totalCost = totalCost;
    this.paymentStatus = paymentStatus;
    this.servingType = servingType;
    this.tableNumber = tableNumber;
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
      paymentStatus: this.paymentStatus,
      servingType: this.servingType,
      tableNumber: this.tableNumber
    };
  }
}

export default Order;

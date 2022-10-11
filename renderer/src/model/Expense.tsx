import { ThemeProvider } from "@mui/material";

class Expense {
  expenseId: number;
  expenseCategoryName: string;
  expenseDescription: string;
  expenseDate: Date;
  expenseCost: number;
  employeeName: string;

  constructor(
    expenseId: number,
    expenseCategoryName: string,
    expenseDescription: string,
    expenseDate: Date,
    expenseCost: number,
    employeeName: string
  ) {
    this.expenseId = expenseId;
    this.expenseCategoryName = expenseCategoryName;
    this.expenseDescription = expenseDescription;
    this.expenseDate = expenseDate;
    this.expenseCost = expenseCost;
    this.employeeName = employeeName;
  }
}

export default Expense;

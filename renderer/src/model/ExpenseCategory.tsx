class ExpenseCategory {
    expenseCategoryId: number;
    expenseCategoryName: string;
    isActive: boolean;

    constructor (
        expenseCategoryId: number,
        expenseCategoryName: string,
        isActive: boolean,
    ){
        this.expenseCategoryId = expenseCategoryId;
        this.expenseCategoryName = expenseCategoryName;
        this.isActive = isActive;
    }
}

export default ExpenseCategory;

class TransactionPrintDetails{

    transactions: Array<Object>;
    accountFullName: string;

    constructor(transactions: Array<Object>, accountFullName: string){
        this.transactions = transactions;
        this.accountFullName = accountFullName;
    }

    toJson(){
        return{
            transactions: this.transactions,
            accountFullName: this.accountFullName
        }
    }
}

export default TransactionPrintDetails;
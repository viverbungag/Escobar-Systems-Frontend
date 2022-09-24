class Transaction {
    
    transactionId: number;
    transactByName: string;
    transactionDate: Date;
    supplierName: string;
    supplyQuantity: number;
    supplyName: string;
    unitOfMeasurementAbbreviation: string;
    pricePerUnit: number;
    expiryDate: Date;
    transactionType: string;

    constructor(
        transactionId: number,
        transactByName: string,
        transactionDate: Date,
        supplierName: string,
        supplyQuantity: number,
        supplyName: string,
        unitOfMeasurementAbbreviation: string,
        pricePerUnit: number,
        expiryDate: Date,
        transactionType: string
        ) {
            this.transactionId = transactionId
            this.transactByName = transactByName
            this.transactionDate = transactionDate
            this.supplierName = supplierName
            this.supplyQuantity = supplyQuantity
            this.supplyName = supplyName
            this.unitOfMeasurementAbbreviation = unitOfMeasurementAbbreviation
            this.pricePerUnit = pricePerUnit
            this.expiryDate = expiryDate
            this.transactionType = transactionType
        }

    toJson(){
        return{
            transactionId: this.transactionId,
            transactByName: this.transactByName,
            transactionDate: this.transactionDate,
            supplierName: this.supplierName,
            supplyQuantity: this.supplyQuantity,
            supplyName: this.supplyName,
            unitOfMeasurementAbbreviation: this.unitOfMeasurementAbbreviation,
            pricePerUnit: this.pricePerUnit,
            expiryDate: this.expiryDate,
            transactionType: this.transactionType,
        }
    }
}

export default Transaction;
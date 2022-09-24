import Pagination from "./Pagination";

class PaginationFilter extends Pagination {
  supplyFilter: Array<string>;
  unitOfMeasurementFilter: Array<string>;
  supplierFilter: Array<string>;
  transactionDateStart: Date;
  transactionDateEnd: Date;
  transactionTypeFilter: Array<String>;
  isTransactionDateEnabled: Boolean;

  constructor(
    pageNo: number,
    pageSize: number,
    sortedBy: string,
    isAscending: boolean,
    supplyFilter: Array<string>,
    unitOfMeasurementFilter: Array<string>,
    supplierFilter: Array<string>,
    transactionDateStart: Date,
    transactionDateEnd: Date,
    transactionTypeFilter: Array<String>,
    isTransactionDateEnabled: Boolean
  ) {
    super(pageNo, pageSize, sortedBy, isAscending);
    this.supplyFilter = supplyFilter;
    this.unitOfMeasurementFilter = unitOfMeasurementFilter;
    this.supplierFilter = supplierFilter;
    this.transactionDateStart = transactionDateStart;
    this.transactionDateEnd = transactionDateEnd;
    this.transactionTypeFilter = transactionTypeFilter;
    this.isTransactionDateEnabled = isTransactionDateEnabled;
  }

  tojson() {
    return {
      pageNo: this.pageNo + 1,
      pageSize: this.pageSize,
      sortedBy: this.sortedBy,
      isAscending: this.isAscending,
      supplyFilter: this.supplyFilter,
      unitOfMeasurementFilter: this.unitOfMeasurementFilter,
      supplierFilter: this.supplierFilter,
      transactionDateStart: this.transactionDateStart,
      transactionDateEnd: this.transactionDateEnd,
      transactionTypeFilter: this.transactionTypeFilter,
      isTransactionDateEnabled: this.isTransactionDateEnabled,
    };
  }
}

export default PaginationFilter;

class Supplier {
  supplierId: number;
  supplierName: string;
  supplierAddress: string;
  supplierContactNumber: string;
  supplierContactPerson: string;
  isActive: boolean;

  constructor(
    supplierId: number,
    supplierName: string,
    supplierAddress: string,
    supplierContactNumber: string,
    supplierContactPerson: string,
    isActive: boolean
  ) {
    this.supplierId = supplierId;
    this.supplierName = supplierName;
    this.supplierAddress = supplierAddress;
    this.supplierContactNumber = supplierContactNumber;
    this.supplierContactPerson = supplierContactPerson;
    this.isActive = isActive;
  }

  toJson() {
    return {
      supplierId: this.supplierId,
      supplierName: this.supplierName,
      supplierAddress: this.supplierAddress,
      supplierContactNumber: this.supplierContactNumber,
      supplierContactPerson: this.supplierContactPerson,
      isActive: this.isActive,
    };
  }
}

export default Supplier;

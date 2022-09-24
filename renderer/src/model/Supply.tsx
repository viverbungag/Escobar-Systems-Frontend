class Supply {
  supplyId: number;
  supplyName: string;
  supplyQuantity: number;
  minimumQuantity: number;
  inMinimumQuantity: boolean;
  supplierName: string;
  unitOfMeasurementName: string;
  supplyCategoryName: string;
  isActive: boolean;

  constructor(
    supplyId: number,
    supplyName: string,
    supplyQuantity: number,
    minimumQuantity: number,
    inMinimumQuantity: boolean,
    supplierName: string,
    unitOfMeasurementName: string,
    supplyCategoryName: string,
    isActive: boolean
  ) {
    this.supplyId = supplyId;
    this.supplyName = supplyName;
    this.supplyQuantity = supplyQuantity;
    this.minimumQuantity = minimumQuantity;
    this.inMinimumQuantity = inMinimumQuantity;
    this.supplierName = supplierName;
    this.unitOfMeasurementName = unitOfMeasurementName;
    this.supplyCategoryName = supplyCategoryName;
    this.isActive = isActive;
  }

  toJson() {
    return {
      supplyId: this.supplyId,
      supplyName: this.supplyName,
      supplyQuantity: this.supplyQuantity,
      minimumQuantity: this.minimumQuantity,
      inMinimumQuantity: this.inMinimumQuantity,
      supplierName: this.supplierName,
      unitOfMeasurementName: this.unitOfMeasurementName,
      supplyCategoryName: this.supplyCategoryName,
      isActive: this.isActive,
    };
  }
}

export default Supply;

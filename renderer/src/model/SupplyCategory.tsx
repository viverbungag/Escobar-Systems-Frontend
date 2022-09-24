class SupplyCategory {
  supplyCategoryId: number;
  supplyCategoryName: string;
  isActive: boolean;

  constructor(
    supplyCategoryId: number,
    supplyCategoryName: string,
    isActive: boolean
  ) {
    this.supplyCategoryId = supplyCategoryId;
    this.supplyCategoryName = supplyCategoryName;
    this.isActive = isActive;
  }

  toJson() {
    return {
      supplyCategoryId: this.supplyCategoryId,
      supplyCategoryName: this.supplyCategoryName,
      isActive: this.isActive,
    };
  }
}

export default SupplyCategory;

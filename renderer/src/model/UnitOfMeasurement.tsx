class UnitOfMeasurement {
  unitOfMeasurementId: number;
  unitOfMeasurementName: string;
  unitOfMeasurementAbbreviation: string;
  isActive: boolean;

  constructor(
    unitOfMeasurementId: number,
    unitOfMeasurementName: string,
    unitOfMeasurementAbbreviation: string,
    isActive: boolean
  ) {
    this.unitOfMeasurementId = unitOfMeasurementId;
    this.unitOfMeasurementName = unitOfMeasurementName;
    this.unitOfMeasurementAbbreviation = unitOfMeasurementAbbreviation;
    this.isActive = isActive;
  }

  toJson() {
    return {
      unitOfMeasurementId: this.unitOfMeasurementId,
      unitOfMeasurementName: this.unitOfMeasurementName,
      unitOfMeasurementAbbreviation: this.unitOfMeasurementAbbreviation,
      isActive: this.isActive,
    };
  }
}

export default UnitOfMeasurement;

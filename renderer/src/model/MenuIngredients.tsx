class MenuIngredients {
  menuIngredientsId: number;
  supplyName: string;
  quantity: number;
  unitOfMeasurementName: string;

  constructor(menuIngredientsId: number, supplyName: string, quantity: number, unitOfMeasurementName:string) {
    this.menuIngredientsId = menuIngredientsId;
    this.supplyName = supplyName;
    this.quantity = quantity;
    this.unitOfMeasurementName = unitOfMeasurementName
  }

  toJson() {
    return {
      menuIngredientsId: this.menuIngredientsId,
      supplyName: this.supplyName,
      quantity: this.quantity,
      unitOfMeasurementName: this.unitOfMeasurementName
    };
  }
}

export default MenuIngredients;

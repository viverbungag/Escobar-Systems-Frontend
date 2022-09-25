class Type {
    employeeTypeId: number;
    employeeTypeName: string;
    isActive: boolean;

    constructor (
        employeeTypeId: number,
        employeeTypeName: string,
        isActive: boolean,
    ){
        this.employeeTypeId = employeeTypeId;
        this.employeeTypeName = employeeTypeName;
        this.isActive = isActive;
    }
}

export default Type;
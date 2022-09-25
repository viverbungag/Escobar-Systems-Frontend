class Position {
    employeePositionId: number;
    employeePositionName: string;
    isActive: boolean;

    constructor (
        employeePositionId: number,
        employeePositionName: string,
        isActive: boolean,
    ){
        this.employeePositionId = employeePositionId;
        this.employeePositionName = employeePositionName;
        this.isActive = isActive;
    }
}

export default Position;
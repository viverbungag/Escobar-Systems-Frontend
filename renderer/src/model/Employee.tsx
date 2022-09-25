class Employee {
    employeeId: number;
    employeeFirstName: string;
    employeeLastName: string;
    employeeAddress: string;
    employeeContactNumber: number;
    dateEmployed: Date;
    employeePositionName: string;
    employeeTypeName: string;
    superiorEmployeeName: string;
    isActive: boolean;

    constructor(
        employeeId: number,
        employeeFirstName: string,
        employeeLastName: string,
        employeeAddress: string,
        employeeContactNumber: number,
        dateEmployed: Date,
        employeePositionName: string,
        employeeTypeName: string,
        superiorEmployeeName: string,
        isActive: boolean
    ){
        this.employeeId = employeeId;
        this.employeeFirstName = employeeFirstName;
        this.employeeLastName = employeeLastName;
        this.employeeAddress = employeeAddress;
        this.employeeContactNumber = employeeContactNumber;
        this.dateEmployed = dateEmployed;
        this.employeePositionName = employeePositionName;
        this.employeeTypeName = employeeTypeName;
        this.superiorEmployeeName = superiorEmployeeName;
        this.isActive = isActive;
    }
}

export default Employee;
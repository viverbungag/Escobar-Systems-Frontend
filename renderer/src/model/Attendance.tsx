class Attendance {
    employeeAttendanceJoinId: number;
    employeeName: string;
    attendanceTime: Date;
    attendanceType: string;

    constructor (
        employeeAttendanceJoinId: number,
        employeeName: string,
        attendanceTime: Date,
        attendanceType: string
    ){
        this.employeeAttendanceJoinId = employeeAttendanceJoinId;
        this.employeeName = employeeName;
        this.attendanceTime = attendanceTime;
        this.attendanceType = attendanceType;
    }
}

export default Attendance;
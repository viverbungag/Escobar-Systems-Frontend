import { Modal, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddAttendanceModal from "../AddAttendanceModal/AddAttendanceModal";
import BigButton from "../../Shared/Buttons/BigButton/BigButton";
import styles from "./AttendanceForm.module.scss";
import Rest from "../../../../rest/Rest.tsx";
import { useUser } from "../../../contexts/UserContext";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

function AttendanceForm() {
  const { employeeName } = useUser();
  const rest = new Rest();
  //get attendance for recent attendance
  const [attendance, setAttendance] = useState([]);
  const handleAttendanceData = (data) => {
    setAttendance(data);
  };
  const getAttendanceData = () => {
    rest.get(`${INITIAL_URL}/attendance/${employeeName}`, handleAttendanceData);
  };
  const [recentAttendance, setRecentAttendance] = useState();
  const findRecentAttendance = () => {
    if (attendance.length > 0) {
      const arr = attendance.sort(
        (a, b) => new Date(b.attendanceTime) - new Date(a.attendanceTime)
      );
      setRecentAttendance(
        `${arr[0].attendanceTime} | ${arr[0].attendanceType}`
      );
    } else {
      setRecentAttendance("None");
    }
  };
  //confirm add attendance modal
  const [openAddAttendanceModal, setOpenAddAttendanceModal] = useState(false);
  const handleOpenAddAttendanceModal = () => {
    setOpenAddAttendanceModal(true);
  };
  const handleCloseAddAttendanceModal = () => {
    setOpenAddAttendanceModal(false);
  };
  //
  const [datetime, setDatetime] = useState("");
  const [attendanceType, setAttendanceType] = useState("");
  //post check in
  const postCheckIn = () => {
    setDatetime(new Date());
    setAttendanceType("CHECK_IN");
    handleOpenAddAttendanceModal();
  };
  //post check out
  const postCheckOut = () => {
    setDatetime(new Date());
    setAttendanceType("CHECK_OUT");
    handleOpenAddAttendanceModal();
  };
  const addSuccessAction = () => {
    getAttendanceData();
    handleCloseAddAttendanceModal();
  };

  useEffect(() => {
    getAttendanceData();
  }, []);

  useEffect(() => {
    findRecentAttendance();
  }, [attendance]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>ATTENDANCE</div>
      <div className={styles.form}>
        <div className={styles.row}>
          <div className={styles.btn_container} onClick={postCheckIn}>
            <BigButton label="IN" link="" />
          </div>
          <div className={styles.btn_container} onClick={postCheckOut}>
            <BigButton label="OUT" link="" />
          </div>
        </div>
        <div className={styles.row}>Recent Attendance: {recentAttendance}</div>
      </div>

      <Modal
        open={openAddAttendanceModal}
        onClose={handleCloseAddAttendanceModal}
      >
        <Box className={styles.modal}>
          <AddAttendanceModal
            addSuccessAction={addSuccessAction}
            employeeName={employeeName}
            attendanceType={attendanceType}
            attendanceTime={datetime}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default AttendanceForm;

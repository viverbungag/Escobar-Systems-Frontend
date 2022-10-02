import { Modal, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddAttendanceModal from '../AddAttendanceModal/AddAttendanceModal';
import BigButton from '../../Shared/Buttons/BigButton/BigButton';
import styles from './AttendanceForm.module.scss';
import Rest from "../../../../rest/Rest.tsx";
import { useUser } from '../../../contexts/UserContext';

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

function AttendanceForm() {
  const { employeeName } = useUser();
  const rest = new Rest();
  //get attendance for recent attendance
  const [attendance, setAttendance] = useState([]);
  const handleAttendanceData = (data) => {
    setAttendance(data);
  }
  const getAttendanceData = () => {
    rest.get(`${INITIAL_URL}/attendance/${employeeName}`, handleAttendanceData)
  }
  //get recent attendance
  const findRecentAttendance = () => {
    if(attendance.length > 0){
      let recentDate = null;
      attendance.map((item) => {
        if(recentDate == null){
          recentDate = item.attendanceTime;
        }
        else{
          if(recentDate > item.attendanceTime){
            recentDate = item.attendanceTime;
          }else {
            recentDate = item.attendanceTime
          }
        }
      })
      let type = null;
      attendance.map((item) => {
        if(recentDate == item.attendanceTime){
          type = item.attendanceType;
        }
      })
      let output = `Recent Attendance: ${recentDate} | ${type}`
      return output;
    }else{
      return `Recent Attendance: No Attendance History.`
    }
  }
  //confirm add attendance modal
  const [openAddAttendanceModal, setOpenAddAttendanceModal] = useState(false);
  const handleOpenAddAttendanceModal = () => { setOpenAddAttendanceModal(true) };
  const handleCloseAddAttendanceModal = () => { setOpenAddAttendanceModal(false) };
  //
  const [datetime, setDatetime] = useState('');
  const [attendanceType, setAttendanceType] = useState('')
  //post check in
  const postCheckIn = () => {
    setDatetime(new Date());
    setAttendanceType('CHECK_IN');
    handleOpenAddAttendanceModal();
  }
  //post check out
  const postCheckOut = () => {
    setDatetime(new Date());
    setAttendanceType('CHECK_OUT');
    handleOpenAddAttendanceModal();
  }
  const addSuccessAction = () => {
    handleCloseAddAttendanceModal();
  }

  useEffect(() => {
    getAttendanceData();
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>ATTENDANCE</div>
      <div className={styles.form}>
        <div className={styles.row}>
          <div className={styles.btn_container} onClick={postCheckIn}><BigButton label="IN" link=""/></div>
          <div className={styles.btn_container} onClick={postCheckOut}><BigButton label="OUT" link=""/></div>
        </div>
        <div className={styles.row}>
          {findRecentAttendance()}
        </div>
      </div>

      {/* confirm add attendance modal */}
      <Modal open={openAddAttendanceModal} onClose={handleCloseAddAttendanceModal}>
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
  )
}

export default AttendanceForm
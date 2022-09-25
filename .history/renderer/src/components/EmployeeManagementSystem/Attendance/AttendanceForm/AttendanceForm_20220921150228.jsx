import { Select, FormControl, InputLabel, MenuItem, Modal, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AddAttendanceModal from '../AddAttendanceModal/AddAttendanceModal';
import BigButton from '../../Shared/Buttons/BigButton/BigButton';
import styles from './AttendanceForm.module.scss';
import Rest from "../../../rest/Rest.tsx";
import { useUser } from '../../Contexts/UserContext.jsx';

const INITIAL_URL = "http://localhost:8080/api/v1";

function AttendanceForm() {
  const { employeeName } = useUser();
  const rest = new Rest();
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>ATTENDANCE</div>
      <div className={styles.form}>
       <div className={styles.row}>
        <div className={styles.btn_container} onClick={postCheckIn}><BigButton label="IN" link=""/></div>
        <div className={styles.btn_container} onClick={postCheckOut}><BigButton label="OUT" link=""/></div>
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
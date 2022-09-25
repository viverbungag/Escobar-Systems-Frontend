import React from 'react';
import styles from './AddAttendanceModal.module.scss';
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';

import Attendance from '../../../model/Attendance.tsx';
import { ToastContainer } from 'react-toastify';
import Rest from "../../../rest/Rest.tsx";
import dateFormat from 'dateformat';

const INITIAL_URL = "http://localhost:8080/api/v1";

export default function AddAttendanceModal({ addSuccessAction, employeeName, attendanceType, attendanceTime }) {
    const rest = new Rest();
    
    const handleSubmit = () => {
        const newAttendanceTime = dateFormat(attendanceTime, "yyyy-mm-dd") + "T" + dateFormat(attendanceTime, "HH:MM:ss")
        const addedAttendance = (
            new Attendance(
                1,
                employeeName,
                newAttendanceTime,
                attendanceType
            )
        );
        rest.add(
            `${INITIAL_URL}/attendance/add`,
            addedAttendance,
            addSuccessAction,
            `Successful ${attendanceType}.`
        );
    }

  return (
    <div className={styles.container}>
        <div className={styles.form}>
            <div className={styles.header}>
                Confirm Attendance
            </div>
            <div className={styles.content}>
                <div className={styles.row}>
                    {employeeName}
                </div>
                <div className={styles.row}>
                    {String(attendanceTime)}
                </div>
                <div className={styles.row}>
                    {attendanceType}
                </div>
            </div>
            <div className={styles.footer}>
                <button onClick={handleSubmit}>
                    <MediumButton label="SUBMIT" />
                </button>
            </div>
        </div>
        <ToastContainer />
    </div>
  )
}

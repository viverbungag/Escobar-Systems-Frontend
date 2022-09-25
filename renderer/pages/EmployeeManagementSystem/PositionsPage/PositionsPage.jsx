import React from 'react';
import styles from './PositionsPage.module.scss';
import PositionsContent from '../../../src/components/EmployeeManagementSystem/Positions/PositionsContent/PositionsContent';
import SideMenu from '../../../src/components/EmployeeManagementSystem/Shared/SideMenu/SideMenu';

export default function PositionsPage() {
  return (
    <div className={styles.section}>
      <SideMenu homeState="" viewattendanceState="" viewemployeeState="" viewpositionsState="active" viewtypesState='' viewaccountsState="" />
      <div className={styles.content}>
        <PositionsContent />
      </div>
    </div>
  )
}

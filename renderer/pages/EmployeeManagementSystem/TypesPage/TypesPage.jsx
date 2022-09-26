import React from 'react';
import styles from './TypesPage.module.scss';
import TypesContent from '../../../src/components/EmployeeManagementSystem/Types/TypesContent/TypesContent';
import SideMenu from '../../../src/components/EmployeeManagementSystem/Shared/SideMenu/SideMenu';
import TitleBar from '../../../src/components/EmployeeManagementSystem/Shared/TitleBar/TitleBar';

export default function TypesPage() {
  return (
    <div>
      <TitleBar />
      <div className={styles.section}>
        <SideMenu homeState="" viewattendanceState="" viewemployeeState="" viewpositionsState="" viewtypesState="active" viewaccountsState="" />
        <div className={styles.content}>
          <TypesContent />
        </div>
      </div>
    </div>
  )
}

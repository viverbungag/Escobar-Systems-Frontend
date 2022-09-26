import React from 'react';
import styles from './AccountsPage.module.scss';
import AccountsContent from '../../../src/components/EmployeeManagementSystem/Accounts/AccountsContent/AccountsContent';
import SideMenu from '../../../src/components/EmployeeManagementSystem/Shared/SideMenu/SideMenu';
import TitleBar from '../../../src/components/EmployeeManagementSystem/Shared/TitleBar/TitleBar';

export default function AccountsPage() {
    return (
      <div>
        <TitleBar />
        <div className={styles.section}>
          <SideMenu homeState="" viewattendanceState="" viewemployeeState="" viewpositionsState="" viewtypesState='' viewaccountsState="active" />
          <div className={styles.content}>
            <AccountsContent />
          </div>
        </div>
      </div>
    )
}

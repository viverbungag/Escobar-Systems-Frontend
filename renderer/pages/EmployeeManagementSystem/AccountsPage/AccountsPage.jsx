import React from 'react';
import styles from './AccountsPage.module.scss';
import AccountsContent from '../../../src/components/EmployeeManagementSystem/Accounts/AccountsContent/AccountsContent';
import SideMenu from '../../../src/components/EmployeeManagementSystem/Shared/SideMenu/SideMenu';

export default function AccountsPage() {
    return (
        <div className={styles.section}>
          <SideMenu viewattendanceState="" viewemployeeState="" viewpositionsState="" viewtypesState='' viewaccountsState="active" />
          <div className={styles.content}>
            <AccountsContent />
          </div>
        </div>
    )
}

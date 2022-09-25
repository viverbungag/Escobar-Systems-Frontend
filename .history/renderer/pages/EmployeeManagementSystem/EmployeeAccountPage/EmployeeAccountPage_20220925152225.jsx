import Raact from 'react';
import styles from './EmployeeAccountPage.module.scss';
import EmployeeSideMenu from '../../components/Shared/EmployeeSideMenu/EmployeeSideMenu';
import EmployeeAccountForm from '../../../src/components/EmployeeManagementSystem/EmployeeAccount/EmployeeAccountForm/EmployeeAccountForm';
import Toast from '../../../src/components/EmployeeManagementSystem/Shared/Toast/Toast';

export default function EmployeeAccountPage() {
    return (
        <div className={styles.section}>
            <Toast />
            <EmployeeSideMenu homeState="" viewattendanceState="" viewaccountState="active" />            
            <div className={styles.content}>
                <div className={styles.form}>
                    <EmployeeAccountForm />
                </div>
            </div>
        </div>
    )
}
import Raact from 'react';
import styles from './EmployeeAccountPage.module.scss';
import EmployeeSideMenu from '../../../src/components/EmployeeManagementSystem/Shared/EmployeeSideMenu/EmployeeSideMenu';
import EmployeeAccountForm from '../../../src/components/EmployeeManagementSystem/EmployeeAccount/EmployeeAccountForm/EmployeeAccountForm';
import TitleBar from '../../../src/components/EmployeeManagementSystem/Shared/TitleBar/TitleBar';

export default function EmployeeAccountPage() {
    return (
        <div>
            <TitleBar />
            <div className={styles.section}>
                <EmployeeSideMenu homeState="" viewattendanceState="" viewaccountState="active" />            
                <div className={styles.content}>
                    <div className={styles.form}>
                        <EmployeeAccountForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
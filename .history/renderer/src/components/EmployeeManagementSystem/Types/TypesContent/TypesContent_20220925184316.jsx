import React, { useState, useEffect } from 'react';
import styles from './TypesContent.module.scss';
import Rest from '../../../rest/Rest.tsx';
import { Modal } from '@mui/material';
import MediumButton from '../../Shared/Buttons/MediumButton/MediumButton';
import ActiveTypesTable from '../ActiveTypesTable/ActiveTypesTable';
import InactiveTypesTable from '../InactiveTypesTable/InactiveTypesTable';
import AddType from '../AddType/AddType';

const INITIAL_URL = "http://localhost:8080/api/v1";

export default function TypesContent() {
    const rest =  new Rest();
    //get active types
    const [activeTypes, setActiveTypes] = useState([]);
    const handleActiveTypes = (data) => {
        setActiveTypes(data)
    }
    const getActiveTypes = () => {
        rest.get(`${INITIAL_URL}/employee-type/active`, handleActiveTypes)
    }
    //get inactive types
    const [inactiveTypes, setInactiveTypes] = useState([]);
    const handleInactiveTypes = (data) => {
        setInactiveTypes(data)
    }
    const getInactiveTypes = () => {
        rest.get(`${INITIAL_URL}/employee-type/inactive`, handleInactiveTypes)
    }
    //add modal
    const [openAddModal, setOpenAddModal] = useState(false);
    const handleOpenAddModal = () => { setOpenAddModal(true) };
    const handleCloseAddModal = () => { setOpenAddModal(false) };
    const addSuccessAction = () => {
        handleCloseAddModal();
        reload();
    }
    //reload
    const reload = () => {
        getActiveTypes();
        getInactiveTypes();
    }

    useEffect(() => {
        getActiveTypes();
        getInactiveTypes();
    }, [])

    return (
        <div className={styles.container}>
        <div className={styles.content}>
            <div className={styles.header}>
            <button onClick={handleOpenAddModal}>
                <MediumButton label="Add Employee Type" />
            </button>
            </div>
            <div className={styles.tables}>
            <div className={styles.active_table}>
                <ActiveTypesTable
                reload={reload}
                activeTypes={activeTypes}
                />
            </div>
            <div className={styles.inactive_table}>
                <InactiveTypesTable
                reload={reload}
                inactiveTypes={inactiveTypes}
                />
            </div>
            </div>
        </div>
        <Modal open={openAddModal} onClose={handleCloseAddModal}>
            <div className={styles.modal}>
                <AddType
                addSuccessAction={addSuccessAction}
                />
            </div>
        </Modal>
        </div>
    )
}
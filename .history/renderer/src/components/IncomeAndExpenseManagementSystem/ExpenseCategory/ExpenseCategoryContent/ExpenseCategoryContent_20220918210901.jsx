import React, { useState, useEffect } from 'react';
import ActiveCategoryTable from '../ActiveCategoryTable/ActiveCategoryTable';
import InactiveCategoryTable from '../InactiveCategoryTable/InactiveCategoryTable';
import styles from './ExpenseCategoryContent.module.scss';
import Toast from '../../Shared/Toast/Toast';
import Rest from '../../../rest/Rest.tsx';
import { Modal } from '@mui/material';
import MediumButton from '../../Shared/MediumButton/MediumButton';
import AddExpenseCategory from '../AddExpenseCategory/AddExpenseCategory';

const INITIAL_URL = "http://localhost:8080/api/v1";


export default function ExpenseCategoryContent() {
  const rest = new Rest();
  //active
  const [activeCategories, setActiveCategories] = useState([]);
  const handleActiveCategories = (data) => {
      setActiveCategories(data);
  }
  const getActiveCategories = () => {
      rest.get(`${INITIAL_URL}/expense-category/active`, handleActiveCategories)
  }
  //inactive
  const [inactiveCategories, setInactiveCategories] = useState([]);
  const handleInactiveCategories = (data) => {
    setInactiveCategories(data);
  }
  const getInactiveCategories = () => {
      rest.get(`${INITIAL_URL}/expense-category/inactive`, handleInactiveCategories)
  }
  //add category modal
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleOpenAddModal = () => { setOpenAddModal(true) };
  const handleCloseAddModal = () => { setOpenAddModal(false) };
  const addSuccessAction = () => {
    handleCloseAddModal();
    reload();
  }
  //reload
  const reload = () => {
    getActiveCategories();
    getInactiveCategories();
  }

  useEffect(() => {
    getActiveCategories();
    getInactiveCategories();
  }, [])


  return (
    <div className={styles.container}>
    <Toast />
      <div className={styles.content}>
        <div className={styles.header}>
          <button onClick={handleOpenAddModal}>
            <MediumButton label="Add Expense Category" />
          </button>
        </div>
        <div className={styles.tables}>
          <div className={styles.active_table}>
            <ActiveCategoryTable
            reload={reload}
            activeCategories={activeCategories}
            />
          </div>
          <div className={styles.inactive_table}>
            <InactiveCategoryTable
            reload={reload}
            inactiveCategories={inactiveCategories}
            />
          </div>
        </div>
      </div>
      <Modal open={openAddModal} onClose={handleCloseAddModal}>
        <div className={styles.modal}>
            <AddExpenseCategory
            addSuccessAction={addSuccessAction}
            />
        </div>
      </Modal>
    </div>
  )
}

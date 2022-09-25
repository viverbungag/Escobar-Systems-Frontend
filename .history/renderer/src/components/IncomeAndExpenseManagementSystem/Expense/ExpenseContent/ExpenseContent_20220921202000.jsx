import React, { useState, useEffect } from 'react';
import styles from './ExpenseContent.module.scss';
import Rest from '../../../rest/Rest.tsx';
import MediumButton from '../../Shared/MediumButton/MediumButton';
import { Modal } from '@mui/material';
import ExpenseTable from '../ExpenseTable/ExpenseTable';
import ExpenseEditableTable from '../ExpenseEditableTable/ExpenseEditableTable';
import AddExpenseModal from '../AddExpenseModal/AddExpenseModal';

const INITIAL_URL = "http://localhost:8080/api/v1";

export default function ExpenseContent() {
  const rest = new Rest();
  //get expense categories
  const [expenseCategories, setExpenseCategories] = useState([]);
  const handleExpenseCategories = (data) => {
    setExpenseCategories(data);
  }
  const getExpenseCategories = () => {
    rest.get(`${INITIAL_URL}/expense-category/active`, handleExpenseCategories);
  }
  //non editable expense data
  const [expenseData, setExpenseData] = useState([]);
  const handleExpenseData = (data) => {
    setExpenseData(data);
  }
  const getExpenseData = () => {
    rest.getPost(
        `${INITIAL_URL}/expense/transaction`,
        '',
        handleExpenseData
    )
  }
  //editable expense data
  const [expenseEditableData, setExpenseEditableData] = useState([]);
  const handleExpenseEditableData = (data) => {
    setExpenseEditableData(data);
  }
  const getExpenseEditableData = () => {
    rest.getPost(
        `${INITIAL_URL}/expense`,
        '',
        handleExpenseEditableData
    )
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
    getExpenseData();
    getExpenseEditableData();
  };

  useEffect(() => {
    getExpenseData();
    getExpenseEditableData();
    getExpenseCategories();
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <button onClick={handleOpenAddModal}>
            <MediumButton label="Add Expense" />
          </button>
        </div>
        <div className={styles.tables}>
          <div className={styles.expense_editable_table}>
            <ExpenseEditableTable
            reload={reload}
            expenseEditableData={expenseEditableData}
            expenseCategories={expenseCategories}
            />
          </div>
          <div className={styles.expense_table}>
            <ExpenseTable
            expenseData={expenseData}
            />
          </div>
        </div>
      </div>      
      <Modal open={openAddModal} onClose={handleCloseAddModal}>
        <div className={styles.modal}>
          <AddExpenseModal
          reload={reload}
          expenseCategories={expenseCategories}
          addSuccessAction={addSuccessAction}
          />
        </div>
      </Modal>
    </div>
  )
}

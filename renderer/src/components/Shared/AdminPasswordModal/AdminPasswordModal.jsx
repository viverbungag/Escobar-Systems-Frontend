import React from 'react';
import styles from "./AdminPasswordModal.module.scss"

const AdminPasswordModal = ({
    openModal,
    handleCloseModal
}) => {
  return (
    <Modal
    open={openModal}
    onClose={handleCloseModal}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Slide direction="down" in={openModal} mountOnEnter unmountOnExit>
      <div className={styles["admin-password-modal"]}>
      </div>
    </Slide>
  </Modal>
  )
}

export default AdminPasswordModal